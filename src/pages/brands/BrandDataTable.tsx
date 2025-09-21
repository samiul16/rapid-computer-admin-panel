/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ListTableDataType = {
  name: string;
  code: string;
  description: string;

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
    id: "brand-001",
    name: "Nike",
    code: "NIKE",
    description: "Leading sportswear and athletic brand",

    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Brand activated successfully",
    createdAt: "2025-06-01T09:00:00Z",
    updatedAt: "2025-06-10T12:30:00Z",
    draftedAt: "",
  },
  {
    id: "brand-002",
    name: "Adidas",
    code: "ADIDAS",
    description: "Global brand for sports clothing and shoes",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Brand updated",
    createdAt: "2025-06-02T10:15:00Z",
    updatedAt: "2025-07-01T08:20:00Z",
    draftedAt: "",
  },
  {
    id: "brand-003",
    name: "Puma",
    code: "PUMA",
    description: "Sport and lifestyle brand known for innovation",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Brand deactivated",
    createdAt: "2025-05-20T14:00:00Z",
    updatedAt: "2025-06-05T11:10:00Z",
    draftedAt: "",
  },
  {
    id: "brand-004",
    name: "Under Armour",
    code: "UA",
    description: "Performance-focused American sports brand",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated logo and description",
    createdAt: "2025-04-25T17:30:00Z",
    updatedAt: "2025-06-25T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "brand-005",
    name: "Reebok",
    code: "REEBOK",
    description: "Footwear and apparel brand",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Draft saved",
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-01T10:30:00Z",
  },
  {
    id: "brand-006",
    name: "New Balance",
    code: "NB",
    description: "Known for comfortable shoes and clean design",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily disabled",
    createdAt: "2025-05-12T08:00:00Z",
    updatedAt: "2025-06-01T07:45:00Z",
    draftedAt: "",
  },
  {
    id: "brand-007",
    name: "Asics",
    code: "ASICS",
    description: "Japanese brand specializing in athletic footwear",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Brand active",
    createdAt: "2025-06-20T11:00:00Z",
    updatedAt: "2025-06-21T12:00:00Z",
    draftedAt: "",
  },
  {
    id: "brand-008",
    name: "Fila",
    code: "FILA",
    description: "Lifestyle and sportswear brand",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: true,
    actionMessage: "Edited and saved as draft",
    createdAt: "2025-07-01T15:00:00Z",
    updatedAt: "2025-07-02T10:30:00Z",
    draftedAt: "2025-07-02T10:30:00Z",
  },
  {
    id: "brand-009",
    name: "Converse",
    code: "CNVS",
    description: "Classic sneakers and casual wear",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Published successfully",
    createdAt: "2025-06-18T09:15:00Z",
    updatedAt: "2025-06-20T09:15:00Z",
    draftedAt: "",
  },
  {
    id: "brand-010",
    name: "Sketchers",
    code: "SKT",
    description: "Casual and performance footwear brand",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Status changed to inactive",
    createdAt: "2025-04-10T11:00:00Z",
    updatedAt: "2025-05-01T11:30:00Z",
    draftedAt: "",
  },
  {
    id: "brand-011",
    name: "Champion",
    code: "CHAMP",
    description: "American sportswear brand",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Reactivated brand",
    createdAt: "2025-07-05T08:45:00Z",
    updatedAt: "2025-07-05T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "brand-012",
    name: "Decathlon",
    code: "DEC",
    description: "Sports equipment and apparel retailer",
    status: "draft",
    isActive: false,
    isDeleted: true,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Deleted while in draft",
    createdAt: "2025-06-15T13:00:00Z",
    updatedAt: "",
    draftedAt: "2025-06-16T13:30:00Z",
  },
];

export default function BrandDataTable({
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
      accessorKey: "description",
      title: "Description",
      options: [...new Set(listTableData.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "description",
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
