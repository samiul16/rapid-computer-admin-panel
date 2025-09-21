/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockEmployees = [
  {
    employeeName: "John Smith",
    email: "john.smith@company.com",
    phone: "+1-555-0101",
    department: "Executive",
    designation: "Chief Executive Officer",
    salary: 200000,
    joiningDate: "2023-01-15",
    manager: "Board of Directors",
    location: "New York",
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
    employeeName: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1-555-0102",
    department: "Human Resources",
    designation: "HR Manager",
    salary: 85000,
    joiningDate: "2023-02-16",
    manager: "John Smith",
    location: "New York",
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
    employeeName: "Michael Davis",
    email: "michael.davis@company.com",
    phone: "+1-555-0103",
    department: "Information Technology",
    designation: "Software Engineer",
    salary: 75000,
    joiningDate: "2023-03-17",
    manager: "IT Manager",
    location: "San Francisco",
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
    employeeName: "Emily Wilson",
    email: "emily.wilson@company.com",
    phone: "+1-555-0104",
    department: "Marketing",
    designation: "Marketing Specialist",
    salary: 55000,
    joiningDate: "2023-04-18",
    manager: "Marketing Manager",
    location: "Los Angeles",
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
    employeeName: "David Brown",
    email: "david.brown@company.com",
    phone: "+1-555-0105",
    department: "Sales",
    designation: "Sales Representative",
    salary: 60000,
    joiningDate: "2023-05-19",
    manager: "Sales Manager",
    location: "Chicago",
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
    employeeName: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    phone: "+1-555-0106",
    department: "Operations",
    designation: "Operations Manager",
    salary: 90000,
    joiningDate: "2023-06-20",
    manager: "John Smith",
    location: "New York",
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
    employeeName: "Robert Taylor",
    email: "robert.taylor@company.com",
    phone: "+1-555-0107",
    department: "Research & Development",
    designation: "Research Scientist",
    salary: 95000,
    joiningDate: "2023-07-21",
    manager: "R&D Manager",
    location: "Boston",
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
    employeeName: "Jennifer Martinez",
    email: "jennifer.martinez@company.com",
    phone: "+1-555-0108",
    department: "Legal",
    designation: "Legal Counsel",
    salary: 110000,
    joiningDate: "2023-08-22",
    manager: "Legal Manager",
    location: "Washington DC",
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
    employeeName: "Christopher Lee",
    email: "christopher.lee@company.com",
    phone: "+1-555-0109",
    department: "Customer Service",
    designation: "Customer Service Rep",
    salary: 40000,
    joiningDate: "2023-09-23",
    manager: "Customer Service Manager",
    location: "Austin",
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
    employeeName: "Amanda Garcia",
    email: "amanda.garcia@company.com",
    phone: "+1-555-0110",
    department: "Quality Assurance",
    designation: "QA Analyst",
    salary: 65000,
    joiningDate: "2023-10-24",
    manager: "QA Manager",
    location: "Seattle",
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

export default function EmployeeDataTable({
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
      accessorKey: "employeeName",
      title: "Employee Name",
      options: [
        "John Smith",
        "Sarah Johnson",
        "Michael Davis",
        "Emily Wilson",
        "David Brown",
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
          .getValue("employeeName")
          .localeCompare(row2.getValue("employeeName"));
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [
        "john.smith@company.com",
        "sarah.johnson@company.com",
        "michael.davis@company.com",
        "emily.wilson@company.com",
        "david.brown@company.com",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: 220,
      minSize: 180,
    },
    {
      accessorKey: "department",
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
          .getValue("department")
          .localeCompare(row2.getValue("department"));
      },
      size: 160,
      minSize: 120,
    },
    {
      accessorKey: "designation",
      title: "Designation",
      options: [
        "Chief Executive Officer",
        "HR Manager",
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
          .getValue("designation")
          .localeCompare(row2.getValue("designation"));
      },
      size: 180,
      minSize: 140,
    },
    {
      accessorKey: "location",
      title: "Location",
      options: [
        "New York",
        "San Francisco",
        "Los Angeles",
        "Chicago",
        "Boston",
        "Washington DC",
        "Austin",
        "Seattle",
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
      size: 140,
      minSize: 100,
    },
    {
      accessorKey: "salary",
      title: "Salary",
      options: [
        40000, 55000, 60000, 65000, 75000, 85000, 90000, 95000, 110000, 200000,
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("salary") - row2.getValue("salary");
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "joiningDate",
      title: "Joining Date",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("joiningDate")).getTime() -
          new Date(row2.getValue("joiningDate")).getTime()
        );
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

  const filteredData = mockEmployees.filter((employee) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return employee.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return employee.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return employee.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return employee.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return employee.updatedAt !== employee.createdAt;
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
