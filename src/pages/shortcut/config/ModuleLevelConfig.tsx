import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  indexName: string;
  title: string;
  titleValue: string;
  fontAwesomeIcon: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  indexName: "",
  title: "",
  titleValue: "",
  fontAwesomeIcon: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "indexName",
  "title",
  "titleValue",
  "fontAwesomeIcon",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["indexName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "indexName", title: "Index Name" },
  { key: "title", title: "Title" },
  { key: "titleValue", title: "Title Value" },
  { key: "fontAwesomeIcon", title: "Font Awesome Icon" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    indexName: "1",
    title: "Facility",
    titleValue: "101",
    fontAwesomeIcon: "bed",
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
    indexName: "2",
    title: "Facility",
    titleValue: "102",
    fontAwesomeIcon: "hospital",
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
    indexName: "3",
    title: "Facility",
    titleValue: "103",
    fontAwesomeIcon: "wheelchair",
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
    indexName: "4",
    title: "Facility",
    titleValue: "104",
    fontAwesomeIcon: "stethoscope",
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
    indexName: "5",
    title: "Facility",
    titleValue: "105",
    fontAwesomeIcon: "user-nurse",
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
    indexName: "6",
    title: "Facility",
    titleValue: "106",
    fontAwesomeIcon: "clinic-medical",
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
    indexName: "7",
    title: "Facility",
    titleValue: "107",
    fontAwesomeIcon: "ambulance",
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
    indexName: "8",
    title: "Facility",
    titleValue: "108",
    fontAwesomeIcon: "heart",
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
    indexName: "9",
    title: "Facility",
    titleValue: "109",
    fontAwesomeIcon: "notes-medical",
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
    indexName: "10",
    title: "Facility",
    titleValue: "110",
    fontAwesomeIcon: "building",
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
  indexName: "001",
  title: "Facility",
  titleValue: "101",
  fontAwesomeIcon: "Hospital",

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
    name: "indexName",
    label: "Index Name",
    component: "input",
    nextFocus: "title",
    tooltip: "Enter index name",
    required: true,
  },
  {
    name: "title",
    label: "Title",
    component: "input",
    nextFocus: "titleValue",
    tooltip: "Enter title",
    required: true,
  },
  {
    name: "titleValue",
    label: "Title Value",
    component: "input",
    nextFocus: "fontAwesomeIcon",
    tooltip: "Enter title value",
    required: true,
  },
  {
    name: "fontAwesomeIcon",
    label: "Font Awesome Icon",
    component: "input",
    nextFocus: "isDefault",
    tooltip: "Enter font awesome icon",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  indexName: "Index Name",
  title: "Title",
  titleValue: "Title Value",
  fontAwesomeIcon: "Font Awesome Icon",
};
