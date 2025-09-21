/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockLeaves = [
  {
    id: "1",
    branch: "Riyadh Branch",
    iqamaNo: "1234567890",
    leaveType: "Annual Leave",
    fromDate: "2024-02-15",
    endDate: "2024-02-20",
    totalDays: 6,
    applicationHardCopy: "Yes",
    reason: "Family vacation",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    branch: "Jeddah Branch",
    iqamaNo: "2345678901",
    leaveType: "Sick Leave",
    fromDate: "2024-02-10",
    endDate: "2024-02-12",
    totalDays: 3,
    applicationHardCopy: "No",
    reason: "Medical appointment",
    status: "active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    branch: "Dammam Branch",
    iqamaNo: "3456789012",
    leaveType: "Maternity Leave",
    fromDate: "2024-03-01",
    endDate: "2024-05-31",
    totalDays: 92,
    applicationHardCopy: "Yes",
    reason: "Pregnancy leave",
    status: "active",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "20m",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    branch: "Riyadh Branch",
    iqamaNo: "4567890123",
    leaveType: "Personal Leave",
    fromDate: "2024-02-25",
    endDate: "2024-02-26",
    totalDays: 2,
    applicationHardCopy: "Yes",
    reason: "Personal emergency",
    status: "active",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: null,
    actionMessage: "15 Apr",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    branch: "Jeddah Branch",
    iqamaNo: "5678901234",
    leaveType: "Study Leave",
    fromDate: "2024-03-15",
    endDate: "2024-03-20",
    totalDays: 6,
    applicationHardCopy: "Yes",
    reason: "Professional development",
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    branch: "Dammam Branch",
    iqamaNo: "6789012345",
    leaveType: "Bereavement Leave",
    fromDate: "2024-02-05",
    endDate: "2024-02-08",
    totalDays: 4,
    applicationHardCopy: "No",
    reason: "Family bereavement",
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    branch: "Riyadh Branch",
    iqamaNo: "7890123456",
    leaveType: "Annual Leave",
    fromDate: "2024-07-01",
    endDate: "2024-07-15",
    totalDays: 15,
    applicationHardCopy: "Yes",
    reason: "Summer vacation",
    status: "active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    branch: "Jeddah Branch",
    iqamaNo: "8901234567",
    leaveType: "Sick Leave",
    fromDate: "2024-02-18",
    endDate: "2024-02-20",
    totalDays: 3,
    applicationHardCopy: "No",
    reason: "Flu recovery",
    status: "active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    branch: "Dammam Branch",
    iqamaNo: "9012345678",
    leaveType: "Personal Leave",
    fromDate: "2024-04-15",
    endDate: "2024-04-16",
    totalDays: 2,
    applicationHardCopy: "Yes",
    reason: "Wedding ceremony",
    status: "active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    branch: "Riyadh Branch",
    iqamaNo: "0123456789",
    leaveType: "Annual Leave",
    fromDate: "2024-06-01",
    endDate: "2024-06-10",
    totalDays: 10,
    applicationHardCopy: "Yes",
    reason: "Holiday trip",
    status: "active",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    branch: "Jeddah Branch",
    iqamaNo: "1234567891",
    leaveType: "Maternity Leave",
    fromDate: "2024-04-01",
    endDate: "2024-06-30",
    totalDays: 91,
    applicationHardCopy: "Yes",
    reason: "Maternity care",
    status: "inactive",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    branch: "Dammam Branch",
    iqamaNo: "2345678902",
    leaveType: "Study Leave",
    fromDate: "2024-03-25",
    endDate: "2024-03-30",
    totalDays: 6,
    applicationHardCopy: "Yes",
    reason: "Certification course",
    status: "active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    branch: "Riyadh Branch",
    iqamaNo: "3456789013",
    leaveType: "Annual Leave",
    fromDate: "2024-08-01",
    endDate: "2024-08-10",
    totalDays: 10,
    applicationHardCopy: "Yes",
    reason: "Family vacation",
    status: "active",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    branch: "Jeddah Branch",
    iqamaNo: "4567890124",
    leaveType: "Sick Leave",
    fromDate: "2024-02-28",
    endDate: "2024-03-01",
    totalDays: 3,
    applicationHardCopy: "No",
    reason: "Medical checkup",
    status: "active",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    branch: "Dammam Branch",
    iqamaNo: "5678901235",
    leaveType: "Personal Leave",
    fromDate: "2024-05-15",
    endDate: "2024-05-16",
    totalDays: 2,
    applicationHardCopy: "Yes",
    reason: "Family event",
    status: "active",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    branch: "Riyadh Branch",
    iqamaNo: "6789012346",
    leaveType: "Study Leave",
    fromDate: "2024-04-20",
    endDate: "2024-04-25",
    totalDays: 6,
    applicationHardCopy: "Yes",
    reason: "Training program",
    status: "active",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    branch: "Jeddah Branch",
    iqamaNo: "7890123457",
    leaveType: "Annual Leave",
    fromDate: "2024-12-20",
    endDate: "2024-12-31",
    totalDays: 12,
    applicationHardCopy: "Yes",
    reason: "Winter vacation",
    status: "draft",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    branch: "Dammam Branch",
    iqamaNo: "8901234568",
    leaveType: "Sick Leave",
    fromDate: "2024-03-10",
    endDate: "2024-03-11",
    totalDays: 2,
    applicationHardCopy: "No",
    reason: "Dental appointment",
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    branch: "Riyadh Branch",
    iqamaNo: "9012345679",
    leaveType: "Maternity Leave",
    fromDate: "2024-07-01",
    endDate: "2024-09-30",
    totalDays: 92,
    applicationHardCopy: "Yes",
    reason: "Maternity preparation",
    status: "active",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    branch: "Jeddah Branch",
    iqamaNo: "0123456780",
    leaveType: "Personal Leave",
    fromDate: "2024-06-15",
    endDate: "2024-06-16",
    totalDays: 2,
    applicationHardCopy: "No",
    reason: "Personal matters",
    status: "inactive",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function LeavesDataTable({
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
  const canCreate = usePermission("leaves", "create");

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
        return row1
          .getValue("branch")
          .localeCompare(row2.getValue("branch"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "branch",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "iqamaNo",
      title: "Iqama No",
      options: [...new Set(mockLeaves.map((item) => item.iqamaNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("iqamaNo").localeCompare(row2.getValue("iqamaNo"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "iqamaNo",
        readOnly: !canCreate,
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
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "fromDate",
      title: "From Date",
      options: [...new Set(mockLeaves.map((item) => item.fromDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("fromDate").localeCompare(row2.getValue("fromDate"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "fromDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "endDate",
      title: "End Date",
      options: [...new Set(mockLeaves.map((item) => item.endDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("endDate").localeCompare(row2.getValue("endDate"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "endDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "totalDays",
      title: "Total Days",
      options: [...new Set(mockLeaves.map((item) => item.totalDays))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("totalDays") - row2.getValue("totalDays");
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "totalDays",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "applicationHardCopy",
      title: "Hard Copy",
      options: [...new Set(mockLeaves.map((item) => item.applicationHardCopy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("applicationHardCopy").localeCompare(row2.getValue("applicationHardCopy"));
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "applicationHardCopy",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "reason",
      title: "Reason",
      options: [...new Set(mockLeaves.map((item) => item.reason))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("reason").localeCompare(row2.getValue("reason"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "reason",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
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
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "createdAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
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
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId);
        if (!cellValue) return false;
        const dateValue = new Date(cellValue as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(dateValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = row1.getValue("draftedAt");
        const date2 = row2.getValue("draftedAt");
        if (!date1 && !date2) return 0;
        if (!date1) return 1;
        if (!date2) return -1;
        return new Date(date1).getTime() - new Date(date2).getTime();
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockLeaves.filter((leave) => {
    if (dataTableFilter.status === "Active") {
      return leave.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !leave.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return leave.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return leave.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return leave.isUpdated;
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
      fixedColumns={["branch"]} // Pin branch column
      pathName="leaves-application"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
