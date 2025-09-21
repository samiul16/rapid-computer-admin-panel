/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type VehicleType = "Bike" | "Bicycle" | "Car" | "Walk" | "Other";

type ListTableDataType = {
  code: string;
  name: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  nationalId?: string;
  vehicleType: VehicleType;
  assignedArea?: string;

  // same for all component
  id: string;
  status: "active" | "inactive" | "draft";
  isActive: boolean;
  isDeleted: boolean;
  isDraft: boolean;
  isUpdated: boolean;
  actionMessage: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
};

export const listTableData: ListTableDataType[] = [
  {
    id: "dm-001",
    code: "DM001",
    name: "Rahim Uddin",
    phoneNumber: "01711112222",
    email: "rahim@example.com",
    address: "Mirpur, Dhaka",
    nationalId: "1234567890",
    vehicleType: "Bike",
    assignedArea: "Mirpur",

    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Activated successfully",
    createdAt: "2025-06-01T10:00:00Z",
    updatedAt: "2025-06-10T12:00:00Z",
    draftedAt: "",
  },
  {
    id: "dm-002",
    code: "DM002",
    name: "Karim Mia",
    phoneNumber: "01733334444",
    email: "karim@example.com",
    address: "Dhanmondi, Dhaka",
    nationalId: "2233445566",
    vehicleType: "Bicycle",
    assignedArea: "Dhanmondi",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated contact info",
    createdAt: "2025-05-20T09:00:00Z",
    updatedAt: "2025-06-01T11:45:00Z",
    draftedAt: "",
  },
  {
    id: "dm-003",
    code: "DM003",
    name: "Sohel Rana",
    phoneNumber: "01755556666",
    vehicleType: "Car",
    address: "Banani, Dhaka",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Marked as inactive",
    createdAt: "2025-05-15T14:30:00Z",
    updatedAt: "2025-06-10T16:00:00Z",
    draftedAt: "",
  },
  {
    id: "dm-004",
    code: "DM004",
    name: "Jamal Hossain",
    phoneNumber: "01777778888",
    vehicleType: "Walk",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Saved as draft",
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-01T10:30:00Z",
  },
  {
    id: "dm-005",
    code: "DM005",
    name: "Shuvo Ahmed",
    phoneNumber: "01799990000",
    vehicleType: "Bike",
    assignedArea: "Mohakhali",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Activated for delivery",
    createdAt: "2025-06-25T11:00:00Z",
    updatedAt: "2025-06-26T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "dm-006",
    code: "DM006",
    name: "Anik Chowdhury",
    phoneNumber: "01811112222",
    vehicleType: "Car",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "License expired - deactivated",
    createdAt: "2025-06-10T08:00:00Z",
    updatedAt: "2025-06-15T14:00:00Z",
    draftedAt: "",
  },
  {
    id: "dm-007",
    code: "DM007",
    name: "Nasir Uddin",
    phoneNumber: "01833334444",
    vehicleType: "Other",
    assignedArea: "Badda",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Drafted for review",
    createdAt: "2025-07-02T10:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-02T11:00:00Z",
  },
  {
    id: "dm-008",
    code: "DM008",
    name: "Mehedi Hasan",
    phoneNumber: "01855556666",
    vehicleType: "Bike",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Assigned to Gulshan",
    createdAt: "2025-06-18T09:00:00Z",
    updatedAt: "2025-06-20T09:30:00Z",
    draftedAt: "",
  },
  {
    id: "dm-009",
    code: "DM009",
    name: "Azizul Islam",
    phoneNumber: "01788889999",
    vehicleType: "Bicycle",
    assignedArea: "Rampura",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Not available for shift",
    createdAt: "2025-05-10T10:00:00Z",
    updatedAt: "2025-06-01T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "dm-010",
    code: "DM010",
    name: "Sabbir Khan",
    phoneNumber: "01700001111",
    vehicleType: "Walk",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: true,
    actionMessage: "Edited and saved as draft",
    createdAt: "2025-07-03T08:00:00Z",
    updatedAt: "2025-07-03T09:30:00Z",
    draftedAt: "2025-07-03T09:30:00Z",
  },
  {
    id: "dm-011",
    code: "DM011",
    name: "Raju Sheikh",
    phoneNumber: "01800001111",
    vehicleType: "Bike",
    assignedArea: "Tejgaon",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated assigned area",
    createdAt: "2025-06-22T11:30:00Z",
    updatedAt: "2025-06-30T13:00:00Z",
    draftedAt: "",
  },
  {
    id: "dm-012",
    code: "DM012",
    name: "Faruk Hossain",
    phoneNumber: "01899990000",
    vehicleType: "Other",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Account deleted",
    createdAt: "2025-05-15T09:00:00Z",
    updatedAt: "2025-06-01T10:30:00Z",
    draftedAt: "",
  },
];

export default function DeliverymenDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
}) {
  const componentColumns = [
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(listTableData.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "code",
      },
    },
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(listTableData.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "name",
      },
    },
    {
      accessorKey: "phoneNumber",
      title: "Phone Number",
      options: [...new Set(listTableData.map((item) => item.phoneNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("phoneNumber")
          .localeCompare(row2.getValue("phoneNumber"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "phoneNumber",
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [
        ...new Set(
          listTableData.map((item) => item.email || "(No email)") // Changed this line
        ),
      ].filter((option) => option !== undefined), // Only filter out undefined values
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) || "";
        return filterValue.some(
          (filterVal: any) =>
            filterVal &&
            String(cellValue)
              .toLowerCase()
              .includes(String(filterVal).toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue("email") || "";
        const val2 = row2.getValue("email") || "";
        return String(val1).localeCompare(String(val2));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "email",
      },
    },

    {
      accessorKey: "nationalId",
      title: "National ID",
      options: [
        ...new Set(
          listTableData.map((item) => item.nationalId || "(No ID)") // Changed this line
        ),
      ].filter((option) => option !== undefined), // Only filter out undefined values
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) || "";
        return filterValue.some(
          (filterVal: any) =>
            filterVal &&
            String(cellValue)
              .toLowerCase()
              .includes(String(filterVal).toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue("nationalId") || "";
        const val2 = row2.getValue("nationalId") || "";
        return String(val1).localeCompare(String(val2));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "nationalId",
      },
    },

    {
      accessorKey: "vehicleType",
      title: "Vehicle Type",
      options: [
        ...new Set(
          listTableData.map((item) => item.vehicleType || "").filter(Boolean)
        ),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) || "";
        return filterValue.some(
          (filterVal: any) =>
            filterVal &&
            String(cellValue)
              .toLowerCase()
              .includes(String(filterVal).toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue("vehicleType") || "";
        const val2 = row2.getValue("vehicleType") || "";
        return String(val1).localeCompare(String(val2));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "vehicleType",
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: ["active", "inactive", "draft"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 80,
      meta: {
        exportLabel: "status",
      },
    },

    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("createdAt")
          .localeCompare(row2.getValue("createdAt"));
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("updatedAt")
          .localeCompare(row2.getValue("updatedAt"));
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("draftedAt")
          .localeCompare(row2.getValue("draftedAt"));
      },
    },
  ];

  const filteredData = listTableData.filter((item) => {
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={[]} // Pin country name column
    />
  );
}
