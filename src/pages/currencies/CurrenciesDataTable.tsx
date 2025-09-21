/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockCurrencies = [
  {
    id: "1",
    code: "USD",
    currency: "US Dollar",
    exchange: 1,
    symbol: "$",
    status: "active",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-01-01",
    updatedAt: "2024-01-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "2h",
  },
  {
    id: "2",
    code: "EUR",
    currency: "Euro",
    exchange: 1.09,
    symbol: "€",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-02-01",
    updatedAt: "2024-02-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr",
  },
  {
    id: "3",
    code: "GBP",
    currency: "British Pound",
    exchange: 1.27,
    symbol: "£",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-03-01",
    updatedAt: "2024-03-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "1d",
  },
  {
    id: "4",
    code: "JPY",
    currency: "Japanese Yen",
    exchange: 0.0069,
    symbol: "¥",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-04-01",
    updatedAt: "2024-04-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "3h",
  },
  {
    id: "5",
    code: "AUD",
    currency: "Australian Dollar",
    exchange: 0.67,
    symbol: "A$",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-05-01",
    updatedAt: "2024-05-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "5h",
  },
  {
    id: "6",
    code: "CAD",
    currency: "Canadian Dollar",
    exchange: 0.75,
    symbol: "C$",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-06-01",
    updatedAt: "2024-06-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "20m",
  },
  {
    id: "7",
    code: "CHF",
    currency: "Swiss Franc",
    exchange: 1.13,
    symbol: "CHF",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-07-01",
    updatedAt: "2024-07-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "1h",
  },
  {
    id: "8",
    code: "CNY",
    currency: "Chinese Yuan",
    exchange: 0.14,
    symbol: "¥",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-08-01",
    updatedAt: "2024-08-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2023",
  },
  {
    id: "9",
    code: "INR",
    currency: "Indian Rupee",
    exchange: 0.012,
    symbol: "₹",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-09-01",
    updatedAt: "2024-09-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "10",
    code: "BDT",
    currency: "Bangladeshi Taka",
    exchange: 0.0091,
    symbol: "৳",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-10-01",
    updatedAt: "2024-10-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "11",
    code: "SGD",
    currency: "Singapore Dollar",
    exchange: 0.74,
    symbol: "S$",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-11-01",
    updatedAt: "2024-11-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "12",
    code: "HKD",
    currency: "Hong Kong Dollar",
    exchange: 0.13,
    symbol: "HK$",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-12-01",
    updatedAt: "2024-12-01",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "13",
    code: "NZD",
    currency: "New Zealand Dollar",
    exchange: 0.61,
    symbol: "NZ$",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-01-15",
    updatedAt: "2024-01-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "14",
    code: "SEK",
    currency: "Swedish Krona",
    exchange: 0.093,
    symbol: "kr",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-02-15",
    updatedAt: "2024-02-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "15",
    code: "NOK",
    currency: "Norwegian Krone",
    exchange: 0.095,
    symbol: "kr",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-03-15",
    updatedAt: "2024-03-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "16",
    code: "DKK",
    currency: "Danish Krone",
    exchange: 0.15,
    symbol: "kr",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-04-15",
    updatedAt: "2024-04-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "17",
    code: "ZAR",
    currency: "South African Rand",
    exchange: 0.054,
    symbol: "R",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-05-15",
    updatedAt: "2024-05-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "18",
    code: "BRL",
    currency: "Brazilian Real",
    exchange: 0.19,
    symbol: "R$",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-06-15",
    updatedAt: "2024-06-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "19",
    code: "MXN",
    currency: "Mexican Peso",
    exchange: 0.058,
    symbol: "$",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-07-15",
    updatedAt: "2024-07-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "20",
    code: "RUB",
    currency: "Russian Ruble",
    exchange: 0.011,
    symbol: "₽",
    status: "inactive",
    isDefault: false,
    isActive: false,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-08-15",
    updatedAt: "2024-08-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "21",
    code: "TRY",
    currency: "Turkish Lira",
    exchange: 0.031,
    symbol: "₺",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-09-15",
    updatedAt: "2024-09-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "22",
    code: "THB",
    currency: "Thai Baht",
    exchange: 0.027,
    symbol: "฿",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-10-15",
    updatedAt: "2024-10-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "23",
    code: "KRW",
    currency: "South Korean Won",
    exchange: 0.00077,
    symbol: "₩",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-11-15",
    updatedAt: "2024-11-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "24",
    code: "IDR",
    currency: "Indonesian Rupiah",
    exchange: 6.5e-5,
    symbol: "Rp",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-12-15",
    updatedAt: "2024-12-15",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "25",
    code: "MYR",
    currency: "Malaysian Ringgit",
    exchange: 0.21,
    symbol: "RM",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-01-20",
    updatedAt: "2024-01-20",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "26",
    code: "PKR",
    currency: "Pakistani Rupee",
    exchange: 0.0036,
    symbol: "₨",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-02-20",
    updatedAt: "2024-02-20",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "27",
    code: "EGP",
    currency: "Egyptian Pound",
    exchange: 0.021,
    symbol: "£",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-03-20",
    updatedAt: "2024-03-20",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "28",
    code: "VND",
    currency: "Vietnamese Dong",
    exchange: 4.1e-5,
    symbol: "₫",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-04-20",
    updatedAt: "2024-04-20",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "29",
    code: "ILS",
    currency: "Israeli New Shekel",
    exchange: 0.27,
    symbol: "₪",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-05-20",
    updatedAt: "2024-05-20",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
  {
    id: "30",
    code: "AED",
    currency: "UAE Dirham",
    exchange: 0.27,
    symbol: "د.إ",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-06-20",
    updatedAt: "2024-06-20",
    draftedAt: null,
    deletedAt: null,
    actionMessage: "15 Apr 2024",
  },
];

export default function CurrenciesDataTable({
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
      options: [...new Set(mockCurrencies.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "Code",
      },
    },
    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(mockCurrencies.map((item) => item.currency))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("currency")
          .localeCompare(row2.getValue("currency"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "Currency",
      },
    },
    {
      accessorKey: "symbol",
      title: "Symbol",
      options: [...new Set(mockCurrencies.map((item) => item.symbol))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("symbol").localeCompare(row2.getValue("symbol"));
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "Symbol",
      },
    },
    {
      accessorKey: "exchange",
      title: "Exchange Rate",
      options: [], // Not using options for numeric values
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) =>
          cellValue.toString().includes(filterVal.toString())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("exchange") - row2.getValue("exchange");
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "Exchange Rate",
      },
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
        exportLabel: "Status",
      },
    },
    {
      accessorKey: "isDefault",
      title: "Default",
      options: [true, false],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          Number(row1.getValue("isDefault")) -
          Number(row2.getValue("isDefault"))
        );
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "Default",
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "Created At",
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "Updated At",
      },
    },
  ];

  const filteredData = mockCurrencies.filter((currency) => {
    if (dataTableFilter.status === "Active") {
      return currency.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !currency.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return currency.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return currency.isDeleted;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["code", "currency"]} // Pin code and currency columns
    />
  );
}
