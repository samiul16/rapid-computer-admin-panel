/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  code: string;
  name: string;
  location: string;
  manager: string;
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
    id: "wh-001",
    name: "Main Storage",
    code: "MAIN-ST",
    location: "Dhaka, Bangladesh",
    manager: "Jamil Ahmed",
    description: "Central warehouse for all supplies",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Activated successfully",
    createdAt: "2025-07-01T08:00:00Z",
    updatedAt: "2025-07-01T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "wh-002",
    name: "Kitchen Warehouse",
    code: "KIT-WH",
    location: "Gulshan, Dhaka",
    manager: "Sonia Hossain",
    description: "Stores perishable kitchen items",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "In use",
    createdAt: "2025-07-02T10:30:00Z",
    updatedAt: "2025-07-02T10:30:00Z",
    draftedAt: "",
  },
  {
    id: "wh-003",
    name: "Dry Goods Storage",
    code: "DRY-GDS",
    location: "Chattogram",
    manager: "Arifur Rahman",
    description: "Non-perishable and dry items",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated location",
    createdAt: "2025-07-01T12:00:00Z",
    updatedAt: "2025-07-03T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "wh-004",
    name: "Cold Storage",
    code: "COLD-ST",
    location: "Bashundhara, Dhaka",
    manager: "Nusrat Jahan",
    description: "Frozen items storage",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily closed",
    createdAt: "2025-06-30T09:00:00Z",
    updatedAt: "2025-07-01T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "wh-005",
    name: "Outlet Warehouse - Banani",
    code: "OUT-BAN",
    location: "Banani, Dhaka",
    manager: "Shuvo Malik",
    description: "Linked to Banani branch",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Operational",
    createdAt: "2025-07-02T14:00:00Z",
    updatedAt: "2025-07-02T14:00:00Z",
    draftedAt: "",
  },
  {
    id: "wh-006",
    name: "Packaging Storage",
    code: "PKG-ST",
    location: "Uttara, Dhaka",
    manager: "Sajib Hossain",
    description: "Packaging boxes and disposables",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Draft saved",
    createdAt: "2025-07-03T11:30:00Z",
    updatedAt: "",
    draftedAt: "2025-07-03T11:45:00Z",
  },
  {
    id: "wh-007",
    name: "Bakery Ingredients Storage",
    code: "BAKERY-ING",
    location: "Dhanmondi",
    manager: "Tanvir Hasan",
    description: "Special section for bakery",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Inventory synced",
    createdAt: "2025-06-29T10:00:00Z",
    updatedAt: "2025-06-29T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "wh-008",
    name: "Meat Storage",
    code: "MEAT-ST",
    location: "Mirpur, Dhaka",
    manager: "Kazi Anik",
    description: "Chilled and frozen meats",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Refrigerator maintenance",
    createdAt: "2025-07-01T15:00:00Z",
    updatedAt: "2025-07-01T15:00:00Z",
    draftedAt: "",
  },
  {
    id: "wh-009",
    name: "Beverage Storage",
    code: "BEV-ST",
    location: "Mohakhali",
    manager: "Farzana Akter",
    description: "Sodas, water, and juices",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Stock updated",
    createdAt: "2025-07-03T10:00:00Z",
    updatedAt: "2025-07-03T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "wh-010",
    name: "Outlet Warehouse - Dhanmondi",
    code: "OUT-DHN",
    location: "Dhanmondi, Dhaka",
    manager: "Afsana Nipa",
    description: "Supports Dhanmondi restaurant",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Not finalized yet",
    createdAt: "2025-07-04T09:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-04T09:00:00Z",
  },
  {
    id: "wh-011",
    name: "Spice Storage",
    code: "SPICE-ST",
    location: "Malibagh",
    manager: "Imran Hossain",
    description: "Handles dry spices in bulk",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Checked and verified",
    createdAt: "2025-07-03T08:00:00Z",
    updatedAt: "2025-07-03T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "wh-012",
    name: "Online Order Fulfillment Center",
    code: "ONLINE-FUL",
    location: "Tejgaon",
    manager: "Jubayer Rahman",
    description: "Dispatch for online food orders",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Recently upgraded",
    createdAt: "2025-07-01T13:00:00Z",
    updatedAt: "2025-07-04T10:00:00Z",
    draftedAt: "",
  },
];

export default function WarehouseDataTable({
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
      title: "Name",
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
      accessorKey: "location",
      title: "Location",
      options: [...new Set(listTableData.map((item) => item.location))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("location")
          .localeCompare(row2.getValue("location"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "location",
      },
    },
    {
      accessorKey: "manager",
      title: "Manager",
      options: [...new Set(listTableData.map((item) => item.manager))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("manager").localeCompare(row2.getValue("manager"));
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
