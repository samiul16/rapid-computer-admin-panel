/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockPromotions = [
  {
    id: "1",
    code: "P001",
    employeeName: "John Smith",
    description: "Promotion to Senior Manager due to exceptional performance",
    fromPosition: "Manager",
    toPosition: "Senior Manager",
    fromDepartment: "Sales",
    toDepartment: "Sales",
    fromSalary: 75000,
    toSalary: 90000,
    promotionDate: "2024-01-15",
    effectiveDate: "2024-02-01",
    reason: "Outstanding sales performance and team leadership",
    approvedBy: "Sarah Johnson",
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
    code: "P002",
    employeeName: "Emily Rodriguez",
    description: "Cross-departmental promotion to Marketing Lead",
    fromPosition: "Sales Representative",
    toPosition: "Marketing Lead",
    fromDepartment: "Sales",
    toDepartment: "Marketing",
    fromSalary: 55000,
    toSalary: 70000,
    promotionDate: "2024-01-16",
    effectiveDate: "2024-02-15",
    reason: "Excellent customer relations and marketing insight",
    approvedBy: "Mike Davis",
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
    code: "P003",
    employeeName: "Michael Chen",
    description: "Technical promotion to Senior Developer",
    fromPosition: "Junior Developer",
    toPosition: "Senior Developer",
    fromDepartment: "IT",
    toDepartment: "IT",
    fromSalary: 60000,
    toSalary: 80000,
    promotionDate: "2024-01-17",
    effectiveDate: "2024-03-01",
    reason: "Outstanding technical skills and project leadership",
    approvedBy: "Lisa Wong",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "active",
  },
  {
    id: "4",
    code: "P004",
    employeeName: "Sarah Williams",
    description: "Promotion to Department Head",
    fromPosition: "Team Lead",
    toPosition: "Department Head",
    fromDepartment: "Customer Service",
    toDepartment: "Customer Service",
    fromSalary: 65000,
    toSalary: 85000,
    promotionDate: "2024-01-18",
    effectiveDate: "2024-02-20",
    reason: "Exceptional team management and customer satisfaction",
    approvedBy: "Robert Brown",
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
    code: "P005",
    employeeName: "David Thompson",
    description: "Regional promotion to District Manager",
    fromPosition: "Store Manager",
    toPosition: "District Manager",
    fromDepartment: "Operations",
    toDepartment: "Operations",
    fromSalary: 70000,
    toSalary: 95000,
    promotionDate: "2024-01-19",
    effectiveDate: "2024-03-15",
    reason: "Excellent regional performance and leadership skills",
    approvedBy: "Jennifer Lee",
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
    code: "P006",
    employeeName: "Jessica Martinez",
    description: "Promotion to Senior Accountant",
    fromPosition: "Accountant",
    toPosition: "Senior Accountant",
    fromDepartment: "Finance",
    toDepartment: "Finance",
    fromSalary: 55000,
    toSalary: 72000,
    promotionDate: "2024-01-20",
    effectiveDate: "2024-02-10",
    reason: "Outstanding financial analysis and reporting skills",
    approvedBy: "Tom Wilson",
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
    code: "P007",
    employeeName: "Alexander Kim",
    description: "Promotion to Product Manager",
    fromPosition: "Business Analyst",
    toPosition: "Product Manager",
    fromDepartment: "Product",
    toDepartment: "Product",
    fromSalary: 65000,
    toSalary: 85000,
    promotionDate: "2024-01-21",
    effectiveDate: "2024-03-01",
    reason: "Exceptional product vision and stakeholder management",
    approvedBy: "Maria Garcia",
    isDefault: false,
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "8",
    code: "P008",
    employeeName: "Amanda Taylor",
    description: "Cross-functional promotion to HR Manager",
    fromPosition: "HR Specialist",
    toPosition: "HR Manager",
    fromDepartment: "Human Resources",
    toDepartment: "Human Resources",
    fromSalary: 60000,
    toSalary: 80000,
    promotionDate: "2024-01-22",
    effectiveDate: "2024-02-20",
    reason: "Excellent employee relations and policy development",
    approvedBy: "Kevin Anderson",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
    status: "active",
  },
  {
    id: "9",
    code: "P009",
    employeeName: "Carlos Hernandez",
    description: "Technical promotion to Lead Developer",
    fromPosition: "Software Developer",
    toPosition: "Lead Developer",
    fromDepartment: "Engineering",
    toDepartment: "Engineering",
    fromSalary: 75000,
    toSalary: 95000,
    promotionDate: "2024-01-23",
    effectiveDate: "2024-03-15",
    reason: "Outstanding technical leadership and code quality",
    approvedBy: "Patricia White",
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
    code: "P010",
    employeeName: "Rachel Green",
    description: "Promotion to Director of Operations",
    fromPosition: "Operations Manager",
    toPosition: "Director of Operations",
    fromDepartment: "Operations",
    toDepartment: "Operations",
    fromSalary: 85000,
    toSalary: 110000,
    promotionDate: "2024-01-24",
    effectiveDate: "2024-04-01",
    reason: "Exceptional operational efficiency and team leadership",
    approvedBy: "Steven Clark",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
  {
    id: "11",
    code: "P011",
    employeeName: "James Moore",
    description: "Promotion to Senior Marketing Specialist",
    fromPosition: "Marketing Coordinator",
    toPosition: "Senior Marketing Specialist",
    fromDepartment: "Marketing",
    toDepartment: "Marketing",
    fromSalary: 50000,
    toSalary: 65000,
    promotionDate: "2024-01-25",
    effectiveDate: "2024-02-15",
    reason: "Outstanding campaign performance and creativity",
    approvedBy: "Nancy Lewis",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isDeleted: false,
    status: "active",
  },
  {
    id: "12",
    code: "P012",
    employeeName: "Lisa Johnson",
    description: "Promotion to Quality Assurance Lead",
    fromPosition: "QA Tester",
    toPosition: "QA Lead",
    fromDepartment: "Quality Assurance",
    toDepartment: "Quality Assurance",
    fromSalary: 55000,
    toSalary: 75000,
    promotionDate: "2024-01-26",
    effectiveDate: "2024-03-01",
    reason: "Excellent testing methodologies and team coordination",
    approvedBy: "Daniel Miller",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isDeleted: false,
    status: "active",
  },
  {
    id: "13",
    code: "P013",
    employeeName: "Mark Foster",
    description: "International promotion to Regional Director",
    fromPosition: "Country Manager",
    toPosition: "Regional Director",
    fromDepartment: "International",
    toDepartment: "International",
    fromSalary: 90000,
    toSalary: 120000,
    promotionDate: "2024-01-27",
    effectiveDate: "2024-04-15",
    reason: "Outstanding international market expansion",
    approvedBy: "Christine Davis",
    isDefault: false,
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "14",
    code: "P014",
    employeeName: "Nicole Turner",
    description: "Promotion to Customer Success Manager",
    fromPosition: "Customer Support Specialist",
    toPosition: "Customer Success Manager",
    fromDepartment: "Customer Service",
    toDepartment: "Customer Success",
    fromSalary: 45000,
    toSalary: 60000,
    promotionDate: "2024-01-28",
    effectiveDate: "2024-02-25",
    reason: "Exceptional customer satisfaction and retention",
    approvedBy: "Andrew Wilson",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isDeleted: false,
    status: "active",
  },
  {
    id: "15",
    code: "P015",
    employeeName: "Ryan Cooper",
    description: "Promotion to Senior Data Analyst",
    fromPosition: "Data Analyst",
    toPosition: "Senior Data Analyst",
    fromDepartment: "Analytics",
    toDepartment: "Analytics",
    fromSalary: 60000,
    toSalary: 78000,
    promotionDate: "2024-01-29",
    effectiveDate: "2024-03-10",
    reason: "Outstanding data insights and analytical skills",
    approvedBy: "Michelle Brown",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isDeleted: false,
    status: "active",
  },
  {
    id: "16",
    code: "P016",
    employeeName: "Samantha Lee",
    description: "Promotion to Legal Counsel",
    fromPosition: "Legal Assistant",
    toPosition: "Legal Counsel",
    fromDepartment: "Legal",
    toDepartment: "Legal",
    fromSalary: 55000,
    toSalary: 85000,
    promotionDate: "2024-01-30",
    effectiveDate: "2024-04-01",
    reason: "Outstanding legal expertise and contract management",
    approvedBy: "Richard Taylor",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isDeleted: false,
    status: "active",
  },
  {
    id: "17",
    code: "P017",
    employeeName: "Trevor Scott",
    description: "Promotion to Training Manager",
    fromPosition: "Training Coordinator",
    toPosition: "Training Manager",
    fromDepartment: "Learning & Development",
    toDepartment: "Learning & Development",
    fromSalary: 50000,
    toSalary: 70000,
    promotionDate: "2024-01-31",
    effectiveDate: "2024-03-01",
    reason: "Excellent training program development and delivery",
    approvedBy: "Elizabeth Martinez",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isDeleted: false,
    status: "active",
  },
  {
    id: "18",
    code: "P018",
    employeeName: "Victoria Chen",
    description: "Promotion to Senior UX Designer",
    fromPosition: "UX Designer",
    toPosition: "Senior UX Designer",
    fromDepartment: "Design",
    toDepartment: "Design",
    fromSalary: 65000,
    toSalary: 85000,
    promotionDate: "2024-02-01",
    effectiveDate: "2024-03-15",
    reason: "Outstanding user experience design and research",
    approvedBy: "Jason Rodriguez",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    isDeleted: false,
    status: "active",
  },
  {
    id: "19",
    code: "P019",
    employeeName: "Brandon Wilson",
    description: "Promotion to Security Manager",
    fromPosition: "Security Analyst",
    toPosition: "Security Manager",
    fromDepartment: "Information Security",
    toDepartment: "Information Security",
    fromSalary: 70000,
    toSalary: 90000,
    promotionDate: "2024-02-02",
    effectiveDate: "2024-04-01",
    reason: "Exceptional security protocols and incident response",
    approvedBy: "Ashley Thompson",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    isDeleted: false,
    status: "active",
  },
  {
    id: "20",
    code: "P020",
    employeeName: "Sophia Rodriguez",
    description: "Promotion to Senior Research Analyst",
    fromPosition: "Research Analyst",
    toPosition: "Senior Research Analyst",
    fromDepartment: "Research & Development",
    toDepartment: "Research & Development",
    fromSalary: 60000,
    toSalary: 80000,
    promotionDate: "2024-02-03",
    effectiveDate: "2024-03-20",
    reason: "Outstanding research methodology and innovation",
    approvedBy: "Christopher Lee",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    isDeleted: false,
    status: "active",
  },
];

export default function PromotionDataTable({
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
      options: [
        "P001",
        "P002",
        "P003",
        "P004",
        "P005",
        "P006",
        "P007",
        "P008",
        "P009",
        "P010",
        "P011",
        "P012",
        "P013",
        "P014",
        "P015",
        "P016",
        "P017",
        "P018",
        "P019",
        "P020",
      ],
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
      accessorKey: "employeeName",
      title: "Employee Name",
      options: [
        "John Smith",
        "Emily Rodriguez",
        "Michael Chen",
        "Sarah Williams",
        "David Thompson",
        "Jessica Martinez",
        "Alexander Kim",
        "Amanda Taylor",
        "Carlos Hernandez",
        "Rachel Green",
        "James Moore",
        "Lisa Johnson",
        "Mark Foster",
        "Nicole Turner",
        "Ryan Cooper",
        "Samantha Lee",
        "Trevor Scott",
        "Victoria Chen",
        "Brandon Wilson",
        "Sophia Rodriguez",
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
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 250,
      minSize: 200,
    },
    {
      accessorKey: "fromPosition",
      title: "From Position",
      options: [
        "Manager",
        "Sales Representative",
        "Junior Developer",
        "Team Lead",
        "Store Manager",
        "Accountant",
        "Business Analyst",
        "HR Specialist",
        "Software Developer",
        "Operations Manager",
        "Marketing Coordinator",
        "QA Tester",
        "Country Manager",
        "Customer Support Specialist",
        "Data Analyst",
        "Legal Assistant",
        "Training Coordinator",
        "UX Designer",
        "Security Analyst",
        "Research Analyst",
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
          .getValue("fromPosition")
          .localeCompare(row2.getValue("fromPosition"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "toPosition",
      title: "To Position",
      options: [
        "Senior Manager",
        "Marketing Lead",
        "Senior Developer",
        "Department Head",
        "District Manager",
        "Senior Accountant",
        "Product Manager",
        "HR Manager",
        "Lead Developer",
        "Director of Operations",
        "Senior Marketing Specialist",
        "QA Lead",
        "Regional Director",
        "Customer Success Manager",
        "Senior Data Analyst",
        "Legal Counsel",
        "Training Manager",
        "Senior UX Designer",
        "Security Manager",
        "Senior Research Analyst",
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
          .getValue("toPosition")
          .localeCompare(row2.getValue("toPosition"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "fromDepartment",
      title: "From Department",
      options: [
        "Sales",
        "IT",
        "Customer Service",
        "Operations",
        "Finance",
        "Product",
        "Human Resources",
        "Engineering",
        "Marketing",
        "Quality Assurance",
        "International",
        "Customer Success",
        "Analytics",
        "Legal",
        "Learning & Development",
        "Design",
        "Information Security",
        "Research & Development",
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
          .getValue("fromDepartment")
          .localeCompare(row2.getValue("fromDepartment"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "toDepartment",
      title: "To Department",
      options: [
        "Sales",
        "Marketing",
        "IT",
        "Customer Service",
        "Operations",
        "Finance",
        "Product",
        "Human Resources",
        "Engineering",
        "Quality Assurance",
        "International",
        "Customer Success",
        "Analytics",
        "Legal",
        "Learning & Development",
        "Design",
        "Information Security",
        "Research & Development",
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
          .getValue("toDepartment")
          .localeCompare(row2.getValue("toDepartment"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "fromSalary",
      title: "From Salary",
      options: [],
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
        return row1.getValue("fromSalary") - row2.getValue("fromSalary");
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "toSalary",
      title: "To Salary",
      options: [],
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
        return row1.getValue("toSalary") - row2.getValue("toSalary");
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "promotionDate",
      title: "Promotion Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("promotionDate")).getTime() -
          new Date(row2.getValue("promotionDate")).getTime()
        );
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "effectiveDate",
      title: "Effective Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("effectiveDate")).getTime() -
          new Date(row2.getValue("effectiveDate")).getTime()
        );
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "reason",
      title: "Reason",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "approvedBy",
      title: "Approved By",
      options: [
        "Sarah Johnson",
        "Mike Davis",
        "Lisa Wong",
        "Robert Brown",
        "Jennifer Lee",
        "Tom Wilson",
        "Maria Garcia",
        "Kevin Anderson",
        "Patricia White",
        "Steven Clark",
        "Nancy Lewis",
        "Daniel Miller",
        "Christine Davis",
        "Andrew Wilson",
        "Michelle Brown",
        "Richard Taylor",
        "Elizabeth Martinez",
        "Jason Rodriguez",
        "Ashley Thompson",
        "Christopher Lee",
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
          .getValue("approvedBy")
          .localeCompare(row2.getValue("approvedBy"));
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
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
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
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
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

  const filteredData = mockPromotions.filter((promotion) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return promotion.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return promotion.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return promotion.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return promotion.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return promotion.updatedAt !== promotion.createdAt;
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
