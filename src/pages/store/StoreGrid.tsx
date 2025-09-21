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

// Define Store interface to ensure type consistency
interface Store {
  id: string;
  storeCode: string;
  name: string;
  arabicName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
  manager: string;
  capacity: number;
  storeType: string;
  storeImage: string;
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
const stores: Store[] = [
  {
    id: "1",
    storeCode: "STR001",
    name: "Downtown Restaurant",
    arabicName: "مطعم وسط المدينة",
    phone: "+1-555-0101",
    email: "downtown@restaurant.com",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    country: "USA",
    postCode: "10001",
    manager: "John Smith",
    capacity: 150,
    storeType: "Fine Dining",
    storeImage: "",
    description: "Premium downtown restaurant with elegant atmosphere",
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
    storeCode: "STR002",
    name: "Riverside Cafe",
    arabicName: "مقهى النهر",
    phone: "+1-555-0102",
    email: "riverside@cafe.com",
    address: "456 River Road",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    postCode: "90210",
    manager: "Sarah Johnson",
    capacity: 80,
    storeType: "Casual Dining",
    storeImage: "",
    description: "Cozy riverside cafe with outdoor seating",
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
    storeCode: "STR003",
    name: "Mall Food Court",
    arabicName: "محكمة الطعام في المول",
    phone: "+1-555-0103",
    email: "mall@foodcourt.com",
    address: "789 Shopping Center",
    city: "Chicago",
    state: "IL",
    country: "USA",
    postCode: "60601",
    manager: "Mike Davis",
    capacity: 200,
    storeType: "Fast Food",
    storeImage: "",
    description: "Busy food court location in shopping mall",
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
    storeCode: "STR004",
    name: "Beachside Grill",
    arabicName: "شواء الشاطئ",
    phone: "+1-555-0104",
    email: "beachside@grill.com",
    address: "321 Ocean Drive",
    city: "Miami",
    state: "FL",
    country: "USA",
    postCode: "33139",
    manager: "Lisa Wilson",
    capacity: 120,
    storeType: "Seafood",
    storeImage: "",
    description: "Fresh seafood restaurant with ocean views",
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
    storeCode: "STR005",
    name: "Mountain Lodge",
    arabicName: "نزل الجبل",
    phone: "+1-555-0105",
    email: "mountain@lodge.com",
    address: "654 Peak Road",
    city: "Denver",
    state: "CO",
    country: "USA",
    postCode: "80202",
    manager: "Tom Brown",
    capacity: 60,
    storeType: "Lodge Dining",
    storeImage: "",
    description: "Rustic mountain lodge with local cuisine",
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
    storeCode: "STR006",
    name: "Urban Bistro",
    arabicName: "مطعم حضرية",
    phone: "+1-555-0106",
    email: "urban@bistro.com",
    address: "987 City Avenue",
    city: "Seattle",
    state: "WA",
    country: "USA",
    postCode: "98101",
    manager: "Emma Taylor",
    capacity: 90,
    storeType: "Bistro",
    storeImage: "",
    description: "Modern urban bistro with farm-to-table menu",
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
    storeCode: "STR007",
    name: "Desert Oasis",
    arabicName: "واحة الصحراء",
    phone: "+1-555-0107",
    email: "desert@oasis.com",
    address: "147 Desert Trail",
    city: "Phoenix",
    state: "AZ",
    country: "USA",
    postCode: "85001",
    manager: "Carlos Rodriguez",
    capacity: 100,
    storeType: "Mexican",
    storeImage: "",
    description: "Authentic Mexican cuisine in desert setting",
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
    storeCode: "STR008",
    name: "Harbor View",
    arabicName: "منظر الميناء",
    phone: "+1-555-0108",
    email: "harbor@view.com",
    address: "258 Harbor Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    postCode: "94105",
    manager: "Anna Chen",
    capacity: 110,
    storeType: "Asian Fusion",
    storeImage: "",
    description: "Asian fusion restaurant with harbor views",
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
    storeCode: "STR009",
    name: "Garden Terrace",
    arabicName: "شرفة الحديقة",
    phone: "+1-555-0109",
    email: "garden@terrace.com",
    address: "369 Garden Lane",
    city: "Portland",
    state: "OR",
    country: "USA",
    postCode: "97201",
    manager: "David Green",
    capacity: 75,
    storeType: "Vegetarian",
    storeImage: "",
    description: "Organic vegetarian restaurant with garden seating",
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
    storeCode: "STR010",
    name: "Skyline Lounge",
    arabicName: "صالة الأفق",
    phone: "+1-555-0110",
    email: "skyline@lounge.com",
    address: "741 Tower Heights",
    city: "Las Vegas",
    state: "NV",
    country: "USA",
    postCode: "89101",
    manager: "Rachel White",
    capacity: 180,
    storeType: "Lounge",
    storeImage: "",
    description: "Upscale lounge with panoramic city views",
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
    storeCode: "STR011",
    name: "Rustic Farmhouse",
    arabicName: "منزل المزرعة الريفي",
    phone: "+1-555-0111",
    email: "rustic@farmhouse.com",
    address: "852 Farm Road",
    city: "Austin",
    state: "TX",
    country: "USA",
    postCode: "73301",
    manager: "James Miller",
    capacity: 85,
    storeType: "Farm-to-Table",
    storeImage: "",
    description: "Farm-to-table dining in rustic setting",
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
    storeCode: "STR012",
    name: "Coastal Kitchen",
    arabicName: "مطبخ الساحل",
    phone: "+1-555-0112",
    email: "coastal@kitchen.com",
    address: "963 Beach Boulevard",
    city: "San Diego",
    state: "CA",
    country: "USA",
    postCode: "92101",
    manager: "Maria Garcia",
    capacity: 95,
    storeType: "Coastal Cuisine",
    storeImage: "",
    description: "Fresh coastal cuisine with ocean breeze",
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
    storeCode: "STR013",
    name: "Downtown Deli",
    arabicName: "دلي وسط المدينة",
    phone: "+1-555-0113",
    email: "downtown@deli.com",
    address: "159 Business District",
    city: "Boston",
    state: "MA",
    country: "USA",
    postCode: "02101",
    manager: "Robert Lee",
    capacity: 50,
    storeType: "Deli",
    storeImage: "",
    description: "Traditional deli with fresh sandwiches",
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
    storeCode: "STR014",
    name: "Vintage Diner",
    arabicName: "مطعم قديم",
    phone: "+1-555-0114",
    email: "vintage@diner.com",
    address: "357 Retro Street",
    city: "Nashville",
    state: "TN",
    country: "USA",
    postCode: "37201",
    manager: "Betty Anderson",
    capacity: 70,
    storeType: "Diner",
    storeImage: "",
    description: "Classic 50s diner with comfort food",
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
    storeCode: "STR015",
    name: "Alpine Lodge",
    arabicName: "نزل جبلي",
    phone: "+1-555-0115",
    email: "alpine@lodge.com",
    address: "468 Mountain Pass",
    city: "Salt Lake City",
    state: "UT",
    country: "USA",
    postCode: "84101",
    manager: "Peter Thompson",
    capacity: 65,
    storeType: "Alpine Cuisine",
    storeImage: "",
    description: "Mountain lodge with hearty alpine dishes",
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
    storeCode: "STR016",
    name: "Metropolitan Grill",
    arabicName: "شواء متروبوليتان",
    phone: "+1-555-0116",
    email: "metro@grill.com",
    address: "753 Urban Plaza",
    city: "Philadelphia",
    state: "PA",
    country: "USA",
    postCode: "19101",
    manager: "Susan Clark",
    capacity: 140,
    storeType: "Steakhouse",
    storeImage: "",
    description: "Premium steakhouse in metropolitan setting",
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

export default function StoresGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Stores grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [storesData, setStoresData] = useState(stores);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Store",
    message: <ImportStepperTemp />,
  });

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const STORES_PER_PAGE = 4;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const storeTypes = [
      "Fine Dining",
      "Casual Dining",
      "Fast Food",
      "Seafood",
      "Lodge Dining",
      "Bistro",
      "Mexican",
      "Asian Fusion",
      "Vegetarian",
      "Lounge",
      "Farm-to-Table",
      "Coastal Cuisine",
      "Deli",
      "Diner",
      "Alpine Cuisine",
      "Steakhouse",
    ];
    const cities = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Miami",
      "Denver",
      "Seattle",
      "Phoenix",
      "San Francisco",
      "Portland",
      "Las Vegas",
      "Austin",
      "San Diego",
      "Boston",
      "Nashville",
      "Salt Lake City",
      "Philadelphia",
    ];
    const states = [
      "NY",
      "CA",
      "IL",
      "FL",
      "CO",
      "WA",
      "AZ",
      "CA",
      "OR",
      "NV",
      "TX",
      "CA",
      "MA",
      "TN",
      "UT",
      "PA",
    ];

    const newStores = Array.from({ length: STORES_PER_PAGE }, (_, index) => {
      const randomStoreType =
        storeTypes[Math.floor(Math.random() * storeTypes.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomState = states[Math.floor(Math.random() * states.length)];

      return {
        id: `${Date.now()}-${index}`,
        storeCode: `STR${(storesData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        name: `Store ${storesData.length + index + 1}`,
        arabicName: `متجر ${storesData.length + index + 1}`,
        phone: `+1-555-${1000 + Math.floor(Math.random() * 9000)}`,
        email: `store${storesData.length + index + 1}@example.com`,
        address: `${Math.floor(Math.random() * 999) + 1} ${randomCity} Street`,
        city: randomCity,
        state: randomState,
        country: "USA",
        postCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        manager: `Manager ${storesData.length + index + 1}`,
        capacity: Math.floor(Math.random() * 150) + 50,
        storeType: randomStoreType,
        storeImage: "",
        description: `Description for store ${storesData.length + index + 1}`,
        isDefault: Math.random() > 0.9,
        isActive: Math.random() > 0.3,
        isDraft: Math.random() > 0.7,
        createdAt: new Date(),
        draftedAt: Math.random() > 0.7 ? new Date() : null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      };
    });

    // Stop loading more after reaching 50 stores for demo
    if (storesData.length >= 46) {
      setHasMore(false);
    } else {
      setStoresData((prev) => [...prev, ...newStores]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [storesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (storeId: string) => {
    setStoresData((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId
          ? {
              ...store,
              isDeleted: !store.isDeleted,
              deletedAt: !store.isDeleted ? new Date() : null,
            }
          : store
      )
    );
  };

  const handleRestoreClick = (storeId: string) => {
    setStoresData((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId
          ? {
              ...store,
              isDeleted: false,
              deletedAt: null,
            }
          : store
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (storeId: string) => {
    setStoresData((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId
          ? {
              ...store,
              isActive: !store.isActive,
              updatedAt: new Date(),
            }
          : store
      )
    );
  };

  // Filter stores based on search query
  const filteredStores = storesData.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.storeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.arabicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.storeType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import Store",
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
                  placeholder="Search stores..."
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
            {filteredStores.map((store) => (
              <Card
                key={store.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 3 Column Grid Layout */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={store.name} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/store/${store.id}`)}
                      >
                        {store.name}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Center - Action Icons */}
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        store.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          store.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(store.id);
                          toastSuccess(
                            store.isActive
                              ? "Store deactivated successfully"
                              : "Store activated successfully"
                          );
                        }}
                      >
                        {store.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={store.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          store.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (store.isDeleted) {
                            handleRestoreClick(store.id);
                          } else {
                            handleDeleteClick(store.id);
                          }
                          toastSuccess(
                            store.isDeleted
                              ? "Store restored successfully"
                              : "Store deleted successfully"
                          );
                        }}
                      >
                        {store.isDeleted ? (
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
                        onClick={() => navigate(`/store/${store.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Photo */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                      {store.storeImage ? (
                        <img
                          src={store.storeImage}
                          alt={`${store.name} photo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              // Create initials display
                              const words = store.name.split(" ");
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
                                store.storeCode.charCodeAt(
                                  store.storeCode.length - 1
                                ) % colors.length;
                              parent.className = `w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${colors[colorIndex]}`;
                              parent.textContent = initials;
                            }
                          }}
                        />
                      ) : (
                        (() => {
                          // Generate initials from first 2 words
                          const words = store.name.split(" ");
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
                            store.storeCode.charCodeAt(
                              store.storeCode.length - 1
                            ) % colors.length;
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

                {/* Bottom Row - Grid with 3 columns: Code | Type | City */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {store.storeCode}
                    </div>
                  </div>

                  {/* Type - Center aligned */}
                  <div className="flex justify-center items-center gap-1">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Type
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {store.storeType}
                      </div>
                    </div>
                  </div>

                  {/* City - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      City
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {store.city}
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
                <span className="text-sm">Loading more stores...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredStores.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more stores to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={stores}
                setFilteredData={setStoresData}
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
                data={stores}
                setFilteredData={setStoresData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Store</h3>
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
