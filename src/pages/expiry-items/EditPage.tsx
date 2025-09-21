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
import { toastError, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { useNavigate, useParams } from "react-router-dom";
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

// Mock expiry items data for selection
const MOCK_EXPIRY_ITEMS: ExpiryItem[] = [
  {
    id: "1",
    itemName: "Fresh Milk 1L",
    batchNumber: "MLK001",
    expiryDate: new Date("2024-02-15"),
    quantity: 24,
    unit: "bottles",
    location: "Main Branch - Dairy Section",
    category: "Dairy Products",
    supplier: "Fresh Dairy Co.",
    daysUntilExpiry: 5,
    status: "Warning",
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20T14:45:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    itemName: "Organic Yogurt 500ml",
    batchNumber: "YGT002",
    expiryDate: new Date("2024-02-12"),
    quantity: 18,
    unit: "cups",
    location: "North Branch - Refrigerated",
    category: "Dairy Products",
    supplier: "Organic Foods Ltd.",
    daysUntilExpiry: 2,
    status: "Near Expiry",
    isActive: true,
    isDefault: true,
    isDraft: false,
    createdAt: new Date("2024-01-16T09:15:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21T16:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    itemName: "Whole Wheat Bread",
    batchNumber: "BRD003",
    expiryDate: new Date("2024-02-08"),
    quantity: 12,
    unit: "loaves",
    location: "South Branch - Bakery",
    category: "Bakery Items",
    supplier: "Golden Bakery",
    daysUntilExpiry: -2,
    status: "Expired",
    isActive: false,
    isDefault: false,
    isDraft: true,
    createdAt: new Date("2024-01-17T11:45:00Z"),
    draftedAt: new Date("2024-01-17T11:45:00Z"),
    updatedAt: new Date("2024-01-22T13:20:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    itemName: "Fresh Chicken Breast",
    batchNumber: "CHK004",
    expiryDate: new Date("2024-02-14"),
    quantity: 8,
    unit: "kg",
    location: "East Branch - Meat Section",
    category: "Meat & Poultry",
    supplier: "Premium Meats",
    daysUntilExpiry: 4,
    status: "Warning",
    isActive: false,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-18T14:20:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-23T10:15:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    itemName: "Canned Tomatoes 400g",
    batchNumber: "TOM005",
    expiryDate: new Date("2024-08-15"),
    quantity: 48,
    unit: "cans",
    location: "West Branch - Canned Goods",
    category: "Canned Foods",
    supplier: "Garden Fresh Foods",
    daysUntilExpiry: 186,
    status: "Good",
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-19T08:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24T15:45:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    itemName: "Fresh Salmon Fillet",
    batchNumber: "SAL006",
    expiryDate: new Date("2024-02-11"),
    quantity: 6,
    unit: "kg",
    location: "Central Branch - Seafood",
    category: "Seafood",
    supplier: "Ocean Fresh",
    daysUntilExpiry: 1,
    status: "Near Expiry",
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-20T12:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25T09:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    itemName: "Organic Spinach 250g",
    batchNumber: "SPN007",
    expiryDate: new Date("2024-02-13"),
    quantity: 15,
    unit: "bags",
    location: "Downtown Branch - Vegetables",
    category: "Fresh Vegetables",
    supplier: "Green Fields Farm",
    daysUntilExpiry: 3,
    status: "Warning",
    isActive: true,
    isDefault: false,
    isDraft: true,
    createdAt: new Date("2024-01-21T16:15:00Z"),
    draftedAt: new Date("2024-01-21T16:15:00Z"),
    updatedAt: new Date("2024-01-26T11:40:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    itemName: "Pasta Sauce 350ml",
    batchNumber: "PST008",
    expiryDate: new Date("2024-06-20"),
    quantity: 32,
    unit: "jars",
    location: "Suburban Branch - Condiments",
    category: "Sauces & Condiments",
    supplier: "Italian Delights",
    daysUntilExpiry: 130,
    status: "Good",
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-22T13:45:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-27T14:20:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
];

type Props = {
  isEdit?: boolean;
};

export default function ExpiryItemEditPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [keepChanges, setKeepChanges] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const itemNameInputRef = useRef<EditableInputRef>(null);
  const batchNumberInputRef = useRef<EditableInputRef>(null);
  const quantityInputRef = useRef<EditableInputRef>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Date picker state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state - Initialize with default values
  const [formData, setFormData] = useState<ExpiryItem>({
    id: "",
    itemName: "",
    batchNumber: "",
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

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on component mount
  useEffect(() => {
    setIsLoading(true);

    // If ID is provided in URL, load that specific record
    if (id && id !== "undefined") {
      const itemData = MOCK_EXPIRY_ITEMS.find((item) => item.id === id);
      if (itemData) {
        setFormData(itemData);
      } else {
        // If ID not found, load the first record as default
        setFormData(MOCK_EXPIRY_ITEMS[0]);
      }
    } else {
      // Load the first record as default for editing
      setFormData(MOCK_EXPIRY_ITEMS[0]);
    }

    setIsLoading(false);
  }, [id]);

  // Update translation data when remarks change
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.itemName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.itemName]);

  // Update the focusNextInput function
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "itemName":
        batchNumberInputRef.current?.focus();
        break;
      case "batchNumber": {
        // Focus on expiry date picker trigger
        const datePickerTrigger = document.querySelector(
          '[data-testid="date-picker-trigger"]'
        ) as HTMLButtonElement;
        datePickerTrigger?.focus();
        break;
      }
      case "expiryDate":
        quantityInputRef.current?.focus();
        break;
      case "quantity": {
        // Focus on unit dropdown
        const unitInput = document.querySelector(
          'input[placeholder="Select unit..."]'
        ) as HTMLInputElement;
        unitInput?.focus();
        break;
      }
      case "unit": {
        // Focus on location dropdown
        const locationInput = document.querySelector(
          'input[placeholder="Select location..."]'
        ) as HTMLInputElement;
        locationInput?.focus();
        break;
      }
      case "location": {
        // Focus on category dropdown
        const categoryInput = document.querySelector(
          'input[placeholder="Select category..."]'
        ) as HTMLInputElement;
        categoryInput?.focus();
        break;
      }
      case "category": {
        // Focus on supplier dropdown
        const supplierInput = document.querySelector(
          'input[placeholder="Select supplier..."]'
        ) as HTMLInputElement;
        supplierInput?.focus();
        break;
      }
      case "supplier":
        activeSwitchRef.current?.focus();
        break;
      case "active":
        defaultSwitchRef.current?.focus();
        break;
      case "default":
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

  // Handle key navigation for switches and buttons
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
      updatedAt: new Date(), // Update timestamp on any change
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
    console.log("Expiry Item Edit Form submitted:", formData);
    toastSuccess("Expiry item updated successfully!");
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      // Reset to original loaded data
      const originalData = MOCK_EXPIRY_ITEMS.find(
        (item) => item.batchNumber === formData.batchNumber
      );
      if (originalData) {
        setFormData(originalData);
        toastSuccess("Form reset to original values");
      }
    }
  };

  const handlePrintExpiryItem = (itemData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Expiry Item Details",
        data: [itemData],
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
          isDefault: "Default Status",
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
      setTimeout(() => handlePrintExpiryItem(formData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Expiry Item Details"
          subtitle="Expiry Item Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `expiry-item-${formData.batchNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading expiry item data...</div>
      </div>
    );
  }

  return (
    <>
      <PageLayout
        title={t("form.editingExpiryItem")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/expiry-items"
        popoverOptions={[
          {
            label: "Create",
            onClick: () => navigate("/expiry-items/create"),
          },
          {
            label: "View",
            onClick: () => navigate(`/expiry-items/${formData.id}`),
          },
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
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
              {t("button.update")}
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
                className="w-full h-10"
                value={formData.itemName}
                onChange={handleChange}
                onNext={() => focusNextInput("itemName")}
                onCancel={() => {}}
                tooltipText="Please enter item name"
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
                        updatedAt: new Date(),
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
                  setFormData({
                    ...formData,
                    unit: value || "",
                    updatedAt: new Date(),
                  });
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
                  setFormData({
                    ...formData,
                    location: value || "",
                    updatedAt: new Date(),
                  });
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
              <h3 className="font-medium mb-1">
                Category <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={MOCK_CATEGORIES}
                value={formData.category}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    category: value || "",
                    updatedAt: new Date(),
                  });
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
                  setFormData({
                    ...formData,
                    supplier: value || "",
                    updatedAt: new Date(),
                  });
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
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      isActive: checked,
                      updatedAt: new Date(),
                    })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "active")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Is Default</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={defaultSwitchRef}
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      isDefault: checked,
                      updatedAt: new Date(),
                    })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "default")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={draftSwitchRef}
                  id="isDraft"
                  name="isDraft"
                  checked={formData.isDraft}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      isDraft: checked,
                      updatedAt: new Date(),
                    })
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
                      updatedAt: new Date(),
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

          {/* Third Row: Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium mb-1">{t("common.created")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.createdAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.updated")}</h3>
              <p className="text-gray-500 text-sm font-semibold">
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
          <DynamicInputTableList isEdit={isEdit} />
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
