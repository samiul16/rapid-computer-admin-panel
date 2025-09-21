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

// Define Branch interface to ensure type consistency
interface Branch {
  id: string;
  code: string;
  name: string;
  taxNumber: string;
  phone: string;
  fax: string;
  mobile: string;
  email: string;
  website: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postCode: string;
  bankDetails: string;
  logo: string;
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
const branches: Branch[] = [
  {
    id: "1",
    code: "B001",
    name: "TechCorp Main Branch",
    taxNumber: "TX123456789",
    phone: "+1-555-0101",
    fax: "+1-555-0102",
    mobile: "+1-555-0103",
    email: "main@techcorp.com",
    website: "https://techcorp.com",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    address: "123 Main Street, LA",
    postCode: "90210",
    bankDetails: "Bank of America - 123456789",
    logo: "https://logo.clearbit.com/techcorp.com",
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
    code: "B002",
    name: "Global Innovations Downtown",
    taxNumber: "TX987654321",
    phone: "+1-555-0201",
    fax: "+1-555-0202",
    mobile: "+1-555-0203",
    email: "downtown@globalinnovations.com",
    website: "https://globalinnovations.com",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    address: "456 Innovation Ave, Toronto",
    postCode: "M5V 3A8",
    bankDetails: "TD Bank - 987654321",
    logo: "https://logo.clearbit.com/globalinnovations.com",
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
    code: "B003",
    name: "Tokyo Digital Shibuya Office",
    taxNumber: "JP123456789",
    phone: "+81-3-1234-5678",
    fax: "+81-3-1234-5679",
    mobile: "+81-90-1234-5678",
    email: "shibuya@tokyodigital.jp",
    website: "https://tokyodigital.jp",
    country: "Japan",
    state: "Tokyo",
    city: "Tokyo",
    address: "1-1-1 Shibuya, Tokyo",
    postCode: "150-0002",
    bankDetails: "Mizuho Bank - JP123456789",
    logo: "https://logo.clearbit.com/tokyodigital.jp",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2024-01-17"),
    draftedAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    code: "B004",
    name: "Munich Engineering Central",
    taxNumber: "DE123456789",
    phone: "+49-89-1234567",
    fax: "+49-89-1234568",
    mobile: "+49-151-12345678",
    email: "central@municheng.de",
    website: "https://municheng.de",
    country: "Germany",
    state: "Bavaria",
    city: "Munich",
    address: "Marienplatz 1, Munich",
    postCode: "80331",
    bankDetails: "Deutsche Bank - DE123456789",
    logo: "https://logo.clearbit.com/municheng.de",
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
    code: "B005",
    name: "Paris Fashion Champs-Élysées",
    taxNumber: "FR123456789",
    phone: "+33-1-23456789",
    fax: "+33-1-23456790",
    mobile: "+33-6-12345678",
    email: "champselysees@parisfashion.fr",
    website: "https://parisfashion.fr",
    country: "France",
    state: "Ile-de-France",
    city: "Paris",
    address: "123 Champs-Élysées, Paris",
    postCode: "75008",
    bankDetails: "BNP Paribas - FR123456789",
    logo: "https://logo.clearbit.com/parisfashion.fr",
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
    code: "B006",
    name: "Milano Design Via Montenapoleone",
    taxNumber: "IT123456789",
    phone: "+39-02-12345678",
    fax: "+39-02-12345679",
    mobile: "+39-320-1234567",
    email: "montenapoleone@milanodesign.it",
    website: "https://milanodesign.it",
    country: "Italy",
    state: "Lombardy",
    city: "Milan",
    address: "Via Montenapoleone 1, Milan",
    postCode: "20121",
    bankDetails: "UniCredit - IT123456789",
    logo: "https://logo.clearbit.com/milanodesign.it",
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
    code: "B007",
    name: "Madrid Marketing Gran Vía",
    taxNumber: "ES123456789",
    phone: "+34-91-1234567",
    fax: "+34-91-1234568",
    mobile: "+34-600-123456",
    email: "granvia@madridmarketing.es",
    website: "https://madridmarketing.es",
    country: "Spain",
    state: "Madrid",
    city: "Madrid",
    address: "Gran Vía 1, Madrid",
    postCode: "28013",
    bankDetails: "Santander - ES123456789",
    logo: "https://logo.clearbit.com/madridmarketing.es",
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
    code: "B008",
    name: "Porto Tech Santa Catarina",
    taxNumber: "PT123456789",
    phone: "+351-22-1234567",
    fax: "+351-22-1234568",
    mobile: "+351-91-1234567",
    email: "santacatarina@portotech.pt",
    website: "https://portotech.pt",
    country: "Portugal",
    state: "Porto",
    city: "Porto",
    address: "Rua de Santa Catarina 1, Porto",
    postCode: "4000-447",
    bankDetails: "Millennium BCP - PT123456789",
    logo: "https://logo.clearbit.com/portotech.pt",
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
    code: "B009",
    name: "Zurich Financial Bahnhofstrasse",
    taxNumber: "CH123456789",
    phone: "+41-44-1234567",
    fax: "+41-44-1234568",
    mobile: "+41-79-1234567",
    email: "bahnhofstrasse@zurichfinancial.ch",
    website: "https://zurichfinancial.ch",
    country: "Switzerland",
    state: "Zurich",
    city: "Zurich",
    address: "Bahnhofstrasse 1, Zurich",
    postCode: "8001",
    bankDetails: "UBS - CH123456789",
    logo: "https://logo.clearbit.com/zurichfinancial.ch",
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
    code: "B010",
    name: "Amsterdam Trade Damrak Office",
    taxNumber: "NL123456789",
    phone: "+31-20-1234567",
    fax: "+31-20-1234568",
    mobile: "+31-6-12345678",
    email: "damrak@amsterdamtrade.nl",
    website: "https://amsterdamtrade.nl",
    country: "Netherlands",
    state: "North Holland",
    city: "Amsterdam",
    address: "Damrak 1, Amsterdam",
    postCode: "1012 LG",
    bankDetails: "ING Bank - NL123456789",
    logo: "https://logo.clearbit.com/amsterdamtrade.nl",
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
    code: "B011",
    name: "Brussels Consulting Grand Place",
    taxNumber: "BE123456789",
    phone: "+32-2-1234567",
    fax: "+32-2-1234568",
    mobile: "+32-4-12345678",
    email: "grandplace@brusselsconsulting.be",
    website: "https://brusselsconsulting.be",
    country: "Belgium",
    state: "Brussels",
    city: "Brussels",
    address: "Grand Place 1, Brussels",
    postCode: "1000",
    bankDetails: "KBC Bank - BE123456789",
    logo: "https://logo.clearbit.com/brusselsconsulting.be",
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
    code: "B012",
    name: "European Holdings Avenue Louise",
    taxNumber: "BE987654321",
    phone: "+32-2-9876543",
    fax: "+32-2-9876544",
    mobile: "+32-4-98765432",
    email: "avenuelouise@europeanholdings.be",
    website: "https://europeanholdings.be",
    country: "Belgium",
    state: "Brussels",
    city: "Brussels",
    address: "Avenue Louise 100, Brussels",
    postCode: "1050",
    bankDetails: "BNP Paribas Fortis - BE987654321",
    logo: "https://logo.clearbit.com/europeanholdings.be",
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
    code: "B013",
    name: "Brussels Tech Hub Rue de la Loi",
    taxNumber: "BE555666777",
    phone: "+32-2-5556667",
    fax: "+32-2-5556668",
    mobile: "+32-4-55566677",
    email: "ruedelaloi@brusselstechhub.be",
    website: "https://brusselstechhub.be",
    country: "Belgium",
    state: "Brussels",
    city: "Brussels",
    address: "Rue de la Loi 200, Brussels",
    postCode: "1049",
    bankDetails: "Belfius Bank - BE555666777",
    logo: "https://logo.clearbit.com/brusselstechhub.be",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-27"),
    draftedAt: null,
    updatedAt: new Date("2024-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "14",
    code: "B014",
    name: "London Financial Canary Wharf",
    taxNumber: "GB123456789",
    phone: "+44-20-12345678",
    fax: "+44-20-12345679",
    mobile: "+44-7700-123456",
    email: "canarywharf@londonfinancial.co.uk",
    website: "https://londonfinancial.co.uk",
    country: "United Kingdom",
    state: "England",
    city: "London",
    address: "1 Canary Wharf, London",
    postCode: "E14 5AB",
    bankDetails: "Barclays Bank - GB123456789",
    logo: "https://logo.clearbit.com/londonfinancial.co.uk",
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
    code: "B015",
    name: "Global Marketing Place Flagey",
    taxNumber: "BE111222333",
    phone: "+32-2-1112223",
    fax: "+32-2-1112224",
    mobile: "+32-4-11122233",
    email: "placeflagey@globalmarketing.be",
    website: "https://globalmarketing.be",
    country: "Belgium",
    state: "Brussels",
    city: "Brussels",
    address: "Place Eugène Flagey 18, Brussels",
    postCode: "1050",
    bankDetails: "Crelan Bank - BE111222333",
    logo: "https://logo.clearbit.com/globalmarketing.be",
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
    code: "B016",
    name: "Digital Innovation Boulevard Anspach",
    taxNumber: "BE444555666",
    phone: "+32-2-4445556",
    fax: "+32-2-4445557",
    mobile: "+32-4-44455566",
    email: "anspach@digitalinnovation.be",
    website: "https://digitalinnovation.be",
    country: "Belgium",
    state: "Brussels",
    city: "Brussels",
    address: "Boulevard Anspach 111, Brussels",
    postCode: "1000",
    bankDetails: "Argenta Bank - BE444555666",
    logo: "https://logo.clearbit.com/digitalinnovation.be",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-30"),
    draftedAt: null,
    updatedAt: new Date("2024-02-04"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function BranchesGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Branches grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [branchesData, setBranchesData] = useState(branches);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Branch",
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

    const countries = [
      "United States",
      "Canada",
      "Japan",
      "Germany",
      "France",
      "Italy",
    ];
    const states = [
      "California",
      "Ontario",
      "Tokyo",
      "Bavaria",
      "Ile-de-France",
      "Lombardy",
    ];
    const cities = [
      "Los Angeles",
      "Toronto",
      "Tokyo",
      "Munich",
      "Paris",
      "Milan",
    ];
    const branchTypes = [
      "Main",
      "Downtown",
      "Central",
      "North",
      "South",
      "East",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomIndex = Math.floor(Math.random() * countries.length);
      return {
        id: `${Date.now()}-${index}`,
        code: `B${(branchesData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        name: `${
          branchTypes[Math.floor(Math.random() * branchTypes.length)]
        } Branch ${branchesData.length + index + 1}`,
        taxNumber: `TX${Math.random().toString().substring(2, 11)}`,
        phone: `+1-555-${Math.random().toString().substring(2, 6)}`,
        fax: `+1-555-${Math.random().toString().substring(2, 6)}`,
        mobile: `+1-555-${Math.random().toString().substring(2, 6)}`,
        email: `branch${branchesData.length + index + 1}@company.com`,
        website: `https://branch${branchesData.length + index + 1}.com`,
        country: countries[randomIndex],
        state: states[randomIndex],
        city: cities[randomIndex],
        address: `${Math.floor(Math.random() * 999) + 1} Branch St`,
        postCode: Math.random().toString().substring(2, 7),
        bankDetails: `Bank Details ${branchesData.length + index + 1}`,
        logo: `https://logo.clearbit.com/branch${
          branchesData.length + index + 1
        }.com`,
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
    if (branchesData.length >= 46) {
      setHasMore(false);
    } else {
      setBranchesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [branchesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (branchId: string) => {
    setBranchesData((prevBranches) =>
      prevBranches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              isDeleted: !branch.isDeleted,
              deletedAt: !branch.isDeleted ? new Date() : null,
            }
          : branch
      )
    );
  };

  const handleRestoreClick = (branchId: string) => {
    setBranchesData((prevBranches) =>
      prevBranches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              isDeleted: false,
              deletedAt: null,
            }
          : branch
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (branchId: string) => {
    setBranchesData((prevBranches) =>
      prevBranches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              isActive: !branch.isActive,
              updatedAt: new Date(),
            }
          : branch
      )
    );
  };

  // Filter branches based on search query
  const filteredBranches = branchesData.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.taxNumber.toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import Branch",
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
                  placeholder="Search branches..."
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
            {filteredBranches.map((branch) => (
              <Card
                key={branch.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 3 Column Grid Layout */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={branch.name} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/branches/${branch.id}`)}
                      >
                        {branch.name}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Center - Action Icons */}
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        branch.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          branch.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(branch.id);
                          toastSuccess(
                            branch.isActive
                              ? "Branch deactivated successfully"
                              : "Branch activated successfully"
                          );
                        }}
                      >
                        {branch.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={branch.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          branch.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (branch.isDeleted) {
                            handleRestoreClick(branch.id);
                          } else {
                            handleDeleteClick(branch.id);
                          }
                          toastSuccess(
                            branch.isDeleted
                              ? "Branch restored successfully"
                              : "Branch deleted successfully"
                          );
                        }}
                      >
                        {branch.isDeleted ? (
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
                        onClick={() => navigate(`/branches/${branch.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Logo */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          branch.name
                        )}&background=random&color=fff&size=40&bold=true&format=svg`}
                        alt={`${branch.name} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          // Fallback to initials with branch code colors
                          const colors = [
                            "FF6B6B",
                            "4ECDC4",
                            "45B7D1",
                            "FFA07A",
                            "98D8C8",
                            "F7DC6F",
                          ];
                          const colorIndex =
                            branch.code.charCodeAt(branch.code.length - 1) %
                            colors.length;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            branch.name
                          )}&background=${
                            colors[colorIndex]
                          }&color=fff&size=40&bold=true&format=svg`;
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Code | Default | Email */}
                <div className="grid grid-cols-3 items-start gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {branch.code}
                    </div>
                  </div>

                  {/* Status Badges - Center aligned */}
                  <div className="flex justify-center items-center gap-1 pt-3">
                    {branch.isDefault && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Default
                      </span>
                    )}
                    {branch.isDraft && (
                      <span className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Email - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Email
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {branch.email}
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
                <span className="text-sm">Loading more branches...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredBranches.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more branches to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={branches}
                setFilteredData={setBranchesData}
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
                data={branches}
                setFilteredData={setBranchesData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Branch</h3>
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
