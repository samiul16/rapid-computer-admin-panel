import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  Package,
  List,
  FileText,
  ChevronLeft,
  ChevronRight,
  TabletSmartphone,
  Sun,
  Moon,
  Map,
  CalendarClock,
  Dices,
  Store,
  PaintBucket,
  PencilRuler,
  UserPlus,
  PackageOpen,
  Receipt,
  IndentIncrease,
  DatabaseBackup,
  Calculator,
  Undo2,
  Shield,
  Languages,
  ClipboardCheck,
  CheckSquare,
  X,
} from "lucide-react";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import SubSidebar from "./SubSidebar";
import type { LucideIcon } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";

type SubSidebarItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

const Sidebar = ({
  isSidebarCollapsed: isCollapsed,
  onSidebarCollapseChange: setIsCollapsed,
}: {
  isSidebarCollapsed: boolean;
  onSidebarCollapseChange: (collapsed: boolean) => void;
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("search");
  const [subSidebarWidth, setSubSidebarWidth] = useState("w-0");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const { theme, toggleTheme } = useTheme();
  const [subSidebarItems, setSubSidebarItems] = useState<SubSidebarItem[]>([]);
  const [subSidebarTitle, setSubSidebarTitle] = useState<string>("");
  const isMobile = useIsMobile();

  const isRTL = i18n.language === "ar";

  const fixedTopMenus = [
    {
      key: "search",
      icon: Search,
      label: t("sidebar.menu.search"),
      path: "/search",
    },
  ];

  // const scrollableMenus = [

  //   // REMOVEABLE

  //   {
  //     key: "country",
  //     icon: Globe,
  //     label: t("sidebar.menu.country"),
  //     path: "/countries",
  //   },

  //   {
  //     key: "translation",
  //     icon: ArrowLeftRight,
  //     label: "Translation",
  //     path: "/translation",
  //   },
  //   {
  //     key: "chart-of-accounts",
  //     icon: List,
  //     label: "Chart of Accounts",
  //     path: "/chart-of-accounts",
  //   },
  //   {
  //     key: "states",
  //     icon: Map,
  //     label: t("sidebar.menu.states"),
  //     path: "/states",
  //   },
  //   {
  //     key: "icons",
  //     icon: PencilRuler,
  //     label: "Icons",
  //     path: "/icons",
  //   },

  //   {
  //     key: "expense-reports",
  //     icon: DollarSign,
  //     path: "/expense-reports",
  //     label: t("sidebar.menu.expenseReports"),
  //   },
  //   {
  //     key: "supplier-items-report",
  //     icon: CreditCard,
  //     label: t("sidebar.menu.supplierItemsReport"),
  //     path: "/supplier-items-report",
  //   },

  //   {
  //     key: "cities",
  //     icon: Building2,
  //     label: t("sidebar.menu.cities"),
  //     path: "/cities",
  //   },
  //   {
  //     key: "areas",
  //     icon: Map,
  //     label: t("sidebar.menu.areas"),
  //     path: "/areas",
  //   },
  //   {
  //     key: "customers",
  //     icon: Users,
  //     label: t("sidebar.menu.customers"),
  //     path: "/customers",
  //   },
  //   {
  //     key: "customer-group",
  //     icon: Users,
  //     label: t("sidebar.menu.customerGroups"),
  //     path: "/customer-group",
  //   },
  //   {
  //     key: "suppliers",
  //     icon: Container,
  //     label: t("sidebar.menu.suppliers"),
  //     path: "/supplier",
  //   },
  //   {
  //     key: "suppliers-group",
  //     icon: Users,
  //     label: t("sidebar.menu.suppliersGroups"),
  //     path: "/suppliers-group",
  //   },
  //   {
  //     key: "currencies",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.currencies"),
  //     path: "/currencies",
  //   },

  //   {
  //     key: "deliverymen",
  //     icon: Truck,
  //     label: t("sidebar.menu.deliverymen"),
  //     path: "/deliverymen",
  //   },

  //   {
  //     key: "bed",
  //     icon: Warehouse,
  //     label: t("sidebar.menu.bed"),
  //     path: "/bed",
  //   },
  //   {
  //     key: "bed-transfer",
  //     icon: Warehouse,
  //     label: t("sidebar.menu.bedTransfer"),
  //     path: "/bed-transfer",
  //   },
  //   {
  //     key: "bed-assign",
  //     icon: Warehouse,
  //     label: t("sidebar.menu.bedAssign"),
  //     path: "/bed-assign",
  //   },
  //   {
  //     key: "bed-reports",
  //     icon: Warehouse,
  //     label: t("sidebar.menu.bedReports"),
  //     path: "/bed-reports",
  //   },
  //   {
  //     key: "order-type",
  //     icon: Logs,
  //     label: t("sidebar.menu.orderType"),
  //     path: "/order-type",
  //   },

  //   {
  //     key: "groups",
  //     icon: Component,
  //     label: t("sidebar.menu.groups"),
  //     path: "/groups",
  //   },
  //   {
  //     key: "divisions",
  //     icon: CircleSlash,
  //     label: t("sidebar.menu.divisions"),
  //     path: "/divisions",
  //   },
  //   {
  //     key: "sections",
  //     icon: SquareLibrary,
  //     label: t("sidebar.menu.sections"),
  //     path: "/sections",
  //   },
  //   {
  //     key: "salesman",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.salesman"),
  //     path: "/salesman",
  //   },
  //   {
  //     key: "promotion",
  //     icon: Gift,
  //     label: t("sidebar.menu.promotion"),
  //     path: "/promotion",
  //   },
  //   {
  //     key: "warehouse",
  //     icon: Warehouse,
  //     label: t("sidebar.menu.warehouse"),
  //     path: "/warehouse",
  //   },
  //   {
  //     key: "shelf",
  //     icon: CircleUserRound,
  //     label: t("sidebar.menu.shelf"),
  //     path: "/shelf",
  //   },
  //   {
  //     key: "rack",
  //     icon: Drum,
  //     label: t("sidebar.menu.rack"),
  //     path: "/rack",
  //   },
  //   {
  //     key: "bin",
  //     icon: PackageOpen,
  //     label: t("sidebar.menu.bin"),
  //     path: "/bin",
  //   },
  //   {
  //     key: "sub-bin",
  //     icon: Package2,
  //     label: t("sidebar.menu.subBin"),
  //     path: "/sub-bin",
  //   },
  //   {
  //     key: "department",
  //     icon: Briefcase,
  //     label: t("sidebar.menu.department"),
  //     path: "/department",
  //   },
  //   {
  //     key: "designation",
  //     icon: UserCheck,
  //     label: t("sidebar.menu.designation"),
  //     path: "/designation",
  //   },
  //   {
  //     key: "employee",
  //     icon: UserCog,
  //     label: t("sidebar.menu.employee"),
  //     path: "/employee",
  //   },
  //   {
  //     key: "companies",
  //     icon: Building,
  //     label: t("sidebar.menu.companies"),
  //     path: "/companies",
  //   },
  //   {
  //     key: "branches",
  //     icon: GitBranch,
  //     label: t("sidebar.menu.branches"),
  //     path: "/branches",
  //   },
  //   {
  //     key: "payment",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.payment"),
  //     path: "/payment",
  //   },
  //   {
  //     key: "store",
  //     icon: Store,
  //     label: t("sidebar.menu.store"),
  //     path: "/store",
  //   },
  //   {
  //     key: "pos",
  //     icon: ShoppingCart,
  //     label: t("sidebar.menu.pos"),
  //     path: "/pos",
  //   },
  //   {
  //     key: "table",
  //     icon: Table,
  //     label: t("sidebar.menu.table"),
  //     path: "/tables",
  //   },
  //   {
  //     key: "uoms",
  //     icon: Package,
  //     label: t("sidebar.menu.uoms"),
  //     path: "/uoms",
  //   },

  //   {
  //     key: "section",
  //     icon: SquareLibrary,
  //     label: t("sidebar.menu.section"),
  //     path: "/section",
  //   },
  //   {
  //     key: "task-category",
  //     icon: CheckSquare,
  //     label: t("sidebar.menu.taskCategory"),
  //     path: "/task-category",
  //   },
  //   {
  //     key: "sample-category",
  //     icon: List,
  //     label: t("sidebar.menu.sampleCategory"),
  //     path: "/sample-category",
  //   },
  //   {
  //     key: "sample-receiving",
  //     icon: PackageOpen,
  //     label: t("sidebar.menu.sampleReceiving"),
  //     path: "/sample-receiving",
  //   },
  //   {
  //     key: "leaves",
  //     icon: Bed,
  //     label: t("sidebar.menu.leaves"),
  //     path: "/leaves",
  //   },
  //   {
  //     key: "leaves-approval",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.leavesApproval"),
  //     path: "/leaves-approval",
  //   },
  //   {
  //     key: "leaves-application",
  //     icon: Send,
  //     label: t("sidebar.menu.leavesApplication"),
  //     path: "/leaves-application",
  //   },
  //   {
  //     key: "tasks",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.tasks"),
  //     path: "/tasks",
  //   },
  //   {
  //     key: "asset-maintenances",
  //     icon: CheckSquare,
  //     label: t("sidebar.menu.assetMaintenances"),
  //     path: "/asset-maintenances",
  //   },

  //   {
  //     key: "profit-loss",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.profitLoss"),
  //     path: "/profit-loss",
  //   },
  //   {
  //     key: "shift-type",
  //     icon: Clock,
  //     label: t("sidebar.menu.shiftType"),
  //     path: "/shift-type",
  //   },
  //   {
  //     key: "onboarding",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.onboarding"),
  //     path: "/onboarding",
  //   },
  //   {
  //     key: "inspections",
  //     icon: CheckSquare,
  //     label: t("sidebar.menu.inspections"),
  //     path: "/inspections",
  //   },

  //   {
  //     key: "project-contract-type",
  //     icon: Briefcase,
  //     label: t("sidebar.menu.projectContractType"),
  //     path: "/project-contract-type",
  //   },

  //   {
  //     key: "checks",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.checks"),
  //     path: "/checks",
  //   },
  //   {
  //     key: "port-master",
  //     icon: ShipWheel,
  //     label: t("sidebar.menu.portMaster"),
  //     path: "/port-master",
  //   },
  //   {
  //     key: "agent-master",
  //     icon: UserSearch,
  //     label: t("sidebar.menu.agentMaster"),
  //     path: "/agent-master",
  //   },

  //   {
  //     key: "received-voucher",
  //     icon: Briefcase,
  //     label: t("sidebar.menu.receivedVoucher"),
  //     path: "/received-voucher",
  //   },
  //   {
  //     key: "work-centers",
  //     icon: Briefcase,
  //     label: t("sidebar.menu.workCenters"),
  //     path: "/work-centers",
  //   },
  //   {
  //     key: "accessories",
  //     icon: Briefcase,
  //     label: t("sidebar.menu.accessories"),
  //     path: "/accessories",
  //   },
  //   {
  //     key: "consignee-master",
  //     icon: UserRound,
  //     label: t("sidebar.menu.consigneeMaster"),
  //     path: "/consignee-master",
  //   },
  //   {
  //     key: "manufacturing-orders",
  //     icon: Building2,
  //     label: t("sidebar.menu.manufacturingOrders"),
  //     path: "/manufacturing-orders",
  //   },
  //   {
  //     key: "loyalty-users",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.loyaltyUsers"),
  //     path: "/loyalty-users",
  //   },
  //   {
  //     key: "loyalty-programs",
  //     icon: Briefcase,
  //     label: t("sidebar.menu.loyaltyPrograms"),
  //     path: "/loyalty-programs",
  //   },
  //   {
  //     key: "transit-order",
  //     icon: Truck,
  //     label: t("sidebar.menu.transitOrder"),
  //     path: "/transit-order",
  //   },
  //   {
  //     key: "sales-item-reports",
  //     icon: Store,
  //     label: t("sidebar.menu.salesItemReports"),
  //     path: "/sales-item-reports",
  //   },

  //   {
  //     key: "salesman-sales-reports",
  //     icon: Store,
  //     label: t("sidebar.menu.salesmanSalesReports"),
  //     path: "/salesman-sales-reports",
  //   },

  //   {
  //     key: "receive-port-logistic",
  //     icon: ShipWheel,
  //     label: t("sidebar.menu.receivePortLogistic"),
  //     path: "/receive-port-logistic",
  //   },
  //   {
  //     key: "shipping",
  //     icon: Truck,
  //     label: t("sidebar.menu.shipping"),
  //     path: "/shipping",
  //   },
  //   {
  //     key: "packing",
  //     icon: PackageOpen,
  //     label: t("sidebar.menu.packing"),
  //     path: "/packing",
  //   },
  //   {
  //     key: "job-post",
  //     icon: Briefcase,
  //     label: t("sidebar.menu.jobPost"),
  //     path: "/job-post",
  //   },
  //   {
  //     key: "campaigns",
  //     icon: AlertCircle,
  //     label: t("sidebar.menu.campaigns"),
  //     path: "/campaigns",
  //   },
  //   {
  //     key: "consumables",
  //     icon: Building2,
  //     label: t("sidebar.menu.consumables"),
  //     path: "/consumables",
  //   },
  //   {
  //     key: "licenses",
  //     icon: FileText,
  //     label: t("sidebar.menu.licenses"),
  //     path: "/licenses",
  //   },
  //   {
  //     key: "pre-alerts",
  //     icon: AlertCircle,
  //     label: t("sidebar.menu.preAlerts"),
  //     path: "/pre-alerts",
  //   },
  //   {
  //     key: "documents",
  //     icon: FileText,
  //     label: t("sidebar.menu.documents"),
  //     path: "/documents",
  //   },
  //   {
  //     key: "production",
  //     icon: Building2,
  //     label: t("sidebar.menu.production"),
  //     path: "/production",
  //   },
  //   {
  //     key: "logged-users",
  //     icon: UserRound,
  //     label: t("sidebar.menu.loggedUsers"),
  //     path: "/logged-users",
  //   },
  //   {
  //     key: "service",
  //     icon: List,
  //     label: t("sidebar.menu.service"),
  //     path: "/service",
  //   },
  //   {
  //     key: "print-label",
  //     icon: Printer,
  //     label: t("sidebar.menu.printLabel"),
  //     path: "/print-label",
  //   },
  //   {
  //     key: "payslips",
  //     icon: DollarSign,
  //     path: "/payslips",
  //     label: t("sidebar.menu.payslips"),
  //   },
  //   {
  //     key: "payment-modes",
  //     icon: CreditCard,
  //     label: t("sidebar.menu.paymentModes"),
  //     path: "/payment-modes",
  //   },
  //   {
  //     key: "loan-type",
  //     icon: BanknoteArrowUp,
  //     label: t("sidebar.menu.loanType"),
  //     path: "/loan-type",
  //   },
  //   {
  //     key: "allowance-type",
  //     icon: UserRoundPlus,
  //     label: t("sidebar.menu.allowanceType"),
  //     path: "/allowance-type",
  //   },
  //   {
  //     key: "project-status",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.projectStatus"),
  //     path: "/project-status",
  //   },
  //   {
  //     key: "contract",
  //     icon: FileText,
  //     label: t("sidebar.menu.projectContract"),
  //     path: "/contract",
  //   },
  //   {
  //     key: "Project Group",
  //     icon: Briefcase,
  //     label: t("sidebar.menu.projectGroup"),
  //     path: "/project-group",
  //   },
  //   {
  //     key: "Facility",
  //     icon: Building2,
  //     label: t("sidebar.menu.facility"),
  //     path: "/facility",
  //   },
  //   {
  //     key: "Promocodes",
  //     icon: Gift,
  //     label: t("sidebar.menu.promocodes"),
  //     path: "/promocodes",
  //   },
  //   {
  //     key: "Depandants",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.depandants"),
  //     path: "/depandants",
  //   },
  //   {
  //     key: "FacilityDetails",
  //     icon: Building2,
  //     label: t("sidebar.menu.facilityDetails"),
  //     path: "/facilitydetails",
  //   },
  //   {
  //     key: "Doctor",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.doctor"),
  //     path: "/doctor",
  //   },
  //   {
  //     key: "Patient",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.patient"),
  //     path: "/patient",
  //   },
  //   {
  //     key: "Schedule",
  //     icon: Calendar,
  //     label: t("sidebar.menu.schedule"),
  //     path: "/schedule",
  //   },
  //   {
  //     key: "assignByAll",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.assignByAll"),
  //     path: "/assignByAll",
  //   },
  //   {
  //     key: "assignByDoctor",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.assignByDoctor"),
  //     path: "/assignByDoctor",
  //   },

  //   {
  //     key: "product-unit",
  //     icon: List,
  //     label: t("sidebar.menu.productUnit"),
  //     path: "/product-unit",
  //   },
  //   {
  //     key: "shortcut",
  //     icon: Store,
  //     label: t("sidebar.menu.shortcut"),
  //     path: "/shortcut",
  //   },
  //   {
  //     key: "subscribe",
  //     icon: Store,
  //     label: t("sidebar.menu.subscribe"),
  //     path: "/subscribe",
  //   },
  //   {
  //     key: "time-slot",
  //     icon: Clock,
  //     label: t("sidebar.menu.timeSlot"),
  //     path: "/time-slot",
  //   },
  //   {
  //     key: "team-members",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.teamMembers"),
  //     path: "/team-members",
  //   },
  //   {
  //     key: "contact-form",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.contactForm"),
  //     path: "/contact-form",
  //   },
  //   {
  //     key: "client",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.client"),
  //     path: "/client",
  //   },
  //   {
  //     key: "invoice-payments",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.invoicePayments"),
  //     path: "/invoice-payments",
  //   },
  //   {
  //     key: "enquiry",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.enquiry"),
  //     path: "/enquiry",
  //   },

  //   {
  //     key: "package",
  //     icon: Package,
  //     label: t("sidebar.menu.package"),
  //     path: "/package",
  //   },
  //   {
  //     key: "bill",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.bill"),
  //     path: "/bill",
  //   },
  //   {
  //     key: "patient-appoinment",
  //     icon: Calendar,
  //     label: t("sidebar.menu.patientAppoinment"),
  //     path: "/patient-appoinment",
  //   },
  //   {
  //     key: "patient-medication",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.patientMedication"),
  //     path: "/patient-medication",
  //   },
  //   {
  //     key: "patient-visit",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.patientVisit"),
  //     path: "/patient-visit",
  //   },
  //   {
  //     key: "service-categories",
  //     icon: List,
  //     label: t("sidebar.menu.serviceCategories"),
  //     path: "/service-categories",
  //   },
  //   {
  //     key: "positions",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.positions"),
  //     path: "/positions",
  //   },
  //   {
  //     key: "complementaries",
  //     icon: Package,
  //     label: t("sidebar.menu.complementaries"),
  //     path: "/complementaries",
  //   },
  //   {
  //     key: "work-orders",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.workOrders"),
  //     path: "/work-orders",
  //   },
  //   {
  //     key: "checkin",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.checkin"),
  //     path: "/checkin",
  //   },
  //   {
  //     key: "checkout",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.checkout"),
  //     path: "/checkout",
  //   },
  //   {
  //     key: "transporter",
  //     icon: Truck,
  //     label: t("sidebar.menu.transporter"),
  //     path: "/transporter",
  //   },
  //   {
  //     key: "devices",
  //     icon: TabletSmartphone,
  //     label: t("sidebar.menu.devices"),
  //     path: "/devices",
  //   },
  //   {
  //     key: "repair-jobs",
  //     icon: Wrench,
  //     label: t("sidebar.menu.repairJobs"),
  //     path: "/repair-jobs",
  //   },
  //   {
  //     key: "salary-advance",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.salaryAdvance"),
  //     path: "/salary-advance",
  //   },
  //   {
  //     key: "bonus",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.bonus"),
  //     path: "/bonus",
  //   },
  //   {
  //     key: "appointment",
  //     icon: Calendar,
  //     label: t("sidebar.menu.appointment"),
  //     path: "/appointments",
  //   },
  //   {
  //     key: "transfer",
  //     icon: ArrowLeftRight,
  //     label: t("sidebar.menu.transfer"),
  //     path: "/transfer",
  //   },
  //   {
  //     key: "interview",
  //     icon: Calendar,
  //     label: t("sidebar.menu.interview"),
  //     path: "/interview",
  //   },
  //   {
  //     key: "membership-rules",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.membershipRules"),
  //     path: "/membership-rules",
  //   },
  //   {
  //     key: "contact-type",
  //     icon: Contact,
  //     label: t("sidebar.menu.contactType"),
  //     path: "/contact-type",
  //   },
  //   {
  //     key: "termination",
  //     icon: UserRoundMinus,
  //     label: t("sidebar.menu.termination"),
  //     path: "/termination",
  //   },
  //   {
  //     key: "employee-contract",
  //     icon: FileText,
  //     label: t("sidebar.menu.employeeContract"),
  //     path: "/employee-contract",
  //   },
  //   {
  //     key: "weekly-holidays",
  //     icon: CalendarClock,
  //     label: t("sidebar.menu.weeklyHolidays"),
  //     path: "/weekly-holidays",
  //   },
  //   {
  //     key: "holiday",
  //     icon: CableCar,
  //     label: t("sidebar.menu.holiday"),
  //     path: "/holiday",
  //   },
  //   {
  //     key: "increments",
  //     icon: SquarePlus,
  //     label: t("sidebar.menu.increments"),
  //     path: "/increments",
  //   },
  //   {
  //     key: "pickup",
  //     icon: Truck,
  //     label: t("sidebar.menu.pickup"),
  //     path: "/pickup",
  //   },
  //   {
  //     key: "transport-master",
  //     icon: Truck,
  //     label: t("sidebar.menu.transportMaster"),
  //     path: "/transport-master",
  //   },
  //   {
  //     key: "supplier-master",
  //     icon: Truck,
  //     label: t("sidebar.menu.supplierMaster"),
  //     path: "/supplier-master",
  //   },
  //   {
  //     key: "retirement",
  //     icon: TreePalm,
  //     label: t("sidebar.menu.retirement"),
  //     path: "/retirement",
  //   },
  //   {
  //     key: "booking-type",
  //     icon: NotebookText,
  //     label: t("sidebar.menu.bookingType"),
  //     path: "/booking-type",
  //   },
  //   {
  //     key: "log-books",
  //     icon: Logs,
  //     label: t("sidebar.menu.logBooks"),
  //     path: "/log-books",
  //   },
  //   {
  //     key: "drivers",
  //     icon: CarTaxiFront,
  //     label: t("sidebar.menu.drivers"),
  //     path: "/drivers",
  //   },
  //   {
  //     key: "businessBroker",
  //     icon: UserSearch,
  //     label: t("sidebar.menu.businessBroker"),
  //     path: "/business-broker",
  //   },
  //   {
  //     key: "shipment",
  //     icon: ShipWheel,
  //     label: t("sidebar.menu.shipment"),
  //     path: "/shipment",
  //   },
  //   {
  //     key: "journal-entry",
  //     icon: Bubbles,
  //     label: t("sidebar.menu.journalEntry"),
  //     path: "/journal-entry",
  //   },
  //   {
  //     key: "realestateAgent",
  //     icon: HouseWifi,
  //     label: t("sidebar.menu.realestateAgent"),
  //     path: "/realestate-agent",
  //   },
  //   {
  //     key: "rooms",
  //     icon: HouseWifi,
  //     label: t("sidebar.menu.rooms"),
  //     path: "/rooms",
  //   },
  //   {
  //     key: "room-size",
  //     icon: HouseWifi,
  //     label: t("sidebar.menu.roomSize"),
  //     path: "/room-size",
  //   },
  //   {
  //     key: "blog",
  //     icon: UserPlus,
  //     label: t("sidebar.menu.blog"),
  //     path: "/blog",
  //   },
  //   {
  //     key: "sliders",
  //     icon: CheckSquare,
  //     label: t("sidebar.menu.sliders"),
  //     path: "/sliders",
  //   },

  //   {
  //     key: "house-keepers",
  //     icon: House,
  //     label: t("sidebar.menu.houseKeepers"),
  //     path: "/house-keepers",
  //   },
  //   {
  //     key: "assign-house-keepers",
  //     icon: UserCheck,
  //     label: t("sidebar.menu.assignHouseKeepers"),
  //     path: "/assign-house-keepers",
  //   },
  //   {
  //     key: "benefit-penalty",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.benefitPenalty"),
  //     path: "/benefit-penalty",
  //   },
  //   {
  //     key: "maintenances",
  //     icon: Wrench,
  //     label: t("sidebar.menu.maintenances"),
  //     path: "/maintenances",
  //   },
  //   {
  //     key: "candidateSelections",
  //     icon: SquareUser,
  //     label: t("sidebar.menu.candidateSelections"),
  //     path: "/candidate-selections",
  //   },
  //   {
  //     key: "userLog",
  //     icon: SquareUser,
  //     label: t("sidebar.menu.userLog"),
  //     path: "/user-log",
  //   },
  //   {
  //     key: "pendingOrder",
  //     icon: Gift,
  //     label: t("sidebar.menu.pendingOrder"),
  //     path: "/pending-order",
  //   },
  //   {
  //     key: "commission",
  //     icon: ShieldMinus,
  //     label: t("sidebar.menu.commission"),
  //     path: "/commission",
  //   },
  //   {
  //     key: "tax",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.tax"),
  //     path: "/tax",
  //   },
  //   {
  //     key: "skills",
  //     icon: BookOpen,
  //     label: t("sidebar.menu.skills"),
  //     path: "/skills",
  //   },
  //   {
  //     key: "bank",
  //     icon: Building2,
  //     label: t("sidebar.menu.bankmaster"),
  //     path: "/banks",
  //   },
  //   {
  //     key: "tax",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.tax"),
  //     path: "/tax",
  //   },
  //   {
  //     key: "table-assigns",
  //     icon: BookCheck,
  //     label: t("sidebar.menu.tableAssigns"),
  //     path: "/table-assigns",
  //   },
  //   {
  //     key: "waiters",
  //     icon: Users,
  //     label: t("sidebar.menu.waiters"),
  //     path: "/waiters",
  //   },
  //   {
  //     key: "reservation",
  //     icon: CalendarClock,
  //     label: t("sidebar.menu.reservation"),
  //     path: "/reservation",
  //   },

  //   {
  //     key: "assets-category",
  //     icon: CassetteTape,
  //     label: t("sidebar.menu.assetsCategory"),
  //     path: "/assets-category",
  //   },
  //   {
  //     key: "assets-master",
  //     icon: Layers,
  //     label: t("sidebar.menu.assetsMaster"),
  //     path: "/assets-master",
  //   },
  //   {
  //     key: "rental",
  //     icon: CassetteTape,
  //     label: t("sidebar.menu.rental"),
  //     path: "/rental",
  //   },
  //   {
  //     key: "insurances",
  //     icon: Landmark,
  //     label: t("sidebar.menu.insurances"),
  //     path: "/insurances",
  //   },

  //   {
  //     key: "order",
  //     icon: ShoppingCart,
  //     label: t("sidebar.menu.order"),
  //     path: "/orders",
  //   },

  //   {
  //     key: "delivery-note",
  //     icon: CalendarClock,
  //     label: t("sidebar.menu.deliveryNote"),
  //     path: "/delivery-notes",
  //   },
  //   {
  //     key: "activity-log",
  //     icon: SquareActivity,
  //     label: t("sidebar.menu.activityLog"),
  //     path: "/activity-log",
  //   },
  //   {
  //     key: "task-assigns",
  //     icon: ClipboardCheck,
  //     label: t("sidebar.menu.taskAssigns"),
  //     path: "/task-assigns",
  //   },
  //   {
  //     key: "project-type",
  //     icon: BookType,
  //     label: t("sidebar.menu.projectType"),
  //     path: "/project-types",
  //   },
  //   {
  //     key: "projects",
  //     icon: FolderKanban,
  //     label: t("sidebar.menu.projects"),
  //     path: "/projects",
  //   },
  //   {
  //     key: "timesheet",
  //     icon: Sheet,
  //     label: t("sidebar.menu.timesheet"),
  //     path: "/timesheet",
  //   },
  //   {
  //     key: "deductions",
  //     icon: UserRoundMinus,
  //     label: t("sidebar.menu.deductions"),
  //     path: "/deductions",
  //   },
  //   {
  //     key: "texRates",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.taxRates"),
  //     path: "/tax-rates",
  //   },
  //   {
  //     key: "candidateList",
  //     icon: SquareUser,
  //     label: t("sidebar.menu.candidateList"),
  //     path: "/candidate-list",
  //   },
  //   {
  //     key: "candidateSelections",
  //     icon: SquareUser,
  //     label: t("sidebar.menu.candidateSelections"),
  //     path: "/candidate-selections",
  //   },
  //   {
  //     key: "commission",
  //     icon: ShieldMinus,
  //     label: t("sidebar.menu.commission"),
  //     path: "/commission",
  //   },
  //   {
  //     key: "financialYear",
  //     icon: Timer,
  //     label: t("sidebar.menu.financialYear"),
  //     path: "/financial-year",
  //   },
  //   {
  //     key: "certificates",
  //     icon: Newspaper,
  //     label: t("sidebar.menu.certificates"),
  //     path: "/certificates",
  //   },
  //   {
  //     key: "allowances",
  //     icon: UserRoundPlus,
  //     label: t("sidebar.menu.allowances"),
  //     path: "/allowances",
  //   },
  //   {
  //     key: "loans",
  //     icon: BanknoteArrowUp,
  //     label: t("sidebar.menu.loans"),
  //     path: "/loans",
  //   },
  //   {
  //     key: "leads",
  //     icon: TabletSmartphone,
  //     label: t("sidebar.menu.leads"),
  //     path: "/leads",
  //   },
  //   {
  //     key: "database",
  //     icon: Database,
  //     label: t("sidebar.menu.database"),
  //     path: "/database",
  //   },
  //   {
  //     key: "terms",
  //     icon: FileText,
  //     label: t("sidebar.menu.termsAndcondition"),
  //     path: "/terms",
  //   },
  //   {
  //     key: "transfer-cash",
  //     icon: FileText,
  //     label: t("sidebar.menu.transferCash"),
  //     path: "/transfer-cash",
  //   },
  //   {
  //     key: "candidate-sortlists",
  //     icon: SquareUser,
  //     label: t("sidebar.menu.candidateSortlists"),
  //     path: "/candidate-sortlists",
  //   },
  //   {
  //     key: "blood-groups",
  //     icon: HeartPulse,
  //     label: t("sidebar.menu.bloodGroups"),
  //     path: "/blood-groups",
  //   },
  //   {
  //     key: "unavailable-dates",
  //     icon: CalendarClock,
  //     label: t("sidebar.menu.unavailableDates"),
  //     path: "/unavailable-dates",
  //   },
  //   {
  //     key: "job-locations",
  //     icon: MapPinned,
  //     label: t("sidebar.menu.jobLocations"),
  //     path: "/job-locations",
  //   },
  //   {
  //     key: "expenses",
  //     icon: Receipt,
  //     label: t("sidebar.menu.expenses"),
  //     path: "/expenses",
  //   },
  //   {
  //     key: "tenant",
  //     icon: Home,
  //     label: t("sidebar.menu.tenant"),
  //     path: "/tenant",
  //   },
  //   {
  //     key: "property",
  //     icon: LandPlot,
  //     label: t("sidebar.menu.property"),
  //     path: "/property",
  //   },
  //   {
  //     key: "propertyApproval",
  //     icon: LandPlot,
  //     label: t("sidebar.menu.propertyApproval"),
  //     path: "/property-approval",
  //   },
  //   {
  //     key: "vehicles",
  //     icon: Car,
  //     label: t("sidebar.menu.vehicles"),
  //     path: "/vehicles",
  //   },
  //   {
  //     key: "fuels",
  //     icon: Fuel,
  //     label: t("sidebar.menu.fuels"),
  //     path: "/fuels",
  //   },
  //   {
  //     key: "parts",
  //     icon: Magnet,
  //     label: t("sidebar.menu.parts"),
  //     path: "/parts",
  //   },
  //   {
  //     key: "property-owner",
  //     icon: Home,
  //     label: t("sidebar.menu.propertyOwner"),
  //     path: "/property-owner",
  //   },
  //   {
  //     key: "rental-requests",
  //     icon: Home,
  //     label: t("sidebar.menu.rentalRequests"),
  //     path: "/rental-requests",
  //   },
  //   {
  //     key: "depreciations",
  //     icon: DollarSign,
  //     label: t("sidebar.menu.depreciations"),
  //     path: "/depreciations",
  //   },
  //   {
  //     key: "training-programs",
  //     icon: ChartCandlestick,
  //     label: t("sidebar.menu.trainingPrograms"),
  //     path: "/training-programs",
  //   },
  //   {
  //     key: "warranties",
  //     icon: NotepadTextDashed,
  //     label: t("sidebar.menu.warranties"),
  //     path: "/warranties",
  //   },
  //   {
  //     key: "warranty-information",
  //     icon: NotepadTextDashed,
  //     label: t("sidebar.menu.warrantyInformation"),
  //     path: "/warranty-information",
  //   },
  //   {
  //     key: "audits",
  //     icon: NotebookPen,
  //     label: t("sidebar.menu.audits"),
  //     path: "/audits",
  //   },
  //   {
  //     key: "bills-of-materials",
  //     icon: Receipt,
  //     label: t("sidebar.menu.billsOfMaterials"),
  //     path: "/bills-of-materials",
  //   },
  //   {
  //     key: "plans",
  //     icon: Globe2,
  //     label: t("sidebar.menu.plans"),
  //     path: "/plans",
  //   },
  //   {
  //     key: "bonus-type",
  //     icon: FaMoneyBill,
  //     label: t("sidebar.menu.bonusType"),
  //     path: "/bonus-type",
  //   },
  //   {
  //     key: "financial-year-ending",
  //     icon: FaMoneyBill,
  //     label: t("sidebar.menu.financialYearEnding"),
  //     path: "/financial-year-ending",
  //   },
  //   {
  //     key: "salary-sheet",
  //     icon: MdMoney,
  //     label: t("sidebar.menu.salarySheet"),
  //     path: "/salary-sheet",
  //   },
  //   {
  //     key: "ticket-status",
  //     icon: MdMoney,
  //     label: t("sidebar.menu.ticketStatus"),
  //     path: "/ticket-status",
  //   },
  //   {
  //     key: "predefined-replies",
  //     icon: MdMoney,
  //     label: t("sidebar.menu.predefinedReplies"),
  //     path: "/predefined-replies",
  //   },
  //   {
  //     key: "ticket-priorities",
  //     icon: MdMoney,
  //     label: t("sidebar.menu.ticketPriorities"),
  //     path: "/ticket-priorities",
  //   },
  //   {
  //     key: "garages",
  //     icon: Home,
  //     label: t("sidebar.menu.garages"),
  //     path: "/garages",
  //   },
  //   {
  //     key: "birth-report",
  //     icon: Home,
  //     label: "Birth Report",
  //     path: "/birth-report",
  //   },

  //   {
  //     key: "death-report",
  //     icon: Home,
  //     label: "Death Report",
  //     path: "/death-report",
  //   },
  //   {
  //     key: "investigation-report",
  //     icon: Home,
  //     label: "Investigation Report",
  //     path: "/investigation-report",
  //   },
  //   {
  //     key: "operation-report",
  //     icon: Home,
  //     label: "Operation Report",
  //     path: "/operation-report",
  //   },
  //   {
  //     key: "assign-by-representative",
  //     icon: Home,
  //     label: "Assign By Representative",
  //     path: "/assign-by-representative",
  //   },
  //   {
  //     key: "medicine",
  //     icon: Home,
  //     label: "Medicine",
  //     path: "/medicine",
  //   },
  //   {
  //     key: "customer-statement",
  //     icon: Home,
  //     label: "Customer Statement",
  //     path: "/customer-statement",
  //   },
  //   {
  //     key: "employee-statement",
  //     icon: Home,
  //     label: "Employee Statement",
  //     path: "/employee-statement",
  //   },
  //   {
  //     key: "supplier-statement",
  //     icon: Home,
  //     label: "Supplier Statement",
  //     path: "/supplier-statement",
  //   },
  //   {
  //     key: "prescription",
  //     icon: Notebook,
  //     label: t("sidebar.menu.prescription"),
  //     path: "/prescription",
  //   },
  //   {
  //     key: "medicine-category",
  //     icon: Milk,
  //     label: t("sidebar.menu.medicineCategory"),
  //     path: "/medicine-category",
  //   },
  //   {
  //     key: "sales-reports",
  //     icon: Receipt,
  //     label: t("sidebar.menu.salesReports"),
  //     path: "/sales-reports",
  //   },
  //   {
  //     key: "sales-return-reports",
  //     icon: Receipt,
  //     label: t("sidebar.menu.salesReturnReports"),
  //     path: "/sales-return-reports",
  //   },
  //   {
  //     key: "sales-tax-reports",
  //     icon: Receipt,
  //     label: t("sidebar.menu.salesTaxReports"),
  //     path: "/sales-tax-reports",
  //   },
  //   {
  //     key: "patient-admission",
  //     icon: Home,
  //     label: t("sidebar.menu.patientAdmission"),
  //     path: "/patient-admission",
  //   },
  //   {
  //     key: "advance-payment",
  //     icon: MdMoney,
  //     label: t("sidebar.menu.advancePayment"),
  //     path: "/advance-payment",
  //   },
  //   {
  //     key: "revokes",
  //     icon: MdMoney,
  //     label: "Revokes",
  //     path: "/revokes",
  //   },
  //   {
  //     key: "expense-categories",
  //     icon: MdMoney,
  //     label: "Expense Categories",
  //     path: "/expense-categories",
  //   },
  //   {
  //     key: "expense-sub-categories",
  //     icon: MdMoney,
  //     label: "Expense Sub Categories",
  //     path: "/expense-sub-categories",
  //   },
  //   {
  //     key: "medication-reports",
  //     icon: NotebookTabs,
  //     label: "Medication Reports",
  //     path: "/medication-reports",
  //   },
  //   {
  //     key: "visiting-reports",
  //     icon: BookTextIcon,
  //     label: "Visiting Reports",
  //     path: "/visiting-reports",
  //   },
  //   {
  //     key: "notice",
  //     icon: NotebookIcon,
  //     label: "Notice",
  //     path: "/notice",
  //   },

  //   {
  //     key: "company-loans",
  //     icon: Home,
  //     label: "Company Loans",
  //     path: "/company-loans",
  //   },
  //   {
  //     key: "company",
  //     icon: Home,
  //     label: "Company",
  //     path: "/company",
  //   },
  // ];

  const scrollableMenus = [
    {
      key: "dashboard",
      icon: LayoutDashboard,
      label: t("sidebar.menu.dashboard"),
      path: "/dashboard",
    },

    {
      key: "users",
      icon: Users,
      label: t("sidebar.menu.users"),
      path: "/users",
    },
    {
      key: "user-master",
      icon: Users,
      label: t("sidebar.menu.userMaster"),
      path: "/user-master",
    },
    {
      key: "users-location",
      icon: Map,
      label: t("sidebar.menu.usersLocation"),
      path: "/users-location",
    },

    {
      key: "permissions",
      icon: Shield,
      label: t("sidebar.menu.permissions"),
      path: "/permissions",
    },

    {
      key: "language",
      icon: Languages,
      label: t("sidebar.menu.language"),
      path: "/languages",
    },
    {
      key: "leads",
      icon: TabletSmartphone,
      label: t("sidebar.menu.leads"),
      path: "/leads",
    },
    {
      key: "lead-sources",
      icon: Users,
      label: t("sidebar.menu.leadSources"),
      path: "/lead-sources",
    },
    {
      key: "lead-status",
      icon: CheckSquare,
      label: t("sidebar.menu.leadStatus"),
      path: "/lead-status",
    },

    {
      key: "colors",
      icon: PaintBucket,
      label: t("sidebar.menu.colors"),
      path: "/colors",
    },
    {
      key: "sizes",
      icon: PencilRuler,
      label: t("sidebar.menu.sizes"),
      path: "/sizes",
    },

    {
      key: "brands",
      icon: Dices,
      label: t("sidebar.menu.brands"),
      path: "/brands",
    },

    {
      key: "item",
      icon: Package,
      label: t("sidebar.menu.itemmaster"),
      path: "/items",
    },

    // {
    //   key: "product",
    //   icon: Package,
    //   label: t("sidebar.menu.product"),
    //   path: "/products",
    // },

    {
      key: "category",
      icon: List,
      label: t("sidebar.menu.category"),
      path: "/categories",
    },

    {
      key: "sub-category",
      icon: List,
      label: t("sidebar.menu.subCategory"),
      path: "/sub-category",
    },

    {
      key: "report",
      icon: FileText,
      label: t("sidebar.menu.report"),
      path: "/reports",
    },
    {
      key: "opening-stock-inventory",
      icon: IndentIncrease,
      label: t("sidebar.menu.openingStockInventory"),
      path: "/opening-stock-inventory",
    },
    {
      key: "stock-transfer",
      icon: IndentIncrease,
      label: t("sidebar.menu.stockTransfer"),
      path: "/stock-transfer",
    },
    {
      key: "damage-items",
      icon: DatabaseBackup,
      label: t("sidebar.menu.damageItems"),
      path: "/damage-items",
    },
    {
      key: "expiry-items",
      icon: CalendarClock,
      label: t("sidebar.menu.expiryItems"),
      path: "/expiry-items",
    },

    {
      key: "purchase-order-logistic",
      icon: ClipboardCheck,
      label: t("sidebar.menu.purchaseOrderLogistic"),
      path: "/purchase-order-logistic",
    },
    {
      key: "invoice",
      icon: Receipt,
      label: "Purchase Invoice",
      path: "/invoices",
    },

    {
      key: "purchase-returns",
      icon: DatabaseBackup,
      label: t("sidebar.menu.purchaseReturns"),
      path: "/purchase-returns",
    },

    {
      key: "sales",
      icon: ShoppingCart,
      label: t("sidebar.menu.sales"),
      path: "/sales",
    },

    {
      key: "current-stock-reports",
      icon: Store,
      label: t("sidebar.menu.currentStockReports"),
      path: "/current-stock-reports",
    },

    {
      key: "tickets",
      icon: PackageOpen,
      label: t("sidebar.menu.tickets"),
      path: "/tickets",
    },

    {
      key: "settings",
      icon: Settings,
      label: t("sidebar.menu.settings"),
      path: "/settings",
    },
  ];

  const fixedBottomMenus = [
    {
      key: "theme",
      icon: theme === "dark" ? Sun : Moon,

      label:
        theme === "dark" ? t("navbar.theme.light") : t("navbar.theme.dark"),
      action: toggleTheme,
    },
  ];

  const handleMenuClick = (
    key: string,
    path?: string | null,
    action?: () => void
  ) => {
    setActiveMenu(key);
    if (action) {
      action();
    }
    // ---- here we can use our relative logic --------------
    else if (key === "sales") {
      setSubSidebarItems([
        {
          label: t("sidebar.menu.salesInvoice"),
          path: "/sales-invoice",
          icon: Receipt,
        },
        {
          label: t("sidebar.menu.salesReturn"),
          path: "/sales-return",
          icon: Undo2,
        },
        {
          label: t("sidebar.menu.salesQuotation"),
          path: "/sales-quotation",
          icon: Calculator,
        },
      ]);
      setSubSidebarTitle(t("sidebar.menu.sales"));
      setSubSidebarWidth("w-56");
    } else if (key === "settings") {
      setSubSidebarItems([
        {
          icon: UserPlus,
          label: t("sidebar.menu.blog"),
          path: "/blog",
        },
        {
          icon: ClipboardCheck,
          label: t("sidebar.menu.contactForm"),
          path: "/contact-form",
        },
        {
          icon: CheckSquare,
          label: t("sidebar.menu.sliders"),
          path: "/sliders",
        },
        {
          icon: Store,
          label: t("sidebar.menu.shortcut"),
          path: "/shortcut",
        },
        {
          icon: Store,
          label: t("sidebar.menu.subscribe"),
          path: "/subscribe",
        },
      ]);
      setSubSidebarTitle(t("sidebar.menu.settings"));
      setSubSidebarWidth("w-56");
    } else if (path) {
      setSubSidebarItems([]);
      setSubSidebarTitle("");
      setSubSidebarWidth("w-56");
      navigate(path);
    }
  };

  const handleSubSidebarNavigate = (path: string) => {
    navigate(path);
    // no need to close......
  };

  const closeSubSidebar = () => setSubSidebarWidth("w-0");
  const handleTabClick = (tab: string) => setActiveTab(tab);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen relative">
      {/* Collapse/Expand Button */}
      {isMobile ? null : (
        <button
          onClick={toggleSidebar}
          className={clsx(
            "absolute z-10 w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all",
            isRTL
              ? isCollapsed
                ? "right-0 translate-x-1/32"
                : "right-[6rem] translate-x-1/32"
              : isCollapsed
              ? "left-0 -translate-x-1/32"
              : "left-[6rem] -translate-x-1/32"
          )}
          style={{ top: "7%", transform: "translateY(-50%)" }}
        >
          {isCollapsed ? (
            isRTL ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : isRTL ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      )}
      {/* Main Sidebar */}
      <div
        className={clsx(
          "flex flex-col transition-all duration-300 h-[calc(100vh-4rem)] font-sans",
          isRTL ? "border-l border-[#3596FF]" : "border-r border-[#3596FF]",
          isCollapsed ? "w-0 overflow-hidden" : `${isMobile ? "w-20" : "w-32"}`
        )}
        style={{
          background:
            "var(--sidebar-bg, linear-gradient(270deg, #3596FF 0%, #79B9FA 118.42%))",
        }}
      >
        {/* Top Fixed Menus */}
        {!isCollapsed && (
          <div className="space-y-2 w-full px-2">
            {fixedTopMenus.map(({ key, icon: Icon, label, path }) => (
              <button
                key={key}
                className={clsx(
                  "relative group flex flex-col items-center transition-all w-full py-2 text-center",
                  activeMenu === key ? "rounded-xl border" : ""
                )}
                style={
                  activeMenu === key
                    ? {
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.20)",
                        background: "rgba(255, 255, 255, 0.10)",
                        boxShadow: "2px 2px 12px 0 #0053AD",
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                    : {
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                }
                onClick={() => handleMenuClick(key, path)}
              >
                <div className="flex flex-col items-center w-full">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-2 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Middle Menus */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 smooth-scroll scroll-smooth">
            {scrollableMenus.map(({ key, icon: Icon, label, path }) => (
              <button
                key={key}
                className={clsx(
                  "relative group flex flex-col items-center transition-all w-full my-2 py-2 cursor-pointer text-center",
                  activeMenu === key ? "rounded-xl border" : ""
                )}
                style={
                  activeMenu === key
                    ? {
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.20)",
                        background: "rgba(255, 255, 255, 0.10)",
                        boxShadow: "2px 2px 12px 0 #0053AD",
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                    : {
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                }
                onClick={() => handleMenuClick(key, path)}
              >
                <div className="flex flex-col items-center w-full">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-2 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Bottom Fixed Menus */}
        {!isCollapsed && (
          <div className="space-y-8 w-full px-2 py-4">
            {fixedBottomMenus.map(({ key, icon: Icon, label, action }) => (
              <button
                key={key}
                className={clsx(
                  "relative group flex flex-col items-center transition-all w-full py-1 text-center",
                  activeMenu === key ? "rounded-xl border" : ""
                )}
                style={
                  activeMenu === key
                    ? {
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.20)",
                        background: "rgba(255, 255, 255, 0.10)",
                        boxShadow: "2px 2px 12px 0 #0053AD",
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                    : {
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                }
                onClick={() => handleMenuClick(key, null, action)}
              >
                <div className="flex flex-col items-center w-full">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-2 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sub Sidebar */}
      <div
        className={clsx(
          "transition-all duration-300 overflow-hidden bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative flex flex-col font-sans",
          subSidebarWidth,
          isRTL ? "border-l" : "border-r"
        )}
        dir={i18n.language}
      >
        {subSidebarWidth === "w-56" && subSidebarItems.length > 0 && (
          <SubSidebar
            items={subSidebarItems}
            onNavigate={handleSubSidebarNavigate}
            onClose={closeSubSidebar}
            title={subSidebarTitle}
          />
        )}
        {subSidebarWidth === "w-56" && subSidebarItems.length === 0 && (
          <>
            <button
              onClick={closeSubSidebar}
              className={clsx(
                "absolute top-2 p-1 mb-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-pointer",
                isRTL ? "left-2" : "right-2"
              )}
              aria-label={t("sidebar.close")}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col flex-1 p-4 pt-8 overflow-y-auto">
              {activeMenu === "search" && (
                <>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t("sidebar.search.placeholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={clsx(
                          "w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand",
                          isRTL ? "text-right pr-8 pl-4" : "text-left pl-8 pr-4"
                        )}
                      />
                      <Search
                        className={clsx(
                          "absolute top-2.5 h-4 w-4 text-gray-400",
                          isRTL ? "right-2" : "left-2"
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {["general", "favourite", "recent"].map((tab) => (
                      <button
                        key={tab}
                        className={clsx(
                          "px-3 py-1 rounded text-sm",
                          activeTab === tab
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        )}
                        onClick={() => handleTabClick(tab)}
                      >
                        {t(`sidebar.search.tabs.${tab}`)}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="flex-1">
                {activeMenu === "search" && searchQuery && (
                  <p
                    className={clsx(
                      "text-sm text-gray-600 dark:text-gray-300",
                      isRTL ? "text-right" : "text-left"
                    )}
                  >
                    {t("sidebar.search.results", { query: searchQuery })}
                  </p>
                )}

                {activeMenu === "dashboard" && (
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className="font-medium mb-2">
                      {t("sidebar.dashboard.title")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t("sidebar.dashboard.content")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
