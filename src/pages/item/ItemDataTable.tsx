/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockItems = [
  {
    id: "1",
    itemCode: "ITM001",
    name: "Grilled Chicken Breast",
    arabicName: "صدر دجاج مشوي",
    costPrice: 8.5,
    regularPrice: 15.0,
    offerPrice: 12.0,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    openingStock: 50,
    category: "Main Course",
    subCategory: "Chicken",
    unit: "Piece",
    itemImage: "",
    description: "Fresh grilled chicken breast with herbs and spices",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
    status: "active",
  },
  {
    id: "2",
    itemCode: "ITM002",
    name: "Caesar Salad",
    arabicName: "سلطة قيصر",
    costPrice: 4.0,
    regularPrice: 9.5,
    offerPrice: 7.5,
    startDate: "2024-01-16",
    endDate: "2024-12-31",
    openingStock: 30,
    category: "Appetizer",
    subCategory: "Salad",
    unit: "Bowl",
    itemImage: "",
    description: "Fresh romaine lettuce with Caesar dressing and croutons",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
    status: "active",
  },
  {
    id: "3",
    itemCode: "ITM003",
    name: "Beef Burger",
    arabicName: "برجر لحم بقري",
    costPrice: 6.0,
    regularPrice: 13.0,
    offerPrice: 10.0,
    startDate: "2024-01-17",
    endDate: "2024-12-31",
    openingStock: 40,
    category: "Fast Food",
    subCategory: "Burger",
    unit: "Piece",
    itemImage: "",
    description: "Juicy beef burger with fresh vegetables and cheese",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "4",
    itemCode: "ITM004",
    name: "Margherita Pizza",
    arabicName: "بيتزا مارجريتا",
    costPrice: 7.5,
    regularPrice: 16.0,
    offerPrice: 13.0,
    startDate: "2024-01-18",
    endDate: "2024-12-31",
    openingStock: 25,
    category: "Main Course",
    subCategory: "Pizza",
    unit: "Piece",
    itemImage: "",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
    status: "active",
  },
  {
    id: "5",
    itemCode: "ITM005",
    name: "Chocolate Cake",
    arabicName: "كيك شوكولاتة",
    costPrice: 3.5,
    regularPrice: 8.0,
    offerPrice: 6.5,
    startDate: "2024-01-19",
    endDate: "2024-12-31",
    openingStock: 20,
    category: "Dessert",
    subCategory: "Cake",
    unit: "Slice",
    itemImage: "",
    description: "Rich chocolate cake with chocolate ganache",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
    status: "active",
  },
  {
    id: "6",
    itemCode: "ITM006",
    name: "French Fries",
    arabicName: "بطاطس مقلية",
    costPrice: 2.0,
    regularPrice: 5.5,
    offerPrice: 4.0,
    startDate: "2024-01-20",
    endDate: "2024-12-31",
    openingStock: 60,
    category: "Side Dish",
    subCategory: "Fries",
    unit: "Portion",
    itemImage: "",
    description: "Crispy golden French fries with sea salt",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isDeleted: false,
    status: "active",
  },
  {
    id: "7",
    itemCode: "ITM007",
    name: "Coca Cola",
    arabicName: "كوكا كولا",
    costPrice: 1.2,
    regularPrice: 3.0,
    offerPrice: 2.5,
    startDate: "2024-01-21",
    endDate: "2024-12-31",
    openingStock: 100,
    category: "Beverage",
    subCategory: "Soft Drink",
    unit: "Can",
    itemImage: "",
    description: "Refreshing Coca Cola soft drink",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
    status: "active",
  },
  {
    id: "8",
    itemCode: "ITM008",
    name: "Grilled Salmon",
    arabicName: "سلمون مشوي",
    costPrice: 12.0,
    regularPrice: 22.0,
    offerPrice: 18.0,
    startDate: "2024-01-22",
    endDate: "2024-12-31",
    openingStock: 15,
    category: "Main Course",
    subCategory: "Seafood",
    unit: "Piece",
    itemImage: "",
    description: "Fresh grilled salmon with lemon butter sauce",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
    status: "inactive",
  },
  {
    id: "9",
    itemCode: "ITM009",
    name: "Vegetable Soup",
    arabicName: "شوربة خضار",
    costPrice: 2.5,
    regularPrice: 6.5,
    offerPrice: 5.0,
    startDate: "2024-01-23",
    endDate: "2024-12-31",
    openingStock: 35,
    category: "Appetizer",
    subCategory: "Soup",
    unit: "Bowl",
    itemImage: "",
    description: "Hearty vegetable soup with fresh seasonal vegetables",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isDeleted: false,
    status: "active",
  },
  {
    id: "10",
    itemCode: "ITM010",
    name: "Tiramisu",
    arabicName: "تيراميسو",
    costPrice: 4.5,
    regularPrice: 9.5,
    offerPrice: 7.5,
    startDate: "2024-01-24",
    endDate: "2024-12-31",
    openingStock: 18,
    category: "Dessert",
    subCategory: "Italian",
    unit: "Piece",
    itemImage: "",
    description: "Classic Italian dessert with coffee and mascarpone",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
];

export default function ItemsDataTable({
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
      accessorKey: "itemCode",
      title: "Item Code",
      options: ["ITM001", "ITM002", "ITM003", "ITM004", "ITM005"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("itemCode")
          .localeCompare(row2.getValue("itemCode"));
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "name",
      title: "Item Name",
      options: [
        "Grilled Chicken Breast",
        "Caesar Salad",
        "Beef Burger",
        "Margherita Pizza",
        "Chocolate Cake",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "arabicName",
      title: "Arabic Name",
      options: [
        "صدر دجاج مشوي",
        "سلطة قيصر",
        "برجر لحم بقري",
        "بيتزا مارجريتا",
        "كيك شوكولاتة",
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
          .getValue("arabicName")
          .localeCompare(row2.getValue("arabicName"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "costPrice",
      title: "Cost Price",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("costPrice") - row2.getValue("costPrice");
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "regularPrice",
      title: "Regular Price",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("regularPrice") - row2.getValue("regularPrice");
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "offerPrice",
      title: "Offer Price",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("offerPrice") - row2.getValue("offerPrice");
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "startDate",
      title: "Start Date",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("startDate")).getTime() -
          new Date(row2.getValue("startDate")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "endDate",
      title: "End Date",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("endDate")).getTime() -
          new Date(row2.getValue("endDate")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "openingStock",
      title: "Opening Stock",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("openingStock") - row2.getValue("openingStock");
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "category",
      title: "Category",
      options: [
        "Main Course",
        "Appetizer",
        "Dessert",
        "Beverage",
        "Side Dish",
        "Fast Food",
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
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "subCategory",
      title: "Sub Category",
      options: [
        "Chicken",
        "Beef",
        "Seafood",
        "Pizza",
        "Pasta",
        "Salad",
        "Soup",
        "Burger",
        "Cake",
        "Ice Cream",
        "Soft Drink",
        "Juice",
        "Fries",
        "Italian",
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
          .getValue("subCategory")
          .localeCompare(row2.getValue("subCategory"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "unit",
      title: "Unit",
      options: [
        "Piece",
        "Bowl",
        "Portion",
        "Slice",
        "Can",
        "Glass",
        "Plate",
        "Sundae",
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
      size: 80,
      minSize: 60,
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 250,
      minSize: 200,
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
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "status",
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
  ];

  const filteredData = mockItems.filter((item) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return item.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return item.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return item.status === "draft";
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
