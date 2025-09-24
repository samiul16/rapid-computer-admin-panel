// hooks/useSubCategoryFormData.ts
import { useMinimizedModuleData } from "./useMinimizedModuleData";
import type {
  InvoiceModuleData,
  OpeningStockModuleData,
  StockTransferModuleData,
  SubCategoryFormData,
} from "@/types/modules";

export function useSubCategoryFormData() {
  return useMinimizedModuleData<SubCategoryFormData>(
    "sub-category-form-module"
  );
}

export function useStockTransferFormData() {
  return useMinimizedModuleData<StockTransferModuleData>(
    "stock-transfer-form-module"
  );
}

export function useOpeningStockFormData() {
  return useMinimizedModuleData<OpeningStockModuleData>(
    "opening-stock-form-module"
  );
}

export function useInvoiceFormData() {
  return useMinimizedModuleData<InvoiceModuleData>("invoice-form-module");
}
