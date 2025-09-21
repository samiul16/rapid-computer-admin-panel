/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  name: string;
  code: string;
  hexCode: string;
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
    id: "color-001",
    name: "Red",
    code: "RED",
    hexCode: "#FF0000",
    description: "Primary red color used for danger or delete actions",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Activated successfully",
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "2025-07-01T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "color-002",
    name: "Green",
    code: "GREEN",
    hexCode: "#00FF00",
    description: "Used for success or active states",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Color updated",
    createdAt: "2025-07-01T11:00:00Z",
    updatedAt: "2025-07-02T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "color-003",
    name: "Blue",
    code: "BLUE",
    hexCode: "#0000FF",
    description: "Used for links or primary buttons",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Marked as inactive",
    createdAt: "2025-07-01T12:00:00Z",
    updatedAt: "2025-07-03T08:30:00Z",
    draftedAt: "",
  },
  {
    id: "color-004",
    name: "Yellow",
    code: "YELLOW",
    hexCode: "#FFFF00",
    description: "Used for warnings or highlights",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Draft saved",
    createdAt: "2025-07-02T10:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-02T10:30:00Z",
  },
  {
    id: "color-005",
    name: "Black",
    code: "BLACK",
    hexCode: "#000000",
    description: "Standard black used for text and background",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Enabled for default themes",
    createdAt: "2025-07-01T15:00:00Z",
    updatedAt: "2025-07-01T15:00:00Z",
    draftedAt: "",
  },
  {
    id: "color-006",
    name: "White",
    code: "WHITE",
    hexCode: "#FFFFFF",
    description: "Used for text or card background",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Used in all light themes",
    createdAt: "2025-07-03T09:00:00Z",
    updatedAt: "2025-07-03T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "color-007",
    name: "Orange",
    code: "ORANGE",
    hexCode: "#FFA500",
    description: "Used for attention or promo sections",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Deactivated manually",
    createdAt: "2025-06-30T08:00:00Z",
    updatedAt: "2025-07-01T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "color-008",
    name: "Purple",
    code: "PURPLE",
    hexCode: "#800080",
    description: "Brand accent color",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Still under review",
    createdAt: "2025-07-02T13:30:00Z",
    updatedAt: "",
    draftedAt: "2025-07-02T13:30:00Z",
  },
  {
    id: "color-009",
    name: "Gray",
    code: "GRAY",
    hexCode: "#808080",
    description: "Neutral color for disabled items",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Enabled by default",
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-01T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "color-010",
    name: "Pink",
    code: "PINK",
    hexCode: "#FFC0CB",
    description: "Optional theme color",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily disabled",
    createdAt: "2025-07-03T11:00:00Z",
    updatedAt: "2025-07-03T11:00:00Z",
    draftedAt: "",
  },
  {
    id: "color-011",
    name: "Teal",
    code: "TEAL",
    hexCode: "#008080",
    description: "Used in dashboard theme",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Color scheme updated",
    createdAt: "2025-06-28T12:00:00Z",
    updatedAt: "2025-07-02T14:00:00Z",
    draftedAt: "",
  },
  {
    id: "color-012",
    name: "Brown",
    code: "BROWN",
    hexCode: "#A52A2A",
    description: "Optional background for rustic theme",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Pending QA approval",
    createdAt: "2025-07-04T08:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-04T08:30:00Z",
  },
];

export default function ColorsDataTable({
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
      accessorKey: "hexCode",
      title: "Hex Code",
      options: [...new Set(listTableData.map((item) => item.hexCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("hexCode").localeCompare(row2.getValue("hexCode"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "hexCode",
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
