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
const inspectionData = [
  {
    id: "1",
    vehicle: "Toyota Camry 2023",
    inspectionForm: "Safety Inspection",
    addedFrom: "John Doe",
    fromDate: new Date("2024-01-15"),
    toDate: new Date("2024-01-20"),
    isDefault: false,
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
    vehicle: "Honda Civic 2022",
    inspectionForm: "Maintenance Check",
    addedFrom: "Jane Smith",
    fromDate: new Date("2024-01-16"),
    toDate: new Date("2024-01-21"),
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
    vehicle: "Ford F-150 2023",
    inspectionForm: "Pre-Trip Inspection",
    addedFrom: "Mike Johnson",
    fromDate: new Date("2024-01-17"),
    toDate: new Date("2024-01-22"),
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
    vehicle: "Chevrolet Silverado 2022",
    inspectionForm: "Annual Inspection",
    addedFrom: "Sarah Wilson",
    fromDate: new Date("2024-01-18"),
    toDate: new Date("2024-01-23"),
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
    vehicle: "Nissan Altima 2023",
    inspectionForm: "Safety Compliance",
    addedFrom: "David Brown",
    fromDate: new Date("2024-01-19"),
    toDate: new Date("2024-01-24"),
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
    vehicle: "BMW X5 2023",
    inspectionForm: "Luxury Vehicle Check",
    addedFrom: "Lisa Davis",
    fromDate: new Date("2024-01-20"),
    toDate: new Date("2024-01-25"),
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
    vehicle: "Mercedes C-Class 2022",
    inspectionForm: "Premium Inspection",
    addedFrom: "Tom Miller",
    fromDate: new Date("2024-01-21"),
    toDate: new Date("2024-01-26"),
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
    vehicle: "Audi A4 2023",
    inspectionForm: "German Engineering Check",
    addedFrom: "Emma White",
    fromDate: new Date("2024-01-22"),
    toDate: new Date("2024-01-27"),
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
    vehicle: "Volkswagen Golf 2022",
    inspectionForm: "European Standards",
    addedFrom: "Chris Taylor",
    fromDate: new Date("2024-01-23"),
    toDate: new Date("2024-01-28"),
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
    vehicle: "Hyundai Tucson 2023",
    inspectionForm: "Korean Quality Check",
    addedFrom: "Anna Garcia",
    fromDate: new Date("2024-01-24"),
    toDate: new Date("2024-01-29"),
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
    vehicle: "Kia Sportage 2022",
    inspectionForm: "SUV Safety Check",
    addedFrom: "Ryan Martinez",
    fromDate: new Date("2024-01-25"),
    toDate: new Date("2024-01-30"),
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
    vehicle: "Mazda CX-5 2023",
    inspectionForm: "Japanese Reliability",
    addedFrom: "Maria Rodriguez",
    fromDate: new Date("2024-01-26"),
    toDate: new Date("2024-01-31"),
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

export default function InspectionsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Inspections grid rendered");

  const navigate = useNavigate();

  const [inspectionDataState, setInspectionDataState] =
    useState(inspectionData);
  const canDelete: boolean = usePermission("inspections", "delete");
  const canRestore: boolean = usePermission("inspections", "restore");
  const canEdit: boolean = usePermission("inspections", "edit");

  // Debug permissions
  console.log("Inspections Permissions:", {
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

    const vehicleNames = [
      "Lexus RX 2023",
      "Infiniti Q50 2022",
      "Acura MDX 2023",
      "Genesis G80 2022",
      "Subaru Outback 2023",
      "Mitsubishi Outlander 2022",
    ];

    const inspectionForms = [
      "Safety Inspection",
      "Maintenance Check",
      "Pre-Trip Inspection",
      "Annual Inspection",
      "Safety Compliance",
      "Quality Assurance",
    ];

    const addedFromNames = [
      "Alex Turner",
      "Jordan Lee",
      "Casey Morgan",
      "Riley Quinn",
      "Taylor Kim",
      "Blake Chen",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      vehicle: vehicleNames[Math.floor(Math.random() * vehicleNames.length)],
      inspectionForm:
        inspectionForms[Math.floor(Math.random() * inspectionForms.length)],
      addedFrom:
        addedFromNames[Math.floor(Math.random() * addedFromNames.length)],
      fromDate: new Date(),
      toDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
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
    if (inspectionDataState.length >= 46) {
      setHasMore(false);
    } else {
      setInspectionDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [inspectionDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (inspectionId: string) => {
    setInspectionDataState((prevInspections) =>
      prevInspections.map((inspection) =>
        inspection.id === inspectionId
          ? {
              ...inspection,
              isDeleted: inspection.isDeleted === true ? false : true,
            }
          : inspection
      )
    );
  };

  const handleRestoreClick = (inspectionId: string) => {
    setInspectionDataState((prevInspections) =>
      prevInspections.map((inspection) =>
        inspection.id === inspectionId
          ? {
              ...inspection,
              isDeleted: inspection.isDeleted === true ? false : true,
            }
          : inspection
      )
    );
  };

  // Filter inspection records based on search query
  const filteredInspections = inspectionDataState.filter(
    (inspection) =>
      inspection.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inspection.inspectionForm
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      inspection.addedFrom.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {inspectionData.length} inspection records
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
            {filteredInspections.map((inspection, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/inspections/1`)}
                  >
                    {inspection.vehicle}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inspection.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {inspection.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Inspection Form | Actions | Added From */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Inspection Form - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Inspection Form
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {inspection.inspectionForm}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        inspection.isDeleted && canRestore
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
                        disabled={inspection.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          inspection.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && inspection.isDeleted) {
                            handleRestoreClick(inspection.id);
                            toastRestore(
                              "Inspection record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(inspection.id);
                              toastDelete(
                                "Inspection record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {inspection.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/inspections/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Added From - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Added From
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {inspection.addedFrom}
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
                <span className="text-sm">
                  Loading more inspection records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredInspections.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more inspection records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={inspectionData}
                setFilteredData={setInspectionDataState}
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
                data={inspectionData}
                setFilteredData={setInspectionDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
