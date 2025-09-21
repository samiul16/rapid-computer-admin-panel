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

// Define Employee interface to ensure type consistency
interface Employee {
  id: string;
  code: string;
  employeeName: string;
  email: string;
  phone?: string;
  department?: string;
  designation?: string;
  salary?: number;
  joiningDate?: Date;
  manager?: string;
  location?: string;
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
const employees: Employee[] = [
  {
    id: "1",
    code: "EMP001",
    employeeName: "John Smith",
    email: "john.smith@company.com",
    phone: "+1-555-0101",
    department: "Executive",
    designation: "Chief Executive Officer",
    salary: 200000,
    joiningDate: new Date("2023-01-15"),
    manager: "Board of Directors",
    location: "New York",
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
    code: "EMP002",
    employeeName: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1-555-0102",
    department: "Human Resources",
    designation: "HR Manager",
    salary: 85000,
    joiningDate: new Date("2023-02-16"),
    manager: "John Smith",
    location: "New York",
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
    code: "EMP003",
    employeeName: "Michael Davis",
    email: "michael.davis@company.com",
    phone: "+1-555-0103",
    department: "Information Technology",
    designation: "Software Engineer",
    salary: 75000,
    joiningDate: new Date("2023-03-17"),
    manager: "IT Manager",
    location: "San Francisco",
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
    code: "EMP004",
    employeeName: "Emily Wilson",
    email: "emily.wilson@company.com",
    phone: "+1-555-0104",
    department: "Marketing",
    designation: "Marketing Specialist",
    salary: 55000,
    joiningDate: new Date("2023-04-18"),
    manager: "Marketing Manager",
    location: "Los Angeles",
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
    code: "EMP005",
    employeeName: "David Brown",
    email: "david.brown@company.com",
    phone: "+1-555-0105",
    department: "Sales",
    designation: "Sales Representative",
    salary: 60000,
    joiningDate: new Date("2023-05-19"),
    manager: "Sales Manager",
    location: "Chicago",
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
    code: "EMP006",
    employeeName: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    phone: "+1-555-0106",
    department: "Operations",
    designation: "Operations Manager",
    salary: 90000,
    joiningDate: new Date("2023-06-20"),
    manager: "John Smith",
    location: "New York",
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
    code: "EMP007",
    employeeName: "Robert Taylor",
    email: "robert.taylor@company.com",
    phone: "+1-555-0107",
    department: "Research & Development",
    designation: "Research Scientist",
    salary: 95000,
    joiningDate: new Date("2023-07-21"),
    manager: "R&D Manager",
    location: "Boston",
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
    code: "EMP008",
    employeeName: "Jennifer Martinez",
    email: "jennifer.martinez@company.com",
    phone: "+1-555-0108",
    department: "Legal",
    designation: "Legal Counsel",
    salary: 110000,
    joiningDate: new Date("2023-08-22"),
    manager: "Legal Manager",
    location: "Washington DC",
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
    code: "EMP009",
    employeeName: "Christopher Lee",
    email: "christopher.lee@company.com",
    phone: "+1-555-0109",
    department: "Customer Service",
    designation: "Customer Service Rep",
    salary: 40000,
    joiningDate: new Date("2023-09-23"),
    manager: "Customer Service Manager",
    location: "Austin",
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
    code: "EMP010",
    employeeName: "Amanda Garcia",
    email: "amanda.garcia@company.com",
    phone: "+1-555-0110",
    department: "Quality Assurance",
    designation: "QA Analyst",
    salary: 65000,
    joiningDate: new Date("2023-10-24"),
    manager: "QA Manager",
    location: "Seattle",
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
    code: "EMP011",
    employeeName: "James Rodriguez",
    email: "james.rodriguez@company.com",
    phone: "+1-555-0111",
    department: "Supply Chain",
    designation: "Supply Chain Coordinator",
    salary: 55000,
    joiningDate: new Date("2023-11-25"),
    manager: "Supply Chain Manager",
    location: "Dallas",
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
    code: "EMP012",
    employeeName: "Michelle Thompson",
    email: "michelle.thompson@company.com",
    phone: "+1-555-0112",
    department: "Training & Development",
    designation: "Training Specialist",
    salary: 62000,
    joiningDate: new Date("2023-12-26"),
    manager: "Training Manager",
    location: "Denver",
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
    code: "EMP013",
    employeeName: "Kevin White",
    email: "kevin.white@company.com",
    phone: "+1-555-0113",
    department: "Security",
    designation: "Security Officer",
    salary: 45000,
    joiningDate: new Date("2024-01-27"),
    manager: "Security Manager",
    location: "Miami",
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
    code: "EMP014",
    employeeName: "Rachel Clark",
    email: "rachel.clark@company.com",
    phone: "+1-555-0114",
    department: "Facilities Management",
    designation: "Facilities Technician",
    salary: 42000,
    joiningDate: new Date("2024-01-28"),
    manager: "Facilities Manager",
    location: "Phoenix",
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
    code: "EMP015",
    employeeName: "Daniel Lewis",
    email: "daniel.lewis@company.com",
    phone: "+1-555-0115",
    department: "Communications",
    designation: "Communications Coordinator",
    salary: 58000,
    joiningDate: new Date("2024-01-29"),
    manager: "Communications Manager",
    location: "Portland",
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
    code: "EMP016",
    employeeName: "Jessica Walker",
    email: "jessica.walker@company.com",
    phone: "+1-555-0116",
    department: "Analytics",
    designation: "Data Analyst",
    salary: 72000,
    joiningDate: new Date("2024-01-30"),
    manager: "Analytics Manager",
    location: "Atlanta",
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

export default function EmployeeGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Employees grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [employeesData, setEmployeesData] = useState(employees);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Employee",
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
    const designations = [
      "Specialist",
      "Analyst",
      "Coordinator",
      "Officer",
      "Representative",
      "Technician",
    ];
    const firstNames = [
      "John",
      "Sarah",
      "Michael",
      "Emily",
      "David",
      "Lisa",
      "Robert",
      "Jennifer",
      "Christopher",
      "Amanda",
      "James",
      "Michelle",
      "Kevin",
      "Rachel",
      "Daniel",
      "Jessica",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Davis",
      "Wilson",
      "Brown",
      "Anderson",
      "Taylor",
      "Martinez",
      "Lee",
      "Garcia",
      "Rodriguez",
      "Thompson",
      "White",
      "Clark",
      "Lewis",
      "Walker",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomDepartmentIndex = Math.floor(
        Math.random() * departments.length
      );
      const randomDesignationIndex = Math.floor(
        Math.random() * designations.length
      );
      const randomFirstNameIndex = Math.floor(
        Math.random() * firstNames.length
      );
      const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
      const employeeName = `${firstNames[randomFirstNameIndex]} ${lastNames[randomLastNameIndex]}`;
      const email = `${firstNames[
        randomFirstNameIndex
      ].toLowerCase()}.${lastNames[
        randomLastNameIndex
      ].toLowerCase()}@company.com`;

      return {
        id: `${Date.now()}-${index}`,
        code: `EMP${(employeesData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        employeeName,
        email,
        phone: `+1-555-${(Math.floor(Math.random() * 9000) + 1000).toString()}`,
        department: departments[randomDepartmentIndex],
        designation: designations[randomDesignationIndex],
        salary: Math.floor(Math.random() * 80000) + 40000,
        joiningDate: new Date(),
        manager: "Manager",
        location: "Office",
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
    if (employeesData.length >= 46) {
      setHasMore(false);
    } else {
      setEmployeesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [employeesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (employeeId: string) => {
    setEmployeesData((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? {
              ...employee,
              isDeleted: !employee.isDeleted,
              deletedAt: !employee.isDeleted ? new Date() : null,
            }
          : employee
      )
    );
  };

  const handleRestoreClick = (employeeId: string) => {
    setEmployeesData((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? {
              ...employee,
              isDeleted: false,
              deletedAt: null,
            }
          : employee
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (employeeId: string) => {
    setEmployeesData((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? {
              ...employee,
              isActive: !employee.isActive,
              updatedAt: new Date(),
            }
          : employee
      )
    );
  };

  // Filter employees based on search query
  const filteredEmployees = employeesData.filter(
    (employee) =>
      employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (employee.department &&
        employee.department
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (employee.designation &&
        employee.designation
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (employee.location &&
        employee.location.toLowerCase().includes(searchQuery.toLowerCase()))
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
                  title: "Import Employee",
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
                  placeholder="Search employees..."
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
            {filteredEmployees.map((employee) => (
              <Card
                key={employee.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 3 Column Grid Layout */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip
                      label={employee.employeeName}
                      position="top"
                      withArrow
                    >
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/employee/${employee.id}`)}
                      >
                        {employee.employeeName}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Center - Action Icons */}
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        employee.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          employee.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(employee.id);
                          toastSuccess(
                            employee.isActive
                              ? "Employee deactivated successfully"
                              : "Employee activated successfully"
                          );
                        }}
                      >
                        {employee.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={employee.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          employee.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (employee.isDeleted) {
                            handleRestoreClick(employee.id);
                          } else {
                            handleDeleteClick(employee.id);
                          }
                          toastSuccess(
                            employee.isDeleted
                              ? "Employee restored successfully"
                              : "Employee deleted successfully"
                          );
                        }}
                      >
                        {employee.isDeleted ? (
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
                          navigate(`/employee/${employee.id}/edit`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Department */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Department
                    </div>
                    <div className="text-gray-900 dark:text-gray-100 truncate">
                      {employee.department || "N/A"}
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
                <span className="text-sm">Loading more employees...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredEmployees.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more employees to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={employees}
                setFilteredData={setEmployeesData}
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
                data={employees}
                setFilteredData={setEmployeesData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Employee</h3>
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
