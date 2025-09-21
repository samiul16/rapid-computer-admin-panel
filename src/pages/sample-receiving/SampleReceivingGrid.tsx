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
const sampleReceivings = [
  {
    id: "1",
    branch: "Main Branch",
    receivingNo: "SR-001",
    clientName: "ABC Laboratories",
    clientReference: "REF-2024-001",
    typeOfSample: "Blood Sample",
    requiredTests: "CBC, Blood Sugar",
    numberOfSample: 5,
    section: "Hematology",
    deliveredBy: "John Smith",
    receivedBy: "Dr. Sarah Johnson",
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
    branch: "North Branch",
    receivingNo: "SR-002",
    clientName: "XYZ Medical Center",
    clientReference: "REF-2024-002",
    typeOfSample: "Urine Sample",
    requiredTests: "Urinalysis, Culture",
    numberOfSample: 3,
    section: "Microbiology",
    deliveredBy: "Mike Wilson",
    receivedBy: "Dr. Robert Chen",
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
    branch: "South Branch",
    receivingNo: "SR-003",
    clientName: "City Hospital",
    clientReference: "REF-2024-003",
    typeOfSample: "Tissue Sample",
    requiredTests: "Histopathology",
    numberOfSample: 2,
    section: "Pathology",
    deliveredBy: "Lisa Brown",
    receivedBy: "Dr. David Miller",
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
    branch: "East Branch",
    receivingNo: "SR-004",
    clientName: "Community Clinic",
    clientReference: "REF-2024-004",
    typeOfSample: "Swab Sample",
    requiredTests: "PCR Test",
    numberOfSample: 4,
    section: "Molecular Biology",
    deliveredBy: "Anna Davis",
    receivedBy: "Dr. Emily White",
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
    branch: "West Branch",
    receivingNo: "SR-005",
    clientName: "Private Practice",
    clientReference: "REF-2024-005",
    typeOfSample: "Stool Sample",
    requiredTests: "Parasitology",
    numberOfSample: 1,
    section: "Parasitology",
    deliveredBy: "Tom Anderson",
    receivedBy: "Dr. Maria Garcia",
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
    branch: "Central Branch",
    receivingNo: "SR-006",
    clientName: "Research Institute",
    clientReference: "REF-2024-006",
    typeOfSample: "Serum Sample",
    requiredTests: "Biochemistry Panel",
    numberOfSample: 6,
    section: "Biochemistry",
    deliveredBy: "Peter Johnson",
    receivedBy: "Dr. James Wilson",
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
    branch: "Main Branch",
    receivingNo: "SR-007",
    clientName: "University Hospital",
    clientReference: "REF-2024-007",
    typeOfSample: "CSF Sample",
    requiredTests: "Microbiology, Chemistry",
    numberOfSample: 2,
    section: "Neurology",
    deliveredBy: "Rachel Green",
    receivedBy: "Dr. Kevin Lee",
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
    branch: "North Branch",
    receivingNo: "SR-008",
    clientName: "Specialty Clinic",
    clientReference: "REF-2024-008",
    typeOfSample: "Bone Marrow",
    requiredTests: "Cytogenetics",
    numberOfSample: 1,
    section: "Cytogenetics",
    deliveredBy: "Chris Taylor",
    receivedBy: "Dr. Amanda Clark",
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
    branch: "South Branch",
    receivingNo: "SR-009",
    clientName: "Diagnostic Center",
    clientReference: "REF-2024-009",
    typeOfSample: "Sputum Sample",
    requiredTests: "TB Culture",
    numberOfSample: 3,
    section: "Microbiology",
    deliveredBy: "Jennifer Adams",
    receivedBy: "Dr. Michael Brown",
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
    branch: "East Branch",
    receivingNo: "SR-010",
    clientName: "Medical Group",
    clientReference: "REF-2024-010",
    typeOfSample: "Synovial Fluid",
    requiredTests: "Crystal Analysis",
    numberOfSample: 2,
    section: "Rheumatology",
    deliveredBy: "Daniel Martinez",
    receivedBy: "Dr. Lisa Thompson",
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
    branch: "West Branch",
    receivingNo: "SR-011",
    clientName: "Health Center",
    clientReference: "REF-2024-011",
    typeOfSample: "Pleural Fluid",
    requiredTests: "Cytology",
    numberOfSample: 1,
    section: "Cytology",
    deliveredBy: "Sophie Turner",
    receivedBy: "Dr. Alex Rodriguez",
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
    branch: "Central Branch",
    receivingNo: "SR-012",
    clientName: "Laboratory Services",
    clientReference: "REF-2024-012",
    typeOfSample: "Amniotic Fluid",
    requiredTests: "Genetic Testing",
    numberOfSample: 1,
    section: "Genetics",
    deliveredBy: "Emma Watson",
    receivedBy: "Dr. Thomas Anderson",
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

export default function SampleReceivingGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Sample receiving grid rendered");

  const navigate = useNavigate();

  const [sampleReceivingsData, setSampleReceivingsData] =
    useState(sampleReceivings);
  const canDelete: boolean = usePermission("sampleReceiving", "delete");
  const canRestore: boolean = usePermission("sampleReceiving", "restore");
  const canEdit: boolean = usePermission("sampleReceiving", "edit");

  // Debug permissions
  console.log("Sample Receiving Permissions:", {
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

    const branches = [
      "Main Branch",
      "North Branch",
      "South Branch",
      "East Branch",
      "West Branch",
      "Central Branch",
    ];
    const clientNames = [
      "ABC Laboratories",
      "XYZ Medical Center",
      "City Hospital",
      "Community Clinic",
      "Private Practice",
      "Research Institute",
    ];
    const sampleTypes = [
      "Blood Sample",
      "Urine Sample",
      "Tissue Sample",
      "Swab Sample",
      "Stool Sample",
      "Serum Sample",
    ];
    const sections = [
      "Hematology",
      "Microbiology",
      "Pathology",
      "Molecular Biology",
      "Parasitology",
      "Biochemistry",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      branch: branches[Math.floor(Math.random() * branches.length)],
      receivingNo: `SR-${String(
        sampleReceivingsData.length + index + 1
      ).padStart(3, "0")}`,
      clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
      clientReference: `REF-2024-${String(
        sampleReceivingsData.length + index + 1
      ).padStart(3, "0")}`,
      typeOfSample: sampleTypes[Math.floor(Math.random() * sampleTypes.length)],
      requiredTests: "Various Tests",
      numberOfSample: Math.floor(Math.random() * 10) + 1,
      section: sections[Math.floor(Math.random() * sections.length)],
      deliveredBy: "Sample Deliverer",
      receivedBy: "Sample Receiver",
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
    if (sampleReceivingsData.length >= 46) {
      setHasMore(false);
    } else {
      setSampleReceivingsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [sampleReceivingsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (sampleReceivingId: string) => {
    setSampleReceivingsData((prevSampleReceivings) =>
      prevSampleReceivings.map((sampleReceiving) =>
        sampleReceiving.id === sampleReceivingId
          ? {
              ...sampleReceiving,
              isDeleted: sampleReceiving.isDeleted === true ? false : true,
            }
          : sampleReceiving
      )
    );
  };

  const handleRestoreClick = (sampleReceivingId: string) => {
    setSampleReceivingsData((prevSampleReceivings) =>
      prevSampleReceivings.map((sampleReceiving) =>
        sampleReceiving.id === sampleReceivingId
          ? {
              ...sampleReceiving,
              isDeleted: sampleReceiving.isDeleted === true ? false : true,
            }
          : sampleReceiving
      )
    );
  };

  // Filter sample receivings based on search query
  const filteredSampleReceivings = sampleReceivingsData.filter(
    (sampleReceiving) =>
      sampleReceiving.receivingNo
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      sampleReceiving.clientName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      sampleReceiving.clientReference
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      sampleReceiving.typeOfSample
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      sampleReceiving.section
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      sampleReceiving.deliveredBy
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      sampleReceiving.receivedBy
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
          Total {sampleReceivings.length} sample receivings
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
            {filteredSampleReceivings.map((sampleReceiving, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/sample-receiving/1`)}
                  >
                    {sampleReceiving.receivingNo}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sampleReceiving.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {sampleReceiving.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Client Name | Actions | Branch */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Client Name - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Client Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {sampleReceiving.clientName}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        sampleReceiving.isDeleted && canRestore
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
                        disabled={sampleReceiving.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          sampleReceiving.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && sampleReceiving.isDeleted) {
                            handleRestoreClick(sampleReceiving.id);
                            toastRestore(
                              "Sample receiving restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(sampleReceiving.id);
                              toastDelete(
                                "Sample receiving deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {sampleReceiving.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/sample-receiving/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Branch - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Branch
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {sampleReceiving.branch}
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
                  Loading more sample receivings...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSampleReceivings.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more sample receivings to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={sampleReceivings}
                setFilteredData={setSampleReceivingsData}
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
                data={sampleReceivings}
                setFilteredData={setSampleReceivingsData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
