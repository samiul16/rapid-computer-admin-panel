/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete } from "@/components/common/Autocomplete";
import HistoryDataTable from "@/components/common/HistoryDataTableNew";
import { mockHistoryData } from "@/mockData/country-mockdata";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type PaymentData = {
  invoiceType: string;
  currency: string;
  paymentTerms: string;
  dueDays: number;
  totalAmount: number;
  containerAmount: number;
  typeOfDeposit: string;
  depositAmount: number;
  depositDate: string;
  exchangeRate: number;
  localAmount: number;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: PaymentData = {
  invoiceType: "Commercial Invoice",
  currency: "USD",
  paymentTerms: "Net 30",
  dueDays: 30,
  totalAmount: 15000.0,
  containerAmount: 12000.0,
  typeOfDeposit: "Advance Payment",
  depositAmount: 3000.0,
  depositDate: "2024-01-15",
  exchangeRate: 1.0,
  localAmount: 15000.0,
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Payment options for autocomplete
const paymentOptions = [
  "Commercial Invoice",
  "Proforma Invoice",
  "Credit Note",
  "Debit Note",
  "Advance Payment",
  "Letter of Credit",
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

export default function PaymentDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("Commercial Invoice");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("payment", "create");
  const canView: boolean = usePermission("payment", "view");
  const canEdit: boolean = usePermission("payment", "edit");
  const canDelete: boolean = usePermission("payment", "delete");
  const canExport: boolean = usePermission("payment", "export");
  const canPdf: boolean = usePermission("payment", "pdf");
  const canPrint: boolean = usePermission("payment", "print");
  const canSeeHistory: boolean = usePermission("payment", "history");

  // Field-level permissions
  const canViewInvoiceType: boolean = usePermission(
    "payment",
    "view",
    "invoiceType"
  );
  const canViewCurrency: boolean = usePermission("payment", "view", "currency");
  const canViewPaymentTerms: boolean = usePermission(
    "payment",
    "view",
    "paymentTerms"
  );
  const canViewDueDays: boolean = usePermission("payment", "view", "dueDays");
  const canViewTotalAmount: boolean = usePermission(
    "payment",
    "view",
    "totalAmount"
  );
  const canViewContainerAmount: boolean = usePermission(
    "payment",
    "view",
    "containerAmount"
  );
  const canViewTypeOfDeposit: boolean = usePermission(
    "payment",
    "view",
    "typeOfDeposit"
  );
  const canViewDepositAmount: boolean = usePermission(
    "payment",
    "view",
    "depositAmount"
  );
  const canViewDepositDate: boolean = usePermission(
    "payment",
    "view",
    "depositDate"
  );
  const canViewExchangeRate: boolean = usePermission(
    "payment",
    "view",
    "exchangeRate"
  );
  const canViewLocalAmount: boolean = usePermission(
    "payment",
    "view",
    "localAmount"
  );
  const canViewIsDefault: boolean = usePermission(
    "payment",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission("payment", "view", "isActive");
  const canViewIsDraft: boolean = usePermission("payment", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "payment",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get payment data based on selected payment
  const getPaymentData = (paymentName: string): PaymentData => {
    const paymentMap: Record<string, PaymentData> = {
      "Commercial Invoice": {
        invoiceType: "Commercial Invoice",
        currency: "USD",
        paymentTerms: "Net 30",
        dueDays: 30,
        totalAmount: 15000.0,
        containerAmount: 12000.0,
        typeOfDeposit: "Advance Payment",
        depositAmount: 3000.0,
        depositDate: "2024-01-15",
        exchangeRate: 1.0,
        localAmount: 15000.0,
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Proforma Invoice": {
        invoiceType: "Proforma Invoice",
        currency: "EUR",
        paymentTerms: "Net 45",
        dueDays: 45,
        totalAmount: 25000.0,
        containerAmount: 20000.0,
        typeOfDeposit: "Letter of Credit",
        depositAmount: 5000.0,
        depositDate: "2024-01-16",
        exchangeRate: 0.85,
        localAmount: 21250.0,
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Credit Note": {
        invoiceType: "Credit Note",
        currency: "GBP",
        paymentTerms: "Net 60",
        dueDays: 60,
        totalAmount: 8000.0,
        containerAmount: 6000.0,
        typeOfDeposit: "Bank Guarantee",
        depositAmount: 2000.0,
        depositDate: "2024-01-17",
        exchangeRate: 0.73,
        localAmount: 5840.0,
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Debit Note": {
        invoiceType: "Debit Note",
        currency: "JPY",
        paymentTerms: "Net 90",
        dueDays: 90,
        totalAmount: 1200000.0,
        containerAmount: 1000000.0,
        typeOfDeposit: "Standby Letter of Credit",
        depositAmount: 200000.0,
        depositDate: "2024-01-18",
        exchangeRate: 110.0,
        localAmount: 132000000.0,
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Advance Payment": {
        invoiceType: "Commercial Invoice",
        currency: "CAD",
        paymentTerms: "Net 30",
        dueDays: 30,
        totalAmount: 18000.0,
        containerAmount: 15000.0,
        typeOfDeposit: "Advance Payment",
        depositAmount: 3000.0,
        depositDate: "2024-01-19",
        exchangeRate: 1.35,
        localAmount: 24300.0,
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-24T15:20:00Z"),
        deletedAt: new Date("2024-02-01T09:00:00Z"),
        isDeleted: true,
      },
      "Letter of Credit": {
        invoiceType: "Proforma Invoice",
        currency: "AUD",
        paymentTerms: "Net 45",
        dueDays: 45,
        totalAmount: 22000.0,
        containerAmount: 18000.0,
        typeOfDeposit: "Letter of Credit",
        depositAmount: 4000.0,
        depositDate: "2024-01-20",
        exchangeRate: 1.52,
        localAmount: 33440.0,
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return paymentMap[paymentName] || initialData;
  };

  const [paymentData, setPaymentData] = useState<PaymentData>(
    getPaymentData(selectedPayment)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update payment data when selection changes
  useEffect(() => {
    setPaymentData(getPaymentData(selectedPayment));
  }, [selectedPayment]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintPayment = (paymentData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Payment Details",
        data: [paymentData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          invoiceType: "Invoice Type",
          currency: "Currency",
          paymentTerms: "Payment Terms",
          dueDays: "Due Days",
          totalAmount: "Total Amount",
          containerAmount: "Container Amount",
          typeOfDeposit: "Type of Deposit",
          depositAmount: "Deposit Amount",
          depositDate: "Deposit Date",
          exchangeRate: "Exchange Rate",
          localAmount: "Local Amount",
          isDefault: "Default Payment",
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
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("paymentData on pdf click", paymentData);
      const blob = await pdf(
        <GenericPDF
          data={[paymentData]}
          title="Payment Details"
          subtitle="Payment Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payment-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (date: Date | null) => {
    if (!date) return "–";

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

  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "–" : value;
  };

  return (
    <>
      <PageLayout
        title="Viewing Payment"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/payment")}
        listText="List"
        listPath="payment"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/payment/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/payment/edit/1"),
          },
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        onHistoryClick={
          canSeeHistory ? () => setIsOptionModalOpen(true) : undefined
        }
        onExport={
          canPdf && canPrint
            ? () => {
                if (!pdfChecked && !printEnabled) {
                  setShowExportModal(true);
                  return;
                }

                if (pdfChecked) {
                  handleExportPDF();
                }
                if (printEnabled) {
                  handlePrintPayment(paymentData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Invoice Type, Currency, Payment Terms, Due Days */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewInvoiceType && (
              <div className="mt-1">
                <Autocomplete
                  options={paymentOptions}
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                  placeholder="Select payment..."
                  displayKey="payment"
                  valueKey="payment"
                  searchKey="payment"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Invoice Type"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewCurrency && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Currency</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(paymentData.currency)}
                </div>
              </div>
            )}

            {canViewPaymentTerms && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Payment Terms
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(paymentData.paymentTerms)}
                </div>
              </div>
            )}

            {canViewDueDays && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Due Days</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(paymentData.dueDays)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Total Amount, Container Amount, Type of Deposit, Deposit Amount */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewTotalAmount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Total Amount</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  ${displayValue(paymentData.totalAmount)}
                </div>
              </div>
            )}

            {canViewContainerAmount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Container Amount
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  ${displayValue(paymentData.containerAmount)}
                </div>
              </div>
            )}

            {canViewTypeOfDeposit && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Type of Deposit
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(paymentData.typeOfDeposit)}
                </div>
              </div>
            )}

            {canViewDepositAmount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Deposit Amount
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  ${displayValue(paymentData.depositAmount)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Deposit Date, Exchange Rate, Local Amount */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewDepositDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Deposit Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(paymentData.depositDate)}
                </div>
              </div>
            )}

            {canViewExchangeRate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Exchange Rate
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(paymentData.exchangeRate)}
                </div>
              </div>
            )}

            {canViewLocalAmount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Local Amount</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  ${displayValue(paymentData.localAmount)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Default, Draft, Active, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {paymentData.isDefault ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {paymentData.isDraft ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {paymentData.isActive ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {paymentData.isDeleted ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </PageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(paymentData.createdAt),
          updated: getRelativeTime(paymentData.updatedAt),
          drafted: getRelativeTime(paymentData.draftedAt),
          deleted: getRelativeTime(paymentData.deletedAt),
        }}
      />

      {/* Export Warning Modal */}
      <ResetFormModal
        opened={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={() => setShowExportModal(false)}
        title="Export Options Required"
        message="Please select PDF/Print options before exporting. You need to enable at least one to export the data."
        confirmText="OK"
        cancelText="Cancel"
      />
    </>
  );
}
