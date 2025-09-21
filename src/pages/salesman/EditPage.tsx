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

// Define Salesman interface to ensure type consistency
interface Salesman {
  id: string;
  code: string;
  name: string;
  description: string;
  commission: number;
  territory: string;
  experience: string;
  department: string;
  manager: string;
  phone: string;
  email: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

type Props = {
  isEdit?: boolean;
};

const initialData: Salesman = {
  id: "1",
  code: "S001",
  name: "John Smith",
  description: "Senior sales representative specializing in enterprise clients",
  commission: 8.5,
  territory: "North Region",
  experience: "5+ years",
  department: "Enterprise Sales",
  manager: "Sarah Johnson",
  phone: "+1-555-0123",
  email: "john.smith@company.com",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

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

const SALESMAN_CODES = [
  "S001",
  "S002",
  "S003",
  "S004",
  "S005",
  "S006",
  "S007",
  "S008",
  "S009",
  "S010",
];

// Territory options
const TERRITORIES = [
  "North Region",
  "South Region",
  "East Region",
  "West Region",
  "Central Region",
  "Southwest Region",
  "Northwest Region",
  "Online Channel",
  "Hispanic Markets",
  "Corporate Accounts",
  "Rural Areas",
  "Technical Markets",
  "International",
  "Channel Partners",
  "Inside Sales",
  "Government Sector",
  "Training Division",
];

// Experience options
const EXPERIENCE_LEVELS = [
  "1+ year",
  "2+ years",
  "3+ years",
  "4+ years",
  "5+ years",
  "6+ years",
  "7+ years",
  "8+ years",
  "9+ years",
  "10+ years",
];

// Department options
const DEPARTMENTS = [
  "Enterprise Sales",
  "Retail Sales",
  "Tech Sales",
  "Key Accounts",
  "Regional Sales",
  "B2B Sales",
  "Junior Sales",
  "E-commerce Sales",
  "Market Segments",
  "Corporate Sales",
  "Field Sales",
  "Product Sales",
  "Global Sales",
  "Channel Sales",
  "Inside Sales",
  "Government Sales",
  "Sales Training",
];

// Manager options
const MANAGERS = [
  "Sarah Johnson",
  "Mike Davis",
  "Lisa Wong",
  "Robert Brown",
  "Jennifer Lee",
  "Tom Wilson",
  "Maria Garcia",
  "Kevin Anderson",
  "Patricia White",
  "Steven Clark",
  "Nancy Lewis",
  "Daniel Miller",
  "Christine Davis",
  "Andrew Wilson",
  "Michelle Brown",
  "Richard Taylor",
  "Elizabeth Martinez",
];

export default function EditPage({ isEdit = false }: Props) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const [selectedCode, setSelectedCode] = useState("");

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<Salesman>({
    id: "",
    code: "",
    name: "",
    description: "",
    commission: 0,
    territory: "",
    experience: "",
    department: "",
    manager: "",
    phone: "",
    email: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Update translation data when salesman name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.name || "", arabic: "", bangla: "" },
    ]);
  }, [formData.name]);

  // Initialize with edit data if available
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setSelectedCode(initialData.code);
    }
  }, [initialData]);

  useEffect(() => {
    if (id && id !== "undefined") {
      const fetchedData = initialData;
      setFormData(fetchedData);
      setSelectedCode(fetchedData.code);
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
        id: "",
        code: "",
        name: "",
        description: "",
        commission: 0,
        territory: "",
        experience: "",
        department: "",
        manager: "",
        phone: "",
        email: "",
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
        title={isEdit ? t("form.editingSalesman") : t("form.creatingSalesman")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/salesman"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              navigate("/salesman/create");
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/salesman/view");
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
          {/* First Row: Code, Name, Commission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.code")}</h3>
              <Autocomplete
                data={SALESMAN_CODES}
                value={selectedCode}
                onChange={(value) => {
                  setSelectedCode(value);
                  setFormData({
                    ...formData,
                    code: value,
                  });
                }}
                placeholder="Select a salesman code..."
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
                <h3 className="font-medium">{t("form.salesmanName")}</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                id="name"
                name="name"
                className="w-full h-10"
                value={formData.name}
                onChange={handleChange}
                onNext={() => setIsOptionModalOpen(true)}
                onCancel={() => setIsOptionModalOpen(false)}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.commission")}</h3>
              <EditableInput
                id="commission"
                name="commission"
                type="number"
                className="w-full h-10"
                value={formData.commission.toString()}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
                required
              />
            </div>
          </div>

          {/* Second Row: Territory, Experience, Department */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.territory")}</h3>
              <Select
                data={TERRITORIES.map((territory) => ({
                  value: territory,
                  label: territory,
                }))}
                value={formData.territory}
                onChange={(value) => {
                  setFormData({ ...formData, territory: value || "" });
                }}
                placeholder="Select territory..."
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

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.experience")}</h3>
              <Select
                data={EXPERIENCE_LEVELS.map((experience) => ({
                  value: experience,
                  label: experience,
                }))}
                value={formData.experience}
                onChange={(value) => {
                  setFormData({ ...formData, experience: value || "" });
                }}
                placeholder="Select experience..."
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

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.department")}</h3>
              <Select
                data={DEPARTMENTS.map((department) => ({
                  value: department,
                  label: department,
                }))}
                value={formData.department}
                onChange={(value) => {
                  setFormData({ ...formData, department: value || "" });
                }}
                placeholder="Select department..."
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
          </div>

          {/* Third Row: Manager, Phone, Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.manager")}</h3>
              <Select
                data={MANAGERS.map((manager) => ({
                  value: manager,
                  label: manager,
                }))}
                value={formData.manager}
                onChange={(value) => {
                  setFormData({ ...formData, manager: value || "" });
                }}
                placeholder="Select manager..."
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

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.phone")}</h3>
              <EditableInput
                id="phone"
                name="phone"
                className="w-full h-10"
                value={formData.phone}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.email")}</h3>
              <EditableInput
                id="email"
                name="email"
                type="email"
                className="w-full h-10"
                value={formData.email}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
                required
              />
            </div>
          </div>

          {/* Fourth Row: Description */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.description")}</h3>
              <EditableInput
                id="description"
                name="description"
                className="w-full h-10"
                value={formData.description}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
              />
            </div>
          </div>

          {/* Fifth Row: Default, Draft, Active, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
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

          {/* Sixth Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium mb-1">Created</h3>
              <p>{getRelativeTime(formData.createdAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{getRelativeTime(formData.updatedAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{getRelativeTime(formData.draftedAt)}</p>
            </div>
            <div>
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
        title="Salesman Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Salesman translations saved:", data);
        }}
      />
    </>
  );
}
