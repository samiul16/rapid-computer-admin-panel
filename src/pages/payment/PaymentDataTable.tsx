/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockPayments = [
  {
    id: "1",
    invoiceType: "Commercial Invoice",
    currency: "USD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 15000.0,
    containerAmount: 12000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 3000.0,
    depositDate: "2024-01-15",
    exchangeRate: 1.0,
    localAmount: 15000.0,
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    invoiceType: "Proforma Invoice",
    currency: "EUR",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 25000.0,
    containerAmount: 20000.0,
    typeOfDeposit: "Letter of Credit",
    depositAmount: 5000.0,
    depositDate: "2024-01-16",
    exchangeRate: 1.1,
    localAmount: 27500.0,
    status: "active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    invoiceType: "Commercial Invoice",
    currency: "GBP",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 18000.0,
    containerAmount: 15000.0,
    typeOfDeposit: "Bank Guarantee",
    depositAmount: 3000.0,
    depositDate: "2024-01-17",
    exchangeRate: 1.3,
    localAmount: 23400.0,
    status: "active",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "20m",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    invoiceType: "Proforma Invoice",
    currency: "JPY",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 3000000.0,
    containerAmount: 2500000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 500000.0,
    depositDate: "2024-01-18",
    exchangeRate: 0.007,
    localAmount: 21000.0,
    status: "active",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: null,
    actionMessage: "15 Apr",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    invoiceType: "Commercial Invoice",
    currency: "CAD",
    paymentTerms: "Net 90",
    dueDays: 90,
    totalAmount: 35000.0,
    containerAmount: 28000.0,
    typeOfDeposit: "Standby Letter of Credit",
    depositAmount: 7000.0,
    depositDate: "2024-01-19",
    exchangeRate: 0.75,
    localAmount: 26250.0,
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    invoiceType: "Proforma Invoice",
    currency: "AUD",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 22000.0,
    containerAmount: 18000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 4000.0,
    depositDate: "2024-01-20",
    exchangeRate: 0.68,
    localAmount: 14960.0,
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    invoiceType: "Commercial Invoice",
    currency: "CHF",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 28000.0,
    containerAmount: 22000.0,
    typeOfDeposit: "Bank Guarantee",
    depositAmount: 6000.0,
    depositDate: "2024-01-21",
    exchangeRate: 1.15,
    localAmount: 32200.0,
    status: "active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    invoiceType: "Proforma Invoice",
    currency: "SGD",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 32000.0,
    containerAmount: 26000.0,
    typeOfDeposit: "Letter of Credit",
    depositAmount: 6000.0,
    depositDate: "2024-01-22",
    exchangeRate: 0.74,
    localAmount: 23680.0,
    status: "active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    invoiceType: "Commercial Invoice",
    currency: "HKD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 180000.0,
    containerAmount: 150000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 30000.0,
    depositDate: "2024-01-23",
    exchangeRate: 0.13,
    localAmount: 23400.0,
    status: "active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    invoiceType: "Proforma Invoice",
    currency: "NZD",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 26000.0,
    containerAmount: 21000.0,
    typeOfDeposit: "Standby Letter of Credit",
    depositAmount: 5000.0,
    depositDate: "2024-01-24",
    exchangeRate: 0.62,
    localAmount: 16120.0,
    status: "active",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    invoiceType: "Commercial Invoice",
    currency: "SEK",
    paymentTerms: "Net 90",
    dueDays: 90,
    totalAmount: 280000.0,
    containerAmount: 230000.0,
    typeOfDeposit: "Bank Guarantee",
    depositAmount: 50000.0,
    depositDate: "2024-01-25",
    exchangeRate: 0.095,
    localAmount: 26600.0,
    status: "inactive",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    invoiceType: "Proforma Invoice",
    currency: "NOK",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 240000.0,
    containerAmount: 200000.0,
    typeOfDeposit: "Letter of Credit",
    depositAmount: 40000.0,
    depositDate: "2024-01-26",
    exchangeRate: 0.098,
    localAmount: 23520.0,
    status: "active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    invoiceType: "Commercial Invoice",
    currency: "USD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 32000.0,
    containerAmount: 28000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 4000.0,
    depositDate: "2024-01-27",
    exchangeRate: 1.0,
    localAmount: 32000.0,
    status: "active",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    invoiceType: "Proforma Invoice",
    currency: "EUR",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 28000.0,
    containerAmount: 24000.0,
    typeOfDeposit: "Letter of Credit",
    depositAmount: 4000.0,
    depositDate: "2024-01-28",
    exchangeRate: 1.1,
    localAmount: 30800.0,
    status: "active",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    invoiceType: "Commercial Invoice",
    currency: "GBP",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 25000.0,
    containerAmount: 22000.0,
    typeOfDeposit: "Bank Guarantee",
    depositAmount: 3000.0,
    depositDate: "2024-01-29",
    exchangeRate: 1.3,
    localAmount: 32500.0,
    status: "active",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    invoiceType: "Proforma Invoice",
    currency: "JPY",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 3500000.0,
    containerAmount: 3000000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 500000.0,
    depositDate: "2024-01-30",
    exchangeRate: 0.007,
    localAmount: 24500.0,
    status: "active",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    invoiceType: "Commercial Invoice",
    currency: "CAD",
    paymentTerms: "Net 90",
    dueDays: 90,
    totalAmount: 40000.0,
    containerAmount: 35000.0,
    typeOfDeposit: "Standby Letter of Credit",
    depositAmount: 5000.0,
    depositDate: "2024-01-31",
    exchangeRate: 0.75,
    localAmount: 30000.0,
    status: "draft",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    invoiceType: "Proforma Invoice",
    currency: "AUD",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 30000.0,
    containerAmount: 25000.0,
    typeOfDeposit: "Advance Payment",
    depositAmount: 5000.0,
    depositDate: "2024-02-01",
    exchangeRate: 0.68,
    localAmount: 20400.0,
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    invoiceType: "Commercial Invoice",
    currency: "CHF",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 35000.0,
    containerAmount: 30000.0,
    typeOfDeposit: "Bank Guarantee",
    depositAmount: 5000.0,
    depositDate: "2024-02-02",
    exchangeRate: 1.15,
    localAmount: 40250.0,
    status: "active",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    invoiceType: "Proforma Invoice",
    currency: "SGD",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 38000.0,
    containerAmount: 32000.0,
    typeOfDeposit: "Letter of Credit",
    depositAmount: 6000.0,
    depositDate: "2024-02-03",
    exchangeRate: 0.74,
    localAmount: 28120.0,
    status: "inactive",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function PaymentDataTable({
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
  const canCreate = usePermission("payment", "create");

  const componentColumns = [
    {
      accessorKey: "invoiceType",
      title: "Invoice Type",
      options: [...new Set(mockPayments.map((item) => item.invoiceType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("invoiceType")
          .localeCompare(row2.getValue("invoiceType"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "invoiceType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(mockPayments.map((item) => item.currency))],
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
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "currency",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "paymentTerms",
      title: "Payment Terms",
      options: [...new Set(mockPayments.map((item) => item.paymentTerms))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("paymentTerms")
          .localeCompare(row2.getValue("paymentTerms"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "paymentTerms",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "totalAmount",
      title: "Total Amount",
      options: [...new Set(mockPayments.map((item) => item.totalAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("totalAmount") - row2.getValue("totalAmount");
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "totalAmount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "typeOfDeposit",
      title: "Deposit Type",
      options: [...new Set(mockPayments.map((item) => item.typeOfDeposit))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("typeOfDeposit")
          .localeCompare(row2.getValue("typeOfDeposit"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "typeOfDeposit",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "depositDate",
      title: "Deposit Date",
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
          new Date(row1.getValue("depositDate")).getTime() -
          new Date(row2.getValue("depositDate")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "depositDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "exchangeRate",
      title: "Exchange Rate",
      options: [...new Set(mockPayments.map((item) => item.exchangeRate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("exchangeRate") - row2.getValue("exchangeRate");
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "exchangeRate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "localAmount",
      title: "Local Amount",
      options: [...new Set(mockPayments.map((item) => item.localAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("localAmount") - row2.getValue("localAmount");
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "localAmount",
        readOnly: !canCreate,
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "createdAt",
        readOnly: true,
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId);
        if (!cellValue) return false;
        const dateValue = new Date(cellValue as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(dateValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = row1.getValue("draftedAt");
        const date2 = row2.getValue("draftedAt");
        if (!date1 && !date2) return 0;
        if (!date1) return 1;
        if (!date2) return -1;
        return new Date(date1).getTime() - new Date(date2).getTime();
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockPayments.filter((payment) => {
    if (dataTableFilter.status === "Active") {
      return payment.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !payment.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return payment.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return payment.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return payment.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["invoiceType"]} // Pin invoice type column
      pathName="payment"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
