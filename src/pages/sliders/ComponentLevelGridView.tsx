import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";
import { SearchFunction } from "@/lib/SearchFunction";
import {
  searchableKeys,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";

// do not change
type GridDataType = ModuleFieldsType & {
  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

export const plansData: GridDataType[] = [
  {
    id: "1",
    titleEn: "Frontend Hiring Plan",
    titleAr: "خطة التوظيف للواجهة الأمامية",
    topTitleEn: "Frontend Developer Recruitment",
    topTitleAr: "توظيف مطور واجهة أمامية",
    keyTagsEn: "Frontend, React, Next.js, Hiring",
    keyTagsAr: "واجهة أمامية, React, Next.js, توظيف",
    bannerType: "Mobile",
    attachment: "jd-frontend.pdf",
    attachmentAr: "jd-frontend-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-01"),
    draftedAt: null,
    updatedAt: new Date("2025-08-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    titleEn: "Backend Hiring Plan",
    titleAr: "خطة التوظيف للواجهة الخلفية",
    topTitleEn: "Backend Developer Recruitment",
    topTitleAr: "توظيف مطور واجهة خلفية",
    keyTagsEn: "Backend, Node.js, API, Database",
    keyTagsAr: "خلفية, Node.js, API, قاعدة بيانات",
    bannerType: "Web",
    attachment: "jd-backend.pdf",
    attachmentAr: "jd-backend-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-03"),
    draftedAt: null,
    updatedAt: new Date("2025-08-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    titleEn: "UI/UX Designer Hiring Plan",
    titleAr: "خطة توظيف مصمم UI/UX",
    topTitleEn: "UI/UX Designer Recruitment",
    topTitleAr: "توظيف مصمم واجهة وتجربة المستخدم",
    keyTagsEn: "UI, UX, Design, Figma",
    keyTagsAr: "تصميم, واجهة, تجربة مستخدم, Figma",
    bannerType: "Mobile",
    attachment: "jd-uiux.pdf",
    attachmentAr: "jd-uiux-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-05"),
    draftedAt: null,
    updatedAt: new Date("2025-08-17"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    titleEn: "QA Engineer Hiring Plan",
    titleAr: "خطة توظيف مهندس ضمان الجودة",
    topTitleEn: "QA Engineer Recruitment",
    topTitleAr: "توظيف مهندس جودة",
    keyTagsEn: "QA, Testing, Automation",
    keyTagsAr: "جودة, اختبار, أتمتة",
    bannerType: "Web",
    attachment: "jd-qa.pdf",
    attachmentAr: "jd-qa-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-06"),
    draftedAt: null,
    updatedAt: new Date("2025-08-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    titleEn: "Project Manager Hiring Plan",
    titleAr: "خطة توظيف مدير مشروع",
    topTitleEn: "Project Manager Recruitment",
    topTitleAr: "توظيف مدير مشروع",
    keyTagsEn: "Project, Manager, Leadership",
    keyTagsAr: "مشروع, مدير, قيادة",
    bannerType: "Mobile",
    attachment: "jd-pm.pdf",
    attachmentAr: "jd-pm-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-07"),
    draftedAt: null,
    updatedAt: new Date("2025-08-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    titleEn: "Data Analyst Hiring Plan",
    titleAr: "خطة توظيف محلل بيانات",
    topTitleEn: "Data Analyst Recruitment",
    topTitleAr: "توظيف محلل بيانات",
    keyTagsEn: "Data, Analytics, SQL, BI",
    keyTagsAr: "بيانات, تحليل, SQL, ذكاء الأعمال",
    bannerType: "Web",
    attachment: "jd-data.pdf",
    attachmentAr: "jd-data-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-08"),
    draftedAt: null,
    updatedAt: new Date("2025-08-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    titleEn: "DevOps Engineer Hiring Plan",
    titleAr: "خطة توظيف مهندس DevOps",
    topTitleEn: "DevOps Engineer Recruitment",
    topTitleAr: "توظيف مهندس DevOps",
    keyTagsEn: "DevOps, Cloud, CI/CD, AWS",
    keyTagsAr: "DevOps, سحابة, CI/CD, AWS",
    bannerType: "Mobile",
    attachment: "jd-devops.pdf",
    attachmentAr: "jd-devops-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-09"),
    draftedAt: null,
    updatedAt: new Date("2025-08-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    titleEn: "HR Executive Hiring Plan",
    titleAr: "خطة توظيف تنفيذي الموارد البشرية",
    topTitleEn: "HR Executive Recruitment",
    topTitleAr: "توظيف تنفيذي موارد بشرية",
    keyTagsEn: "HR, Recruitment, Payroll",
    keyTagsAr: "الموارد البشرية, توظيف, الرواتب",
    bannerType: "Web",
    attachment: "jd-hr.pdf",
    attachmentAr: "jd-hr-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-10"),
    draftedAt: null,
    updatedAt: new Date("2025-08-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    titleEn: "Marketing Officer Hiring Plan",
    titleAr: "خطة توظيف مسؤول تسويق",
    topTitleEn: "Marketing Officer Recruitment",
    topTitleAr: "توظيف مسؤول تسويق",
    keyTagsEn: "Marketing, SEO, Campaigns",
    keyTagsAr: "تسويق, SEO, حملات",
    bannerType: "Mobile",
    attachment: "jd-marketing.pdf",
    attachmentAr: "jd-marketing-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-11"),
    draftedAt: null,
    updatedAt: new Date("2025-08-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    titleEn: "Content Writer Hiring Plan",
    titleAr: "خطة توظيف كاتب محتوى",
    topTitleEn: "Content Writer Recruitment",
    topTitleAr: "توظيف كاتب محتوى",
    keyTagsEn: "Content, Writing, Blogs, SEO",
    keyTagsAr: "محتوى, كتابة, مدونات, SEO",
    bannerType: "Web",
    attachment: "jd-writer.pdf",
    attachmentAr: "jd-writer-ar.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-12"),
    draftedAt: null,
    updatedAt: new Date("2025-08-24"),
    deletedAt: null,
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

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("grid rendered");

  const navigate = useNavigate();
  const location = useLocation();

  const detectedModule = getModuleFromPath(location.pathname);

  const [gridData, setGridData] = useState(plansData);
  const canDelete: boolean = usePermission(detectedModule, "delete");
  const canRestore: boolean = usePermission(detectedModule, "restore");
  const canEdit: boolean = usePermission(detectedModule, "edit");

  // Debug permissions
  console.log("Permissions:", {
    canDelete,
    canRestore,
    canEdit,
  });

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      ...plansData[index],
      id: `${Date.now()}-${index}`,
      isDefault: false,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...newItems] as GridDataType[]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [gridData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  const handleRestoreClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  // filter
  const filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  // get page name
  const PAGE_NAME = location.pathname.split("/")[1].replace("-", " ");

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
          Total {gridData.length} {PAGE_NAME}
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
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.titleEn}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Title Ar
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.titleAr}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Top Title Ar
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.topTitleAr}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        item.isDeleted && canRestore
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
                        disabled={item.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && item.isDeleted) {
                            handleRestoreClick(item.id);
                            toastRestore(`${PAGE_NAME} restored successfully`);
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete(`${PAGE_NAME} deleted successfully`);
                            }
                          }
                        }}
                      >
                        {item.isDeleted && canRestore ? (
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
                          onClick={() =>
                            navigate(`${location.pathname}/edit/1`)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Top Title En
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.topTitleEn}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Banner Type
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.bannerType}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Id
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.id}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-end text-gray-500 dark:text-gray-400">
                      Key Tags Ar
                    </div>
                    <div className="text-sm font-semibold text-end text-gray-900 dark:text-gray-100 truncate">
                      {item.keyTagsAr}
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
                <span className="text-sm">Loading more {PAGE_NAME}...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more {PAGE_NAME} to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={gridData}
                setFilteredData={setGridData}
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
                data={gridData}
                setFilteredData={setGridData}
                setIsExportOpen={setIsExportOpen}
                title={location.pathname.split("/")[1].replace("-", " ")}
                fileName={location.pathname.split("/")[1]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
