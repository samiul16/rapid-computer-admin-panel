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

// Define ExpiryItem interface
interface ExpiryItem {
  id: string;
  itemName: string;
  batchNumber: string;
  expiryDate: Date;
  quantity: number;
  unit: string;
  location: string;
  category: string;
  supplier: string;
  daysUntilExpiry: number;
  status: "Expired" | "Near Expiry" | "Warning" | "Good";
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data for expiry items
const expiryItems: ExpiryItem[] = [
  {
    id: "1",
    itemName: "Fresh Milk 1L",
    batchNumber: "MLK001",
    expiryDate: new Date("2024-02-15"),
    quantity: 24,
    unit: "bottles",
    location: "Main Branch - Dairy Section",
    category: "Dairy Products",
    supplier: "Fresh Dairy Co.",
    daysUntilExpiry: 5,
    status: "Warning",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    itemName: "Organic Yogurt 500ml",
    batchNumber: "YGT002",
    expiryDate: new Date("2024-02-12"),
    quantity: 18,
    unit: "cups",
    location: "North Branch - Refrigerated",
    category: "Dairy Products",
    supplier: "Organic Foods Ltd.",
    daysUntilExpiry: 2,
    status: "Near Expiry",
    isActive: true,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    itemName: "Whole Wheat Bread",
    batchNumber: "BRD003",
    expiryDate: new Date("2024-02-08"),
    quantity: 12,
    unit: "loaves",
    location: "South Branch - Bakery",
    category: "Bakery Items",
    supplier: "Golden Bakery",
    daysUntilExpiry: -2,
    status: "Expired",
    isActive: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    itemName: "Fresh Chicken Breast",
    batchNumber: "CHK004",
    expiryDate: new Date("2024-02-14"),
    quantity: 8,
    unit: "kg",
    location: "East Branch - Meat Section",
    category: "Meat & Poultry",
    supplier: "Premium Meats",
    daysUntilExpiry: 4,
    status: "Warning",
    isActive: true,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    itemName: "Canned Tomatoes 400g",
    batchNumber: "TOM005",
    expiryDate: new Date("2024-08-15"),
    quantity: 48,
    unit: "cans",
    location: "West Branch - Canned Goods",
    category: "Canned Foods",
    supplier: "Garden Fresh Foods",
    daysUntilExpiry: 186,
    status: "Good",
    isActive: true,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    itemName: "Fresh Salmon Fillet",
    batchNumber: "SAL006",
    expiryDate: new Date("2024-02-11"),
    quantity: 6,
    unit: "kg",
    location: "Central Branch - Seafood",
    category: "Seafood",
    supplier: "Ocean Fresh",
    daysUntilExpiry: 1,
    status: "Near Expiry",
    isActive: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    itemName: "Organic Spinach 250g",
    batchNumber: "SPN007",
    expiryDate: new Date("2024-02-13"),
    quantity: 15,
    unit: "bags",
    location: "Downtown Branch - Vegetables",
    category: "Fresh Vegetables",
    supplier: "Green Fields Farm",
    daysUntilExpiry: 3,
    status: "Warning",
    isActive: true,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    itemName: "Pasta Sauce 350ml",
    batchNumber: "PST008",
    expiryDate: new Date("2024-06-20"),
    quantity: 32,
    unit: "jars",
    location: "Suburban Branch - Condiments",
    category: "Sauces & Condiments",
    supplier: "Italian Delights",
    daysUntilExpiry: 130,
    status: "Good",
    isActive: true,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    itemName: "Fresh Strawberries 500g",
    batchNumber: "STR009",
    expiryDate: new Date("2024-02-11"),
    quantity: 20,
    unit: "punnets",
    location: "Uptown Branch - Fruits",
    category: "Fresh Fruits",
    supplier: "Berry Farm Co.",
    daysUntilExpiry: 1,
    status: "Near Expiry",
    isActive: true,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    itemName: "Greek Feta Cheese 200g",
    batchNumber: "FTA010",
    expiryDate: new Date("2024-03-05"),
    quantity: 16,
    unit: "blocks",
    location: "Riverside Branch - Cheese",
    category: "Dairy Products",
    supplier: "Mediterranean Foods",
    daysUntilExpiry: 25,
    status: "Good",
    isActive: true,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    itemName: "Frozen Pizza Base",
    batchNumber: "PZB011",
    expiryDate: new Date("2024-04-15"),
    quantity: 25,
    unit: "pieces",
    location: "Hillside Branch - Frozen",
    category: "Frozen Foods",
    supplier: "Quick Meals Inc.",
    daysUntilExpiry: 65,
    status: "Good",
    isActive: true,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    itemName: "Fresh Lettuce Head",
    batchNumber: "LET012",
    expiryDate: new Date("2024-02-09"),
    quantity: 30,
    unit: "heads",
    location: "Lakeside Branch - Vegetables",
    category: "Fresh Vegetables",
    supplier: "Crisp Greens Farm",
    daysUntilExpiry: -1,
    status: "Expired",
    isActive: false,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "13",
    itemName: "Honey 500ml",
    batchNumber: "HNY013",
    expiryDate: new Date("2025-01-15"),
    quantity: 12,
    unit: "jars",
    location: "Garden Branch - Natural Products",
    category: "Natural Sweeteners",
    supplier: "Pure Honey Co.",
    daysUntilExpiry: 340,
    status: "Good",
    isActive: true,
    createdAt: new Date("2024-01-27"),
    updatedAt: new Date("2024-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "14",
    itemName: "Fresh Mozzarella 250g",
    batchNumber: "MOZ014",
    expiryDate: new Date("2024-02-16"),
    quantity: 14,
    unit: "balls",
    location: "Plaza Branch - Dairy",
    category: "Dairy Products",
    supplier: "Artisan Cheese",
    daysUntilExpiry: 6,
    status: "Warning",
    isActive: true,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-02-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "15",
    itemName: "Smoked Turkey Slices",
    batchNumber: "TUR015",
    expiryDate: new Date("2024-02-12"),
    quantity: 10,
    unit: "packages",
    location: "Metro Branch - Deli",
    category: "Deli Meats",
    supplier: "Gourmet Deli",
    daysUntilExpiry: 2,
    status: "Near Expiry",
    isActive: true,
    createdAt: new Date("2024-01-29"),
    updatedAt: new Date("2024-02-03"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "16",
    itemName: "Artisan Sourdough",
    batchNumber: "SRD016",
    expiryDate: new Date("2024-02-14"),
    quantity: 8,
    unit: "loaves",
    location: "Business District - Bakery",
    category: "Bakery Items",
    supplier: "Artisan Bakehouse",
    daysUntilExpiry: 4,
    status: "Warning",
    isActive: true,
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date("2024-02-04"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function ExpiryItemsGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Expiry items grid rendered with", expiryItems.length, "items");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [stockData, setStockData] = useState(expiryItems);
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

    const locations = [
      "Main Branch - Dairy Section",
      "North Branch - Refrigerated",
      "South Branch - Bakery",
      "East Branch - Meat Section",
      "West Branch - Canned Goods",
      "Central Branch - Seafood",
      "Downtown Branch - Vegetables",
      "Suburban Branch - Condiments",
    ];

    const categories = [
      "Dairy Products",
      "Fresh Vegetables",
      "Bakery Items",
      "Meat & Poultry",
      "Canned Foods",
      "Seafood",
      "Fresh Fruits",
      "Frozen Foods",
    ];

    const suppliers = [
      "Fresh Dairy Co.",
      "Organic Foods Ltd.",
      "Golden Bakery",
      "Premium Meats",
      "Garden Fresh Foods",
      "Ocean Fresh",
      "Green Fields Farm",
    ];

    const itemNames = [
      "Premium Beef Steak",
      "Organic Baby Carrots",
      "Artisan Cheese Wheel",
      "Fresh Atlantic Cod",
      "Whole Grain Cereal",
      "Free Range Eggs",
      "Seasonal Berry Mix",
      "Gluten-Free Pasta",
    ];

    const units = [
      "kg",
      "pieces",
      "bottles",
      "cans",
      "bags",
      "jars",
      "boxes",
      "packets",
    ];
    const statuses: Array<"Expired" | "Near Expiry" | "Warning" | "Good"> = [
      "Expired",
      "Near Expiry",
      "Warning",
      "Good",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomLocation =
        locations[Math.floor(Math.random() * locations.length)];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomSupplier =
        suppliers[Math.floor(Math.random() * suppliers.length)];
      const randomItemName =
        itemNames[Math.floor(Math.random() * itemNames.length)];
      const randomUnit = units[Math.floor(Math.random() * units.length)];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      // Calculate expiry date and days until expiry based on status
      let daysUntilExpiry: number;
      let expiryDate: Date;

      switch (randomStatus) {
        case "Expired":
          daysUntilExpiry = Math.floor(Math.random() * -10) - 1; // -1 to -10 days
          expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);
          break;
        case "Near Expiry":
          daysUntilExpiry = Math.floor(Math.random() * 3) + 1; // 1-3 days
          expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);
          break;
        case "Warning":
          daysUntilExpiry = Math.floor(Math.random() * 7) + 4; // 4-10 days
          expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);
          break;
        default: // 'Good'
          daysUntilExpiry = Math.floor(Math.random() * 300) + 30; // 30-330 days
          expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);
          break;
      }

      return {
        id: `${Date.now()}-${index}`,
        itemName: randomItemName,
        batchNumber: `BTH${(stockData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        expiryDate: expiryDate,
        quantity: Math.floor(Math.random() * 50) + 1,
        unit: randomUnit,
        location: randomLocation,
        category: randomCategory,
        supplier: randomSupplier,
        daysUntilExpiry: daysUntilExpiry,
        status: randomStatus,
        isActive: randomStatus !== "Expired",
        createdAt: new Date(),
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
      stock.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.quantity.toString().includes(searchQuery.toLowerCase())
  );

  // Format quantity with unit
  const formatQuantity = (quantity: number, unit: string) => {
    return `${quantity} ${unit}`;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Near Expiry":
        return "bg-orange-100 text-orange-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Good":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                  title: "Import Expiry Items",
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
                  placeholder="Search expiry items..."
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
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={stock.location} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/expiry-items/${stock.id}`)}
                      >
                        {stock.location}
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
                              ? "Expiry item deactivated successfully"
                              : "Expiry item activated successfully"
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
                              ? "Expiry item restored successfully"
                              : "Expiry item deleted successfully"
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
                          navigate(`/expiry-items/edit/${stock.id}`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Status Badges - Center aligned */}
                  <div className="flex justify-center items-center gap-1 pt-3">
                    <span
                      className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${getStatusColor(
                        stock.status
                      )}`}
                    >
                      {stock.status}
                    </span>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Batch Number | Status Badges | Quantity */}
                <div className="grid grid-cols-2 items-start gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Batch Number - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Batch Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {stock.batchNumber}
                    </div>
                  </div>

                  {/* Quantity - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Quantity
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {formatQuantity(stock.quantity, stock.unit)}
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
                <span className="text-sm">Loading more expiry items...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredStock.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more expiry items to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={expiryItems}
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
                data={expiryItems}
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
            <h3 className="text-lg font-semibold pl-4">Import Expiry Items</h3>
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
