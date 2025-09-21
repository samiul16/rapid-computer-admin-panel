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

// Define Store interface to ensure type consistency
interface Store {
  id: string;
  storeCode: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
  manager: string;
  capacity: number;
  storeType: string;
  storeImage: string;
  description: string;
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

const initialData: Store = {
  id: "1",
  storeCode: "STR001",
  name: "Downtown Restaurant",
  phone: "+1-555-0101",
  email: "downtown@restaurant.com",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  country: "USA",
  postCode: "10001",
  manager: "John Smith",
  capacity: 150,
  storeType: "Fine Dining",
  storeImage: "",
  description: "Premium downtown restaurant with elegant atmosphere",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Item form doesn't need mock dropdown data

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

const STORE_CODES = [
  "STR001",
  "STR002",
  "STR003",
  "STR004",
  "STR005",
  "STR006",
  "STR007",
  "STR008",
  "STR009",
  "STR010",
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
  const [formData, setFormData] = useState<Store>({
    id: "",
    storeCode: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postCode: "",
    manager: "",
    capacity: 0,
    storeType: "",
    storeImage: "",
    description: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Item form doesn't need filtered dropdown options

  // Update translation data when item name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.name || "", arabic: "", bangla: "" },
    ]);
  }, [formData.name]);

  // Item form doesn't need country/state filtering logic

  // Initialize with edit data if available
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setSelectedCode(initialData.storeCode);
    }
  }, [initialData]);

  useEffect(() => {
    if (id && id !== "undefined") {
      const fetchedData = initialData;
      setFormData(fetchedData);
      setSelectedCode(fetchedData.storeCode);
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

  // Handle numeric input changes
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;
    setFormData({
      ...formData,
      [name]: numericValue,
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
        storeCode: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postCode: "",
        manager: "",
        capacity: 0,
        storeType: "",
        storeImage: "",
        description: "",
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
        title={isEdit ? t("form.editingStore") : t("form.creatingStore")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/store"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              navigate("/store/create");
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/store/view");
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
          {/* First Row: Store Code, Store Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.storeCode")}</h3>
              <Autocomplete
                data={STORE_CODES}
                value={selectedCode}
                onChange={(value) => {
                  setSelectedCode(value);
                  setFormData({
                    ...formData,
                    storeCode: value,
                  });
                }}
                placeholder="Select a store code..."
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
                <h3 className="font-medium">Store Name</h3>
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
              <h3 className="font-medium mb-1">Phone</h3>
              <EditableInput
                id="phone"
                name="phone"
                type="tel"
                className="w-full h-10"
                value={formData.phone}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
              />
            </div>
          </div>

          {/* Second Row: Phone, Email, Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Email</h3>
              <EditableInput
                id="email"
                name="email"
                type="email"
                className="w-full h-10"
                value={formData.email}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Address</h3>
              <EditableInput
                id="address"
                name="address"
                className="w-full h-10"
                value={formData.address}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">City</h3>
              <EditableInput
                id="city"
                name="city"
                className="w-full h-10"
                value={formData.city}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
              />
            </div>
          </div>

          {/* Third Row: City, State, Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">State</h3>
              <EditableInput
                id="state"
                name="state"
                className="w-full h-10"
                value={formData.state}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Country</h3>
              <EditableInput
                id="country"
                name="country"
                className="w-full h-10"
                value={formData.country}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Capacity</h3>
              <EditableInput
                id="capacity"
                name="capacity"
                type="number"
                className="w-full h-10"
                value={formData.capacity.toString()}
                onChange={handleNumericChange}
                onNext={() => {}}
                onCancel={() => {}}
              />
            </div>
          </div>

          {/* Fifth Row: Store Type, Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Store Type</h3>
              <EditableInput
                id="storeType"
                name="storeType"
                className="w-full h-10"
                value={formData.storeType}
                onChange={handleChange}
                onNext={() => {}}
                onCancel={() => {}}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Description</h3>
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

          {/* Sixth Row: Status Switches */}
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

          {/* Seventh Row: Dates */}
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
        title="Store Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Store translations saved:", data);
        }}
      />
    </>
  );
}
