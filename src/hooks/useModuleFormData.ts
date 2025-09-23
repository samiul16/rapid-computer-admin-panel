// hooks/useSubCategoryFormData.ts
import { useMinimizedModuleData } from "./useMinimizedModuleData";
import type { SubCategoryFormData } from "@/types/modules";

export function useSubCategoryFormData() {
  return useMinimizedModuleData<SubCategoryFormData>(
    "sub-category-form-module"
  );
}
