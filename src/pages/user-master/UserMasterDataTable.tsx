/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";
import { mockUserMasterData } from "@/mockData/userMaster-mockdata";

const mockUserMaster = mockUserMasterData.map((user) => ({
  code: user.code,
  name: user.name,
  State: user.state,
  "Country name": user.country,
  isDefault: user.isDefault,
  isActive: user.isActive,
  isDraft: user.isDraft,
  createdAt: user.createdAt
    ? typeof user.createdAt === "string"
      ? user.createdAt
      : user.createdAt.toISOString().slice(0, 10)
    : null,
  draftedAt: user.draftedAt
    ? typeof user.draftedAt === "string"
      ? user.draftedAt
      : user.draftedAt.toISOString().slice(0, 10)
    : null,
  updatedAt: user.updatedAt
    ? typeof user.updatedAt === "string"
      ? user.updatedAt
      : user.updatedAt.toISOString().slice(0, 10)
    : null,
  deletedAt: user.deletedAt
    ? typeof user.deletedAt === "string"
      ? user.deletedAt
      : user.deletedAt.toISOString().slice(0, 10)
    : null,
  isDeleted: user.isDeleted,
  status: user.status,
}));

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

  const filteredData = mockUserMaster.filter((user) => {
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
