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
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";

type SectionData = {
  code: string;
  title: string;
  description: string;
  manager: string;
  employeeCount: number;
  budget: number;
  // Add multilingual section names
  title_ar?: string;
  title_hi?: string;
  title_ur?: string;
  title_bn?: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  flag: string | null;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: SectionData = {
  code: "S001",
  title: "Kitchen",
  description: "Main kitchen area for food preparation",
  manager: "Chef Johnson",
  employeeCount: 15,
  budget: 1200000,
  isDefault: false,
  isActive: true,
  isDraft: false,
  flag: null,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function SectionEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isActiveState, setIsActiveState] = useState<"Yes" | "No" | string>(
    "No"
  );

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [sectionLanguageValues, setSectionLanguageValues] = useState<
    Record<string, string>
  >({});

  // Form state
  const [formData, setFormData] = useState<SectionData>({
    code: "",
    title: "",
    description: "",
    manager: "",
    employeeCount: 0,
    budget: 0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    flag: null,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // get permission
  const canPdf: boolean = usePermission("section", "pdf");
  const canPrint: boolean = usePermission("section", "print");

  // Section codes for autocomplete
  const sectionCodes = ["S001", "S002", "S003", "S004", "S005", "S006"];

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
      // Initialize language values if they exist
      setSectionLanguageValues({
        ar: initialData.title_ar || "",
        hi: initialData.title_hi || "",
        ur: initialData.title_ur || "",
        bn: initialData.title_bn || "",
      });
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsActiveState(initialData.isActive ? "Yes" : "No");
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
      handlePrintSection(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("code");
    } else {
      navigate("/section");
    }
    toastSuccess("Section Edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      code: "",
      title: "",
      description: "",
      manager: "",
      employeeCount: 0,
      budget: 0,
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      flag: null,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setIsActiveState("No");
    setSectionLanguageValues({});

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintSection = (sectionData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Section Details",
        data: [sectionData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Section Code",
          title: "Section Name",
          description: "Description",
          manager: "Manager",
          employeeCount: "Employee Count",
          budget: "Budget",
          isDefault: "Default Section",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          flag: "Flag",
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
      console.log("sectionData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Section Details"
          subtitle="Section Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sections-details.pdf";
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
          navigate("/section/create");
        } else {
          navigate("/section/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/section/view");
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
              toastRestore("Section saved as draft successfully");
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
        title={isEdit ? "Editing Section" : "Creating Section"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="section"
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
            {/* First Row: Code, Title, Description, Manager */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("code")(el)}
                  id="code"
                  name="code"
                  allowCustomInput={true}
                  options={sectionCodes}
                  value={formData.code}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, code: value });
                    focusNextInput("title");
                  }}
                  onEnterPress={() => {
                    if (formData.code) {
                      focusNextInput("title");
                    }
                  }}
                  placeholder=" "
                  labelText="Code"
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

              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("title")}
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, title: "" })}
                    labelText="Name"
                    tooltipText="Enter the section name"
                    required
                  />

                  {/* Language Input Dropdown */}
                  <LanguageInputDropdown
                    onSubmit={(values) => {
                      setSectionLanguageValues(values);
                      console.log("Section translations:", values);
                      setFormData((prev) => ({
                        ...prev,
                        title_ar: values.ar || "",
                        title_hi: values.hi || "",
                        title_ur: values.ur || "",
                        title_bn: values.bn || "",
                      }));
                      setTimeout(() => {
                        focusNextInput("description");
                      }, 100);
                    }}
                    title="Name"
                    initialValues={sectionLanguageValues}
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("description")}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onNext={() => focusNextInput("manager")}
                  onCancel={() => setFormData({ ...formData, description: "" })}
                  labelText="Description"
                  tooltipText="Enter section description"
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("manager")}
                  id="manager"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  onNext={() => focusNextInput("employeeCount")}
                  onCancel={() => setFormData({ ...formData, manager: "" })}
                  labelText="Manager"
                  tooltipText="Enter section manager"
                  required
                />
              </div>
            </div>

            {/* Second Row: Employee Count, Budget, Default, Active, Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("employeeCount")}
                  id="employeeCount"
                  name="employeeCount"
                  type="number"
                  value={formData.employeeCount.toString()}
                  onChange={handleChange}
                  onNext={() => focusNextInput("budget")}
                  onCancel={() =>
                    setFormData({ ...formData, employeeCount: 0 })
                  }
                  labelText="Employees"
                  tooltipText="Enter number of employees"
                  required
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("budget")}
                  id="budget"
                  name="budget"
                  type="number"
                  value={formData.budget.toString()}
                  onChange={handleChange}
                  onNext={() => focusNextInput("isDefault")}
                  onCancel={() => setFormData({ ...formData, budget: 0 })}
                  labelText="Budget"
                  tooltipText="Enter section budget"
                  required
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
                  ref={(el: any) => setRef("isActive")(el)}
                  id="isActive"
                  name="isActive"
                  labelText="Draft"
                  isSelectableOnly={true}
                  options={["No", "Yes"]}
                  value={isActiveState === "Yes" ? "Yes" : "No"}
                  onValueChange={(value: string) => {
                    const isYes = value === "Yes";
                    setIsActiveState(isYes ? "Yes" : "No");
                    setFormData((prev) => ({
                      ...prev,
                      isActive: isYes,
                    }));
                    focusNextInput("isDeleted");
                  }}
                  onEnterPress={() => {
                    focusNextInput("isDeleted");
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
