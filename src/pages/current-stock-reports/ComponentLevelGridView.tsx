import { Card, CardTitle } from "@/components/ui/card";
import { usePermission } from "@/hooks/usePermissions";
import { SearchFunction } from "@/lib/SearchFunction";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  searchableKeys,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";

// do not change
type GridDataType = ModuleFieldsType & {
  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const plansData: GridDataType[] = [
  {
    id: "1",
    code: "C-1001",
    itemName: "Item 1",
    category: "Category 1",
    brand: "Brand 1",
    unitPrice: "100",
    salesPrice: "200",
    openingStock: "10",
    currentStock: "5",
    value: "500",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-05"),
    draftedAt: null,
    updatedAt: new Date("2025-01-07"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    code: "C-1002",
    itemName: "Item 2",
    category: "Category 2",
    brand: "Brand 2",
    unitPrice: "150",
    salesPrice: "250",
    openingStock: "20",
    currentStock: "12",
    value: "3000",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-10"),
    draftedAt: null,
    updatedAt: new Date("2025-01-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    code: "C-1003",
    itemName: "Item 3",
    category: "Category 3",
    brand: "Brand 3",
    unitPrice: "200",
    salesPrice: "320",
    openingStock: "15",
    currentStock: "7",
    value: "2240",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-15"),
    draftedAt: null,
    updatedAt: new Date("2025-01-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    code: "C-1004",
    itemName: "Item 4",
    category: "Category 1",
    brand: "Brand 2",
    unitPrice: "250",
    salesPrice: "400",
    openingStock: "12",
    currentStock: "4",
    value: "1600",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-22"),
    deletedAt: new Date("2025-02-01"),
    isDeleted: true,
  },
  {
    id: "5",
    code: "C-1005",
    itemName: "Item 5",
    category: "Category 2",
    brand: "Brand 3",
    unitPrice: "180",
    salesPrice: "280",
    openingStock: "18",
    currentStock: "9",
    value: "2520",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-05"),
    draftedAt: null,
    updatedAt: new Date("2025-02-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    code: "C-1006",
    itemName: "Item 6",
    category: "Category 3",
    brand: "Brand 1",
    unitPrice: "300",
    salesPrice: "450",
    openingStock: "25",
    currentStock: "14",
    value: "6300",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-02-10"),
    draftedAt: new Date("2025-02-11"),
    updatedAt: new Date("2025-02-11"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    code: "C-1007",
    itemName: "Item 7",
    category: "Category 1",
    brand: "Brand 3",
    unitPrice: "220",
    salesPrice: "340",
    openingStock: "30",
    currentStock: "20",
    value: "6800",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-12"),
    draftedAt: null,
    updatedAt: new Date("2025-02-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    code: "C-1008",
    itemName: "Item 8",
    category: "Category 2",
    brand: "Brand 1",
    unitPrice: "400",
    salesPrice: "600",
    openingStock: "8",
    currentStock: "6",
    value: "3600",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-18"),
    draftedAt: null,
    updatedAt: new Date("2025-02-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    code: "C-1009",
    itemName: "Item 9",
    category: "Category 3",
    brand: "Brand 2",
    unitPrice: "120",
    salesPrice: "190",
    openingStock: "22",
    currentStock: "10",
    value: "1900",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-20"),
    draftedAt: null,
    updatedAt: new Date("2025-02-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    code: "C-1010",
    itemName: "Item 10",
    category: "Category 1",
    brand: "Brand 2",
    unitPrice: "500",
    salesPrice: "750",
    openingStock: "16",
    currentStock: "8",
    value: "6000",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-22"),
    draftedAt: null,
    updatedAt: new Date("2025-02-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    code: "C-1011",
    itemName: "Item 11",
    category: "Category 2",
    brand: "Brand 3",
    unitPrice: "280",
    salesPrice: "420",
    openingStock: "14",
    currentStock: "7",
    value: "2940",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-25"),
    draftedAt: null,
    updatedAt: new Date("2025-02-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    code: "C-1012",
    itemName: "Item 12",
    category: "Category 3",
    brand: "Brand 1",
    unitPrice: "350",
    salesPrice: "500",
    openingStock: "20",
    currentStock: "0",
    value: "0",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-02-28"),
    draftedAt: null,
    updatedAt: new Date("2025-03-01"),
    deletedAt: new Date("2025-03-05"),
    isDeleted: true,
  },
];


type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("grid rendered");

  const navigate = useNavigate();
  const location = useLocation();

  const detectedModule = getModuleFromPath(location.pathname);

  const [gridData, setGridData] = useState(plansData);
  const canDelete: boolean = usePermission(detectedModule, "delete");
  const canRestore: boolean = usePermission(detectedModule, "restore");
  const canEdit: boolean = usePermission(detectedModule, "edit");

  // Debug permissions
  console.log("Permissions:", {
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

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      ...plansData[index],
      id: `${Date.now()}-${index}`,
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
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...newItems] as GridDataType[]);
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

  // filter
  const filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  // get page name
  const PAGE_NAME = location.pathname.split("/")[1].replace("-", " ");

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
          Total {gridData.length} {PAGE_NAME}
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
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.code}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Item Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.itemName}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Opening Stock
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.openingStock}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Unit Price
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.unitPrice}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Value
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.value}
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
                <span className="text-sm">Loading more {PAGE_NAME}...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more {PAGE_NAME} to load
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
                title={location.pathname.split("/")[1].replace("-", " ")}
                fileName={location.pathname.split("/")[1]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
