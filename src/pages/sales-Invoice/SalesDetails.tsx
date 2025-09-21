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

// Define Invoice interface to ensure type consistency
interface Invoice {
  id: string;
  documentNumber: string;
  invoiceNumber: string;
  invoiceDate: Date | string;
  customer: string;
  trnNumber: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date | string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  salesman: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

const MOCK_INVOICES = [
  {
    documentNumber: "INV001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: "2024-07-24",
    customer: "John Doe",
    trnNumber: "TRN123456789",
    paymentMode: "Split",
    dueDays: 45,
    paymentDate: "2024-08-15",
    remarks: "Urgent delivery required",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2023-05-15T10:30:00Z"),
    updatedAt: new Date("2023-11-20T14:45:00Z"),
    draftedAt: new Date("2025-05-20T14:45:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    id: "1",
  },
  {
    documentNumber: "INV002",
    invoiceNumber: "INV-2024-002",
    invoiceDate: "2024-07-25",
    customer: "Jane Doe",
    trnNumber: "TRN987654321",
    paymentMode: "Cash",
    dueDays: 30,
    paymentDate: "2024-08-10",
    remarks: "Standard delivery",
    country: "UAE",
    state: "Dubai",
    city: "Dubai",
    salesman: "Bob Johnson",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2023-05-16T09:00:00Z"),
    updatedAt: new Date("2023-11-21T10:00:00Z"),
    draftedAt: new Date("2025-05-21T10:00:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    id: "2",
  },
  {
    documentNumber: "INV003",
    invoiceNumber: "INV-2024-003",
    invoiceDate: "2024-07-26",
    customer: "Peter Pan",
    trnNumber: "TRN112233445",
    paymentMode: "Bank Transfer",
    dueDays: 60,
    paymentDate: "2024-09-10",
    remarks: "Express delivery",
    country: "UAE",
    state: "Sharjah",
    city: "Sharjah",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2023-05-17T11:00:00Z"),
    updatedAt: new Date("2023-11-22T11:00:00Z"),
    draftedAt: new Date("2025-05-22T11:00:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    id: "3",
  },
  {
    documentNumber: "INV004",
    invoiceNumber: "INV-2024-004",
    invoiceDate: "2024-07-27",
    customer: "Mary Poppins",
    trnNumber: "TRN556677889",
    paymentMode: "Split",
    dueDays: 45,
    paymentDate: "2024-08-15",
    remarks: "Urgent delivery required",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    salesman: "Bob Johnson",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2023-05-18T12:00:00Z"),
    updatedAt: new Date("2023-11-23T12:00:00Z"),
    draftedAt: new Date("2025-05-23T12:00:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    id: "4",
  },
  {
    documentNumber: "INV005",
    invoiceNumber: "INV-2024-005",
    invoiceDate: "2024-07-28",
    customer: "John Smith",
    trnNumber: "TRN123456789",
    paymentMode: "Cash",
    dueDays: 30,
    paymentDate: "2024-08-10",
    remarks: "Standard delivery",
    country: "UAE",
    state: "Dubai",
    city: "Dubai",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2023-05-19T13:00:00Z"),
    updatedAt: new Date("2023-11-24T13:00:00Z"),
    draftedAt: new Date("2025-05-24T13:00:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    id: "5",
  },
  {
    documentNumber: "INV006",
    invoiceNumber: "INV-2024-006",
    invoiceDate: "2024-07-29",
    customer: "Peter Parker",
    trnNumber: "TRN987654321",
    paymentMode: "Bank Transfer",
    dueDays: 60,
    paymentDate: "2024-09-10",
    remarks: "Express delivery",
    country: "UAE",
    state: "Sharjah",
    city: "Sharjah",
    salesman: "Bob Johnson",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2023-05-20T14:00:00Z"),
    updatedAt: new Date("2023-11-25T14:00:00Z"),
    draftedAt: new Date("2025-05-25T14:00:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
    id: "6",
  },
];

const INVOICE_DOCUMENT_NUMBERS = MOCK_INVOICES.map(
  (invoice) => invoice.documentNumber
);

export default function SalesDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState("INV001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const invoiceData: Invoice =
    MOCK_INVOICES.find((inv) => inv.documentNumber === selectedInvoice) ||
    MOCK_INVOICES[0];

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintInvoice = () => {
    try {
      const html = PrintCommonLayout({
        title: "Invoice Details",
        data: [invoiceData as unknown as Record<string, unknown>],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          documentNumber: "Document Number",
          invoiceNumber: "Invoice Number",
          invoiceDate: "Invoice Date",
          customer: "Customer",
          trnNumber: "TRN Number",
          paymentMode: "Payment Mode",
          dueDays: "Due Days",
          paymentDate: "Payment Date",
          remarks: "Remarks",
          country: "Country",
          state: "State",
          city: "City",
          salesman: "Salesman",
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
      setTimeout(() => handlePrintInvoice(), 100);
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
      console.log("invoiceData on pdf click", invoiceData);
      const blob = await pdf(
        <GenericPDF
          data={[invoiceData]}
          title="Invoice Details"
          subtitle="Invoice Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "order-details.pdf";
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
    console.log(invoiceData.isDeleted ? "Restoring..." : "Deleting...");

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

  // Generate initials for supplier
  const getSupplierInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getInitialsColor = (code: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
    ];
    const index = parseInt(code.slice(-1)) % colors.length;
    return colors[index];
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
              {t("form.viewingSalesInvoice")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/sales-invoice")}
                listText="List"
                listPath="/sales-invoice"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/sales-invoice/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/sales-invoice/1/edit"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* First Row: Document Number, Invoice Number, Invoice Date, Customer, TRN Number */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Document Number <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={INVOICE_DOCUMENT_NUMBERS}
                value={selectedInvoice}
                onChange={setSelectedInvoice}
                placeholder="Select an invoice..."
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
              <h3 className="font-medium mb-1">Invoice Number</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.invoiceNumber}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Invoice Date <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.invoiceDate?.toString()}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Customer</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.customer}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">TRN Number</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.trnNumber}
              </div>
            </div>
          </div>

          {/* Second Row: Payment Mode, Due Days, Payment Date, Country, State, City */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Mode</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.paymentMode}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Due Days</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.dueDays} days
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Date</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.paymentDate?.toString()}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Country</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.country}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">State</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.state}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">City</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.city}
              </div>
            </div>
          </div>

          {/* Third Row: Remarks, Salesman */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Remarks</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.remarks}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Salesman</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {invoiceData.salesman}
              </div>
            </div>
          </div>

          {/* Row 6: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Active Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <Switch
                checked={invoiceData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <Switch
                checked={invoiceData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="">
              <h3 className="font-medium mb-1">
                {invoiceData.isDeleted
                  ? t("button.restore")
                  : t("button.delete")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={invoiceData.isDeleted}
                className="disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {invoiceData.isDeleted ? (
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
                {getRelativeTime(invoiceData.createdAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(invoiceData.updatedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(invoiceData.draftedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(invoiceData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Supplier Visual */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-medium mb-2 text-center">Supplier</h3>
            <div className="w-32 h-20 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-110 transition duration-300">
              <div
                className={`w-full h-full flex items-center justify-center text-white font-bold text-lg ${getInitialsColor(
                  invoiceData.documentNumber
                )}`}
              >
                {getSupplierInitials(invoiceData.customer)}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
              {invoiceData.customer}
            </p>
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
              {t("form.invoicesHistory")}
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
