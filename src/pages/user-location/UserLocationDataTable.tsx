/* eslint-disable @typescript-eslint/no-explicit-any */

import UserLocationDataTableComponent from "./components/User-LocationDataTable";

const mockUserLocations = [
  {
    id: "1",
    name: "John Smith",
    totalCompanies: 5,
    totalBranches: 12,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    totalCompanies: 3,
    totalBranches: 8,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Michael Brown",
    totalCompanies: 7,
    totalBranches: 15,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Emily Davis",
    totalCompanies: 2,
    totalBranches: 6,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "David Wilson",
    totalCompanies: 4,
    totalBranches: 9,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    totalCompanies: 6,
    totalBranches: 11,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "7",
    name: "Robert Taylor",
    totalCompanies: 8,
    totalBranches: 18,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "8",
    name: "Jennifer Martinez",
    totalCompanies: 3,
    totalBranches: 7,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "9",
    name: "Christopher Garcia",
    totalCompanies: 9,
    totalBranches: 14,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "10",
    name: "Amanda Rodriguez",
    totalCompanies: 2,
    totalBranches: 5,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "11",
    name: "James Lopez",
    totalCompanies: 6,
    totalBranches: 13,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "12",
    name: "Michelle Gonzalez",
    totalCompanies: 4,
    totalBranches: 10,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "13",
    name: "Daniel Perez",
    totalCompanies: 7,
    totalBranches: 16,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "14",
    name: "Jessica Torres",
    totalCompanies: 3,
    totalBranches: 8,
    status: "active",
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "15",
    name: "Kevin Lee",
    totalCompanies: 5,
    totalBranches: 12,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "16",
    name: "Nicole White",
    totalCompanies: 8,
    totalBranches: 19,
    isDeleted: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

export default function UserLocationDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
  searchQuery,
  setShowExport,
  showExport,
  setShowFilter,
  showFilter,
  setShowVisibility,
  showVisibility,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
  searchQuery: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const componentColumns = [
    {
      accessorKey: "id",
      title: "ID",
      options: [...new Set(mockUserLocations.map((item) => item.id))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("id").localeCompare(row2.getValue("id"));
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "id",
        readOnly: true,
      },
    },
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockUserLocations.map((item) => item.name))],
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
      size: 300,
      minSize: 250,
      meta: {
        exportLabel: "name",
        readOnly: true,
      },
    },
    {
      accessorKey: "totalCompanies",
      title: "Total Companies",
      options: [
        ...new Set(mockUserLocations.map((item) => item.totalCompanies)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          row1.getValue("totalCompanies") - row2.getValue("totalCompanies")
        );
      },
      size: 220,
      minSize: 180,
      meta: {
        exportLabel: "totalCompanies",
        readOnly: true,
      },
    },
    {
      accessorKey: "totalBranches",
      title: "Total Branches",
      options: [
        ...new Set(mockUserLocations.map((item) => item.totalBranches)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("totalBranches") - row2.getValue("totalBranches");
      },
      size: 180,
      minSize: 140,
      meta: {
        exportLabel: "totalBranches",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockUserLocations.filter((location) => {
    if (dataTableFilter.status === "Active") {
      return location.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return location.status === "inactive";
    } else if (dataTableFilter.status === "Deleted") {
      return location.isDeleted;
    }
    return true;
  });

  return (
    <UserLocationDataTableComponent
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["id", "name"]}
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
