/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  name: string;
  code: string;
  region: string;
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
    id: "div-001",
    name: "Dhaka Division",
    code: "DHK",
    region: "Central",
    description: "Covers Dhaka and surrounding areas",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Division created",
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-01T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "div-002",
    name: "Chattogram Division",
    code: "CTG",
    region: "South-East",
    description: "Port city and coastal region",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Operational division",
    createdAt: "2025-07-02T10:00:00Z",
    updatedAt: "2025-07-02T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "div-003",
    name: "Rajshahi Division",
    code: "RAJ",
    region: "North-West",
    description: "Known for mango and silk",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily disabled",
    createdAt: "2025-07-01T11:00:00Z",
    updatedAt: "2025-07-01T11:00:00Z",
    draftedAt: "",
  },
  {
    id: "div-004",
    name: "Khulna Division",
    code: "KHL",
    region: "South-West",
    description: "Sundarbans and industrial areas",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated location zones",
    createdAt: "2025-07-01T12:00:00Z",
    updatedAt: "2025-07-03T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "div-005",
    name: "Barisal Division",
    code: "BAR",
    region: "South-Central",
    description: "Riverine and agriculture-based",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Draft saved",
    createdAt: "2025-07-02T08:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-02T08:00:00Z",
  },
  {
    id: "div-006",
    name: "Sylhet Division",
    code: "SYL",
    region: "North-East",
    description: "Tea gardens and hilly areas",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Enabled",
    createdAt: "2025-07-01T15:00:00Z",
    updatedAt: "2025-07-01T15:00:00Z",
    draftedAt: "",
  },
  {
    id: "div-007",
    name: "Rangpur Division",
    code: "RNG",
    region: "North",
    description: "Cold climate and rural agriculture",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated contact",
    createdAt: "2025-07-03T09:00:00Z",
    updatedAt: "2025-07-03T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "div-008",
    name: "Mymensingh Division",
    code: "MYM",
    region: "North-Central",
    description: "New division carved from Dhaka",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Paused temporarily",
    createdAt: "2025-06-30T09:00:00Z",
    updatedAt: "2025-07-01T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "div-009",
    name: "Comilla Division",
    code: "CML",
    region: "East",
    description: "Proposed division from Chattogram",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Under review",
    createdAt: "2025-07-03T11:30:00Z",
    updatedAt: "",
    draftedAt: "2025-07-03T11:30:00Z",
  },
  {
    id: "div-010",
    name: "Faridpur Division",
    code: "FRP",
    region: "Central-West",
    description: "Potential future division",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Drafted and pending",
    createdAt: "2025-07-03T12:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-03T12:00:00Z",
  },
  {
    id: "div-011",
    name: "Narayanganj Division",
    code: "NRG",
    region: "Dhaka Region",
    description: "Industrial belt near Dhaka",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated zoning",
    createdAt: "2025-07-01T16:00:00Z",
    updatedAt: "2025-07-04T08:00:00Z",
    draftedAt: "",
  },
  {
    id: "div-012",
    name: "Noakhali Division",
    code: "NKL",
    region: "Coastal East",
    description: "Proposed for better coastal management",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Pending cabinet approval",
    createdAt: "2025-07-01T14:00:00Z",
    updatedAt: "2025-07-01T14:00:00Z",
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
      accessorKey: "region",
      title: "Region",
      options: [...new Set(listTableData.map((item) => item.region))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("region").localeCompare(row2.getValue("region"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "region",
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
