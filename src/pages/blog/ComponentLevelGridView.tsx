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
    issueDate: "2025-08-20",
    title: "Frontend Hiring Plan",
    titleAr: "خطة توظيف الواجهة الأمامية",
    description: "Recruitment plan for frontend developers",
    descriptionAr: "خطة توظيف لمطوري الواجهة الأمامية",
    attachment: "JD_Frontend.pdf",
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
    issueDate: "2025-08-21",
    title: "Marketing Hiring Plan",
    titleAr: "خطة توظيف التسويق",
    description: "Recruitment plan for marketing executives",
    descriptionAr: "خطة توظيف لمسؤولي التسويق",
    attachment: "JD_Marketing.pdf",
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
    issueDate: "2025-08-22",
    title: "Finance Analyst Hiring Plan",
    titleAr: "خطة توظيف محلل مالي",
    description: "Plan to hire financial analysts for company growth",
    descriptionAr: "خطة لتوظيف محللين ماليين لنمو الشركة",
    attachment: "JD_Finance.pdf",
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
    issueDate: "2025-08-23",
    title: "Customer Support Hiring Plan",
    titleAr: "خطة توظيف دعم العملاء",
    description: "Recruitment plan for customer support agents",
    descriptionAr: "خطة توظيف لوكلاء دعم العملاء",
    attachment: "JD_Support.pdf",
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
    issueDate: "2025-08-24",
    title: "HR Manager Hiring Plan",
    titleAr: "خطة توظيف مدير الموارد البشرية",
    description: "Plan to hire HR manager for leadership expansion",
    descriptionAr: "خطة لتوظيف مدير موارد بشرية لتوسيع القيادة",
    attachment: "JD_HR.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-07"),
    draftedAt: null,
    updatedAt: new Date("2025-08-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    issueDate: "2025-08-25",
    title: "UI/UX Designer Hiring Plan",
    titleAr: "خطة توظيف مصمم واجهة وتجربة المستخدم",
    description: "Plan to hire designers for product UI/UX",
    descriptionAr: "خطة لتوظيف مصممين لواجهة وتجربة المنتج",
    attachment: "JD_Design.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-08"),
    draftedAt: null,
    updatedAt: new Date("2025-08-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    issueDate: "2025-08-26",
    title: "QA Engineer Hiring Plan",
    titleAr: "خطة توظيف مهندس ضمان الجودة",
    description: "Recruitment plan for QA engineers",
    descriptionAr: "خطة توظيف لمهندسي ضمان الجودة",
    attachment: "JD_QA.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-09"),
    draftedAt: null,
    updatedAt: new Date("2025-08-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    issueDate: "2025-08-27",
    title: "Backend Engineer Hiring Plan",
    titleAr: "خطة توظيف مهندس خلفية",
    description: "Plan to hire backend engineers for scaling APIs",
    descriptionAr: "خطة لتوظيف مهندسي خلفية لتوسيع واجهات برمجة التطبيقات",
    attachment: "JD_Backend.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-10"),
    draftedAt: null,
    updatedAt: new Date("2025-08-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    issueDate: "2025-08-28",
    title: "Sales Executive Hiring Plan",
    titleAr: "خطة توظيف مسؤول مبيعات",
    description: "Plan to hire sales executives in multiple cities",
    descriptionAr: "خطة لتوظيف مسؤولي مبيعات في مدن متعددة",
    attachment: "JD_Sales.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-11"),
    draftedAt: null,
    updatedAt: new Date("2025-08-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    issueDate: "2025-08-29",
    title: "Content Writer Hiring Plan",
    titleAr: "خطة توظيف كاتب محتوى",
    description: "Recruitment plan for writers for blogs and SEO",
    descriptionAr: "خطة توظيف لكتاب المدونات وتحسين محركات البحث",
    attachment: "JD_Content.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-12"),
    draftedAt: null,
    updatedAt: new Date("2025-08-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    issueDate: "2025-08-30",
    title: "Data Scientist Hiring Plan",
    titleAr: "خطة توظيف عالم بيانات",
    description: "Plan to hire data scientists for ML projects",
    descriptionAr: "خطة لتوظيف علماء بيانات لمشاريع تعلم الآلة",
    attachment: "JD_DataScience.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-13"),
    draftedAt: null,
    updatedAt: new Date("2025-08-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    issueDate: "2025-08-31",
    title: "Project Manager Hiring Plan",
    titleAr: "خطة توظيف مدير مشروع",
    description: "Recruitment plan for project managers",
    descriptionAr: "خطة توظيف لمديري المشاريع",
    attachment: "JD_PM.pdf",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-14"),
    draftedAt: null,
    updatedAt: new Date("2025-08-22"),
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
                    {item.title}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Title (Ar)
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
                      description
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.description}
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
                      Description (Ar)
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.descriptionAr}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Issues Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.issueDate}
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
                  {/* <div>
                    <div className="text-xs text-end text-gray-500 dark:text-gray-400">
                      Starting Salary From
                    </div>
                    <div className="text-sm font-semibold text-end text-gray-900 dark:text-gray-100 truncate">
                      {item.}
                    </div>
                  </div> */}
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
