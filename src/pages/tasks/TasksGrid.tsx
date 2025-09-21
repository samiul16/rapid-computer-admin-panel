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
const tasksData = [
  {
    id: "1",
    subject: "Website Redesign",
    hourlyRate: 50,
    startDate: new Date("2024-01-15"),
    dueDate: new Date("2024-02-15"),
    priority: "High",
    repeatEvery: "Never",
    relatedTo: "Project A",
    assignees: "John Doe",
    followers: "Jane Smith",
    checklist: "Design mockups, Frontend dev, Testing",
    tags: "Design, Frontend",
    description: "Complete website redesign for client",
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
    subject: "Database Migration",
    hourlyRate: 75,
    startDate: new Date("2024-01-16"),
    dueDate: new Date("2024-01-30"),
    priority: "Medium",
    repeatEvery: "Never",
    relatedTo: "System Upgrade",
    assignees: "Mike Johnson",
    followers: "Sarah Wilson",
    checklist: "Backup data, Migrate, Verify",
    tags: "Database, Backend",
    description: "Migrate database to new version",
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
    subject: "Mobile App Testing",
    hourlyRate: 45,
    startDate: new Date("2024-01-17"),
    dueDate: new Date("2024-02-01"),
    priority: "Low",
    repeatEvery: "Weekly",
    relatedTo: "Mobile Project",
    assignees: "Lisa Brown",
    followers: "Tom Davis",
    checklist: "Unit tests, Integration tests, UI tests",
    tags: "Testing, Mobile",
    description: "Comprehensive testing of mobile app",
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
    subject: "API Documentation",
    hourlyRate: 60,
    startDate: new Date("2024-01-18"),
    dueDate: new Date("2024-01-25"),
    priority: "Medium",
    repeatEvery: "Never",
    relatedTo: "API Project",
    assignees: "Alex Turner",
    followers: "Emma White",
    checklist: "Write docs, Review, Publish",
    tags: "Documentation, API",
    description: "Create comprehensive API documentation",
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
    subject: "Security Audit",
    hourlyRate: 90,
    startDate: new Date("2024-01-19"),
    dueDate: new Date("2024-02-10"),
    priority: "High",
    repeatEvery: "Monthly",
    relatedTo: "Security",
    assignees: "David Lee",
    followers: "Rachel Green",
    checklist: "Vulnerability scan, Penetration test, Report",
    tags: "Security, Audit",
    description: "Perform security audit of all systems",
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
    subject: "Performance Optimization",
    hourlyRate: 70,
    startDate: new Date("2024-01-20"),
    dueDate: new Date("2024-02-05"),
    priority: "Medium",
    repeatEvery: "Never",
    relatedTo: "Performance",
    assignees: "Chris Martin",
    followers: "Anna Taylor",
    checklist: "Profile code, Optimize, Benchmark",
    tags: "Performance, Optimization",
    description: "Optimize application performance",
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
    subject: "User Training",
    hourlyRate: 55,
    startDate: new Date("2024-01-21"),
    dueDate: new Date("2024-01-28"),
    priority: "Low",
    repeatEvery: "Quarterly",
    relatedTo: "Training",
    assignees: "Maria Garcia",
    followers: "James Wilson",
    checklist: "Prepare materials, Conduct sessions, Feedback",
    tags: "Training, User",
    description: "Train users on new system features",
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
    subject: "Code Review",
    hourlyRate: 65,
    startDate: new Date("2024-01-22"),
    dueDate: new Date("2024-01-29"),
    priority: "Medium",
    repeatEvery: "Daily",
    relatedTo: "Development",
    assignees: "Paul Anderson",
    followers: "Sophie Clark",
    checklist: "Review code, Provide feedback, Approve",
    tags: "Code Review, Development",
    description: "Review pull requests and provide feedback",
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
    subject: "Backup Verification",
    hourlyRate: 40,
    startDate: new Date("2024-01-23"),
    dueDate: new Date("2024-01-26"),
    priority: "Low",
    repeatEvery: "Weekly",
    relatedTo: "Operations",
    assignees: "Kevin Miller",
    followers: "Laura Davis",
    checklist: "Check backups, Test restore, Verify",
    tags: "Backup, Operations",
    description: "Verify all backup systems are working",
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
    subject: "Feature Planning",
    hourlyRate: 80,
    startDate: new Date("2024-01-24"),
    dueDate: new Date("2024-02-20"),
    priority: "High",
    repeatEvery: "Never",
    relatedTo: "Product",
    assignees: "Nina Patel",
    followers: "Mark Thompson",
    checklist: "Gather requirements, Design, Plan",
    tags: "Planning, Product",
    description: "Plan new features for next release",
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
    subject: "Bug Fixes",
    hourlyRate: 50,
    startDate: new Date("2024-01-25"),
    dueDate: new Date("2024-02-02"),
    priority: "High",
    repeatEvery: "Never",
    relatedTo: "Maintenance",
    assignees: "Ryan Cooper",
    followers: "Helen Baker",
    checklist: "Identify bugs, Fix, Test, Deploy",
    tags: "Bug Fix, Maintenance",
    description: "Fix critical bugs in production",
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
    subject: "Deployment",
    hourlyRate: 70,
    startDate: new Date("2024-01-26"),
    dueDate: new Date("2024-01-27"),
    priority: "Medium",
    repeatEvery: "Weekly",
    relatedTo: "DevOps",
    assignees: "Steve Rogers",
    followers: "Natasha Romanoff",
    checklist: "Prepare release, Deploy, Monitor",
    tags: "Deployment, DevOps",
    description: "Deploy new version to production",
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

export default function TasksGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Tasks grid rendered");

  const navigate = useNavigate();

  const [tasksDataState, setTasksDataState] = useState(tasksData);
  const canDelete: boolean = usePermission("tasks", "delete");
  const canRestore: boolean = usePermission("tasks", "restore");
  const canEdit: boolean = usePermission("tasks", "edit");

  // Debug permissions
  console.log("Tasks Permissions:", {
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

    const subjects = [
      "Code Review",
      "Testing",
      "Documentation",
      "Bug Fix",
      "Feature Development",
      "Performance Optimization",
    ];

    const priorities = ["High", "Medium", "Low"];
    const repeatOptions = ["Never", "Daily", "Weekly", "Monthly", "Quarterly"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      hourlyRate: Math.floor(Math.random() * 100) + 30,
      startDate: new Date(),
      dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      repeatEvery:
        repeatOptions[Math.floor(Math.random() * repeatOptions.length)],
      relatedTo:
        "Project " + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      assignees: "Developer " + (index + 1),
      followers: "Manager " + (index + 1),
      checklist: "Task " + (index + 1) + " checklist items",
      tags: "Tag" + (index + 1),
      description: "Sample task description " + (index + 1),
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
    if (tasksDataState.length >= 46) {
      setHasMore(false);
    } else {
      setTasksDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [tasksDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (taskId: string) => {
    setTasksDataState((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isDeleted: task.isDeleted === true ? false : true,
            }
          : task
      )
    );
  };

  const handleRestoreClick = (taskId: string) => {
    setTasksDataState((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isDeleted: task.isDeleted === true ? false : true,
            }
          : task
      )
    );
  };

  // Filter tasks based on search query
  const filteredTasks = tasksDataState.filter(
    (task) =>
      task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignees.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {tasksData.length} tasks
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
            {filteredTasks.map((task, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/tasks/1`)}
                  >
                    {task.subject}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {task.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Priority | Actions | Assignees */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Priority - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Priority
                    </div>
                    <div
                      className={`text-sm font-semibold truncate ${
                        task.priority === "High"
                          ? "text-red-600"
                          : task.priority === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {task.priority}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        task.isDeleted && canRestore
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
                        disabled={task.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          task.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && task.isDeleted) {
                            handleRestoreClick(task.id);
                            toastRestore("Task restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(task.id);
                              toastDelete("Task deleted successfully");
                            }
                          }
                        }}
                      >
                        {task.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/tasks/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Assignees - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Assignees
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {task.assignees}
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
                <span className="text-sm">Loading more tasks...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTasks.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more tasks to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={tasksData}
                setFilteredData={setTasksDataState}
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
                data={tasksData}
                setFilteredData={setTasksDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
