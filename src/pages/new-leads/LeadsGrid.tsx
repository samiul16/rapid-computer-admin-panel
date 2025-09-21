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
const mockData = [
  {
    id: "1",
    clientName: "John Doe",
    service: "Web Development",
    budget: 50000,
    status: "active",
    isDeleted: false,
  },
  {
    id: "2",
    clientName: "Jane Smith",
    service: "Mobile App Development",
    budget: 80000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "3",
    clientName: "Kamrul Islam",
    service: "E-commerce Website",
    budget: 60000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "4",
    clientName: "Shamima Akter",
    service: "Digital Marketing",
    budget: 45000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "5",
    clientName: "Tanvir Ahmed",
    service: "Cloud Infrastructure Setup",
    budget: 120000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "6",
    clientName: "Farhana Rahman",
    service: "UI/UX Design",
    budget: 30000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "7",
    clientName: "Rashed Khan",
    service: "SEO Optimization",
    budget: 25000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "8",
    clientName: "Mehnaz Sultana",
    service: "Content Creation",
    budget: 20000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "9",
    clientName: "Sajib Chowdhury",
    service: "Social Media Management",
    budget: 28000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "10",
    clientName: "Omar Faruque",
    service: "Cybersecurity Audit",
    budget: 90000,
    status: "upcoming",
    isDeleted: false,
  },
  {
    id: "11",
    clientName: "Sumaiya Haque",
    service: "Email Marketing Campaign",
    budget: 15000,
    status: "draft",
    isDeleted: false,
  },
  {
    id: "12",
    clientName: "Imran Kabir",
    service: "ERP System Integration",
    budget: 110000,
    status: "draft",
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

export default function LeadsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  // console.log("leads grid rendered");

  const navigate = useNavigate();

  const [leadsData, setLeadsData] = useState(mockData);
  const canDelete: boolean = usePermission("leads", "delete");
  const canRestore: boolean = usePermission("leads", "restore");
  const canEdit: boolean = usePermission("leads", "edit");

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
    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      clientName: `Client ${Date.now()}-${index}`,
      service: `Service ${Date.now()}-${index}`,
      budget: Math.floor(Math.random() * 100000),
      status: "active",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (leadsData.length >= 46) {
      setHasMore(false);
    } else {
      setLeadsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [leadsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (leadId: string) => {
    setLeadsData((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              isDeleted: lead.isDeleted === true ? false : true,
            }
          : lead
      )
    );
  };

  const handleRestoreClick = (leadId: string) => {
    setLeadsData((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              isDeleted: lead.isDeleted === true ? false : true,
            }
          : lead
      )
    );
  };

  // Filter leads based on search query
  const filteredLeads = leadsData.filter((leads) =>
    leads.clientName.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {filteredLeads.length} Leads
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
            {filteredLeads.map((leads, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/leads/1`)}
                  >
                    {leads.clientName}
                  </CardTitle>

                  {/* Right - Flag */}
                  {/* <div className="flex justify-end">
                    <img
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                      alt={`${country.name} flag`}
                      className="h-12 w-12 object-cover border rounded-md shadow-sm"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://flagcdn.com/us.svg`;
                      }}
                    />
                  </div> */}
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Service
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {leads.service}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        leads.isDeleted && canRestore
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
                        disabled={leads.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          leads.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && leads.isDeleted) {
                            handleRestoreClick(leads.id);
                            toastRestore("Leads restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(leads.id);
                              toastDelete("Leads deleted successfully");
                            }
                          }
                        }}
                      >
                        {leads.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/leads/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Budget
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {leads.budget}
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
                <span className="text-sm">Loading more leads...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLeads.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more leads to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={mockData}
                setFilteredData={setLeadsData}
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
                data={mockData}
                setFilteredData={setLeadsData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
