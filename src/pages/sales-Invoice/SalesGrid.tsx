import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  List,
  Import,
  Download,
  Filter,
  Mic,
  Search,
  RefreshCw,
  CheckCircle2,
  Circle,
  Pencil,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "./GridFilterComponent";
import GridExportComponent from "./GridExportComponent";
import { Modal, Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";

// Define Invoice interface to ensure type consistency
interface Invoice {
  id: string;
  documentNumber: string;
  invoiceNumber: string;
  invoiceDate: Date;
  customer: string;
  trnNumber: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date;
  country: string;
  state: string;
  city: string;
  remarks: string;
  salesman: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data - replace with real data from your API
const invoices: Invoice[] = [
  {
    id: "1",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "John Doe",
    trnNumber: "TRN123456789",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
    salesman: "Alice Smith",
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
    documentNumber: "DOC002",
    invoiceNumber: "INV-2024-002",
    invoiceDate: new Date("2024-01-16"),
    customer: "Jane Smith",
    trnNumber: "TRN987654321",
    paymentMode: "Credit Card",
    dueDays: 15,
    paymentDate: new Date("2024-01-31"),
    country: "United States",
    state: "New York",
    city: "New York",
    remarks: "Standard delivery",
    salesman: "Bob Johnson",
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
    documentNumber: "DOC003",
    invoiceNumber: "INV-2024-003",
    invoiceDate: new Date("2024-01-17"),
    customer: "Acme Corp.",
    trnNumber: "TRN112233445",
    paymentMode: "Cash",
    dueDays: 7,
    paymentDate: new Date("2024-01-24"),
    country: "United States",
    state: "Florida",
    city: "Miami",
    remarks: "Daily fresh delivery",
    salesman: "Charlie Lee",
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
    documentNumber: "DOC004",
    invoiceNumber: "INV-2024-004",
    invoiceDate: new Date("2024-01-18"),
    customer: "Premium Meat Suppliers",
    trnNumber: "TRN123456789",
    paymentMode: "Check",
    dueDays: 45,
    paymentDate: new Date("2024-03-04"),
    country: "United States",
    state: "Texas",
    city: "Houston",
    remarks: "Temperature controlled delivery",
    salesman: "Alice Smith",
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
    documentNumber: "DOC005",
    invoiceNumber: "INV-2024-005",
    invoiceDate: new Date("2024-01-19"),
    customer: "Ocean Fresh Seafood",
    trnNumber: "TRN987654321",
    paymentMode: "ACH Transfer",
    dueDays: 21,
    paymentDate: new Date("2024-02-09"),
    country: "United States",
    state: "Washington",
    city: "Seattle",
    remarks: "Live delivery required",
    salesman: "Bob Johnson",
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
    documentNumber: "DOC006",
    invoiceNumber: "INV-2024-006",
    invoiceDate: new Date("2024-01-20"),
    customer: "Dairy Farm Products",
    trnNumber: "TRN112233445",
    paymentMode: "Net Banking",
    dueDays: 14,
    paymentDate: new Date("2024-02-03"),
    country: "United States",
    state: "Wisconsin",
    city: "Milwaukee",
    remarks: "Refrigerated transport",
    salesman: "Charlie Lee",
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
    documentNumber: "DOC007",
    invoiceNumber: "INV-2024-007",
    invoiceDate: new Date("2024-01-21"),
    customer: "Organic Vegetables Ltd",
    trnNumber: "TRN123456789",
    paymentMode: "PayPal",
    dueDays: 10,
    paymentDate: new Date("2024-01-31"),
    country: "United States",
    state: "Oregon",
    city: "Portland",
    remarks: "Organic certification required",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-21"),
    draftedAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    documentNumber: "DOC008",
    invoiceNumber: "INV-2024-008",
    invoiceDate: new Date("2024-01-22"),
    customer: "Spice World International",
    trnNumber: "TRN987654321",
    paymentMode: "Wire Transfer",
    dueDays: 60,
    paymentDate: new Date("2024-03-23"),
    country: "United States",
    state: "Louisiana",
    city: "New Orleans",
    remarks: "Bulk order - quarterly supply",
    salesman: "Bob Johnson",
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
    documentNumber: "DOC009",
    invoiceNumber: "INV-2024-009",
    invoiceDate: new Date("2024-01-23"),
    customer: "Beverage Distributors Inc",
    trnNumber: "TRN112233445",
    paymentMode: "Credit Line",
    dueDays: 30,
    paymentDate: new Date("2024-02-22"),
    country: "United States",
    state: "Georgia",
    city: "Atlanta",
    remarks: "Weekly delivery schedule",
    salesman: "Charlie Lee",
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
    documentNumber: "DOC010",
    invoiceNumber: "INV-2024-010",
    invoiceDate: new Date("2024-01-24"),
    customer: "Kitchen Supplies Pro",
    trnNumber: "TRN123456789",
    paymentMode: "Cash on Delivery",
    dueDays: 0,
    paymentDate: new Date("2024-01-24"),
    country: "United States",
    state: "Illinois",
    city: "Chicago",
    remarks: "Installation included",
    salesman: "Alice Smith",
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
    documentNumber: "DOC011",
    invoiceNumber: "INV-2024-011",
    invoiceDate: new Date("2024-01-25"),
    customer: "Bakery Ingredients Corp",
    trnNumber: "TRN987654321",
    paymentMode: "Debit Card",
    dueDays: 20,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "Colorado",
    city: "Denver",
    remarks: "Temperature sensitive items",
    salesman: "Bob Johnson",
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
    documentNumber: "DOC012",
    invoiceNumber: "INV-2024-012",
    invoiceDate: new Date("2024-01-26"),
    customer: "Frozen Foods Express",
    trnNumber: "TRN112233445",
    paymentMode: "Electronic Payment",
    dueDays: 25,
    paymentDate: new Date("2024-02-20"),
    country: "United States",
    state: "Minnesota",
    city: "Minneapolis",
    remarks: "Frozen storage required",
    salesman: "Charlie Lee",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "13",
    documentNumber: "DOC013",
    invoiceNumber: "INV-2024-013",
    invoiceDate: new Date("2024-01-27"),
    customer: "Gourmet Food Imports",
    trnNumber: "TRN123456789",
    paymentMode: "Letter of Credit",
    dueDays: 90,
    paymentDate: new Date("2024-04-26"),
    country: "United States",
    state: "Nevada",
    city: "Las Vegas",
    remarks: "Import documentation pending",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-27"),
    draftedAt: new Date("2024-01-27"),
    updatedAt: new Date("2024-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "14",
    documentNumber: "DOC014",
    invoiceNumber: "INV-2024-014",
    invoiceDate: new Date("2024-01-28"),
    customer: "Cleaning Supplies Direct",
    trnNumber: "TRN987654321",
    paymentMode: "Mobile Payment",
    dueDays: 15,
    paymentDate: new Date("2024-02-12"),
    country: "United States",
    state: "Arizona",
    city: "Phoenix",
    remarks: "Eco-friendly products only",
    salesman: "Bob Johnson",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-28"),
    draftedAt: null,
    updatedAt: new Date("2024-02-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "15",
    documentNumber: "DOC015",
    invoiceNumber: "INV-2024-015",
    invoiceDate: new Date("2024-01-29"),
    customer: "Restaurant Furniture Co",
    trnNumber: "TRN112233445",
    paymentMode: "Installment Plan",
    dueDays: 120,
    paymentDate: new Date("2024-05-28"),
    country: "United States",
    state: "North Carolina",
    city: "Charlotte",
    remarks: "Custom design requirements",
    salesman: "Charlie Lee",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-29"),
    draftedAt: null,
    updatedAt: new Date("2024-02-03"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "16",
    documentNumber: "DOC016",
    invoiceNumber: "INV-2024-016",
    invoiceDate: new Date("2024-01-30"),
    customer: "Tech Solutions Restaurant",
    trnNumber: "TRN123456789",
    paymentMode: "Crypto Payment",
    dueDays: 30,
    paymentDate: new Date("2024-03-01"),
    country: "United States",
    state: "Massachusetts",
    city: "Boston",
    remarks: "Software licensing included",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-30"),
    draftedAt: null,
    updatedAt: new Date("2024-02-04"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "17",
    documentNumber: "DOC017",
    invoiceNumber: "INV-2024-017",
    invoiceDate: new Date("2024-01-31"),
    customer: "Uniform & Apparel Supply",
    trnNumber: "TRN987654321",
    paymentMode: "Gift Card Credit",
    dueDays: 45,
    paymentDate: new Date("2024-03-17"),
    country: "United States",
    state: "Tennessee",
    city: "Nashville",
    remarks: "Custom embroidery required",
    salesman: "Bob Johnson",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-31"),
    draftedAt: null,
    updatedAt: new Date("2024-02-05"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function InvoicesGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Invoices grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [invoicesData, setInvoicesData] = useState(invoices);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Orders",
    message: <ImportStepperTemp />,
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

    const paymentModes = [
      "Bank Transfer",
      "Credit Card",
      "Cash",
      "Check",
      "ACH Transfer",
      "Wire Transfer",
      "PayPal",
      "Credit Line",
      "Cash on Delivery",
      "Electronic Payment",
      "Letter of Credit",
      "Mobile Payment",
      "Installment Plan",
      "Crypto Payment",
      "Gift Card Credit",
    ];
    const cities = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "Atlanta",
      "Boston",
      "Dallas",
      "Denver",
      "Detroit",
      "Las Vegas",
      "Miami",
      "Minneapolis",
      "Nashville",
      "New Orleans",
      "Oakland",
      "Portland",
      "San Diego",
      "San Francisco",
      "Seattle",
      "Tampa",
      "Washington D.C.",
    ];
    const states = [
      "California",
      "Texas",
      "Florida",
      "New York",
      "Illinois",
      "Pennsylvania",
      "Ohio",
      "Georgia",
      "Tennessee",
      "Massachusetts",
      "Arizona",
      "Nevada",
      "Washington",
      "Oregon",
      "Wisconsin",
      "Louisiana",
      "Minnesota",
      "North Carolina",
      "South Carolina",
      "New Jersey",
      "Colorado",
      "Michigan",
      "Missouri",
      "Nebraska",
      "New Mexico",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomPaymentMode =
        paymentModes[Math.floor(Math.random() * paymentModes.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomState = states[Math.floor(Math.random() * states.length)];

      return {
        id: `${Date.now()}-${index}`,
        documentNumber: `DOC${(invoicesData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        invoiceNumber: `INV-2024-${(invoicesData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        invoiceDate: new Date(),
        customer: `Customer ${invoicesData.length + index + 1}`,
        trnNumber: `TRN${(invoicesData.length + index + 1)
          .toString()
          .padStart(9, "0")}`,
        paymentMode: randomPaymentMode,
        dueDays: Math.floor(Math.random() * 90) + 1,
        paymentDate: new Date(
          Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
        ),
        country: "United States",
        state: randomState,
        city: randomCity,
        remarks: `Invoice remarks ${invoicesData.length + index + 1}`,
        salesman: `Salesman ${invoicesData.length + index + 1}`,
        isActive: Math.random() > 0.3,
        isDraft: Math.random() > 0.7,
        createdAt: new Date(),
        draftedAt: Math.random() > 0.7 ? new Date() : null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      };
    });

    // Stop loading more after reaching 50 items for demo
    if (invoicesData.length >= 46) {
      setHasMore(false);
    } else {
      setInvoicesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [invoicesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (invoiceId: string) => {
    setInvoicesData((prevInvoices: Invoice[]) =>
      prevInvoices.map((invoice) =>
        invoice.id === invoiceId
          ? {
              ...invoice,
              isDeleted: !invoice.isDeleted,
              deletedAt: !invoice.isDeleted ? new Date() : null,
            }
          : invoice
      )
    );
  };

  const handleRestoreClick = (invoiceId: string) => {
    setInvoicesData((prevInvoices: Invoice[]) =>
      prevInvoices.map((invoice) =>
        invoice.id === invoiceId
          ? {
              ...invoice,
              isDeleted: false,
              deletedAt: null,
            }
          : invoice
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (invoiceId: string) => {
    setInvoicesData((prevInvoices: Invoice[]) =>
      prevInvoices.map((invoice) =>
        invoice.id === invoiceId
          ? {
              ...invoice,
              isActive: !invoice.isActive,
              updatedAt: new Date(),
            }
          : invoice
      )
    );
  };

  // Filter invoices based on search query
  const filteredInvoices = invoicesData.filter(
    (invoice) =>
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.documentNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.trnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.paymentMode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent">
      {/* Fixed header controls - keep existing header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-  rounded-full min-w-[60px] sm:min-w-[80px]"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer rounded-full"
              onClick={() => {
                open();
                setModalData({
                  title: "Import Invoices",
                  message: <ImportStepperTemp />,
                });
              }}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          </div>

          {/* Search */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-xs mx-auto">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400 z-10" />
                <Input
                  placeholder="Search invoices..."
                  className="pl-9 pr-9 w-full rounded-full relative z-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Tooltip
                  arrowOffset={10}
                  arrowSize={7}
                  withArrow
                  position="top"
                  label="Search by voice"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0 z-10"
                  >
                    <Mic className="h-4 w-4 text-blue-700" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Right buttons */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isExportOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsExportOpen(!isExportOpen);
                setIsFilterOpen(false);
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.export")}</span>
            </Button>

            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isFilterOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsExportOpen(false);
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>
          </div>
        </div>
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
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
            {filteredInvoices.map((invoice) => (
              <Card
                key={invoice.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 2 Column Grid Layout (No Logo) */}
                <div className="grid grid-cols-2 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={invoice.customer} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/sales-invoice/${invoice.id}`)}
                      >
                        {invoice.customer}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Right - Action Icons */}
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        invoice.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          invoice.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(invoice.id);
                          toastSuccess(
                            invoice.isActive
                              ? "Invoice deactivated successfully"
                              : "Invoice activated successfully"
                          );
                        }}
                      >
                        {invoice.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={invoice.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          invoice.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (invoice.isDeleted) {
                            handleRestoreClick(invoice.id);
                          } else {
                            handleDeleteClick(invoice.id);
                          }
                          toastSuccess(
                            invoice.isDeleted
                              ? "Invoice restored successfully"
                              : "Invoice deleted successfully"
                          );
                        }}
                      >
                        {invoice.isDeleted ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip label="Edit" position="top" withArrow>
                      <div
                        className="cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center"
                        onClick={() =>
                          navigate(`/sales-invoice/${invoice.id}/edit`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: P.O Number | Status Badges | Due Days */}
                <div className="grid grid-cols-3 items-start gap-4 pt-2 border-t dark:border-gray-700">
                  {/* P.O Number - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Invoice Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-max">
                      {invoice.invoiceNumber}
                    </div>
                  </div>

                  {/* Status Badges - Center aligned */}
                  <div className="flex justify-center items-center gap-1 pt-3">
                    {invoice.isDraft && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Due Days - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Due Days
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {invoice.dueDays} days
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
                <span className="text-sm">Loading more invoices...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredInvoices.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more invoices to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={invoices}
                setFilteredData={setInvoicesData}
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
                data={invoices}
                setFilteredData={setInvoicesData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div className="">
            <h3 className="text-lg font-semibold pl-4 ">Import Invoices</h3>
          </div>
        }
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        style={{ zIndex: 9999 }}
        className="z-[9999]"
        centered
      >
        <div className="pt-5 pb-14 px-5">{modalData.message}</div>
      </Modal>
    </div>
  );
}
