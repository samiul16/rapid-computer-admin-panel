/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  typeName: "Delivery" | "Pickup" | "Dine-in";
  description: string;
  customerId: string;
  requiresDeliveryman: boolean;

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
    id: "ot-001",
    typeName: "Delivery",
    description: "Home delivery service for online orders",
    customerId: "cus-001",
    requiresDeliveryman: true,
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Order type activated",
    createdAt: "2025-06-01T10:00:00Z",
    updatedAt: "2025-06-10T11:00:00Z",
    draftedAt: "",
  },
  {
    id: "ot-002",
    typeName: "Pickup",
    description: "Customer picks up order from store",
    customerId: "cus-002",
    requiresDeliveryman: false,
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Pickup instructions updated",
    createdAt: "2025-06-05T09:30:00Z",
    updatedAt: "2025-06-15T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "ot-003",
    typeName: "Dine-in",
    description: "Customers eat at the restaurant",
    customerId: "cus-003",
    requiresDeliveryman: false,
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily disabled dine-in",
    createdAt: "2025-05-25T08:00:00Z",
    updatedAt: "2025-06-01T08:30:00Z",
    draftedAt: "",
  },
  {
    id: "ot-004",
    typeName: "Delivery",
    description: "Express delivery for urgent items",
    customerId: "cus-004",
    requiresDeliveryman: true,
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Draft saved",
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-01T10:15:00Z",
  },
  {
    id: "ot-005",
    typeName: "Pickup",
    description: "Store pickup without queue",
    customerId: "cus-005",
    requiresDeliveryman: false,
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Enabled for all outlets",
    createdAt: "2025-06-12T13:00:00Z",
    updatedAt: "2025-06-14T14:00:00Z",
    draftedAt: "",
  },
  {
    id: "ot-006",
    typeName: "Dine-in",
    description: "Buffet-style dine-in service",
    customerId: "cus-006",
    requiresDeliveryman: false,
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Configuration in progress",
    createdAt: "2025-07-02T08:30:00Z",
    updatedAt: "",
    draftedAt: "2025-07-02T08:45:00Z",
  },
  {
    id: "ot-007",
    typeName: "Delivery",
    description: "Eco-friendly delivery by bike",
    customerId: "cus-007",
    requiresDeliveryman: true,
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated delivery terms",
    createdAt: "2025-05-20T11:30:00Z",
    updatedAt: "2025-06-10T11:45:00Z",
    draftedAt: "",
  },
  {
    id: "ot-008",
    typeName: "Pickup",
    customerId: "cus-008",
    description: "Pickup service for dine-in orders",
    requiresDeliveryman: false,
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily disabled for renovation",
    createdAt: "2025-06-01T09:00:00Z",
    updatedAt: "2025-06-05T09:15:00Z",
    draftedAt: "",
  },
  {
    id: "ot-009",
    typeName: "Dine-in",
    description: "Fine dining with reservations",
    customerId: "cus-009",
    requiresDeliveryman: false,
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Reservation feature added",
    createdAt: "2025-06-20T12:00:00Z",
    updatedAt: "2025-06-25T13:30:00Z",
    draftedAt: "",
  },
  {
    id: "ot-010",
    typeName: "Delivery",
    customerId: "cus-010",
    description: "Delivery service for dine-in orders",
    requiresDeliveryman: true,
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Service discontinued",
    createdAt: "2025-05-01T11:00:00Z",
    updatedAt: "2025-06-01T12:00:00Z",
    draftedAt: "",
  },
  {
    id: "ot-011",
    typeName: "Pickup",
    description: "Contactless pickup",
    customerId: "cus-011",
    requiresDeliveryman: false,
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Instructions updated",
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-01T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "ot-012",
    typeName: "Dine-in",
    description: "Self-service dine-in option",
    customerId: "cus-012",
    requiresDeliveryman: false,
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Waiting for approval",
    createdAt: "2025-07-03T15:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-03T15:30:00Z",
  },
];

export default function OrderTypeDataTable({
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
      accessorKey: "typeName",
      title: "Type Name",
      options: [...new Set(listTableData.map((item) => item.typeName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("typeName")
          .localeCompare(row2.getValue("typeName"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "typeName",
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(listTableData.map((item) => item.description))],
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
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "description",
      },
    },
    {
      accessorKey: "customerId",
      title: "Customer ID",
      options: [...new Set(listTableData.map((item) => item.customerId))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerId")
          .localeCompare(row2.getValue("customerId"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "customerId",
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
