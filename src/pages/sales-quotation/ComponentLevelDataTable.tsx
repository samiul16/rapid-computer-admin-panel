/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  documentNumber: string;
  customer: string;
  quotationNumber: string;
  quotationDate: Date | string;
  vatNumber: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date | string;
  country: string;
  state: string;
  city: string;
  remarks: string;
  salesMan: string;

  // same for all component
  id: string;
  status: "active" | "inactive" | "draft";
  isActive: boolean;
  isDeleted: boolean;
  isDraft: boolean;
  isUpdated: boolean;
  actionMessage: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
};

const listTableData: ListTableDataType[] = [
  {
    documentNumber: "SQ-001",
    customer: "Tech World Ltd.",
    quotationNumber: "Q-1001",
    quotationDate: "2025-07-01",
    vatNumber: "VAT123456789",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: "2025-07-31",
    country: "Bangladesh",
    state: "Dhaka",
    city: "Gulshan",
    remarks: "Urgent delivery requested",
    salesMan: "Sabbir Hossain",
    id: "1",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Quotation sent",
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-01T10:00:00Z",
    draftedAt: "2025-06-30T08:00:00Z",
  },
  {
    documentNumber: "SQ-002",
    customer: "Alpha Traders",
    quotationNumber: "Q-1002",
    quotationDate: "2025-07-02",
    vatNumber: "VAT987654321",
    paymentMode: "Cash",
    dueDays: 0,
    paymentDate: "2025-07-02",
    country: "Bangladesh",
    state: "Chattogram",
    city: "Agrabad",
    remarks: "Include installation fee",
    salesMan: "Nayeem Rahman",
    id: "2",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Draft saved",
    createdAt: "2025-07-02T11:00:00Z",
    updatedAt: "2025-07-02T11:15:00Z",
    draftedAt: "2025-07-02T10:45:00Z",
  },
  {
    documentNumber: "SQ-003",
    customer: "Delta Corp",
    quotationNumber: "Q-1003",
    quotationDate: "2025-07-03",
    vatNumber: "VAT2233445566",
    paymentMode: "Cheque",
    dueDays: 15,
    paymentDate: "2025-07-18",
    country: "Bangladesh",
    state: "Khulna",
    city: "Sonadanga",
    remarks: "",
    salesMan: "Tanvir Ahamed",
    id: "3",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated with discount",
    createdAt: "2025-07-03T09:30:00Z",
    updatedAt: "2025-07-03T10:00:00Z",
    draftedAt: "2025-07-02T17:00:00Z",
  },
  {
    documentNumber: "SQ-004",
    customer: "Vision Electronics",
    quotationNumber: "Q-1004",
    quotationDate: "2025-07-04",
    vatNumber: "VAT9988776655",
    paymentMode: "Mobile Banking",
    dueDays: 7,
    paymentDate: "2025-07-11",
    country: "Bangladesh",
    state: "Sylhet",
    city: "Zindabazar",
    remarks: "Confirm stock availability",
    salesMan: "Roky Islam",
    id: "4",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Quotation expired",
    createdAt: "2025-07-04T10:00:00Z",
    updatedAt: "2025-07-04T10:20:00Z",
    draftedAt: "2025-07-03T18:00:00Z",
  },
  {
    documentNumber: "SQ-005",
    customer: "Green Builders",
    quotationNumber: "Q-1005",
    quotationDate: "2025-07-05",
    vatNumber: "VAT3344556677",
    paymentMode: "Bank Transfer",
    dueDays: 20,
    paymentDate: "2025-07-25",
    country: "Bangladesh",
    state: "Rajshahi",
    city: "Boalia",
    remarks: "Check delivery timeline",
    salesMan: "Shuvo Reza",
    id: "5",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: true,
    actionMessage: "Draft updated",
    createdAt: "2025-07-05T11:00:00Z",
    updatedAt: "2025-07-05T12:00:00Z",
    draftedAt: "2025-07-04T17:00:00Z",
  },
  {
    documentNumber: "SQ-006",
    customer: "Dream Tech Ltd.",
    quotationNumber: "Q-1006",
    quotationDate: "2025-07-06",
    vatNumber: "VAT5566778899",
    paymentMode: "Cash",
    dueDays: 0,
    paymentDate: "2025-07-06",
    country: "Bangladesh",
    state: "Barishal",
    city: "Kawnia",
    remarks: "Quick approval needed",
    salesMan: "Arif Khan",
    id: "6",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Quotation approved",
    createdAt: "2025-07-06T09:45:00Z",
    updatedAt: "2025-07-06T10:30:00Z",
    draftedAt: "2025-07-05T16:30:00Z",
  },
  {
    documentNumber: "SQ-007",
    customer: "Skyline Solutions",
    quotationNumber: "Q-1007",
    quotationDate: "2025-07-07",
    vatNumber: "VAT1122334455",
    paymentMode: "Cheque",
    dueDays: 10,
    paymentDate: "2025-07-17",
    country: "Bangladesh",
    state: "Comilla",
    city: "Kotbari",
    remarks: "Need warranty details",
    salesMan: "Mahin Uddin",
    id: "7",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Awaiting response",
    createdAt: "2025-07-07T08:30:00Z",
    updatedAt: "2025-07-07T09:00:00Z",
    draftedAt: "2025-07-06T14:00:00Z",
  },
  {
    documentNumber: "SQ-008",
    customer: "Nova Interiors",
    quotationNumber: "Q-1008",
    quotationDate: "2025-07-08",
    vatNumber: "VAT7766554433",
    paymentMode: "Mobile Banking",
    dueDays: 5,
    paymentDate: "2025-07-13",
    country: "Bangladesh",
    state: "Mymensingh",
    city: "Town Hall",
    remarks: "Custom design needed",
    salesMan: "Jaber Mia",
    id: "8",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Deleted by admin",
    createdAt: "2025-07-08T12:00:00Z",
    updatedAt: "2025-07-08T13:00:00Z",
    draftedAt: "2025-07-07T18:00:00Z",
  },
  {
    documentNumber: "SQ-009",
    customer: "Creative IT",
    quotationNumber: "Q-1009",
    quotationDate: "2025-07-09",
    vatNumber: "VAT6655443322",
    paymentMode: "Bank Transfer",
    dueDays: 25,
    paymentDate: "2025-08-03",
    country: "Bangladesh",
    state: "Jessore",
    city: "Manihar",
    remarks: "Long-term partnership",
    salesMan: "Sohanur Rahman",
    id: "9",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Quotation accepted",
    createdAt: "2025-07-09T14:00:00Z",
    updatedAt: "2025-07-09T15:00:00Z",
    draftedAt: "2025-07-08T17:00:00Z",
  },
  {
    documentNumber: "SQ-010",
    customer: "Zara Textiles",
    quotationNumber: "Q-1010",
    quotationDate: "2025-07-10",
    vatNumber: "VAT123123123",
    paymentMode: "Cheque",
    dueDays: 12,
    paymentDate: "2025-07-22",
    country: "Bangladesh",
    state: "Rangpur",
    city: "Jahaj Company",
    remarks: "Include shipping cost",
    salesMan: "Rafiul Islam",
    id: "10",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Waiting for approval",
    createdAt: "2025-07-10T10:10:00Z",
    updatedAt: "2025-07-10T11:00:00Z",
    draftedAt: "2025-07-09T19:00:00Z",
  },
  {
    documentNumber: "SQ-011",
    customer: "Bright Future Ltd.",
    quotationNumber: "Q-1011",
    quotationDate: "2025-07-11",
    vatNumber: "VAT4433221100",
    paymentMode: "Mobile Banking",
    dueDays: 8,
    paymentDate: "2025-07-19",
    country: "Bangladesh",
    state: "Bogura",
    city: "Shatmatha",
    remarks: "Discount applied",
    salesMan: "Munna Hasan",
    id: "11",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated with new terms",
    createdAt: "2025-07-11T08:00:00Z",
    updatedAt: "2025-07-11T09:00:00Z",
    draftedAt: "2025-07-10T16:00:00Z",
  },
  {
    documentNumber: "SQ-012",
    customer: "Elite Furnishers",
    quotationNumber: "Q-1012",
    quotationDate: "2025-07-12",
    vatNumber: "VAT6677889900",
    paymentMode: "Cash",
    dueDays: 3,
    paymentDate: "2025-07-15",
    country: "Bangladesh",
    state: "Faridpur",
    city: "Goalchamot",
    remarks: "Quick delivery requested",
    salesMan: "Fahim Anwar",
    id: "12",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Quotation rejected",
    createdAt: "2025-07-12T11:30:00Z",
    updatedAt: "2025-07-12T12:00:00Z",
    draftedAt: "2025-07-11T20:00:00Z",
  },
];

export default function ComponentLevelDataTable({
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
      accessorKey: "documentNumber",
      title: "Document Number",
      options: [...new Set(listTableData.map((item) => item.documentNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("documentNumber")
          .localeCompare(row2.getValue("documentNumber"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "documentNumber",
      },
    },
    {
      accessorKey: "quotationNumber",
      title: "Quotation Number",
      options: [...new Set(listTableData.map((item) => item.quotationNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("quotationNumber")
          .localeCompare(row2.getValue("quotationNumber"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "quotationNumber",
      },
    },

    {
      accessorKey: "quotationDate",
      title: "Quotation Date",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("quotationDate")
          .localeCompare(row2.getValue("quotationDate"));
      },
    },

    {
      accessorKey: "customer",
      title: "Customer",
      options: [...new Set(listTableData.map((item) => item.customer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customer")
          .localeCompare(row2.getValue("customer"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "customer",
      },
    },

    {
      accessorKey: "salesMan",
      title: "Sales Man",
      options: [...new Set(listTableData.map((item) => item.salesMan))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("salesMan")
          .localeCompare(row2.getValue("salesMan"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "salesMan",
      },
    },

    {
      accessorKey: "dueDays",
      title: "Due Days",
      options: [...new Set(listTableData.map((item) => item.dueDays))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId);
        return filterValue.some(
          (filterVal: string | number) =>
            String(cellValue) === String(filterVal)
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("dueDays").localeCompare(row2.getValue("dueDays"));
      },
      size: 120,
      minSize: 80,
      meta: {
        exportLabel: "dueDays",
      },
    },

    {
      accessorKey: "paymentMode",
      title: "Payment Mode",
      options: [...new Set(listTableData.map((item) => item.paymentMode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("paymentMode")
          .localeCompare(row2.getValue("paymentMode"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "paymentMode",
      },
    },

    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(listTableData.map((item) => item.country))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "country",
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
      size: 120,
      minSize: 80,
      meta: {
        exportLabel: "status",
      },
    },

    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("createdAt")
          .localeCompare(row2.getValue("createdAt"));
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("updatedAt")
          .localeCompare(row2.getValue("updatedAt"));
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("draftedAt")
          .localeCompare(row2.getValue("draftedAt"));
      },
    },
  ];

  const filteredData = listTableData.filter((item) => {
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={[]} // Pin country name column
    />
  );
}
