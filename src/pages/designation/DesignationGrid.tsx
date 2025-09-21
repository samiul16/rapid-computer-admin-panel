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

// Define Designation interface to ensure type consistency
interface Designation {
  id: string;
  code: string;
  Designation: string;
  Description: string;
  Department?: string;
  Level?: string;
  ReportsTo?: string;
  EmployeeCount?: number;
  MinSalary?: number;
  MaxSalary?: number;
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
const designations: Designation[] = [
  {
    id: "1",
    code: "DES001",
    Designation: "Chief Executive Officer",
    Description: "Overall strategic leadership and management",
    Department: "Executive",
    Level: "Executive",
    ReportsTo: "Board of Directors",
    EmployeeCount: 1,
    MinSalary: 200000,
    MaxSalary: 500000,
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
    code: "DES002",
    Designation: "Human Resources Manager",
    Description: "Manages HR policies and employee relations",
    Department: "Human Resources",
    Level: "Manager",
    ReportsTo: "CEO",
    EmployeeCount: 2,
    MinSalary: 80000,
    MaxSalary: 120000,
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
    code: "DES003",
    Designation: "Software Engineer",
    Description: "Develops and maintains software applications",
    Department: "Information Technology",
    Level: "Individual Contributor",
    ReportsTo: "IT Manager",
    EmployeeCount: 15,
    MinSalary: 70000,
    MaxSalary: 110000,
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
    code: "DES004",
    Designation: "Marketing Specialist",
    Description: "Executes marketing campaigns and strategies",
    Department: "Marketing",
    Level: "Individual Contributor",
    ReportsTo: "Marketing Manager",
    EmployeeCount: 8,
    MinSalary: 50000,
    MaxSalary: 75000,
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
    code: "DES005",
    Designation: "Sales Representative",
    Description: "Manages client relationships and sales",
    Department: "Sales",
    Level: "Individual Contributor",
    ReportsTo: "Sales Manager",
    EmployeeCount: 20,
    MinSalary: 45000,
    MaxSalary: 80000,
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
    code: "DES006",
    Designation: "Operations Manager",
    Description: "Oversees daily business operations",
    Department: "Operations",
    Level: "Manager",
    ReportsTo: "CEO",
    EmployeeCount: 3,
    MinSalary: 85000,
    MaxSalary: 125000,
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
    code: "DES007",
    Designation: "Research Scientist",
    Description: "Conducts research and development activities",
    Department: "Research & Development",
    Level: "Individual Contributor",
    ReportsTo: "R&D Manager",
    EmployeeCount: 12,
    MinSalary: 90000,
    MaxSalary: 140000,
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
    code: "DES008",
    Designation: "Legal Counsel",
    Description: "Provides legal advice and compliance support",
    Department: "Legal",
    Level: "Individual Contributor",
    ReportsTo: "Legal Manager",
    EmployeeCount: 3,
    MinSalary: 100000,
    MaxSalary: 160000,
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
    code: "DES009",
    Designation: "Customer Service Representative",
    Description: "Handles customer inquiries and support",
    Department: "Customer Service",
    Level: "Individual Contributor",
    ReportsTo: "Customer Service Manager",
    EmployeeCount: 18,
    MinSalary: 35000,
    MaxSalary: 50000,
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
    code: "DES010",
    Designation: "Quality Assurance Analyst",
    Description: "Tests products and ensures quality standards",
    Department: "Quality Assurance",
    Level: "Individual Contributor",
    ReportsTo: "QA Manager",
    EmployeeCount: 8,
    MinSalary: 55000,
    MaxSalary: 80000,
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
    code: "DES011",
    Designation: "Supply Chain Coordinator",
    Description: "Coordinates logistics and procurement activities",
    Department: "Supply Chain",
    Level: "Individual Contributor",
    ReportsTo: "Supply Chain Manager",
    EmployeeCount: 6,
    MinSalary: 50000,
    MaxSalary: 70000,
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
    code: "DES012",
    Designation: "Training Specialist",
    Description: "Develops and delivers training programs",
    Department: "Training & Development",
    Level: "Individual Contributor",
    ReportsTo: "Training Manager",
    EmployeeCount: 4,
    MinSalary: 55000,
    MaxSalary: 75000,
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
    code: "DES013",
    Designation: "Security Officer",
    Description: "Ensures workplace and data security",
    Department: "Security",
    Level: "Individual Contributor",
    ReportsTo: "Security Manager",
    EmployeeCount: 8,
    MinSalary: 40000,
    MaxSalary: 60000,
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
    code: "DES014",
    Designation: "Facilities Technician",
    Description: "Maintains building systems and equipment",
    Department: "Facilities Management",
    Level: "Individual Contributor",
    ReportsTo: "Facilities Manager",
    EmployeeCount: 5,
    MinSalary: 35000,
    MaxSalary: 50000,
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
    code: "DES015",
    Designation: "Communications Coordinator",
    Description: "Manages internal and external communications",
    Department: "Communications",
    Level: "Individual Contributor",
    ReportsTo: "Communications Manager",
    EmployeeCount: 3,
    MinSalary: 50000,
    MaxSalary: 70000,
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
    code: "DES016",
    Designation: "Data Analyst",
    Description: "Analyzes data and provides business insights",
    Department: "Analytics",
    Level: "Individual Contributor",
    ReportsTo: "Analytics Manager",
    EmployeeCount: 7,
    MinSalary: 65000,
    MaxSalary: 95000,
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

export default function DesignationsGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Designations grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [designationsData, setDesignationsData] = useState(designations);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Designation",
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

    const departments = [
      "Human Resources",
      "Finance",
      "IT",
      "Marketing",
      "Sales",
      "Operations",
    ];
    const levels = [
      "Individual Contributor",
      "Senior",
      "Lead",
      "Manager",
      "Director",
      "Executive",
    ];
    const designationTypes = [
      "Specialist",
      "Analyst",
      "Coordinator",
      "Officer",
      "Representative",
      "Technician",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomDepartmentIndex = Math.floor(
        Math.random() * departments.length
      );
      const randomLevelIndex = Math.floor(Math.random() * levels.length);
      const randomTypeIndex = Math.floor(
        Math.random() * designationTypes.length
      );
      return {
        id: `${Date.now()}-${index}`,
        code: `DES${(designationsData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        Designation: `${levels[randomLevelIndex]} ${designationTypes[randomTypeIndex]}`,
        Description: `Description for ${levels[randomLevelIndex]} ${designationTypes[randomTypeIndex]}`,
        Department: departments[randomDepartmentIndex],
        Level: levels[randomLevelIndex],
        ReportsTo: "Manager",
        EmployeeCount: Math.floor(Math.random() * 20) + 1,
        MinSalary: Math.floor(Math.random() * 50000) + 30000,
        MaxSalary: Math.floor(Math.random() * 100000) + 80000,
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
    if (designationsData.length >= 46) {
      setHasMore(false);
    } else {
      setDesignationsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [designationsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (designationId: string) => {
    setDesignationsData((prevDesignations) =>
      prevDesignations.map((designation) =>
        designation.id === designationId
          ? {
              ...designation,
              isDeleted: !designation.isDeleted,
              deletedAt: !designation.isDeleted ? new Date() : null,
            }
          : designation
      )
    );
  };

  const handleRestoreClick = (designationId: string) => {
    setDesignationsData((prevDesignations) =>
      prevDesignations.map((designation) =>
        designation.id === designationId
          ? {
              ...designation,
              isDeleted: false,
              deletedAt: null,
            }
          : designation
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (designationId: string) => {
    setDesignationsData((prevDesignations) =>
      prevDesignations.map((designation) =>
        designation.id === designationId
          ? {
              ...designation,
              isActive: !designation.isActive,
              updatedAt: new Date(),
            }
          : designation
      )
    );
  };

  // Filter designations based on search query
  const filteredDesignations = designationsData.filter(
    (designation) =>
      designation.Designation.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      designation.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      designation.Description.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      (designation.Department &&
        designation.Department.toLowerCase().includes(
          searchQuery.toLowerCase()
        )) ||
      (designation.Level &&
        designation.Level.toLowerCase().includes(searchQuery.toLowerCase()))
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
                  title: "Import Designation",
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
                  placeholder="Search designations..."
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
            {filteredDesignations.map((designation) => (
              <Card
                key={designation.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 3 Column Grid Layout */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip
                      label={designation.Designation}
                      position="top"
                      withArrow
                    >
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() =>
                          navigate(`/designation/${designation.id}`)
                        }
                      >
                        {designation.Designation}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Center - Action Icons */}
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        designation.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          designation.isActive
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(designation.id);
                          toastSuccess(
                            designation.isActive
                              ? "Designation deactivated successfully"
                              : "Designation activated successfully"
                          );
                        }}
                      >
                        {designation.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={designation.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          designation.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (designation.isDeleted) {
                            handleRestoreClick(designation.id);
                          } else {
                            handleDeleteClick(designation.id);
                          }
                          toastSuccess(
                            designation.isDeleted
                              ? "Designation restored successfully"
                              : "Designation deleted successfully"
                          );
                        }}
                      >
                        {designation.isDeleted ? (
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
                          navigate(`/designation/${designation.id}/edit`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Employee Count */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Department
                    </div>
                    <div className="text-gray-900 dark:text-gray-100 truncate">
                      {designation.Department || "N/A"}
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
                <span className="text-sm">Loading more designations...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDesignations.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more designations to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={designations}
                setFilteredData={setDesignationsData}
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
                data={designations}
                setFilteredData={setDesignationsData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Designation</h3>
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
