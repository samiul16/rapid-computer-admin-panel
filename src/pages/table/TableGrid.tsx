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

// Define Table interface to ensure type consistency
interface Table {
  id: string;
  code: string;
  name: string;
  person: string;
  location: string;
  description: string;
  photo: string;
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
const tables: Table[] = [
  {
    id: "1",
    code: "T001",
    name: "VIP Table 1",
    person: "John Manager",
    location: "Main Hall - Section A",
    description: "Premium dining table for VIP guests with ocean view",
    photo: "",
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
    code: "T002",
    name: "Family Table 2",
    person: "Sarah Williams",
    location: "Garden Area - Section B",
    description: "Large family table accommodating up to 8 people",
    photo: "",
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
    code: "T003",
    name: "Romantic Corner Table",
    person: "Mike Johnson",
    location: "Terrace - Section C",
    description: "Intimate setting for couples with candle lighting",
    photo: "",
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
    code: "T004",
    name: "Business Meeting Table",
    person: "David Chen",
    location: "Private Room - Section D",
    description: "Professional setting for business meetings and presentations",
    photo: "",
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
    code: "T005",
    name: "Chef's Special Table",
    person: "Emma Rodriguez",
    location: "Kitchen View - Section E",
    description: "Front row seat to watch chef's culinary artistry",
    photo: "",
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
    code: "T006",
    name: "Outdoor Patio Table",
    person: "Robert Thompson",
    location: "Outdoor Patio - Section F",
    description: "Al fresco dining with fresh air and garden ambiance",
    photo: "",
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
    code: "T007",
    name: "Bar Counter Table",
    person: "Lisa Anderson",
    location: "Bar Area - Section G",
    description: "High table perfect for cocktails and light bites",
    photo: "",
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
    code: "T008",
    name: "Window Side Table",
    person: "Kevin Brown",
    location: "Window Side - Section H",
    description: "Bright table with natural lighting and street view",
    photo: "",
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
    code: "T009",
    name: "Community Long Table",
    person: "Maria Garcia",
    location: "Community Area - Section I",
    description: "Shared dining experience for social gatherings",
    photo: "",
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
    code: "T010",
    name: "Lounge Comfort Table",
    person: "James Wilson",
    location: "Lounge Area - Section J",
    description: "Relaxed seating with comfortable sofas and low tables",
    photo: "",
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
    code: "T011",
    name: "Executive Boardroom Table",
    person: "Patricia Davis",
    location: "Executive Floor - Section K",
    description: "Premium boardroom setting for high-profile meetings",
    photo: "",
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
    code: "T012",
    name: "Skyline View Table",
    person: "Christopher Lee",
    location: "Rooftop - Section L",
    description: "Stunning city skyline views from the rooftop terrace",
    photo: "",
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
    code: "T013",
    name: "Fireplace Cozy Table",
    person: "Jennifer Martinez",
    location: "Fireplace Area - Section M",
    description: "Warm and cozy atmosphere beside the fireplace",
    photo: "",
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
    code: "T014",
    name: "Art Gallery Table",
    person: "Steven Taylor",
    location: "Gallery Wing - Section N",
    description: "Dining surrounded by curated art collection",
    photo: "",
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
    code: "T015",
    name: "Wine Cellar Table",
    person: "Amanda White",
    location: "Wine Cellar - Section O",
    description: "Exclusive dining experience in the wine cellar",
    photo: "",
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
    code: "T016",
    name: "Live Music Stage Table",
    person: "Daniel Clark",
    location: "Entertainment Area - Section P",
    description: "Front row seats for live music performances",
    photo: "",
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

export default function TablesGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Tables grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tablesData, setTablesData] = useState(tables);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Table",
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
      "Main Hall - Section A",
      "Garden Area - Section B",
      "Terrace - Section C",
      "Private Room - Section D",
      "Kitchen View - Section E",
      "Outdoor Patio - Section F",
    ];
    const persons = [
      "John Manager",
      "Sarah Williams",
      "Mike Johnson",
      "David Chen",
      "Emma Rodriguez",
      "Robert Thompson",
    ];
    const tableTypes = [
      "VIP",
      "Family",
      "Business",
      "Romantic",
      "Community",
      "Lounge",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomIndex = Math.floor(Math.random() * locations.length);
      return {
        id: `${Date.now()}-${index}`,
        code: `T${(tablesData.length + index + 1).toString().padStart(3, "0")}`,
        name: `${
          tableTypes[Math.floor(Math.random() * tableTypes.length)]
        } Table ${tablesData.length + index + 1}`,
        person: persons[randomIndex],
        location: locations[randomIndex],
        description: `Description for table ${tablesData.length + index + 1}`,
        photo: "",
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
    if (tablesData.length >= 46) {
      setHasMore(false);
    } else {
      setTablesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [tablesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (tableId: string) => {
    setTablesData((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              isDeleted: !table.isDeleted,
              deletedAt: !table.isDeleted ? new Date() : null,
            }
          : table
      )
    );
  };

  const handleRestoreClick = (tableId: string) => {
    setTablesData((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              isDeleted: false,
              deletedAt: null,
            }
          : table
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (tableId: string) => {
    setTablesData((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              isActive: !table.isActive,
              updatedAt: new Date(),
            }
          : table
      )
    );
  };

  // Filter tables based on search query
  const filteredTables = tablesData.filter(
    (table) =>
      table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.person.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.description.toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import Table",
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
                  placeholder="Search tables..."
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
            {filteredTables.map((table) => (
              <Card
                key={table.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 3 Column Grid Layout */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={table.name} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/tables/${table.id}`)}
                      >
                        {table.name}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Center - Action Icons */}
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        table.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          table.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(table.id);
                          toastSuccess(
                            table.isActive
                              ? "Table deactivated successfully"
                              : "Table activated successfully"
                          );
                        }}
                      >
                        {table.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={table.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          table.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (table.isDeleted) {
                            handleRestoreClick(table.id);
                          } else {
                            handleDeleteClick(table.id);
                          }
                          toastSuccess(
                            table.isDeleted
                              ? "Table restored successfully"
                              : "Table deleted successfully"
                          );
                        }}
                      >
                        {table.isDeleted ? (
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
                        onClick={() => navigate(`/tables/${table.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Photo */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                      {table.photo ? (
                        <img
                          src={table.photo}
                          alt={`${table.name} photo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              // Create initials display
                              const words = table.name.split(" ");
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
                                table.code.charCodeAt(table.code.length - 1) %
                                colors.length;
                              parent.className = `w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${colors[colorIndex]}`;
                              parent.textContent = initials;
                            }
                          }}
                        />
                      ) : (
                        (() => {
                          // Generate initials from first 2 words
                          const words = table.name.split(" ");
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
                            table.code.charCodeAt(table.code.length - 1) %
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

                {/* Bottom Row - Grid with 3 columns: Code | Default | Person */}
                <div className="grid grid-cols-3 items-start gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {table.code}
                    </div>
                  </div>

                  {/* Status Badges - Center aligned */}
                  <div className="flex justify-center items-center gap-1 pt-3">
                    {table.isDefault && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Default
                      </span>
                    )}
                    {table.isDraft && (
                      <span className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Person - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Person
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {table.person}
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
                <span className="text-sm">Loading more tables...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTables.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more tables to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={tables}
                setFilteredData={setTablesData}
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
                data={tables}
                setFilteredData={setTablesData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Table</h3>
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
