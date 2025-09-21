/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockUsers = [
  {
    name: "John Smith",
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
    name: "Sarah Johnson",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-01-12",
    draftedAt: "2023-01-08",
    updatedAt: "2023-05-20",
    deletedAt: null,
    isDeleted: false,
    status: "inactive",
  },
  {
    name: "Michael Brown",
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
    name: "Emily Davis",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-02-15",
    draftedAt: "2023-02-10",
    updatedAt: "2023-06-25",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    name: "David Wilson",
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
    name: "Lisa Anderson",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2023-03-10",
    draftedAt: "2023-03-05",
    updatedAt: "2023-07-18",
    deletedAt: null,
    isDeleted: false,
    status: "inactive",
  },
  {
    name: "Robert Taylor",
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
    name: "Jennifer Martinez",
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
    name: "Christopher Garcia",
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
    name: "Amanda Rodriguez",
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
];

export default function UserDataTable({
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
      accessorKey: "name",
      title: "Name",
      options: [
        "John Smith",
        "Sarah Johnson",
        "Michael Brown",
        "Emily Davis",
        "David Wilson",
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

  const filteredData = mockUsers.filter((user) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return user.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return user.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return user.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return user.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return user.updatedAt !== user.createdAt;
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
