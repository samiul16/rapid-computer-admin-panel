/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Autocomplete } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import type { AreaData } from "@/types/area.types";
import { useNavigate } from "react-router-dom";

type Props = {
  isEdit?: boolean;
};

const initialData: AreaData = {
  code: "DT",
  Area: "Downtown",
  Country: "United States",
  State: "New York",
  City: "New York",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Mock data for dropdowns
const MOCK_COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "AE", name: "United Arab Emirates" },
];

const MOCK_STATES = [
  { code: "NY", name: "New York", countryCode: "US" },
  { code: "CA", name: "California", countryCode: "US" },
  { code: "TX", name: "Texas", countryCode: "US" },
  { code: "FL", name: "Florida", countryCode: "US" },
  { code: "ON", name: "Ontario", countryCode: "CA" },
  { code: "QC", name: "Quebec", countryCode: "CA" },
  { code: "ENG", name: "England", countryCode: "GB" },
  { code: "SCT", name: "Scotland", countryCode: "GB" },
  { code: "NSW", name: "New South Wales", countryCode: "AU" },
  { code: "VIC", name: "Victoria", countryCode: "AU" },
  { code: "BY", name: "Bavaria", countryCode: "DE" },
  { code: "NRW", name: "North Rhine-Westphalia", countryCode: "DE" },
];

const MOCK_CITIES = [
  { code: "NYC", name: "New York", stateCode: "NY", countryCode: "US" },
  { code: "LAX", name: "Los Angeles", stateCode: "CA", countryCode: "US" },
  { code: "SF", name: "San Francisco", stateCode: "CA", countryCode: "US" },
  { code: "HOU", name: "Houston", stateCode: "TX", countryCode: "US" },
  { code: "MIA", name: "Miami", stateCode: "FL", countryCode: "US" },
  { code: "TOR", name: "Toronto", stateCode: "ON", countryCode: "CA" },
  { code: "MTL", name: "Montreal", stateCode: "QC", countryCode: "CA" },
  { code: "LON", name: "London", stateCode: "ENG", countryCode: "GB" },
  { code: "MAN", name: "Manchester", stateCode: "ENG", countryCode: "GB" },
  { code: "EDI", name: "Edinburgh", stateCode: "SCT", countryCode: "GB" },
  { code: "SYD", name: "Sydney", stateCode: "NSW", countryCode: "AU" },
  { code: "MEL", name: "Melbourne", stateCode: "VIC", countryCode: "AU" },
  { code: "MUN", name: "Munich", stateCode: "BY", countryCode: "DE" },
  { code: "DUS", name: "Düsseldorf", stateCode: "NRW", countryCode: "DE" },
];

export default function AreaFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const codeInputRef = useRef<EditableInputRef>(null);
  const areaInputRef = useRef<EditableInputRef>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);
  const stateInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const flagUploadRef = useRef<HTMLInputElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<AreaData>({
    code: "",
    Area: "",
    Country: "",
    State: "",
    City: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Filtered dropdown options
  const [filteredStates, setFilteredStates] = useState(MOCK_STATES);
  const [filteredCities, setFilteredCities] = useState(MOCK_CITIES);

  // Update translation data when area name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.Area || "", arabic: "", bangla: "" },
    ]);
  }, [formData.Area]);

  // Update filtered options when country/state changes
  useEffect(() => {
    const selectedCountry = MOCK_COUNTRIES.find(
      (c) => c.name === formData.Country
    );
    if (selectedCountry) {
      const states = MOCK_STATES.filter(
        (s) => s.countryCode === selectedCountry.code
      );
      setFilteredStates(states);

      // Reset state and city if country changes
      if (formData.State && !states.find((s) => s.name === formData.State)) {
        setFormData((prev) => ({ ...prev, State: "", City: "" }));
        setFilteredCities([]);
      }
    } else {
      setFilteredStates([]);
      setFilteredCities([]);
    }
  }, [formData.Country]);

  useEffect(() => {
    const selectedState = MOCK_STATES.find((s) => s.name === formData.State);
    if (selectedState) {
      const cities = MOCK_CITIES.filter(
        (c) => c.stateCode === selectedState.code
      );
      setFilteredCities(cities);

      // Reset city if state changes
      if (formData.City && !cities.find((c) => c.name === formData.City)) {
        setFormData((prev) => ({ ...prev, City: "" }));
      }
    } else {
      setFilteredCities([]);
    }
  }, [formData.State]);

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "code":
        areaInputRef.current?.focus();
        break;
      case "area":
        countryInputRef.current?.focus();
        break;
      case "country":
        stateInputRef.current?.focus();
        break;
      case "state":
        cityInputRef.current?.focus();
        break;
      case "city":
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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        code: "",
        Area: "",
        Country: "",
        State: "",
        City: "",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  const handlePrintArea = (areaData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Area Details",
        data: [areaData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Area Code",
          Area: "Area Name",
          Country: "Country",
          State: "State",
          City: "City",
          isDefault: "Default Area",
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
      setTimeout(() => handlePrintArea(formData), 100);
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
      console.log("areaData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Area Details"
          subtitle="Area Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "areas-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  return (
    <>
      <PageLayout
        title={isEdit ? t("form.editingArea") : t("form.creatingArea")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/areas"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/areas/create");
              } else {
                // Navigate to edit page
                navigate("/areas/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/areas/view");
            },
          },
        ]}
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
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* First Row: Code, Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
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
                tooltipText="Please enter area code (e.g., DT, CB)"
                required
              />
            </div>

            <div className=" space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.area")}</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                ref={areaInputRef}
                id="Area"
                name="Area"
                className="w-full h-10"
                value={formData.Area}
                onChange={handleChange}
                onNext={() => focusNextInput("area")}
                onCancel={() => {}}
                tooltipText="Please enter area name"
                required
              />
            </div>
          </div>

          {/* Second Row: Country, State, City */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 space-y-2">
              <h3 className="font-medium mb-1">{t("form.country")}</h3>
              <Autocomplete
                ref={countryInputRef}
                data={MOCK_COUNTRIES.map((c) => c.name)}
                value={formData.Country}
                onChange={(value) => {
                  setFormData({ ...formData, Country: value });
                }}
                placeholder="Select a country..."
                className="w-full"
                styles={{
                  input: {
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

            <div className="md:col-span-4 space-y-2">
              <h3 className="font-medium mb-1">{t("form.state")}</h3>
              <Autocomplete
                ref={stateInputRef}
                data={filteredStates.map((s) => s.name)}
                value={formData.State}
                onChange={(value) => {
                  setFormData({ ...formData, State: value });
                }}
                placeholder="Select a state..."
                className="w-full"
                disabled={!formData.Country}
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("state");
                  }
                }}
              />
            </div>

            <div className="md:col-span-4 space-y-2">
              <h3 className="font-medium mb-1">{t("form.city")}</h3>
              <Autocomplete
                ref={cityInputRef}
                data={filteredCities.map((c) => c.name)}
                value={formData.City}
                onChange={(value) => {
                  setFormData({ ...formData, City: value });
                }}
                placeholder="Select a city..."
                className="w-full"
                disabled={!formData.State}
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("city");
                  }
                }}
              />
            </div>
          </div>

          {/* Third Row: Default, Draft, Active, Delete */}
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

          {/* Fourth Row: Dates */}
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
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Area Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Area translations saved:", data);
        }}
      />
    </>
  );
}
