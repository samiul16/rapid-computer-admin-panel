/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockCompanies = [
  {
    id: "1",
    code: "C001",
    name: "TechCorp Solutions",
    taxNumber: "TX123456789",
    phone: "+1-555-0101",
    email: "info@techcorp.com",
    website: "https://techcorp.com",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    currency: "USD",
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
    code: "C002",
    name: "Global Innovations Inc",
    taxNumber: "TX987654321",
    phone: "+1-555-0201",
    email: "contact@globalinnovations.com",
    website: "https://globalinnovations.com",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    currency: "CAD",
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
    code: "C003",
    name: "Tokyo Digital Works",
    taxNumber: "JP123456789",
    phone: "+81-3-1234-5678",
    email: "info@tokyodigital.jp",
    website: "https://tokyodigital.jp",
    country: "Japan",
    state: "Tokyo",
    city: "Tokyo",
    currency: "JPY",
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
    code: "C004",
    name: "Munich Engineering GmbH",
    taxNumber: "DE123456789",
    phone: "+49-89-1234567",
    email: "kontakt@municheng.de",
    website: "https://municheng.de",
    country: "Germany",
    state: "Bavaria",
    city: "Munich",
    currency: "EUR",
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
    code: "C005",
    name: "Paris Fashion House",
    taxNumber: "FR123456789",
    phone: "+33-1-23456789",
    email: "contact@parisfashion.fr",
    website: "https://parisfashion.fr",
    country: "France",
    state: "Ile-de-France",
    city: "Paris",
    currency: "EUR",
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
    code: "C006",
    name: "Milano Design Studio",
    taxNumber: "IT123456789",
    phone: "+39-02-12345678",
    email: "info@milanodesign.it",
    website: "https://milanodesign.it",
    country: "Italy",
    state: "Lombardy",
    city: "Milan",
    currency: "EUR",
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
    code: "C007",
    name: "Madrid Marketing Agency",
    taxNumber: "ES123456789",
    phone: "+34-91-1234567",
    email: "hola@madridmarketing.es",
    website: "https://madridmarketing.es",
    country: "Spain",
    state: "Madrid",
    city: "Madrid",
    currency: "EUR",
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
    code: "C008",
    name: "Porto Tech Solutions",
    taxNumber: "PT123456789",
    phone: "+351-22-1234567",
    email: "info@portotech.pt",
    website: "https://portotech.pt",
    country: "Portugal",
    state: "Porto",
    city: "Porto",
    currency: "EUR",
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
    code: "C009",
    name: "Zurich Financial Services",
    taxNumber: "CH123456789",
    phone: "+41-44-1234567",
    email: "contact@zurichfinancial.ch",
    website: "https://zurichfinancial.ch",
    country: "Switzerland",
    state: "Zurich",
    city: "Zurich",
    currency: "CHF",
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
    code: "C010",
    name: "Amsterdam Trade Co",
    taxNumber: "NL123456789",
    phone: "+31-20-1234567",
    email: "info@amsterdamtrade.nl",
    website: "https://amsterdamtrade.nl",
    country: "Netherlands",
    state: "North Holland",
    city: "Amsterdam",
    currency: "EUR",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
];

export default function CompaniesDataTable({
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
      options: ["C001", "C002", "C003", "C004", "C005"],
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
      title: "Company Name",
      options: [
        "TechCorp Solutions",
        "Global Innovations Inc",
        "Tokyo Digital Works",
        "Munich Engineering GmbH",
        "Paris Fashion House",
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
      accessorKey: "currency",
      title: "Currency",
      options: ["USD", "CAD", "JPY", "EUR", "CHF"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
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

  const filteredData = mockCompanies.filter((company) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return company.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return company.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return company.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return company.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return company.updatedAt !== company.createdAt;
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
