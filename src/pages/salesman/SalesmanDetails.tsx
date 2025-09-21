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

const MOCK_SALESMEN = [
  {
    code: "S001",
    name: "John Smith",
    territory: "North Region",
    department: "Enterprise Sales",
  },
  {
    code: "S002",
    name: "Emily Rodriguez",
    territory: "South Region",
    department: "Retail Sales",
  },
  {
    code: "S003",
    name: "Michael Chen",
    territory: "West Region",
    department: "Tech Sales",
  },
  {
    code: "S004",
    name: "Sarah Williams",
    territory: "East Region",
    department: "Key Accounts",
  },
  {
    code: "S005",
    name: "David Thompson",
    territory: "Central Region",
    department: "Regional Sales",
  },
  {
    code: "S006",
    name: "Jessica Martinez",
    territory: "Southwest Region",
    department: "B2B Sales",
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

const SALESMAN_CODES = MOCK_SALESMEN.map((salesman) => salesman.code);

export default function SalesmanDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedSalesman, setSelectedSalesman] = useState("S001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const salesmanData: Salesman = {
    id: "1",
    code: selectedSalesman,
    name:
      MOCK_SALESMEN.find((s) => s.code === selectedSalesman)?.name ||
      "John Smith",
    description:
      "Senior sales representative specializing in enterprise clients with excellent customer service skills",
    commission: 8.5,
    territory:
      MOCK_SALESMEN.find((s) => s.code === selectedSalesman)?.territory ||
      "North Region",
    experience: "5+ years",
    department:
      MOCK_SALESMEN.find((s) => s.code === selectedSalesman)?.department ||
      "Enterprise Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0123",
    email: "john.smith@company.com",
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

  const handlePrintSalesman = (salesmanData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Salesman Details",
        data: [salesmanData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Salesman Code",
          name: "Salesman Name",
          description: "Description",
          commission: "Commission Rate",
          territory: "Territory",
          experience: "Experience",
          department: "Department",
          manager: "Manager",
          phone: "Phone Number",
          email: "Email Address",
          isDefault: "Default Salesman",
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
      setTimeout(() => handlePrintSalesman(salesmanData), 100);
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
      console.log("salesmanData on pdf click", salesmanData);
      const blob = await pdf(
        <GenericPDF
          data={[salesmanData]}
          title="Salesman Details"
          subtitle="Salesman Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "salesman-details.pdf";
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
    console.log(salesmanData.isDeleted ? "Restoring..." : "Deleting...");

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
              {t("form.viewingSalesman")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/salesman")}
                listText="List"
                listPath="/salesman"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/salesman/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/salesman/1/edit"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Row 1: Code, Name, Commission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <h3 className="font-medium mb-1">{t("form.code")}</h3>
              <Autocomplete
                data={SALESMAN_CODES}
                value={selectedSalesman}
                onChange={setSelectedSalesman}
                placeholder="Select a salesman..."
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
                <h3 className="font-medium">{t("form.salesmanName")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {salesmanData.name}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.commission")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {salesmanData.commission}%
              </div>
            </div>
          </div>

          {/* Row 2: Territory, Experience, Department */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.territory")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {salesmanData.territory}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.experience")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {salesmanData.experience}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.department")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {salesmanData.department}
              </div>
            </div>
          </div>

          {/* Row 3: Manager, Phone, Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.manager")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {salesmanData.manager}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.phone")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {salesmanData.phone}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.email")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {salesmanData.email}
              </div>
            </div>
          </div>

          {/* Row 4: Description */}
          <div className="grid grid-cols-1 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.description")}</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {salesmanData.description}
              </div>
            </div>
          </div>

          {/* Row 5: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Default Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.default")}</h3>
              <Switch
                checked={salesmanData.isDefault}
                disabled
                className={` data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <Switch
                checked={salesmanData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <Switch
                checked={salesmanData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="">
              <h3 className="font-medium mb-1">
                {salesmanData.isDeleted
                  ? t("button.restore")
                  : t("button.delete")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={salesmanData.isDeleted}
                className="disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {salesmanData.isDeleted ? (
                  <Undo size={20} className="text-blue-500" />
                ) : (
                  <Trash2 size={20} className="text-red-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Row 6: Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="">
              <h3 className="font-medium mb-1">Created</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(salesmanData.createdAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(salesmanData.updatedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(salesmanData.draftedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(salesmanData.deletedAt)}
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
              {t("form.salesmanHistory")}
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
