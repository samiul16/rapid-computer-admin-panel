/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockSections = [
  {
    id: "1",
    title: "Kitchen",
    code: "S001",
    description: "Main kitchen area for food preparation",
    manager: "Chef Johnson",
    employeeCount: 15,
    budget: 1200000,
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    title: "Dining Hall",
    code: "S002",
    description: "Main dining area for customers",
    manager: "Sarah Wilson",
    employeeCount: 12,
    budget: 800000,
    status: "active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    title: "Bar",
    code: "S003",
    description: "Beverage service and bar management",
    manager: "Mike Davis",
    employeeCount: 8,
    budget: 600000,
    status: "active",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "20m",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    title: "Storage",
    code: "S004",
    description: "Inventory and storage management",
    manager: "Lisa Brown",
    employeeCount: 6,
    budget: 400000,
    status: "active",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: null,
    actionMessage: "15 Apr",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    title: "Service",
    code: "S005",
    description: "Customer service and table management",
    manager: "Tom Anderson",
    employeeCount: 10,
    budget: 700000,
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    title: "Bakery",
    code: "S006",
    description: "Fresh bread and pastry preparation",
    manager: "Emma White",
    employeeCount: 7,
    budget: 500000,
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    title: "Dessert",
    code: "S007",
    description: "Dessert and sweet preparation",
    manager: "Alex Turner",
    employeeCount: 5,
    budget: 350000,
    status: "active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    title: "Salad Bar",
    code: "S008",
    description: "Fresh salad and healthy options",
    manager: "Rachel Green",
    employeeCount: 4,
    budget: 300000,
    status: "active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    title: "Grill",
    code: "S009",
    description: "Grilled food preparation",
    manager: "Carlos Rodriguez",
    employeeCount: 6,
    budget: 450000,
    status: "active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    title: "Pizza",
    code: "S010",
    description: "Pizza preparation and oven management",
    manager: "Maria Garcia",
    employeeCount: 8,
    budget: 550000,
    status: "active",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    title: "Sushi",
    code: "S011",
    description: "Sushi and Japanese cuisine",
    manager: "Kenji Tanaka",
    employeeCount: 6,
    budget: 650000,
    status: "inactive",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    title: "Coffee Shop",
    code: "S012",
    description: "Coffee and beverage service",
    manager: "David Miller",
    employeeCount: 5,
    budget: 400000,
    status: "active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    title: "Fast Food",
    code: "S013",
    description: "Quick service food preparation",
    manager: "John Smith",
    employeeCount: 9,
    budget: 480000,
    status: "active",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    title: "Catering",
    code: "S014",
    description: "Event catering and special orders",
    manager: "Anna Lee",
    employeeCount: 11,
    budget: 750000,
    status: "active",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    title: "Wine Cellar",
    code: "S015",
    description: "Wine storage and management",
    manager: "Pierre Dubois",
    employeeCount: 3,
    budget: 300000,
    status: "active",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    title: "Takeaway",
    code: "S016",
    description: "Takeaway and delivery service",
    manager: "Lisa Chen",
    employeeCount: 7,
    budget: 420000,
    status: "active",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    title: "VIP Lounge",
    code: "S017",
    description: "Premium VIP dining experience",
    manager: "Sophie Martin",
    employeeCount: 4,
    budget: 850000,
    status: "draft",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    title: "Outdoor Dining",
    code: "S018",
    description: "Outdoor seating and garden dining",
    manager: "Mark Johnson",
    employeeCount: 6,
    budget: 380000,
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    title: "Buffet",
    code: "S019",
    description: "Buffet service and management",
    manager: "Grace Wong",
    employeeCount: 8,
    budget: 520000,
    status: "active",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    title: "Private Events",
    code: "S020",
    description: "Private event and party service",
    manager: "Robert Taylor",
    employeeCount: 5,
    budget: 680000,
    status: "inactive",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function SectionsDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
  searchQuery,
  setShowExport,
  showExport,
  setShowFilter,
  showFilter,
  setShowVisibility,
  showVisibility,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
  searchQuery: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const canCreate = usePermission("sections", "create");

  const componentColumns = [
    {
      accessorKey: "title",
      title: "Section Name",
      options: [...new Set(mockSections.map((item) => item.title))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("title").localeCompare(row2.getValue("title"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "title",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockSections.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "manager",
      title: "Manager",
      options: [...new Set(mockSections.map((item) => item.manager))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("manager").localeCompare(row2.getValue("manager"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "manager",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "employeeCount",
      title: "Employees",
      options: [...new Set(mockSections.map((item) => item.employeeCount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("employeeCount") - row2.getValue("employeeCount");
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "employeeCount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "budget",
      title: "Budget",
      options: [...new Set(mockSections.map((item) => item.budget))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("budget") - row2.getValue("budget");
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "budget",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockSections.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "description",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "createdAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId);
        if (!cellValue) return false;
        const dateValue = new Date(cellValue as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(dateValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = row1.getValue("draftedAt");
        const date2 = row2.getValue("draftedAt");
        if (!date1 && !date2) return 0;
        if (!date1) return 1;
        if (!date2) return -1;
        return new Date(date1).getTime() - new Date(date2).getTime();
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockSections.filter((section) => {
    if (dataTableFilter.status === "Active") {
      return section.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !section.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return section.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return section.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return section.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["title", "code"]} // Pin section name column
      pathName="sections"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
