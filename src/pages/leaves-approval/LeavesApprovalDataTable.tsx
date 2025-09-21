/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";

const mockLeaves = [
  {
    id: "1",
    branch: "Main Branch",
    employee: "John Doe",
    leaveType: "Annual Leave",
    fromDate: "2024-01-15",
    endDate: "2024-01-20",
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
    fromDate: "2024-01-16",
    endDate: "2024-01-18",
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
    fromDate: "2024-01-17",
    endDate: "2024-02-17",
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
    fromDate: "2024-01-18",
    endDate: "2024-01-19",
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
    fromDate: "2024-01-19",
    endDate: "2024-01-25",
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
    fromDate: "2024-01-20",
    endDate: "2024-01-22",
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
    fromDate: "2024-01-21",
    endDate: "2024-01-28",
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
    fromDate: "2024-01-22",
    endDate: "2024-01-24",
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
    fromDate: "2024-01-23",
    endDate: "2024-01-23",
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
    fromDate: "2024-01-24",
    endDate: "2024-01-30",
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
    fromDate: "2024-01-25",
    endDate: "2024-02-25",
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
    fromDate: "2024-01-26",
    endDate: "2024-02-02",
    totalDays: 8,
    hardCopy: "Yes",
    approvedBy: "Manager Brown",
    status: "Pending",
  },
  {
    id: "13",
    branch: "Main Branch",
    employee: "James Wilson",
    leaveType: "Annual Leave",
    fromDate: "2024-01-27",
    endDate: "2024-02-03",
    totalDays: 8,
    hardCopy: "Yes",
    approvedBy: "Manager Smith",
    status: "Approved",
  },
  {
    id: "14",
    branch: "North Branch",
    employee: "Emily Davis",
    leaveType: "Sick Leave",
    fromDate: "2024-01-28",
    endDate: "2024-01-30",
    totalDays: 3,
    hardCopy: "No",
    approvedBy: "Manager Johnson",
    status: "Approved",
  },
  {
    id: "15",
    branch: "South Branch",
    employee: "Michael Brown",
    leaveType: "Personal Leave",
    fromDate: "2024-01-29",
    endDate: "2024-01-29",
    totalDays: 1,
    hardCopy: "No",
    approvedBy: "Manager Davis",
    status: "Pending",
  },
  {
    id: "16",
    branch: "East Branch",
    employee: "Jennifer Lee",
    leaveType: "Study Leave",
    fromDate: "2024-01-30",
    endDate: "2024-02-06",
    totalDays: 8,
    hardCopy: "Yes",
    approvedBy: "Manager Wilson",
    status: "Approved",
  },
  {
    id: "17",
    branch: "West Branch",
    employee: "Daniel Garcia",
    leaveType: "Annual Leave",
    fromDate: "2024-01-31",
    endDate: "2024-02-07",
    totalDays: 8,
    hardCopy: "Yes",
    approvedBy: "Manager Smith",
    status: "Pending",
  },
  {
    id: "18",
    branch: "Central Branch",
    employee: "Amanda Taylor",
    leaveType: "Sick Leave",
    fromDate: "2024-02-01",
    endDate: "2024-02-03",
    totalDays: 3,
    hardCopy: "No",
    approvedBy: "Manager Johnson",
    status: "Approved",
  },
  {
    id: "19",
    branch: "Main Branch",
    employee: "Kevin Martinez",
    leaveType: "Maternity Leave",
    fromDate: "2024-02-02",
    endDate: "2024-03-02",
    totalDays: 30,
    hardCopy: "Yes",
    approvedBy: "HR Manager",
    status: "Approved",
  },
  {
    id: "20",
    branch: "North Branch",
    employee: "Rachel White",
    leaveType: "Personal Leave",
    fromDate: "2024-02-03",
    endDate: "2024-02-04",
    totalDays: 2,
    hardCopy: "No",
    approvedBy: "Manager Davis",
    status: "Rejected",
  },
];

export default function LeavesApprovalDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
  searchQuery,
  setShowExport,
  showExport,
  setShowFilter,
  showFilter,
  setShowVisibility,
  showVisibility,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
  searchQuery: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const componentColumns = [
    {
      accessorKey: "branch",
      title: "Branch",
      options: [...new Set(mockLeaves.map((item) => item.branch))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("branch").localeCompare(row2.getValue("branch"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "branch",
        readOnly: true,
      },
    },
    {
      accessorKey: "id",
      title: "ID",
      options: [...new Set(mockLeaves.map((item) => item.id))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("id").localeCompare(row2.getValue("id"));
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "id",
        readOnly: true,
      },
    },
    {
      accessorKey: "employee",
      title: "Employee",
      options: [...new Set(mockLeaves.map((item) => item.employee))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("employee")
          .localeCompare(row2.getValue("employee"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "employee",
        readOnly: true,
      },
    },
    {
      accessorKey: "leaveType",
      title: "Leave Type",
      options: [...new Set(mockLeaves.map((item) => item.leaveType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("leaveType")
          .localeCompare(row2.getValue("leaveType"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "leaveType",
        readOnly: true,
      },
    },
    {
      accessorKey: "fromDate",
      title: "From Date",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("fromDate")).getTime() -
          new Date(row2.getValue("fromDate")).getTime()
        );
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "fromDate",
        readOnly: true,
      },
    },
    {
      accessorKey: "endDate",
      title: "End Date",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("endDate")).getTime() -
          new Date(row2.getValue("endDate")).getTime()
        );
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "endDate",
        readOnly: true,
      },
    },
    {
      accessorKey: "totalDays",
      title: "Total Days",
      options: [
        ...new Set(mockLeaves.map((item) => item.totalDays.toString())),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: string) =>
          cellValue.toString().includes(filterVal)
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("totalDays") - row2.getValue("totalDays");
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "totalDays",
        readOnly: true,
      },
    },
    {
      accessorKey: "hardCopy",
      title: "Hard Copy",
      options: [...new Set(mockLeaves.map((item) => item.hardCopy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("hardCopy")
          .localeCompare(row2.getValue("hardCopy"));
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "hardCopy",
        readOnly: true,
      },
    },
    {
      accessorKey: "approvedBy",
      title: "Approved By",
      options: [...new Set(mockLeaves.map((item) => item.approvedBy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("approvedBy")
          .localeCompare(row2.getValue("approvedBy"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "approvedBy",
        readOnly: true,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockLeaves.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "status",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockLeaves.filter((leave) => {
    if (dataTableFilter.status === "Approved") {
      return leave.status === "Approved";
    } else if (dataTableFilter.status === "Pending") {
      return leave.status === "Pending";
    } else if (dataTableFilter.status === "Rejected") {
      return leave.status === "Rejected";
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["branch", "id", "employee"]} // Pin branch, id and employee columns
      pathName="leaves-approval/view"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
