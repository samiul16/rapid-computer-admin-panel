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
const taskCategories = [
  {
    id: "1",
    department: "Kitchen",
    designation: "Chef",
    task: "Food Preparation",
    description:
      "Prepare and cook food items according to recipes and standards",
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
    department: "Service",
    designation: "Waiter",
    task: "Table Service",
    description:
      "Serve customers, take orders, and ensure customer satisfaction",
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
    department: "Bar",
    designation: "Bartender",
    task: "Beverage Service",
    description: "Prepare and serve alcoholic and non-alcoholic beverages",
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
    department: "Storage",
    designation: "Storekeeper",
    task: "Inventory Management",
    description: "Manage inventory, track stock levels, and handle deliveries",
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
    department: "Management",
    designation: "Manager",
    task: "Team Supervision",
    description: "Supervise team members and ensure operational efficiency",
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
    department: "Bakery",
    designation: "Baker",
    task: "Bread Making",
    description: "Prepare fresh bread, pastries, and baked goods",
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
    department: "Dessert",
    designation: "Pastry Chef",
    task: "Dessert Preparation",
    description: "Create and decorate desserts and sweet items",
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
    department: "Salad Bar",
    designation: "Salad Chef",
    task: "Salad Preparation",
    description: "Prepare fresh salads and healthy food options",
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
    department: "Grill",
    designation: "Grill Chef",
    task: "Grilled Food",
    description: "Prepare grilled meats and vegetables",
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
    department: "Pizza",
    designation: "Pizza Chef",
    task: "Pizza Making",
    description: "Prepare pizzas and manage oven operations",
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
    department: "Sushi",
    designation: "Sushi Chef",
    task: "Sushi Preparation",
    description: "Prepare sushi and Japanese cuisine items",
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
    department: "Coffee Shop",
    designation: "Barista",
    task: "Coffee Service",
    description: "Prepare and serve coffee and other beverages",
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

export default function TaskCategoryGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Task category grid rendered");

  const navigate = useNavigate();

  const [taskCategoriesData, setTaskCategoriesData] = useState(taskCategories);
  const canDelete: boolean = usePermission("taskCategory", "delete");
  const canRestore: boolean = usePermission("taskCategory", "restore");
  const canEdit: boolean = usePermission("taskCategory", "edit");

  // Debug permissions
  console.log("Task Category Permissions:", {
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

    const departments = [
      "Kitchen",
      "Service",
      "Bar",
      "Storage",
      "Management",
      "Bakery",
      "Dessert",
      "Grill",
      "Pizza",
      "Sushi",
    ];
    const designations = [
      "Chef",
      "Waiter",
      "Bartender",
      "Storekeeper",
      "Manager",
      "Baker",
      "Pastry Chef",
      "Salad Chef",
      "Grill Chef",
      "Pizza Chef",
    ];
    const tasks = [
      "Food Preparation",
      "Table Service",
      "Beverage Service",
      "Inventory Management",
      "Team Supervision",
      "Bread Making",
      "Dessert Preparation",
      "Salad Preparation",
      "Grilled Food",
      "Pizza Making",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      designation:
        designations[Math.floor(Math.random() * designations.length)],
      task: tasks[Math.floor(Math.random() * tasks.length)],
      description: `Description for task category ${
        taskCategoriesData.length + index + 1
      }`,
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
    if (taskCategoriesData.length >= 46) {
      setHasMore(false);
    } else {
      setTaskCategoriesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [taskCategoriesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (taskCategoryId: string) => {
    setTaskCategoriesData((prevTaskCategories) =>
      prevTaskCategories.map((taskCategory) =>
        taskCategory.id === taskCategoryId
          ? {
              ...taskCategory,
              isDeleted: taskCategory.isDeleted === true ? false : true,
            }
          : taskCategory
      )
    );
  };

  const handleRestoreClick = (taskCategoryId: string) => {
    setTaskCategoriesData((prevTaskCategories) =>
      prevTaskCategories.map((taskCategory) =>
        taskCategory.id === taskCategoryId
          ? {
              ...taskCategory,
              isDeleted: taskCategory.isDeleted === true ? false : true,
            }
          : taskCategory
      )
    );
  };

  // Filter task categories based on search query
  const filteredTaskCategories = taskCategoriesData.filter(
    (taskCategory) =>
      taskCategory.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      taskCategory.department
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      taskCategory.designation
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      taskCategory.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {taskCategories.length} task categories
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
            {filteredTaskCategories.map((taskCategory, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/task-category/1`)}
                  >
                    {taskCategory.task}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        taskCategory.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {taskCategory.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Department | Actions | Designation */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Department - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Department
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {taskCategory.department}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        taskCategory.isDeleted && canRestore
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
                        disabled={taskCategory.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          taskCategory.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && taskCategory.isDeleted) {
                            handleRestoreClick(taskCategory.id);
                            toastRestore("Task category restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(taskCategory.id);
                              toastDelete("Task category deleted successfully");
                            }
                          }
                        }}
                      >
                        {taskCategory.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/task-category/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Designation - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Designation
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {taskCategory.designation}
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
                <span className="text-sm">Loading more task categories...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTaskCategories.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more task categories to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={taskCategories}
                setFilteredData={setTaskCategoriesData}
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
                data={taskCategories}
                setFilteredData={setTaskCategoriesData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
