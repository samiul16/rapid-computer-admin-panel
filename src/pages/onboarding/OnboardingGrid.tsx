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
const onboardingData = [
  {
    id: "1",
    selectStaff: "John Doe",
    generalInformation: "New hire onboarding",
    staffFullName: "John Michael Doe",
    address: "123 Main St, City, State 12345",
    assetAllocation: "Laptop, Phone, ID Card",
    typeOfTraining: "Technical Training",
    trainingProgram: "Full Stack Development",
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
    selectStaff: "Jane Smith",
    generalInformation: "Department transfer",
    staffFullName: "Jane Elizabeth Smith",
    address: "456 Oak Ave, Town, State 67890",
    assetAllocation: "Desktop, Headset, Badge",
    typeOfTraining: "Process Training",
    trainingProgram: "Customer Service Excellence",
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
    selectStaff: "Mike Johnson",
    generalInformation: "Promotion onboarding",
    staffFullName: "Michael Robert Johnson",
    address: "789 Pine Rd, Village, State 11111",
    assetAllocation: "Laptop, Monitor, Keyboard",
    typeOfTraining: "Leadership Training",
    trainingProgram: "Management Skills",
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
    selectStaff: "Sarah Wilson",
    generalInformation: "Intern onboarding",
    staffFullName: "Sarah Anne Wilson",
    address: "321 Elm St, Borough, State 22222",
    assetAllocation: "Tablet, Notebook, Pen",
    typeOfTraining: "Basic Training",
    trainingProgram: "Company Orientation",
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
    selectStaff: "David Brown",
    generalInformation: "Contractor onboarding",
    staffFullName: "David Christopher Brown",
    address: "654 Maple Dr, County, State 33333",
    assetAllocation: "Temporary Badge, Access Card",
    typeOfTraining: "Security Training",
    trainingProgram: "Workplace Safety",
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
    selectStaff: "Lisa Davis",
    generalInformation: "Returning employee",
    staffFullName: "Lisa Marie Davis",
    address: "987 Cedar Ln, District, State 44444",
    assetAllocation: "Laptop, Phone, Reissued Badge",
    typeOfTraining: "Refresher Training",
    trainingProgram: "Updated Procedures",
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
    selectStaff: "Tom Miller",
    generalInformation: "Seasonal hire",
    staffFullName: "Thomas James Miller",
    address: "147 Birch Way, Township, State 55555",
    assetAllocation: "Uniform, Safety Gear, ID",
    typeOfTraining: "Safety Training",
    trainingProgram: "Workplace Protocols",
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
    selectStaff: "Emma White",
    generalInformation: "Remote worker onboarding",
    staffFullName: "Emma Grace White",
    address: "258 Spruce Ct, Municipality, State 66666",
    assetAllocation: "Remote Setup Kit, VPN Access",
    typeOfTraining: "Remote Work Training",
    trainingProgram: "Virtual Collaboration",
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
    selectStaff: "Chris Taylor",
    generalInformation: "Part-time onboarding",
    staffFullName: "Christopher Lee Taylor",
    address: "369 Willow Pl, Parish, State 77777",
    assetAllocation: "Part-time Badge, Basic Equipment",
    typeOfTraining: "Part-time Training",
    trainingProgram: "Flexible Work Arrangements",
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
    selectStaff: "Anna Garcia",
    generalInformation: "Executive onboarding",
    staffFullName: "Anna Sofia Garcia",
    address: "741 Aspen Blvd, City, State 88888",
    assetAllocation: "Executive Setup, Premium Equipment",
    typeOfTraining: "Executive Training",
    trainingProgram: "Strategic Leadership",
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
    selectStaff: "Ryan Martinez",
    generalInformation: "Technical specialist",
    staffFullName: "Ryan Alexander Martinez",
    address: "852 Poplar St, Town, State 99999",
    assetAllocation: "Specialized Equipment, Tools",
    typeOfTraining: "Technical Training",
    trainingProgram: "Advanced Skills Development",
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
    selectStaff: "Maria Rodriguez",
    generalInformation: "Customer service rep",
    staffFullName: "Maria Isabella Rodriguez",
    address: "963 Hickory Ave, Village, State 00000",
    assetAllocation: "Headset, Customer Portal Access",
    typeOfTraining: "Customer Service Training",
    trainingProgram: "Client Relations Excellence",
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

export default function OnboardingGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Onboarding grid rendered");

  const navigate = useNavigate();

  const [onboardingDataState, setOnboardingDataState] =
    useState(onboardingData);
  const canDelete: boolean = usePermission("onboarding", "delete");
  const canRestore: boolean = usePermission("onboarding", "restore");
  const canEdit: boolean = usePermission("onboarding", "edit");

  // Debug permissions
  console.log("Onboarding Permissions:", {
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

    const staffNames = [
      "Alex Turner",
      "Jordan Lee",
      "Casey Morgan",
      "Riley Quinn",
      "Taylor Kim",
      "Blake Chen",
    ];

    const trainingTypes = [
      "Technical Training",
      "Process Training",
      "Leadership Training",
      "Safety Training",
      "Customer Service Training",
      "Remote Work Training",
    ];

    const trainingPrograms = [
      "Software Development",
      "Quality Assurance",
      "Project Management",
      "Team Leadership",
      "Client Relations",
      "Virtual Collaboration",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      selectStaff: staffNames[Math.floor(Math.random() * staffNames.length)],
      generalInformation: `Sample onboarding info ${index + 1}`,
      staffFullName: `${
        staffNames[Math.floor(Math.random() * staffNames.length)]
      } Full Name`,
      address: `Sample Address ${index + 1}, City, State`,
      assetAllocation: `Asset ${index + 1}, Equipment ${index + 1}`,
      typeOfTraining:
        trainingTypes[Math.floor(Math.random() * trainingTypes.length)],
      trainingProgram:
        trainingPrograms[Math.floor(Math.random() * trainingPrograms.length)],
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
    if (onboardingDataState.length >= 46) {
      setHasMore(false);
    } else {
      setOnboardingDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [onboardingDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (onboardingId: string) => {
    setOnboardingDataState((prevOnboardings) =>
      prevOnboardings.map((onboarding) =>
        onboarding.id === onboardingId
          ? {
              ...onboarding,
              isDeleted: onboarding.isDeleted === true ? false : true,
            }
          : onboarding
      )
    );
  };

  const handleRestoreClick = (onboardingId: string) => {
    setOnboardingDataState((prevOnboardings) =>
      prevOnboardings.map((onboarding) =>
        onboarding.id === onboardingId
          ? {
              ...onboarding,
              isDeleted: onboarding.isDeleted === true ? false : true,
            }
          : onboarding
      )
    );
  };

  // Filter onboarding records based on search query
  const filteredOnboardings = onboardingDataState.filter(
    (onboarding) =>
      onboarding.selectStaff
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      onboarding.staffFullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      onboarding.typeOfTraining
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      onboarding.trainingProgram
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
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
          Total {onboardingData.length} onboarding records
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
            {filteredOnboardings.map((onboarding, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/onboarding/1`)}
                  >
                    {onboarding.selectStaff}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        onboarding.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {onboarding.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Training Type | Actions | Staff Name */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Training Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Training Type
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {onboarding.typeOfTraining}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        onboarding.isDeleted && canRestore
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
                        disabled={onboarding.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          onboarding.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && onboarding.isDeleted) {
                            handleRestoreClick(onboarding.id);
                            toastRestore(
                              "Onboarding record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(onboarding.id);
                              toastDelete(
                                "Onboarding record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {onboarding.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/onboarding/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Staff Name - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Staff Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {onboarding.staffFullName}
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
                  Loading more onboarding records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredOnboardings.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more onboarding records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={onboardingData}
                setFilteredData={setOnboardingDataState}
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
                data={onboardingData}
                setFilteredData={setOnboardingDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
