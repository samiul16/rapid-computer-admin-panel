/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockSalesmen = [
  {
    id: "1",
    code: "S001",
    name: "John Smith",
    description:
      "Senior sales representative specializing in enterprise clients",
    commission: 8.5,
    territory: "North Region",
    experience: "5+ years",
    department: "Enterprise Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0123",
    email: "john.smith@company.com",
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
    code: "S002",
    name: "Emily Rodriguez",
    description: "Retail sales specialist with excellent customer relations",
    commission: 7.2,
    territory: "South Region",
    experience: "3+ years",
    department: "Retail Sales",
    manager: "Mike Davis",
    phone: "+1-555-0124",
    email: "emily.rodriguez@company.com",
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
    code: "S003",
    name: "Michael Chen",
    description: "Tech-savvy sales rep focusing on digital solutions",
    commission: 9.0,
    territory: "West Region",
    experience: "4+ years",
    department: "Tech Sales",
    manager: "Lisa Wong",
    phone: "+1-555-0125",
    email: "michael.chen@company.com",
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
    code: "S004",
    name: "Sarah Williams",
    description: "Key account manager for premium clients",
    commission: 10.5,
    territory: "East Region",
    experience: "6+ years",
    department: "Key Accounts",
    manager: "Robert Brown",
    phone: "+1-555-0126",
    email: "sarah.williams@company.com",
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
    code: "S005",
    name: "David Thompson",
    description: "Regional sales coordinator with team leadership skills",
    commission: 8.8,
    territory: "Central Region",
    experience: "7+ years",
    department: "Regional Sales",
    manager: "Jennifer Lee",
    phone: "+1-555-0127",
    email: "david.thompson@company.com",
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
    code: "S006",
    name: "Jessica Martinez",
    description: "B2B sales specialist with strong negotiation skills",
    commission: 7.8,
    territory: "Southwest Region",
    experience: "4+ years",
    department: "B2B Sales",
    manager: "Tom Wilson",
    phone: "+1-555-0128",
    email: "jessica.martinez@company.com",
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
    code: "S007",
    name: "Alexander Kim",
    description: "Junior sales representative with high potential",
    commission: 6.5,
    territory: "Northwest Region",
    experience: "1+ year",
    department: "Junior Sales",
    manager: "Maria Garcia",
    phone: "+1-555-0129",
    email: "alexander.kim@company.com",
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
    code: "S008",
    name: "Amanda Taylor",
    description: "Online sales specialist focusing on e-commerce",
    commission: 7.0,
    territory: "Online Channel",
    experience: "3+ years",
    department: "E-commerce Sales",
    manager: "Kevin Anderson",
    phone: "+1-555-0130",
    email: "amanda.taylor@company.com",
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
    code: "S009",
    name: "Carlos Hernandez",
    description: "Bilingual sales rep serving Hispanic market segment",
    commission: 8.2,
    territory: "Hispanic Markets",
    experience: "5+ years",
    department: "Market Segments",
    manager: "Patricia White",
    phone: "+1-555-0131",
    email: "carlos.hernandez@company.com",
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
    code: "S010",
    name: "Rachel Green",
    description: "Corporate sales executive handling large contracts",
    commission: 11.0,
    territory: "Corporate Accounts",
    experience: "8+ years",
    department: "Corporate Sales",
    manager: "Steven Clark",
    phone: "+1-555-0132",
    email: "rachel.green@company.com",
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
    code: "S011",
    name: "James Moore",
    description: "Field sales representative covering rural territories",
    commission: 7.5,
    territory: "Rural Areas",
    experience: "6+ years",
    department: "Field Sales",
    manager: "Nancy Lewis",
    phone: "+1-555-0133",
    email: "james.moore@company.com",
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
    code: "S012",
    name: "Lisa Johnson",
    description: "Product specialist sales rep for technical solutions",
    commission: 9.5,
    territory: "Technical Markets",
    experience: "4+ years",
    department: "Product Sales",
    manager: "Daniel Miller",
    phone: "+1-555-0134",
    email: "lisa.johnson@company.com",
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
    code: "S013",
    name: "Mark Foster",
    description: "International sales representative for global markets",
    commission: 12.0,
    territory: "International",
    experience: "10+ years",
    department: "Global Sales",
    manager: "Christine Davis",
    phone: "+1-555-0135",
    email: "mark.foster@company.com",
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
    code: "S014",
    name: "Nicole Turner",
    description: "Channel sales manager coordinating with partners",
    commission: 8.0,
    territory: "Channel Partners",
    experience: "5+ years",
    department: "Channel Sales",
    manager: "Andrew Wilson",
    phone: "+1-555-0136",
    email: "nicole.turner@company.com",
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
    code: "S015",
    name: "Ryan Cooper",
    description: "Inside sales representative handling phone and online leads",
    commission: 6.8,
    territory: "Inside Sales",
    experience: "2+ years",
    department: "Inside Sales",
    manager: "Michelle Brown",
    phone: "+1-555-0137",
    email: "ryan.cooper@company.com",
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
    code: "S016",
    name: "Samantha Lee",
    description: "Government sales specialist for public sector contracts",
    commission: 9.8,
    territory: "Government Sector",
    experience: "7+ years",
    department: "Government Sales",
    manager: "Richard Taylor",
    phone: "+1-555-0138",
    email: "samantha.lee@company.com",
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
    code: "S017",
    name: "Trevor Scott",
    description: "Sales trainer and mentor for new team members",
    commission: 8.7,
    territory: "Training Division",
    experience: "9+ years",
    department: "Sales Training",
    manager: "Elizabeth Martinez",
    phone: "+1-555-0139",
    email: "trevor.scott@company.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isDeleted: false,
    status: "active",
  },
];

export default function SalesmanDataTable({
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
        "S001",
        "S002",
        "S003",
        "S004",
        "S005",
        "S006",
        "S007",
        "S008",
        "S009",
        "S010",
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
      accessorKey: "name",
      title: "Name",
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
      accessorKey: "commission",
      title: "Commission",
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
        return row1.getValue("commission") - row2.getValue("commission");
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "territory",
      title: "Territory",
      options: [
        "North Region",
        "South Region",
        "East Region",
        "West Region",
        "Central Region",
        "Southwest Region",
        "Northwest Region",
        "Online Channel",
        "Hispanic Markets",
        "Corporate Accounts",
        "Rural Areas",
        "Technical Markets",
        "International",
        "Channel Partners",
        "Inside Sales",
        "Government Sector",
        "Training Division",
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
          .getValue("territory")
          .localeCompare(row2.getValue("territory"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "experience",
      title: "Experience",
      options: [
        "1+ year",
        "2+ years",
        "3+ years",
        "4+ years",
        "5+ years",
        "6+ years",
        "7+ years",
        "8+ years",
        "9+ years",
        "10+ years",
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
          .getValue("experience")
          .localeCompare(row2.getValue("experience"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "department",
      title: "Department",
      options: [
        "Enterprise Sales",
        "Retail Sales",
        "Tech Sales",
        "Key Accounts",
        "Regional Sales",
        "B2B Sales",
        "Junior Sales",
        "E-commerce Sales",
        "Market Segments",
        "Corporate Sales",
        "Field Sales",
        "Product Sales",
        "Global Sales",
        "Channel Sales",
        "Inside Sales",
        "Government Sales",
        "Sales Training",
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
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "manager",
      title: "Manager",
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
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("manager").localeCompare(row2.getValue("manager"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "phone",
      title: "Phone",
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
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "email",
      title: "Email",
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

  const filteredData = mockSalesmen.filter((salesman) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return salesman.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return salesman.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return salesman.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return salesman.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return salesman.updatedAt !== salesman.createdAt;
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
