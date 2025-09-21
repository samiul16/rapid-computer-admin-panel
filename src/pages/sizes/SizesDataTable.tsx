/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  name: string;
  code: string;
  value: string;
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
    id: "size-001",
    name: "Small",
    code: "S",
    value: "28x20 cm",
    description: "Standard small size",
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
    id: "size-002",
    name: "Medium",
    code: "M",
    value: "32x22 cm",
    description: "Standard medium size",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Used in men's category",
    createdAt: "2025-07-01T11:00:00Z",
    updatedAt: "2025-07-02T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "size-003",
    name: "Large",
    code: "L",
    value: "36x24 cm",
    description: "Standard large size",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated dimensions",
    createdAt: "2025-07-01T12:00:00Z",
    updatedAt: "2025-07-03T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "size-004",
    name: "Extra Large",
    code: "XL",
    value: "40x28 cm",
    description: "Larger than regular",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily disabled",
    createdAt: "2025-06-28T09:30:00Z",
    updatedAt: "2025-07-01T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "size-005",
    name: "Extra Small",
    code: "XS",
    value: "24x18 cm",
    description: "For children and small items",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Re-enabled",
    createdAt: "2025-07-02T10:15:00Z",
    updatedAt: "2025-07-02T10:15:00Z",
    draftedAt: "",
  },
  {
    id: "size-006",
    name: "Double XL",
    code: "XXL",
    value: "44x30 cm",
    description: "Biggest available size",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Saved as draft",
    createdAt: "2025-07-02T14:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-02T14:30:00Z",
  },
  {
    id: "size-007",
    name: "Kids Small",
    code: "KS",
    value: "20x15 cm",
    description: "Special size for toddlers",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Inactive due to low demand",
    createdAt: "2025-06-30T11:00:00Z",
    updatedAt: "2025-07-01T08:45:00Z",
    draftedAt: "",
  },
  {
    id: "size-008",
    name: "Universal Fit",
    code: "UNI",
    value: "Flexible",
    description: "Adjustable or stretchable fit",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Applied to accessories",
    createdAt: "2025-07-01T16:00:00Z",
    updatedAt: "2025-07-01T16:00:00Z",
    draftedAt: "",
  },
  {
    id: "size-009",
    name: "One Size",
    code: "ONE",
    value: "Fits All",
    description: "Used for hats and belts",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Added for accessories",
    createdAt: "2025-07-03T08:00:00Z",
    updatedAt: "2025-07-03T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "size-010",
    name: "Slim Fit",
    code: "SLIM",
    value: "Tailored",
    description: "Used in premium shirts",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Awaiting approval",
    createdAt: "2025-07-04T09:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-04T09:15:00Z",
  },
  {
    id: "size-011",
    name: "Plus Size",
    code: "PLUS",
    value: "48x34 cm",
    description: "Extended sizes for plus fit",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Recently updated",
    createdAt: "2025-06-29T10:00:00Z",
    updatedAt: "2025-07-02T13:00:00Z",
    draftedAt: "",
  },
  {
    id: "size-012",
    name: "Tall Fit",
    code: "TALL",
    value: "Longer Length",
    description: "Long fit for taller customers",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Deactivated for redesign",
    createdAt: "2025-06-27T11:00:00Z",
    updatedAt: "2025-07-01T09:00:00Z",
    draftedAt: "",
  },
];

export default function SizesDataTable({
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
      accessorKey: "value",
      title: "Value",
      options: [...new Set(listTableData.map((item) => item.value))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("value").localeCompare(row2.getValue("value"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "value",
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
