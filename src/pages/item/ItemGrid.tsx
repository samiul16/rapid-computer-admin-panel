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

// Define Item interface to ensure type consistency
interface Item {
  id: string;
  itemCode: string;
  name: string;
  arabicName: string;
  costPrice: number;
  regularPrice: number;
  offerPrice: number;
  startDate: Date | null;
  endDate: Date | null;
  openingStock: number;
  category: string;
  subCategory: string;
  unit: string;
  itemImage: string;
  description: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data - replace with real data from your API
const items: Item[] = [
  {
    id: "1",
    itemCode: "ITM001",
    name: "Grilled Chicken Breast",
    arabicName: "صدر دجاج مشوي",
    costPrice: 8.5,
    regularPrice: 15.0,
    offerPrice: 12.0,
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-12-31"),
    openingStock: 50,
    category: "Main Course",
    subCategory: "Chicken",
    unit: "Piece",
    itemImage: "",
    description: "Fresh grilled chicken breast with herbs and spices",
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
    itemCode: "ITM002",
    name: "Caesar Salad",
    arabicName: "سلطة قيصر",
    costPrice: 4.0,
    regularPrice: 9.5,
    offerPrice: 7.5,
    startDate: new Date("2024-01-16"),
    endDate: new Date("2024-12-31"),
    openingStock: 30,
    category: "Appetizer",
    subCategory: "Salad",
    unit: "Bowl",
    itemImage: "",
    description: "Fresh romaine lettuce with Caesar dressing and croutons",
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
    itemCode: "ITM003",
    name: "Beef Burger",
    arabicName: "برجر لحم بقري",
    costPrice: 6.0,
    regularPrice: 13.0,
    offerPrice: 10.0,
    startDate: new Date("2024-01-17"),
    endDate: new Date("2024-12-31"),
    openingStock: 40,
    category: "Fast Food",
    subCategory: "Burger",
    unit: "Piece",
    itemImage: "",
    description: "Juicy beef burger with fresh vegetables and cheese",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2024-01-17"),
    draftedAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    itemCode: "ITM004",
    name: "Margherita Pizza",
    arabicName: "بيتزا مارجريتا",
    costPrice: 7.5,
    regularPrice: 16.0,
    offerPrice: 13.0,
    startDate: new Date("2024-01-18"),
    endDate: new Date("2024-12-31"),
    openingStock: 25,
    category: "Main Course",
    subCategory: "Pizza",
    unit: "Piece",
    itemImage: "",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
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
    itemCode: "ITM005",
    name: "Chocolate Cake",
    arabicName: "كيك شوكولاتة",
    costPrice: 3.5,
    regularPrice: 8.0,
    offerPrice: 6.5,
    startDate: new Date("2024-01-19"),
    endDate: new Date("2024-12-31"),
    openingStock: 20,
    category: "Dessert",
    subCategory: "Cake",
    unit: "Slice",
    itemImage: "",
    description: "Rich chocolate cake with chocolate ganache",
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
    itemCode: "ITM006",
    name: "French Fries",
    arabicName: "بطاطس مقلية",
    costPrice: 2.0,
    regularPrice: 5.5,
    offerPrice: 4.0,
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-12-31"),
    openingStock: 60,
    category: "Side Dish",
    subCategory: "Fries",
    unit: "Portion",
    itemImage: "",
    description: "Crispy golden French fries with sea salt",
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
    itemCode: "ITM007",
    name: "Coca Cola",
    arabicName: "كوكا كولا",
    costPrice: 1.2,
    regularPrice: 3.0,
    offerPrice: 2.5,
    startDate: new Date("2024-01-21"),
    endDate: new Date("2024-12-31"),
    openingStock: 100,
    category: "Beverage",
    subCategory: "Soft Drink",
    unit: "Can",
    itemImage: "",
    description: "Refreshing Coca Cola soft drink",
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
    itemCode: "ITM008",
    name: "Grilled Salmon",
    arabicName: "سلمون مشوي",
    costPrice: 12.0,
    regularPrice: 22.0,
    offerPrice: 18.0,
    startDate: new Date("2024-01-22"),
    endDate: new Date("2024-12-31"),
    openingStock: 15,
    category: "Main Course",
    subCategory: "Seafood",
    unit: "Piece",
    itemImage: "",
    description: "Fresh grilled salmon with lemon butter sauce",
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
    itemCode: "ITM009",
    name: "Vegetable Soup",
    arabicName: "شوربة خضار",
    costPrice: 2.5,
    regularPrice: 6.5,
    offerPrice: 5.0,
    startDate: new Date("2024-01-23"),
    endDate: new Date("2024-12-31"),
    openingStock: 35,
    category: "Appetizer",
    subCategory: "Soup",
    unit: "Bowl",
    itemImage: "",
    description: "Hearty vegetable soup with fresh seasonal vegetables",
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
    itemCode: "ITM010",
    name: "Tiramisu",
    arabicName: "تيراميسو",
    costPrice: 4.5,
    regularPrice: 9.5,
    offerPrice: 7.5,
    startDate: new Date("2024-01-24"),
    endDate: new Date("2024-12-31"),
    openingStock: 18,
    category: "Dessert",
    subCategory: "Italian",
    unit: "Piece",
    itemImage: "",
    description: "Classic Italian dessert with coffee and mascarpone",
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
    itemCode: "ITM011",
    name: "Chicken Wings",
    arabicName: "أجنحة دجاج",
    costPrice: 5.0,
    regularPrice: 11.0,
    offerPrice: 9.0,
    startDate: new Date("2024-01-25"),
    endDate: new Date("2024-12-31"),
    openingStock: 45,
    category: "Appetizer",
    subCategory: "Chicken",
    unit: "Portion",
    itemImage: "",
    description: "Crispy chicken wings with buffalo sauce",
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
    itemCode: "ITM012",
    name: "Pasta Carbonara",
    arabicName: "باستا كاربونارا",
    costPrice: 6.5,
    regularPrice: 14.0,
    offerPrice: 11.5,
    startDate: new Date("2024-01-26"),
    endDate: new Date("2024-12-31"),
    openingStock: 30,
    category: "Main Course",
    subCategory: "Pasta",
    unit: "Plate",
    itemImage: "",
    description: "Creamy pasta with bacon, eggs, and parmesan cheese",
    isDefault: false,
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
    itemCode: "ITM013",
    name: "Ice Cream Sundae",
    arabicName: "آيس كريم سندي",
    costPrice: 2.8,
    regularPrice: 6.0,
    offerPrice: 4.8,
    startDate: new Date("2024-01-27"),
    endDate: new Date("2024-12-31"),
    openingStock: 25,
    category: "Dessert",
    subCategory: "Ice Cream",
    unit: "Sundae",
    itemImage: "",
    description: "Vanilla ice cream with chocolate sauce and nuts",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-27"),
    draftedAt: null,
    updatedAt: new Date("2024-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "14",
    itemCode: "ITM014",
    name: "Onion Rings",
    arabicName: "حلقات بصل",
    costPrice: 2.2,
    regularPrice: 5.0,
    offerPrice: 3.8,
    startDate: new Date("2024-01-28"),
    endDate: new Date("2024-12-31"),
    openingStock: 40,
    category: "Side Dish",
    subCategory: "Appetizer",
    unit: "Portion",
    itemImage: "",
    description: "Crispy battered onion rings with dipping sauce",
    isDefault: false,
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
    itemCode: "ITM015",
    name: "Orange Juice",
    arabicName: "عصير برتقال",
    costPrice: 1.8,
    regularPrice: 4.5,
    offerPrice: 3.5,
    startDate: new Date("2024-01-29"),
    endDate: new Date("2024-12-31"),
    openingStock: 50,
    category: "Beverage",
    subCategory: "Juice",
    unit: "Glass",
    itemImage: "",
    description: "Fresh squeezed orange juice",
    isDefault: false,
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
    itemCode: "ITM016",
    name: "Beef Steak",
    arabicName: "ستيك لحم بقري",
    costPrice: 15.0,
    regularPrice: 28.0,
    offerPrice: 24.0,
    startDate: new Date("2024-01-30"),
    endDate: new Date("2024-12-31"),
    openingStock: 12,
    category: "Main Course",
    subCategory: "Beef",
    unit: "Piece",
    itemImage: "",
    description: "Premium beef steak cooked to perfection",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-30"),
    draftedAt: null,
    updatedAt: new Date("2024-02-04"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function ItemsGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Items grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsData, setItemsData] = useState(items);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Item",
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

    const categories = [
      "Main Course",
      "Appetizer",
      "Dessert",
      "Beverage",
      "Side Dish",
      "Fast Food",
    ];
    const subCategories = [
      "Chicken",
      "Beef",
      "Seafood",
      "Pizza",
      "Pasta",
      "Salad",
      "Soup",
      "Burger",
      "Cake",
      "Ice Cream",
      "Soft Drink",
      "Juice",
      "Fries",
      "Italian",
    ];
    const units = [
      "Piece",
      "Bowl",
      "Portion",
      "Slice",
      "Can",
      "Glass",
      "Plate",
      "Sundae",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomSubCategory =
        subCategories[Math.floor(Math.random() * subCategories.length)];
      const randomUnit = units[Math.floor(Math.random() * units.length)];

      return {
        id: `${Date.now()}-${index}`,
        itemCode: `ITM${(itemsData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        name: `Item ${itemsData.length + index + 1}`,
        arabicName: `عنصر ${itemsData.length + index + 1}`,
        costPrice: Math.round((Math.random() * 15 + 2) * 100) / 100,
        regularPrice: Math.round((Math.random() * 25 + 8) * 100) / 100,
        offerPrice: Math.round((Math.random() * 20 + 5) * 100) / 100,
        startDate: new Date(),
        endDate: new Date("2024-12-31"),
        openingStock: Math.floor(Math.random() * 50) + 10,
        category: randomCategory,
        subCategory: randomSubCategory,
        unit: randomUnit,
        itemImage: "",
        description: `Description for item ${itemsData.length + index + 1}`,
        isDefault: Math.random() > 0.8,
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
    if (itemsData.length >= 46) {
      setHasMore(false);
    } else {
      setItemsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [itemsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (itemId: string) => {
    setItemsData((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isDeleted: !item.isDeleted,
              deletedAt: !item.isDeleted ? new Date() : null,
            }
          : item
      )
    );
  };

  const handleRestoreClick = (itemId: string) => {
    setItemsData((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isDeleted: false,
              deletedAt: null,
            }
          : item
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (itemId: string) => {
    setItemsData((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isActive: !item.isActive,
              updatedAt: new Date(),
            }
          : item
      )
    );
  };

  // Filter items based on search query
  const filteredItems = itemsData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.arabicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import Item",
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
                  placeholder="Search items..."
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
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 3 Column Grid Layout */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={item.name} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/items/${item.id}`)}
                      >
                        {item.name}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Center - Action Icons */}
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        item.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          item.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(item.id);
                          toastSuccess(
                            item.isActive
                              ? "Item deactivated successfully"
                              : "Item activated successfully"
                          );
                        }}
                      >
                        {item.isActive ? (
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
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
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
                              ? "Item restored successfully"
                              : "Item deleted successfully"
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
                        className="cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center"
                        onClick={() => navigate(`/items/${item.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Photo */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                      {item.itemImage ? (
                        <img
                          src={item.itemImage}
                          alt={`${item.name} photo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              // Create initials display
                              const words = item.name.split(" ");
                              const initials = words
                                .slice(0, 2)
                                .map((word) => word.charAt(0).toUpperCase())
                                .join("");
                              const colors = [
                                "bg-red-500",
                                "bg-blue-500",
                                "bg-green-500",
                                "bg-yellow-500",
                                "bg-purple-500",
                                "bg-pink-500",
                              ];
                              const colorIndex =
                                item.itemCode.charCodeAt(
                                  item.itemCode.length - 1
                                ) % colors.length;
                              parent.className = `w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${colors[colorIndex]}`;
                              parent.textContent = initials;
                            }
                          }}
                        />
                      ) : (
                        (() => {
                          // Generate initials from first 2 words
                          const words = item.name.split(" ");
                          const initials = words
                            .slice(0, 2)
                            .map((word) => word.charAt(0).toUpperCase())
                            .join("");
                          const colors = [
                            "bg-red-500",
                            "bg-blue-500",
                            "bg-green-500",
                            "bg-yellow-500",
                            "bg-purple-500",
                            "bg-pink-500",
                          ];
                          const colorIndex =
                            item.itemCode.charCodeAt(item.itemCode.length - 1) %
                            colors.length;
                          return (
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${colors[colorIndex]}`}
                            >
                              {initials}
                            </div>
                          );
                        })()
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Code | Price | Category */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.itemCode}
                    </div>
                  </div>

                  {/* Price - Center aligned */}
                  <div className="flex justify-center items-center gap-1">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Price
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ${item.regularPrice}
                      </div>
                    </div>
                  </div>

                  {/* Category - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Category
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.category}
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
                <span className="text-sm">Loading more items...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredItems.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more items to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={items}
                setFilteredData={setItemsData}
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
                data={items}
                setFilteredData={setItemsData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Item</h3>
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
