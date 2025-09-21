/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import EditableDateInput from "@/components/ArabicDateInput";
import video from "@/assets/videos/test.mp4";
import PDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import countryDetailPrintContent from "@/lib/printContents/countryDetails";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import type { StateData } from "@/types/states.types";
import { Autocomplete } from "@mantine/core";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { DateObject } from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import DualCalendarInput from "@/components/DualCalender";
import EnglishDate from "@/components/EnglishDateInput";
import { cn } from "@/lib/utils";
// import MUDatePicker from "@/components/MUDatePicker";
// import MultiCalender2 from "@/components/MultiCalender2";
// import { convertHijriToGregorian } from "@/lib/utils";

type StateModuleData = {
  formData: StateData;
  hasChanges: boolean;
  scrollPosition?: number;
  stateLanguageValues?: Record<string, string>;
  selectedCountry?: string;
};

type Props = {
  isEdit?: boolean;
};

// Helper function to get today's Gregorian date for storage
const getTodaysGregorianDate = () => {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
};

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

const MOCK_COUNTRIES = [
  { code: "US", name: "United States", callingCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", callingCode: "+44", flag: "🇬🇧" },
  { code: "AE", name: "United Arab Emirates", callingCode: "+971", flag: "🇦🇪" },
  { code: "IN", name: "India", callingCode: "+91", flag: "🇮🇳" },
];

const COUNTRY_DATA = MOCK_COUNTRIES.map((country) => country.code);

export default function StateEditPage({ isEdit = true }: Props) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Get module ID for this edit page
  const moduleId = `states-edit-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<StateModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [stateLanguageValues, setStateLanguageValues] = useState<
    Record<string, string>
  >({});

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  const stateInputRef = useRef<EditableInputRef>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Helper function to get today's Hijri date
  const getTodaysHijriDate = () => {
    try {
      const today = new Date();
      const hijriDate = new DateObject({
        date: today,
        calendar: arabic,
        locale: arabic_ar,
      });
      const hijriDateString = hijriDate.format("DD-MM-YYYY").toString();
      console.log(
        "Today's Hijri date ------->",
        hijriDateString,
        typeof hijriDateString
      );
      return hijriDateString;
    } catch (error) {
      console.error("Error creating Hijri date:", error);
      // Fallback to regular date in DD-MM-YYYY
      const d = new Date();
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = String(d.getFullYear());
      return `${dd}-${mm}-${yyyy}`;
    }
  };

  // Initialize dateValue with today's Hijri date
  const [dateValue, setDateValue] = useState<any>(() => {
    return getTodaysHijriDate();
  });

  const [dualCalendarValue, setDualCalendarValue] = useState<any>({
    start: getTodaysHijriDate(),
    end: getTodaysHijriDate(),
  });

  // Form state - initialize with today's date
  const [formData, setFormData] = useState<StateData>(() => {
    const todayGregorian = getTodaysGregorianDate();
    return {
      code: "",
      State: "",
      Country_name: "",
      isDefault: false,
      isActive: true,
      isDraft: false,
      createdAt: todayGregorian, // Set to today's Gregorian date
      draftedAt: null,
      updatedAt: null,
      deletedAt: null,
      isDeleted: false,
    };
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
    formData.State,
    formData.code,
    formData.Country_name,
    moduleId,
    getModuleScrollPosition,
  ]);

  const handleDateChange = (value: any) => {
    console.log("Date changed", value);
  };

  //   value: DateObject | DateObject[] | string | null
  // ) => {
  //   console.log("Original value:", value);

  //   try {
  //     if (!value) {
  //       console.log("No value provided");
  //       setDateValue(null);
  //       setFormData((prev) => ({ ...prev, createdAt: null }));
  //       return;
  //     }

  //     console.log("typeof value:", typeof value);
  //     console.log("value.constructor.name:", value.constructor.name);

  //     // Better way to check for DateObject - use multiple methods
  //     const isDateObject = (obj: any): obj is DateObject => {
  //       return (
  //         obj &&
  //         typeof obj === "object" &&
  //         (obj instanceof DateObject ||
  //           obj.constructor.name === "DateObject" ||
  //           obj.constructor.name === "i2" || // Handle minified name
  //           (obj.format &&
  //             typeof obj.format === "function" &&
  //             obj.convert &&
  //             typeof obj.convert === "function"))
  //       );
  //     };

  //     // Handle DateObject input (from the DatePicker)
  //     if (isDateObject(value)) {
  //       console.log("Value is a DateObject");
  //       const dateObj = value as DateObject;

  //       // Convert Arabic to Gregorian for saving AND display
  //       const gregorianDate = dateObj.convert(gregorian, gregorian_en);

  //       const dateToSave = gregorianDate.format("YYYY-MM-DD"); // For database
  //       const displayValue = gregorianDate.format("DD/MM/YYYY"); // For user display (English date)

  //       console.log("Date to save (Gregorian):", dateToSave);
  //       console.log("Display value (English):", displayValue);

  //       setDateValue(dateObj); // Show English date to user
  //       setFormData((prev: any) => ({ ...prev, createdAt: dateObj })); // Save Gregorian date
  //       return;
  //     }

  //     // Handle array of DateObjects
  //     if (Array.isArray(value)) {
  //       console.log("Value is an array");
  //       const dateObj = value as DateObject[];
  //       const firstDate = value[0];
  //       if (firstDate && isDateObject(firstDate)) {
  //         const gregorianDate = firstDate.convert(gregorian, gregorian_en);
  //         const dateToSave = gregorianDate.format("YYYY-MM-DD");
  //         const displayValue = gregorianDate.format("DD/MM/YYYY"); // English date for display

  //         console.log("Array - Date to save (Gregorian):", dateToSave);
  //         console.log("Array - Display value (English):", displayValue);

  //         setDateValue(dateObj);
  //         setFormData((prev: any) => ({ ...prev, createdAt: dateToSave }));
  //         return;
  //       }
  //     }

  //     // Handle string input (fallback)
  //     if (typeof value === "string") {
  //       console.log("Value is a string:", value);
  //       // Try to parse the string as Arabic date first
  //       try {
  //         const arabicDateObj = new DateObject({
  //           date: value,
  //           calendar: arabic,
  //           locale: arabic_ar,
  //         });

  //         const gregorianDate = arabicDateObj.convert(gregorian, gregorian_en);
  //         const dateToSave = gregorianDate.format("YYYY-MM-DD");
  //         const displayValue = gregorianDate.format("DD/MM/YYYY"); // English date for display

  //         console.log(
  //           "String (Arabic) - Date to save (Gregorian):",
  //           dateToSave
  //         );
  //         console.log(
  //           "String (Arabic) - Display value (English):",
  //           displayValue
  //         );

  //         console.log("arabicDateObj", arabicDateObj.format("DD/MM/YYYY"));

  //         setDateValue(value); // Show English date
  //         setFormData((prev: any) => ({ ...prev, createdAt: dateToSave }));
  //         return;
  //       } catch (arabicError) {
  //         console.log(
  //           "Failed to parse as Arabic, trying as Gregorian:",
  //           arabicError
  //         );

  //         // If Arabic parsing fails, try as Gregorian
  //         try {
  //           const gregorianDateObj = new DateObject({
  //             date: value,
  //             calendar: gregorian,
  //             locale: gregorian_en,
  //           });

  //           const dateToSave = gregorianDateObj.format("YYYY-MM-DD");
  //           const displayValue = gregorianDateObj.format("DD/MM/YYYY");

  //           console.log("String (Gregorian) - Date to save:", dateToSave);
  //           console.log("String (Gregorian) - Display value:", displayValue);

  //           setDateValue(displayValue);
  //           setFormData((prev: any) => ({ ...prev, createdAt: dateToSave }));
  //           return;
  //         } catch (gregorianError) {
  //           console.error(
  //             "Failed to parse as both Arabic and Gregorian:",
  //             gregorianError
  //           );
  //           throw gregorianError;
  //         }
  //       }
  //     }

  //     console.log("Unhandled value type");
  //   } catch (error) {
  //     console.error("Date conversion error:", error);
  //     // Fallback - store as string if conversion fails
  //     const fallbackValue = value?.toString() || null;
  //     setDateValue(fallbackValue);
  //     setFormData((prev: any) => ({ ...prev, createdAt: fallbackValue }));
  //   }
  // };

  // Initialize with edit data if available (but only if not restoring from minimized)
  useEffect(() => {
    if (
      id &&
      id !== "undefined" &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      const fetchedData = {
        ...initialData,
        createdAt: getTodaysGregorianDate(), // Set to today's date
      };
      setFormData(fetchedData);
      setSelectedCountry(fetchedData.code);
      // Update date value to show today's Hijri date
      setDateValue(getTodaysHijriDate());
    } else if (
      isEdit &&
      initialData &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      const updatedInitialData = {
        ...initialData,
        createdAt: getTodaysGregorianDate(), // Set to today's date
      };
      setFormData(updatedInitialData);
      setSelectedCountry(initialData.code);
      // Update date value to show today's Hijri date
      setDateValue(getTodaysHijriDate());
    }
  }, [isEdit, id, isRestoredFromMinimized, hasMinimizedData]);

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

  // Handle form reset - updated to reset to today's Hijri date
  const handleReset = async () => {
    if (window.confirm(t("form.resetConfirm"))) {
      const todayHijri = getTodaysHijriDate();
      const todayGregorian = getTodaysGregorianDate();

      setFormData({
        code: "",
        State: "",
        Country_name: "",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: todayGregorian, // Reset to today's Gregorian date
        draftedAt: null,
        updatedAt: null,
        deletedAt: null,
        isDeleted: false,
      });

      setSelectedCountry("");
      setStateLanguageValues({});
      setIsRestoredFromMinimized(false);
      setDateValue(todayHijri); // Reset date input to today's Hijri date

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

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "code":
        stateInputRef.current?.focus();
        break;
      case "state":
        defaultSwitchRef.current?.focus();
        break;
      case "country":
        defaultSwitchRef.current?.focus();
        break;
      case "date":
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

  const [englishStartValue] = useState<string>("");

  const handlePrintState = (stateData: any) => {
    try {
      const html = countryDetailPrintContent([stateData]);
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
      a.download = "states-details.pdf";
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
  };

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): StateModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      stateLanguageValues,
      selectedCountry,
    };
  }, [formData, stateLanguageValues, selectedCountry]);

  const popoverOptions = [
    {
      label: "Create",
      onClick: () => {
        navigate("/states/create");
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
        moduleName="Edit State"
        moduleRoute={location.pathname}
        onMinimize={handleMinimize}
        title={t("form.editingState")}
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
                display="name"
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
              <EditableInput
                id="Country_name"
                name="Country_name"
                className="w-full h-10"
                value={formData.Country_name || ""}
                onChange={handleChange}
                onNext={() => focusNextInput("country")}
                onCancel={() => {}}
                tooltipText="Please enter country name"
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <EditableDateInput
                isDate={true}
                calendarType="hijri"
                userLang="ar" // This will show the Arabic calendar
                value={dateValue}
                onChange={handleDateChange}
                onNext={() => focusNextInput("date")}
                onCancel={() => {}}
                labelText="تاريخ الاختيار" // Arabic label
                showCalendarIcon={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 space-y-2"></div>
            <div className="md:col-span-3 space-y-2">
              <DualCalendarInput
                value={dualCalendarValue}
                onChange={(dateRange) => {
                  setDualCalendarValue(dateRange);
                }}
                onNext={() => focusNextInput("date")}
                onCancel={() => {}}
                userLang="ar"
                defaultCalendarType="arabic"
                showMonths={2}
                enableSettings={false}
                enableDatePanel={false}
                enableToolbar={false}
                enableFooter={false}
              />

              {/* <MUDatePicker /> */}
              {/* <MultiCalender2 /> */}
            </div>
            <div className="md:col-span-3 space-y-2">
              <EnglishDate
                isDate={true}
                calendarType="gregorian"
                userLang="en"
                rtl={false}
                value={englishStartValue}
                onChange={() => console.log("English Date")}
                disabled={false}
                labelText="Start Date"
                className={cn("transition-all", "ring-1 ring-primary")}
                isStartFocus={false}
                setStartNextFocus={() => console.log("English Date")}
                isShowCalender={true}
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
