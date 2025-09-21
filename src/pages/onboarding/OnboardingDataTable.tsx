/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockOnboardings = [
  {
    id: "1",
    selectStaff: "John Doe",
    generalInformation: "New hire onboarding",
    staffFullName: "John Michael Doe",
    address: "123 Main St, City, State 12345",
    assetAllocation: "Laptop, Phone, ID Card",
    typeOfTraining: "Technical Training",
    trainingProgram: "Full Stack Development",
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
    selectStaff: "Jane Smith",
    generalInformation: "Department transfer",
    staffFullName: "Jane Elizabeth Smith",
    address: "456 Oak Ave, Town, State 67890",
    assetAllocation: "Desktop, Headset, Badge",
    typeOfTraining: "Process Training",
    trainingProgram: "Customer Service Excellence",
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
    selectStaff: "Mike Johnson",
    generalInformation: "Promotion onboarding",
    staffFullName: "Michael Robert Johnson",
    address: "789 Pine Rd, Village, State 11111",
    assetAllocation: "Laptop, Monitor, Keyboard",
    typeOfTraining: "Leadership Training",
    trainingProgram: "Management Skills",
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
    selectStaff: "Sarah Wilson",
    generalInformation: "Intern onboarding",
    staffFullName: "Sarah Anne Wilson",
    address: "321 Elm St, Borough, State 22222",
    assetAllocation: "Tablet, Notebook, Pen",
    typeOfTraining: "Basic Training",
    trainingProgram: "Company Orientation",
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
    selectStaff: "David Brown",
    generalInformation: "Contractor onboarding",
    staffFullName: "David Christopher Brown",
    address: "654 Maple Dr, County, State 33333",
    assetAllocation: "Temporary Badge, Access Card",
    typeOfTraining: "Security Training",
    trainingProgram: "Workplace Safety",
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
    selectStaff: "Lisa Davis",
    generalInformation: "Returning employee",
    staffFullName: "Lisa Marie Davis",
    address: "987 Cedar Ln, District, State 44444",
    assetAllocation: "Laptop, Phone, Reissued Badge",
    typeOfTraining: "Refresher Training",
    trainingProgram: "Updated Procedures",
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
    selectStaff: "Tom Miller",
    generalInformation: "Seasonal hire",
    staffFullName: "Thomas James Miller",
    address: "147 Birch Way, Township, State 55555",
    assetAllocation: "Uniform, Safety Gear, ID",
    typeOfTraining: "Safety Training",
    trainingProgram: "Workplace Protocols",
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
    selectStaff: "Emma White",
    generalInformation: "Remote worker onboarding",
    staffFullName: "Emma Grace White",
    address: "258 Spruce Ct, Municipality, State 66666",
    assetAllocation: "Remote Setup Kit, VPN Access",
    typeOfTraining: "Remote Work Training",
    trainingProgram: "Virtual Collaboration",
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
    selectStaff: "Chris Taylor",
    generalInformation: "Part-time onboarding",
    staffFullName: "Christopher Lee Taylor",
    address: "369 Willow Pl, Parish, State 77777",
    assetAllocation: "Part-time Badge, Basic Equipment",
    typeOfTraining: "Part-time Training",
    trainingProgram: "Flexible Work Arrangements",
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
    selectStaff: "Anna Garcia",
    generalInformation: "Executive onboarding",
    staffFullName: "Anna Sofia Garcia",
    address: "741 Aspen Blvd, City, State 88888",
    assetAllocation: "Executive Setup, Premium Equipment",
    typeOfTraining: "Executive Training",
    trainingProgram: "Strategic Leadership",
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
    selectStaff: "Ryan Martinez",
    generalInformation: "Technical specialist",
    staffFullName: "Ryan Alexander Martinez",
    address: "852 Poplar St, Town, State 99999",
    assetAllocation: "Specialized Equipment, Tools",
    typeOfTraining: "Technical Training",
    trainingProgram: "Advanced Skills Development",
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
    selectStaff: "Maria Rodriguez",
    generalInformation: "Customer service rep",
    staffFullName: "Maria Isabella Rodriguez",
    address: "963 Hickory Ave, Village, State 00000",
    assetAllocation: "Headset, Customer Portal Access",
    typeOfTraining: "Customer Service Training",
    trainingProgram: "Client Relations Excellence",
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
    selectStaff: "Alex Turner",
    generalInformation: "Software developer",
    staffFullName: "Alexander James Turner",
    address: "159 Oak St, City, State 11111",
    assetAllocation: "Development Laptop, IDE License",
    typeOfTraining: "Technical Training",
    trainingProgram: "Software Development",
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
    selectStaff: "Jordan Lee",
    generalInformation: "QA engineer",
    staffFullName: "Jordan Michael Lee",
    address: "753 Pine Ave, Town, State 22222",
    assetAllocation: "Testing Device, QA Tools",
    typeOfTraining: "Quality Assurance Training",
    trainingProgram: "Testing Methodologies",
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
    selectStaff: "Casey Morgan",
    generalInformation: "Project manager",
    staffFullName: "Casey Elizabeth Morgan",
    address: "357 Maple Dr, Village, State 33333",
    assetAllocation: "Project Management Software, Laptop",
    typeOfTraining: "Project Management Training",
    trainingProgram: "Agile Methodologies",
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
    selectStaff: "Riley Quinn",
    generalInformation: "Team lead",
    staffFullName: "Riley Patrick Quinn",
    address: "951 Cedar Ln, Borough, State 44444",
    assetAllocation: "Leadership Resources, Communication Tools",
    typeOfTraining: "Leadership Training",
    trainingProgram: "Team Management",
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
    selectStaff: "Taylor Kim",
    generalInformation: "Client relations",
    staffFullName: "Taylor Grace Kim",
    address: "753 Birch Way, Township, State 55555",
    assetAllocation: "CRM Access, Communication Tools",
    typeOfTraining: "Client Relations Training",
    trainingProgram: "Customer Success",
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
    selectStaff: "Blake Chen",
    generalInformation: "Virtual collaboration",
    staffFullName: "Blake Alexander Chen",
    address: "159 Spruce Ct, Municipality, State 66666",
    assetAllocation: "Remote Work Kit, Collaboration Tools",
    typeOfTraining: "Remote Work Training",
    trainingProgram: "Virtual Collaboration",
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
    selectStaff: "Sam Rivera",
    generalInformation: "Data analyst",
    staffFullName: "Samuel Jose Rivera",
    address: "357 Willow Pl, Parish, State 77777",
    assetAllocation: "Analytics Tools, Data Access",
    typeOfTraining: "Data Analysis Training",
    trainingProgram: "Business Intelligence",
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
    selectStaff: "Jordan Smith",
    generalInformation: "Marketing specialist",
    staffFullName: "Jordan Nicole Smith",
    address: "951 Aspen Blvd, City, State 88888",
    assetAllocation: "Marketing Tools, Creative Software",
    typeOfTraining: "Marketing Training",
    trainingProgram: "Digital Marketing",
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

export default function OnboardingDataTable({
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
  const canCreate = usePermission("onboarding", "create");

  const componentColumns = [
    {
      accessorKey: "selectStaff",
      title: "Select Staff",
      options: [...new Set(mockOnboardings.map((item) => item.selectStaff))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("selectStaff")
          .localeCompare(row2.getValue("selectStaff"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "selectStaff",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "generalInformation",
      title: "General Information",
      options: [
        ...new Set(mockOnboardings.map((item) => item.generalInformation)),
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
          .getValue("generalInformation")
          .localeCompare(row2.getValue("generalInformation"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "generalInformation",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "staffFullName",
      title: "Staff Full Name",
      options: [...new Set(mockOnboardings.map((item) => item.staffFullName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("staffFullName")
          .localeCompare(row2.getValue("staffFullName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "staffFullName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "address",
      title: "Address",
      options: [...new Set(mockOnboardings.map((item) => item.address))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("address").localeCompare(row2.getValue("address"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "address",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "assetAllocation",
      title: "Asset Allocation",
      options: [
        ...new Set(mockOnboardings.map((item) => item.assetAllocation)),
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
          .getValue("assetAllocation")
          .localeCompare(row2.getValue("assetAllocation"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "assetAllocation",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "typeOfTraining",
      title: "Type of Training",
      options: [...new Set(mockOnboardings.map((item) => item.typeOfTraining))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("typeOfTraining")
          .localeCompare(row2.getValue("typeOfTraining"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "typeOfTraining",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "trainingProgram",
      title: "Training Program",
      options: [
        ...new Set(mockOnboardings.map((item) => item.trainingProgram)),
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
          .getValue("trainingProgram")
          .localeCompare(row2.getValue("trainingProgram"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "trainingProgram",
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

  const filteredData = mockOnboardings.filter((onboarding) => {
    if (dataTableFilter.status === "Active") {
      return onboarding.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !onboarding.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return onboarding.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return onboarding.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return onboarding.isUpdated;
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
      fixedColumns={["selectStaff"]} // Pin selectStaff column
      pathName="onboarding"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
