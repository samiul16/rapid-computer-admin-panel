import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  romeName: string;
  bedNumber: string;
  description: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  romeName: "",
  bedNumber: "",
  description: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "romeName",
  "bedNumber",
  "description",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["romeName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "romeName", title: "Rome Name" },
  { key: "bedNumber", title: "Bed Number" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    romeName: "Rome A",
    bedNumber: "Bed A",
    description: "Standard room with basic amenities",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-15",
    draftedAt: null,
    actionMessage: "Room created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    romeName: "Rome B",
    bedNumber: "Bed B",
    description: "Deluxe room with king-size bed",
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
    romeName: "Rome C",
    bedNumber: "Bed C",
    description: "Suite room with attached living area",
    status: "Completed",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-25",
    draftedAt: null,
    actionMessage: "Room setup completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    romeName: "Rome D",
    bedNumber: "Bed D",
    description: "Economy room with single bed",
    status: "Active",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-20",
    draftedAt: null,
    actionMessage: "Room created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    romeName: "Rome E",
    bedNumber: "Bed E",
    description: "Luxury room with sea view",
    status: "Inactive",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-15",
    draftedAt: null,
    actionMessage: "Room deactivated",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    romeName: "Rome F",
    bedNumber: "Bed F",
    description: "Family room with two double beds",
    status: "Active",
    createdAt: "2025-06-01",
    updatedAt: "2025-06-18",
    draftedAt: null,
    actionMessage: "Room created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    romeName: "Rome G",
    bedNumber: "Bed G",
    description: "Twin room with two single beds",
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
    romeName: "Rome H",
    bedNumber: "Bed H",
    description: "Business class room with workspace",
    status: "Active",
    createdAt: "2025-08-01",
    updatedAt: "2025-08-22",
    draftedAt: null,
    actionMessage: "Room created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    romeName: "Rome I",
    bedNumber: "Bed I",
    description: "Penthouse suite with premium facilities",
    status: "Completed",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-28",
    draftedAt: null,
    actionMessage: "Room setup completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    romeName: "Rome J",
    bedNumber: "Bed J",
    description: "Studio room with open kitchen",
    status: "Active",
    createdAt: "2025-10-01",
    updatedAt: "2025-10-25",
    draftedAt: null,
    actionMessage: "Room created",
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
  romeName: "Rome A",
  bedNumber: "Bed A",
  description: "Description A",

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
    name: "romeName",
    label: "Rome Name",
    component: "input",
   
    nextFocus: "bedNumber",
    tooltip: "Enter rome name",
    required: true,
  },
  {
    name: "bedNumber",
    label: "Bed Number",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter bed number",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    nextFocus: "status",
    tooltip: "Enter description",
    required: true,
  },
 
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  romeName: "Rome Name",
  bedNumber: "Bed Number",
  description: "Description",
};
