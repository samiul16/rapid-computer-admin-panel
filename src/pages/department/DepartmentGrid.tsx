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

// Define Department interface to ensure type consistency
interface Department {
  id: string;
  code: string;
  Department: string;
  Description: string;
  Manager?: string;
  EmployeeCount?: number;
  Budget?: number;
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
const departments: Department[] = [
  {
    id: "1",
    code: "D001",
    Department: "Human Resources",
    Description: "Manages employee relations and recruitment",
    Manager: "Sarah Johnson",
    EmployeeCount: 12,
    Budget: 850000,
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
    code: "D002",
    Department: "Finance",
    Description: "Handles financial planning and accounting",
    Manager: "Michael Chen",
    EmployeeCount: 8,
    Budget: 1200000,
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
    code: "D003",
    Department: "Information Technology",
    Description: "Manages IT infrastructure and systems",
    Manager: "David Rodriguez",
    EmployeeCount: 25,
    Budget: 2100000,
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
    code: "D004",
    Department: "Marketing",
    Description: "Handles brand promotion and advertising",
    Manager: "Emily Davis",
    EmployeeCount: 15,
    Budget: 950000,
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
    code: "D005",
    Department: "Sales",
    Description: "Manages customer relationships and revenue",
    Manager: "James Wilson",
    EmployeeCount: 32,
    Budget: 1800000,
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
    code: "D006",
    Department: "Operations",
    Description: "Manages day-to-day business operations",
    Manager: "Lisa Thompson",
    EmployeeCount: 18,
    Budget: 1100000,
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
    code: "D007",
    Department: "Research & Development",
    Description: "Focuses on innovation and product development",
    Manager: "Robert Kim",
    EmployeeCount: 22,
    Budget: 3500000,
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
    code: "D008",
    Department: "Legal",
    Description: "Handles legal compliance and contracts",
    Manager: "Amanda Foster",
    EmployeeCount: 6,
    Budget: 750000,
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
    code: "D009",
    Department: "Customer Service",
    Description: "Provides support and assistance to customers",
    Manager: "Thomas Brown",
    EmployeeCount: 28,
    Budget: 1200000,
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
    code: "D010",
    Department: "Quality Assurance",
    Description: "Ensures product and service quality standards",
    Manager: "Jennifer Lee",
    EmployeeCount: 14,
    Budget: 800000,
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
    code: "D011",
    Department: "Supply Chain",
    Description: "Manages logistics and procurement",
    Manager: "Christopher Garcia",
    EmployeeCount: 16,
    Budget: 1400000,
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
    code: "D012",
    Department: "Training & Development",
    Description: "Manages employee learning and skill development",
    Manager: "Nicole Martinez",
    EmployeeCount: 9,
    Budget: 600000,
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
    code: "D013",
    Department: "Security",
    Description: "Ensures workplace and data security",
    Manager: "Kevin Anderson",
    EmployeeCount: 11,
    Budget: 700000,
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
    code: "D014",
    Department: "Facilities Management",
    Description: "Manages building maintenance and services",
    Manager: "Rachel White",
    EmployeeCount: 7,
    Budget: 500000,
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
    code: "D015",
    Department: "Communications",
    Description: "Manages internal and external communications",
    Manager: "Daniel Taylor",
    EmployeeCount: 8,
    Budget: 550000,
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
    code: "D016",
    Department: "Analytics",
    Description: "Provides data insights and business intelligence",
    Manager: "Sophia Clark",
    EmployeeCount: 12,
    Budget: 900000,
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

export default function DepartmentsGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Departments grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentsData, setDepartmentsData] = useState(departments);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Department",
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

    const managers = [
      "Alex Johnson",
      "Maria Garcia",
      "David Smith",
      "Sarah Wilson",
      "Michael Brown",
      "Lisa Davis",
    ];
    const departmentTypes = [
      "Management",
      "Services",
      "Operations",
      "Support",
      "Development",
      "Administration",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomManagerIndex = Math.floor(Math.random() * managers.length);
      return {
        id: `${Date.now()}-${index}`,
        code: `D${(departmentsData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        Department: `${
          departmentTypes[Math.floor(Math.random() * departmentTypes.length)]
        } ${departmentsData.length + index + 1}`,
        Description: `Description for ${
          departmentTypes[Math.floor(Math.random() * departmentTypes.length)]
        } ${departmentsData.length + index + 1}`,
        Manager: managers[randomManagerIndex],
        EmployeeCount: Math.floor(Math.random() * 30) + 5,
        Budget: Math.floor(Math.random() * 3000000) + 200000,
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
    if (departmentsData.length >= 46) {
      setHasMore(false);
    } else {
      setDepartmentsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [departmentsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (departmentId: string) => {
    setDepartmentsData((prevDepartments) =>
      prevDepartments.map((department) =>
        department.id === departmentId
          ? {
              ...department,
              isDeleted: !department.isDeleted,
              deletedAt: !department.isDeleted ? new Date() : null,
            }
          : department
      )
    );
  };

  const handleRestoreClick = (departmentId: string) => {
    setDepartmentsData((prevDepartments) =>
      prevDepartments.map((department) =>
        department.id === departmentId
          ? {
              ...department,
              isDeleted: false,
              deletedAt: null,
            }
          : department
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (departmentId: string) => {
    setDepartmentsData((prevDepartments) =>
      prevDepartments.map((department) =>
        department.id === departmentId
          ? {
              ...department,
              isActive: !department.isActive,
              updatedAt: new Date(),
            }
          : department
      )
    );
  };

  // Filter departments based on search query
  const filteredDepartments = departmentsData.filter(
    (department) =>
      department.Department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.Description.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      (department.Manager &&
        department.Manager.toLowerCase().includes(searchQuery.toLowerCase()))
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
                  title: "Import Department",
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
                  placeholder="Search departments..."
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
            {filteredDepartments.map((department) => (
              <Card
                key={department.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 3 Column Grid Layout */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip
                      label={department.Department}
                      position="top"
                      withArrow
                    >
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() =>
                          navigate(`/departments/${department.id}`)
                        }
                      >
                        {department.Department}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Center - Action Icons */}
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        department.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          department.isActive
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(department.id);
                          toastSuccess(
                            department.isActive
                              ? "Department deactivated successfully"
                              : "Department activated successfully"
                          );
                        }}
                      >
                        {department.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={department.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          department.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (department.isDeleted) {
                            handleRestoreClick(department.id);
                          } else {
                            handleDeleteClick(department.id);
                          }
                          toastSuccess(
                            department.isDeleted
                              ? "Department restored successfully"
                              : "Department deleted successfully"
                          );
                        }}
                      >
                        {department.isDeleted ? (
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
                        onClick={() =>
                          navigate(`/departments/${department.id}/edit`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Manager */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Employees
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {department.EmployeeCount || 0}
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
                <span className="text-sm">Loading more departments...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDepartments.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more departments to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={departments}
                setFilteredData={setDepartmentsData}
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
                data={departments}
                setFilteredData={setDepartmentsData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Department</h3>
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
