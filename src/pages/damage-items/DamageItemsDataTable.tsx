/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  itemId: string;
  quantityDamaged: number;
  damageDate: string;

  reportedBy: string;
  location: string;

  damageType: "Transit" | "Handling" | "Expired" | "Other";

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
    itemId: "ITEM001",
    quantityDamaged: 3,
    damageDate: "2025-07-18",
    reportedBy: "John Doe",
    location: "Warehouse A",
    damageType: "Handling",

    id: "DAMAGE001",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Verified and discarded",
    createdAt: "2025-07-18T10:00:00Z",
    updatedAt: "2025-07-19T08:00:00Z",
    draftedAt: "",
  },
  {
    itemId: "ITEM002",
    quantityDamaged: 1,
    damageDate: "2025-07-17",
    reportedBy: "Jane Smith",
    location: "Warehouse B",
    damageType: "Transit",
    id: "DAMAGE002",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Awaiting review",
    createdAt: "2025-07-17T12:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-17T12:00:00Z",
  },
  {
    itemId: "ITEM003",
    quantityDamaged: 2,
    damageDate: "2025-07-15",
    reportedBy: "Ali Khan",
    location: "Warehouse A",
    damageType: "Expired",
    id: "DAMAGE003",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Removed from stock",
    createdAt: "2025-07-15T09:30:00Z",
    updatedAt: "2025-07-16T10:00:00Z",
    draftedAt: "",
  },
  {
    itemId: "ITEM004",
    quantityDamaged: 5,
    damageDate: "2025-07-14",
    reportedBy: "Fatema Begum",
    location: "Warehouse C",
    damageType: "Other",
    id: "DAMAGE004",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Partially repaired",
    createdAt: "2025-07-14T11:15:00Z",
    updatedAt: "2025-07-18T10:45:00Z",
    draftedAt: "",
  },
  {
    itemId: "ITEM005",
    quantityDamaged: 4,
    damageDate: "2025-07-13",
    reportedBy: "Sadia Islam",
    location: "Warehouse B",
    damageType: "Handling",
    id: "DAMAGE005",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Marked for audit",
    createdAt: "2025-07-13T13:45:00Z",
    updatedAt: "2025-07-14T09:00:00Z",
    draftedAt: "",
  },
  {
    itemId: "ITEM006",
    quantityDamaged: 2,
    damageDate: "2025-07-12",
    reportedBy: "Tariq Rahman",
    location: "Warehouse A",
    damageType: "Transit",
    id: "DAMAGE006",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Replacement requested",
    createdAt: "2025-07-12T14:20:00Z",
    updatedAt: "2025-07-13T10:30:00Z",
    draftedAt: "",
  },
  {
    itemId: "ITEM007",
    quantityDamaged: 1,
    damageDate: "2025-07-11",
    reportedBy: "Nusrat Jahan",
    location: "Warehouse D",
    damageType: "Expired",
    id: "DAMAGE007",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Pending supervisor review",
    createdAt: "2025-07-11T08:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-11T08:00:00Z",
  },
  {
    itemId: "ITEM008",
    quantityDamaged: 7,
    damageDate: "2025-07-10",
    reportedBy: "Habib Hasan",
    location: "Warehouse C",
    damageType: "Other",
    id: "DAMAGE008",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Sent for inspection",
    createdAt: "2025-07-10T10:10:00Z",
    updatedAt: "2025-07-12T11:45:00Z",
    draftedAt: "",
  },
  {
    itemId: "ITEM009",
    quantityDamaged: 3,
    damageDate: "2025-07-09",
    reportedBy: "Mahmud Hossain",
    location: "Warehouse A",
    damageType: "Handling",
    id: "DAMAGE009",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Logged and closed",
    createdAt: "2025-07-09T09:30:00Z",
    updatedAt: "2025-07-10T09:00:00Z",
    draftedAt: "",
  },
  {
    itemId: "ITEM010",
    quantityDamaged: 2,
    damageDate: "2025-07-08",
    reportedBy: "Farhana Akter",
    location: "Warehouse B",
    damageType: "Transit",
    id: "DAMAGE010",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Investigation ongoing",
    createdAt: "2025-07-08T15:00:00Z",
    updatedAt: "2025-07-09T10:00:00Z",
    draftedAt: "",
  },
  {
    itemId: "ITEM011",
    quantityDamaged: 6,
    damageDate: "2025-07-07",
    reportedBy: "Riyad Mahmud",
    location: "Warehouse D",
    damageType: "Handling",
    id: "DAMAGE011",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Needs verification",
    createdAt: "2025-07-07T08:30:00Z",
    updatedAt: "",
    draftedAt: "2025-07-07T08:30:00Z",
  },
  {
    itemId: "ITEM012",
    quantityDamaged: 9,
    damageDate: "2025-07-06",
    reportedBy: "Tanvir Ahmed",
    location: "Warehouse A",
    damageType: "Expired",
    id: "DAMAGE012",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Written off",
    createdAt: "2025-07-06T07:45:00Z",
    updatedAt: "2025-07-07T09:15:00Z",
    draftedAt: "",
  },
];

export default function ComponentLevelDataTable({
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
      accessorKey: "itemId",
      title: "Item ID",
      options: [...new Set(listTableData.map((item) => item.itemId))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("itemId").localeCompare(row2.getValue("itemId"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "itemId",
      },
    },
    {
      accessorKey: "quantityDamaged",
      title: "Quantity Damaged",
      options: [...new Set(listTableData.map((item) => item.quantityDamaged))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId);
        return filterValue.some(
          (filterVal: string | number) =>
            String(cellValue) === String(filterVal)
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("quantityDamaged")
          .localeCompare(row2.getValue("quantityDamaged"));
      },
      size: 120,
      minSize: 80,
      meta: {
        exportLabel: "quantityDamaged",
      },
    },
    {
      accessorKey: "damageDate",
      title: "Damage Date",
      options: [...new Set(listTableData.map((item) => item.damageDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("damageDate")
          .localeCompare(row2.getValue("damageDate"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "damageDate",
      },
    },
    {
      accessorKey: "reportedBy",
      title: "Reported By",
      options: [...new Set(listTableData.map((item) => item.reportedBy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("reportedBy")
          .localeCompare(row2.getValue("reportedBy"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "reportedBy",
      },
    },
    {
      accessorKey: "location",
      title: "Location",
      options: [...new Set(listTableData.map((item) => item.location))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("location")
          .localeCompare(row2.getValue("location"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "location",
      },
    },
    {
      accessorKey: "damageType",
      title: "Damage Type",
      options: [...new Set(listTableData.map((item) => item.damageType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("damageType")
          .localeCompare(row2.getValue("damageType"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "damageType",
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
