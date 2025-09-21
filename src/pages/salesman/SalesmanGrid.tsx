import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  List,
  Import,
  Download,
  Filter,
  Mic,
  Search,
  RefreshCw,
  CheckCircle2,
  Circle,
  Pencil,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "./GridFilterComponent";
import GridExportComponent from "./GridExportComponent";
import { Modal, Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";

// Define Salesman interface to ensure type consistency
interface Salesman {
  id: string;
  code: string;
  name: string;
  description: string;
  commission: number;
  territory: string;
  experience: string;
  department: string;
  manager: string;
  phone: string;
  email: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data - replace with real data from your API
const salesmen: Salesman[] = [
  {
    id: "1",
    code: "S001",
    name: "John Smith",
    description:
      "Senior sales representative specializing in enterprise clients",
    commission: 8.5,
    territory: "North Region",
    experience: "5+ years",
    department: "Enterprise Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0123",
    email: "john.smith@company.com",
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
    name: "Emily Rodriguez",
    description: "Retail sales specialist with excellent customer relations",
    commission: 7.2,
    territory: "South Region",
    experience: "3+ years",
    department: "Retail Sales",
    manager: "Mike Davis",
    phone: "+1-555-0124",
    email: "emily.rodriguez@company.com",
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
    name: "Michael Chen",
    description: "Tech-savvy sales rep focusing on digital solutions",
    commission: 9.0,
    territory: "West Region",
    experience: "4+ years",
    department: "Tech Sales",
    manager: "Lisa Wong",
    phone: "+1-555-0125",
    email: "michael.chen@company.com",
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
    name: "Sarah Williams",
    description: "Key account manager for premium clients",
    commission: 10.5,
    territory: "East Region",
    experience: "6+ years",
    department: "Key Accounts",
    manager: "Robert Brown",
    phone: "+1-555-0126",
    email: "sarah.williams@company.com",
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
    name: "David Thompson",
    description: "Regional sales coordinator with team leadership skills",
    commission: 8.8,
    territory: "Central Region",
    experience: "7+ years",
    department: "Regional Sales",
    manager: "Jennifer Lee",
    phone: "+1-555-0127",
    email: "david.thompson@company.com",
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
    name: "Jessica Martinez",
    description: "B2B sales specialist with strong negotiation skills",
    commission: 7.8,
    territory: "Southwest Region",
    experience: "4+ years",
    department: "B2B Sales",
    manager: "Tom Wilson",
    phone: "+1-555-0128",
    email: "jessica.martinez@company.com",
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
    name: "Alexander Kim",
    description: "Junior sales representative with high potential",
    commission: 6.5,
    territory: "Northwest Region",
    experience: "1+ year",
    department: "Junior Sales",
    manager: "Maria Garcia",
    phone: "+1-555-0129",
    email: "alexander.kim@company.com",
    isDefault: false,
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-21"),
    draftedAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    code: "S008",
    name: "Amanda Taylor",
    description: "Online sales specialist focusing on e-commerce",
    commission: 7.0,
    territory: "Online Channel",
    experience: "3+ years",
    department: "E-commerce Sales",
    manager: "Kevin Anderson",
    phone: "+1-555-0130",
    email: "amanda.taylor@company.com",
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
    name: "Carlos Hernandez",
    description: "Bilingual sales rep serving Hispanic market segment",
    commission: 8.2,
    territory: "Hispanic Markets",
    experience: "5+ years",
    department: "Market Segments",
    manager: "Patricia White",
    phone: "+1-555-0131",
    email: "carlos.hernandez@company.com",
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
    name: "Rachel Green",
    description: "Corporate sales executive handling large contracts",
    commission: 11.0,
    territory: "Corporate Accounts",
    experience: "8+ years",
    department: "Corporate Sales",
    manager: "Steven Clark",
    phone: "+1-555-0132",
    email: "rachel.green@company.com",
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
    name: "James Moore",
    description: "Field sales representative covering rural territories",
    commission: 7.5,
    territory: "Rural Areas",
    experience: "6+ years",
    department: "Field Sales",
    manager: "Nancy Lewis",
    phone: "+1-555-0133",
    email: "james.moore@company.com",
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
    name: "Lisa Johnson",
    description: "Product specialist sales rep for technical solutions",
    commission: 9.5,
    territory: "Technical Markets",
    experience: "4+ years",
    department: "Product Sales",
    manager: "Daniel Miller",
    phone: "+1-555-0134",
    email: "lisa.johnson@company.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "13",
    code: "S013",
    name: "Mark Foster",
    description: "International sales representative for global markets",
    commission: 12.0,
    territory: "International",
    experience: "10+ years",
    department: "Global Sales",
    manager: "Christine Davis",
    phone: "+1-555-0135",
    email: "mark.foster@company.com",
    isDefault: false,
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-27"),
    draftedAt: new Date("2024-01-27"),
    updatedAt: new Date("2024-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "14",
    code: "S014",
    name: "Nicole Turner",
    description: "Channel sales manager coordinating with partners",
    commission: 8.0,
    territory: "Channel Partners",
    experience: "5+ years",
    department: "Channel Sales",
    manager: "Andrew Wilson",
    phone: "+1-555-0136",
    email: "nicole.turner@company.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-28"),
    draftedAt: null,
    updatedAt: new Date("2024-02-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "15",
    code: "S015",
    name: "Ryan Cooper",
    description: "Inside sales representative handling phone and online leads",
    commission: 6.8,
    territory: "Inside Sales",
    experience: "2+ years",
    department: "Inside Sales",
    manager: "Michelle Brown",
    phone: "+1-555-0137",
    email: "ryan.cooper@company.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-29"),
    draftedAt: null,
    updatedAt: new Date("2024-02-03"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "16",
    code: "S016",
    name: "Samantha Lee",
    description: "Government sales specialist for public sector contracts",
    commission: 9.8,
    territory: "Government Sector",
    experience: "7+ years",
    department: "Government Sales",
    manager: "Richard Taylor",
    phone: "+1-555-0138",
    email: "samantha.lee@company.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-30"),
    draftedAt: null,
    updatedAt: new Date("2024-02-04"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "17",
    code: "S017",
    name: "Trevor Scott",
    description: "Sales trainer and mentor for new team members",
    commission: 8.7,
    territory: "Training Division",
    experience: "9+ years",
    department: "Sales Training",
    manager: "Elizabeth Martinez",
    phone: "+1-555-0139",
    email: "trevor.scott@company.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-31"),
    draftedAt: null,
    updatedAt: new Date("2024-02-05"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function SalesmanGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Salesman grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [salesmenData, setSalesmenData] = useState(salesmen);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Salesman",
    message: <ImportStepperTemp />,
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

    const territories = [
      "North Region",
      "South Region",
      "East Region",
      "West Region",
      "Central Region",
      "International",
      "Online Channel",
    ];
    const departments = [
      "Enterprise Sales",
      "Retail Sales",
      "Tech Sales",
      "B2B Sales",
      "Field Sales",
      "Inside Sales",
    ];
    const managers = [
      "Sarah Johnson",
      "Mike Davis",
      "Lisa Wong",
      "Robert Brown",
      "Jennifer Lee",
      "Tom Wilson",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomTerritory =
        territories[Math.floor(Math.random() * territories.length)];
      const randomDepartment =
        departments[Math.floor(Math.random() * departments.length)];
      const randomManager =
        managers[Math.floor(Math.random() * managers.length)];

      return {
        id: `${Date.now()}-${index}`,
        code: `S${(salesmenData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        name: `Salesman ${salesmenData.length + index + 1}`,
        description: `Sales representative ${
          salesmenData.length + index + 1
        } with excellent customer service skills`,
        commission: Math.random() * 12 + 5,
        territory: randomTerritory,
        experience: `${Math.floor(Math.random() * 10) + 1}+ years`,
        department: randomDepartment,
        manager: randomManager,
        phone: `+1-555-${Math.floor(Math.random() * 9999)
          .toString()
          .padStart(4, "0")}`,
        email: `salesman${salesmenData.length + index + 1}@company.com`,
        isDefault: Math.random() > 0.8,
        isActive: Math.random() > 0.3,
        isDraft: Math.random() > 0.7,
        createdAt: new Date(),
        draftedAt: Math.random() > 0.7 ? new Date() : null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      };
    });

    // Stop loading more after reaching 50 items for demo
    if (salesmenData.length >= 46) {
      setHasMore(false);
    } else {
      setSalesmenData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [salesmenData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (salesmanId: string) => {
    setSalesmenData((prevSalesmen) =>
      prevSalesmen.map((salesman) =>
        salesman.id === salesmanId
          ? {
              ...salesman,
              isDeleted: !salesman.isDeleted,
              deletedAt: !salesman.isDeleted ? new Date() : null,
            }
          : salesman
      )
    );
  };

  const handleRestoreClick = (salesmanId: string) => {
    setSalesmenData((prevSalesmen) =>
      prevSalesmen.map((salesman) =>
        salesman.id === salesmanId
          ? {
              ...salesman,
              isDeleted: false,
              deletedAt: null,
            }
          : salesman
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (salesmanId: string) => {
    setSalesmenData((prevSalesmen) =>
      prevSalesmen.map((salesman) =>
        salesman.id === salesmanId
          ? {
              ...salesman,
              isActive: !salesman.isActive,
              updatedAt: new Date(),
            }
          : salesman
      )
    );
  };

  // Filter salesmen based on search query
  const filteredSalesmen = salesmenData.filter(
    (salesman) =>
      salesman.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salesman.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salesman.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salesman.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salesman.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salesman.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salesman.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent">
      {/* Fixed header controls - keep existing header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-  rounded-full min-w-[60px] sm:min-w-[80px]"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer rounded-full"
              onClick={() => {
                open();
                setModalData({
                  title: "Import Salesman",
                  message: <ImportStepperTemp />,
                });
              }}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          </div>

          {/* Search */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-xs mx-auto">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400 z-10" />
                <Input
                  placeholder="Search salesmen..."
                  className="pl-9 pr-9 w-full rounded-full relative z-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Tooltip
                  arrowOffset={10}
                  arrowSize={7}
                  withArrow
                  position="top"
                  label="Search by voice"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0 z-10"
                  >
                    <Mic className="h-4 w-4 text-blue-700" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Right buttons */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isExportOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsExportOpen(!isExportOpen);
                setIsFilterOpen(false);
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.export")}</span>
            </Button>

            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isFilterOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsExportOpen(false);
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>
          </div>
        </div>
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
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
            {filteredSalesmen.map((salesman) => (
              <Card
                key={salesman.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 2 Column Grid Layout (No Logo) */}
                <div className="grid grid-cols-2 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={salesman.name} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/salesman/${salesman.id}`)}
                      >
                        {salesman.name}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Right - Action Icons */}
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        salesman.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          salesman.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(salesman.id);
                          toastSuccess(
                            salesman.isActive
                              ? "Salesman deactivated successfully"
                              : "Salesman activated successfully"
                          );
                        }}
                      >
                        {salesman.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={salesman.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          salesman.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (salesman.isDeleted) {
                            handleRestoreClick(salesman.id);
                          } else {
                            handleDeleteClick(salesman.id);
                          }
                          toastSuccess(
                            salesman.isDeleted
                              ? "Salesman restored successfully"
                              : "Salesman deleted successfully"
                          );
                        }}
                      >
                        {salesman.isDeleted ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip label="Edit" position="top" withArrow>
                      <div
                        className="cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center"
                        onClick={() =>
                          navigate(`/salesman/${salesman.id}/edit`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Code | Status Badges | Commission */}
                <div className="grid grid-cols-3 items-start gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {salesman.code}
                    </div>
                  </div>

                  {/* Status Badges - Center aligned */}
                  <div className="flex justify-center items-center gap-1 pt-3">
                    {salesman.isDefault && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Default
                      </span>
                    )}
                    {salesman.isDraft && (
                      <span className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Commission - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Commission
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {salesman.commission.toFixed(1)}%
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
                <span className="text-sm">Loading more salesmen...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSalesmen.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more salesmen to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={salesmen}
                setFilteredData={setSalesmenData}
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
                data={salesmen}
                setFilteredData={setSalesmenData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div className="">
            <h3 className="text-lg font-semibold pl-4 ">Import Salesman</h3>
          </div>
        }
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        style={{ zIndex: 9999 }}
        className="z-[9999]"
        centered
      >
        <div className="pt-5 pb-14 px-5">{modalData.message}</div>
      </Modal>
    </div>
  );
}
