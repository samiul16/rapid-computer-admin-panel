/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockShiftTypes = [
  {
    id: "1",
    name: "Morning Shift",
    color: "#3B82F6",
    startTime: "08:00",
    endTime: "16:00",
    lunchStart: "12:00",
    lunchEnd: "13:00",
    description: "Standard morning shift for office staff",
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
    name: "Evening Shift",
    color: "#8B5CF6",
    startTime: "16:00",
    endTime: "00:00",
    lunchStart: "20:00",
    lunchEnd: "21:00",
    description: "Evening shift for customer service",
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
    name: "Night Shift",
    color: "#1F2937",
    startTime: "00:00",
    endTime: "08:00",
    lunchStart: "04:00",
    lunchEnd: "05:00",
    description: "Overnight shift for security and maintenance",
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
    name: "Split Shift",
    color: "#F59E0B",
    startTime: "06:00",
    endTime: "18:00",
    lunchStart: "12:00",
    lunchEnd: "14:00",
    description: "Split shift with extended lunch break",
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
    name: "Weekend Shift",
    color: "#10B981",
    startTime: "09:00",
    endTime: "17:00",
    lunchStart: "13:00",
    lunchEnd: "14:00",
    description: "Weekend shift for retail staff",
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
    name: "Holiday Shift",
    color: "#EF4444",
    startTime: "10:00",
    endTime: "18:00",
    lunchStart: "14:00",
    lunchEnd: "15:00",
    description: "Holiday shift with modified hours",
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
    name: "Part-time Morning",
    color: "#06B6D4",
    startTime: "09:00",
    endTime: "13:00",
    lunchStart: "11:00",
    lunchEnd: "11:30",
    description: "Part-time morning shift for students",
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
    name: "Part-time Evening",
    color: "#EC4899",
    startTime: "18:00",
    endTime: "22:00",
    lunchStart: "20:00",
    lunchEnd: "20:30",
    description: "Part-time evening shift for part-timers",
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
    name: "Flexible Shift",
    color: "#84CC16",
    startTime: "Flexible",
    endTime: "Flexible",
    lunchStart: "Flexible",
    lunchEnd: "Flexible",
    description: "Flexible working hours for remote workers",
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
    name: "Training Shift",
    color: "#F97316",
    startTime: "14:00",
    endTime: "18:00",
    lunchStart: "16:00",
    lunchEnd: "16:30",
    description: "Training shift for new employees",
    status: "active",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    name: "Emergency Shift",
    color: "#DC2626",
    startTime: "On Call",
    endTime: "On Call",
    lunchStart: "N/A",
    lunchEnd: "N/A",
    description: "Emergency on-call shift for critical staff",
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
    name: "Seasonal Shift",
    color: "#059669",
    startTime: "07:00",
    endTime: "19:00",
    lunchStart: "12:00",
    lunchEnd: "13:00",
    description: "Extended seasonal shift for peak periods",
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
    name: "Early Bird",
    color: "#7C3AED",
    startTime: "06:00",
    endTime: "14:00",
    lunchStart: "10:00",
    lunchEnd: "11:00",
    description: "Early morning shift for early risers",
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
    name: "Late Night",
    color: "#1E40AF",
    startTime: "22:00",
    endTime: "06:00",
    lunchStart: "02:00",
    lunchEnd: "03:00",
    description: "Late night shift for night owls",
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
    name: "Mid Shift",
    color: "#F59E0B",
    startTime: "12:00",
    endTime: "20:00",
    lunchStart: "16:00",
    lunchEnd: "17:00",
    description: "Mid-day shift for afternoon workers",
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
    name: "Graveyard",
    color: "#374151",
    startTime: "23:00",
    endTime: "07:00",
    lunchStart: "03:00",
    lunchEnd: "04:00",
    description: "Graveyard shift for overnight operations",
    status: "draft",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    name: "Sunrise",
    color: "#F97316",
    startTime: "05:00",
    endTime: "13:00",
    lunchStart: "09:00",
    lunchEnd: "10:00",
    description: "Sunrise shift for early morning operations",
    status: "active",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    name: "Sunset",
    color: "#8B5CF6",
    startTime: "15:00",
    endTime: "23:00",
    lunchStart: "19:00",
    lunchEnd: "20:00",
    description: "Sunset shift for evening operations",
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
    name: "Extended Shift",
    color: "#DC2626",
    startTime: "08:00",
    endTime: "20:00",
    lunchStart: "12:00",
    lunchEnd: "13:00",
    description: "Extended 12-hour shift for special projects",
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
    name: "Short Shift",
    color: "#10B981",
    startTime: "10:00",
    endTime: "14:00",
    lunchStart: "12:00",
    lunchEnd: "12:30",
    description: "Short 4-hour shift for part-time workers",
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

export default function ShiftTypeDataTable({
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
  const canCreate = usePermission("shiftType", "create");

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockShiftTypes.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "color",
      title: "Color",
      options: [...new Set(mockShiftTypes.map((item) => item.color))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("color").localeCompare(row2.getValue("color"));
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "color",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "startTime",
      title: "Start Time",
      options: [...new Set(mockShiftTypes.map((item) => item.startTime))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("startTime")
          .localeCompare(row2.getValue("startTime"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "startTime",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "endTime",
      title: "End Time",
      options: [...new Set(mockShiftTypes.map((item) => item.endTime))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("endTime").localeCompare(row2.getValue("endTime"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "endTime",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "lunchStart",
      title: "Lunch Start",
      options: [...new Set(mockShiftTypes.map((item) => item.lunchStart))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("lunchStart")
          .localeCompare(row2.getValue("lunchStart"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "lunchStart",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "lunchEnd",
      title: "Lunch End",
      options: [...new Set(mockShiftTypes.map((item) => item.lunchEnd))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("lunchEnd")
          .localeCompare(row2.getValue("lunchEnd"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "lunchEnd",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockShiftTypes.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "description",
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

  const filteredData = mockShiftTypes.filter((shiftType) => {
    if (dataTableFilter.status === "Active") {
      return shiftType.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !shiftType.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return shiftType.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return shiftType.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return shiftType.isUpdated;
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
      fixedColumns={["name"]} // Pin name column
      pathName="shift-type"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
