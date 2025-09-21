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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = [
  "patientId",
  "roomName",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "patientId", title: "Patient Id" },
  { key: "roomName", title: "Room Name" },
  { key: "bedNumber", title: "Bed Number" },
  { key: "assignDate", title: "Assign Date" },
  { key: "dischargeDate", title: "Discharge Date" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    patientId: "P001",
    roomName: "Room A",
    bedNumber: "101",
    assignDate: "2025-01-01",
    dischargeDate: "2025-01-15",
    description: "Standard room with basic amenities",
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
    patientId: "P002",
    roomName: "Room B",
    bedNumber: "102",
    assignDate: "2025-02-01",
    dischargeDate: "2025-02-20",
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
    patientId: "P003",
    roomName: "Room C",
    bedNumber: "103",
    assignDate: "2025-03-01",
    dischargeDate: "2025-03-25",
    description: "Executive suite with sea view",
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
    patientId: "P004",
    roomName: "Room D",
    bedNumber: "104",
    assignDate: "2025-04-01",
    dischargeDate: "2025-04-20",
    description: "Family room with two queen beds",
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
    patientId: "P005",
    roomName: "Room E",
    bedNumber: "105",
    assignDate: "2025-05-01",
    dischargeDate: "2025-05-15",
    description: "Luxury room with balcony and jacuzzi",
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
    patientId: "P006",
    roomName: "Room F",
    bedNumber: "106",
    assignDate: "2025-06-01",
    dischargeDate: "2025-06-18",
    description: "Business suite with workspace",
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
    patientId: "P007",
    roomName: "Room G",
    bedNumber: "107",
    assignDate: "2025-07-01",
    dischargeDate: "2025-07-10",
    description: "Twin room for shared accommodation",
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
    patientId: "P008",
    roomName: "Room H",
    bedNumber: "108",
    assignDate: "2025-08-01",
    dischargeDate: "2025-08-22",
    description: "Penthouse suite with private pool",
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
    patientId: "P009",
    roomName: "Room I",
    bedNumber: "109",
    assignDate: "2025-09-01",
    dischargeDate: "2025-09-28",
    description: "Budget-friendly single room",
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
    patientId: "P010",
    roomName: "Room J",
    bedNumber: "110",
    assignDate: "2025-10-01",
    dischargeDate: "2025-10-25",
    description: "Modern deluxe room with smart features",
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
  patientId: "P001",
  roomName: "Room A",
  bedNumber: "101",
  assignDate: "2025-01-01",
  dischargeDate: "2025-01-15",
  description: "Standard room with basic amenities",

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
    nextFocus: "assignDate",
    tooltip: "Enter bed number",
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
  description: "Description",
};
