/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Modal } from "@mantine/core";
import HistoryDataTable from "@/components/common/HistoryDataTable";
import { mockHistoryData } from "@/mockData/country-mockdata";
import { SplitButton } from "@/components/common/SplitButton";
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";

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
  description: string;
  unitCost: number;
  totalValue: number;
  includingVat: boolean;
  isDefaulted: boolean;
  isActive: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDraft: boolean;
}

// Define inventory item interface for table
interface InventoryItem {
  batchNumber: string;
  itemName: string;
  description: string;
  quantity: number;
  unitCost: number;
  includingVat: string;
}

const MOCK_EXPIRY_ITEMS = [
  {
    batchNumber: "MLK001",
    itemName: "Fresh Milk 1L",
    location: "Main Branch - Dairy Section",
  },
  {
    batchNumber: "YGT002",
    itemName: "Organic Yogurt 500ml",
    location: "North Branch - Refrigerated",
  },
  {
    batchNumber: "BRD003",
    itemName: "Whole Wheat Bread",
    location: "South Branch - Bakery",
  },
  {
    batchNumber: "CHK004",
    itemName: "Fresh Chicken Breast",
    location: "East Branch - Meat Section",
  },
  {
    batchNumber: "TOM005",
    itemName: "Canned Tomatoes 400g",
    location: "West Branch - Canned Goods",
  },
  {
    batchNumber: "SAL006",
    itemName: "Fresh Salmon Fillet",
    location: "Central Branch - Seafood",
  },
];

// Mock inventory items data
const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  {
    batchNumber: "MLK001",
    itemName: "Fresh Milk 1L",
    description:
      "Premium fresh whole milk from local dairy farms, rich in calcium and vitamins",
    quantity: 24,
    unitCost: 3.99,
    includingVat: "5%",
  },
  {
    batchNumber: "YGT002",
    itemName: "Organic Yogurt 500ml",
    description:
      "Creamy organic Greek-style yogurt with live cultures, no artificial additives",
    quantity: 18,
    unitCost: 5.49,
    includingVat: "5%",
  },
  {
    batchNumber: "BRD003",
    itemName: "Whole Wheat Bread",
    description:
      "Freshly baked whole grain bread with seeds, high in fiber and nutrients",
    quantity: 12,
    unitCost: 2.89,
    includingVat: "0%",
  },
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

const EXPIRY_ITEM_OPTIONS = MOCK_EXPIRY_ITEMS.map((item) => ({
  value: item.batchNumber,
  label: `${item.itemName} (${item.batchNumber})`,
}));

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

export default function ExpiryItemDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedExpiryItem, setSelectedExpiryItem] = useState("MLK001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const selectedItem = MOCK_EXPIRY_ITEMS.find(
    (s) => s.batchNumber === selectedExpiryItem
  );
  const expiryDate = new Date("2024-02-15");
  const daysUntilExpiry = calculateDaysUntilExpiry(expiryDate);

  const expiryItemData: ExpiryItem = {
    id: "1",
    itemName: selectedItem?.itemName || "Fresh Milk 1L",
    batchNumber: selectedExpiryItem,
    expiryDate: expiryDate,
    quantity: 24,
    unit: "bottles",
    location: selectedItem?.location || "Main Branch - Dairy Section",
    category: "Dairy Products",
    supplier: "Fresh Dairy Co.",
    daysUntilExpiry: daysUntilExpiry,
    status: calculateStatus(daysUntilExpiry),
    description:
      "Premium fresh whole milk from local dairy farms, rich in calcium and vitamins",
    unitCost: 3.99,
    totalValue: 24 * 3.99,
    includingVat: true,
    isDefaulted: false,
    isActive: true,
    isDeleted: false,
    isUpdated: true,
    isDraft: false,
    createdAt: new Date("2023-05-15T10:30:00Z"),
    updatedAt: new Date("2023-11-20T14:45:00Z"),
    draftedAt: new Date("2025-05-20T14:45:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintExpiryItem = (stockData: ExpiryItem) => {
    try {
      const html = PrintCommonLayout({
        title: "Expiry Item Details",
        data: [stockData as unknown as Record<string, unknown>],
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
          description: "Description",
          unitCost: "Unit Cost",
          totalValue: "Total Value",
          includingVat: "Including VAT",
          isDefaulted: "Defaulted",
          isActive: "Active Status",
          isDeleted: "Deleted Status",
          isUpdated: "Updated Status",
          isDraft: "Draft Status",
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
    if (checked) {
      setTimeout(() => handlePrintExpiryItem(expiryItemData), 100);
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
      console.log("expiryItemData on pdf click", expiryItemData);
      const blob = await pdf(
        <GenericPDF
          data={[expiryItemData]}
          title="Expiry Item Details"
          subtitle="Expiry Item Inventory Information"
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

  // Add this function before the component or in a utils file
  const numberToWords = (amount: number): string => {
    const ones = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const scales = ["", "thousand", "million", "billion"];

    const convertHundreds = (num: number): string => {
      let result = "";

      if (num >= 100) {
        result += ones[Math.floor(num / 100)] + " hundred ";
        num %= 100;
      }

      if (num >= 20) {
        result += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      }

      if (num > 0) {
        result += ones[num] + " ";
      }

      return result.trim();
    };

    if (amount === 0) return "zero";

    // Handle negative numbers
    if (amount < 0) return "negative " + numberToWords(-amount);

    // Split into integer and decimal parts
    const integerPart = Math.floor(amount);
    const decimalPart = Math.round((amount - integerPart) * 100);

    let result = "";
    let scaleIndex = 0;
    let num = integerPart;

    if (num === 0) {
      result = "zero";
    } else {
      while (num > 0) {
        const chunk = num % 1000;
        if (chunk !== 0) {
          const chunkWords = convertHundreds(chunk);
          result =
            chunkWords +
            (scales[scaleIndex] ? " " + scales[scaleIndex] : "") +
            (result ? " " + result : "");
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
      }
    }

    // Add decimal part if present
    if (decimalPart > 0) {
      result += " and " + convertHundreds(decimalPart) + " cents";
    }

    return result.trim();
  };

  const handleDeleteRestore = () =>
    console.log(expiryItemData.isDeleted ? "Restoring..." : "Deleting...");

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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date to readable string
  const formatDate = (date: Date | string | null) => {
    if (!date) return "--/--/----";
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    return MOCK_INVENTORY_ITEMS.reduce((total, item) => {
      return total + item.quantity * item.unitCost;
    }, 0);
  };

  return (
    <div className="relative w-full">
      {/* Container with full height minus external footer (80px assumed) */}
      <div className="flex flex-col h-[82vh] overflow-hidden border rounded shadow bg-white dark:bg-gray-800 ">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <VideoModal src={video} header={"Rapid ERP Video"} />
            <h1 className="text-xl font-bold text-primary">
              {t("form.viewingExpiryItem")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/expiry-items")}
                listText="List"
                listPath="/expiry-items"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/expiry-items/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/expiry-items/edit/1"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* First Row: Item Name, Batch Number, Expiry Date, Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.itemName")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={EXPIRY_ITEM_OPTIONS}
                value={
                  EXPIRY_ITEM_OPTIONS.find(
                    (opt) => opt.value === selectedExpiryItem
                  )?.label || selectedExpiryItem
                }
                onChange={(value) => {
                  const selectedOption = EXPIRY_ITEM_OPTIONS.find(
                    (opt) => opt.label === value
                  );
                  if (selectedOption) {
                    setSelectedExpiryItem(selectedOption.value);
                  }
                }}
                placeholder={t("form.selectExpiryItem")}
                disabled={false}
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                    height: "40px",
                  },
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.batchNumber")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {expiryItemData.batchNumber}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.expiryDate")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {formatDate(expiryItemData.expiryDate)}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.quantity")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                <span className="font-semibold">{expiryItemData.quantity}</span>
              </div>
            </div>
          </div>

          {/* Second Row: Unit, Location, Category, Supplier */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.unit")} <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {expiryItemData.unit}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.location")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {expiryItemData.location}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.category")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {expiryItemData.category}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.supplier")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {expiryItemData.supplier}
              </div>
            </div>
          </div>

          {/* Third Row: Days Until Expiry, Status, Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.daysUntilExpiry")}
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                <span className="font-semibold text-blue-600">
                  {expiryItemData.daysUntilExpiry} days
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("expiryItems.status")}</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    expiryItemData.status === "Expired"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      : expiryItemData.status === "Near Expiry"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : expiryItemData.status === "Warning"
                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  }`}
                >
                  {expiryItemData.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("expiryItems.description")}
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {expiryItemData.description}
              </div>
            </div>
          </div>

          {/* Row 4: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Is Defaulted Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("form.isDefaulted")}</h3>
              <Switch
                checked={expiryItemData.isDefaulted}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <Switch
                checked={expiryItemData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Is Updated Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.isUpdated")}</h3>
              <Switch
                checked={expiryItemData.isUpdated}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="">
              <h3 className="font-medium mb-1">
                {expiryItemData.isDeleted
                  ? t("button.restore")
                  : t("button.delete")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={expiryItemData.isDeleted}
                className="disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {expiryItemData.isDeleted ? (
                  <Undo size={20} className="text-blue-500" />
                ) : (
                  <Trash2 size={20} className="text-red-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Row 5: Draft Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <Switch
                checked={expiryItemData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>
          </div>

          {/* Row 6: Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="">
              <h3 className="font-medium mb-1">{t("common.created")}</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(expiryItemData.createdAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">{t("common.updated")}</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(expiryItemData.updatedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">{t("common.drafted")}</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(expiryItemData.draftedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">{t("common.deleted")}</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(expiryItemData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Inventory Items Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-primary">
                {t("expiryItems.inventoryItems")}
              </h3>
              <span className="text-sm text-gray-500">
                Total Items: {MOCK_INVENTORY_ITEMS.length}
              </span>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Batch Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Item Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Unit Cost
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Including VAT
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Total Value
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_INVENTORY_ITEMS.map((item, index) => (
                      <tr
                        key={item.batchNumber}
                        className={`${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-50 dark:bg-gray-800"
                        } hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.batchNumber}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          <div className="font-medium">{item.itemName}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          <div
                            className="max-w-xs truncate"
                            title={item.description}
                          >
                            {item.description}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-blue-600 dark:text-blue-400">
                          {formatCurrency(item.unitCost)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              item.includingVat === "5%"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {item.includingVat}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(item.quantity * item.unitCost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Table Footer */}
                  <tfoot className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Total Value in Words:
                          </span>
                          <span className="font-semibold capitalize">
                            {numberToWords(calculateTotalAmount())} dollars only
                          </span>
                        </div>
                      </td>
                      <td
                        colSpan={2}
                        className="px-4 py-3 text-sm font-bold text-right text-gray-900 dark:text-gray-100"
                      >
                        Grand Total:
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-right text-green-600 dark:text-green-400">
                        {formatCurrency(calculateTotalAmount())}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="sticky bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <Switch
                  checked={keepChanges}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={setKeepChanges}
                />
                <span className="dark:text-gray-200">{t("button.keep")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={pdfChecked}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={handlePDFSwitchChange}
                />
                <span className="dark:text-gray-200">{t("button.pdf")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={printEnabled}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-blue-400"
                />
                <span className="dark:text-gray-200">{t("button.print")}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 text-primary rounded-full cursor-pointer border-primary"
                onClick={() => setIsOptionModalOpen(true)}
              >
                <span className="hidden sm:inline">{t("button.history")}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        size="50%"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        withCloseButton={false}
        styles={{
          body: {
            height: "720px", // Fixed height in pixels
            overflow: "hidden",
            padding: 4,
          },
          content: {
            display: "flex",
            flexDirection: "column",
          },
          header: {
            flexShrink: 0,
          },
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-lg font-semibold text-blue-600">
              {t("form.expiryItemHistory")}
            </span>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <HistoryDataTable columnData={mockHistoryData} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
