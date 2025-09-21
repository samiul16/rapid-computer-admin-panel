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
  itemId: string;
  quantityDamaged: number;
  damageDate: string;
  reportedBy: string;
  location: string;
  damageType: "Transit" | "Handling" | "Expired" | "Other";

  // same for all
  id: string;
  status: "active" | "inactive" | "draft";
  isDeleted: boolean;
}
export const gridCardData: GridCardDataType[] = [
  {
    itemId: "ITEM001",
    quantityDamaged: 3,
    damageDate: "2025-07-18",
    reportedBy: "John Doe",
    location: "Warehouse A",
    damageType: "Handling",

    id: "DAMAGE001",

    status: "active",

    isDeleted: false,
  },
  {
    itemId: "ITEM002",
    quantityDamaged: 1,
    damageDate: "2025-07-17",
    reportedBy: "Jane Smith",
    location: "Warehouse B",
    damageType: "Transit",
    id: "DAMAGE002",
    status: "active",
    isDeleted: false,
  },
  {
    itemId: "ITEM003",
    quantityDamaged: 2,
    damageDate: "2025-07-15",
    reportedBy: "Ali Khan",
    location: "Warehouse A",
    damageType: "Expired",
    id: "DAMAGE003",
    status: "inactive",
    isDeleted: true,
  },
  {
    itemId: "ITEM004",
    quantityDamaged: 5,
    damageDate: "2025-07-14",
    reportedBy: "Fatema Begum",
    location: "Warehouse C",
    damageType: "Other",
    id: "DAMAGE004",
    status: "active",
    isDeleted: false,
  },
  {
    itemId: "ITEM005",
    quantityDamaged: 4,
    damageDate: "2025-07-13",
    reportedBy: "Sadia Islam",
    location: "Warehouse B",
    damageType: "Handling",
    id: "DAMAGE005",
    status: "inactive",
    isDeleted: true,
  },
  {
    itemId: "ITEM006",
    quantityDamaged: 2,
    damageDate: "2025-07-12",
    reportedBy: "Tariq Rahman",
    location: "Warehouse A",
    damageType: "Transit",
    id: "DAMAGE006",
    status: "active",
    isDeleted: false,
  },
  {
    itemId: "ITEM007",
    quantityDamaged: 1,
    damageDate: "2025-07-11",
    reportedBy: "Nusrat Jahan",
    location: "Warehouse D",
    damageType: "Expired",
    id: "DAMAGE007",
    status: "draft",
    isDeleted: false,
  },
  {
    itemId: "ITEM008",
    quantityDamaged: 7,
    damageDate: "2025-07-10",
    reportedBy: "Habib Hasan",
    location: "Warehouse C",
    damageType: "Other",
    id: "DAMAGE008",
    status: "active",
    isDeleted: false,
  },
];

export default function DamageItemsGrid({
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
    title: "Import Damage Items",
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
      itemId: `ITEM-${gridData.length + index + 1}`,
      quantityDamaged: gridData.length + index + 1,
      damageDate: `2025-06-15`,
      reportedBy: `Supplier Name#${gridData.length + index + 1}`,
      location: `Payment Type#${gridData.length + index + 1}`,
      damageType: `Handling`,
      isActive: true,
      isDeleted: false,
      status:
        Math.random() > 0.3
          ? "active"
          : Math.random() > 0.5
          ? "inactive"
          : "draft",
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
      item.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quantityDamaged.toString().includes(searchQuery.toLowerCase()) ||
      item.damageDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.damageType.toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import Damage Items",
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
                  <Tooltip label={item.itemId} position="top" withArrow>
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                      onClick={() => navigate(`/damage-items/1`)}
                    >
                      {item.itemId}
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
                              ? "Damage Item activated successfully"
                              : "Damage Item inactivated successfully"
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
                              ? "Damage Item restored successfully"
                              : "Damage Item deleted successfully"
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
                        onClick={() => navigate(`/damage-items/edit/1`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Image */}
                  <div className="flex justify-end">
                    <div className="text-left">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        Quantity Damaged
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {item.quantityDamaged}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 2 columns: country | Currency */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div className="text-left">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Damage Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.damageDate}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Reported By
                    </div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2 dark:text-gray-100 truncate">
                      {item.reportedBy}
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
                <span className="text-sm">Loading more damage items...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more damage items to load
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
            <h3 className="text-lg font-semibold pl-4">Import Damage Items</h3>
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
