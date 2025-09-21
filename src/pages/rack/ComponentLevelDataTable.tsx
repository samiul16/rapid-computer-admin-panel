/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  name: string;
  code: string;
  description: string;

  // same for all component
  id: string;
  status: "active" | "inactive" | "draft";
  isActive: boolean;
  isDeleted: boolean;
  isDraft: boolean;
  isUpdated: boolean;
  actionMessage: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
};

export const listTableData: ListTableDataType[] = [
  {
    id: "rack-001",
    name: "Rack A1",
    code: "RK-A1",
    description: "Located in Shelf A1 for dry goods",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Rack ready",
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-01T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "rack-002",
    name: "Rack A2",
    code: "RK-A2",
    description: "Backup rack in Shelf A1",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Rearranged position",
    createdAt: "2025-07-02T10:00:00Z",
    updatedAt: "2025-07-03T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "rack-003",
    name: "Rack B1",
    code: "RK-B1",
    description: "Cold storage rack",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Power issue",
    createdAt: "2025-06-30T08:00:00Z",
    updatedAt: "2025-07-01T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "rack-004",
    name: "Rack B2",
    code: "RK-B2",
    description: "For bakery section",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Re-stocked today",
    createdAt: "2025-07-03T11:30:00Z",
    updatedAt: "2025-07-03T11:30:00Z",
    draftedAt: "",
  },
  {
    id: "rack-005",
    name: "Rack C1",
    code: "RK-C1",
    description: "Ingredients for curry preparation",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Awaiting approval",
    createdAt: "2025-07-04T08:45:00Z",
    updatedAt: "",
    draftedAt: "2025-07-04T08:45:00Z",
  },
  {
    id: "rack-006",
    name: "Rack C2",
    code: "RK-C2",
    description: "Frozen goods rack",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Temperature adjusted",
    createdAt: "2025-07-02T14:00:00Z",
    updatedAt: "2025-07-03T13:30:00Z",
    draftedAt: "",
  },
  {
    id: "rack-007",
    name: "Rack D1",
    code: "RK-D1",
    description: "General storage rack",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Cleaned and sorted",
    createdAt: "2025-07-01T09:15:00Z",
    updatedAt: "2025-07-01T09:15:00Z",
    draftedAt: "",
  },
  {
    id: "rack-008",
    name: "Rack D2",
    code: "RK-D2",
    description: "Spices and dry items rack",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily disabled",
    createdAt: "2025-07-03T07:00:00Z",
    updatedAt: "2025-07-03T07:00:00Z",
    draftedAt: "",
  },
  {
    id: "rack-009",
    name: "Rack E1",
    code: "RK-E1",
    description: "Packaged products rack",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Items relocated",
    createdAt: "2025-07-02T11:00:00Z",
    updatedAt: "2025-07-02T11:00:00Z",
    draftedAt: "",
  },
  {
    id: "rack-010",
    name: "Rack E2",
    code: "RK-E2",
    description: "Vegetable storage rack",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Created but not finalized",
    createdAt: "2025-07-04T09:20:00Z",
    updatedAt: "",
    draftedAt: "2025-07-04T09:20:00Z",
  },
  {
    id: "rack-011",
    name: "Rack F1",
    code: "RK-F1",
    description: "Spare rack for emergency use",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "No issues reported",
    createdAt: "2025-07-01T13:00:00Z",
    updatedAt: "2025-07-01T13:00:00Z",
    draftedAt: "",
  },
  {
    id: "rack-012",
    name: "Rack F2",
    code: "RK-F2",
    description: "Unused extra rack",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Not currently in use",
    createdAt: "2025-06-29T12:00:00Z",
    updatedAt: "2025-07-01T11:00:00Z",
    draftedAt: "",
  },
];

export default function ComponentLevelDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
}) {
  const componentColumns = [
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(listTableData.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "code",
      },
    },
    {
      accessorKey: "name",
      title: "Rack Name",
      options: [...new Set(listTableData.map((item) => item.name))],
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
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "name",
      },
    },

    {
      accessorKey: "description",
      title: "description",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: ["active", "inactive", "draft"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 80,
      meta: {
        exportLabel: "status",
      },
    },

    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("createdAt")
          .localeCompare(row2.getValue("createdAt"));
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("updatedAt")
          .localeCompare(row2.getValue("updatedAt"));
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("draftedAt")
          .localeCompare(row2.getValue("draftedAt"));
      },
    },
  ];

  const filteredData = listTableData.filter((item) => {
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={[]} // Pin country name column
    />
  );
}
