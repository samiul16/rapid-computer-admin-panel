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

type PermissionsGridDataType = {
  id: string;
  code: string;
  name: string;
  Role: string;
  isDeleted: boolean;
};

const mockPermissionsData: PermissionsGridDataType[] = [
  {
    id: "1",
    code: "USR001",
    name: "Alice Rahman",
    Role: "Admin",
    isDeleted: false,
  },
  {
    id: "2",
    code: "USR002",
    name: "Bashir Khan",
    Role: "Editor",
    isDeleted: false,
  },
  {
    id: "3",
    code: "USR003",
    name: "Chinmoy Das",
    Role: "Viewer",
    isDeleted: true,
  },
  {
    id: "4",
    code: "USR004",
    name: "Dola Akter",
    Role: "Admin",
    isDeleted: false,
  },
  {
    id: "5",
    code: "USR005",
    name: "Ehsan Haque",
    Role: "Editor",
    isDeleted: true,
  },
  {
    id: "6",
    code: "USR006",
    name: "Farzana Mitu",
    Role: "Viewer",
    isDeleted: false,
  },
  {
    id: "7",
    code: "USR007",
    name: "Gias Uddin",
    Role: "Admin",
    isDeleted: false,
  },
  {
    id: "8",
    code: "USR008",
    name: "Hafsa Noor",
    Role: "Viewer",
    isDeleted: false,
  },
  {
    id: "9",
    code: "USR009",
    name: "Ehsan Haque",
    Role: "Editor",
    isDeleted: true,
  },
  {
    id: "10",
    code: "USR010",
    name: "Farzana Mitu",
    Role: "Viewer",
    isDeleted: false,
  },
  {
    id: "11",
    code: "USR011",
    name: "Gias Uddin",
    Role: "Admin",
    isDeleted: false,
  },
  {
    id: "12",
    code: "USR012",
    name: "Hafsa Noor",
    Role: "Viewer",
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

export default function PermissionsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Countries grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] =
    useState<PermissionsGridDataType[]>(mockPermissionsData);
  const canDelete: boolean = usePermission("permissions", "delete");
  const canRestore: boolean = usePermission("permissions", "restore");
  const canEdit: boolean = usePermission("permissions", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // ... (keep all your existing functions: loadMoreData, handleScroll, etc.)
  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      name: `User Name ${gridData.length + index + 1}`,
      code: `USR${(gridData.length + index + 1).toString().padStart(2, "0")}`,
      Role: "Admin",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...newItems]);
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

  const handleDeleteClick = (countryId: string) => {
    setGridData((prevCountries) =>
      prevCountries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              isDeleted: country.isDeleted === true ? false : true,
            }
          : country
      )
    );
  };

  const handleRestoreClick = (countryId: string) => {
    setGridData((prevCountries) =>
      prevCountries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              isDeleted: country.isDeleted === true ? false : true,
            }
          : country
      )
    );
  };

  // Filter countries based on search query
  const filteredGridData = gridData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} User
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
            {filteredGridData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/permissions/1`)}
                  >
                    {item.name}
                  </CardTitle>

                  {/* Right - Flag */}
                  <div className="flex items-end flex-col">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.code}
                    </div>
                  </div>
                </div>

                {/* Bottom Row  */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Role
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.Role}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        item.isDeleted && canRestore
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
                        disabled={item.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && item.isDeleted) {
                            handleRestoreClick(item.id);
                            toastRestore("Country restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("Country deleted successfully");
                            }
                          }
                        }}
                      >
                        {item.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/permissions/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
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
                <span className="text-sm">Loading more countries...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredGridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more countries to load
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
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
