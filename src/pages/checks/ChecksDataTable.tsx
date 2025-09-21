/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockChecks = [
  {
    id: "1",
    vendorName: "ABC Supplies Co.",
    date: "2024-01-15",
    bankAccount: "Chase Bank - 1234",
    amount: 1250.0,
    checkNumber: "CHK-001",
    status: "Cleared",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    vendorName: "XYZ Corporation",
    date: "2024-01-16",
    bankAccount: "Wells Fargo - 5678",
    amount: 875.5,
    checkNumber: "CHK-002",
    status: "Pending",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    vendorName: "Tech Solutions Inc.",
    date: "2024-01-17",
    bankAccount: "Bank of America - 9012",
    amount: 2100.75,
    checkNumber: "CHK-003",
    status: "Issued",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    vendorName: "Global Services Ltd.",
    date: "2024-01-18",
    bankAccount: "Citibank - 3456",
    amount: 675.25,
    checkNumber: "CHK-004",
    status: "Void",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    actionMessage: "2h",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    vendorName: "Premium Partners",
    date: "2024-01-19",
    bankAccount: "PNC Bank - 7890",
    amount: 1850.0,
    checkNumber: "CHK-005",
    status: "Cleared",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    vendorName: "Innovation Labs",
    date: "2024-01-20",
    bankAccount: "US Bank - 2345",
    amount: 3200.5,
    checkNumber: "CHK-006",
    status: "Pending",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    vendorName: "Elite Enterprises",
    date: "2024-01-21",
    bankAccount: "TD Bank - 6789",
    amount: 950.75,
    checkNumber: "CHK-007",
    status: "Issued",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    vendorName: "Strategic Solutions",
    date: "2024-01-22",
    bankAccount: "Capital One - 0123",
    amount: 1450.0,
    checkNumber: "CHK-008",
    status: "Cleared",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    vendorName: "NextGen Systems",
    date: "2024-01-23",
    bankAccount: "Regions Bank - 4567",
    amount: 2750.25,
    checkNumber: "CHK-009",
    status: "Pending",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    vendorName: "Peak Performance",
    date: "2024-01-24",
    bankAccount: "Fifth Third - 8901",
    amount: 1100.5,
    checkNumber: "CHK-010",
    status: "Issued",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    vendorName: "Summit Solutions",
    date: "2024-01-25",
    bankAccount: "KeyBank - 2345",
    amount: 1950.75,
    checkNumber: "CHK-011",
    status: "Cleared",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    vendorName: "Apex Industries",
    date: "2024-01-26",
    bankAccount: "BB&T - 6789",
    amount: 850.0,
    checkNumber: "CHK-012",
    status: "Pending",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    vendorName: "Dynamic Systems",
    date: "2024-01-27",
    bankAccount: "Chase Bank - 1111",
    amount: 1650.0,
    checkNumber: "CHK-013",
    status: "Cleared",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    vendorName: "Future Tech",
    date: "2024-01-28",
    bankAccount: "Wells Fargo - 2222",
    amount: 2250.5,
    checkNumber: "CHK-014",
    status: "Issued",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    vendorName: "Core Solutions",
    date: "2024-01-29",
    bankAccount: "Bank of America - 3333",
    amount: 1350.75,
    checkNumber: "CHK-015",
    status: "Pending",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    vendorName: "Prime Services",
    date: "2024-01-30",
    bankAccount: "Citibank - 4444",
    status: "Void",
    amount: 750.0,
    checkNumber: "CHK-016",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    actionMessage: "2h",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    vendorName: "Advanced Corp",
    date: "2024-01-31",
    bankAccount: "PNC Bank - 5555",
    amount: 2850.25,
    checkNumber: "CHK-017",
    status: "Cleared",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    vendorName: "Smart Solutions",
    date: "2024-02-01",
    bankAccount: "US Bank - 6666",
    amount: 1150.5,
    checkNumber: "CHK-018",
    status: "Issued",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    vendorName: "Elite Corp",
    date: "2024-02-02",
    bankAccount: "TD Bank - 7777",
    amount: 1950.0,
    checkNumber: "CHK-019",
    status: "Cleared",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    vendorName: "Global Tech",
    date: "2024-02-03",
    bankAccount: "Capital One - 8888",
    amount: 3250.75,
    checkNumber: "CHK-020",
    status: "Pending",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function ChecksDataTable({
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
  const canCreate = usePermission("checks", "create");

  const componentColumns = [
    {
      accessorKey: "vendorName",
      title: "Vendor Name",
      options: [...new Set(mockChecks.map((item) => item.vendorName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vendorName")
          .localeCompare(row2.getValue("vendorName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "vendorName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
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
          new Date(row1.getValue("date")).getTime() -
          new Date(row2.getValue("date")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "bankAccount",
      title: "Bank Account",
      options: [...new Set(mockChecks.map((item) => item.bankAccount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bankAccount")
          .localeCompare(row2.getValue("bankAccount"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "bankAccount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "amount",
      title: "Amount",
      options: [], // Amounts are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("amount") - row2.getValue("amount");
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "amount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "checkNumber",
      title: "Check Number",
      options: [...new Set(mockChecks.map((item) => item.checkNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("checkNumber")
          .localeCompare(row2.getValue("checkNumber"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "checkNumber",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockChecks.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "status",
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
      size: 150,
      minSize: 120,
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockChecks.filter((check) => {
    if (dataTableFilter.status === "Active") {
      return check.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !check.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return check.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return check.isUpdated;
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
      fixedColumns={["vendorName"]} // Pin vendor name column
      pathName="checks"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
