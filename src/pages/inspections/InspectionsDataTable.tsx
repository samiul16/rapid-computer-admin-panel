/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockInspections = [
  {
    id: "1",
    vehicle: "Toyota Camry 2023",
    inspectionForm: "Safety Inspection",
    addedFrom: "John Doe",
    fromDate: "2024-01-15",
    toDate: "2024-01-20",
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
    vehicle: "Honda Civic 2022",
    inspectionForm: "Maintenance Check",
    addedFrom: "Jane Smith",
    fromDate: "2024-01-16",
    toDate: "2024-01-21",
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
    vehicle: "Ford F-150 2023",
    inspectionForm: "Pre-Trip Inspection",
    addedFrom: "Mike Johnson",
    fromDate: "2024-01-17",
    toDate: "2024-01-22",
    status: "active",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    vehicle: "Chevrolet Silverado 2022",
    inspectionForm: "Annual Inspection",
    addedFrom: "Sarah Wilson",
    fromDate: "2024-01-18",
    toDate: "2024-01-23",
    status: "active",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    vehicle: "Nissan Altima 2023",
    inspectionForm: "Safety Compliance",
    addedFrom: "David Brown",
    fromDate: "2024-01-19",
    toDate: "2024-01-24",
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    vehicle: "BMW X5 2023",
    inspectionForm: "Luxury Vehicle Check",
    addedFrom: "Lisa Davis",
    fromDate: "2024-01-20",
    toDate: "2024-01-25",
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    vehicle: "Mercedes C-Class 2022",
    inspectionForm: "Premium Inspection",
    addedFrom: "Tom Miller",
    fromDate: "2024-01-21",
    toDate: "2024-01-26",
    status: "active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    vehicle: "Audi A4 2023",
    inspectionForm: "German Engineering Check",
    addedFrom: "Emma White",
    fromDate: "2024-01-22",
    toDate: "2024-01-27",
    status: "active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    vehicle: "Volkswagen Golf 2022",
    inspectionForm: "European Standards",
    addedFrom: "Chris Taylor",
    fromDate: "2024-01-23",
    toDate: "2024-01-28",
    status: "active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    vehicle: "Hyundai Tucson 2023",
    inspectionForm: "Korean Quality Check",
    addedFrom: "Anna Garcia",
    fromDate: "2024-01-24",
    toDate: "2024-01-29",
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
    vehicle: "Kia Sportage 2022",
    inspectionForm: "SUV Safety Check",
    addedFrom: "Ryan Martinez",
    fromDate: "2024-01-25",
    toDate: "2024-01-30",
    status: "active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    vehicle: "Mazda CX-5 2023",
    inspectionForm: "Japanese Reliability",
    addedFrom: "Maria Rodriguez",
    fromDate: "2024-01-26",
    toDate: "2024-01-31",
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
    vehicle: "Lexus RX 2023",
    inspectionForm: "Luxury SUV Check",
    addedFrom: "Alex Turner",
    fromDate: "2024-01-27",
    toDate: "2024-02-01",
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
    vehicle: "Infiniti Q50 2022",
    inspectionForm: "Premium Sedan Check",
    addedFrom: "Jordan Lee",
    fromDate: "2024-01-28",
    toDate: "2024-02-02",
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
    vehicle: "Acura MDX 2023",
    inspectionForm: "SUV Safety Inspection",
    addedFrom: "Casey Morgan",
    fromDate: "2024-01-29",
    toDate: "2024-02-03",
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
    vehicle: "Genesis G80 2022",
    inspectionForm: "Luxury Sedan Check",
    addedFrom: "Riley Quinn",
    fromDate: "2024-01-30",
    toDate: "2024-02-04",
    status: "draft",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    vehicle: "Subaru Outback 2023",
    inspectionForm: "All-Wheel Drive Check",
    addedFrom: "Taylor Kim",
    fromDate: "2024-01-31",
    toDate: "2024-02-05",
    status: "active",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    vehicle: "Mitsubishi Outlander 2022",
    inspectionForm: "Crossover Safety Check",
    addedFrom: "Blake Chen",
    fromDate: "2024-02-01",
    toDate: "2024-02-06",
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
    vehicle: "Volvo XC90 2023",
    inspectionForm: "Safety-First Inspection",
    addedFrom: "Sam Rivera",
    fromDate: "2024-02-02",
    toDate: "2024-02-07",
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
    vehicle: "Jaguar F-Pace 2022",
    inspectionForm: "British Luxury Check",
    addedFrom: "Jordan Smith",
    fromDate: "2024-02-03",
    toDate: "2024-02-08",
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

export default function InspectionsDataTable({
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
  const canCreate = usePermission("inspections", "create");

  const componentColumns = [
    {
      accessorKey: "vehicle",
      title: "Vehicle",
      options: [...new Set(mockInspections.map((item) => item.vehicle))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("vehicle").localeCompare(row2.getValue("vehicle"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "vehicle",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "inspectionForm",
      title: "Inspection Form",
      options: [...new Set(mockInspections.map((item) => item.inspectionForm))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("inspectionForm")
          .localeCompare(row2.getValue("inspectionForm"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "inspectionForm",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "addedFrom",
      title: "Added From",
      options: [...new Set(mockInspections.map((item) => item.addedFrom))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("addedFrom")
          .localeCompare(row2.getValue("addedFrom"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "addedFrom",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "fromDate",
      title: "From Date",
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
          new Date(row1.getValue("fromDate")).getTime() -
          new Date(row2.getValue("fromDate")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "fromDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "toDate",
      title: "To Date",
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
          new Date(row1.getValue("toDate")).getTime() -
          new Date(row2.getValue("toDate")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "toDate",
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
      size: 150,
      minSize: 120,
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
      size: 150,
      minSize: 120,
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockInspections.filter((inspection) => {
    if (dataTableFilter.status === "Active") {
      return inspection.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !inspection.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return inspection.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return inspection.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return inspection.isUpdated;
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
      fixedColumns={["vehicle"]} // Pin vehicle column
      pathName="inspections"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
