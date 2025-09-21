import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  titleEn: string;
  titleAr: string;
  topTitleEn: string;
  topTitleAr: string;
  keyTagsEn: string;
  keyTagsAr: string;
  bannerType: string;

  attachment: string;
  attachmentAr: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  titleEn: "",
  titleAr: "",
  topTitleEn: "",
  topTitleAr: "",
  keyTagsEn: "",
  keyTagsAr: "",
  bannerType: "",
  attachment: "",
  attachmentAr: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "titleEn",
  "titleAr",
  "topTitleEn",
  "topTitleAr",
  "keyTagsEn",
  "keyTagsAr",
  "bannerType",
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
  "titleEn",
  "bannerType",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "titleEn", title: "Title En" },
  { key: "titleAr", title: "Title Ar" },
  { key: "topTitleEn", title: "Top Title En" },
  { key: "topTitleAr", title: "Top Title Ar" },
  { key: "keyTagsEn", title: "Key Tags En" },
  { key: "keyTagsAr", title: "Key Tags Ar" },
  { key: "bannerType", title: "Banner Type" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    titleEn: "Frontend Hiring Plan",
    titleAr: "خطة توظيف مطور الواجهة الأمامية",
    topTitleEn: "Frontend Team Expansion",
    topTitleAr: "توسيع فريق الواجهة الأمامية",
    keyTagsEn: "Frontend, React, Next.js",
    keyTagsAr: "الواجهة الأمامية، React، Next.js",
    bannerType: "Mobile",
    attachment: "frontend-hiring.pdf",
    attachmentAr: "frontend-hiring-ar.pdf",
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
    titleEn: "Backend Hiring Plan",
    titleAr: "خطة توظيف مطور الخلفية",
    topTitleEn: "Backend Engineers Requirement",
    topTitleAr: "متطلبات مهندسي الخلفية",
    keyTagsEn: "Backend, Node.js, API",
    keyTagsAr: "الخلفية، Node.js، API",
    bannerType: "Web",
    attachment: "backend-hiring.pdf",
    attachmentAr: "backend-hiring-ar.pdf",
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
    titleEn: "QA Expansion Plan",
    titleAr: "خطة توسيع فريق ضمان الجودة",
    topTitleEn: "QA Hiring Strategy",
    topTitleAr: "استراتيجية توظيف ضمان الجودة",
    keyTagsEn: "QA, Testing, Automation",
    keyTagsAr: "ضمان الجودة، الاختبار، الأتمتة",
    bannerType: "Mobile",
    attachment: "qa-plan.pdf",
    attachmentAr: "qa-plan-ar.pdf",
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
    titleEn: "UI/UX Designer Plan",
    titleAr: "خطة توظيف مصمم UI/UX",
    topTitleEn: "Design Department Expansion",
    topTitleAr: "توسيع قسم التصميم",
    keyTagsEn: "UI, UX, Design",
    keyTagsAr: "واجهة المستخدم، تجربة المستخدم، التصميم",
    bannerType: "Web",
    attachment: "uiux-plan.pdf",
    attachmentAr: "uiux-plan-ar.pdf",
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
    titleEn: "Data Analyst Hiring Plan",
    titleAr: "خطة توظيف محلل بيانات",
    topTitleEn: "Analytics Team Growth",
    topTitleAr: "نمو فريق التحليلات",
    keyTagsEn: "Data, Analytics, Business Intelligence",
    keyTagsAr: "البيانات، التحليلات، ذكاء الأعمال",
    bannerType: "Mobile",
    attachment: "data-analyst.pdf",
    attachmentAr: "data-analyst-ar.pdf",
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
    titleEn: "HR Executive Plan",
    titleAr: "خطة توظيف مسؤول الموارد البشرية",
    topTitleEn: "HR Department Support",
    topTitleAr: "دعم قسم الموارد البشرية",
    keyTagsEn: "HR, Recruitment, Payroll",
    keyTagsAr: "الموارد البشرية، التوظيف، الرواتب",
    bannerType: "Web",
    attachment: "hr-plan.pdf",
    attachmentAr: "hr-plan-ar.pdf",
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
    titleEn: "Marketing Officer Hiring Plan",
    titleAr: "خطة توظيف مسؤول التسويق",
    topTitleEn: "Marketing Expansion",
    topTitleAr: "توسيع قسم التسويق",
    keyTagsEn: "Marketing, Campaigns, Digital",
    keyTagsAr: "التسويق، الحملات، الرقمية",
    bannerType: "Mobile",
    attachment: "marketing-plan.pdf",
    attachmentAr: "marketing-plan-ar.pdf",
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
    titleEn: "Finance Officer Plan",
    titleAr: "خطة توظيف مسؤول المالية",
    topTitleEn: "Finance Team Growth",
    topTitleAr: "نمو فريق المالية",
    keyTagsEn: "Finance, Accounting, Reporting",
    keyTagsAr: "المالية، المحاسبة، التقارير",
    bannerType: "Web",
    attachment: "finance-plan.pdf",
    attachmentAr: "finance-plan-ar.pdf",
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
    titleEn: "Customer Support Recruitment",
    titleAr: "خطة توظيف موظفي الدعم الفني",
    topTitleEn: "Support Staff Hiring",
    topTitleAr: "توظيف موظفي الدعم",
    keyTagsEn: "Support, Customer Service, Helpdesk",
    keyTagsAr: "الدعم، خدمة العملاء، مكتب المساعدة",
    bannerType: "Mobile",
    attachment: "support-plan.pdf",
    attachmentAr: "support-plan-ar.pdf",
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
    titleEn: "Project Manager Hiring Plan",
    titleAr: "خطة توظيف مدير المشاريع",
    topTitleEn: "PMO Leadership Recruitment",
    topTitleAr: "توظيف قيادة PMO",
    keyTagsEn: "Project Management, Leadership",
    keyTagsAr: "إدارة المشاريع، القيادة",
    bannerType: "Web",
    attachment: "pm-plan.pdf",
    attachmentAr: "pm-plan-ar.pdf",
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
    titleEn: "DevOps Engineer Hiring Plan",
    titleAr: "خطة توظيف مهندس DevOps",
    topTitleEn: "DevOps & Infra Automation",
    topTitleAr: "DevOps وأتمتة البنية التحتية",
    keyTagsEn: "DevOps, Cloud, CI/CD",
    keyTagsAr: "DevOps، السحابة، CI/CD",
    bannerType: "Mobile",
    attachment: "devops-plan.pdf",
    attachmentAr: "devops-plan-ar.pdf",
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
    titleEn: "Content Writer Recruitment",
    titleAr: "خطة توظيف كاتب محتوى",
    topTitleEn: "Marketing Content Strategy",
    topTitleAr: "استراتيجية محتوى التسويق",
    keyTagsEn: "Content, Writing, Marketing",
    keyTagsAr: "المحتوى، الكتابة، التسويق",
    bannerType: "Web",
    attachment: "writer-plan.pdf",
    attachmentAr: "writer-plan-ar.pdf",
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
  titleEn: "Frontend Developer",
  titleAr: "Frontend Developer",
  topTitleEn: "Frontend Developer",
  topTitleAr: "Frontend Developer",
  keyTagsEn: "Frontend Developer",
  keyTagsAr: "Frontend Developer",
  bannerType: "1",
  attachment: "JD_Frontend.pdf",
  attachmentAr: "JD_Frontend.pdf",

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
    name: "titleEn",
    label: "Title En",
    component: "input",
    nextFocus: "titleAr",
    tooltip: "Enter title name",
    required: true,
  },
  {
    name: "titleAr",
    label: "Title Ar",
    component: "input",
    nextFocus: "topTitleEn",
    tooltip: "Enter title name",
    required: true,
  },
  {
    name: "topTitleEn",
    label: "Top Title En",
    component: "input",
    nextFocus: "topTitleAr",
    tooltip: "Enter title name",
    required: true,
  },
  {
    name: "topTitleAr",
    label: "Top Title Ar",
    component: "input",
    nextFocus: "keyTagsEn",
    tooltip: "Enter title name",
    required: true,
  },
  {
    name: "keyTagsEn",
    label: "Key Tags En",
    component: "input",
    nextFocus: "keyTagsAr",
    tooltip: "Enter title name",
    required: true,
  },
  {
    name: "keyTagsAr",
    label: "Key Tags Ar",
    component: "input",
    nextFocus: "bannerType",
    tooltip: "Enter title name",
    required: true,
  },
  {
    name: "bannerType",
    label: "Banner Type",
    component: "autocomplete",
    options: ["Mobile", "Desktop", "Both"],
    nextFocus: "attachment",
    tooltip: "Enter title name",
    required: true,
  },
  {
    name: "attachment",
    label: "Banner En",
    component: "input",
    tooltip: "Upload attachment if any",
  },
  {
    name: "attachmentAr",
    label: "Banner Ar",
    component: "input",
    tooltip: "Upload attachment if any",
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  titleEn: "Title En",
  titleAr: "Title Ar",
  topTitleEn: "Top Title En",
  topTitleAr: "Top Title Ar",
  keyTagsEn: "Key Tags En",
  keyTagsAr: "Key Tags Ar",
  bannerType: "Banner Type",
  attachment: "Banner En",
  attachmentAr: "Banner Ar",
};
