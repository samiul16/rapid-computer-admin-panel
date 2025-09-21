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
  purchaseInvoiceNumber: string;
  poNumber: string;
  poDate: string;
  supplierName: string;
  paymentType: string;
  dueDays: number;
  paymentDate: string;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;

  // same for all
  id: string;
  status: "active" | "inactive" | "draft";
  isDeleted: boolean;
}

const gridCardData: GridCardDataType[] = [
  {
    documentNumber: "PR-2001",
    purchaseInvoiceNumber: "INV-7001",
    poNumber: "PO-8001",
    poDate: "2025-06-10",
    supplierName: "Global Traders Ltd.",
    paymentType: "Credit",
    dueDays: 30,
    paymentDate: "2025-07-10",
    supplierNumber: "SUP-101",
    supplierStatus: "Verified",
    supplierGroup: "Local",
    remarks: "Returned damaged boxes",
    country: "Bangladesh",
    state: "Dhaka",
    city: "Dhaka",

    id: "PR-2001",
    status: "active",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2002",
    purchaseInvoiceNumber: "INV-7002",
    poNumber: "PO-8002",
    poDate: "2025-06-12",
    supplierName: "Sunshine Imports",
    paymentType: "Cash",
    dueDays: 0,
    paymentDate: "2025-06-12",
    supplierNumber: "SUP-102",
    supplierStatus: "Active",
    supplierGroup: "International",
    remarks: "Over shipment",
    country: "India",
    state: "West Bengal",
    city: "Kolkata",
    id: "PR-2002",
    status: "inactive",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2003",
    purchaseInvoiceNumber: "INV-7003",
    poNumber: "PO-8003",
    poDate: "2025-06-14",
    supplierName: "Oceanic Supplies",
    paymentType: "Bank Transfer",
    dueDays: 15,
    paymentDate: "2025-06-29",
    supplierNumber: "SUP-103",
    supplierStatus: "Pending",
    supplierGroup: "International",
    remarks: "Item not matching spec",
    country: "China",
    state: "Guangdong",
    city: "Shenzhen",
    id: "PR-2003",
    status: "draft",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2004",
    purchaseInvoiceNumber: "INV-7004",
    poNumber: "PO-8004",
    poDate: "2025-06-15",
    supplierName: "Delta Distributors",
    paymentType: "Credit",
    dueDays: 20,
    paymentDate: "2025-07-05",
    supplierNumber: "SUP-104",
    supplierStatus: "Active",
    supplierGroup: "Local",
    remarks: "Short quantity delivered",
    country: "Bangladesh",
    state: "Chattogram",
    city: "Chattogram",
    id: "PR-2004",
    status: "active",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2005",
    purchaseInvoiceNumber: "INV-7005",
    poNumber: "PO-8005",
    poDate: "2025-06-17",
    supplierName: "Brightway Exports",
    paymentType: "Cash",
    dueDays: 0,
    paymentDate: "2025-06-17",
    supplierNumber: "SUP-105",
    supplierStatus: "Verified",
    supplierGroup: "International",
    remarks: "Rejected due to wrong model",
    country: "Thailand",
    state: "Bangkok",
    city: "Bangkok",
    id: "PR-2005",
    status: "inactive",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2006",
    purchaseInvoiceNumber: "INV-7006",
    poNumber: "PO-8006",
    poDate: "2025-06-18",
    supplierName: "Green Fields Co.",
    paymentType: "Credit",
    dueDays: 10,
    paymentDate: "2025-06-28",
    supplierNumber: "SUP-106",
    supplierStatus: "Active",
    supplierGroup: "Local",
    remarks: "Product expired",
    country: "Bangladesh",
    state: "Rajshahi",
    city: "Rajshahi",
    id: "PR-2006",
    status: "draft",
    isDeleted: true,
  },
  {
    documentNumber: "PR-2007",
    purchaseInvoiceNumber: "INV-7007",
    poNumber: "PO-8007",
    poDate: "2025-06-19",
    supplierName: "Techzone BD",
    paymentType: "Bank Transfer",
    dueDays: 25,
    paymentDate: "2025-07-14",
    supplierNumber: "SUP-107",
    supplierStatus: "Verified",
    supplierGroup: "Local",
    remarks: "Excess items returned",
    country: "Bangladesh",
    state: "Sylhet",
    city: "Sylhet",
    id: "PR-2007",
    status: "active",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2008",
    purchaseInvoiceNumber: "INV-7008",
    poNumber: "PO-8008",
    poDate: "2025-06-20",
    supplierName: "NovaTech Supplies",
    paymentType: "Credit",
    dueDays: 5,
    paymentDate: "2025-06-25",
    supplierNumber: "SUP-108",
    supplierStatus: "Pending",
    supplierGroup: "International",
    remarks: "Packaging issues",
    country: "Malaysia",
    state: "Selangor",
    city: "Shah Alam",
    id: "PR-2008",
    status: "draft",
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
    title: "Import purchase returns",
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
      documentNumber: `PR-${gridData.length + index + 1}`,
      purchaseInvoiceNumber: `INV-${gridData.length + index + 1}`,
      poNumber: `PO-${gridData.length + index + 1}`,
      poDate: `2025-06-15`,
      supplierName: `Supplier Name#${gridData.length + index + 1}`,
      paymentType: `Payment Type#${gridData.length + index + 1}`,
      dueDays: 30,
      paymentDate: `2025-07-15`,
      supplierNumber: `SUP-${gridData.length + index + 1}`,
      supplierStatus: `Supplier Status#${gridData.length + index + 1}`,
      supplierGroup: `Supplier Group#${gridData.length + index + 1}`,
      remarks: `Remarks${gridData.length + index + 1}`,
      country: `Country#${gridData.length + index + 1}`,
      state: `State#${gridData.length + index + 1}`,
      city: `City#${gridData.length + index + 1}`,
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
      item.purchaseInvoiceNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.poDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.paymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dueDays.toString().includes(searchQuery.toLowerCase()) ||
      item.paymentDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.remarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                  title: "Import Purchase Returns",
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
                      onClick={() => navigate(`/purchase-returns/1`)}
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
                              ? "Purchase Return activated successfully"
                              : "Purchase Return inactivated successfully"
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
                              ? "Purchase Return restored successfully"
                              : "Purchase Return deleted successfully"
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
                        onClick={() => navigate(`/purchase-returns/edit/1`)}
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
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div className="text-left">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Purchase Invoice Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.purchaseInvoiceNumber}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      PO Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.poDate}
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
                  Loading more purchase returns...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more purchase returns to load
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
              Import Purchase Returns
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
