/* eslint-disable @typescript-eslint/no-explicit-any */
// types/modules.ts
export interface ModuleData {
  [key: string]: any;
}

export interface MinimizedModule {
  id: string;
  name: string;
  data: ModuleData;
  component: string;
  minimizedAt: string;
  route: string; // Add route for navigation
}

export interface MinimizedModulesState {
  minimizedModules: MinimizedModule[];
  activeModule: string | null;
}

export type MinimizedModulesAction =
  | { type: "MINIMIZE_MODULE"; payload: Omit<MinimizedModule, "minimizedAt"> }
  | { type: "RESTORE_MODULE"; payload: { id: string } }
  | { type: "CLOSE_MINIMIZED"; payload: { id: string } };

export interface CountryFormData {
  code: string;
  title: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  flag: string | null;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  ISD: string;
  isDeleted: boolean;
}

export interface CountryModuleData extends ModuleData {
  formData: CountryFormData;
  hasChanges: boolean;
  scrollPosition?: number;
  countryLanguageValues?: Record<string, string>;
}

export interface TaskAssignModuleData extends ModuleData {
  formData: CountryFormData;
  hasChanges: boolean;
  scrollPosition?: number;
  countryLanguageValues?: Record<string, string>;
}
