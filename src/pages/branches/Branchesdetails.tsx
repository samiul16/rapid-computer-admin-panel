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
import type { Branch } from "@/types/branch.types";

const MOCK_BRANCHES = [
  { code: "B001", name: "TechCorp Main Branch" },
  { code: "B002", name: "Global Innovations Downtown" },
  { code: "B003", name: "Tokyo Digital Shibuya Office" },
  { code: "B004", name: "Munich Engineering Central" },
  { code: "B005", name: "Paris Fashion Champs-Élysées" },
  { code: "B006", name: "Milano Design Via Montenapoleone" },
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

const BRANCH_CODES = MOCK_BRANCHES.map((branch) => branch.code);

export default function BranchesDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("B001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const branchData: Branch = {
    id: "1",
    code: selectedBranch,
    name:
      MOCK_BRANCHES.find((b) => b.code === selectedBranch)?.name ||
      "TechCorp Main Branch",
    taxNumber: "TX123456789",
    phone: "+1-555-0101",
    fax: "+1-555-0102",
    mobile: "+1-555-0103",
    email: "main@techcorp.com",
    website: "https://techcorp.com",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    address: "123 Main Street, LA",
    postCode: "90210",
    bankDetails: "Bank of America - 123456789",
    logo: "https://logo.clearbit.com/techcorp.com",
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

  const handlePrintBranch = (branchData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Branch Details",
        data: [branchData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Branch Code",
          name: "Branch Name",
          taxNumber: "Tax Number",
          phone: "Phone",
          fax: "Fax",
          mobile: "Mobile",
          email: "Email",
          website: "Website",
          address: "Address",
          postCode: "Post Code",
          bankDetails: "Bank Details",
          logo: "Logo",
          isDefault: "Default Branch",
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
      setTimeout(() => handlePrintBranch(branchData), 100);
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
      console.log("branchData on pdf click", branchData);
      const blob = await pdf(
        <GenericPDF
          data={[branchData]}
          title="Branch Details"
          subtitle="Branch Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "branch-details.pdf";
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
    console.log(branchData.isDeleted ? "Restoring..." : "Deleting...");

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
              {t("form.viewingBranch")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/branches")}
                listText="List"
                listPath="/branches"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/branches/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/branches/1/edit"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Row 1: Code, Branch Name, Tax Number */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <h3 className="font-medium mb-1">{t("form.code")}</h3>
              <Autocomplete
                data={BRANCH_CODES}
                value={selectedBranch}
                onChange={setSelectedBranch}
                placeholder="Select a branch..."
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
                <h3 className="font-medium">{t("form.branchName")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.name}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.taxNumber")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.taxNumber}
              </div>
            </div>
          </div>

          {/* Row 2: Phone, Fax, Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.phone")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.phone}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.fax")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.fax}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.mobile")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.mobile}
              </div>
            </div>
          </div>

          {/* Row 3: Email, Website, Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.email")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.email}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.website")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.website}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.address")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.address}
              </div>
            </div>
          </div>

          {/* Row 4: Country, State, City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.country")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.country}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.state")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.state}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.city")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.city}
              </div>
            </div>
          </div>

          {/* Row 5: Post Code, Bank Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.postCode")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.postCode}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.bankDetails")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {branchData.bankDetails}
              </div>
            </div>
          </div>

          {/* Row 6: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Default Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.default")}</h3>
              <Switch
                checked={branchData.isDefault}
                disabled
                className={` data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <Switch
                checked={branchData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <Switch
                checked={branchData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="">
              <h3 className="font-medium mb-1">
                {branchData.isDeleted
                  ? t("button.restore")
                  : t("button.delete")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={branchData.isDeleted}
                className="disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {branchData.isDeleted ? (
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
                {getRelativeTime(branchData.createdAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(branchData.updatedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(branchData.draftedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(branchData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Branch Logo */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-medium mb-2 text-center">{t("form.logo")}</h3>
            <div className="w-32 h-20 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-110 transition duration-300">
              {branchData.logo ? (
                <img
                  src={branchData.logo}
                  alt="Branch Logo"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      branchData.name
                    )}&background=random&color=fff&size=128`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No logo
                </div>
              )}
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
              {t("form.branchHistory")}
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
