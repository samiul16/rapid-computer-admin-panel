import { Card, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";

// Mock data - replace with real data from your API
const leavesData = [
  {
    id: "1",
    branch: "Main Branch",
    employee: "John Doe",
    leaveType: "Annual Leave",
    fromDate: new Date("2024-01-15"),
    endDate: new Date("2024-01-20"),
    totalDays: 6,
    hardCopy: "Yes",
    approvedBy: "Manager Smith",
    status: "Approved",
  },
  {
    id: "2",
    branch: "North Branch",
    employee: "Jane Smith",
    leaveType: "Sick Leave",
    fromDate: new Date("2024-01-16"),
    endDate: new Date("2024-01-18"),
    totalDays: 3,
    hardCopy: "No",
    approvedBy: "Manager Johnson",
    status: "Pending",
  },
  {
    id: "3",
    branch: "South Branch",
    employee: "Mike Wilson",
    leaveType: "Maternity Leave",
    fromDate: new Date("2024-01-17"),
    endDate: new Date("2024-02-17"),
    totalDays: 32,
    hardCopy: "Yes",
    approvedBy: "HR Manager",
    status: "Approved",
  },
  {
    id: "4",
    branch: "East Branch",
    employee: "Sarah Brown",
    leaveType: "Personal Leave",
    fromDate: new Date("2024-01-18"),
    endDate: new Date("2024-01-19"),
    totalDays: 2,
    hardCopy: "No",
    approvedBy: "Manager Davis",
    status: "Rejected",
  },
  {
    id: "5",
    branch: "West Branch",
    employee: "David Lee",
    leaveType: "Study Leave",
    fromDate: new Date("2024-01-19"),
    endDate: new Date("2024-01-25"),
    totalDays: 7,
    hardCopy: "Yes",
    approvedBy: "Manager Wilson",
    status: "Approved",
  },
  {
    id: "6",
    branch: "Central Branch",
    employee: "Lisa Garcia",
    leaveType: "Bereavement Leave",
    fromDate: new Date("2024-01-20"),
    endDate: new Date("2024-01-22"),
    totalDays: 3,
    hardCopy: "No",
    approvedBy: "Manager Brown",
    status: "Pending",
  },
  {
    id: "7",
    branch: "Main Branch",
    employee: "Tom Anderson",
    leaveType: "Annual Leave",
    fromDate: new Date("2024-01-21"),
    endDate: new Date("2024-01-28"),
    totalDays: 8,
    hardCopy: "Yes",
    approvedBy: "Manager Smith",
    status: "Approved",
  },
  {
    id: "8",
    branch: "North Branch",
    employee: "Emma Taylor",
    leaveType: "Sick Leave",
    fromDate: new Date("2024-01-22"),
    endDate: new Date("2024-01-24"),
    totalDays: 3,
    hardCopy: "No",
    approvedBy: "Manager Johnson",
    status: "Approved",
  },
  {
    id: "9",
    branch: "South Branch",
    employee: "Chris Martinez",
    leaveType: "Personal Leave",
    fromDate: new Date("2024-01-23"),
    endDate: new Date("2024-01-23"),
    totalDays: 1,
    hardCopy: "No",
    approvedBy: "Manager Davis",
    status: "Pending",
  },
  {
    id: "10",
    branch: "East Branch",
    employee: "Anna White",
    leaveType: "Annual Leave",
    fromDate: new Date("2024-01-24"),
    endDate: new Date("2024-01-30"),
    totalDays: 7,
    hardCopy: "Yes",
    approvedBy: "Manager Wilson",
    status: "Approved",
  },
  {
    id: "11",
    branch: "West Branch",
    employee: "Robert Johnson",
    leaveType: "Maternity Leave",
    fromDate: new Date("2024-01-25"),
    endDate: new Date("2024-02-25"),
    totalDays: 32,
    hardCopy: "Yes",
    approvedBy: "HR Manager",
    status: "Approved",
  },
  {
    id: "12",
    branch: "Central Branch",
    employee: "Maria Rodriguez",
    leaveType: "Study Leave",
    fromDate: new Date("2024-01-26"),
    endDate: new Date("2024-02-02"),
    totalDays: 8,
    hardCopy: "Yes",
    approvedBy: "Manager Brown",
    status: "Pending",
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

    const branches = [
      "Main Branch",
      "North Branch",
      "South Branch",
      "East Branch",
      "West Branch",
      "Central Branch",
    ];

    const employees = [
      "John Doe",
      "Jane Smith",
      "Mike Wilson",
      "Sarah Brown",
      "David Lee",
      "Lisa Garcia",
    ];

    const statuses = ["Approved", "Pending", "Rejected"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      branch: branches[Math.floor(Math.random() * branches.length)],
      employee: employees[Math.floor(Math.random() * employees.length)],
      leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      fromDate: new Date(),
      endDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
      totalDays: Math.floor(Math.random() * 30) + 1,
      hardCopy: Math.random() > 0.5 ? "Yes" : "No",
      approvedBy:
        "Manager " +
        employees[Math.floor(Math.random() * employees.length)].split(" ")[1],
      status: statuses[Math.floor(Math.random() * statuses.length)],
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

  // Filter leaves based on search query
  const filteredLeaves = leavesDataState.filter(
    (leave) =>
      leave.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.status.toLowerCase().includes(searchQuery.toLowerCase())
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
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200 cursor-pointer"
                onClick={() => navigate(`/leaves-approval/view/${leave.id}`)}
              >
                {/* Top Row - Grid with 2 columns: Employee | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Employee */}
                  <CardTitle className="text-lg font-semibold hover:text-primary transition-colors truncate">
                    {leave.employee}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : leave.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {leave.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Branch | Total Days */}
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

                  {/* Middle - Branch */}
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Branch
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {leave.branch}
                    </div>
                  </div>

                  {/* Total Days - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Total Days
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {leave.totalDays}
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
