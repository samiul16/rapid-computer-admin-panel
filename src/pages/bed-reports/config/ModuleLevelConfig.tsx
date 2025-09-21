import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  patientId: string;
  roomName: string;
  bedNumber: string;
  assignDate: string;
  dischargeDate: string;
  description: string;
  charge: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  patientId: "",
  roomName: "",
  bedNumber: "",
  assignDate: "",
  dischargeDate: "",
  description: "",
  charge: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "patientId",
  "roomName",
  "bedNumber",
  "assignDate",
  "dischargeDate",
  "description",
  "charge",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["roomName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "patientId", title: "Patient Id" },
  { key: "roomName", title: "Room Name" },
  { key: "bedNumber", title: "Bed Number" },
  { key: "assignDate", title: "Assign Date" },
  { key: "dischargeDate", title: "Discharge Date" },
  { key: "description", title: "Description" },
  { key: "charge", title: "Charge" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    patientId: "P001",
    roomName: "Room A",
    bedNumber: "101",
    assignDate: "2025-01-01",
    dischargeDate: "2025-01-10",
    description: "Patient P001 assigned to Room A with basic care",
    charge: "1000",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-10",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    patientId: "P002",
    roomName: "Room B",
    bedNumber: "102",
    assignDate: "2025-02-05",
    dischargeDate: "2025-02-15",
    description: "Patient P002 assigned to Room B with deluxe package",
    charge: "1500",
    status: "Draft",
    createdAt: "2025-02-05",
    updatedAt: "2025-02-15",
    draftedAt: "2025-02-10",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    patientId: "P003",
    roomName: "Room C",
    bedNumber: "103",
    assignDate: "2025-03-01",
    dischargeDate: "2025-03-12",
    description: "Patient P003 assigned to Room C with standard amenities",
    charge: "1200",
    status: "Completed",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-12",
    draftedAt: null,
    actionMessage: "Facility completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    patientId: "P004",
    roomName: "Room D",
    bedNumber: "104",
    assignDate: "2025-04-03",
    dischargeDate: "2025-04-14",
    description: "Patient P004 assigned to Room D with shared facilities",
    charge: "900",
    status: "Active",
    createdAt: "2025-04-03",
    updatedAt: "2025-04-14",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    patientId: "P005",
    roomName: "Room E",
    bedNumber: "105",
    assignDate: "2025-05-07",
    dischargeDate: "2025-05-18",
    description: "Patient P005 assigned to Room E with premium service",
    charge: "2000",
    status: "Inactive",
    createdAt: "2025-05-07",
    updatedAt: "2025-05-18",
    draftedAt: null,
    actionMessage: "Facility deactivated",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    patientId: "P006",
    roomName: "Room F",
    bedNumber: "106",
    assignDate: "2025-06-02",
    dischargeDate: "2025-06-15",
    description: "Patient P006 assigned to Room F with basic care",
    charge: "1100",
    status: "Active",
    createdAt: "2025-06-02",
    updatedAt: "2025-06-15",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    patientId: "P007",
    roomName: "Room G",
    bedNumber: "107",
    assignDate: "2025-07-01",
    dischargeDate: "2025-07-12",
    description: "Patient P007 assigned to Room G under draft mode",
    charge: "950",
    status: "Draft",
    createdAt: "2025-07-01",
    updatedAt: "2025-07-12",
    draftedAt: "2025-07-05",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    patientId: "P008",
    roomName: "Room H",
    bedNumber: "108",
    assignDate: "2025-08-05",
    dischargeDate: "2025-08-20",
    description: "Patient P008 assigned to Room H with single occupancy",
    charge: "1800",
    status: "Active",
    createdAt: "2025-08-05",
    updatedAt: "2025-08-20",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    patientId: "P009",
    roomName: "Room I",
    bedNumber: "109",
    assignDate: "2025-09-03",
    dischargeDate: "2025-09-14",
    description: "Patient P009 assigned to Room I with completed stay",
    charge: "1300",
    status: "Completed",
    createdAt: "2025-09-03",
    updatedAt: "2025-09-14",
    draftedAt: null,
    actionMessage: "Facility completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    patientId: "P010",
    roomName: "Room J",
    bedNumber: "110",
    assignDate: "2025-10-02",
    dischargeDate: "2025-10-15",
    description: "Patient P010 assigned to Room J with general care",
    charge: "1000",
    status: "Active",
    createdAt: "2025-10-02",
    updatedAt: "2025-10-15",
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
  patientId: "P001",
  roomName: "Room A",
  bedNumber: "101",
  assignDate: "2025-01-01",
  dischargeDate: "2025-01-15",
  description: "Standard room with basic amenities",
  charge: "1000",

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
    name: "patientId",
    label: "Patient ID",
    component: "input",
    nextFocus: "roomName",
    tooltip: "Enter patient ID",
    required: true,
  },
  {
    name: "roomName",
    label: "Room Name",
    component: "autocomplete",
    options: [
      "Room A",
      "Room B",
      "Room C",
      "Room D",
      "Room E",
      "Room F",
      "Room G",
      "Room H",
      "Room I",
      "Room J",
    ],
    nextFocus: "bedNumber",
    tooltip: "Select Room name",
    required: true,
  },
  {
    name: "bedNumber",
    label: "Bed Number",
    component: "input",
    nextFocus: "charge",
    tooltip: "Enter bed number",
    required: true,
  },

  {
    name: "charge",
    label: "Charge",
    component: "input",
    nextFocus: "assignDate",
    tooltip: "Enter charge",
    required: true,
  },

  {
    name: "assignDate",
    label: "Assign Date",
    component: "input",
    tooltip: "Select assign date",
    type: "date",
    nextFocus: "dischargeDate",
    required: true,
  },
  {
    name: "dischargeDate",
    label: "Discharge Date",
    component: "input",
    tooltip: "Select discharge date",
    type: "date",
    nextFocus: "description",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
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
   patientId: "Patient ID",
  roomName: "Room Name",
  bedNumber: "Bed Number",
  assignDate: "Assign Date",
  dischargeDate: "Discharge Date",
  charge: "Charge",
  description: "Description",
};
