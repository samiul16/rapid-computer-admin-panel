import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  branch: string;
  month: string;
  particulars: string;
  debit: string;
  credit: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  branch: "",
  month: "",
  particulars: "",
  debit: "",
  credit: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["branch", "month"];

/*
======================================
Data Table View Config
======================================
*/

// Data table view data type
export type TableViewDataType = ModuleFieldsType & {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string | null;
  actionMessage: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
};

// add value in array if you want to add fixed columns left side
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = [
  "branch",
  "month",
  "particulars",
  "debit",
  "credit",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "branch", title: "Branch" },
  { key: "month", title: "Month" },
  { key: "particulars", title: "Particulars" },
  { key: "debit", title: "Debit" },
  { key: "credit", title: "Credit" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    branch: "Branch 1",
    month: "January 2025",
    particulars: "Office Supplies",
    debit: "500",
    credit: "0",
    status: "Active",
    createdAt: "2025-01-05T09:30:00Z",
    updatedAt: "2025-01-05T10:00:00Z",
    draftedAt: null,
    actionMessage: "Purchase recorded",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    branch: "Branch 1",
    month: "January 2025",
    particulars: "Client Payment",
    debit: "0",
    credit: "1500",
    status: "Draft",
    createdAt: "2025-01-10T11:00:00Z",
    updatedAt: "2025-01-10T11:30:00Z",
    draftedAt: "2025-01-10T11:15:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    branch: "Branch 2",
    month: "February 2025",
    particulars: "Utility Bill Payment",
    debit: "300",
    credit: "0",
    status: "Deleted",
    createdAt: "2025-02-08T08:00:00Z",
    updatedAt: "2025-02-08T08:20:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "4",
    branch: "Branch 2",
    month: "February 2025",
    particulars: "Service Income",
    debit: "0",
    credit: "2200",
    status: "Updated",
    createdAt: "2025-02-12T10:00:00Z",
    updatedAt: "2025-02-12T12:00:00Z",
    draftedAt: null,
    actionMessage: "Transaction updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    branch: "Branch 3",
    month: "March 2025",
    particulars: "Stationery Purchase",
    debit: "250",
    credit: "0",
    status: "Active",
    createdAt: "2025-03-05T14:00:00Z",
    updatedAt: "2025-03-05T14:30:00Z",
    draftedAt: null,
    actionMessage: "Checked in",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    branch: "Branch 3",
    month: "March 2025",
    particulars: "Consulting Revenue",
    debit: "0",
    credit: "1800",
    status: "Draft",
    createdAt: "2025-03-08T09:00:00Z",
    updatedAt: "2025-03-08T09:15:00Z",
    draftedAt: "2025-03-08T09:10:00Z",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    branch: "Branch 4",
    month: "April 2025",
    particulars: "Office Rent",
    debit: "1200",
    credit: "0",
    status: "Active",
    createdAt: "2025-04-01T08:30:00Z",
    updatedAt: "2025-04-01T09:00:00Z",
    draftedAt: null,
    actionMessage: "Payment done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    branch: "Branch 4",
    month: "April 2025",
    particulars: "Refund to Customer",
    debit: "400",
    credit: "0",
    status: "Deleted",
    createdAt: "2025-04-06T11:00:00Z",
    updatedAt: "2025-04-06T11:20:00Z",
    draftedAt: null,
    actionMessage: "Refund canceled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "9",
    branch: "Branch 5",
    month: "May 2025",
    particulars: "Equipment Purchase",
    debit: "2500",
    credit: "0",
    status: "Updated",
    createdAt: "2025-05-03T10:00:00Z",
    updatedAt: "2025-05-03T11:30:00Z",
    draftedAt: null,
    actionMessage: "Stock updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    branch: "Branch 5",
    month: "May 2025",
    particulars: "Customer Invoice Payment",
    debit: "0",
    credit: "3200",
    status: "Active",
    createdAt: "2025-05-08T13:00:00Z",
    updatedAt: "2025-05-08T13:30:00Z",
    draftedAt: null,
    actionMessage: "Invoice cleared",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    branch: "Branch 6",
    month: "June 2025",
    particulars: "Internet Bill",
    debit: "150",
    credit: "0",
    status: "Draft",
    createdAt: "2025-06-05T09:00:00Z",
    updatedAt: "2025-06-05T09:15:00Z",
    draftedAt: "2025-06-05T09:10:00Z",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    branch: "Branch 6",
    month: "June 2025",
    particulars: "Service Revenue",
    debit: "0",
    credit: "2500",
    status: "Active",
    createdAt: "2025-06-12T11:00:00Z",
    updatedAt: "2025-06-12T11:30:00Z",
    draftedAt: null,
    actionMessage: "Checked in",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];


/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  branch: "Branch",
  month: "Month",
  particulars: "Particulars",
  debit: "Debit",
  credit: "Credit",
};
