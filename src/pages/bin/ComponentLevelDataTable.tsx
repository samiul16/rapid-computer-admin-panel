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
    id: "bin-001",
    name: "Bin A1",
    code: "BN-A1",
    description: "Small dry item bin in Rack A1",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Ready to use",
    createdAt: "2025-07-10T08:00:00Z",
    updatedAt: "2025-07-10T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "bin-002",
    name: "Bin A2",
    code: "BN-A2",
    description: "Used for backup spice storage",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Relabeled for spices",
    createdAt: "2025-07-09T09:30:00Z",
    updatedAt: "2025-07-11T07:15:00Z",
    draftedAt: "",
  },
  {
    id: "bin-003",
    name: "Bin B1",
    code: "BN-B1",
    description: "Holds frozen chicken and fish",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Not connected to freezer",
    createdAt: "2025-07-08T11:45:00Z",
    updatedAt: "2025-07-10T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "bin-004",
    name: "Bin B2",
    code: "BN-B2",
    description: "Dry rice storage bin",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Full stock loaded",
    createdAt: "2025-07-07T12:00:00Z",
    updatedAt: "2025-07-07T12:00:00Z",
    draftedAt: "",
  },
  {
    id: "bin-005",
    name: "Bin C1",
    code: "BN-C1",
    description: "Oils and bottled goods storage",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Pending approval",
    createdAt: "2025-07-12T08:30:00Z",
    updatedAt: "",
    draftedAt: "2025-07-12T08:30:00Z",
  },
  {
    id: "bin-006",
    name: "Bin C2",
    code: "BN-C2",
    description: "Vegetables bin in rack D1",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Inventory updated",
    createdAt: "2025-07-11T10:10:00Z",
    updatedAt: "2025-07-13T07:50:00Z",
    draftedAt: "",
  },
  {
    id: "bin-007",
    name: "Bin D1",
    code: "BN-D1",
    description: "Bakery flour and yeast bin",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Stable contents",
    createdAt: "2025-07-10T09:00:00Z",
    updatedAt: "2025-07-10T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "bin-008",
    name: "Bin D2",
    code: "BN-D2",
    description: "Salt and sugar bin",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Unused due to humidity",
    createdAt: "2025-07-08T07:15:00Z",
    updatedAt: "2025-07-09T06:00:00Z",
    draftedAt: "",
  },
  {
    id: "bin-009",
    name: "Bin E1",
    code: "BN-E1",
    description: "New spices section in rack E2",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Added chili powder stock",
    createdAt: "2025-07-11T14:00:00Z",
    updatedAt: "2025-07-13T14:00:00Z",
    draftedAt: "",
  },
  {
    id: "bin-010",
    name: "Bin E2",
    code: "BN-E2",
    description: "Beans and legumes bin",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Awaiting stock confirmation",
    createdAt: "2025-07-13T10:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-13T10:00:00Z",
  },
  {
    id: "bin-011",
    name: "Bin F1",
    code: "BN-F1",
    description: "Cleaning supplies storage",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Checked and restocked",
    createdAt: "2025-07-10T15:30:00Z",
    updatedAt: "2025-07-10T15:30:00Z",
    draftedAt: "",
  },
  {
    id: "bin-012",
    name: "Bin F2",
    code: "BN-F2",
    description: "Unused bin marked for disposal",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Marked for removal",
    createdAt: "2025-07-07T16:00:00Z",
    updatedAt: "2025-07-09T09:00:00Z",
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
      title: "Bin Name",
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
