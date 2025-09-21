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
const checksData = [
  {
    id: "1",
    vendorName: "ABC Supplies Co.",
    date: new Date("2024-01-15"),
    bankAccount: "Chase Bank - 1234",
    amount: 1250.0,
    checkNumber: "CHK-001",
    status: "Cleared",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    vendorName: "XYZ Corporation",
    date: new Date("2024-01-16"),
    bankAccount: "Wells Fargo - 5678",
    amount: 875.5,
    checkNumber: "CHK-002",
    status: "Pending",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    vendorName: "Tech Solutions Inc.",
    date: new Date("2024-01-17"),
    bankAccount: "Bank of America - 9012",
    amount: 2100.75,
    checkNumber: "CHK-003",
    status: "Issued",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    vendorName: "Global Services Ltd.",
    date: new Date("2024-01-18"),
    bankAccount: "Citibank - 3456",
    amount: 675.25,
    checkNumber: "CHK-004",
    status: "Void",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    vendorName: "Premium Partners",
    date: new Date("2024-01-19"),
    bankAccount: "PNC Bank - 7890",
    amount: 1850.0,
    checkNumber: "CHK-005",
    status: "Cleared",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    vendorName: "Innovation Labs",
    date: new Date("2024-01-20"),
    bankAccount: "US Bank - 2345",
    amount: 3200.5,
    checkNumber: "CHK-006",
    status: "Pending",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    vendorName: "Elite Enterprises",
    date: new Date("2024-01-21"),
    bankAccount: "TD Bank - 6789",
    amount: 950.75,
    checkNumber: "CHK-007",
    status: "Issued",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    vendorName: "Strategic Solutions",
    date: new Date("2024-01-22"),
    bankAccount: "Capital One - 0123",
    amount: 1450.0,
    checkNumber: "CHK-008",
    status: "Cleared",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    vendorName: "NextGen Systems",
    date: new Date("2024-01-23"),
    bankAccount: "Regions Bank - 4567",
    amount: 2750.25,
    checkNumber: "CHK-009",
    status: "Pending",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    vendorName: "Peak Performance",
    date: new Date("2024-01-24"),
    bankAccount: "Fifth Third - 8901",
    amount: 1100.5,
    checkNumber: "CHK-010",
    status: "Issued",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    vendorName: "Summit Solutions",
    date: new Date("2024-01-25"),
    bankAccount: "KeyBank - 2345",
    amount: 1950.75,
    checkNumber: "CHK-011",
    status: "Cleared",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    vendorName: "Apex Industries",
    date: new Date("2024-01-26"),
    bankAccount: "BB&T - 6789",
    amount: 850.0,
    checkNumber: "CHK-012",
    status: "Pending",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-31"),
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ChecksGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Checks grid rendered");

  const navigate = useNavigate();

  const [checksDataState, setChecksDataState] = useState(checksData);
  const canDelete: boolean = usePermission("checks", "delete");
  const canRestore: boolean = usePermission("checks", "restore");
  const canEdit: boolean = usePermission("checks", "edit");

  // Debug permissions
  console.log("Checks Permissions:", {
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

    const vendorNames = [
      "Dynamic Systems",
      "Future Tech",
      "Core Solutions",
      "Prime Services",
      "Advanced Corp",
      "Smart Solutions",
    ];

    const bankAccounts = [
      "Chase Bank - 1111",
      "Wells Fargo - 2222",
      "Bank of America - 3333",
      "Citibank - 4444",
      "PNC Bank - 5555",
      "US Bank - 6666",
    ];

    const statuses = ["Cleared", "Pending", "Issued", "Void"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      vendorName: vendorNames[Math.floor(Math.random() * vendorNames.length)],
      date: new Date(),
      bankAccount:
        bankAccounts[Math.floor(Math.random() * bankAccounts.length)],
      amount: Math.floor(Math.random() * 5000) + 100,
      checkNumber: `CHK-${String(Date.now()).slice(-4)}-${index}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (checksDataState.length >= 46) {
      setHasMore(false);
    } else {
      setChecksDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [checksDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (checkId: string) => {
    setChecksDataState((prevChecks) =>
      prevChecks.map((check) =>
        check.id === checkId
          ? {
              ...check,
              isDeleted: check.isDeleted === true ? false : true,
            }
          : check
      )
    );
  };

  const handleRestoreClick = (checkId: string) => {
    setChecksDataState((prevChecks) =>
      prevChecks.map((check) =>
        check.id === checkId
          ? {
              ...check,
              isDeleted: check.isDeleted === true ? false : true,
            }
          : check
      )
    );
  };

  // Filter check records based on search query
  const filteredChecks = checksDataState.filter(
    (check) =>
      check.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      check.bankAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      check.checkNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      check.status.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {checksData.length} check records
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
            {filteredChecks.map((check, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/checks/1`)}
                  >
                    {check.vendorName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        check.status === "Cleared"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : check.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : check.status === "Issued"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {check.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Check Details | Actions | Amount */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Check Details - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Check #{check.checkNumber}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {check.bankAccount}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        check.isDeleted && canRestore
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
                        disabled={check.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          check.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && check.isDeleted) {
                            handleRestoreClick(check.id);
                            toastRestore("Check record restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(check.id);
                              toastDelete("Check record deleted successfully");
                            }
                          }
                        }}
                      >
                        {check.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/checks/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Amount - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Amount
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      ${check.amount.toFixed(2)}
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
                <span className="text-sm">Loading more check records...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredChecks.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more check records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={checksData}
                setFilteredData={setChecksDataState}
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
                data={checksData}
                setFilteredData={setChecksDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
