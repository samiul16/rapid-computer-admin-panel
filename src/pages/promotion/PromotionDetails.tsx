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

// Define Promotion interface to ensure type consistency
interface Promotion {
  id: string;
  code: string;
  employeeName: string;
  description: string;
  fromPosition: string;
  toPosition: string;
  fromDepartment: string;
  toDepartment: string;
  fromSalary: number;
  toSalary: number;
  promotionDate: Date;
  effectiveDate: Date;
  reason: string;
  approvedBy: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

const MOCK_PROMOTIONS = [
  {
    code: "P001",
    employeeName: "John Smith",
    fromPosition: "Manager",
    toPosition: "Senior Manager",
    fromDepartment: "Sales",
    toDepartment: "Sales",
    fromSalary: 75000,
    toSalary: 90000,
  },
  {
    code: "P002",
    employeeName: "Emily Rodriguez",
    fromPosition: "Accountant",
    toPosition: "Senior Accountant",
    fromDepartment: "Finance",
    toDepartment: "Finance",
    fromSalary: 65000,
    toSalary: 78000,
  },
  {
    code: "P003",
    employeeName: "Michael Chen",
    fromPosition: "Software Developer",
    toPosition: "Lead Developer",
    fromDepartment: "Engineering",
    toDepartment: "Engineering",
    fromSalary: 85000,
    toSalary: 105000,
  },
  {
    code: "P004",
    employeeName: "Sarah Williams",
    fromPosition: "HR Specialist",
    toPosition: "HR Manager",
    fromDepartment: "Human Resources",
    toDepartment: "Human Resources",
    fromSalary: 70000,
    toSalary: 85000,
  },
  {
    code: "P005",
    employeeName: "David Thompson",
    fromPosition: "Operations Manager",
    toPosition: "Director of Operations",
    fromDepartment: "Operations",
    toDepartment: "Operations",
    fromSalary: 80000,
    toSalary: 100000,
  },
  {
    code: "P006",
    employeeName: "Jessica Martinez",
    fromPosition: "Marketing Coordinator",
    toPosition: "Senior Marketing Specialist",
    fromDepartment: "Marketing",
    toDepartment: "Marketing",
    fromSalary: 60000,
    toSalary: 72000,
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

const PROMOTION_CODES = MOCK_PROMOTIONS.map((promotion) => promotion.code);

export default function PromotionDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState("P001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const promotionData: Promotion = {
    id: "1",
    code: selectedPromotion,
    employeeName:
      MOCK_PROMOTIONS.find((p) => p.code === selectedPromotion)?.employeeName ||
      "John Smith",
    description:
      "Promotion to Senior Manager due to exceptional performance and outstanding sales results",
    fromPosition:
      MOCK_PROMOTIONS.find((p) => p.code === selectedPromotion)?.fromPosition ||
      "Manager",
    toPosition:
      MOCK_PROMOTIONS.find((p) => p.code === selectedPromotion)?.toPosition ||
      "Senior Manager",
    fromDepartment:
      MOCK_PROMOTIONS.find((p) => p.code === selectedPromotion)
        ?.fromDepartment || "Sales",
    toDepartment:
      MOCK_PROMOTIONS.find((p) => p.code === selectedPromotion)?.toDepartment ||
      "Sales",
    fromSalary:
      MOCK_PROMOTIONS.find((p) => p.code === selectedPromotion)?.fromSalary ||
      75000,
    toSalary:
      MOCK_PROMOTIONS.find((p) => p.code === selectedPromotion)?.toSalary ||
      90000,
    promotionDate: new Date("2024-01-15"),
    effectiveDate: new Date("2024-02-01"),
    reason: "Outstanding sales performance and team leadership",
    approvedBy: "Sarah Johnson",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
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

  const handlePrintPromotion = (promotionData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Promotion Details",
        data: { ...promotionData },
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Promotion Code",
          employeeName: "Employee Name",
          description: "Description",
          fromPosition: "From Position",
          toPosition: "To Position",
          fromDepartment: "From Department",
          toDepartment: "To Department",
          fromSalary: "From Salary",
          toSalary: "To Salary",
          promotionDate: "Promotion Date",
          effectiveDate: "Effective Date",
          reason: "Reason",
          approvedBy: "Approved By",
          isDefault: "Default Promotion",
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
    if (checked) {
      setTimeout(() => handlePrintPromotion(promotionData), 100);
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
      console.log("promotionData on pdf click", promotionData);
      const blob = await pdf(
        <GenericPDF
          data={[promotionData]}
          title="Promotion Details"
          subtitle="Promotion Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "promotion-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleDeleteRestore = () =>
    console.log(promotionData.isDeleted ? "Restoring..." : "Deleting...");

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

  return (
    <div className="relative w-full">
      {/* Container with full height minus external footer (80px assumed) */}
      <div className="flex flex-col h-[82vh] overflow-hidden border rounded shadow bg-white dark:bg-gray-800 ">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <VideoModal src={video} header={"Rapid ERP Video"} />
            <h1 className="text-xl font-bold text-primary">
              {t("form.viewingPromotion")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/promotion")}
                listText="List"
                listPath="/promotion"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/promotion/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/promotion/1/edit"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Row 1: Code, Employee Name, From Position */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <h3 className="font-medium mb-1">{t("form.code")}</h3>
              <Autocomplete
                data={PROMOTION_CODES}
                value={selectedPromotion}
                onChange={setSelectedPromotion}
                placeholder="Select a promotion..."
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

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.employeeName")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.employeeName}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.fromPosition")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.fromPosition}
              </div>
            </div>
          </div>

          {/* Row 2: To Position, From Department, To Department */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.toPosition")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.toPosition}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.fromDepartment")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.fromDepartment}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.toDepartment")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.toDepartment}
              </div>
            </div>
          </div>

          {/* Row 3: From Salary, To Salary, Promotion Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.fromSalary")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                ${promotionData.fromSalary.toLocaleString()}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.toSalary")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                ${promotionData.toSalary.toLocaleString()}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.promotionDate")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.promotionDate.toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Row 4: Effective Date, Approved By, Reason */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.effectiveDate")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.effectiveDate.toLocaleDateString()}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.approvedBy")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.approvedBy}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.reason")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.reason}
              </div>
            </div>
          </div>

          {/* Row 5: Description */}
          <div className="grid grid-cols-1 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.description")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {promotionData.description}
              </div>
            </div>
          </div>

          {/* Row 6: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Default Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.default")}</h3>
              <Switch
                checked={promotionData.isDefault}
                disabled
                className={` data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <Switch
                checked={promotionData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <Switch
                checked={promotionData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="">
              <h3 className="font-medium mb-1">
                {promotionData.isDeleted
                  ? t("button.restore")
                  : t("button.delete")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={promotionData.isDeleted}
                className="disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {promotionData.isDeleted ? (
                  <Undo size={20} className="text-blue-500" />
                ) : (
                  <Trash2 size={20} className="text-red-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Row 7: Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="">
              <h3 className="font-medium mb-1">Created</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(promotionData.createdAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(promotionData.updatedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(promotionData.draftedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(promotionData.deletedAt)}
              </p>
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
                <span className="dark:text-gray-200">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={printEnabled}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-blue-400"
                />
                <span className="dark:text-gray-200">Print</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 text-primary rounded-full cursor-pointer border-primary"
                onClick={() => setIsOptionModalOpen(true)}
              >
                <span className="hidden sm:inline">History</span>
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
            // height: "80vh", // Fixed height - 80% of viewport height
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
              {t("form.promotionHistory")}
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
