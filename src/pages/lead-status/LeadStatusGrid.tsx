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

// Type definition for lead status
type LeadStatus = {
  id: string;
  name: string;
  order: number;
  color: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

// Mock data for lead statuses
const leadStatusesData = [
  {
    id: "1",
    name: "New Lead",
    order: 1,
    color: "#3B82F6",
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
    name: "Contacted",
    order: 2,
    color: "#10B981",
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
    name: "Qualified",
    order: 3,
    color: "#F59E0B",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-05-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    name: "Proposal Sent",
    order: 4,
    color: "#8B5CF6",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-18"),
    draftedAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    name: "Negotiation",
    order: 5,
    color: "#EF4444",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-12-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: new Date("2024-02-01"),
    isDeleted: true,
  },
  {
    id: "6",
    name: "Closed Won",
    order: 6,
    color: "#059669",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-12-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    name: "Closed Lost",
    order: 7,
    color: "#DC2626",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-08-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    name: "On Hold",
    order: 8,
    color: "#6B7280",
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
    name: "Rejected",
    order: 9,
    color: "#991B1B",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2021-12-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    name: "Follow Up",
    order: 10,
    color: "#F97316",
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
    name: "Meeting Scheduled",
    order: 11,
    color: "#06B6D4",
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
    name: "Demo Completed",
    order: 12,
    color: "#EC4899",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-26"),
    draftedAt: new Date("2024-01-31"),
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

export default function LeadStatusesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Lead Statuses grid rendered");

  const navigate = useNavigate();

  const [leadStatusesDataState, setLeadStatusesDataState] =
    useState<LeadStatus[]>(leadStatusesData);
  const canDelete: boolean = usePermission("leadStatuses", "delete");
  const canRestore: boolean = usePermission("leadStatuses", "restore");
  const canEdit: boolean = usePermission("leadStatuses", "edit");

  // Debug permissions
  console.log("Lead Statuses Permissions:", {
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

    const sourceNames = [
      "Digital Marketing",
      "Traditional Marketing",
      "Networking",
      "Events",
      "Publications",
      "Word of Mouth",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      name: `${
        sourceNames[Math.floor(Math.random() * sourceNames.length)]
      } ${Math.floor(Math.random() * 1000)}`,
      order: leadStatusesDataState.length + index + 1,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (leadStatusesDataState.length >= 46) {
      setHasMore(false);
    } else {
      setLeadStatusesDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [leadStatusesDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (sourceId: string) => {
    setLeadStatusesDataState((prevSources) =>
      prevSources.map((source) =>
        source.id === sourceId
          ? {
              ...source,
              isDeleted: source.isDeleted === true ? false : true,
            }
          : source
      )
    );
  };

  const handleRestoreClick = (sourceId: string) => {
    setLeadStatusesDataState((prevSources) =>
      prevSources.map((source) =>
        source.id === sourceId
          ? {
              ...source,
              isDeleted: source.isDeleted === true ? false : true,
            }
          : source
      )
    );
  };

  // Filter lead statuses based on search query
  const filteredLeadStatuses = leadStatusesDataState.filter((source) =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {leadStatusesData.length} lead statuses
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
            {filteredLeadStatuses.map((source, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/lead-status/1`)}
                  >
                    {source.name}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        source.isActive && !source.isDraft
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : source.isDraft
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {source.isDraft
                        ? "Draft"
                        : source.isActive
                        ? "Active"
                        : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Created Date | Actions | Updated Date */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Created Date - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Created
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {source.createdAt.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        source.isDeleted && canRestore
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
                        disabled={source.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          source.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && source.isDeleted) {
                            handleRestoreClick(source.id);
                            toastRestore("Lead source restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(source.id);
                              toastDelete("Lead source deleted successfully");
                            }
                          }
                        }}
                      >
                        {source.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/lead-status/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Updated Date - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Updated
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {source.updatedAt.toLocaleDateString()}
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
                <span className="text-sm">Loading more lead sources...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLeadStatuses.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more lead statuses to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={leadStatusesData}
                setFilteredData={setLeadStatusesDataState}
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
                data={leadStatusesData}
                setFilteredData={setLeadStatusesDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
