/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type InspectionData = {
  vehicle: string;
  inspectionForm: string;
  addedFrom: string;
  fromDate: string;
  toDate: string;
  // Conditional fields based on inspection form
  dones: "Yes" | "No";
  passFail: "Pass" | "Fail";
  safetyScore: number;
  maintenanceNotes: string;
  tripRoute: string;
  annualRating: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: InspectionData = {
  vehicle: "Toyota Camry 2023",
  inspectionForm: "Safety Inspection",
  addedFrom: "John Doe",
  fromDate: "2024-01-15",
  toDate: "2024-01-20",
  dones: "No",
  passFail: "Pass",
  safetyScore: 8,
  maintenanceNotes: "",
  tripRoute: "",
  annualRating: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function InspectionsEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No" | string>("No");

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<InspectionData>({
    vehicle: "",
    inspectionForm: "",
    addedFrom: "",
    fromDate: "",
    toDate: "",
    dones: "No",
    passFail: "Pass",
    safetyScore: 0,
    maintenanceNotes: "",
    tripRoute: "",
    annualRating: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Permission checks
  const canCreate = usePermission("inspections", "create");
  const canView = usePermission("inspections", "view");
  const canEdit = usePermission("inspections", "edit");
  const canDelete = usePermission("inspections", "delete");

  // Field-level permissions
  const permissionsFields = usePermission<keyof InspectionData>(
    "inspections",
    "edit",
    [
      "vehicle",
      "inspectionForm",
      "addedFrom",
      "fromDate",
      "toDate",
      "dones",
      "passFail",
      "safetyScore",
      "maintenanceNotes",
      "tripRoute",
      "annualRating",
      "isDefault",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("inspections", "pdf");
  const canPrint: boolean = usePermission("inspections", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const vehicleOptions = [
    "Toyota Camry 2023",
    "Honda Civic 2022",
    "Ford F-150 2023",
    "Chevrolet Silverado 2022",
    "Nissan Altima 2023",
    "BMW X5 2023",
    "Mercedes C-Class 2022",
    "Audi A4 2023",
    "Volkswagen Golf 2022",
    "Hyundai Tucson 2023",
    "Kia Sportage 2022",
    "Mazda CX-5 2023",
    "Lexus RX 2023",
    "Infiniti Q50 2022",
    "Acura MDX 2023",
    "Genesis G80 2022",
    "Subaru Outback 2023",
    "Mitsubishi Outlander 2022",
    "Volvo XC90 2023",
    "Jaguar F-Pace 2022",
  ];

  const inspectionFormOptions = [
    "Safety Inspection",
    "Maintenance Check",
    "Pre-Trip Inspection",
    "Annual Inspection",
    "Safety Compliance",
    "Luxury Vehicle Check",
    "Premium Inspection",
    "German Engineering Check",
    "European Standards",
    "Korean Quality Check",
    "SUV Safety Check",
    "Japanese Reliability",
    "Luxury SUV Check",
    "Premium Sedan Check",
    "All-Wheel Drive Check",
    "Crossover Safety Check",
    "Safety-First Inspection",
    "British Luxury Check",
  ];

  const staffOptions = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
    "David Brown",
    "Lisa Davis",
    "Tom Miller",
    "Emma White",
    "Chris Taylor",
    "Anna Garcia",
    "Ryan Martinez",
    "Maria Rodriguez",
    "Alex Turner",
    "Jordan Lee",
    "Casey Morgan",
    "Riley Quinn",
    "Taylor Kim",
    "Blake Chen",
    "Sam Rivera",
    "Jordan Smith",
  ];

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });

      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsDraftState(initialData.isDraft ? "Yes" : "No");
    }
  }, [isEdit, initialData]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle inspection form change to show/hide conditional fields
  const handleInspectionFormChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      inspectionForm: value,
      // Reset conditional fields when inspection form changes
      safetyScore: 0,
      maintenanceNotes: "",
      tripRoute: "",
      annualRating: "",
    }));
    focusNextInput("addedFrom");
  };

  // Get conditional fields based on selected inspection form
  const getConditionalFields = () => {
    switch (formData.inspectionForm) {
      case "Safety Inspection":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 relative">
            {permissionsFields.safetyScore && (
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("safetyScore")}
                  id="safetyScore"
                  name="safetyScore"
                  value={formData.safetyScore?.toString() || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("dones")}
                  onCancel={() => setFormData({ ...formData, safetyScore: 0 })}
                  labelText="Safety Score (1-10)"
                  tooltipText="Enter safety score from 1 to 10"
                  required
                  type="number"
                  min="1"
                  max="10"
                />
              </div>
            )}
            {permissionsFields.dones && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("dones")(el)}
                  id="dones"
                  name="dones"
                  options={["Yes", "No"]}
                  value={formData.dones}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Yes" | "No") => {
                    setFormData((prev) => ({
                      ...prev,
                      dones: value,
                    }));
                    focusNextInput("passFail");
                  }}
                  onEnterPress={() => {
                    if (formData.dones) {
                      focusNextInput("passFail");
                    }
                  }}
                  placeholder=" "
                  labelText="Dones"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
            {permissionsFields.passFail && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("passFail")(el)}
                  id="passFail"
                  name="passFail"
                  options={["Pass", "Fail"]}
                  value={formData.passFail}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Pass" | "Fail") => {
                    setFormData((prev) => ({
                      ...prev,
                      passFail: value,
                    }));
                    focusNextInput("fromDate");
                  }}
                  onEnterPress={() => {
                    if (formData.passFail) {
                      focusNextInput("fromDate");
                    }
                  }}
                  placeholder=" "
                  labelText="Pass/Fail"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        );

      case "Maintenance Check":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 relative">
            {permissionsFields.maintenanceNotes && (
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("maintenanceNotes")}
                  id="maintenanceNotes"
                  name="maintenanceNotes"
                  value={formData.maintenanceNotes}
                  onChange={handleChange}
                  onNext={() => focusNextInput("dones")}
                  onCancel={() =>
                    setFormData({ ...formData, maintenanceNotes: "" })
                  }
                  labelText="Maintenance Notes"
                  tooltipText="Enter maintenance notes"
                  required
                />
              </div>
            )}
            {permissionsFields.dones && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("dones")(el)}
                  id="dones"
                  name="dones"
                  options={["Yes", "No"]}
                  value={formData.dones}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Yes" | "No") => {
                    setFormData((prev) => ({
                      ...prev,
                      dones: value,
                    }));
                    focusNextInput("passFail");
                  }}
                  onEnterPress={() => {
                    if (formData.dones) {
                      focusNextInput("passFail");
                    }
                  }}
                  placeholder=" "
                  labelText="Dones"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
            {permissionsFields.passFail && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("passFail")(el)}
                  id="passFail"
                  name="passFail"
                  options={["Pass", "Fail"]}
                  value={formData.passFail}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Pass" | "Fail") => {
                    setFormData((prev) => ({
                      ...prev,
                      passFail: value,
                    }));
                    focusNextInput("fromDate");
                  }}
                  onEnterPress={() => {
                    if (formData.passFail) {
                      focusNextInput("fromDate");
                    }
                  }}
                  placeholder=" "
                  labelText="Pass/Fail"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        );

      case "Pre-Trip Inspection":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 relative">
            {permissionsFields.tripRoute && (
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("tripRoute")}
                  id="tripRoute"
                  name="tripRoute"
                  value={formData.tripRoute}
                  onChange={handleChange}
                  onNext={() => focusNextInput("dones")}
                  onCancel={() => setFormData({ ...formData, tripRoute: "" })}
                  labelText="Trip Route"
                  tooltipText="Enter trip route details"
                  required
                />
              </div>
            )}
            {permissionsFields.dones && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("dones")(el)}
                  id="dones"
                  name="dones"
                  options={["Yes", "No"]}
                  value={formData.dones}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Yes" | "No") => {
                    setFormData((prev) => ({
                      ...prev,
                      dones: value,
                    }));
                    focusNextInput("passFail");
                  }}
                  onEnterPress={() => {
                    if (formData.dones) {
                      focusNextInput("passFail");
                    }
                  }}
                  placeholder=" "
                  labelText="Dones"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
            {permissionsFields.passFail && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("passFail")(el)}
                  id="passFail"
                  name="passFail"
                  options={["Pass", "Fail"]}
                  value={formData.passFail}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Pass" | "Fail") => {
                    setFormData((prev) => ({
                      ...prev,
                      passFail: value,
                    }));
                    focusNextInput("fromDate");
                  }}
                  onEnterPress={() => {
                    if (formData.passFail) {
                      focusNextInput("fromDate");
                    }
                  }}
                  placeholder=" "
                  labelText="Pass/Fail"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        );

      case "Annual Inspection":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 relative">
            {permissionsFields.annualRating && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("annualRating")(el)}
                  id="annualRating"
                  name="annualRating"
                  options={["Excellent", "Good", "Fair", "Poor"]}
                  value={formData.annualRating}
                  labelClassName="rounded-lg"
                  onValueChange={(value: string) => {
                    setFormData((prev) => ({
                      ...prev,
                      annualRating: value,
                    }));
                    focusNextInput("dones");
                  }}
                  onEnterPress={() => {
                    if (formData.annualRating) {
                      focusNextInput("dones");
                    }
                  }}
                  placeholder=" "
                  labelText="Annual Rating"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
            {permissionsFields.dones && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("dones")(el)}
                  id="dones"
                  name="dones"
                  options={["Yes", "No"]}
                  value={formData.dones}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Yes" | "No") => {
                    setFormData((prev) => ({
                      ...prev,
                      dones: value,
                    }));
                    focusNextInput("passFail");
                  }}
                  onEnterPress={() => {
                    if (formData.dones) {
                      focusNextInput("dones");
                    }
                  }}
                  placeholder=" "
                  labelText="Dones"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
            {permissionsFields.passFail && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("passFail")(el)}
                  id="passFail"
                  name="passFail"
                  options={["Pass", "Fail"]}
                  value={formData.passFail}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Pass" | "Fail") => {
                    setFormData((prev) => ({
                      ...prev,
                      passFail: value,
                    }));
                    focusNextInput("fromDate");
                  }}
                  onEnterPress={() => {
                    if (formData.passFail) {
                      focusNextInput("fromDate");
                    }
                  }}
                  placeholder=" "
                  labelText="Pass/Fail"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        );

      default:
        // Default conditional fields for other inspection types
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 relative">
            {permissionsFields.dones && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("dones")(el)}
                  id="dones"
                  name="dones"
                  options={["Yes", "No"]}
                  value={formData.dones}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Yes" | "No") => {
                    setFormData((prev) => ({
                      ...prev,
                      dones: value,
                    }));
                    focusNextInput("passFail");
                  }}
                  onEnterPress={() => {
                    if (formData.dones) {
                      focusNextInput("passFail");
                    }
                  }}
                  placeholder=" "
                  labelText="Dones"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
            {permissionsFields.passFail && (
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("passFail")(el)}
                  id="passFail"
                  name="passFail"
                  options={["Pass", "Fail"]}
                  value={formData.passFail}
                  labelClassName="rounded-lg"
                  onValueChange={(value: "Pass" | "Fail") => {
                    setFormData((prev) => ({
                      ...prev,
                      passFail: value,
                    }));
                    focusNextInput("fromDate");
                  }}
                  onEnterPress={() => {
                    if (formData.passFail) {
                      focusNextInput("fromDate");
                    }
                  }}
                  placeholder=" "
                  labelText="Pass/Fail"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        );
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintInspections(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("vehicle");
    } else {
      navigate("/inspections");
    }
    toastSuccess("Inspection record edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      vehicle: "",
      inspectionForm: "",
      addedFrom: "",
      fromDate: "",
      toDate: "",
      dones: "No",
      passFail: "Pass",
      safetyScore: 0,
      maintenanceNotes: "",
      tripRoute: "",
      annualRating: "",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setIsDraftState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["vehicle"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintInspections = (inspectionData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Inspection Details",
        data: [inspectionData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          vehicle: "Vehicle",
          inspectionForm: "Inspection Form",
          addedFrom: "Added From",
          fromDate: "From Date",
          toDate: "To Date",
          dones: "Dones",
          passFail: "Pass/Fail",
          safetyScore: "Safety Score",
          maintenanceNotes: "Maintenance Notes",
          tripRoute: "Trip Route",
          annualRating: "Annual Rating",
          isDefault: "Default Inspection",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
          draftedAt: "Drafted At",
          deletedAt: "Deleted At",
        },
      });
      printHtmlContent(html);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when printing");
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("inspectionData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Inspection Details"
          subtitle="Inspection Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "inspection-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/inspections/create");
        } else {
          navigate("/inspections/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/inspections/view");
      },
      // Only show if user has permission
      show: canView,
    },
  ]);

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      // Filter out any existing draft option first
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      // Add draft option only if not already a draft
      if (!formData.isDraft) {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Inspection record saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Inspection" : "Creating Inspection"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="inspections"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
          // Only show buttons if user can edit
          canEdit ? (
            <div className="flex gap-4 items-center">
              <Button
                variant="outline"
                className="gap-2 text-primary bg-sky-200 hover:bg-primary rounded-full border-primary w-32 font-semibold!"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
                id="submitButton"
                name="submitButton"
                variant="outline"
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold! focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:transform focus:scale-105 focus:transition-all focus:duration-300`}
                onClick={() => formRef.current?.requestSubmit()}
              >
                Submit
              </Button>
            </div>
          ) : null
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6 relative"
          >
            {/* Basic Inspection Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.vehicle && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("vehicle")(el)}
                    id="vehicle"
                    name="vehicle"
                    options={vehicleOptions}
                    value={formData.vehicle}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        vehicle: value,
                      }));
                      focusNextInput("inspectionForm");
                    }}
                    onEnterPress={() => {
                      if (formData.vehicle) {
                        focusNextInput("inspectionForm");
                      }
                    }}
                    placeholder=" "
                    labelText="Vehicle"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {permissionsFields.inspectionForm && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("inspectionForm")(el)}
                    id="inspectionForm"
                    name="inspectionForm"
                    options={inspectionFormOptions}
                    value={formData.inspectionForm}
                    labelClassName="rounded-lg"
                    onValueChange={handleInspectionFormChange}
                    onEnterPress={() => {
                      if (formData.inspectionForm) {
                        focusNextInput("addedFrom");
                      }
                    }}
                    placeholder=" "
                    labelText="Inspection Form"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {permissionsFields.addedFrom && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("addedFrom")(el)}
                    id="addedFrom"
                    name="addedFrom"
                    options={staffOptions}
                    value={formData.addedFrom}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        addedFrom: value,
                      }));
                      focusNextInput("fromDate");
                    }}
                    onEnterPress={() => {
                      if (formData.addedFrom) {
                        focusNextInput("fromDate");
                      }
                    }}
                    placeholder=" "
                    labelText="Added From"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {permissionsFields.fromDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("fromDate")}
                    id="fromDate"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("toDate")}
                    onCancel={() => setFormData({ ...formData, fromDate: "" })}
                    labelText="From Date"
                    tooltipText="Enter inspection start date"
                    required
                    type="date"
                  />
                </div>
              )}
            </div>

            {/* Conditional Fields Based on Inspection Form */}
            {formData.inspectionForm && getConditionalFields()}

            {/* Date and System Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.toDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("toDate")}
                    id="toDate"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, toDate: "" })}
                    labelText="To Date"
                    tooltipText="Enter inspection end date"
                    required
                    type="date"
                  />
                </div>
              )}

              {permissionsFields.isDefault && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      focusNextInput("isDraft");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("isDraft");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {permissionsFields.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDraftState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: newValue,
                      }));
                      focusNextInput("submitButton");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("submitButton");
                      }
                    }}
                    placeholder=" "
                    labelText="Draft"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </PageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Form"
        message="Are you sure you want to reset the form? All changes will be lost."
        confirmText="Reset"
        cancelText="Cancel"
      />

      {/* Options Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Options"
        size="xl"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="pt-5 pb-14 px-5">Modal Content</div>
      </Modal>
    </>
  );
}
