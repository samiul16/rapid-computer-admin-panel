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
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";

type SectionData = {
  code: string;
  title: string;
  description: string;
  manager: string;
  employeeCount: number;
  budget: number;
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
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function SectionFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [sectionLanguageValues, setSectionLanguageValues] = useState<
    Record<string, string>
  >({});

  // Permission checks
  const canCreate = usePermission("section", "create");
  const canView = usePermission("section", "view");
  const canEdit = usePermission("section", "edit");
  const canDelete = usePermission("section", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const title: boolean = usePermission("section", "create", "title");
  const code: boolean = usePermission("section", "create", "code");
  const description: boolean = usePermission(
    "section",
    "create",
    "description"
  );
  const manager: boolean = usePermission("section", "create", "manager");
  const employeeCount: boolean = usePermission(
    "section",
    "create",
    "employeeCount"
  );
  const budget: boolean = usePermission("section", "create", "budget");

  const isDefault: boolean = usePermission("section", "create", "isDefault");
  const isDraft: boolean = usePermission("section", "create", "isDraft");
  const canPdf: boolean = usePermission("section", "pdf");
  const canPrint: boolean = usePermission("section", "print");

  console.log("title", title);
  console.log("code", code);
  console.log("description", description);
  console.log("manager", manager);
  console.log("employeeCount", employeeCount);
  console.log("budget", budget);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Section codes for autocomplete
  const sectionCodes = ["S001", "S002", "S003", "S004", "S005", "S006"];

  // Form state
  const [formData, setFormData] = useState<SectionData>({
    code: "",
    title: "",
    description: "",
    manager: "",
    employeeCount: 0,
    budget: 0,
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
          navigate("/section/create");
        } else {
          navigate("/section/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/section/view");
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
      handlePrintSection(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Section created successfully!");
      handleReset();
    } else {
      toastSuccess("Section created successfully!");
      navigate("/section");
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
      inputRefs.current["code"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

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

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sections-details.pdf";
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
              toastRestore("Section saved as draft successfully");
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
        title={isEdit ? "Editing Section" : "Creating Section"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="section"
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
            {/* First Row: Code, Title, Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {/* Code field - only show if user can create */}
              {code && (
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
                      if (value) {
                        focusNextInput("title");
                      }
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
              )}

              {/* Title field - only show if user can create */}
              {title && (
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
                        // Here you can save the values to your form data
                        setFormData((prev) => ({
                          ...prev,
                          title_ar: values.ar || "",
                          title_hi: values.hi || "",
                          title_ur: values.ur || "",
                          title_bn: values.bn || "",
                        }));
                        // Focus next input after dropdown closes
                        setTimeout(() => {
                          focusNextInput("description");
                        }, 100);
                      }}
                      title="Section Name"
                      initialValues={sectionLanguageValues}
                    />
                  </div>
                </div>
              )}

              {/* Description field - only show if user can create */}
              {description && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("manager")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter section description"
                    required
                  />
                </div>
              )}

              {/* Manager field - only show if user can create */}
              {manager && (
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
              )}
            </div>

            {/* Second Row: Employee Count, Budget, Default, Draft */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {/* Employee Count field - only show if user can create */}
              {employeeCount && (
                <div className="md:col-span-3 space-y-2">
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
                    labelText="Employee Count"
                    tooltipText="Enter number of employees"
                    required
                  />
                </div>
              )}

              {/* Budget field - only show if user can create */}
              {budget && (
                <div className="md:col-span-3 space-y-2">
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
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="md:col-span-3 space-y-2 relative">
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
                <div className="md:col-span-3 space-y-2 relative">
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
