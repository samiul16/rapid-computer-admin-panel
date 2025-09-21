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

type SampleReceivingData = {
  branch: string;
  receivingNo: string;
  clientName: string;
  clientReference: string;
  typeOfSample: string;
  requiredTests: string;
  numberOfSample: number;
  section: string;
  deliveredBy: string;
  receivedBy: string;
  receivingDate: string; // Format: "YYYY-MM-DD"
  receivingTime: string; // Format: "HH:mm"
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

const initialData: SampleReceivingData = {
  branch: "Main Branch",
  receivingNo: "SR-001",
  clientName: "ABC Laboratories",
  clientReference: "REF-2024-001",
  typeOfSample: "Blood Sample",
  requiredTests: "CBC, Blood Sugar",
  numberOfSample: 5,
  section: "Hematology",
  deliveredBy: "John Smith",
  receivedBy: "Dr. Sarah Johnson",
  receivingDate: "2024-01-15",
  receivingTime: "09:30",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function SampleReceivingFormPage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("sampleReceiving", "create");
  const canView = usePermission("sampleReceiving", "view");
  const canEdit = usePermission("sampleReceiving", "edit");
  const canDelete = usePermission("sampleReceiving", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const branch: boolean = usePermission("sampleReceiving", "create", "branch");
  const receivingNo: boolean = usePermission(
    "sampleReceiving",
    "create",
    "receivingNo"
  );
  const clientName: boolean = usePermission(
    "sampleReceiving",
    "create",
    "clientName"
  );
  const clientReference: boolean = usePermission(
    "sampleReceiving",
    "create",
    "clientReference"
  );
  const typeOfSample: boolean = usePermission(
    "sampleReceiving",
    "create",
    "typeOfSample"
  );
  const requiredTests: boolean = usePermission(
    "sampleReceiving",
    "create",
    "requiredTests"
  );
  const numberOfSample: boolean = usePermission(
    "sampleReceiving",
    "create",
    "numberOfSample"
  );
  const section: boolean = usePermission(
    "sampleReceiving",
    "create",
    "section"
  );
  const deliveredBy: boolean = usePermission(
    "sampleReceiving",
    "create",
    "deliveredBy"
  );
  const receivedBy: boolean = usePermission(
    "sampleReceiving",
    "create",
    "receivedBy"
  );
  const receivingDate: boolean = usePermission(
    "sampleReceiving",
    "create",
    "receivingDate"
  );
  const receivingTime: boolean = usePermission(
    "sampleReceiving",
    "create",
    "receivingTime"
  );

  const isDefault: boolean = usePermission(
    "sampleReceiving",
    "create",
    "isDefault"
  );
  const isDraft: boolean = usePermission(
    "sampleReceiving",
    "create",
    "isDraft"
  );
  const canPdf: boolean = usePermission("sampleReceiving", "pdf");
  const canPrint: boolean = usePermission("sampleReceiving", "print");

  console.log("branch", branch);
  console.log("receivingNo", receivingNo);
  console.log("clientName", clientName);
  console.log("section", section);
  console.log("deliveredBy", deliveredBy);
  console.log("receivedBy", receivedBy);
  console.log("receivingDate", receivingDate);
  console.log("receivingTime", receivingTime);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const branches = [
    "Main Branch",
    "North Branch",
    "South Branch",
    "East Branch",
    "West Branch",
    "Central Branch",
  ];

  const clientNames = [
    "ABC Laboratories",
    "XYZ Medical Center",
    "City Hospital",
    "Community Clinic",
    "Private Practice",
    "Research Institute",
    "University Hospital",
    "Specialty Clinic",
    "Diagnostic Center",
    "Medical Group",
    "Health Center",
    "Laboratory Services",
    "Clinical Research",
    "Pathology Lab",
    "Immunology Center",
    "Toxicology Lab",
    "Endocrinology Clinic",
    "Cardiology Center",
    "Oncology Institute",
    "Pediatric Clinic",
  ];

  const sections = [
    "Hematology",
    "Microbiology",
    "Pathology",
    "Molecular Biology",
    "Parasitology",
    "Biochemistry",
    "Neurology",
    "Cytogenetics",
    "Rheumatology",
    "Cytology",
    "Genetics",
    "Immunology",
    "Toxicology",
    "Endocrinology",
    "Cardiology",
    "Oncology",
    "Pediatrics",
  ];

  const deliveredByOptions = [
    "John Smith",
    "Mike Wilson",
    "Lisa Brown",
    "Anna Davis",
    "Tom Anderson",
    "Peter Johnson",
    "Rachel Green",
    "Chris Taylor",
    "Jennifer Adams",
    "Daniel Martinez",
    "Sophie Turner",
    "Emma Watson",
    "Mark Wilson",
    "Laura Chen",
    "David Lee",
    "Jessica Park",
    "Ryan Thompson",
    "Amanda Foster",
    "Michael Garcia",
    "Sarah Miller",
  ];

  const receivedByOptions = [
    "Dr. Sarah Johnson",
    "Dr. Robert Chen",
    "Dr. David Miller",
    "Dr. Emily White",
    "Dr. Maria Garcia",
    "Dr. James Wilson",
    "Dr. Kevin Lee",
    "Dr. Amanda Clark",
    "Dr. Michael Brown",
    "Dr. Lisa Thompson",
    "Dr. Alex Rodriguez",
    "Dr. Thomas Anderson",
    "Dr. Sarah Davis",
    "Dr. Robert Kim",
    "Dr. Maria Rodriguez",
    "Dr. Kevin Johnson",
    "Dr. Lisa Wang",
    "Dr. James Brown",
    "Dr. Emily Chen",
    "Dr. David Wilson",
  ];

  // Form state
  const [formData, setFormData] = useState<SampleReceivingData>({
    branch: "",
    receivingNo: "",
    clientName: "",
    clientReference: "",
    typeOfSample: "",
    requiredTests: "",
    numberOfSample: 0,
    section: "",
    deliveredBy: "",
    receivedBy: "",
    receivingDate: "",
    receivingTime: "",
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
          navigate("/sample-receiving/create");
        } else {
          navigate("/sample-receiving/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/sample-receiving/view");
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
      handlePrintSampleReceiving(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Sample receiving created successfully!");
      handleReset();
    } else {
      toastSuccess("Sample receiving created successfully!");
      navigate("/sample-receiving");
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
      branch: "",
      receivingNo: "",
      clientName: "",
      clientReference: "",
      typeOfSample: "",
      requiredTests: "",
      numberOfSample: 0,
      section: "",
      deliveredBy: "",
      receivedBy: "",
      receivingDate: "",
      receivingTime: "",
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
      inputRefs.current["branch"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintSampleReceiving = (sampleReceivingData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Sample Receiving Details",
        data: [sampleReceivingData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          receivingNo: "Receiving No",
          clientName: "Client Name",
          clientReference: "Client Reference",
          typeOfSample: "Type of Sample",
          requiredTests: "Required Tests",
          numberOfSample: "Number of Sample",
          section: "Section",
          deliveredBy: "Delivered By",
          receivedBy: "Received By",
          receivingDate: "Receiving Date",
          receivingTime: "Receiving Time",
          isDefault: "Default Sample Receiving",
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
      console.log("sampleReceivingData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Sample Receiving Details"
          subtitle="Sample Receiving Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample-receiving-details.pdf";
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
              toastRestore("Sample receiving saved as draft successfully");
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
        title={
          isEdit ? "Editing Sample Receiving" : "Creating Sample Receiving"
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="sample-receiving"
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
            {/* First Row: Branch, Receiving No, Client Name, Client Reference */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Branch field - only show if user can create */}
              {branch && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("branch")(el)}
                      id="branch"
                      name="branch"
                      allowCustomInput={true}
                      options={branches}
                      value={formData.branch}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, branch: value });
                        if (value) {
                          focusNextInput("receivingNo");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.branch) {
                          focusNextInput("receivingNo");
                        }
                      }}
                      placeholder=" "
                      labelText="Branch"
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
                </div>
              )}

              {/* Receiving No field - only show if user can create */}
              {receivingNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("receivingNo")}
                    id="receivingNo"
                    name="receivingNo"
                    value={formData.receivingNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("clientName")}
                    onCancel={() =>
                      setFormData({ ...formData, receivingNo: "" })
                    }
                    labelText="Receiving No"
                    tooltipText="Enter receiving number"
                    required
                  />
                </div>
              )}

              {/* Client Name field - only show if user can create */}
              {clientName && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("clientName")(el)}
                      id="clientName"
                      name="clientName"
                      allowCustomInput={true}
                      options={clientNames}
                      value={formData.clientName}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, clientName: value });
                        if (value) {
                          focusNextInput("clientReference");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.clientName) {
                          focusNextInput("clientReference");
                        }
                      }}
                      placeholder=" "
                      labelText="Client Name"
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
                </div>
              )}

              {/* Client Reference field - only show if user can create */}
              {clientReference && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("clientReference")}
                    id="clientReference"
                    name="clientReference"
                    value={formData.clientReference}
                    onChange={handleChange}
                    onNext={() => focusNextInput("typeOfSample")}
                    onCancel={() =>
                      setFormData({ ...formData, clientReference: "" })
                    }
                    labelText="Client Reference"
                    tooltipText="Enter client reference"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Type of Sample, Required Tests, Number of Sample, Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Type of Sample field - only show if user can create */}
              {typeOfSample && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("typeOfSample")}
                    id="typeOfSample"
                    name="typeOfSample"
                    value={formData.typeOfSample}
                    onChange={handleChange}
                    onNext={() => focusNextInput("requiredTests")}
                    onCancel={() =>
                      setFormData({ ...formData, typeOfSample: "" })
                    }
                    labelText="Type of Sample"
                    tooltipText="Enter type of sample"
                    required
                  />
                </div>
              )}

              {/* Required Tests field - only show if user can create */}
              {requiredTests && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("requiredTests")}
                    id="requiredTests"
                    name="requiredTests"
                    value={formData.requiredTests}
                    onChange={handleChange}
                    onNext={() => focusNextInput("numberOfSample")}
                    onCancel={() =>
                      setFormData({ ...formData, requiredTests: "" })
                    }
                    labelText="Required Tests"
                    tooltipText="Enter required tests"
                    required
                  />
                </div>
              )}

              {/* Number of Sample field - only show if user can create */}
              {numberOfSample && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("numberOfSample")}
                    id="numberOfSample"
                    name="numberOfSample"
                    value={formData.numberOfSample.toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFormData({ ...formData, numberOfSample: value });
                    }}
                    onNext={() => focusNextInput("section")}
                    onCancel={() =>
                      setFormData({ ...formData, numberOfSample: 0 })
                    }
                    labelText="Number of Sample"
                    tooltipText="Enter number of samples"
                    required
                    type="number"
                  />
                </div>
              )}

              {/* Section field - only show if user can create */}
              {section && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("section")(el)}
                      id="section"
                      name="section"
                      allowCustomInput={true}
                      options={sections}
                      value={formData.section}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, section: value });
                        if (value) {
                          focusNextInput("deliveredBy");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.section) {
                          focusNextInput("deliveredBy");
                        }
                      }}
                      placeholder=" "
                      labelText="Section"
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
                </div>
              )}
            </div>

            {/* Third Row: Delivered By, Received By, Default, Draft */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Delivered By field - only show if user can create */}
              {deliveredBy && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("deliveredBy")(el)}
                      id="deliveredBy"
                      name="deliveredBy"
                      allowCustomInput={true}
                      options={deliveredByOptions}
                      value={formData.deliveredBy}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, deliveredBy: value });
                        if (value) {
                          focusNextInput("receivedBy");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.deliveredBy) {
                          focusNextInput("receivedBy");
                        }
                      }}
                      placeholder=" "
                      labelText="Delivered By"
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
                </div>
              )}

              {/* Received By field - only show if user can create */}
              {receivedBy && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("receivedBy")(el)}
                      id="receivedBy"
                      name="receivedBy"
                      allowCustomInput={true}
                      options={receivedByOptions}
                      value={formData.receivedBy}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, receivedBy: value });
                        if (value) {
                          focusNextInput("receivingDate");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.receivedBy) {
                          focusNextInput("receivingDate");
                        }
                      }}
                      placeholder=" "
                      labelText="Received By"
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
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      // Call focusNextInput if needed
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

              {/* Draft field - only show if user can create */}
              {isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
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

            {/* Fourth Row: Receiving Date, Receiving Time */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Receiving Date field - only show if user can create */}
              {receivingDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("receivingDate")}
                    id="receivingDate"
                    name="receivingDate"
                    value={formData.receivingDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("receivingTime")}
                    onCancel={() =>
                      setFormData({ ...formData, receivingDate: "" })
                    }
                    labelText="Receiving Date"
                    tooltipText="Enter receiving date"
                    required
                    type="date"
                  />
                </div>
              )}

              {/* Receiving Time field - only show if user can create */}
              {receivingTime && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("receivingTime")}
                    id="receivingTime"
                    name="receivingTime"
                    value={formData.receivingTime}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, receivingTime: "" })
                    }
                    labelText="Receiving Time"
                    tooltipText="Enter receiving time"
                    required
                    type="time"
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
