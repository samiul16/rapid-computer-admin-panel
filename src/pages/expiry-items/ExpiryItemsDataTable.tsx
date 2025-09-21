/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockExpiryItems = [
  {
    id: "1",
    itemName: "Fresh Milk 1L",
    batchNumber: "MLK001",
    expiryDate: "2024-02-15",
    quantity: 24,
    unit: "bottles",
    location: "Main Branch - Dairy Section",
    category: "Dairy Products",
    supplier: "Fresh Dairy Co.",
    daysUntilExpiry: 5,
    status: "Warning",
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
  },
  {
    id: "2",
    itemName: "Organic Yogurt 500ml",
    batchNumber: "YGT002",
    expiryDate: "2024-02-12",
    quantity: 18,
    unit: "cups",
    location: "North Branch - Refrigerated",
    category: "Dairy Products",
    supplier: "Organic Foods Ltd.",
    daysUntilExpiry: 2,
    status: "Near Expiry",
    isActive: true,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
  },
  {
    id: "3",
    itemName: "Whole Wheat Bread",
    batchNumber: "BRD003",
    expiryDate: "2024-02-08",
    quantity: 12,
    unit: "loaves",
    location: "South Branch - Bakery",
    category: "Bakery Items",
    supplier: "Golden Bakery",
    daysUntilExpiry: -2,
    status: "Expired",
    isActive: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
  },
  {
    id: "4",
    itemName: "Fresh Chicken Breast",
    batchNumber: "CHK004",
    expiryDate: "2024-02-14",
    quantity: 8,
    unit: "kg",
    location: "East Branch - Meat Section",
    category: "Meat & Poultry",
    supplier: "Premium Meats",
    daysUntilExpiry: 4,
    status: "Warning",
    isActive: true,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
  },
  {
    id: "5",
    itemName: "Canned Tomatoes 400g",
    batchNumber: "TOM005",
    expiryDate: "2024-08-15",
    quantity: 48,
    unit: "cans",
    location: "West Branch - Canned Goods",
    category: "Canned Foods",
    supplier: "Garden Fresh Foods",
    daysUntilExpiry: 186,
    status: "Good",
    isActive: true,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
  },
  {
    id: "6",
    itemName: "Fresh Salmon Fillet",
    batchNumber: "SAL006",
    expiryDate: "2024-02-11",
    quantity: 6,
    unit: "kg",
    location: "Central Branch - Seafood",
    category: "Seafood",
    supplier: "Ocean Fresh",
    daysUntilExpiry: 1,
    status: "Near Expiry",
    isActive: true,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isDeleted: false,
  },
  {
    id: "7",
    itemName: "Organic Spinach 250g",
    batchNumber: "SPN007",
    expiryDate: "2024-02-13",
    quantity: 15,
    unit: "bags",
    location: "Downtown Branch - Vegetables",
    category: "Fresh Vegetables",
    supplier: "Green Fields Farm",
    daysUntilExpiry: 3,
    status: "Warning",
    isActive: true,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
  },
  {
    id: "8",
    itemName: "Pasta Sauce 350ml",
    batchNumber: "PST008",
    expiryDate: "2024-06-20",
    quantity: 32,
    unit: "jars",
    location: "Suburban Branch - Condiments",
    category: "Sauces & Condiments",
    supplier: "Italian Delights",
    daysUntilExpiry: 130,
    status: "Good",
    isActive: true,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
  },
  {
    id: "9",
    itemName: "Fresh Strawberries 500g",
    batchNumber: "STR009",
    expiryDate: "2024-02-11",
    quantity: 20,
    unit: "punnets",
    location: "Uptown Branch - Fruits",
    category: "Fresh Fruits",
    supplier: "Berry Farm Co.",
    daysUntilExpiry: 1,
    status: "Near Expiry",
    isActive: true,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isDeleted: false,
  },
  {
    id: "10",
    itemName: "Greek Feta Cheese 200g",
    batchNumber: "FTA010",
    expiryDate: "2024-03-05",
    quantity: 16,
    unit: "blocks",
    location: "Riverside Branch - Cheese",
    category: "Dairy Products",
    supplier: "Mediterranean Foods",
    daysUntilExpiry: 25,
    status: "Good",
    isActive: true,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
  },
  {
    id: "11",
    itemName: "Frozen Pizza Base",
    batchNumber: "PZB011",
    expiryDate: "2024-04-15",
    quantity: 25,
    unit: "pieces",
    location: "Hillside Branch - Frozen",
    category: "Frozen Foods",
    supplier: "Quick Meals Inc.",
    daysUntilExpiry: 65,
    status: "Good",
    isActive: true,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isDeleted: false,
  },
  {
    id: "12",
    itemName: "Fresh Lettuce Head",
    batchNumber: "LET012",
    expiryDate: "2024-02-09",
    quantity: 30,
    unit: "heads",
    location: "Lakeside Branch - Vegetables",
    category: "Fresh Vegetables",
    supplier: "Crisp Greens Farm",
    daysUntilExpiry: -1,
    status: "Expired",
    isActive: false,
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isDeleted: false,
  },
  {
    id: "13",
    itemName: "Honey 500ml",
    batchNumber: "HNY013",
    expiryDate: "2025-01-15",
    quantity: 12,
    unit: "jars",
    location: "Garden Branch - Natural Products",
    category: "Natural Sweeteners",
    supplier: "Pure Honey Co.",
    daysUntilExpiry: 340,
    status: "Good",
    isActive: true,
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isDeleted: false,
  },
  {
    id: "14",
    itemName: "Fresh Mozzarella 250g",
    batchNumber: "MOZ014",
    expiryDate: "2024-02-16",
    quantity: 14,
    unit: "balls",
    location: "Plaza Branch - Dairy",
    category: "Dairy Products",
    supplier: "Artisan Cheese",
    daysUntilExpiry: 6,
    status: "Warning",
    isActive: true,
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isDeleted: false,
  },
  {
    id: "15",
    itemName: "Smoked Turkey Slices",
    batchNumber: "TUR015",
    expiryDate: "2024-02-12",
    quantity: 10,
    unit: "packages",
    location: "Metro Branch - Deli",
    category: "Deli Meats",
    supplier: "Gourmet Deli",
    daysUntilExpiry: 2,
    status: "Near Expiry",
    isActive: true,
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isDeleted: false,
  },
  {
    id: "16",
    itemName: "Artisan Sourdough",
    batchNumber: "SRD016",
    expiryDate: "2024-02-14",
    quantity: 8,
    unit: "loaves",
    location: "Business District - Bakery",
    category: "Bakery Items",
    supplier: "Artisan Bakehouse",
    daysUntilExpiry: 4,
    status: "Warning",
    isActive: true,
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isDeleted: false,
  },
  {
    id: "17",
    itemName: "Premium Beef Steak",
    batchNumber: "BEF017",
    expiryDate: "2024-02-13",
    quantity: 12,
    unit: "kg",
    location: "Airport Branch - Meat Section",
    category: "Meat & Poultry",
    supplier: "Premium Meats",
    daysUntilExpiry: 3,
    status: "Warning",
    isActive: true,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isDeleted: false,
  },
  {
    id: "18",
    itemName: "Organic Baby Carrots",
    batchNumber: "CAR018",
    expiryDate: "2024-02-11",
    quantity: 25,
    unit: "bags",
    location: "Mall Branch - Vegetables",
    category: "Fresh Vegetables",
    supplier: "Organic Farms",
    daysUntilExpiry: 1,
    status: "Near Expiry",
    isActive: true,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    isDeleted: false,
  },
  {
    id: "19",
    itemName: "Fresh Atlantic Cod",
    batchNumber: "COD019",
    expiryDate: "2024-02-10",
    quantity: 8,
    unit: "kg",
    location: "Harbor Branch - Seafood",
    category: "Seafood",
    supplier: "Ocean Fresh",
    daysUntilExpiry: 0,
    status: "Expired",
    isActive: false,
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    isDeleted: false,
  },
  {
    id: "20",
    itemName: "Whole Grain Cereal",
    batchNumber: "CER020",
    expiryDate: "2024-12-15",
    quantity: 40,
    unit: "boxes",
    location: "Industrial Branch - Dry Goods",
    category: "Breakfast Cereals",
    supplier: "Healthy Grains Co.",
    daysUntilExpiry: 318,
    status: "Good",
    isActive: true,
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    isDeleted: false,
  },
];

export default function ExpiryItemsDataTable({
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
      accessorKey: "itemName",
      title: "Item Name",
      options: [
        "Fresh Milk 1L",
        "Organic Yogurt 500ml",
        "Whole Wheat Bread",
        "Fresh Chicken Breast",
        "Canned Tomatoes 400g",
        "Fresh Salmon Fillet",
        "Organic Spinach 250g",
        "Pasta Sauce 350ml",
        "Fresh Strawberries 500g",
        "Greek Feta Cheese 200g",
        "Frozen Pizza Base",
        "Fresh Lettuce Head",
        "Honey 500ml",
        "Fresh Mozzarella 250g",
        "Smoked Turkey Slices",
        "Artisan Sourdough",
        "Premium Beef Steak",
        "Organic Baby Carrots",
        "Fresh Atlantic Cod",
        "Whole Grain Cereal",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("itemName")
          .localeCompare(row2.getValue("itemName"));
      },
      size: 180,
      minSize: 160,
    },
    {
      accessorKey: "batchNumber",
      title: "Batch Number",
      options: [
        "MLK001",
        "YGT002",
        "BRD003",
        "CHK004",
        "TOM005",
        "SAL006",
        "SPN007",
        "PST008",
        "STR009",
        "FTA010",
        "PZB011",
        "LET012",
        "HNY013",
        "MOZ014",
        "TUR015",
        "SRD016",
        "BEF017",
        "CAR018",
        "COD019",
        "CER020",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("batchNumber")
          .localeCompare(row2.getValue("batchNumber"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "expiryDate",
      title: "Expiry Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("expiryDate")).getTime() -
          new Date(row2.getValue("expiryDate")).getTime()
        );
      },
      size: 130,
      minSize: 110,
    },
    {
      accessorKey: "quantity",
      title: "Quantity",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) => {
            const numVal = parseFloat(val);
            return !isNaN(numVal) && cellValue === numVal;
          });
        }
        const numVal = parseFloat(filterValue);
        return !isNaN(numVal) && cellValue === numVal;
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("quantity") - row2.getValue("quantity");
      },
      size: 100,
      minSize: 80,
      meta: {
        type: "number",
        exportLabel: "Quantity",
      },
    },
    {
      accessorKey: "unit",
      title: "Unit",
      options: [
        "bottles",
        "cups",
        "loaves",
        "kg",
        "cans",
        "heads",
        "jars",
        "balls",
        "packages",
        "boxes",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("unit").localeCompare(row2.getValue("unit"));
      },
      size: 100,
      minSize: 80,
      meta: {
        type: "string",
        exportLabel: "Unit",
      },
    },
    {
      accessorKey: "location",
      title: "Location",
      options: [
        "Main Branch - Dairy Section",
        "North Branch - Refrigerated",
        "South Branch - Bakery",
        "East Branch - Meat Section",
        "West Branch - Canned Goods",
        "Central Branch - Seafood",
        "Downtown Branch - Vegetables",
        "Suburban Branch - Condiments",
        "Uptown Branch - Fruits",
        "Riverside Branch - Cheese",
        "Hillside Branch - Frozen",
        "Lakeside Branch - Vegetables",
        "Garden Branch - Natural Products",
        "Plaza Branch - Dairy",
        "Metro Branch - Deli",
        "Business District - Bakery",
        "Airport Branch - Meat Section",
        "Mall Branch - Vegetables",
        "Harbor Branch - Seafood",
        "Industrial Branch - Dry Goods",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("location")
          .localeCompare(row2.getValue("location"));
      },
      size: 180,
      minSize: 160,
      meta: {
        type: "string",
        exportLabel: "Location",
      },
    },
    {
      accessorKey: "category",
      title: "Category",
      options: [
        "Dairy Products",
        "Bakery Items",
        "Meat & Poultry",
        "Canned Foods",
        "Fresh Vegetables",
        "Fresh Fruits",
        "Sauces & Condiments",
        "Seafood",
        "Deli Meats",
        "Breakfast Cereals",
        "Natural Sweeteners",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("category")
          .localeCompare(row2.getValue("category"));
      },
      size: 150,
      minSize: 130,
      meta: {
        type: "string",
        exportLabel: "Category",
      },
    },
    {
      accessorKey: "supplier",
      title: "Supplier",
      options: [
        "Fresh Dairy Co.",
        "Organic Foods Ltd.",
        "Golden Bakery",
        "Premium Meats",
        "Garden Fresh Foods",
        "Ocean Fresh",
        "Green Fields Farm",
        "Italian Delights",
        "Berry Farm Co.",
        "Mediterranean Foods",
        "Quick Meals Inc.",
        "Crisp Greens Farm",
        "Pure Honey Co.",
        "Artisan Cheese",
        "Gourmet Deli",
        "Artisan Bakehouse",
        "Healthy Grains Co.",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("supplier")
          .localeCompare(row2.getValue("supplier"));
      },
      size: 180,
      minSize: 160,
      meta: {
        type: "string",
        exportLabel: "Supplier",
      },
    },
    {
      accessorKey: "daysUntilExpiry",
      title: "Days Until Expiry",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) => {
            const numVal = parseFloat(val);
            return !isNaN(numVal) && cellValue === numVal;
          });
        }
        const numVal = parseFloat(filterValue);
        return !isNaN(numVal) && cellValue === numVal;
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          row1.getValue("daysUntilExpiry") - row2.getValue("daysUntilExpiry")
        );
      },
      size: 120,
      minSize: 100,
      meta: {
        type: "number",
        exportLabel: "Days Until Expiry",
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: ["Warning", "Near Expiry", "Expired", "Good"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "Status",
      },
    },
    {
      accessorKey: "isActive",
      title: "Active Status",
      options: ["Active", "Inactive"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        const statusText = cellValue ? "Active" : "Inactive";
        return filterValue.includes(statusText);
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue("isActive") ? "Active" : "Inactive";
        const val2 = row2.getValue("isActive") ? "Active" : "Inactive";
        return val1.localeCompare(val2);
      },
      size: 120,
      minSize: 100,
      meta: {
        type: "boolean",
        exportLabel: "Active Status",
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 130,
      minSize: 110,
      meta: {
        type: "date",
        exportLabel: "Created Date",
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 130,
      minSize: 110,
      meta: {
        type: "date",
        exportLabel: "Updated Date",
      },
    },
  ];

  // Filter logic for expiry items data
  const filteredData = mockExpiryItems.filter((item) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.updatedAt !== item.createdAt;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      componentColumns={componentColumns}
      viewMode={viewMode}
      setViewMode={setViewMode}
      fixedColumns={[]}
    />
  );
}
