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

export default function SampleReceivingEditPage({ isEdit = false }: Props) {
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
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // get permission
  const canPdf: boolean = usePermission("sampleReceiving", "pdf");
  const canPrint: boolean = usePermission("sampleReceiving", "print");

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintSampleReceiving(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("branch");
    } else {
      navigate("/sample-receiving");
    }
    toastSuccess("Sample Receiving Edited successfully");
  };

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
    setIsDraftState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["branch"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

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

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample-receiving-details.pdf";
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
          navigate("/sample-receiving/create");
        } else {
          navigate("/sample-receiving/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/sample-receiving/view");
      },
    },
  ]);

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

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
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft]);

  return (
    <>
      <PageLayout
        title={
          isEdit ? "Editing Sample Receiving" : "Creating Sample Receiving"
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="sample-receiving"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
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
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* First Row: Branch, Receiving No, Client Name, Client Reference */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("branch")(el)}
                  id="branch"
                  name="branch"
                  allowCustomInput={true}
                  options={branches}
                  value={formData.branch}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, branch: value });
                    focusNextInput("receivingNo");
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

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("receivingNo")}
                  id="receivingNo"
                  name="receivingNo"
                  value={formData.receivingNo}
                  onChange={handleChange}
                  onNext={() => focusNextInput("clientName")}
                  onCancel={() => setFormData({ ...formData, receivingNo: "" })}
                  labelText="Receiving No"
                  tooltipText="Enter receiving number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("clientName")(el)}
                  id="clientName"
                  name="clientName"
                  allowCustomInput={true}
                  options={clientNames}
                  value={formData.clientName}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, clientName: value });
                    focusNextInput("clientReference");
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
            </div>

            {/* Second Row: Type of Sample, Required Tests, Number of Sample, Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
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

              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("section")(el)}
                  id="section"
                  name="section"
                  allowCustomInput={true}
                  options={sections}
                  value={formData.section}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, section: value });
                    focusNextInput("deliveredBy");
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

            {/* Third Row: Delivered By, Received By, Default, Active */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("deliveredBy")(el)}
                  id="deliveredBy"
                  name="deliveredBy"
                  allowCustomInput={true}
                  options={deliveredByOptions}
                  value={formData.deliveredBy}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, deliveredBy: value });
                    focusNextInput("receivedBy");
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

              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("receivedBy")(el)}
                  id="receivedBy"
                  name="receivedBy"
                  allowCustomInput={true}
                  options={receivedByOptions}
                  value={formData.receivedBy}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, receivedBy: value });
                    focusNextInput("receivingDate");
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

              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isDefault")(el)}
                  id="isDefault"
                  name="isDefault"
                  options={["No", "Yes"]}
                  isSelectableOnly={true}
                  value={isDefaultState === "Yes" ? "Yes" : "No"}
                  onValueChange={(value: string) => {
                    const isYes = value === "Yes";
                    setIsDefaultState(isYes ? "Yes" : "No");
                    setFormData((prev) => ({
                      ...prev,
                      isDefault: isYes,
                    }));
                    focusNextInput("isActive");
                  }}
                  onEnterPress={() => {
                    focusNextInput("isActive");
                  }}
                  placeholder=" "
                  labelText="Default"
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

              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isDraft")(el)}
                  id="isDraft"
                  name="isDraft"
                  labelText="Draft"
                  isSelectableOnly={true}
                  options={["No", "Yes"]}
                  value={isDraftState === "Yes" ? "Yes" : "No"}
                  onValueChange={(value: string) => {
                    const isYes = value === "Yes";
                    setIsDraftState(isYes ? "Yes" : "No");
                    setFormData((prev) => ({
                      ...prev,
                      isDraft: isYes,
                    }));
                    focusNextInput("submitButton");
                  }}
                  onEnterPress={() => {
                    focusNextInput("submitButton");
                  }}
                  placeholder=" "
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
