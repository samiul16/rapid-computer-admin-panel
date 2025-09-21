/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockAreas = [
  {
    code: "DT",
    Area: "Downtown",
    Country: "United States",
    State: "California",
    City: "Los Angeles",
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
    code: "UP",
    Area: "Uptown",
    Country: "United States",
    State: "New York",
    City: "New York City",
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
    code: "CT",
    Area: "Central",
    Country: "United States",
    State: "Texas",
    City: "Houston",
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
    code: "SB",
    Area: "South Beach",
    Country: "United States",
    State: "Florida",
    City: "Miami",
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
    code: "FD",
    Area: "Financial District",
    Country: "Canada",
    State: "Ontario",
    City: "Toronto",
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
    code: "OT",
    Area: "Old Town",
    Country: "Canada",
    State: "Quebec",
    City: "Montreal",
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
    code: "CB",
    Area: "Central Business District",
    Country: "Australia",
    State: "New South Wales",
    City: "Sydney",
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
    code: "ST",
    Area: "Southbank",
    Country: "Australia",
    State: "Victoria",
    City: "Melbourne",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: "2023-04-02",
    draftedAt: "2023-03-28",
    updatedAt: "2023-09-01",
    deletedAt: null,
    isDeleted: false,
    status: "draft",
  },
  {
    code: "MA",
    Area: "Marienplatz",
    Country: "Germany",
    State: "Bavaria",
    City: "Munich",
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
    code: "DU",
    Area: "Düsseldorf Altstadt",
    Country: "Germany",
    State: "North Rhine-Westphalia",
    City: "Düsseldorf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-05-05",
    draftedAt: "2023-05-01",
    updatedAt: "2023-09-15",
    deletedAt: null,
    isDeleted: false,
    status: "draft",
  },
];

export default function AreaDataTable({
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
      options: ["DT", "UP", "CT", "SB", "FD"],
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
      size: 80,
      minSize: 60,
    },
    {
      accessorKey: "Area",
      title: "Area Name",
      options: [
        "Downtown",
        "Uptown",
        "Central",
        "South Beach",
        "Financial District",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("Area").localeCompare(row2.getValue("Area"));
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "Country",
      title: "Country",
      options: ["United States", "Canada", "Australia", "Germany"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("Country").localeCompare(row2.getValue("Country"));
      },
      size: 140,
      minSize: 120,
    },
    {
      accessorKey: "State",
      title: "State",
      options: ["California", "New York", "Texas", "Florida", "Ontario"],
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
      size: 160,
      minSize: 120,
    },
    {
      accessorKey: "City",
      title: "City",
      options: ["Los Angeles", "New York City", "Houston", "Miami", "Toronto"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("City").localeCompare(row2.getValue("City"));
      },
      size: 150,
      minSize: 120,
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
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
  ];

  const filteredData = mockAreas.filter((area) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return area.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return area.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return area.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return area.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return area.updatedAt !== area.createdAt;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      componentColumns={componentColumns}
      viewMode={viewMode}
      setViewMode={setViewMode}
      fixedColumns={[]}
    />
  );
}
