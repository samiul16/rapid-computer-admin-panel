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
const leavesData = [
  {
    id: "1",
    branch: "Riyadh Branch",
    iqamaNo: "1234567890",
    leaveType: "Annual Leave",
    fromDate: new Date("2024-02-15"),
    endDate: new Date("2024-02-20"),
    totalDays: 6,
    applicationHardCopy: "Yes",
    reason: "Family vacation",
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
    branch: "Jeddah Branch",
    iqamaNo: "2345678901",
    leaveType: "Sick Leave",
    fromDate: new Date("2024-02-10"),
    endDate: new Date("2024-02-12"),
    totalDays: 3,
    applicationHardCopy: "No",
    reason: "Medical appointment",
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
    branch: "Dammam Branch",
    iqamaNo: "3456789012",
    leaveType: "Maternity Leave",
    fromDate: new Date("2024-03-01"),
    endDate: new Date("2024-05-31"),
    totalDays: 92,
    applicationHardCopy: "Yes",
    reason: "Pregnancy leave",
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
    branch: "Riyadh Branch",
    iqamaNo: "4567890123",
    leaveType: "Personal Leave",
    fromDate: new Date("2024-02-25"),
    endDate: new Date("2024-02-26"),
    totalDays: 2,
    applicationHardCopy: "Yes",
    reason: "Personal emergency",
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
    branch: "Jeddah Branch",
    iqamaNo: "5678901234",
    leaveType: "Study Leave",
    fromDate: new Date("2024-03-15"),
    endDate: new Date("2024-03-20"),
    totalDays: 6,
    applicationHardCopy: "Yes",
    reason: "Professional development",
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
    branch: "Dammam Branch",
    iqamaNo: "6789012345",
    leaveType: "Bereavement Leave",
    fromDate: new Date("2024-02-05"),
    endDate: new Date("2024-02-08"),
    totalDays: 4,
    applicationHardCopy: "No",
    reason: "Family bereavement",
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
    branch: "Riyadh Branch",
    iqamaNo: "7890123456",
    leaveType: "Annual Leave",
    fromDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-15"),
    totalDays: 15,
    applicationHardCopy: "Yes",
    reason: "Summer vacation",
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
    branch: "Jeddah Branch",
    iqamaNo: "8901234567",
    leaveType: "Sick Leave",
    fromDate: new Date("2024-02-18"),
    endDate: new Date("2024-02-20"),
    totalDays: 3,
    applicationHardCopy: "No",
    reason: "Flu recovery",
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
    branch: "Dammam Branch",
    iqamaNo: "9012345678",
    leaveType: "Personal Leave",
    fromDate: new Date("2024-04-15"),
    endDate: new Date("2024-04-16"),
    totalDays: 2,
    applicationHardCopy: "Yes",
    reason: "Wedding ceremony",
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
    branch: "Riyadh Branch",
    iqamaNo: "0123456789",
    leaveType: "Annual Leave",
    fromDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-10"),
    totalDays: 10,
    applicationHardCopy: "Yes",
    reason: "Holiday trip",
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
    branch: "Jeddah Branch",
    iqamaNo: "1234567891",
    leaveType: "Maternity Leave",
    fromDate: new Date("2024-04-01"),
    endDate: new Date("2024-06-30"),
    totalDays: 91,
    applicationHardCopy: "Yes",
    reason: "Maternity care",
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
    branch: "Dammam Branch",
    iqamaNo: "2345678902",
    leaveType: "Study Leave",
    fromDate: new Date("2024-03-25"),
    endDate: new Date("2024-03-30"),
    totalDays: 6,
    applicationHardCopy: "Yes",
    reason: "Certification course",
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

export default function LeavesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Leaves grid rendered");

  const navigate = useNavigate();

  const [leavesDataState, setLeavesDataState] = useState(leavesData);
  const canDelete: boolean = usePermission("leavesApplication", "delete");
  const canRestore: boolean = usePermission("leavesApplication", "restore");
  const canEdit: boolean = usePermission("leavesApplication", "edit");

  // Debug permissions
  console.log("Leaves Permissions:", {
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

    const leaveTypes = [
      "Annual Leave",
      "Sick Leave",
      "Maternity Leave",
      "Personal Leave",
      "Study Leave",
      "Bereavement Leave",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      branch: ["Riyadh Branch", "Jeddah Branch", "Dammam Branch"][
        Math.floor(Math.random() * 3)
      ],
      iqamaNo: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      fromDate: new Date(),
      endDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
      totalDays: Math.floor(Math.random() * 30) + 1,
      applicationHardCopy: Math.random() > 0.5 ? "Yes" : "No",
      reason: "Sample leave application",
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (leavesDataState.length >= 46) {
      setHasMore(false);
    } else {
      setLeavesDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [leavesDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (leaveId: string) => {
    setLeavesDataState((prevLeaves) =>
      prevLeaves.map((leave) =>
        leave.id === leaveId
          ? {
              ...leave,
              isDeleted: leave.isDeleted === true ? false : true,
            }
          : leave
      )
    );
  };

  const handleRestoreClick = (leaveId: string) => {
    setLeavesDataState((prevLeaves) =>
      prevLeaves.map((leave) =>
        leave.id === leaveId
          ? {
              ...leave,
              isDeleted: leave.isDeleted === true ? false : true,
            }
          : leave
      )
    );
  };

  // Filter leaves based on search query
  const filteredLeaves = leavesDataState.filter(
    (leave) =>
      leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.iqamaNo.includes(searchQuery)
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
          Total {leavesData.length} leaves
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
            {filteredLeaves.map((leave, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/leaves/1`)}
                  >
                    {leave.leaveType}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        leave.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {leave.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Leave Type
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {leave.leaveType}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        leave.isDeleted && canRestore
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
                        disabled={leave.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          leave.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && leave.isDeleted) {
                            handleRestoreClick(leave.id);
                            toastRestore("Leave restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(leave.id);
                              toastDelete("Leave deleted successfully");
                            }
                          }
                        }}
                      >
                        {leave.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/leaves/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Notes - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Notes
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {leave.reason}
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
                <span className="text-sm">Loading more leaves...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLeaves.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more leaves to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={leavesData}
                setFilteredData={setLeavesDataState}
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
                data={leavesData}
                setFilteredData={setLeavesDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
