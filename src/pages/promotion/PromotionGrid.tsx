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

// Define Promotion interface to ensure type consistency
interface Promotion {
  id: string;
  code: string;
  employeeName: string;
  description: string;
  fromPosition: string;
  toPosition: string;
  fromDepartment: string;
  toDepartment: string;
  fromSalary: number;
  toSalary: number;
  promotionDate: Date;
  effectiveDate: Date;
  reason: string;
  approvedBy: string;
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
const promotions: Promotion[] = [
  {
    id: "1",
    code: "P001",
    employeeName: "John Smith",
    description: "Promotion to Senior Manager due to exceptional performance",
    fromPosition: "Manager",
    toPosition: "Senior Manager",
    fromDepartment: "Sales",
    toDepartment: "Sales",
    fromSalary: 75000,
    toSalary: 90000,
    promotionDate: new Date("2024-01-15"),
    effectiveDate: new Date("2024-02-01"),
    reason: "Outstanding sales performance and team leadership",
    approvedBy: "Sarah Johnson",
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
    code: "P002",
    employeeName: "Emily Rodriguez",
    description: "Cross-departmental promotion to Marketing Lead",
    fromPosition: "Sales Representative",
    toPosition: "Marketing Lead",
    fromDepartment: "Sales",
    toDepartment: "Marketing",
    fromSalary: 55000,
    toSalary: 70000,
    promotionDate: new Date("2024-01-16"),
    effectiveDate: new Date("2024-02-15"),
    reason: "Excellent customer relations and marketing insight",
    approvedBy: "Mike Davis",
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
    code: "P003",
    employeeName: "Michael Chen",
    description: "Technical promotion to Senior Developer",
    fromPosition: "Junior Developer",
    toPosition: "Senior Developer",
    fromDepartment: "IT",
    toDepartment: "IT",
    fromSalary: 60000,
    toSalary: 80000,
    promotionDate: new Date("2024-01-17"),
    effectiveDate: new Date("2024-03-01"),
    reason: "Outstanding technical skills and project leadership",
    approvedBy: "Lisa Wong",
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
    code: "P004",
    employeeName: "Sarah Williams",
    description: "Promotion to Department Head",
    fromPosition: "Team Lead",
    toPosition: "Department Head",
    fromDepartment: "Customer Service",
    toDepartment: "Customer Service",
    fromSalary: 65000,
    toSalary: 85000,
    promotionDate: new Date("2024-01-18"),
    effectiveDate: new Date("2024-02-20"),
    reason: "Exceptional team management and customer satisfaction",
    approvedBy: "Robert Brown",
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
    code: "P005",
    employeeName: "David Thompson",
    description: "Regional promotion to District Manager",
    fromPosition: "Store Manager",
    toPosition: "District Manager",
    fromDepartment: "Operations",
    toDepartment: "Operations",
    fromSalary: 70000,
    toSalary: 95000,
    promotionDate: new Date("2024-01-19"),
    effectiveDate: new Date("2024-03-15"),
    reason: "Excellent regional performance and leadership skills",
    approvedBy: "Jennifer Lee",
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
    code: "P006",
    employeeName: "Jessica Martinez",
    description: "Promotion to Senior Accountant",
    fromPosition: "Accountant",
    toPosition: "Senior Accountant",
    fromDepartment: "Finance",
    toDepartment: "Finance",
    fromSalary: 55000,
    toSalary: 72000,
    promotionDate: new Date("2024-01-20"),
    effectiveDate: new Date("2024-02-10"),
    reason: "Outstanding financial analysis and reporting skills",
    approvedBy: "Tom Wilson",
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
    code: "P007",
    employeeName: "Alexander Kim",
    description: "Promotion to Product Manager",
    fromPosition: "Business Analyst",
    toPosition: "Product Manager",
    fromDepartment: "Product",
    toDepartment: "Product",
    fromSalary: 65000,
    toSalary: 85000,
    promotionDate: new Date("2024-01-21"),
    effectiveDate: new Date("2024-03-01"),
    reason: "Exceptional product vision and stakeholder management",
    approvedBy: "Maria Garcia",
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
    code: "P008",
    employeeName: "Amanda Taylor",
    description: "Cross-functional promotion to HR Manager",
    fromPosition: "HR Specialist",
    toPosition: "HR Manager",
    fromDepartment: "Human Resources",
    toDepartment: "Human Resources",
    fromSalary: 60000,
    toSalary: 80000,
    promotionDate: new Date("2024-01-22"),
    effectiveDate: new Date("2024-02-20"),
    reason: "Excellent employee relations and policy development",
    approvedBy: "Kevin Anderson",
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
    code: "P009",
    employeeName: "Carlos Hernandez",
    description: "Technical promotion to Lead Developer",
    fromPosition: "Software Developer",
    toPosition: "Lead Developer",
    fromDepartment: "Engineering",
    toDepartment: "Engineering",
    fromSalary: 75000,
    toSalary: 95000,
    promotionDate: new Date("2024-01-23"),
    effectiveDate: new Date("2024-03-15"),
    reason: "Outstanding technical leadership and code quality",
    approvedBy: "Patricia White",
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
    code: "P010",
    employeeName: "Rachel Green",
    description: "Promotion to Director of Operations",
    fromPosition: "Operations Manager",
    toPosition: "Director of Operations",
    fromDepartment: "Operations",
    toDepartment: "Operations",
    fromSalary: 85000,
    toSalary: 110000,
    promotionDate: new Date("2024-01-24"),
    effectiveDate: new Date("2024-04-01"),
    reason: "Exceptional operational efficiency and team leadership",
    approvedBy: "Steven Clark",
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
    code: "P011",
    employeeName: "James Moore",
    description: "Promotion to Senior Marketing Specialist",
    fromPosition: "Marketing Coordinator",
    toPosition: "Senior Marketing Specialist",
    fromDepartment: "Marketing",
    toDepartment: "Marketing",
    fromSalary: 50000,
    toSalary: 65000,
    promotionDate: new Date("2024-01-25"),
    effectiveDate: new Date("2024-02-15"),
    reason: "Outstanding campaign performance and creativity",
    approvedBy: "Nancy Lewis",
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
    code: "P012",
    employeeName: "Lisa Johnson",
    description: "Promotion to Quality Assurance Lead",
    fromPosition: "QA Tester",
    toPosition: "QA Lead",
    fromDepartment: "Quality Assurance",
    toDepartment: "Quality Assurance",
    fromSalary: 55000,
    toSalary: 75000,
    promotionDate: new Date("2024-01-26"),
    effectiveDate: new Date("2024-03-01"),
    reason: "Excellent testing methodologies and team coordination",
    approvedBy: "Daniel Miller",
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
    code: "P013",
    employeeName: "Mark Foster",
    description: "International promotion to Regional Director",
    fromPosition: "Country Manager",
    toPosition: "Regional Director",
    fromDepartment: "International",
    toDepartment: "International",
    fromSalary: 90000,
    toSalary: 120000,
    promotionDate: new Date("2024-01-27"),
    effectiveDate: new Date("2024-04-15"),
    reason: "Outstanding international market expansion",
    approvedBy: "Christine Davis",
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
    code: "P014",
    employeeName: "Nicole Turner",
    description: "Promotion to Customer Success Manager",
    fromPosition: "Customer Support Specialist",
    toPosition: "Customer Success Manager",
    fromDepartment: "Customer Service",
    toDepartment: "Customer Success",
    fromSalary: 45000,
    toSalary: 60000,
    promotionDate: new Date("2024-01-28"),
    effectiveDate: new Date("2024-02-25"),
    reason: "Exceptional customer satisfaction and retention",
    approvedBy: "Andrew Wilson",
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
    code: "P015",
    employeeName: "Ryan Cooper",
    description: "Promotion to Senior Data Analyst",
    fromPosition: "Data Analyst",
    toPosition: "Senior Data Analyst",
    fromDepartment: "Analytics",
    toDepartment: "Analytics",
    fromSalary: 60000,
    toSalary: 78000,
    promotionDate: new Date("2024-01-29"),
    effectiveDate: new Date("2024-03-10"),
    reason: "Outstanding data insights and analytical skills",
    approvedBy: "Michelle Brown",
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
    code: "P016",
    employeeName: "Samantha Lee",
    description: "Promotion to Legal Counsel",
    fromPosition: "Legal Assistant",
    toPosition: "Legal Counsel",
    fromDepartment: "Legal",
    toDepartment: "Legal",
    fromSalary: 55000,
    toSalary: 85000,
    promotionDate: new Date("2024-01-30"),
    effectiveDate: new Date("2024-04-01"),
    reason: "Outstanding legal expertise and contract management",
    approvedBy: "Richard Taylor",
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
    code: "P017",
    employeeName: "Trevor Scott",
    description: "Promotion to Training Manager",
    fromPosition: "Training Coordinator",
    toPosition: "Training Manager",
    fromDepartment: "Learning & Development",
    toDepartment: "Learning & Development",
    fromSalary: 50000,
    toSalary: 70000,
    promotionDate: new Date("2024-01-31"),
    effectiveDate: new Date("2024-03-01"),
    reason: "Excellent training program development and delivery",
    approvedBy: "Elizabeth Martinez",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-31"),
    draftedAt: null,
    updatedAt: new Date("2024-02-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "18",
    code: "P018",
    employeeName: "Victoria Chen",
    description: "Promotion to Senior UX Designer",
    fromPosition: "UX Designer",
    toPosition: "Senior UX Designer",
    fromDepartment: "Design",
    toDepartment: "Design",
    fromSalary: 65000,
    toSalary: 85000,
    promotionDate: new Date("2024-02-01"),
    effectiveDate: new Date("2024-03-15"),
    reason: "Outstanding user experience design and research",
    approvedBy: "Jason Rodriguez",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-01"),
    draftedAt: null,
    updatedAt: new Date("2024-02-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "19",
    code: "P019",
    employeeName: "Brandon Wilson",
    description: "Promotion to Security Manager",
    fromPosition: "Security Analyst",
    toPosition: "Security Manager",
    fromDepartment: "Information Security",
    toDepartment: "Information Security",
    fromSalary: 70000,
    toSalary: 90000,
    promotionDate: new Date("2024-02-02"),
    effectiveDate: new Date("2024-04-01"),
    reason: "Exceptional security protocols and incident response",
    approvedBy: "Ashley Thompson",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-02"),
    draftedAt: null,
    updatedAt: new Date("2024-02-07"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "20",
    code: "P020",
    employeeName: "Sophia Rodriguez",
    description: "Promotion to Senior Research Analyst",
    fromPosition: "Research Analyst",
    toPosition: "Senior Research Analyst",
    fromDepartment: "Research & Development",
    toDepartment: "Research & Development",
    fromSalary: 60000,
    toSalary: 80000,
    promotionDate: new Date("2024-02-03"),
    effectiveDate: new Date("2024-03-20"),
    reason: "Outstanding research methodology and innovation",
    approvedBy: "Christopher Lee",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-03"),
    draftedAt: null,
    updatedAt: new Date("2024-02-08"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function PromotionGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Promotion grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [promotionsData, setPromotionsData] = useState(promotions);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Promotion",
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

    const positions = [
      "Manager",
      "Senior Manager",
      "Team Lead",
      "Director",
      "Senior Developer",
      "Project Manager",
    ];
    const departments = [
      "Sales",
      "Marketing",
      "IT",
      "HR",
      "Operations",
      "Finance",
    ];
    const approvers = [
      "Sarah Johnson",
      "Mike Davis",
      "Lisa Wong",
      "Robert Brown",
      "Jennifer Lee",
      "Tom Wilson",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomFromPosition =
        positions[Math.floor(Math.random() * positions.length)];
      const randomToPosition =
        positions[Math.floor(Math.random() * positions.length)];
      const randomDepartment =
        departments[Math.floor(Math.random() * departments.length)];
      const randomApprover =
        approvers[Math.floor(Math.random() * approvers.length)];

      return {
        id: `${Date.now()}-${index}`,
        code: `P${(promotionsData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        employeeName: `Employee ${promotionsData.length + index + 1}`,
        description: `Promotion ${
          promotionsData.length + index + 1
        } due to excellent performance`,
        fromPosition: randomFromPosition,
        toPosition: randomToPosition,
        fromDepartment: randomDepartment,
        toDepartment: randomDepartment,
        fromSalary: Math.floor(Math.random() * 50000) + 40000,
        toSalary: Math.floor(Math.random() * 70000) + 60000,
        promotionDate: new Date(),
        effectiveDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        reason: "Outstanding performance and dedication",
        approvedBy: randomApprover,
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
    if (promotionsData.length >= 46) {
      setHasMore(false);
    } else {
      setPromotionsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [promotionsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (promotionId: string) => {
    setPromotionsData((prevPromotions) =>
      prevPromotions.map((promotion) =>
        promotion.id === promotionId
          ? {
              ...promotion,
              isDeleted: !promotion.isDeleted,
              deletedAt: !promotion.isDeleted ? new Date() : null,
            }
          : promotion
      )
    );
  };

  const handleRestoreClick = (promotionId: string) => {
    setPromotionsData((prevPromotions) =>
      prevPromotions.map((promotion) =>
        promotion.id === promotionId
          ? {
              ...promotion,
              isDeleted: false,
              deletedAt: null,
            }
          : promotion
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (promotionId: string) => {
    setPromotionsData((prevPromotions) =>
      prevPromotions.map((promotion) =>
        promotion.id === promotionId
          ? {
              ...promotion,
              isActive: !promotion.isActive,
              updatedAt: new Date(),
            }
          : promotion
      )
    );
  };

  // Filter promotions based on search query
  const filteredPromotions = promotionsData.filter(
    (promotion) =>
      promotion.employeeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      promotion.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.fromPosition
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      promotion.toPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.fromDepartment
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      promotion.toDepartment
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      promotion.approvedBy.toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import Promotion",
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
                  placeholder="Search promotions..."
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
            {filteredPromotions.map((promotion) => (
              <Card
                key={promotion.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 2 Column Grid Layout (No Logo) */}
                <div className="grid grid-cols-2 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip
                      label={promotion.employeeName}
                      position="top"
                      withArrow
                    >
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/promotion/${promotion.id}`)}
                      >
                        {promotion.employeeName}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Right - Action Icons */}
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        promotion.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          promotion.isActive
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(promotion.id);
                          toastSuccess(
                            promotion.isActive
                              ? "Promotion deactivated successfully"
                              : "Promotion activated successfully"
                          );
                        }}
                      >
                        {promotion.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={promotion.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          promotion.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (promotion.isDeleted) {
                            handleRestoreClick(promotion.id);
                          } else {
                            handleDeleteClick(promotion.id);
                          }
                          toastSuccess(
                            promotion.isDeleted
                              ? "Promotion restored successfully"
                              : "Promotion deleted successfully"
                          );
                        }}
                      >
                        {promotion.isDeleted ? (
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
                          navigate(`/promotion/${promotion.id}/edit`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Code | Status Badges | Salary Increase */}
                <div className="grid grid-cols-3 items-start gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {promotion.code}
                    </div>
                  </div>

                  {/* Status Badges - Center aligned */}
                  <div className="flex justify-center items-center gap-1 pt-3">
                    {promotion.isDefault && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Default
                      </span>
                    )}
                    {promotion.isDraft && (
                      <span className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Salary Increase - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Increase
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      $
                      {(
                        promotion.toSalary - promotion.fromSalary
                      ).toLocaleString()}
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
                <span className="text-sm">Loading more promotions...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredPromotions.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more promotions to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={promotions}
                setFilteredData={setPromotionsData}
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
                data={promotions}
                setFilteredData={setPromotionsData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Promotion</h3>
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
