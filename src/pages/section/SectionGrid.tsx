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
const sections = [
  {
    id: "1",
    code: "S001",
    name: "Kitchen",
    description: "Main kitchen area for food preparation",
    manager: "Chef Johnson",
    employeeCount: 15,
    budget: 1200000,
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    code: "S002",
    name: "Dining Hall",
    description: "Main dining area for customers",
    manager: "Sarah Wilson",
    employeeCount: 12,
    budget: 800000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-16"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    code: "S003",
    name: "Bar",
    description: "Beverage service and bar management",
    manager: "Mike Davis",
    employeeCount: 8,
    budget: 600000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-17"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    code: "S004",
    name: "Storage",
    description: "Inventory and storage management",
    manager: "Lisa Brown",
    employeeCount: 6,
    budget: 400000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-18"),
    draftedAt: null,
    updatedAt: new Date("2024-01-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    code: "S005",
    name: "Service",
    description: "Customer service and table management",
    manager: "Tom Anderson",
    employeeCount: 10,
    budget: 700000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-19"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    code: "S006",
    name: "Bakery",
    description: "Fresh bread and pastry preparation",
    manager: "Emma White",
    employeeCount: 7,
    budget: 500000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-20"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    code: "S007",
    name: "Dessert",
    description: "Dessert and sweet preparation",
    manager: "Alex Turner",
    employeeCount: 5,
    budget: 350000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-21"),
    draftedAt: null,
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    code: "S008",
    name: "Salad Bar",
    description: "Fresh salad and healthy options",
    manager: "Rachel Green",
    employeeCount: 4,
    budget: 300000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-22"),
    draftedAt: null,
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    code: "S009",
    name: "Grill",
    description: "Grilled food preparation",
    manager: "Carlos Rodriguez",
    employeeCount: 6,
    budget: 450000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-23"),
    draftedAt: null,
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    code: "S010",
    name: "Pizza",
    description: "Pizza preparation and oven management",
    manager: "Maria Garcia",
    employeeCount: 8,
    budget: 550000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-24"),
    draftedAt: null,
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    code: "S011",
    name: "Sushi",
    description: "Sushi and Japanese cuisine",
    manager: "Kenji Tanaka",
    employeeCount: 6,
    budget: 650000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-25"),
    draftedAt: null,
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    code: "S012",
    name: "Coffee Shop",
    description: "Coffee and beverage service",
    manager: "David Miller",
    employeeCount: 5,
    budget: 400000,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
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

export default function SectionsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Sections grid rendered");

  const navigate = useNavigate();

  const [sectionsData, setSectionsData] = useState(sections);
  const canDelete: boolean = usePermission("section", "delete");
  const canRestore: boolean = usePermission("section", "restore");
  const canEdit: boolean = usePermission("section", "edit");

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

    const sectionTypes = [
      "Kitchen",
      "Dining",
      "Bar",
      "Storage",
      "Service",
      "Bakery",
      "Dessert",
      "Grill",
      "Pizza",
      "Sushi",
    ];
    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      code: `S${(sectionsData.length + index + 1).toString().padStart(3, "0")}`,
      name: `${sectionTypes[Math.floor(Math.random() * sectionTypes.length)]} ${
        sectionsData.length + index + 1
      }`,
      description: `Description for section ${sectionsData.length + index + 1}`,
      manager: `Manager ${sectionsData.length + index + 1}`,
      employeeCount: Math.floor(Math.random() * 20) + 3,
      budget: Math.floor(Math.random() * 1000000) + 200000,
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
    if (sectionsData.length >= 46) {
      setHasMore(false);
    } else {
      setSectionsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [sectionsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (sectionId: string) => {
    setSectionsData((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              isDeleted: section.isDeleted === true ? false : true,
            }
          : section
      )
    );
  };

  const handleRestoreClick = (sectionId: string) => {
    setSectionsData((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              isDeleted: section.isDeleted === true ? false : true,
            }
          : section
      )
    );
  };

  // Filter sections based on search query
  const filteredSections = sectionsData.filter(
    (section) =>
      section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {sections.length} sections
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
            {filteredSections.map((section, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/section/1`)}
                  >
                    {section.name}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        section.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {section.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Code | Actions | Manager */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {section.code}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        section.isDeleted && canRestore
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
                        disabled={section.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          section.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && section.isDeleted) {
                            handleRestoreClick(section.id);
                            toastRestore("Section restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(section.id);
                              toastDelete("Section deleted successfully");
                            }
                          }
                        }}
                      >
                        {section.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/section/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Manager - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Manager
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {section.manager}
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
                <span className="text-sm">Loading more sections...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSections.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more sections to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={sections}
                setFilteredData={setSectionsData}
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
                data={sections}
                setFilteredData={setSectionsData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
