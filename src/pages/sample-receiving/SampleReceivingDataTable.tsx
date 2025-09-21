/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockSampleReceivings = [
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
    branch: "Main Branch",
    receivingNo: "SR-013",
    clientName: "Clinical Research",
    clientReference: "REF-2024-013",
    typeOfSample: "Plasma Sample",
    requiredTests: "Lipid Panel",
    numberOfSample: 4,
    section: "Biochemistry",
    deliveredBy: "Mark Wilson",
    receivedBy: "Dr. Sarah Davis",
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
    branch: "North Branch",
    receivingNo: "SR-014",
    clientName: "Pathology Lab",
    clientReference: "REF-2024-014",
    typeOfSample: "Biopsy Sample",
    requiredTests: "Histopathology",
    numberOfSample: 2,
    section: "Pathology",
    deliveredBy: "Laura Chen",
    receivedBy: "Dr. Robert Kim",
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
    branch: "South Branch",
    receivingNo: "SR-015",
    clientName: "Immunology Center",
    clientReference: "REF-2024-015",
    typeOfSample: "Serum Sample",
    requiredTests: "Immunology Panel",
    numberOfSample: 3,
    section: "Immunology",
    deliveredBy: "David Lee",
    receivedBy: "Dr. Maria Rodriguez",
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
    branch: "East Branch",
    receivingNo: "SR-016",
    clientName: "Toxicology Lab",
    clientReference: "REF-2024-016",
    typeOfSample: "Urine Sample",
    requiredTests: "Drug Screening",
    numberOfSample: 5,
    section: "Toxicology",
    deliveredBy: "Jessica Park",
    receivedBy: "Dr. Kevin Johnson",
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
    branch: "West Branch",
    receivingNo: "SR-017",
    clientName: "Endocrinology Clinic",
    clientReference: "REF-2024-017",
    typeOfSample: "Blood Sample",
    requiredTests: "Hormone Panel",
    numberOfSample: 2,
    section: "Endocrinology",
    deliveredBy: "Ryan Thompson",
    receivedBy: "Dr. Lisa Wang",
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
    branch: "Central Branch",
    receivingNo: "SR-018",
    clientName: "Cardiology Center",
    clientReference: "REF-2024-018",
    typeOfSample: "Blood Sample",
    requiredTests: "Cardiac Markers",
    numberOfSample: 3,
    section: "Cardiology",
    deliveredBy: "Amanda Foster",
    receivedBy: "Dr. James Brown",
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
    branch: "Main Branch",
    receivingNo: "SR-019",
    clientName: "Oncology Institute",
    clientReference: "REF-2024-019",
    typeOfSample: "Tissue Sample",
    requiredTests: "Cancer Markers",
    numberOfSample: 1,
    section: "Oncology",
    deliveredBy: "Michael Garcia",
    receivedBy: "Dr. Emily Chen",
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
    branch: "North Branch",
    receivingNo: "SR-020",
    clientName: "Pediatric Clinic",
    clientReference: "REF-2024-020",
    typeOfSample: "Blood Sample",
    requiredTests: "Pediatric Panel",
    numberOfSample: 4,
    section: "Pediatrics",
    deliveredBy: "Sarah Miller",
    receivedBy: "Dr. David Wilson",
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

export default function SampleReceivingDataTable({
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
  const canCreate = usePermission("sampleReceiving", "create");

  const componentColumns = [
    {
      accessorKey: "receivingNo",
      title: "Receiving No",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.receivingNo)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("receivingNo")
          .localeCompare(row2.getValue("receivingNo"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "receivingNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "clientName",
      title: "Client Name",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.clientName)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("clientName")
          .localeCompare(row2.getValue("clientName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "clientName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "branch",
      title: "Branch",
      options: [...new Set(mockSampleReceivings.map((item) => item.branch))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("branch").localeCompare(row2.getValue("branch"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "branch",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "typeOfSample",
      title: "Type of Sample",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.typeOfSample)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("typeOfSample")
          .localeCompare(row2.getValue("typeOfSample"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "typeOfSample",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "section",
      title: "Section",
      options: [...new Set(mockSampleReceivings.map((item) => item.section))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("section").localeCompare(row2.getValue("section"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "section",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "numberOfSample",
      title: "Number of Sample",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.numberOfSample)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          row1.getValue("numberOfSample") - row2.getValue("numberOfSample")
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "numberOfSample",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "deliveredBy",
      title: "Delivered By",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.deliveredBy)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("deliveredBy")
          .localeCompare(row2.getValue("deliveredBy"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "deliveredBy",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "receivedBy",
      title: "Received By",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.receivedBy)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("receivedBy")
          .localeCompare(row2.getValue("receivedBy"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "receivedBy",
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

  const filteredData = mockSampleReceivings.filter((sampleReceiving) => {
    if (dataTableFilter.status === "Active") {
      return sampleReceiving.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !sampleReceiving.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return sampleReceiving.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return sampleReceiving.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return sampleReceiving.isUpdated;
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
      fixedColumns={["receivingNo"]} // Pin receiving number column
      pathName="sample-receiving"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
