/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Autocomplete, Modal } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import PDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";

export type TCity = {
  title: string;
  code: string;
  country: string;
  state: string;
  countryCode: string;
  stateCode: string;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type CityModuleData = {
  formData: TCity;
  hasChanges: boolean;
  scrollPosition?: number;
  imagePreview?: string | null;
  selectedCountry?: string;
};

type Props = {
  isEdit?: boolean;
};

const initialData: TCity = {
  code: "NY",
  title: "New York",
  country: "United States of America",
  state: "New York",
  countryCode: "US",
  stateCode: "NY",

  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,

  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

type CountryOption = {
  code: string;
  name: string;
  flag: string;
  callingCode: string;
};

type StateOption = {
  code: string;
  name: string;
  countryCode: string;
};

const MOCK_COUNTRIES: CountryOption[] = [
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", callingCode: "+971" },
  { code: "US", name: "United States", flag: "🇺🇸", callingCode: "+1" },
];

const MOCK_STATES: StateOption[] = [
  { code: "DXB", name: "Dubai", countryCode: "AE" },
  { code: "AUH", name: "Abu Dhabi", countryCode: "AE" },
  { code: "CA", name: "California", countryCode: "US" },
  { code: "NY", name: "New York", countryCode: "US" },
];

const COUNTRY_DATA = MOCK_COUNTRIES.map((country) => country.code);

export default function CityForm({ isEdit = false }: Props) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if this is edit mode based on URL or id parameter
  const actualIsEdit = isEdit || (id && id !== "undefined");
  const moduleId = actualIsEdit
    ? `cities-edit-${id || "new"}`
    : "cities-create";

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<CityModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  const codeInputRef = useRef<EditableInputRef>(null);
  const titleInputRef = useRef<EditableInputRef>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const flagUploadRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLButtonElement>(null);
  const stateCodeRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<TCity>({
    code: "",
    title: "",
    country: "",
    state: "",
    countryCode: "",
    stateCode: "",

    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,

    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
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
      !formData.title &&
      !formData.code &&
      !formData.countryCode;

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData;

      // Restore all the data
      setFormData(savedFormData);

      if (moduleData.imagePreview) {
        setImagePreview(moduleData.imagePreview);
      }

      if (moduleData.selectedCountry) {
        setSelectedCountry(moduleData.selectedCountry);
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
    formData.title,
    formData.code,
    formData.countryCode,
    moduleId,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available (but only if not restoring from minimized)
  useEffect(() => {
    if (
      actualIsEdit &&
      initialData &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      setFormData({
        ...initialData,
      });
    }
  }, [
    actualIsEdit,
    initialData,
    hasMinimizedData,
    isRestoredFromMinimized,
    moduleId,
  ]);

  // Handle id parameter changes
  useEffect(() => {
    console.log("id in edit page for city ", id);
    if (id && id === "undefined") {
      setFormData({
        code: "",
        title: "",
        country: "",
        state: "",
        countryCode: "",
        stateCode: "",

        isDefault: false,
        isActive: true,
        isDeleted: false,
        isDraft: false,

        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
      });
    } else if (id && id !== "undefined") {
      const fetchedData = initialData;
      setFormData(fetchedData);
    }
  }, [id]);

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "code":
        titleInputRef.current?.focus();
        break;
      case "title":
        countryRef.current?.focus();
        break;
      case "countryCode":
        stateCodeRef.current?.focus();
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
      case "delete":
        flagUploadRef.current?.focus();
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
        case "countryCode":
          stateCodeRef.current?.focus();
          break;
        case "stateCode":
          defaultSwitchRef.current?.focus();
          break;
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

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  // Handle image file selection
  const handleImageFile = (file: File) => {
    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData({ ...formData });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload via file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
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
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        code: "",
        title: "",
        country: "",
        state: "",
        countryCode: "",
        stateCode: "",

        isDefault: false,
        isActive: true,
        isDeleted: false,
        isDraft: false,

        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
      });
      setImagePreview(null);
      setSelectedCountry("");
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
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePrintCountry = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "City Report",
        data: printData,
        fieldLabels: {
          name: "Name",
          code: "Code",
          description: "Description",
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
      setTimeout(() => handlePrintCountry(formData), 100);
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
      console.log("cityData on pdf click", formData);
      const blob = await pdf(
        <PDF
          data={[formData]}
          title="City Details"
          subtitle="City Information Report"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "city-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getSelectedCountry = () => {
    return MOCK_COUNTRIES.find((c) => c.code === formData.countryCode);
  };

  const handleCountryChange = (value: string) => {
    setFormData({
      ...formData,
      countryCode: value,
    });
  };

  const handleStateChange = (value: string) => {
    setFormData({
      ...formData,
      stateCode: value,
    });
  };

  const getFilteredStates = () => {
    return MOCK_STATES.filter(
      (state) => state.countryCode === formData.countryCode
    );
  };

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): CityModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      imagePreview,
      selectedCountry,
    };
  }, [formData, imagePreview, selectedCountry]);

  const popoverOptions = [
    {
      label: actualIsEdit ? "Create" : "Edit",
      onClick: () => {
        // Handle navigation based on current state
        if (actualIsEdit) {
          // Navigate to create page
          navigate("/cities/create");
        } else {
          // Navigate to edit page
          navigate("/cities/edit/undefined");
        }
      },
    },
    {
      label: "View",
      onClick: () => {
        navigate("/cities/view");
      },
    },
  ];

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={actualIsEdit ? "Edit City" : "Create City"}
        moduleRoute={location.pathname}
        onMinimize={handleMinimize}
        title={actualIsEdit ? t("form.editingCity") : t("form.creatingCity")}
        listPath="cities"
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
          {/* First Row: Code, City, Country, State */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Code Input */}
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium">{t("form.code")}</h3>

              {actualIsEdit ? (
                <Autocomplete
                  data={COUNTRY_DATA}
                  value={selectedCountry}
                  onChange={(value) => {
                    setSelectedCountry(value);
                    setFormData({
                      ...formData,
                      code: value,
                    });
                  }}
                  placeholder="Select a country..."
                  disabled={false}
                  className="w-full"
                  styles={{
                    input: {
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              ) : (
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
                  tooltipText="Please enter city code (e.g., NY, )"
                  required
                />
              )}
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium">{t("form.city")}</h3>
              <EditableInput
                ref={titleInputRef}
                id="title"
                name="title"
                className="w-full h-10"
                value={formData.title}
                onChange={handleChange}
                onNext={() => focusNextInput("title")}
                onCancel={() => {}}
                tooltipText="Please enter city name"
                required
              />
            </div>

            {/* Country Dropdown */}
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium">{t("form.country")}</h3>
              <Select
                value={formData.countryCode}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger
                  ref={countryRef}
                  name="countryCode"
                  className="h-10 w-full"
                  id="countryCode"
                  onKeyDown={(e) => handleSwitchKeyDown(e, "countryCode")}
                >
                  <SelectValue placeholder={t("form.selectCountry")}>
                    {formData.countryCode && getSelectedCountry() ? (
                      <div className="flex items-center gap-2">
                        <span>{getSelectedCountry()?.flag}</span>
                        <span>{getSelectedCountry()?.name}</span>
                      </div>
                    ) : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {MOCK_COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h2 className="font-medium">{t("form.state")}</h2>
              <Select
                value={formData.stateCode}
                onValueChange={handleStateChange}
                disabled={!formData.countryCode}
              >
                <SelectTrigger
                  ref={stateCodeRef}
                  className="h-10 w-full"
                  id="stateCode"
                  name="stateCode"
                  onKeyDown={(e) => handleSwitchKeyDown(e, "stateCode")}
                >
                  <SelectValue placeholder={t("form.selectState")}>
                    {formData.stateCode
                      ? MOCK_STATES.find((s) => s.code === formData.stateCode)
                          ?.name
                      : t("form.selectState")}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {getFilteredStates().map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          {/* Flag Upload */}
          <div className="space-y-2">
            <h3 className="font-medium mb-1">{t("City Images")}</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              tabIndex={0}
              ref={flagUploadRef}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  triggerFileInput();
                }
              }}
            >
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt={t("form.flagPreview")}
                    className="w-40 h-28 object-contain rounded-md"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setFormData({ ...formData });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {t("form.dragDropImage")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t("form.orClickToSelect")}
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </form>
      </MinimizablePageLayout>

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
