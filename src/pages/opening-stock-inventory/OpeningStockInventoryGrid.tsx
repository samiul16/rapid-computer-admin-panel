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
import { Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";

// Define OpeningStock interface
interface OpeningStock {
  id: string;
  documentNumber: string;
  branch: string;
  documentDate: Date;
  remarks: string;
  amount: number;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data for opening stock
const openingStocks: OpeningStock[] = [
  {
    id: "1",
    documentNumber: "OS001",
    branch: "Main Branch",
    documentDate: new Date("2024-01-15"),
    remarks: "Initial inventory setup",
    amount: 15000.5,
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
    documentNumber: "OS002",
    branch: "North Branch",
    documentDate: new Date("2024-01-16"),
    remarks: "Quarterly stock adjustment",
    amount: 8750.25,
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
    documentNumber: "OS003",
    branch: "South Branch",
    documentDate: new Date("2024-01-17"),
    remarks: "New location inventory",
    amount: 12300.75,
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
    documentNumber: "OS004",
    branch: "East Branch",
    documentDate: new Date("2024-01-18"),
    remarks: "Stock reconciliation",
    amount: 9850.0,
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
    documentNumber: "OS005",
    branch: "West Branch",
    documentDate: new Date("2024-01-19"),
    remarks: "Monthly inventory update",
    amount: 16750.3,
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
    documentNumber: "OS006",
    branch: "Central Branch",
    documentDate: new Date("2024-01-20"),
    remarks: "Year-end stock count",
    amount: 22100.45,
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
    documentNumber: "OS007",
    branch: "Downtown Branch",
    documentDate: new Date("2024-01-21"),
    remarks: "Seasonal inventory adjustment",
    amount: 7890.6,
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
    documentNumber: "OS008",
    branch: "Suburban Branch",
    documentDate: new Date("2024-01-22"),
    remarks: "New product line addition",
    amount: 13450.8,
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
    documentNumber: "OS009",
    branch: "Uptown Branch",
    documentDate: new Date("2024-01-23"),
    remarks: "Bulk purchase inventory",
    amount: 18600.9,
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
    documentNumber: "OS010",
    branch: "Riverside Branch",
    documentDate: new Date("2024-01-24"),
    remarks: "Emergency stock replenishment",
    amount: 5320.15,
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
    documentNumber: "OS011",
    branch: "Hillside Branch",
    documentDate: new Date("2024-01-25"),
    remarks: "Inventory transfer documentation",
    amount: 11750.25,
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
    documentNumber: "OS012",
    branch: "Lakeside Branch",
    documentDate: new Date("2024-01-26"),
    remarks: "Seasonal clearance stock",
    amount: 6780.4,
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
    documentNumber: "OS013",
    branch: "Garden Branch",
    documentDate: new Date("2024-01-27"),
    remarks: "Pending audit verification",
    amount: 14250.75,
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
    documentNumber: "OS014",
    branch: "Plaza Branch",
    documentDate: new Date("2024-01-28"),
    remarks: "Weekly stock update",
    amount: 8920.55,
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
    documentNumber: "OS015",
    branch: "Metro Branch",
    documentDate: new Date("2024-01-29"),
    remarks: "Special category inventory",
    amount: 19850.35,
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
    documentNumber: "OS016",
    branch: "Business District",
    documentDate: new Date("2024-01-30"),
    remarks: "Technology equipment stock",
    amount: 25600.2,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-30"),
    draftedAt: null,
    updatedAt: new Date("2024-02-04"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function OpeningStockGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Opening stock grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [stockData, setStockData] = useState(openingStocks);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Opening Stock",
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

    const branches = [
      "Main Branch",
      "North Branch",
      "South Branch",
      "East Branch",
      "West Branch",
      "Central Branch",
      "Downtown Branch",
      "Suburban Branch",
    ];

    const remarks = [
      "Monthly inventory update",
      "Quarterly stock adjustment",
      "Stock reconciliation",
      "New product line addition",
      "Seasonal inventory adjustment",
      "Year-end stock count",
      "Emergency stock replenishment",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomBranch =
        branches[Math.floor(Math.random() * branches.length)];
      const randomRemarks = remarks[Math.floor(Math.random() * remarks.length)];

      return {
        id: `${Date.now()}-${index}`,
        documentNumber: `OS${(stockData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        branch: randomBranch,
        documentDate: new Date(),
        remarks: randomRemarks,
        amount: Math.floor(Math.random() * 25000) + 1000 + Math.random(),
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
    if (stockData.length >= 46) {
      setHasMore(false);
    } else {
      setStockData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [stockData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100;

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

  const handleDeleteClick = (stockId: string) => {
    setStockData((prevStock) =>
      prevStock.map((stock) =>
        stock.id === stockId
          ? {
              ...stock,
              isDeleted: !stock.isDeleted,
              deletedAt: !stock.isDeleted ? new Date() : null,
            }
          : stock
      )
    );
  };

  const handleRestoreClick = (stockId: string) => {
    setStockData((prevStock) =>
      prevStock.map((stock) =>
        stock.id === stockId
          ? {
              ...stock,
              isDeleted: false,
              deletedAt: null,
            }
          : stock
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (stockId: string) => {
    setStockData((prevStock) =>
      prevStock.map((stock) =>
        stock.id === stockId
          ? {
              ...stock,
              isActive: !stock.isActive,
              updatedAt: new Date(),
            }
          : stock
      )
    );
  };

  // Filter stock based on search query
  const filteredStock = stockData.filter(
    (stock) =>
      stock.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.remarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.amount.toString().includes(searchQuery.toLowerCase())
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent">
      {/* Fixed header controls */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 rounded-full min-w-[60px] sm:min-w-[80px]"
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
                  title: "Import Opening Stock",
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
                  placeholder="Search opening stock..."
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
            {filteredStock.map((stock) => (
              <Card
                key={stock.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 2 Column Grid Layout */}
                <div className="grid grid-cols-2 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={stock.branch} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() =>
                          navigate(`/opening-stock-inventory/${stock.id}`)
                        }
                      >
                        {stock.branch}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Right - Action Icons */}
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        stock.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          stock.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(stock.id);
                          toastSuccess(
                            stock.isActive
                              ? "Opening stock deactivated successfully"
                              : "Opening stock activated successfully"
                          );
                        }}
                      >
                        {stock.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={stock.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          stock.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (stock.isDeleted) {
                            handleRestoreClick(stock.id);
                          } else {
                            handleDeleteClick(stock.id);
                          }
                          toastSuccess(
                            stock.isDeleted
                              ? "Opening stock restored successfully"
                              : "Opening stock deleted successfully"
                          );
                        }}
                      >
                        {stock.isDeleted ? (
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
                          navigate(`/opening-stock-inventory/edit/${stock.id}`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Document Number | Status Badges | Amount */}
                <div className="grid grid-cols-3 items-start gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Document Number - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t("openingStockInventory.documentNumber")}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {stock.documentNumber}
                    </div>
                  </div>

                  {/* Status Badges - Center aligned */}
                  <div className="flex justify-center items-center gap-1 pt-3">
                    {stock.isActive && (
                      <span className="text-[10px] sm:text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {t("openingStockInventory.active")}
                      </span>
                    )}
                    {!stock.isActive && (
                      <span className="text-[10px] sm:text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {t("openingStockInventory.inactive")}
                      </span>
                    )}
                    {stock.isDraft && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {t("openingStockInventory.draft")}
                      </span>
                    )}
                  </div>

                  {/* Amount - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t("openingStockInventory.amount")}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {formatCurrency(stock.amount)}
                    </div>
                  </div>
                </div>

                {/* Remarks section - Full width below */}
                <div className="mt-3 pt-2 border-t dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t("openingStockInventory.remarks")}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {stock.remarks}
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
                  {t("openingStockInventory.loadingMore")}
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredStock.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("openingStockInventory.noMore")}
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={openingStocks}
                setFilteredData={setStockData}
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
                data={openingStocks}
                setFilteredData={setStockData}
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
              {t("openingStockInventory.importOpeningStock")}
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
