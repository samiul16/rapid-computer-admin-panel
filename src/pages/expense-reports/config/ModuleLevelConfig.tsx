import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  customer: string;
  startDate: string;
  endDate: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  customer: "",
  startDate: "",
  endDate: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "customer",
  "startDate",
  "endDate",
];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["customer"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "customer", title: "Customer" },
  { key: "startDate", title: "Start Date" },
  { key: "endDate", title: "End Date" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    customer: "John Doe",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    customer: "Jane Smith",
    startDate: "2025-02-01",
    endDate: "2025-02-28",
    status: "Active",
    createdAt: "2025-02-01",
    updatedAt: "2025-02-28",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    customer: "Michael Johnson",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    status: "Active",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    customer: "Emily Davis",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    status: "Draft",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-25",
    draftedAt: "2025-04-20",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    customer: "William Brown",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    status: "Active",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    customer: "Sophia Wilson",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    status: "Active",
    createdAt: "2025-06-01",
    updatedAt: "2025-06-30",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    customer: "James Taylor",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    status: "Completed",
    createdAt: "2025-07-01",
    updatedAt: "2025-07-31",
    draftedAt: null,
    actionMessage: "Facility completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    customer: "Olivia Martinez",
    startDate: "2025-08-01",
    endDate: "2025-08-31",
    status: "Active",
    createdAt: "2025-08-01",
    updatedAt: "2025-08-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    customer: "Daniel Anderson",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    status: "Active",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-30",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    customer: "Isabella Thomas",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    status: "Active",
    createdAt: "2025-10-01",
    updatedAt: "2025-10-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];


/* 
==========================
# Create Page Config
==========================
*/

// create page types
export type ModuleCreateEditPageTypes = ModuleFieldsType & {
  isDefault: boolean;
  isDraft: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

// Utility to extract the keys of ModuleFieldsType whose values are strings
type StringKeys<T> = Extract<
  {
    [K in keyof T]-?: T[K] extends string ? K : never;
  }[keyof T],
  string
>;

// field config types
type FieldConfig = {
  name: StringKeys<ModuleFieldsType>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  component: "autocomplete" | "input" | "mutiselect";
  placeholder?: string;
  options?: string[];
  nextFocus?: string;
  tooltip?: string;
  required?: boolean;
};

export const initialDataWithValue: ModuleCreateEditPageTypes = {
  customer: "John Doe",
  startDate: "2025-01-01",
  endDate: "2025-01-31",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

// add item for your nessasary fields
export const formFields: FieldConfig[] = [
  {
    name: "customer",
    label: "Customer",
    component: "autocomplete",
    options: [
      "John Doe",
      "Jane Smith",
      "Ahmed Khan",
      "Emily Johnson",
      "Michael Brown",
    ],
    nextFocus: "startDate",
    tooltip: "Select facility type",
    required: true,
  },
  {
    name: "startDate",
    label: "Start Date",
    component: "input",
    nextFocus: "endDate",
    tooltip: "Enter start date",
    type: "date",
    required: true,
  },
  {
    name: "endDate",
    label: "End Date",
    component: "input",
    nextFocus: "facilityType",
    tooltip: "Enter end date",
    type: "date",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  customer: "Customer",
  startDate: "Start Date",
  endDate: "End Date",
};
