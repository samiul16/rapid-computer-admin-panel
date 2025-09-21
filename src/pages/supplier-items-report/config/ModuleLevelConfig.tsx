import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  supplier: string;
  itemName: string;
  startDate: string;
  endDate: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  supplier: "",
  itemName: "",
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
  "supplier",
  "itemName",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["supplier"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "supplier", title: "Supplier" },
  { key: "itemName", title: "Item Name" },
  { key: "startDate", title: "Start Date" },
  { key: "endDate", title: "End Date" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    supplier: "Supplier A",
    itemName: "Item A",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-15",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    supplier: "Supplier B",
    itemName: "Item B",
    startDate: "2025-02-01",
    endDate: "2025-02-28",
    status: "Draft",
    createdAt: "2025-02-01",
    updatedAt: "2025-02-20",
    draftedAt: "2025-02-15",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    supplier: "Supplier C",
    itemName: "Item C",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    status: "Completed",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-25",
    draftedAt: null,
    actionMessage: "Facility completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    supplier: "Supplier D",
    itemName: "Item D",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    status: "Active",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-20",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    supplier: "Supplier E",
    itemName: "Item E",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    status: "Inactive",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-15",
    draftedAt: null,
    actionMessage: "Facility deactivated",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    supplier: "Supplier F",
    itemName: "Item F",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    status: "Active",
    createdAt: "2025-06-01",
    updatedAt: "2025-06-18",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    supplier: "Supplier G",
    itemName: "Item G",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    status: "Draft",
    createdAt: "2025-07-01",
    updatedAt: "2025-07-10",
    draftedAt: "2025-07-05",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    supplier: "Supplier H",
    itemName: "Item H",
    startDate: "2025-08-01",
    endDate: "2025-08-31",
    status: "Active",
    createdAt: "2025-08-01",
    updatedAt: "2025-08-22",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    supplier: "Supplier I",
    itemName: "Item I",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    status: "Completed",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-28",
    draftedAt: null,
    actionMessage: "Facility completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    supplier: "Supplier J",
    itemName: "Item J",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    status: "Active",
    createdAt: "2025-10-01",
    updatedAt: "2025-10-25",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
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
  supplier: "Supplier A",
  itemName: "Item A",
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
    name: "supplier",
    label: "Supplier",
    component: "autocomplete",
    options: [
      "Office Building",
      "Manufacturing Plant",
      "Research Center",
      "Warehouse",
      "Service Center",
      "Training Center",
      "Data Center",
      "Quality Lab",
      "Recreation Center",
      "Workshop",
    ],
    nextFocus: "itemName",
    tooltip: "Select supplier",
    required: true,
  },
  {
    name: "itemName",
    label: "Item Name",
    component: "autocomplete",
    options: [
      "Computer",
      "Printer",
      "Scanner",
      "Monitor",
      "Keyboard",
      "Mouse",
      "Speaker",
      "Headphones",
      "Camera",
      "Microphone",
    ],
    nextFocus: "startDate",
    tooltip: "Enter Item name",
    required: true,
  },
  {
    name: "startDate",
    label: "Start Date",
    component: "input",
    tooltip: "Select start date",
    type: "date",
    nextFocus: "endDate",
    required: true,
  },
  {
    name: "endDate",
    label: "End Date",
    component: "input",
    type: "date",
    tooltip: "Select end date",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  supplier: "Supplier",
  itemName: "Item Name",
  startDate: "Start Date",
  endDate: "End Date",
};
