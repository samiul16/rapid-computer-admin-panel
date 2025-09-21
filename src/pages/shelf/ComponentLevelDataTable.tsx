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
    id: "shelf-001",
    name: "Shelf A1",
    code: "SH-A1",
    description: "Main storage shelf near entrance",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Shelf initialized",
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-01T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "shelf-002",
    name: "Shelf A2",
    code: "SH-A2",
    description: "Second shelf beside A1",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated for rack expansion",
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "2025-07-02T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "shelf-003",
    name: "Shelf B1",
    code: "SH-B1",
    description: "Dry item storage shelf",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily disabled",
    createdAt: "2025-06-30T12:00:00Z",
    updatedAt: "2025-07-01T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "shelf-004",
    name: "Shelf B2",
    code: "SH-B2",
    description: "Empty shelf reserved for future use",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Drafted layout",
    createdAt: "2025-07-03T14:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-03T14:00:00Z",
  },
  {
    id: "shelf-005",
    name: "Shelf C1",
    code: "SH-C1",
    description: "Cold item storage compatible shelf",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Cooling items moved",
    createdAt: "2025-07-02T13:00:00Z",
    updatedAt: "2025-07-02T13:00:00Z",
    draftedAt: "",
  },
  {
    id: "shelf-006",
    name: "Shelf C2",
    code: "SH-C2",
    description: "Backup shelf for dry goods",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Reorganized by zone",
    createdAt: "2025-07-03T10:30:00Z",
    updatedAt: "2025-07-04T09:30:00Z",
    draftedAt: "",
  },
  {
    id: "shelf-007",
    name: "Shelf D1",
    code: "SH-D1",
    description: "Bakery ingredient shelf",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Setup complete",
    createdAt: "2025-07-03T09:00:00Z",
    updatedAt: "2025-07-03T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "shelf-008",
    name: "Shelf D2",
    code: "SH-D2",
    description: "Shelf reserved for staff use",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Not in use",
    createdAt: "2025-06-29T11:00:00Z",
    updatedAt: "2025-07-01T08:30:00Z",
    draftedAt: "",
  },
  {
    id: "shelf-009",
    name: "Shelf E1",
    code: "SH-E1",
    description: "Chemical and cleaning supply shelf",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Separated from food storage",
    createdAt: "2025-07-01T15:00:00Z",
    updatedAt: "2025-07-01T15:00:00Z",
    draftedAt: "",
  },
  {
    id: "shelf-010",
    name: "Shelf F1",
    code: "SH-F1",
    description: "Shelf for takeaway packaging supplies",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Awaiting layout approval",
    createdAt: "2025-07-04T08:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-04T08:00:00Z",
  },
  {
    id: "shelf-011",
    name: "Shelf G1",
    code: "SH-G1",
    description: "Shelf for frozen meats and seafood",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Linked with cold room",
    createdAt: "2025-07-03T11:00:00Z",
    updatedAt: "2025-07-03T11:00:00Z",
    draftedAt: "",
  },
  {
    id: "shelf-012",
    name: "Shelf H1",
    code: "SH-H1",
    description: "Emergency backup shelf for all-purpose",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Not yet configured",
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "2025-07-02T09:00:00Z",
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
      title: "Shelf Name",
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
