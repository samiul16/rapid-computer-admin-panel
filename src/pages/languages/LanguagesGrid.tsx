import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";

// Mock data - replace with real data from your API
const languages = [
  {
    id: "1",
    seq: 1,
    code: "en",
    language: "English",
    default: true,
    status: "active",
    isDeleted: false,
  },
  {
    id: "2",
    seq: 2,
    code: "es",
    language: "Spanish",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "3",
    seq: 3,
    code: "fr",
    language: "French",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "4",
    seq: 4,
    code: "de",
    language: "German",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "5",
    seq: 5,
    code: "it",
    language: "Italian",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "6",
    seq: 6,
    code: "pt",
    language: "Portuguese",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "7",
    seq: 7,
    code: "ru",
    language: "Russian",
    default: false,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "8",
    seq: 8,
    code: "zh",
    language: "Chinese",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "9",
    seq: 9,
    code: "ja",
    language: "Japanese",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "10",
    seq: 10,
    code: "ko",
    language: "Korean",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "11",
    seq: 11,
    code: "ar",
    language: "Arabic",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "12",
    seq: 12,
    code: "hi",
    language: "Hindi",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "13",
    seq: 13,
    code: "bn",
    language: "Bengali",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "14",
    seq: 14,
    code: "tr",
    language: "Turkish",
    default: false,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "15",
    seq: 15,
    code: "nl",
    language: "Dutch",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "16",
    seq: 16,
    code: "pl",
    language: "Polish",
    default: false,
    status: "active",
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function LanguagesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Languages grid rendered");

  const navigate = useNavigate();

  const [languagesData, setLanguagesData] = useState(languages);
  const canDelete: boolean = usePermission("languages", "delete");
  const canRestore: boolean = usePermission("languages", "restore");
  const canEdit: boolean = usePermission("languages", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // ... (keep all your existing functions: loadMoreData, handleScroll, etc.)
  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const languageNames = [
      "Swedish",
      "Norwegian",
      "Danish",
      "Finnish",
      "Icelandic",
      "Greek",
      "Hebrew",
      "Thai",
      "Vietnamese",
      "Indonesian",
      "Malay",
      "Filipino",
      "Ukrainian",
      "Czech",
      "Hungarian",
      "Romanian",
      "Bulgarian",
      "Croatian",
      "Serbian",
      "Slovenian",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      seq: languagesData.length + index + 1,
      code: `lang${(languagesData.length + index + 1)
        .toString()
        .padStart(2, "0")}`,
      language: languageNames[Math.floor(Math.random() * languageNames.length)],
      default: false,
      status: Math.random() > 0.3 ? "active" : "inactive",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (languagesData.length >= 46) {
      setHasMore(false);
    } else {
      setLanguagesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [languagesData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100; // Load more when 100px from bottom

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDeleteClick = (languageId: string) => {
    setLanguagesData((prevLanguages) =>
      prevLanguages.map((language) =>
        language.id === languageId
          ? {
              ...language,
              isDeleted: language.isDeleted === true ? false : true,
            }
          : language
      )
    );
  };

  const handleRestoreClick = (languageId: string) => {
    setLanguagesData((prevLanguages) =>
      prevLanguages.map((language) =>
        language.id === languageId
          ? {
              ...language,
              isDeleted: language.isDeleted === true ? false : true,
            }
          : language
      )
    );
  };

  // Filter languages based on search query
  const filteredLanguages = languagesData.filter(
    (language) =>
      language.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      language.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      language.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={cn(
        "px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg"
      )}
    >
      {/* Floating Label - Left Top */}
      <div
        className={cn(
          "absolute -top-4 left-6 rtl:left-auto rtl:right-6 py-1 rounded-md z-40! bg-white w-fit"
        )}
      >
        <span
          className={cn(
            "text-md font-semibold tracking-wide capitalize text-gray-600"
          )}
        >
          Total {languages.length} languages
        </span>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4 p-2">
            {filteredLanguages.map((language, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/languages/1`)}
                  >
                    {language.language}
                  </CardTitle>

                  {/* Right - Status Badge */}
                  <div className="flex justify-end">
                    <span
                      className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        language.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      )}
                    >
                      {language.status}
                    </span>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Code | Actions | Default */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {language.code}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        language.isDeleted && canRestore
                          ? "Restore"
                          : canDelete
                          ? "Delete"
                          : ""
                      }
                      position="top"
                      arrowSize={8}
                      withArrow
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "#374151",
                          color: "white",
                          borderRadius: "6px",
                          fontWeight: "500",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "#374151",
                        },
                      }}
                    >
                      <button
                        disabled={language.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          language.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && language.isDeleted) {
                            handleRestoreClick(language.id);
                            toastRestore("Language restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(language.id);
                              toastDelete("Language deleted successfully");
                            }
                          }
                        }}
                      >
                        {language.isDeleted && canRestore ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          canDelete && <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </Tooltip>

                    {/* Edit */}
                    {canEdit && (
                      <Tooltip
                        label="Edit"
                        position="top"
                        arrowSize={8}
                        withArrow
                        styles={{
                          tooltip: {
                            fontSize: "14px",
                            padding: "8px 12px",
                            backgroundColor: "#374151",
                            color: "white",
                            borderRadius: "6px",
                            fontWeight: "500",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          },
                          arrow: {
                            backgroundColor: "#374151",
                          },
                        }}
                      >
                        <div
                          className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center w-8 h-8"
                          onClick={() => navigate(`/languages/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Default - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Default
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {language.default ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more languages...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLanguages.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more languages to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={languages}
                setFilteredData={setLanguagesData}
                setShowFilter={setIsFilterOpen}
              />
            </div>
          </div>
        )}

        {/* Export component - Right side only */}
        {isExportOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={languages}
                setFilteredData={setLanguagesData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
