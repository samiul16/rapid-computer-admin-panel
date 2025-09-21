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
import { Modal, Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";

import GridFilterComponent from "./GridFilterComponent";
import GridExportComponent from "./GridExportComponent";

interface GridCardDataType {
  documentNumber: string;
  customer: string;
  quotationNumber: string;
  quotationDate: Date | string;
  vatNumber: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date | string;
  country: string;
  state: string;
  city: string;
  remarks: string;
  salesMan: string;

  // same for all
  id: string;
  status: "active" | "inactive" | "draft";
  isDeleted: boolean;
}

const gridCardData: GridCardDataType[] = [
  {
    documentNumber: "SQG-001",
    customer: "Digital Mart Ltd.",
    quotationNumber: "QG-2001",
    quotationDate: "2025-07-01",
    vatNumber: "VAT20230001",
    paymentMode: "Bank Transfer",
    dueDays: 15,
    paymentDate: "2025-07-16",
    country: "Bangladesh",
    state: "Dhaka",
    city: "Mohakhali",
    remarks: "Urgent processing",
    salesMan: "Sabbir Hossain",
    id: "101",
    status: "active",
    isDeleted: false,
  },
  {
    documentNumber: "SQG-002",
    customer: "NextGen Tech",
    quotationNumber: "QG-2002",
    quotationDate: "2025-07-03",
    vatNumber: "VAT20230002",
    paymentMode: "Cash",
    dueDays: 0,
    paymentDate: "2025-07-03",
    country: "Bangladesh",
    state: "Chattogram",
    city: "Panchlaish",
    remarks: "Immediate payment confirmed",
    salesMan: "Rafsan Jamil",
    id: "102",
    status: "draft",
    isDeleted: false,
  },
  {
    documentNumber: "SQG-003",
    customer: "Smart Builders",
    quotationNumber: "QG-2003",
    quotationDate: "2025-07-05",
    vatNumber: "VAT20230003",
    paymentMode: "Mobile Banking",
    dueDays: 7,
    paymentDate: "2025-07-12",
    country: "Bangladesh",
    state: "Rajshahi",
    city: "Rajpara",
    remarks: "Add shipping charges",
    salesMan: "Tanvir Hasan",
    id: "103",
    status: "inactive",
    isDeleted: false,
  },
  {
    documentNumber: "SQG-004",
    customer: "Global Traders",
    quotationNumber: "QG-2004",
    quotationDate: "2025-07-06",
    vatNumber: "VAT20230004",
    paymentMode: "Cheque",
    dueDays: 10,
    paymentDate: "2025-07-16",
    country: "Bangladesh",
    state: "Khulna",
    city: "Daulatpur",
    remarks: "Include bulk discount",
    salesMan: "Shuvo Mahmud",
    id: "104",
    status: "active",
    isDeleted: false,
  },
  {
    documentNumber: "SQG-005",
    customer: "Orbit Solutions",
    quotationNumber: "QG-2005",
    quotationDate: "2025-07-07",
    vatNumber: "VAT20230005",
    paymentMode: "Cash",
    dueDays: 0,
    paymentDate: "2025-07-07",
    country: "Bangladesh",
    state: "Sylhet",
    city: "Amberkhana",
    remarks: "Requested custom package",
    salesMan: "Jahirul Islam",
    id: "105",
    status: "draft",
    isDeleted: false,
  },
  {
    documentNumber: "SQG-006",
    customer: "Light House Furnishers",
    quotationNumber: "QG-2006",
    quotationDate: "2025-07-08",
    vatNumber: "VAT20230006",
    paymentMode: "Bank Transfer",
    dueDays: 20,
    paymentDate: "2025-07-28",
    country: "Bangladesh",
    state: "Mymensingh",
    city: "Shambhuganj",
    remarks: "Include VAT separately",
    salesMan: "Faisal Huda",
    id: "106",
    status: "active",
    isDeleted: false,
  },
  {
    documentNumber: "SQG-007",
    customer: "Infinity Services",
    quotationNumber: "QG-2007",
    quotationDate: "2025-07-09",
    vatNumber: "VAT20230007",
    paymentMode: "Mobile Banking",
    dueDays: 5,
    paymentDate: "2025-07-14",
    country: "Bangladesh",
    state: "Barishal",
    city: "Rupatoli",
    remarks: "Fast-track delivery required",
    salesMan: "Rayhan Kabir",
    id: "107",
    status: "inactive",
    isDeleted: true,
  },
  {
    documentNumber: "SQG-008",
    customer: "Eastern Software",
    quotationNumber: "QG-2008",
    quotationDate: "2025-07-10",
    vatNumber: "VAT20230008",
    paymentMode: "Cheque",
    dueDays: 12,
    paymentDate: "2025-07-22",
    country: "Bangladesh",
    state: "Rangpur",
    city: "Shalban",
    remarks: "Include training costs",
    salesMan: "Mehedi Hasan",
    id: "108",
    status: "active",
    isDeleted: false,
  },
];

export default function ComponentLevelGridTable({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Reservation grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [gridData, setGridData] = useState(gridCardData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import sales quotations",
    message: <ImportStepperTemp />,
  });

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // ... (keep all your existing functions: loadMoreData, handleScroll, etc.)
  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      documentNumber: `SQ-${gridData.length + index + 1}`,
      customer: `Customer Name#${gridData.length + index + 1}`,
      quotationNumber: `Q-${gridData.length + index + 1}`,
      quotationDate: `2025-06-15`,
      vatNumber: `VAT-${gridData.length + index + 1}`,
      paymentMode: `Payment Mode#${gridData.length + index + 1}`,
      dueDays: 30,
      paymentDate: `2025-07-15`,
      country: `Country#${gridData.length + index + 1}`,
      state: `State#${gridData.length + index + 1}`,
      city: `City#${gridData.length + index + 1}`,
      remarks: `Remarks${gridData.length + index + 1}`,
      salesMan: `Sales Man#${gridData.length + index + 1}`,
      status:
        Math.random() > 0.3
          ? "active"
          : Math.random() > 0.5
          ? "inactive"
          : "draft",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...(newItems as GridCardDataType[])]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [gridData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  const handleRestoreClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item
      )
    );
  };

  // Filter waiters based on search query
  const filteredGridData = gridData.filter(
    (item) =>
      item.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vatNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.paymentMode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dueDays.toString().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import Sales Quotations",
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
                  placeholder="Search..."
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
            {filteredGridData.map((item) => (
              <Card
                key={item.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-3 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <Tooltip label={item.documentNumber} position="top" withArrow>
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                      onClick={() => navigate(`/sales-quotation/1`)}
                    >
                      {item.documentNumber}
                    </CardTitle>
                  </Tooltip>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        item.status === "active"
                          ? "CLick to Inactivate"
                          : "CLick to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.status === "active"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(item.id);
                          toastSuccess(
                            item.status === "active"
                              ? "Sales Quotation activated successfully"
                              : "Sales Quotation inactivated successfully"
                          );
                        }}
                      >
                        {item.status === "active" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={item.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (item.isDeleted) {
                            handleRestoreClick(item.id);
                          } else {
                            handleDeleteClick(item.id);
                          }
                          toastSuccess(
                            item.isDeleted
                              ? "Sales Quotation restored successfully"
                              : "Sales Quotation deleted successfully"
                          );
                        }}
                      >
                        {item.isDeleted ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip label="Edit" position="top" withArrow>
                      <div
                        className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500"
                        onClick={() => navigate(`/sales-quotation/edit/1`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Image */}
                  <div className="flex justify-end">
                    <div className="text-left">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        Due Days
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {item.dueDays}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 2 columns: country | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div className="text-left">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Quotation Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.quotationNumber}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Customer Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.customer}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Quotation Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.quotationDate.toString()}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div className="text-left">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Sales Man
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.salesMan}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      VAT Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.vatNumber}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Payment Mode
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.paymentMode}
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
                <span className="text-sm">
                  Loading more sales quotations...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more sales quotations to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={gridData}
                setFilteredData={setGridData}
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
                data={gridData}
                setFilteredData={setGridData}
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
            <h3 className="text-lg font-semibold pl-4">
              Import Sales Quotations
            </h3>
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
