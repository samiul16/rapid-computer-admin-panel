/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Autocomplete } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { useNavigate } from "react-router-dom";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import DynamicInputTableList from "./dynamic-input-table/DynamicInputTableList";

// Define ExpiryItem interface
interface ExpiryItem {
  id: string;
  itemName: string;
  batchNumber: string;
  expiryDate: Date | string;
  quantity: number;
  unit: string;
  location: string;
  category: string;
  supplier: string;
  daysUntilExpiry: number;
  status: "Expired" | "Near Expiry" | "Warning" | "Good";
  isActive: boolean;
  isDefault: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data
const MOCK_LOCATIONS = [
  "Main Branch - Dairy Section",
  "North Branch - Refrigerated",
  "South Branch - Bakery",
  "East Branch - Meat Section",
  "West Branch - Canned Goods",
  "Central Branch - Seafood",
  "Downtown Branch - Vegetables",
  "Suburban Branch - Condiments",
  "Uptown Branch - Fruits",
  "Riverside Branch - Cheese",
  "Hillside Branch - Frozen",
  "Lakeside Branch - Vegetables",
  "Garden Branch - Natural Products",
  "Plaza Branch - Dairy",
  "Metro Branch - Deli",
  "Business District - Bakery",
];

const MOCK_CATEGORIES = [
  "Dairy Products",
  "Fresh Vegetables",
  "Bakery Items",
  "Meat & Poultry",
  "Canned Foods",
  "Seafood",
  "Fresh Fruits",
  "Frozen Foods",
  "Sauces & Condiments",
  "Deli Meats",
  "Breakfast Cereals",
  "Natural Sweeteners",
];

const MOCK_SUPPLIERS = [
  "Fresh Dairy Co.",
  "Organic Foods Ltd.",
  "Golden Bakery",
  "Premium Meats",
  "Garden Fresh Foods",
  "Ocean Fresh",
  "Green Fields Farm",
  "Italian Delights",
  "Berry Farm Co.",
  "Mediterranean Foods",
  "Quick Meals Inc.",
  "Crisp Greens Farm",
  "Pure Honey Co.",
  "Artisan Cheese",
  "Gourmet Deli",
  "Artisan Bakehouse",
];

const MOCK_UNITS = [
  "bottles",
  "cups",
  "loaves",
  "kg",
  "cans",
  "heads",
  "jars",
  "balls",
  "packages",
  "boxes",
  "pieces",
  "bags",
  "punnets",
  "blocks",
];

type Props = {
  isEdit?: boolean;
};

// Generate incremental batch number
const generateBatchNumber = () => {
  const lastNumber = localStorage.getItem("lastExpiryItemBatchNumber") || "0";
  const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastExpiryItemBatchNumber", nextNumber);
  return `BTH${nextNumber}`;
};

// Calculate days until expiry
const calculateDaysUntilExpiry = (expiryDate: Date | string): number => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Calculate status based on days until expiry
const calculateStatus = (
  daysUntilExpiry: number
): "Expired" | "Near Expiry" | "Warning" | "Good" => {
  if (daysUntilExpiry < 0) return "Expired";
  if (daysUntilExpiry <= 2) return "Near Expiry";
  if (daysUntilExpiry <= 7) return "Warning";
  return "Good";
};

const initialData: ExpiryItem = {
  id: "1",
  itemName: "",
  batchNumber: generateBatchNumber(),
  expiryDate: new Date(),
  quantity: 0,
  unit: "",
  location: "",
  category: "",
  supplier: "",
  daysUntilExpiry: 0,
  status: "Good",
  isActive: true,
  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function ExpiryItemFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const itemNameInputRef = useRef<EditableInputRef>(null);
  const batchNumberInputRef = useRef<EditableInputRef>(null);
  const expiryDateInputRef = useRef<EditableInputRef>(null);
  const quantityInputRef = useRef<EditableInputRef>(null);
  const unitInputRef = useRef<EditableInputRef>(null);
  const categoryInputRef = useRef<EditableInputRef>(null);
  const supplierInputRef = useRef<EditableInputRef>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Date picker state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<ExpiryItem>({
    id: "",
    itemName: "",
    batchNumber: generateBatchNumber(),
    expiryDate: new Date(),
    quantity: 0,
    unit: "",
    location: "",
    category: "",
    supplier: "",
    daysUntilExpiry: 0,
    status: "Good",
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  });

  // Update translation data when remarks change
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.itemName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.itemName]);

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "itemName": {
        // Focus on branch dropdown
        const branchInput = document.querySelector(
          'input[placeholder="Select location..."]'
        ) as HTMLInputElement;
        branchInput?.focus();
        break;
      }
      case "location":
        categoryInputRef.current?.focus();
        break;
      case "category":
        supplierInputRef.current?.focus();
        break;
      case "supplier":
        quantityInputRef.current?.focus();
        break;
      case "quantity":
        unitInputRef.current?.focus();
        break;
      case "unit":
        expiryDateInputRef.current?.focus();
        break;
      case "expiryDate":
        activeSwitchRef.current?.focus();
        break;
      case "active": {
        // Focus on default switch
        const defaultSwitch = document.querySelector(
          '[id="isDefault"]'
        ) as HTMLButtonElement;
        defaultSwitch?.focus();
        break;
      }
      case "default": {
        // Focus on draft switch
        const draftSwitch = document.querySelector(
          '[id="isDraft"]'
        ) as HTMLButtonElement;
        draftSwitch?.focus();
        break;
      }
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
        case "active":
          setFormData({ ...formData, isActive: !formData.isActive });
          break;
        case "default":
          setFormData({ ...formData, isDefault: !formData.isDefault });
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
    let processedValue: any = type === "checkbox" ? checked : value;

    // Convert quantity to number
    if (name === "quantity") {
      processedValue = parseFloat(value) || 0;
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };

  // Update days until expiry and status when expiry date changes
  useEffect(() => {
    if (formData.expiryDate) {
      const daysUntilExpiry = calculateDaysUntilExpiry(formData.expiryDate);
      const status = calculateStatus(daysUntilExpiry);

      setFormData((prev) => ({
        ...prev,
        daysUntilExpiry,
        status,
        isActive: status !== "Expired", // Automatically deactivate expired items
      }));
    }
  }, [formData.expiryDate]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Expiry Item Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        id: "",
        itemName: "",
        batchNumber: generateBatchNumber(),
        expiryDate: new Date(),
        quantity: 0,
        unit: "",
        location: "",
        category: "",
        supplier: "",
        daysUntilExpiry: 0,
        status: "Good",
        isActive: true,
        isDefault: false,
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

  const handlePrintExpiryItem = (stockData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Expiry Item Details",
        data: [stockData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemName: "Item Name",
          batchNumber: "Batch Number",
          expiryDate: "Expiry Date",
          quantity: "Quantity",
          unit: "Unit",
          location: "Location",
          category: "Category",
          supplier: "Supplier",
          daysUntilExpiry: "Days Until Expiry",
          status: "Status",
          isActive: "Active Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      setTimeout(() => handlePrintExpiryItem(formData), 100);
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
      console.log("stockData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Expiry Item Details"
          subtitle="Expiry Item Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expiry-item-details.pdf";
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
        title={
          isEdit ? t("form.editingExpiryItem") : t("form.creatingExpiryItem")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/expiry-items"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/expiry-items/create");
              } else {
                // Navigate to edit page
                navigate("/expiry-items/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/expiry-items/view");
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
          {/* First Row: Item Name, Batch Number, Expiry Date, Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Item Name <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                ref={itemNameInputRef}
                id="itemName"
                name="itemName"
                className="w-full h-10 bg-gray-100"
                value={formData.itemName}
                onChange={handleChange}
                onNext={() => focusNextInput("itemName")}
                onCancel={() => {}}
                tooltipText="Name of the item"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Batch Number <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                ref={batchNumberInputRef}
                id="batchNumber"
                name="batchNumber"
                className="w-full h-10"
                value={formData.batchNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("batchNumber")}
                onCancel={() => {}}
                tooltipText="Unique identifier for the batch"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </h3>
              <Popover
                open={isDatePickerOpen}
                onOpenChange={setIsDatePickerOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    data-testid="date-picker-trigger"
                    variant="outline"
                    className={cn(
                      "w-full h-10 justify-start text-left font-normal",
                      !formData.expiryDate && "text-muted-foreground"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        focusNextInput("expiryDate");
                      }
                    }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.expiryDate ? (
                      format(new Date(formData.expiryDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.expiryDate
                        ? new Date(formData.expiryDate)
                        : undefined
                    }
                    onSelect={(date) => {
                      setFormData({
                        ...formData,
                        expiryDate: date || new Date(),
                      });
                      setIsDatePickerOpen(false);
                      focusNextInput("expiryDate");
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Quantity <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                ref={quantityInputRef}
                id="quantity"
                name="quantity"
                className="w-full h-10"
                value={formData.quantity.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("quantity")}
                onCancel={() => {}}
                tooltipText="Total quantity of the item"
                type="number"
                required
              />
            </div>
          </div>

          {/* Second Row: Unit, Location, Category, Supplier */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Unit</h3>
              <Autocomplete
                data={MOCK_UNITS}
                value={formData.unit}
                onChange={(value) => {
                  setFormData({ ...formData, unit: value || "" });
                }}
                placeholder="Select unit..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                    height: "40px",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("unit");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Location</h3>
              <Autocomplete
                data={MOCK_LOCATIONS}
                value={formData.location}
                onChange={(value) => {
                  setFormData({ ...formData, location: value || "" });
                }}
                placeholder="Select location..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                    height: "40px",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("location");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Category</h3>
              <Autocomplete
                data={MOCK_CATEGORIES}
                value={formData.category}
                onChange={(value) => {
                  setFormData({ ...formData, category: value || "" });
                }}
                placeholder="Select category..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                    height: "40px",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("category");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Supplier</h3>
              <Autocomplete
                data={MOCK_SUPPLIERS}
                value={formData.supplier}
                onChange={(value) => {
                  setFormData({ ...formData, supplier: value || "" });
                }}
                placeholder="Select supplier..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                    height: "40px",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("supplier");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>
          </div>

          {/* Third Row: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="space-y-2">
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

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Is Default</h3>
              <div className="h-10 flex items-center">
                <Switch
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

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <div className="h-10 flex items-center">
                <Switch
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

            <div className="space-y-2">
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

          {/* Fourth Row: Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium mb-1">{t("common.created")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.createdAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.updated")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.updatedAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.drafted")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.draftedAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.deleted")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Dynamic Input Table */}
          <DynamicInputTableList />
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Expiry Item Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Expiry Item translations saved:", data);
        }}
      />
    </>
  );
}
