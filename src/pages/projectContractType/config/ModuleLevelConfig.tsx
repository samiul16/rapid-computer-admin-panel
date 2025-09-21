import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  name: string;
  description: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  name: "",
  description: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "name",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["name"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "name", title: "Name" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    name: "Website is down",
    description:
      "The website is down since this morning. Please resolve it urgently.",
    status: "Active",
    createdAt: "2025-08-20",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Approved by CTO",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    name: "Email service issue",
    description: "Unable to send emails since yesterday evening.",
    status: "Draft",
    createdAt: "2025-08-21",
    updatedAt: "2025-08-24",
    draftedAt: "2025-08-22",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    name: "QA Expansion Request",
    description: "Need to hire 3 QA engineers for automation testing.",
    status: "Active",
    createdAt: "2025-08-19",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Recruitment started",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    name: "UI/UX Designer Recruitment",
    description: "Opening 1 position for UI/UX Designer in HQ.",
    status: "Active",
    createdAt: "2025-08-18",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    name: "Data Analyst Hiring",
    description: "Need 2 data analysts for BI projects.",
    status: "Active",
    createdAt: "2025-08-17",
    updatedAt: "2025-08-24",
    draftedAt: null,
    actionMessage: "In progress",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    name: "HR Executive Hiring",
    description: "Recruiting 1 HR Executive for Dhaka HQ.",
    status: "Active",
    createdAt: "2025-08-15",
    updatedAt: "2025-08-23",
    draftedAt: null,
    actionMessage: "Approved by HR",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    name: "Marketing Officer Hiring",
    description: "Hiring 2 Marketing Officers for remote/Dhaka.",
    status: "Draft",
    createdAt: "2025-08-14",
    updatedAt: "2025-08-22",
    draftedAt: "2025-08-20",
    actionMessage: "Waiting for CEO approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    name: "Finance Officer Hiring",
    description: "Hiring 1 Finance Officer for Chittagong office.",
    status: "Active",
    createdAt: "2025-08-13",
    updatedAt: "2025-08-21",
    draftedAt: null,
    actionMessage: "Final approval done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    name: "Customer Support Staff Recruitment",
    description: "Need 4 customer support agents for call center.",
    status: "Active",
    createdAt: "2025-08-12",
    updatedAt: "2025-08-19",
    draftedAt: null,
    actionMessage: "Recruitment open",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    name: "Project Manager Hiring",
    description: "Hiring 1 Project Manager for Dhaka HQ.",
    status: "Active",
    createdAt: "2025-08-11",
    updatedAt: "2025-08-18",
    draftedAt: null,
    actionMessage: "CEO Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    name: "DevOps Engineer Hiring",
    description: "Hiring 1 DevOps Engineer for infrastructure automation.",
    status: "Active",
    createdAt: "2025-08-10",
    updatedAt: "2025-08-16",
    draftedAt: null,
    actionMessage: "In recruitment process",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    name: "Content Writer Hiring",
    description: "Hiring 2 content writers for blog and copywriting.",
    status: "Active",
    createdAt: "2025-08-09",
    updatedAt: "2025-08-15",
    draftedAt: null,
    actionMessage: "Recruitment ongoing",
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
  name: "Email service issue",
  description: "Unable to send emails since yesterday evening.",

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
    name: "name",
    label: "Name",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter name",
    required: true,
  },

  {
    name: "description",
    label: "Description",
    component: "input",
    tooltip: "Enter description",
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  name: "Name",
  description: "Description",
};
