/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockDesignations = [
  {
    Designation: "Chief Executive Officer",
    Description: "Overall strategic leadership and management",
    Department: "Executive",
    Level: "Executive",
    ReportsTo: "Board of Directors",
    EmployeeCount: 1,
    MinSalary: 200000,
    MaxSalary: 500000,
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
    Designation: "Human Resources Manager",
    Description: "Manages HR policies and employee relations",
    Department: "Human Resources",
    Level: "Manager",
    ReportsTo: "CEO",
    EmployeeCount: 2,
    MinSalary: 80000,
    MaxSalary: 120000,
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
    Designation: "Software Engineer",
    Description: "Develops and maintains software applications",
    Department: "Information Technology",
    Level: "Individual Contributor",
    ReportsTo: "IT Manager",
    EmployeeCount: 15,
    MinSalary: 70000,
    MaxSalary: 110000,
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
    Designation: "Marketing Specialist",
    Description: "Executes marketing campaigns and strategies",
    Department: "Marketing",
    Level: "Individual Contributor",
    ReportsTo: "Marketing Manager",
    EmployeeCount: 8,
    MinSalary: 50000,
    MaxSalary: 75000,
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
    Designation: "Sales Representative",
    Description: "Manages client relationships and sales",
    Department: "Sales",
    Level: "Individual Contributor",
    ReportsTo: "Sales Manager",
    EmployeeCount: 20,
    MinSalary: 45000,
    MaxSalary: 80000,
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
    Designation: "Operations Manager",
    Description: "Oversees daily business operations",
    Department: "Operations",
    Level: "Manager",
    ReportsTo: "CEO",
    EmployeeCount: 3,
    MinSalary: 85000,
    MaxSalary: 125000,
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
    Designation: "Research Scientist",
    Description: "Conducts research and development activities",
    Department: "Research & Development",
    Level: "Individual Contributor",
    ReportsTo: "R&D Manager",
    EmployeeCount: 12,
    MinSalary: 90000,
    MaxSalary: 140000,
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
    Designation: "Legal Counsel",
    Description: "Provides legal advice and compliance support",
    Department: "Legal",
    Level: "Individual Contributor",
    ReportsTo: "Legal Manager",
    EmployeeCount: 3,
    MinSalary: 100000,
    MaxSalary: 160000,
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
    Designation: "Customer Service Representative",
    Description: "Handles customer inquiries and support",
    Department: "Customer Service",
    Level: "Individual Contributor",
    ReportsTo: "Customer Service Manager",
    EmployeeCount: 18,
    MinSalary: 35000,
    MaxSalary: 50000,
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
    Designation: "Quality Assurance Analyst",
    Description: "Tests products and ensures quality standards",
    Department: "Quality Assurance",
    Level: "Individual Contributor",
    ReportsTo: "QA Manager",
    EmployeeCount: 8,
    MinSalary: 55000,
    MaxSalary: 80000,
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

export default function DesignationDataTable({
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
      accessorKey: "Designation",
      title: "Designation Name",
      options: [
        "Chief Executive Officer",
        "Human Resources Manager",
        "Software Engineer",
        "Marketing Specialist",
        "Sales Representative",
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
          .getValue("Designation")
          .localeCompare(row2.getValue("Designation"));
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "Department",
      title: "Department",
      options: [
        "Executive",
        "Human Resources",
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
      size: 160,
      minSize: 120,
    },
    {
      accessorKey: "Level",
      title: "Level",
      options: [
        "Executive",
        "Manager",
        "Individual Contributor",
        "Senior",
        "Lead",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("Level").localeCompare(row2.getValue("Level"));
      },
      size: 140,
      minSize: 100,
    },
    {
      accessorKey: "EmployeeCount",
      title: "Employees",
      options: [1, 2, 3, 8, 12, 15, 18, 20],
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
      accessorKey: "MinSalary",
      title: "Min Salary",
      options: [
        35000, 45000, 50000, 55000, 70000, 80000, 85000, 90000, 100000, 200000,
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("MinSalary") - row2.getValue("MinSalary");
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "MaxSalary",
      title: "Max Salary",
      options: [
        50000, 75000, 80000, 110000, 120000, 125000, 140000, 160000, 500000,
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("MaxSalary") - row2.getValue("MaxSalary");
      },
      size: 120,
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

  const filteredData = mockDesignations.filter((designation) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return designation.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return designation.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return designation.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return designation.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return designation.updatedAt !== designation.createdAt;
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
