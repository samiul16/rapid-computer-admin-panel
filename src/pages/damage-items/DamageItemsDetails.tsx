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

// Define OpeningStock interface
interface DamageItemsType {
  id: string;

  itemId: string;
  quantityDamaged: number;
  damageDate: string;
  reportedBy: string;
  location: string;
  damageType: "Transit" | "Handling" | "Expired" | "Other";

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

// Define inventory item interface
interface InventoryItem {
  sn: string;
  item: string;
  description: string;
  qty: number;
  unitRate: number;
  includingVat: string;
}

const MOCK_DAMAGE_ITEMS_DATA: DamageItemsType[] = [
  {
    id: "DI001",
    itemId: "OS001",
    quantityDamaged: 3,
    damageDate: "2025-07-18",
    reportedBy: "John Doe",
    location: "Warehouse A",
    damageType: "Handling",
    isDefaulted: false,
    isActive: true,
    isDeleted: false,
    isUpdated: true,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDraft: false,
  },
  {
    id: "DI002",
    itemId: "OS002",
    quantityDamaged: 1,
    damageDate: "2025-07-17",
    reportedBy: "Jane Smith",
    location: "Warehouse B",
    damageType: "Transit",
    isDefaulted: false,
    isActive: true,
    isDeleted: false,
    isUpdated: true,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDraft: false,
  },
  {
    id: "DI003",
    itemId: "OS003",
    quantityDamaged: 2,
    damageDate: "2025-07-15",
    reportedBy: "Ali Khan",
    location: "Warehouse A",
    damageType: "Expired",
    isDefaulted: false,
    isActive: true,
    isDeleted: false,
    isUpdated: true,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDraft: false,
  },
  {
    id: "DI004",
    itemId: "OS004",
    quantityDamaged: 5,
    damageDate: "2025-07-14",
    reportedBy: "Fatema Begum",
    location: "Warehouse C",
    damageType: "Other",
    isDefaulted: false,
    isActive: true,
    isDeleted: false,
    isUpdated: true,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDraft: false,
  },
  {
    id: "DI005",
    itemId: "OS005",
    quantityDamaged: 4,
    damageDate: "2025-07-13",
    reportedBy: "Sadia Islam",
    location: "Warehouse B",
    damageType: "Handling",
    isDefaulted: false,
    isActive: true,
    isDeleted: false,
    isUpdated: true,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDraft: false,
  },
  {
    id: "DI006",
    itemId: "OS006",
    quantityDamaged: 2,
    damageDate: "2025-07-12",
    reportedBy: "Tariq Rahman",
    location: "Warehouse A",
    damageType: "Transit",
    isDefaulted: false,
    isActive: true,
    isDeleted: false,
    isUpdated: true,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDraft: false,
  },
];

// Mock inventory items data
const MOCK_DAMAGE_ITEMS: InventoryItem[] = [
  {
    sn: "SN001",
    item: "Office Chairs - Executive",
    description:
      "High-quality executive office chairs with ergonomic design and leather finish",
    qty: 25,
    unitRate: 1830.5,
    includingVat: "20%",
  },
  {
    sn: "SN002",
    item: "Laptop Computers - Dell",
    description:
      "Dell Inspiron 15 3000 Series, Intel i5 processor, 8GB RAM, 256GB SSD",
    qty: 15,
    unitRate: 2450.75,
    includingVat: "20%",
  },
  {
    sn: "SN003",
    item: "Printer Paper - A4 Reams",
    description:
      "High-quality white A4 printing paper, 80gsm, 500 sheets per ream",
    qty: 100,
    unitRate: 12.5,
    includingVat: "5%",
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

const DAMAGE_ITEMS_DOCUMENT_NUMBERS = MOCK_DAMAGE_ITEMS_DATA.map(
  (stock) => stock.itemId
);

export default function DamageItemsDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedOpeningStock, setSelectedOpeningStock] = useState("OS001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const damageItemsData: DamageItemsType = {
    id: "1",
    itemId: selectedOpeningStock,
    quantityDamaged:
      MOCK_DAMAGE_ITEMS_DATA.find((s) => s.itemId === selectedOpeningStock)
        ?.quantityDamaged || 0,
    damageDate: "2024-07-24",
    reportedBy: "Initial inventory setup for new branch",
    location: "Main Branch",
    damageType: "Handling",
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

  const handlePrintOpeningStock = (stockData: DamageItemsType) => {
    try {
      const html = PrintCommonLayout({
        title: "Damage Items Details",
        data: [stockData as unknown as Record<string, unknown>],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemId: "Item ID",
          quantityDamaged: "Quantity Damaged",
          damageDate: "Damage Date",
          reportedBy: "Reported By",
          location: "Location",
          damageType: "Damage Type",
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
      setTimeout(() => handlePrintOpeningStock(damageItemsData), 100);
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
      console.log("damageItemsData on pdf click", damageItemsData);
      const blob = await pdf(
        <GenericPDF
          data={[damageItemsData]}
          title="Damage Items Details"
          subtitle="Damage Items Inventory Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "damage-items-details.pdf";
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
    console.log(damageItemsData.isDeleted ? "Restoring..." : "Deleting...");

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

  // Calculate total amount
  const calculateTotalAmount = () => {
    return MOCK_DAMAGE_ITEMS.reduce((total, item) => {
      return total + item.qty * item.unitRate;
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
              {t("form.viewingDamageItems")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/damage-items")}
                listText="List"
                listPath="/damage-items"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/damage-items/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/damage-items/edit/1"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* First Row: Document Number, Branch, Document Date, Amount */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Item Id
                <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={DAMAGE_ITEMS_DOCUMENT_NUMBERS}
                value={selectedOpeningStock}
                onChange={setSelectedOpeningStock}
                placeholder={t("form.selectItemId")}
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
                Quantity Damaged
                <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {damageItemsData.quantityDamaged}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("damageItems.damageDate")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {damageItemsData.damageDate?.toString()}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("damageItems.totalAmount")}
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                <span className="font-semibold text-green-600">
                  {formatCurrency(calculateTotalAmount())}
                </span>
              </div>
            </div>
          </div>

          {/* Second Row: SN, Item, Description, Qty */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Quantity Damaged</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {damageItemsData.quantityDamaged}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Damage Date</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {damageItemsData.damageDate}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Reported By</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {damageItemsData.reportedBy}
              </div>
            </div>
          </div>

          {/* Third Row: Unit Rate, Including VAT, Remarks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Location</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {damageItemsData.location}
              </div>
            </div>
          </div>

          {/* Row 4: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Is Defaulted Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("form.isDefaulted")}</h3>
              <Switch
                checked={damageItemsData.isDefaulted}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <Switch
                checked={damageItemsData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Is Updated Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.isUpdated")}</h3>
              <Switch
                checked={damageItemsData.isUpdated}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="">
              <h3 className="font-medium mb-1">
                {damageItemsData.isDeleted
                  ? t("button.restore")
                  : t("button.delete")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={damageItemsData.isDeleted}
                className="disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {damageItemsData.isDeleted ? (
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
                checked={damageItemsData.isDraft}
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
                {getRelativeTime(damageItemsData.createdAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">{t("common.updated")}</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(damageItemsData.updatedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">{t("common.drafted")}</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(damageItemsData.draftedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">{t("common.deleted")}</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(damageItemsData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Inventory Items Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-primary">
                {t("form.damageItems")}
              </h3>
              <span className="text-sm text-gray-500">
                Total Items: {MOCK_DAMAGE_ITEMS.length}
              </span>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        SN
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Unit Rate
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Including VAT
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_DAMAGE_ITEMS.map((item, index) => (
                      <tr
                        key={item.sn}
                        className={`${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-50 dark:bg-gray-800"
                        } hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.sn}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          <div className="font-medium">{item.item}</div>
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
                          {item.qty}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-blue-600 dark:text-blue-400">
                          {formatCurrency(item.unitRate)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              item.includingVat === "20%"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {item.includingVat}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(item.qty * item.unitRate)}
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
                            Amount in Words:
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
              {t("form.openingStockHistory")}
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
