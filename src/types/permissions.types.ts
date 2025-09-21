// types/permissions.ts

export interface FieldPermission {
  view: boolean;
  edit: boolean;
}

export interface FormPermissions {
  create: boolean;
  view: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
  import: boolean;
  [key: string]: boolean; // Allow additional form permissions
}

export interface FieldPermissions {
  [fieldName: string]: FieldPermission;
}

export interface ModulePermission {
  formPermissions: FormPermissions;
  fieldPermissions: FieldPermissions;
}

export interface UserPermissions {
  modules: {
    [moduleName: string]: ModulePermission;
  };
}

export interface User {
  userId: string;
  userRole: string;
  permissions: UserPermissions;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Type for permission checker functions
export interface PermissionCheckers {
  [key: string]: boolean;
}

// Specific types for countries module (example)
export interface CountriesPermissions {
  // Form permissions
  canCreate: boolean;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canImport: boolean;

  // Field permissions - View
  canViewCountryName: boolean;
  canViewCountryCode: boolean;
  canViewCallingCode: boolean;
  canViewFlag: boolean;
  canViewStatus: boolean;
  canViewCreatedDate: boolean;
  canViewLastUpdated: boolean;
  canViewCreatedBy: boolean;
  canViewNotes: boolean;

  // Field permissions - Edit
  canEditCountryName: boolean;
  canEditCountryCode: boolean;
  canEditCallingCode: boolean;
  canEditFlag: boolean;
  canEditStatus: boolean;
  canEditCreatedDate: boolean;
  canEditLastUpdated: boolean;
  canEditCreatedBy: boolean;
  canEditNotes: boolean;

  // Field permissions - create
  canCreateCountryName: boolean;
  canCreateCountryCode: boolean;
  canCreateCallingCode: boolean;
  canCreateFlag: boolean;
  canCreateStatus: boolean;
  canCreateCreatedDate: boolean;
  canCreateLastUpdated: boolean;
  canCreateCreatedBy: boolean;
  canCreateNotes: boolean;
}
