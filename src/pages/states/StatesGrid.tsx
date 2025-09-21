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

// State interface
interface State {
  id: string;
  code: string;
  State: string;
  "Country name": string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
  flag: string;
}

// Mock data for states - replace with real data from your API
const states: State[] = [
  {
    id: "1",
    code: "CA",
    State: "California",
    "Country name": "United States",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-01-15"),
    draftedAt: null,
    updatedAt: new Date("2023-12-01"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/us.svg",
  },
  {
    id: "2",
    code: "NY",
    State: "New York",
    "Country name": "United States",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-01-20"),
    draftedAt: null,
    updatedAt: new Date("2023-11-15"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/us.svg",
  },
  {
    id: "3",
    code: "TX",
    State: "Texas",
    "Country name": "United States",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2023-02-01"),
    draftedAt: null,
    updatedAt: new Date("2023-10-20"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/us.svg",
  },
  {
    id: "4",
    code: "FL",
    State: "Florida",
    "Country name": "United States",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-02-10"),
    draftedAt: null,
    updatedAt: new Date("2023-11-30"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/us.svg",
  },
  {
    id: "5",
    code: "ON",
    State: "Ontario",
    "Country name": "Canada",
    isDefault: false,
    isActive: true,
    isDraft: true,
    createdAt: new Date("2023-03-01"),
    draftedAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-12-05"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/ca.svg",
  },
  {
    id: "6",
    code: "QC",
    State: "Quebec",
    "Country name": "Canada",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-03-15"),
    draftedAt: null,
    updatedAt: new Date("2023-11-25"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/ca.svg",
  },
  {
    id: "7",
    code: "NSW",
    State: "New South Wales",
    "Country name": "Australia",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-04-01"),
    draftedAt: null,
    updatedAt: new Date("2023-12-10"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/au.svg",
  },
  {
    id: "8",
    code: "VIC",
    State: "Victoria",
    "Country name": "Australia",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-04-15"),
    draftedAt: null,
    updatedAt: new Date("2023-11-20"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/au.svg",
  },
  {
    id: "9",
    code: "BY",
    State: "Bavaria",
    "Country name": "Germany",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-05-01"),
    draftedAt: null,
    updatedAt: new Date("2023-12-15"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/de.svg",
  },
  {
    id: "10",
    code: "NRW",
    State: "North Rhine-Westphalia",
    "Country name": "Germany",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-05-15"),
    draftedAt: null,
    updatedAt: new Date("2023-11-10"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/de.svg",
  },
  {
    id: "11",
    code: "ENG",
    State: "England",
    "Country name": "United Kingdom",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-06-01"),
    draftedAt: null,
    updatedAt: new Date("2023-12-20"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/gb.svg",
  },
  {
    id: "12",
    code: "SCT",
    State: "Scotland",
    "Country name": "United Kingdom",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-06-15"),
    draftedAt: null,
    updatedAt: new Date("2023-11-05"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/gb.svg",
  },
  {
    id: "13",
    code: "MH",
    State: "Maharashtra",
    "Country name": "India",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2023-07-01"),
    draftedAt: null,
    updatedAt: new Date("2023-12-25"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/in.svg",
  },
  {
    id: "14",
    code: "UP",
    State: "Uttar Pradesh",
    "Country name": "India",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-07-15"),
    draftedAt: null,
    updatedAt: new Date("2023-11-01"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/in.svg",
  },
  {
    id: "15",
    code: "SP",
    State: "São Paulo",
    "Country name": "Brazil",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-08-01"),
    draftedAt: null,
    updatedAt: new Date("2023-12-30"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/br.svg",
  },
  {
    id: "16",
    code: "RJ",
    State: "Rio de Janeiro",
    "Country name": "Brazil",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-08-15"),
    draftedAt: null,
    updatedAt: new Date("2023-10-30"),
    deletedAt: null,
    isDeleted: false,
    flag: "https://flagcdn.com/br.svg",
  },
];

export default function StatesGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("States grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statesData, setStatesData] = useState(states);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import State",
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

    const countriesWithFlags = [
      { name: "United States", flag: "https://flagcdn.com/us.svg" },
      { name: "Canada", flag: "https://flagcdn.com/ca.svg" },
      { name: "Australia", flag: "https://flagcdn.com/au.svg" },
      { name: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
      { name: "Germany", flag: "https://flagcdn.com/de.svg" },
      { name: "India", flag: "https://flagcdn.com/in.svg" },
      { name: "Brazil", flag: "https://flagcdn.com/br.svg" },
      { name: "France", flag: "https://flagcdn.com/fr.svg" },
    ];
    const newItems: State[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const randomCountry =
          countriesWithFlags[
            Math.floor(Math.random() * countriesWithFlags.length)
          ];
        return {
          id: `${Date.now()}-${index}`,
          code: `S${(statesData.length + index + 1)
            .toString()
            .padStart(2, "0")}`,
          State: `State ${statesData.length + index + 1}`,
          "Country name": randomCountry.name,
          isDefault: Math.random() > 0.8,
          isActive: Math.random() > 0.3,
          isDraft: Math.random() > 0.7,
          createdAt: new Date(
            2023,
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1
          ),
          draftedAt:
            Math.random() > 0.7
              ? new Date(
                  2023,
                  Math.floor(Math.random() * 12),
                  Math.floor(Math.random() * 28) + 1
                )
              : null,
          updatedAt: new Date(
            2023,
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1
          ),
          deletedAt: null,
          isDeleted: false,
          flag: randomCountry.flag,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (statesData.length >= 46) {
      setHasMore(false);
    } else {
      setStatesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [statesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (stateId: string) => {
    setStatesData((prevStates) =>
      prevStates.map((state) =>
        state.id === stateId
          ? {
              ...state,
              isDeleted: !state.isDeleted,
              deletedAt: !state.isDeleted ? new Date() : null,
            }
          : state
      )
    );
  };

  const handleRestoreClick = (stateId: string) => {
    setStatesData((prevStates) =>
      prevStates.map((state) =>
        state.id === stateId
          ? {
              ...state,
              isDeleted: false,
              deletedAt: null,
            }
          : state
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (stateId: string) => {
    setStatesData((prevStates) =>
      prevStates.map((state) =>
        state.id === stateId
          ? {
              ...state,
              isActive: !state.isActive,
              updatedAt: new Date(),
            }
          : state
      )
    );
  };

  // Filter states based on search query
  const filteredStates = statesData.filter(
    (state) =>
      state.State.toLowerCase().includes(searchQuery.toLowerCase()) ||
      state.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      state["Country name"].toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import State",
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
                  placeholder="Search states..."
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
            {filteredStates.map((state) => (
              <Card
                key={state.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 3 Column Grid Layout */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={state.State} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/states/${state.id}`)}
                      >
                        {state.State}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Center - Action Icons */}
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        state.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          state.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(state.id);
                          toastSuccess(
                            state.isActive
                              ? "State deactivated successfully"
                              : "State activated successfully"
                          );
                        }}
                      >
                        {state.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={state.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          state.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (state.isDeleted) {
                            handleRestoreClick(state.id);
                          } else {
                            handleDeleteClick(state.id);
                          }
                          toastSuccess(
                            state.isDeleted
                              ? "State restored successfully"
                              : "State deleted successfully"
                          );
                        }}
                      >
                        {state.isDeleted ? (
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
                        onClick={() => navigate(`/states/${state.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Flag */}
                  <div className="flex justify-end">
                    <div className="w-8 h-6 sm:w-10 sm:h-7 md:w-12 md:h-8 lg:w-14 lg:h-9 xl:w-16 xl:h-10 rounded-md overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600">
                      <img
                        src={state.flag}
                        alt={`${state["Country name"]} flag`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Code | Default | Country */}
                <div className="grid grid-cols-3 items-start gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {state.code}
                    </div>
                  </div>

                  {/* Status Badges - Center aligned */}
                  <div className="flex justify-center items-center gap-1 pt-3">
                    {state.isDefault && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Default
                      </span>
                    )}
                    {state.isDraft && (
                      <span className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Country - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {state["Country name"]}
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
                <span className="text-sm">Loading more states...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredStates.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more states to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={states}
                setFilteredData={setStatesData}
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
                data={states}
                setFilteredData={setStatesData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import State</h3>
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
