import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput from "@/components/common/EditableInput";
import { Autocomplete } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";

// Define Department interface
interface DepartmentData {
  Department: string;
  Description: string;
  Manager?: string;
  EmployeeCount?: number;
  Budget?: number;
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

const initialData: DepartmentData = {
  Department: "Human Resources",
  Description: "Manages employee relations and recruitment",
  Manager: "Sarah Johnson",
  EmployeeCount: 12,
  Budget: 850000,
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
const MOCK_MANAGERS = [
  "Sarah Johnson",
  "Michael Chen",
  "David Rodriguez",
  "Emily Davis",
  "James Wilson",
  "Lisa Thompson",
  "Robert Kim",
  "Amanda Foster",
  "Thomas Brown",
  "Jennifer Lee",
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

export default function DepartmentEditPage({ isEdit = false }: Props) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<DepartmentData>({
    Department: "",
    Description: "",
    Manager: "",
    EmployeeCount: 0,
    Budget: 0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Update translation data when department name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.Department || "", arabic: "", bangla: "" },
    ]);
  }, [formData.Department]);

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
        Department: "",
        Description: "",
        Manager: "",
        EmployeeCount: 0,
        Budget: 0,
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
        title={
          isEdit ? t("form.editingDepartment") : t("form.creatingDepartment")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/department"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              navigate("/department/create");
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/department/view");
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
          {/* First Row: Department, Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Department</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                id="Department"
                name="Department"
                className="w-full h-10"
                value={formData.Department}
                onChange={handleChange}
                onNext={() => setIsOptionModalOpen(true)}
                onCancel={() => setIsOptionModalOpen(false)}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Description</h3>
              <EditableInput
                id="Description"
                name="Description"
                className="w-full h-10"
                value={formData.Description}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
                required
              />
            </div>
          </div>

          {/* Second Row: Manager, Employee Count, Budget */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 space-y-2">
              <h3 className="font-medium mb-1">Manager</h3>
              <Autocomplete
                data={MOCK_MANAGERS}
                value={formData.Manager}
                onChange={(value) => {
                  setFormData({ ...formData, Manager: value });
                }}
                placeholder="Select a manager..."
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
              <h3 className="font-medium mb-1">Employees</h3>
              <input
                type="number"
                name="EmployeeCount"
                value={formData.EmployeeCount}
                onChange={handleChange}
                placeholder="Enter employee count..."
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
              />
            </div>

            <div className="md:col-span-4 space-y-2">
              <h3 className="font-medium mb-1">Budget</h3>
              <input
                type="number"
                name="Budget"
                value={formData.Budget}
                onChange={handleChange}
                placeholder="Enter budget amount..."
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                step="1000"
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
        title="Department Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Department translations saved:", data);
        }}
      />
    </>
  );
}
