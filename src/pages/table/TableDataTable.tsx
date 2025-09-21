/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockTables = [
  {
    id: "1",
    code: "T001",
    name: "VIP Table 1",
    person: "John Manager",
    location: "Main Hall - Section A",
    description: "Premium dining table for VIP guests with ocean view",
    photo: "",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
    status: "active",
  },
  {
    id: "2",
    code: "T002",
    name: "Family Table 2",
    person: "Sarah Williams",
    location: "Garden Area - Section B",
    description: "Large family table accommodating up to 8 people",
    photo: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
    status: "active",
  },
  {
    id: "3",
    code: "T003",
    name: "Romantic Corner Table",
    person: "Mike Johnson",
    location: "Terrace - Section C",
    description: "Intimate setting for couples with candle lighting",
    photo: "",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "4",
    code: "T004",
    name: "Business Meeting Table",
    person: "David Chen",
    location: "Private Room - Section D",
    description: "Professional setting for business meetings and presentations",
    photo: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
    status: "active",
  },
  {
    id: "5",
    code: "T005",
    name: "Chef's Special Table",
    person: "Emma Rodriguez",
    location: "Kitchen View - Section E",
    description: "Front row seat to watch chef's culinary artistry",
    photo: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
    status: "active",
  },
  {
    id: "6",
    code: "T006",
    name: "Outdoor Patio Table",
    person: "Robert Thompson",
    location: "Outdoor Patio - Section F",
    description: "Al fresco dining with fresh air and garden ambiance",
    photo: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isDeleted: false,
    status: "active",
  },
  {
    id: "7",
    code: "T007",
    name: "Bar Counter Table",
    person: "Lisa Anderson",
    location: "Bar Area - Section G",
    description: "High table perfect for cocktails and light bites",
    photo: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
    status: "active",
  },
  {
    id: "8",
    code: "T008",
    name: "Window Side Table",
    person: "Kevin Brown",
    location: "Window Side - Section H",
    description: "Bright table with natural lighting and street view",
    photo: "",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
    status: "inactive",
  },
  {
    id: "9",
    code: "T009",
    name: "Community Long Table",
    person: "Maria Garcia",
    location: "Community Area - Section I",
    description: "Shared dining experience for social gatherings",
    photo: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isDeleted: false,
    status: "active",
  },
  {
    id: "10",
    code: "T010",
    name: "Lounge Comfort Table",
    person: "James Wilson",
    location: "Lounge Area - Section J",
    description: "Relaxed seating with comfortable sofas and low tables",
    photo: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
];

export default function TablesDataTable({
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
      options: ["T001", "T002", "T003", "T004", "T005"],
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
      accessorKey: "name",
      title: "Table Name",
      options: [
        "VIP Table 1",
        "Family Table 2",
        "Romantic Corner Table",
        "Business Meeting Table",
        "Chef's Special Table",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "person",
      title: "Person",
      options: [
        "John Manager",
        "Sarah Williams",
        "Mike Johnson",
        "David Chen",
        "Emma Rodriguez",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("person").localeCompare(row2.getValue("person"));
      },
      size: 140,
      minSize: 120,
    },
    {
      accessorKey: "location",
      title: "Location",
      options: [
        "Main Hall - Section A",
        "Garden Area - Section B",
        "Terrace - Section C",
        "Private Room - Section D",
        "Kitchen View - Section E",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("location")
          .localeCompare(row2.getValue("location"));
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 250,
      minSize: 200,
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
      size: 100,
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

  const filteredData = mockTables.filter((table) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return table.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return table.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return table.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return table.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return table.updatedAt !== table.createdAt;
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
