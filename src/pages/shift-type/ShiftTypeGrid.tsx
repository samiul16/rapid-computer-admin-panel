import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";

// Mock data - replace with real data from your API
const shiftTypeData = [
  {
    id: "1",
    name: "Morning Shift",
    color: "#3B82F6",
    startTime: "08:00",
    endTime: "16:00",
    lunchStart: "12:00",
    lunchEnd: "13:00",
    description: "Standard morning shift for office staff",
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
    name: "Evening Shift",
    color: "#8B5CF6",
    startTime: "16:00",
    endTime: "00:00",
    lunchStart: "20:00",
    lunchEnd: "21:00",
    description: "Evening shift for customer service",
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
    name: "Night Shift",
    color: "#1F2937",
    startTime: "00:00",
    endTime: "08:00",
    lunchStart: "04:00",
    lunchEnd: "05:00",
    description: "Overnight shift for security and maintenance",
    isDefault: false,
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
    name: "Split Shift",
    color: "#F59E0B",
    startTime: "06:00",
    endTime: "18:00",
    lunchStart: "12:00",
    lunchEnd: "14:00",
    description: "Split shift with extended lunch break",
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
    name: "Weekend Shift",
    color: "#10B981",
    startTime: "09:00",
    endTime: "17:00",
    lunchStart: "13:00",
    lunchEnd: "14:00",
    description: "Weekend shift for retail staff",
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
    name: "Holiday Shift",
    color: "#EF4444",
    startTime: "10:00",
    endTime: "18:00",
    lunchStart: "14:00",
    lunchEnd: "15:00",
    description: "Holiday shift with modified hours",
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
    name: "Part-time Morning",
    color: "#06B6D4",
    startTime: "09:00",
    endTime: "13:00",
    lunchStart: "11:00",
    lunchEnd: "11:30",
    description: "Part-time morning shift for students",
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
    name: "Part-time Evening",
    color: "#EC4899",
    startTime: "18:00",
    endTime: "22:00",
    lunchStart: "20:00",
    lunchEnd: "20:30",
    description: "Part-time evening shift for part-timers",
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
    name: "Flexible Shift",
    color: "#84CC16",
    startTime: "Flexible",
    endTime: "Flexible",
    lunchStart: "Flexible",
    lunchEnd: "Flexible",
    description: "Flexible working hours for remote workers",
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
    name: "Training Shift",
    color: "#F97316",
    startTime: "14:00",
    endTime: "18:00",
    lunchStart: "16:00",
    lunchEnd: "16:30",
    description: "Training shift for new employees",
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
    name: "Emergency Shift",
    color: "#DC2626",
    startTime: "On Call",
    endTime: "On Call",
    lunchStart: "N/A",
    lunchEnd: "N/A",
    description: "Emergency on-call shift for critical staff",
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
    name: "Seasonal Shift",
    color: "#059669",
    startTime: "07:00",
    endTime: "19:00",
    lunchStart: "12:00",
    lunchEnd: "13:00",
    description: "Extended seasonal shift for peak periods",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ShiftTypeGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Shift Type grid rendered");

  const navigate = useNavigate();

  const [shiftTypeDataState, setShiftTypeDataState] = useState(shiftTypeData);
  const canDelete: boolean = usePermission("shiftType", "delete");
  const canRestore: boolean = usePermission("shiftType", "restore");
  const canEdit: boolean = usePermission("shiftType", "edit");

  // Debug permissions
  console.log("Shift Type Permissions:", {
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

    const names = [
      "Early Bird",
      "Late Night",
      "Mid Shift",
      "Graveyard",
      "Sunrise",
      "Sunset",
    ];

    const colors = [
      "#3B82F6",
      "#8B5CF6",
      "#F59E0B",
      "#10B981",
      "#EF4444",
      "#06B6D4",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      name: names[Math.floor(Math.random() * names.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      startTime: `${Math.floor(Math.random() * 12) + 6}:00`,
      endTime: `${Math.floor(Math.random() * 12) + 12}:00`,
      lunchStart: `${Math.floor(Math.random() * 3) + 11}:00`,
      lunchEnd: `${Math.floor(Math.random() * 3) + 12}:00`,
      description: `Sample shift type description ${index + 1}`,
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
    if (shiftTypeDataState.length >= 46) {
      setHasMore(false);
    } else {
      setShiftTypeDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [shiftTypeDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (shiftTypeId: string) => {
    setShiftTypeDataState((prevShiftTypes) =>
      prevShiftTypes.map((shiftType) =>
        shiftType.id === shiftTypeId
          ? {
              ...shiftType,
              isDeleted: shiftType.isDeleted === true ? false : true,
            }
          : shiftType
      )
    );
  };

  const handleRestoreClick = (shiftTypeId: string) => {
    setShiftTypeDataState((prevShiftTypes) =>
      prevShiftTypes.map((shiftType) =>
        shiftType.id === shiftTypeId
          ? {
              ...shiftType,
              isDeleted: shiftType.isDeleted === true ? false : true,
            }
          : shiftType
      )
    );
  };

  // Filter shift types based on search query
  const filteredShiftTypes = shiftTypeDataState.filter(
    (shiftType) =>
      shiftType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shiftType.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shiftType.startTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shiftType.endTime.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Total {shiftTypeData.length} shift types
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
            {filteredShiftTypes.map((shiftType, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/shift-type/1`)}
                  >
                    {shiftType.name}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        shiftType.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {shiftType.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Color | Actions | Time */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Color - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Color
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: shiftType.color }}
                      ></div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {shiftType.color}
                      </span>
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        shiftType.isDeleted && canRestore
                          ? "Restore"
                          : canDelete
                          ? "Delete"
                          : ""
                      }
                      position="top"
                      arrowSize={8}
                      withArrow
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "#374151",
                          color: "white",
                          borderRadius: "6px",
                          fontWeight: "500",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "#374151",
                        },
                      }}
                    >
                      <button
                        disabled={shiftType.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          shiftType.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && shiftType.isDeleted) {
                            handleRestoreClick(shiftType.id);
                            toastRestore("Shift type restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(shiftType.id);
                              toastDelete("Shift type deleted successfully");
                            }
                          }
                        }}
                      >
                        {shiftType.isDeleted && canRestore ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          canDelete && <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </Tooltip>

                    {/* Edit */}
                    {canEdit && (
                      <Tooltip
                        label="Edit"
                        position="top"
                        arrowSize={8}
                        withArrow
                        styles={{
                          tooltip: {
                            fontSize: "14px",
                            padding: "8px 12px",
                            backgroundColor: "#374151",
                            color: "white",
                            borderRadius: "6px",
                            fontWeight: "500",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          },
                          arrow: {
                            backgroundColor: "#374151",
                          },
                        }}
                      >
                        <div
                          className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center w-8 h-8"
                          onClick={() => navigate(`/shift-type/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Time - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Time
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {shiftType.startTime} - {shiftType.endTime}
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
                <span className="text-sm">Loading more shift types...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredShiftTypes.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more shift types to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={shiftTypeData}
                setFilteredData={setShiftTypeDataState}
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
                data={shiftTypeData}
                setFilteredData={setShiftTypeDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
