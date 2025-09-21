/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockBranches = [
  {
    id: "1",
    code: "B001",
    name: "TechCorp Main Branch",
    taxNumber: "TX123456789",
    phone: "+1-555-0101",
    fax: "+1-555-0102",
    mobile: "+1-555-0103",
    email: "main@techcorp.com",
    website: "https://techcorp.com",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    address: "123 Main Street, LA",
    postCode: "90210",
    bankDetails: "Bank of America - 123456789",
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
    code: "B002",
    name: "Global Innovations Downtown",
    taxNumber: "TX987654321",
    phone: "+1-555-0201",
    fax: "+1-555-0202",
    mobile: "+1-555-0203",
    email: "downtown@globalinnovations.com",
    website: "https://globalinnovations.com",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    address: "456 Innovation Ave, Toronto",
    postCode: "M5V 3A8",
    bankDetails: "TD Bank - 987654321",
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
    code: "B003",
    name: "Tokyo Digital Shibuya Office",
    taxNumber: "JP123456789",
    phone: "+81-3-1234-5678",
    fax: "+81-3-1234-5679",
    mobile: "+81-90-1234-5678",
    email: "shibuya@tokyodigital.jp",
    website: "https://tokyodigital.jp",
    country: "Japan",
    state: "Tokyo",
    city: "Tokyo",
    address: "1-1-1 Shibuya, Tokyo",
    postCode: "150-0002",
    bankDetails: "Mizuho Bank - JP123456789",
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
    code: "B004",
    name: "Munich Engineering Central",
    taxNumber: "DE123456789",
    phone: "+49-89-1234567",
    fax: "+49-89-1234568",
    mobile: "+49-151-12345678",
    email: "central@municheng.de",
    website: "https://municheng.de",
    country: "Germany",
    state: "Bavaria",
    city: "Munich",
    address: "Marienplatz 1, Munich",
    postCode: "80331",
    bankDetails: "Deutsche Bank - DE123456789",
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
    code: "B005",
    name: "Paris Fashion Champs-Élysées",
    taxNumber: "FR123456789",
    phone: "+33-1-23456789",
    fax: "+33-1-23456790",
    mobile: "+33-6-12345678",
    email: "champselysees@parisfashion.fr",
    website: "https://parisfashion.fr",
    country: "France",
    state: "Ile-de-France",
    city: "Paris",
    address: "123 Champs-Élysées, Paris",
    postCode: "75008",
    bankDetails: "BNP Paribas - FR123456789",
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
    code: "B006",
    name: "Milano Design Via Montenapoleone",
    taxNumber: "IT123456789",
    phone: "+39-02-12345678",
    fax: "+39-02-12345679",
    mobile: "+39-320-1234567",
    email: "montenapoleone@milanodesign.it",
    website: "https://milanodesign.it",
    country: "Italy",
    state: "Lombardy",
    city: "Milan",
    address: "Via Montenapoleone 1, Milan",
    postCode: "20121",
    bankDetails: "UniCredit - IT123456789",
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
    code: "B007",
    name: "Madrid Marketing Gran Vía",
    taxNumber: "ES123456789",
    phone: "+34-91-1234567",
    fax: "+34-91-1234568",
    mobile: "+34-600-123456",
    email: "granvia@madridmarketing.es",
    website: "https://madridmarketing.es",
    country: "Spain",
    state: "Madrid",
    city: "Madrid",
    address: "Gran Vía 1, Madrid",
    postCode: "28013",
    bankDetails: "Santander - ES123456789",
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
    code: "B008",
    name: "Porto Tech Santa Catarina",
    taxNumber: "PT123456789",
    phone: "+351-22-1234567",
    fax: "+351-22-1234568",
    mobile: "+351-91-1234567",
    email: "santacatarina@portotech.pt",
    website: "https://portotech.pt",
    country: "Portugal",
    state: "Porto",
    city: "Porto",
    address: "Rua de Santa Catarina 1, Porto",
    postCode: "4000-447",
    bankDetails: "Millennium BCP - PT123456789",
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
    code: "B009",
    name: "Zurich Financial Bahnhofstrasse",
    taxNumber: "CH123456789",
    phone: "+41-44-1234567",
    fax: "+41-44-1234568",
    mobile: "+41-79-1234567",
    email: "bahnhofstrasse@zurichfinancial.ch",
    website: "https://zurichfinancial.ch",
    country: "Switzerland",
    state: "Zurich",
    city: "Zurich",
    address: "Bahnhofstrasse 1, Zurich",
    postCode: "8001",
    bankDetails: "UBS - CH123456789",
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
    code: "B010",
    name: "Amsterdam Trade Damrak Office",
    taxNumber: "NL123456789",
    phone: "+31-20-1234567",
    fax: "+31-20-1234568",
    mobile: "+31-6-12345678",
    email: "damrak@amsterdamtrade.nl",
    website: "https://amsterdamtrade.nl",
    country: "Netherlands",
    state: "North Holland",
    city: "Amsterdam",
    address: "Damrak 1, Amsterdam",
    postCode: "1012 LG",
    bankDetails: "ING Bank - NL123456789",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
];

export default function BranchesDataTable({
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
      options: ["B001", "B002", "B003", "B004", "B005"],
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
      title: "Branch Name",
      options: [
        "TechCorp Main Branch",
        "Global Innovations Downtown",
        "Tokyo Digital Shibuya Office",
        "Munich Engineering Central",
        "Paris Fashion Champs-Élysées",
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
      accessorKey: "taxNumber",
      title: "Tax Number",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "phone",
      title: "Phone",
      options: [],
      size: 140,
      minSize: 120,
    },
    {
      accessorKey: "country",
      title: "Country",
      options: ["United States", "Canada", "Japan", "Germany", "France"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: 140,
      minSize: 120,
    },
    {
      accessorKey: "city",
      title: "City",
      options: ["Los Angeles", "Toronto", "Tokyo", "Munich", "Paris"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("city").localeCompare(row2.getValue("city"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "postCode",
      title: "Post Code",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 100,
      minSize: 80,
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

  const filteredData = mockBranches.filter((branch) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return branch.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return branch.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return branch.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return branch.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return branch.updatedAt !== branch.createdAt;
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
