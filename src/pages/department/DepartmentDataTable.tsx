/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockDepartments = [
  {
    Department: "Human Resources",
    Description: "Manages employee relations and recruitment",
    Manager: "Sarah Johnson",
    EmployeeCount: 12,
    Budget: 850000,
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    draftedAt: null,
    updatedAt: "2024-01-20",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    Department: "Finance",
    Description: "Handles financial planning and accounting",
    Manager: "Michael Chen",
    EmployeeCount: 8,
    Budget: 1200000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    draftedAt: null,
    updatedAt: "2024-01-21",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    Department: "Information Technology",
    Description: "Manages IT infrastructure and systems",
    Manager: "David Rodriguez",
    EmployeeCount: 25,
    Budget: 2100000,
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: "2024-01-17",
    draftedAt: "2024-01-17",
    updatedAt: "2024-01-22",
    deletedAt: null,
    isDeleted: false,
    status: "draft",
  },
  {
    Department: "Marketing",
    Description: "Handles brand promotion and advertising",
    Manager: "Emily Davis",
    EmployeeCount: 15,
    Budget: 950000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    draftedAt: null,
    updatedAt: "2024-01-23",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    Department: "Sales",
    Description: "Manages customer relationships and revenue",
    Manager: "James Wilson",
    EmployeeCount: 32,
    Budget: 1800000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    draftedAt: null,
    updatedAt: "2024-01-24",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    Department: "Operations",
    Description: "Manages day-to-day business operations",
    Manager: "Lisa Thompson",
    EmployeeCount: 18,
    Budget: 1100000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-20",
    draftedAt: null,
    updatedAt: "2024-01-25",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    Department: "Research & Development",
    Description: "Focuses on innovation and product development",
    Manager: "Robert Kim",
    EmployeeCount: 22,
    Budget: 3500000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-21",
    draftedAt: null,
    updatedAt: "2024-01-26",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    Department: "Legal",
    Description: "Handles legal compliance and contracts",
    Manager: "Amanda Foster",
    EmployeeCount: 6,
    Budget: 750000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-22",
    draftedAt: null,
    updatedAt: "2024-01-27",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    Department: "Customer Service",
    Description: "Provides support and assistance to customers",
    Manager: "Thomas Brown",
    EmployeeCount: 28,
    Budget: 1200000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-23",
    draftedAt: null,
    updatedAt: "2024-01-28",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
  {
    Department: "Quality Assurance",
    Description: "Ensures product and service quality standards",
    Manager: "Jennifer Lee",
    EmployeeCount: 14,
    Budget: 800000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    draftedAt: null,
    updatedAt: "2024-01-29",
    deletedAt: null,
    isDeleted: false,
    status: "active",
  },
];

export default function DepartmentDataTable({
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
      accessorKey: "Department",
      title: "Department Name",
      options: [
        "Human Resources",
        "Finance",
        "Information Technology",
        "Marketing",
        "Sales",
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
          .getValue("Department")
          .localeCompare(row2.getValue("Department"));
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "Manager",
      title: "Manager",
      options: [
        "Sarah Johnson",
        "Michael Chen",
        "David Rodriguez",
        "Emily Davis",
        "James Wilson",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("Manager").localeCompare(row2.getValue("Manager"));
      },
      size: 160,
      minSize: 120,
    },
    {
      accessorKey: "EmployeeCount",
      title: "Employees",
      options: [6, 8, 12, 14, 15, 16, 18, 22, 25, 28, 32],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("EmployeeCount") - row2.getValue("EmployeeCount");
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "Budget",
      title: "Budget",
      options: [
        500000, 600000, 750000, 800000, 850000, 900000, 950000, 1100000,
        1200000, 1400000, 1800000, 2100000, 3500000,
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("Budget") - row2.getValue("Budget");
      },
      size: 140,
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

  const filteredData = mockDepartments.filter((department) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return department.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return department.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return department.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return department.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return department.updatedAt !== department.createdAt;
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
