/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Select } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import PDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import type { StateData } from "@/types/states.types";
import { useNavigate, useLocation } from "react-router-dom";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";

type StateModuleData = {
  formData: StateData;
  hasChanges: boolean;
  scrollPosition?: number;
  stateLanguageValues?: Record<string, string>;
};

type Props = {
  isEdit?: boolean;
};

// Country options for dropdown
const COUNTRIES = [
  { value: "United States", label: "United States", code: "US" },
  { value: "Canada", label: "Canada", code: "CA" },
  { value: "United Kingdom", label: "United Kingdom", code: "GB" },
  { value: "Germany", label: "Germany", code: "DE" },
];

const initialData: StateData = {
  code: "CA",
  State: "California",
  Country_name: "United States",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function StateFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Get module ID based on edit mode
  const moduleId = isEdit ? "states-edit" : "states-create";

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<StateModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [stateLanguageValues, setStateLanguageValues] = useState<
    Record<string, string>
  >({});

  const codeInputRef = useRef<EditableInputRef>(null);
  const stateInputRef = useRef<EditableInputRef>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const countryInputRef = useRef<HTMLInputElement>(null);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  // Form state
  const [formData, setFormData] = useState<StateData>({
    code: "",
    State: "",
    Country_name: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Simplified restore logic using the custom hook
  useEffect(() => {
    // Auto-restore if:
    // 1. Has minimized data
    // 2. Haven't already restored
    // 3. Current form is empty (to avoid overwriting user input)
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData.State &&
      !formData.code &&
      !formData.Country_name;

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData;

      // Restore all the data
      setFormData(savedFormData);

      if (moduleData.stateLanguageValues) {
        setStateLanguageValues(moduleData.stateLanguageValues);
      }

      setIsRestoredFromMinimized(true);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition(moduleId);
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    formData.State,
    formData.code,
    formData.Country_name,
    moduleId,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available (but only if not restoring from minimized)
  useEffect(() => {
    if (
      isEdit &&
      initialData &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      setFormData({
        ...initialData,
      });
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized]);

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "code":
        stateInputRef.current?.focus();
        break;
      case "state":
        countryInputRef.current?.focus();
        break;
      case "country":
        defaultSwitchRef.current?.focus();
        break;
      case "default":
        activeSwitchRef.current?.focus();
        break;
      case "active":
        draftSwitchRef.current?.focus();
        break;
      case "draft":
        deleteButtonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const getRelativeTime = (dateString: string | null | Date) => {
    if (!dateString) return "--/--/----";

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  // Add this function to handle key navigation for switches and buttons
  const handleSwitchKeyDown = (
    e: React.KeyboardEvent,
    currentField: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Trigger the switch/button action first
      switch (currentField) {
        case "default":
          setFormData({ ...formData, isDefault: !formData.isDefault });
          break;
        case "active":
          setFormData({ ...formData, isActive: !formData.isActive });
          break;
        case "draft":
          setFormData({ ...formData, isDraft: !formData.isDraft });
          break;
        case "delete":
          setFormData({ ...formData, isDeleted: !formData.isDeleted });
          break;
      }
      // Then move to next field
      setTimeout(() => focusNextInput(currentField), 50);
    }
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Handle form reset using the custom hook
  const handleReset = async () => {
    setFormData({
      code: "",
      State: "",
      Country_name: "",
      isDefault: false,
      isActive: true,
      isDraft: false,
      createdAt: null,
      draftedAt: null,
      updatedAt: null,
      deletedAt: null,
      isDeleted: false,
    });
    setStateLanguageValues({});
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset module data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData(moduleId);
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }
  };

  const handlePrintState = (stateData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "State Details",
        data: [stateData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "State Code",
          State: "State Name",
          Country_name: "Country",
          isDefault: "Default State",
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
    if (checked && formData) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintState(formData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("stateData on pdf click", formData);
      const blob = await pdf(
        <PDF
          data={[formData]}
          title="State Details"
          subtitle="State Information Report"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "state-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleSaveTranslations = (translationData: any) => {
    console.log("Saved translations:", translationData);
    setStateLanguageValues(translationData);
    // You can update the formData with translations or handle them as needed
  };

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): StateModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      stateLanguageValues,
    };
  }, [formData, stateLanguageValues]);

  const popoverOptions = [
    {
      label: isEdit ? "Create" : "Edit",
      onClick: () => {
        if (isEdit) {
          navigate("/states/create");
        } else {
          navigate("/states/edit/undefined");
        }
      },
    },
    {
      label: "View",
      onClick: () => {
        navigate("/states/view");
      },
    },
  ];

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={isEdit ? "Edit State" : "Create State"}
        moduleRoute={location.pathname}
        onMinimize={handleMinimize}
        title={isEdit ? t("form.editingState") : t("form.creatingState")}
        listPath="states"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        additionalFooterButtons={
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="gap-2 text-primary rounded-full border-primary"
              onClick={handleReset}
            >
              {t("button.reset")}
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-primary rounded-full border-primary"
              onClick={() => formRef.current?.requestSubmit()}
            >
              {t("button.submit")}
            </Button>
          </div>
        }
        className="w-full"
      >
        <form
          ref={formRef}
          key={formKey}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* First Row: Code, State, Country */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.code")}</h3>
              <EditableInput
                ref={codeInputRef}
                id="code"
                name="code"
                className="w-full h-10"
                value={formData.code}
                onChange={handleChange}
                maxLength={3}
                onNext={() => focusNextInput("code")}
                onCancel={() => {}}
                tooltipText="Please enter state code (e.g., CA, NY)"
                required
              />
            </div>

            <div className="md:col-span-4 space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">State</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsLanguageModalOpen(true)}
                />
              </div>
              <EditableInput
                ref={stateInputRef}
                id="State"
                name="State"
                className="w-full h-10"
                value={formData.State}
                onChange={handleChange}
                onNext={() => focusNextInput("state")}
                onCancel={() => {}}
                tooltipText="Please enter state name"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">Country</h3>
              <Select
                ref={countryInputRef}
                id="Country_name"
                name="Country_name"
                className="w-full h-10"
                value={formData.Country_name}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    Country_name: value || "",
                  });
                  // Call focusNextInput if needed
                  focusNextInput("country");
                }}
                data={COUNTRIES.map((country) => ({
                  value: country.value,
                  label: `${country.label} (${country.code})`,
                }))}
                placeholder="Select a country..."
                searchable
                clearable
                required
                styles={{
                  input: {
                    height: "40px",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("country");
                  }
                }}
              />
            </div>
          </div>

          {/* Second Row: Default, Draft, Active, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.default")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={defaultSwitchRef}
                  id="isDefault"
                  name="isDefault"
                  className=""
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDefault: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "default")}
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={activeSwitchRef}
                  id="isActive"
                  name="isActive"
                  className=""
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "active")}
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={draftSwitchRef}
                  id="isDraft"
                  name="isDraft"
                  className=""
                  checked={formData.isDraft}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDraft: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "draft")}
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">
                {formData.isDeleted ? t("button.restore") : t("button.delete")}
              </h3>
              <div className="h-10 flex items-center">
                <Button
                  ref={deleteButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isDeleted: !formData.isDeleted,
                    })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "delete")}
                >
                  {formData.isDeleted ? (
                    <Undo2 className="text-green-500" />
                  ) : (
                    <Trash2 className="text-red-500" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Third Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p>{getRelativeTime(formData.createdAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{getRelativeTime(formData.updatedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{getRelativeTime(formData.draftedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p>{getRelativeTime(formData.deletedAt)}</p>
            </div>
          </div>
        </form>
      </MinimizablePageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        onSave={handleSaveTranslations}
        initialData={[
          {
            id: 1,
            english: formData.State || "State Name",
            arabic: "",
            bangla: "",
          },
        ]}
        title="Language Translator"
      />
    </>
  );
}
