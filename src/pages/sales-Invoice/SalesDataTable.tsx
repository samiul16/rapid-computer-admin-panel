/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockInvoices = [
  {
    id: "1",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: "2024-01-15",
    customer: "John Doe",
    trnNumber: "TRN123456789",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: "2024-02-14",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
    status: "active",
  },
  {
    id: "2",
    documentNumber: "DOC002",
    invoiceNumber: "INV-2024-002",
    invoiceDate: "2024-01-16",
    customer: "Jane Smith",
    trnNumber: "TRN987654321",
    paymentMode: "Credit Card",
    dueDays: 15,
    paymentDate: "2024-01-31",
    country: "United States",
    state: "New York",
    city: "New York",
    remarks: "Standard delivery",
    salesman: "Bob Johnson",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
    status: "active",
  },
  {
    id: "3",
    documentNumber: "DOC003",
    invoiceNumber: "INV-2024-003",
    invoiceDate: "2024-01-17",
    customer: "Acme Corp.",
    trnNumber: "TRN1122334455",
    paymentMode: "Cash",
    dueDays: 7,
    paymentDate: "2024-01-24",
    country: "United States",
    state: "Florida",
    city: "Miami",
    remarks: "Daily fresh delivery",
    salesman: "Charlie Lee",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "active",
  },
  {
    id: "4",
    documentNumber: "DOC004",
    invoiceNumber: "INV-2024-004",
    invoiceDate: "2024-01-18",
    customer: "Beta LLC",
    trnNumber: "TRN9988776655",
    paymentMode: "Check",
    dueDays: 45,
    paymentDate: "2024-03-04",
    country: "United States",
    state: "Texas",
    city: "Houston",
    remarks: "Temperature controlled delivery",
    salesman: "Diana Prince",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
    status: "active",
  },
  {
    id: "5",
    documentNumber: "DOC005",
    invoiceNumber: "INV-2024-005",
    invoiceDate: "2024-01-19",
    customer: "Gamma Foods",
    trnNumber: "TRN123123123",
    paymentMode: "ACH Transfer",
    dueDays: 21,
    paymentDate: "2024-02-09",
    country: "United States",
    state: "Washington",
    city: "Seattle",
    remarks: "Live delivery required",
    salesman: "Eve Adams",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
    status: "active",
  },
  {
    id: "6",
    documentNumber: "DOC006",
    invoiceNumber: "INV-2024-006",
    invoiceDate: "2024-01-20",
    customer: "Delta Inc.",
    trnNumber: "TRN456456456",
    paymentMode: "Net Banking",
    dueDays: 14,
    paymentDate: "2024-02-03",
    country: "United States",
    state: "Wisconsin",
    city: "Milwaukee",
    remarks: "Refrigerated transport",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isDeleted: false,
    status: "active",
  },
  {
    id: "7",
    documentNumber: "DOC007",
    invoiceNumber: "INV-2024-007",
    invoiceDate: "2024-01-21",
    customer: "Epsilon Ltd.",
    trnNumber: "TRN789789789",
    paymentMode: "PayPal",
    dueDays: 10,
    paymentDate: "2024-01-31",
    country: "United States",
    state: "Oregon",
    city: "Portland",
    remarks: "Organic certification required",
    salesman: "Bob Johnson",
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "8",
    documentNumber: "DOC008",
    invoiceNumber: "INV-2024-008",
    invoiceDate: "2024-01-22",
    customer: "Zeta Group",
    trnNumber: "TRN111222333",
    paymentMode: "Wire Transfer",
    dueDays: 60,
    paymentDate: "2024-03-23",
    country: "United States",
    state: "Louisiana",
    city: "New Orleans",
    remarks: "Bulk order - quarterly supply",
    salesman: "Diana Prince",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
    status: "active",
  },
  {
    id: "9",
    documentNumber: "DOC009",
    invoiceNumber: "INV-2024-009",
    invoiceDate: "2024-01-23",
    customer: "Eta Enterprises",
    trnNumber: "TRN222333444",
    paymentMode: "Credit Line",
    dueDays: 30,
    paymentDate: "2024-02-22",
    country: "United States",
    state: "Georgia",
    city: "Atlanta",
    remarks: "Weekly delivery schedule",
    salesman: "Eve Adams",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isDeleted: false,
    status: "active",
  },
  {
    id: "10",
    documentNumber: "DOC010",
    invoiceNumber: "INV-2024-010",
    invoiceDate: "2024-01-24",
    customer: "Theta Foods",
    trnNumber: "TRN555666777",
    paymentMode: "Cash on Delivery",
    dueDays: 0,
    paymentDate: "2024-01-24",
    country: "United States",
    state: "Illinois",
    city: "Chicago",
    remarks: "Installation included",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
  {
    id: "11",
    documentNumber: "DOC011",
    invoiceNumber: "INV-2024-011",
    invoiceDate: "2024-01-25",
    customer: "Acme Corp.",
    trnNumber: "TRN888999000",
    paymentMode: "Debit Card",
    dueDays: 20,
    paymentDate: "2024-02-14",
    country: "United States",
    state: "Colorado",
    city: "Denver",
    remarks: "Temperature sensitive items",
    salesman: "Bob Johnson",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isDeleted: false,
    status: "active",
  },
  {
    id: "12",
    documentNumber: "DOC012",
    invoiceNumber: "INV-2024-012",
    invoiceDate: "2024-01-26",
    customer: "Beta LLC",
    trnNumber: "TRN123456789",
    paymentMode: "Electronic Payment",
    dueDays: 25,
    paymentDate: "2024-02-20",
    country: "United States",
    state: "Minnesota",
    city: "Minneapolis",
    remarks: "Frozen storage required",
    salesman: "Charlie Lee",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isDeleted: false,
    status: "active",
  },
  {
    id: "13",
    documentNumber: "DOC013",
    invoiceNumber: "INV-2024-013",
    invoiceDate: "2024-01-27",
    customer: "Gamma Foods",
    trnNumber: "TRN987654321",
    paymentMode: "Letter of Credit",
    dueDays: 90,
    paymentDate: "2024-04-26",
    country: "United States",
    state: "Nevada",
    city: "Las Vegas",
    remarks: "Import documentation pending",
    salesman: "Diana Prince",
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "14",
    documentNumber: "DOC014",
    invoiceNumber: "INV-2024-014",
    invoiceDate: "2024-01-28",
    customer: "Eta Enterprises",
    trnNumber: "TRN111222333",
    paymentMode: "Mobile Payment",
    dueDays: 15,
    paymentDate: "2024-02-12",
    country: "United States",
    state: "Arizona",
    city: "Phoenix",
    remarks: "Eco-friendly products only",
    salesman: "Eve Adams",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isDeleted: false,
    status: "active",
  },
  {
    id: "15",
    documentNumber: "DOC015",
    invoiceNumber: "INV-2024-015",
    invoiceDate: "2024-01-29",
    customer: "Acme Corp.",
    trnNumber: "TRN456456456",
    paymentMode: "Installment Plan",
    dueDays: 120,
    paymentDate: "2024-05-28",
    country: "United States",
    state: "North Carolina",
    city: "Charlotte",
    remarks: "Custom design requirements",
    salesman: "Alice Smith",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isDeleted: false,
    status: "active",
  },
  {
    id: "16",
    documentNumber: "DOC016",
    invoiceNumber: "INV-2024-016",
    invoiceDate: "2024-01-30",
    customer: "Beta LLC",
    trnNumber: "TRN789789789",
    paymentMode: "Crypto Payment",
    dueDays: 30,
    paymentDate: "2024-03-01",
    country: "United States",
    state: "Massachusetts",
    city: "Boston",
    remarks: "Software licensing included",
    salesman: "Bob Johnson",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isDeleted: false,
    status: "active",
  },
  {
    id: "17",
    documentNumber: "DOC017",
    invoiceNumber: "INV-2024-017",
    invoiceDate: "2024-01-31",
    customer: "Eta Enterprises",
    trnNumber: "TRN123123123",
    paymentMode: "Gift Card Credit",
    dueDays: 45,
    paymentDate: "2024-03-17",
    country: "United States",
    state: "Tennessee",
    city: "Nashville",
    remarks: "Custom embroidery required",
    salesman: "Diana Prince",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isDeleted: false,
    status: "active",
  },
];

export default function InvoicesDataTable({
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
      options: [
        "DOC001",
        "DOC002",
        "DOC003",
        "DOC004",
        "DOC005",
        "DOC006",
        "DOC007",
        "DOC008",
        "DOC009",
        "DOC010",
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
          .getValue("documentNumber")
          .localeCompare(row2.getValue("documentNumber"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "invoiceNumber",
      title: "Invoice Number",
      options: [
        "INV-2024-001",
        "INV-2024-002",
        "INV-2024-003",
        "INV-2024-004",
        "INV-2024-005",
        "INV-2024-006",
        "INV-2024-007",
        "INV-2024-008",
        "INV-2024-009",
        "INV-2024-010",
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
          .getValue("invoiceNumber")
          .localeCompare(row2.getValue("invoiceNumber"));
      },
      size: 130,
      minSize: 110,
    },
    {
      accessorKey: "invoiceDate",
      title: "Invoice Date",
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
          new Date(row1.getValue("invoiceDate")).getTime() -
          new Date(row2.getValue("invoiceDate")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "customer",
      title: "Customer",
      options: [
        "John Doe",
        "Jane Smith",
        "Acme Corp.",
        "Beta LLC",
        "Gamma Foods",
        "Delta Inc.",
        "Epsilon Ltd.",
        "Zeta Group",
        "Eta Enterprises",
        "Theta Foods",
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
          .getValue("customer")
          .localeCompare(row2.getValue("customer"));
      },
      size: 180,
      minSize: 150,
    },
    {
      accessorKey: "trnNumber",
      title: "TRN Number",
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
      size: 130,
      minSize: 110,
    },
    {
      accessorKey: "salesman",
      title: "Salesman",
      options: [
        "Alice Smith",
        "Bob Johnson",
        "Charlie Lee",
        "Diana Prince",
        "Eve Adams",
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
          .getValue("salesman")
          .localeCompare(row2.getValue("salesman"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "paymentMode",
      title: "Payment Mode",
      options: [
        "Bank Transfer",
        "Credit Card",
        "Cash",
        "Check",
        "ACH Transfer",
        "Net Banking",
        "PayPal",
        "Wire Transfer",
        "Credit Line",
        "Cash on Delivery",
        "Debit Card",
        "Electronic Payment",
        "Letter of Credit",
        "Mobile Payment",
        "Installment Plan",
        "Crypto Payment",
        "Gift Card Credit",
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
          .getValue("paymentMode")
          .localeCompare(row2.getValue("paymentMode"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "dueDays",
      title: "Due Days",
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
        return row1.getValue("dueDays") - row2.getValue("dueDays");
      },
      size: 90,
      minSize: 70,
    },
    {
      accessorKey: "paymentDate",
      title: "Payment Date",
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
          new Date(row1.getValue("paymentDate")).getTime() -
          new Date(row2.getValue("paymentDate")).getTime()
        );
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "remarks",
      title: "Remarks",
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
      accessorKey: "country",
      title: "Country",
      options: ["United States"],
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
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "state",
      title: "State",
      options: [
        "California",
        "New York",
        "Florida",
        "Texas",
        "Washington",
        "Wisconsin",
        "Oregon",
        "Louisiana",
        "Georgia",
        "Illinois",
        "Colorado",
        "Minnesota",
        "Nevada",
        "Arizona",
        "North Carolina",
        "Massachusetts",
        "Tennessee",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("state").localeCompare(row2.getValue("state"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "city",
      title: "City",
      options: [
        "Los Angeles",
        "New York",
        "Miami",
        "Houston",
        "Seattle",
        "Milwaukee",
        "Portland",
        "New Orleans",
        "Atlanta",
        "Chicago",
        "Denver",
        "Minneapolis",
        "Las Vegas",
        "Phoenix",
        "Charlotte",
        "Boston",
        "Nashville",
      ],
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

  const filteredData = mockInvoices.filter((invoice) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return invoice.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return invoice.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return invoice.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return invoice.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return invoice.updatedAt !== invoice.createdAt;
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
