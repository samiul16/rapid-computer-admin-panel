/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type OnboardingData = {
  selectStaff: string;
  generalInformation: string;
  staffFullName: string;
  address: string;
  assetAllocation: string;
  typeOfTraining: string;
  trainingProgram: string;
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

const initialData: OnboardingData = {
  selectStaff: "John Doe",
  generalInformation: "New hire onboarding",
  staffFullName: "John Michael Doe",
  address: "123 Main St, City, State 12345",
  assetAllocation: "Laptop, Phone, ID Card",
  typeOfTraining: "Technical Training",
  trainingProgram: "Full Stack Development",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function OnboardingFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("onboarding", "create");
  const canView = usePermission("onboarding", "view");
  const canEdit = usePermission("onboarding", "edit");
  const canDelete = usePermission("onboarding", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof OnboardingData>(
    "onboarding",
    "create",
    [
      "selectStaff",
      "generalInformation",
      "staffFullName",
      "address",
      "assetAllocation",
      "typeOfTraining",
      "trainingProgram",
      "isDefault",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("onboarding", "pdf");
  const canPrint: boolean = usePermission("onboarding", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
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
  const generalInfoOptions = [
    "New hire onboarding",
    "Department transfer",
    "Promotion onboarding",
    "Intern onboarding",
    "Contractor onboarding",
    "Returning employee",
    "Seasonal hire",
    "Remote worker onboarding",
    "Part-time onboarding",
    "Executive onboarding",
    "Technical specialist",
    "Customer service rep",
    "Software developer",
    "QA engineer",
    "Project manager",
    "Team lead",
    "Client relations",
    "Virtual collaboration",
    "Data analyst",
    "Marketing specialist",
  ];
  const trainingTypeOptions = [
    "Technical Training",
    "Process Training",
    "Leadership Training",
    "Basic Training",
    "Security Training",
    "Refresher Training",
    "Safety Training",
    "Remote Work Training",
    "Part-time Training",
    "Executive Training",
    "Quality Assurance Training",
    "Customer Service Training",
    "Project Management Training",
    "Data Analysis Training",
    "Marketing Training",
  ];
  const trainingProgramOptions = [
    "Full Stack Development",
    "Customer Service Excellence",
    "Management Skills",
    "Company Orientation",
    "Workplace Safety",
    "Updated Procedures",
    "Workplace Protocols",
    "Virtual Collaboration",
    "Flexible Work Arrangements",
    "Strategic Leadership",
    "Advanced Skills Development",
    "Client Relations Excellence",
    "Software Development",
    "Testing Methodologies",
    "Agile Methodologies",
    "Team Management",
    "Customer Success",
    "Business Intelligence",
    "Digital Marketing",
  ];

  // Form state
  const [formData, setFormData] = useState<OnboardingData>({
    selectStaff: "",
    generalInformation: "",
    staffFullName: "",
    address: "",
    assetAllocation: "",
    typeOfTraining: "",
    trainingProgram: "",
    isDefault: isDefaultState === "Yes",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" /> // Green for Plus
      ) : (
        <Edit className="w-5 h-5 text-blue-500" /> // Blue for Edit
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/onboarding/create");
        } else {
          navigate("/onboarding/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/onboarding/view");
      },
      // Only show if user has permission
      show: canView,
    },
  ]);

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)------------

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintOnboardings(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Onboarding record created successfully!");
      handleReset();
    } else {
      toastSuccess("Onboarding record created successfully!");
      navigate("/onboarding");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      selectStaff: "",
      generalInformation: "",
      staffFullName: "",
      address: "",
      assetAllocation: "",
      typeOfTraining: "",
      trainingProgram: "",
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

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["selectStaff"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintOnboardings = (onboardingData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Onboarding Details",
        data: [onboardingData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          selectStaff: "Select Staff",
          generalInformation: "General Information",
          staffFullName: "Staff Full Name",
          address: "Address",
          assetAllocation: "Asset Allocation",
          typeOfTraining: "Type of Training",
          trainingProgram: "Training Program",
          isDefault: "Default Onboarding",
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
      console.log("onboardingData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Onboarding Details"
          subtitle="Onboarding Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "onboarding-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

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
              toastRestore("Onboarding record saved as draft successfully");
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
        title={isEdit ? "Editing Onboarding" : "Creating Onboarding"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="onboarding"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        // Removed onExport prop
        additionalFooterButtons={
          // Only show buttons if user can create
          canCreate ? (
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
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
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
            {/* Basic Onboarding Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.selectStaff && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("selectStaff")(el)}
                    id="selectStaff"
                    name="selectStaff"
                    options={staffOptions}
                    value={formData.selectStaff}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        selectStaff: value,
                      }));
                      focusNextInput("generalInformation");
                    }}
                    onEnterPress={() => {
                      if (formData.selectStaff) {
                        focusNextInput("generalInformation");
                      }
                    }}
                    placeholder=" "
                    labelText="Select Staff"
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

              {permissionsFields.generalInformation && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("generalInformation")(el)}
                    id="generalInformation"
                    name="generalInformation"
                    options={generalInfoOptions}
                    value={formData.generalInformation}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        generalInformation: value,
                      }));
                      focusNextInput("staffFullName");
                    }}
                    onEnterPress={() => {
                      if (formData.generalInformation) {
                        focusNextInput("staffFullName");
                      }
                    }}
                    placeholder=" "
                    labelText="General Information"
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

              {permissionsFields.staffFullName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("staffFullName")}
                    id="staffFullName"
                    name="staffFullName"
                    value={formData.staffFullName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("address")}
                    onCancel={() =>
                      setFormData({ ...formData, staffFullName: "" })
                    }
                    labelText="Staff Full Name"
                    tooltipText="Enter staff full name"
                    required
                  />
                </div>
              )}

              {permissionsFields.address && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("assetAllocation")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText="Address"
                    tooltipText="Enter staff address"
                    required
                  />
                </div>
              )}
            </div>

            {/* Training and Asset Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.assetAllocation && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("assetAllocation")}
                    id="assetAllocation"
                    name="assetAllocation"
                    value={formData.assetAllocation}
                    onChange={handleChange}
                    onNext={() => focusNextInput("typeOfTraining")}
                    onCancel={() =>
                      setFormData({ ...formData, assetAllocation: "" })
                    }
                    labelText="Asset Allocation"
                    tooltipText="Enter asset allocation details"
                    required
                  />
                </div>
              )}

              {permissionsFields.typeOfTraining && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("typeOfTraining")(el)}
                    id="typeOfTraining"
                    name="typeOfTraining"
                    options={trainingTypeOptions}
                    value={formData.typeOfTraining}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        typeOfTraining: value,
                      }));
                      focusNextInput("trainingProgram");
                    }}
                    onEnterPress={() => {
                      if (formData.typeOfTraining) {
                        focusNextInput("trainingProgram");
                      }
                    }}
                    placeholder=" "
                    labelText="Type of Training"
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

              {permissionsFields.trainingProgram && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("trainingProgram")(el)}
                    id="trainingProgram"
                    name="trainingProgram"
                    options={trainingProgramOptions}
                    value={formData.trainingProgram}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        trainingProgram: value,
                      }));
                      focusNextInput("isDefault");
                    }}
                    onEnterPress={() => {
                      if (formData.trainingProgram) {
                        focusNextInput("isDefault");
                      }
                    }}
                    placeholder=" "
                    labelText="Training Program"
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
            </div>

            {/* System Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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
