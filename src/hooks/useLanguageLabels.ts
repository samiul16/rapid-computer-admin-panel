// hooks/useLanguageLabels.ts
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { LANGUAGE_LABELS, type LanguageLabels } from "@/mockData/languageData";

export const useLanguageLabels = (): LanguageLabels => {
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  // Fallback to English if language not found
  return LANGUAGE_LABELS[currentLanguage.code] || LANGUAGE_LABELS.en;
};
