/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  name: string;
  code: string;
  type: "Kitchen" | "Dining" | "POS" | "Bar" | "Inventory";
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
    id: "section-001",
    name: "Main Kitchen",
    code: "KT-MAIN",
    type: "Kitchen",
    description: "Handles all primary food preparation",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Section enabled",
    createdAt: "2025-07-01T08:00:00Z",
    updatedAt: "2025-07-01T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "section-002",
    name: "Grill Kitchen",
    code: "KT-GRILL",
    type: "Kitchen",
    description: "Dedicated for grilled food items",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated grill layout",
    createdAt: "2025-07-02T10:00:00Z",
    updatedAt: "2025-07-03T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "section-003",
    name: "Dining Area A",
    code: "DIN-A",
    type: "Dining",
    description: "Main dining area on ground floor",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily closed for cleaning",
    createdAt: "2025-06-30T08:30:00Z",
    updatedAt: "2025-07-01T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "section-004",
    name: "Dining Area B",
    code: "DIN-B",
    type: "Dining",
    description: "VIP seating arrangement",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Ready for guests",
    createdAt: "2025-07-01T12:00:00Z",
    updatedAt: "2025-07-01T12:00:00Z",
    draftedAt: "",
  },
  {
    id: "section-005",
    name: "POS Front Desk",
    code: "POS-FD",
    type: "POS",
    description: "Main billing and order placement point",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Waiting for approval",
    createdAt: "2025-07-02T13:30:00Z",
    updatedAt: "",
    draftedAt: "2025-07-02T13:30:00Z",
  },
  {
    id: "section-006",
    name: "POS Takeaway",
    code: "POS-TK",
    type: "POS",
    description: "Billing section for takeaway orders",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Connected with takeaway counter",
    createdAt: "2025-07-03T08:00:00Z",
    updatedAt: "2025-07-03T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "section-007",
    name: "Main Bar",
    code: "BAR-MN",
    type: "Bar",
    description: "Cocktail and beverage preparation area",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Renovation in progress",
    createdAt: "2025-06-29T09:00:00Z",
    updatedAt: "2025-07-01T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "section-008",
    name: "VIP Bar Lounge",
    code: "BAR-VIP",
    type: "Bar",
    description: "Premium drinks and service section",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "New menu added",
    createdAt: "2025-07-03T09:00:00Z",
    updatedAt: "2025-07-04T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "section-009",
    name: "Dry Inventory Storage",
    code: "INV-DRY",
    type: "Inventory",
    description: "Stores all dry ingredients and supplies",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Inventory synced",
    createdAt: "2025-07-01T14:00:00Z",
    updatedAt: "2025-07-01T14:00:00Z",
    draftedAt: "",
  },
  {
    id: "section-010",
    name: "Cold Inventory",
    code: "INV-COLD",
    type: "Inventory",
    description: "Frozen and refrigerated stock area",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Drafted for review",
    createdAt: "2025-07-04T08:30:00Z",
    updatedAt: "",
    draftedAt: "2025-07-04T08:30:00Z",
  },
  {
    id: "section-011",
    name: "Bakery Kitchen",
    code: "KT-BAKE",
    type: "Kitchen",
    description: "Section for baking breads and desserts",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Operational with new oven",
    createdAt: "2025-07-03T10:00:00Z",
    updatedAt: "2025-07-03T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "section-012",
    name: "Family Dining Zone",
    code: "DIN-FAM",
    type: "Dining",
    description: "Dedicated area for families with kids",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Play zone added",
    createdAt: "2025-07-02T11:30:00Z",
    updatedAt: "2025-07-03T12:00:00Z",
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
      title: "Division Name",
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
      accessorKey: "type",
      title: "Type",
      options: [...new Set(listTableData.map((item) => item.type))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("type").localeCompare(row2.getValue("type"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "type",
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
