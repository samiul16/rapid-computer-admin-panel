import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput from "@/components/common/EditableInput";
import { Autocomplete, Select } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import type { AreaData } from "@/types/area.types";

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

// Type definition for TypeScript
export type HistoryEntry = {
  id: string;
  date: string;
  user: string;
  status: "Active" | "InActive" | "Delete" | "Draft";
  export: "Single" | "Bulk";
  pdf: boolean;
  csv: boolean;
  xls: boolean;
  doc: boolean;
  print: boolean;
};

const COUNTRY_DATA = MOCK_COUNTRIES.map((country) => country.code);

export default function EditPage({ isEdit = false }: Props) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");

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

  // Initialize with edit data if available
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (id && id !== "undefined") {
      const fetchedData = initialData;
      setFormData(fetchedData);
    }
  }, [id]);

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

  // PDF and Print handlers
  const handlePDFSwitchChange = (checked: boolean) => {
    setPdfChecked(checked);
    if (checked) {
      console.log("Export PDF for:", formData);
      // Add your PDF export logic here
    }
  };

  const handlePrintSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
    if (checked) {
      console.log("Print data for:", formData);
      // Add your print logic here
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
              navigate("/areas/create");
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
        onPrintToggle={handlePrintSwitchChange}
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
              <h3 className="font-medium mb-1">Code</h3>
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
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.area")}</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                id="Area"
                name="Area"
                className="w-full h-10"
                value={formData.Area}
                onChange={handleChange}
                onNext={() => setIsOptionModalOpen(true)}
                onCancel={() => setIsOptionModalOpen(false)}
                required
              />
            </div>
          </div>

          {/* Second Row: Country, State, City */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 space-y-2">
              <h3 className="font-medium mb-1">{t("form.country")}</h3>
              <Select
                data={MOCK_COUNTRIES.map((c) => ({
                  value: c.name,
                  label: c.name,
                }))}
                value={formData.Country}
                onChange={(value) => {
                  setFormData({ ...formData, Country: value || "" });
                }}
                placeholder="Select a country..."
                className="w-full"
                searchable
                clearable
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
              <h3 className="font-medium mb-1">{t("form.state")}</h3>
              <Select
                data={filteredStates.map((s) => ({
                  value: s.name,
                  label: s.name,
                }))}
                value={formData.State}
                onChange={(value) => {
                  setFormData({ ...formData, State: value || "" });
                }}
                placeholder="Select a state..."
                className="w-full"
                disabled={!formData.Country}
                searchable
                clearable
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
              <h3 className="font-medium mb-1">{t("form.city")}</h3>
              <Select
                data={filteredCities.map((c) => ({
                  value: c.name,
                  label: c.name,
                }))}
                value={formData.City}
                onChange={(value) => {
                  setFormData({ ...formData, City: value || "" });
                }}
                placeholder="Select a city..."
                className="w-full"
                disabled={!formData.State}
                searchable
                clearable
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
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
                  id="isDefault"
                  name="isDefault"
                  className="data-[state=checked]:bg-blue-400"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDefault: checked })
                  }
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  id="isActive"
                  name="isActive"
                  className="data-[state=checked]:bg-blue-400"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  id="isDraft"
                  name="isDraft"
                  className="data-[state=checked]:bg-blue-400"
                  checked={formData.isDraft}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDraft: checked })
                  }
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">
                {formData.isDeleted ? t("button.restore") : t("button.delete")}
              </h3>
              <div className="h-10 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isDeleted: !formData.isDeleted,
                    })
                  }
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
