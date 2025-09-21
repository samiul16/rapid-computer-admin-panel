import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";

// Mock payment data - replace with real data from your API
const paymentsData = [
  {
    id: "1",
    invoiceType: "Commercial Invoice",
    currency: "USD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 15000.0,
    containerAmount: 12000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 3000.0,
    depositDate: new Date("2024-01-15"),
    exchangeRate: 1.0,
    localAmount: 15000.0,
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    invoiceType: "Proforma Invoice",
    currency: "EUR",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 25000.0,
    containerAmount: 20000.0,
    typeOfDeposit: "Letter of Credit",
    depositAmount: 5000.0,
    depositDate: new Date("2024-01-16"),
    exchangeRate: 1.1,
    localAmount: 27500.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-16"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    invoiceType: "Commercial Invoice",
    currency: "GBP",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 18000.0,
    containerAmount: 15000.0,
    typeOfDeposit: "Bank Guarantee",
    depositAmount: 3000.0,
    depositDate: new Date("2024-01-17"),
    exchangeRate: 1.3,
    localAmount: 23400.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-17"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    invoiceType: "Proforma Invoice",
    currency: "JPY",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 3000000.0,
    containerAmount: 2500000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 500000.0,
    depositDate: new Date("2024-01-18"),
    exchangeRate: 0.007,
    localAmount: 21000.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-18"),
    draftedAt: null,
    updatedAt: new Date("2024-01-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    invoiceType: "Commercial Invoice",
    currency: "CAD",
    paymentTerms: "Net 90",
    dueDays: 90,
    totalAmount: 35000.0,
    containerAmount: 28000.0,
    typeOfDeposit: "Standby Letter of Credit",
    depositAmount: 7000.0,
    depositDate: new Date("2024-01-19"),
    exchangeRate: 0.75,
    localAmount: 26250.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-19"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    invoiceType: "Proforma Invoice",
    currency: "AUD",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 22000.0,
    containerAmount: 18000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 4000.0,
    depositDate: new Date("2024-01-20"),
    exchangeRate: 0.68,
    localAmount: 14960.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-20"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    invoiceType: "Commercial Invoice",
    currency: "CHF",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 28000.0,
    containerAmount: 22000.0,
    typeOfDeposit: "Bank Guarantee",
    depositAmount: 6000.0,
    depositDate: new Date("2024-01-21"),
    exchangeRate: 1.15,
    localAmount: 32200.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-21"),
    draftedAt: null,
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    invoiceType: "Proforma Invoice",
    currency: "SGD",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 32000.0,
    containerAmount: 26000.0,
    typeOfDeposit: "Letter of Credit",
    depositAmount: 6000.0,
    depositDate: new Date("2024-01-22"),
    exchangeRate: 0.74,
    localAmount: 23680.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-22"),
    draftedAt: null,
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    invoiceType: "Commercial Invoice",
    currency: "HKD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 180000.0,
    containerAmount: 150000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 30000.0,
    depositDate: new Date("2024-01-23"),
    exchangeRate: 0.13,
    localAmount: 23400.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-23"),
    draftedAt: null,
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    invoiceType: "Proforma Invoice",
    currency: "NZD",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 26000.0,
    containerAmount: 21000.0,
    typeOfDeposit: "Standby Letter of Credit",
    depositAmount: 5000.0,
    depositDate: new Date("2024-01-24"),
    exchangeRate: 0.62,
    localAmount: 16120.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-24"),
    draftedAt: null,
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    invoiceType: "Commercial Invoice",
    currency: "SEK",
    paymentTerms: "Net 90",
    dueDays: 90,
    totalAmount: 280000.0,
    containerAmount: 230000.0,
    typeOfDeposit: "Bank Guarantee",
    depositAmount: 50000.0,
    depositDate: new Date("2024-01-25"),
    exchangeRate: 0.095,
    localAmount: 26600.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-25"),
    draftedAt: null,
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    invoiceType: "Proforma Invoice",
    currency: "NOK",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 240000.0,
    containerAmount: 200000.0,
    typeOfDeposit: "Letter of Credit",
    depositAmount: 40000.0,
    depositDate: new Date("2024-01-26"),
    exchangeRate: 0.098,
    localAmount: 23520.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function PaymentGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Payment grid rendered");

  const navigate = useNavigate();

  const [paymentsDataState, setPaymentsDataState] = useState(paymentsData);
  const canDelete: boolean = usePermission("payment", "delete");
  const canRestore: boolean = usePermission("payment", "restore");
  const canEdit: boolean = usePermission("payment", "edit");

  // Debug permissions
  console.log("Payment Permissions:", {
    canDelete,
    canRestore,
    canEdit,
  });

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const invoiceTypes = [
      "Commercial Invoice",
      "Proforma Invoice",
      "Credit Note",
      "Debit Note",
    ];

    const currencies = [
      "USD",
      "EUR",
      "GBP",
      "JPY",
      "CAD",
      "AUD",
      "CHF",
      "SGD",
      "HKD",
      "NZD",
      "SEK",
      "NOK",
    ];
    const paymentTerms = ["Net 30", "Net 45", "Net 60", "Net 90"];
    const depositTypes = [
      "Advance Payment",
      "Letter of Credit",
      "Bank Guarantee",
      "Standby Letter of Credit",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      invoiceType:
        invoiceTypes[Math.floor(Math.random() * invoiceTypes.length)],
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      paymentTerms:
        paymentTerms[Math.floor(Math.random() * paymentTerms.length)],
      dueDays: [30, 45, 60, 90][Math.floor(Math.random() * 4)],
      totalAmount: Math.floor(Math.random() * 50000) + 10000,
      containerAmount: Math.floor(Math.random() * 40000) + 8000,
      typeOfDeposit:
        depositTypes[Math.floor(Math.random() * depositTypes.length)],
      depositAmount: Math.floor(Math.random() * 10000) + 2000,
      depositDate: new Date(),
      exchangeRate: Math.random() * 2 + 0.5,
      localAmount: Math.floor(Math.random() * 50000) + 10000,
      isDefault: false,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (paymentsDataState.length >= 46) {
      setHasMore(false);
    } else {
      setPaymentsDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [paymentsDataState.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100; // Load more when 100px from bottom

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDeleteClick = (paymentId: string) => {
    setPaymentsDataState((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              isDeleted: payment.isDeleted === true ? false : true,
            }
          : payment
      )
    );
  };

  const handleRestoreClick = (paymentId: string) => {
    setPaymentsDataState((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              isDeleted: payment.isDeleted === true ? false : true,
            }
          : payment
      )
    );
  };

  // Filter payments based on search query
  const filteredPayments = paymentsDataState.filter(
    (payment) =>
      payment.invoiceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.paymentTerms.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.typeOfDeposit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={cn(
        "px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg"
      )}
    >
      {/* Floating Label - Left Top */}
      <div
        className={cn(
          "absolute -top-4 left-6 rtl:left-auto rtl:right-6 py-1 rounded-md z-40! bg-white w-fit"
        )}
      >
        <span
          className={cn(
            "text-md font-semibold tracking-wide capitalize text-gray-600"
          )}
        >
          Total {paymentsData.length} payments
        </span>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4 p-2">
            {filteredPayments.map((payment, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/payment/1`)}
                  >
                    {payment.invoiceType}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {payment.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Currency | Actions | Amount */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Currency - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Currency
                    </div>
                    <div className="text-sm font-semibold text-blue-600 truncate">
                      {payment.currency}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        payment.isDeleted && canRestore
                          ? "Restore"
                          : canDelete
                          ? "Delete"
                          : ""
                      }
                      position="top"
                      arrowSize={8}
                      withArrow
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "#374151",
                          color: "white",
                          borderRadius: "6px",
                          fontWeight: "500",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "#374151",
                        },
                      }}
                    >
                      <button
                        disabled={payment.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          payment.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && payment.isDeleted) {
                            handleRestoreClick(payment.id);
                            toastRestore("Payment restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(payment.id);
                              toastDelete("Payment deleted successfully");
                            }
                          }
                        }}
                      >
                        {payment.isDeleted && canRestore ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          canDelete && <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </Tooltip>

                    {/* Edit */}
                    {canEdit && (
                      <Tooltip
                        label="Edit"
                        position="top"
                        arrowSize={8}
                        withArrow
                        styles={{
                          tooltip: {
                            fontSize: "14px",
                            padding: "8px 12px",
                            backgroundColor: "#374151",
                            color: "white",
                            borderRadius: "6px",
                            fontWeight: "500",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          },
                          arrow: {
                            backgroundColor: "#374151",
                          },
                        }}
                      >
                        <div
                          className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center w-8 h-8"
                          onClick={() => navigate(`/payment/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Amount - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Total Amount
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {payment.currency} {payment.totalAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more payments...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredPayments.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more payments to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={paymentsData}
                setFilteredData={setPaymentsDataState}
                setShowFilter={setIsFilterOpen}
              />
            </div>
          </div>
        )}

        {/* Export component - Right side only */}
        {isExportOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={paymentsData}
                setFilteredData={setPaymentsDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
