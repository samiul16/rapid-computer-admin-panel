/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockStates = [
  {
    code: "CA",
    State: "California",
    "Country name": "United States",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-01-10",
    draftedAt: "2023-01-05",
    updatedAt: "2023-06-15",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "TX",
    State: "Texas",
    "Country name": "United States",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-01-12",
    draftedAt: "2023-01-08",
    updatedAt: "2023-05-20",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "NY",
    State: "New York",
    "Country name": "United States",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: "2023-02-05",
    draftedAt: "2023-02-01",
    updatedAt: "2023-07-10",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "FL",
    State: "Florida",
    "Country name": "United States",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-02-15",
    draftedAt: "2023-02-10",
    updatedAt: "2023-06-25",
    deletedAt: null,
    isDeleted: false,
    status: "inactive",
  },
  {
    code: "ON",
    State: "Ontario",
    "Country name": "Canada",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-03-01",
    draftedAt: "2023-02-25",
    updatedAt: "2023-08-05",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "QC",
    State: "Quebec",
    "Country name": "Canada",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-03-10",
    draftedAt: "2023-03-05",
    updatedAt: "2023-07-18",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "NSW",
    State: "New South Wales",
    "Country name": "Australia",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-03-20",
    draftedAt: "2023-03-15",
    updatedAt: "2023-08-12",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "VIC",
    State: "Victoria",
    "Country name": "Australia",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: "2023-04-02",
    draftedAt: "2023-03-28",
    updatedAt: "2023-09-01",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "BY",
    State: "Bavaria",
    "Country name": "Germany",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-04-15",
    draftedAt: "2023-04-10",
    updatedAt: "2023-08-20",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "NRW",
    State: "North Rhine-Westphalia",
    "Country name": "Germany",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-05-05",
    draftedAt: "2023-05-01",
    updatedAt: "2023-09-15",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "MH",
    State: "Maharashtra",
    "Country name": "India",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-05-18",
    draftedAt: "2023-05-15",
    updatedAt: "2023-10-02",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "UP",
    State: "Uttar Pradesh",
    "Country name": "India",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: "2023-06-01",
    draftedAt: "2023-05-28",
    updatedAt: "2023-09-25",
    deletedAt: "2023-10-01",
    isDeleted: true,
    status: "draft",
  },
  {
    code: "SP",
    State: "São Paulo",
    "Country name": "Brazil",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-06-12",
    draftedAt: "2023-06-08",
    updatedAt: "2023-10-08",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    code: "RJ",
    State: "Rio de Janeiro",
    "Country name": "Brazil",
    isDefault: false,
    isActive: true,
    isDraft: true,
    createdAt: "2023-07-01",
    draftedAt: "2023-06-25",
    updatedAt: "2023-09-10",
    deletedAt: null,
    isDeleted: false,
    status: "draft",
  },
  {
    code: "TK",
    State: "Tokyo",
    "Country name": "Japan",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-07-15",
    draftedAt: "2023-07-12",
    updatedAt: "2023-07-20",
    deletedAt: null,
    isDeleted: false,
    status: "draft",
  },
];

export default function StatesDataTable({
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
      options: ["CA", "TX", "NY", "FL", "ON"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "State",
      title: "State Name",
      options: ["California", "Texas", "New York", "Florida", "Ontario"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("State").localeCompare(row2.getValue("State"));
      },
      size: 180,
      minSize: 120,
    },
    {
      accessorKey: "Country name",
      title: "Country",
      options: ["United States", "Canada"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("Country name")
          .localeCompare(row2.getValue("Country name"));
      },
      size: 150,
      minSize: 100,
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
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 130,
      minSize: 100,
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 130,
      minSize: 100,
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("draftedAt")).getTime() -
          new Date(row2.getValue("draftedAt")).getTime()
        );
      },
      size: 130,
      minSize: 100,
    },
  ];

  const filteredData = mockStates.filter((state) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return state.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return state.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return state.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return state.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return state.updatedAt !== state.createdAt;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={[]}
    />
  );
}
