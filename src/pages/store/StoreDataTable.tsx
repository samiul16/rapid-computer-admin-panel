/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockStores = [
  {
    id: "1",
    storeCode: "STR001",
    name: "Downtown Restaurant",
    arabicName: "مطعم وسط المدينة",
    phone: "+1-555-0101",
    email: "downtown@restaurant.com",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    country: "USA",
    postCode: "10001",
    manager: "John Smith",
    capacity: 150,
    storeType: "Fine Dining",
    storeImage: "",
    description: "Premium downtown restaurant with elegant atmosphere",
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
    storeCode: "STR002",
    name: "Riverside Cafe",
    arabicName: "مقهى النهر",
    phone: "+1-555-0102",
    email: "riverside@cafe.com",
    address: "456 River Road",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    postCode: "90210",
    manager: "Sarah Johnson",
    capacity: 80,
    storeType: "Casual Dining",
    storeImage: "",
    description: "Cozy riverside cafe with outdoor seating",
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
    storeCode: "STR003",
    name: "Mall Food Court",
    arabicName: "محكمة الطعام في المول",
    phone: "+1-555-0103",
    email: "mall@foodcourt.com",
    address: "789 Shopping Center",
    city: "Chicago",
    state: "IL",
    country: "USA",
    postCode: "60601",
    manager: "Mike Davis",
    capacity: 200,
    storeType: "Fast Food",
    storeImage: "",
    description: "Busy food court location in shopping mall",
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
    storeCode: "STR004",
    name: "Beachside Grill",
    arabicName: "شواء الشاطئ",
    phone: "+1-555-0104",
    email: "beachside@grill.com",
    address: "321 Ocean Drive",
    city: "Miami",
    state: "FL",
    country: "USA",
    postCode: "33139",
    manager: "Lisa Wilson",
    capacity: 120,
    storeType: "Seafood",
    storeImage: "",
    description: "Fresh seafood restaurant with ocean views",
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
    storeCode: "STR005",
    name: "Mountain Lodge",
    arabicName: "نزل الجبل",
    phone: "+1-555-0105",
    email: "mountain@lodge.com",
    address: "654 Peak Road",
    city: "Denver",
    state: "CO",
    country: "USA",
    postCode: "80202",
    manager: "Tom Brown",
    capacity: 60,
    storeType: "Lodge Dining",
    storeImage: "",
    description: "Rustic mountain lodge with local cuisine",
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
    storeCode: "STR006",
    name: "Urban Bistro",
    arabicName: "مطعم حضرية",
    phone: "+1-555-0106",
    email: "urban@bistro.com",
    address: "987 City Avenue",
    city: "Seattle",
    state: "WA",
    country: "USA",
    postCode: "98101",
    manager: "Emma Taylor",
    capacity: 90,
    storeType: "Bistro",
    storeImage: "",
    description: "Modern urban bistro with farm-to-table menu",
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
    storeCode: "STR007",
    name: "Desert Oasis",
    arabicName: "واحة الصحراء",
    phone: "+1-555-0107",
    email: "desert@oasis.com",
    address: "147 Desert Trail",
    city: "Phoenix",
    state: "AZ",
    country: "USA",
    postCode: "85001",
    manager: "Carlos Rodriguez",
    capacity: 100,
    storeType: "Mexican",
    storeImage: "",
    description: "Authentic Mexican cuisine in desert setting",
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
    storeCode: "STR008",
    name: "Harbor View",
    arabicName: "منظر الميناء",
    phone: "+1-555-0108",
    email: "harbor@view.com",
    address: "258 Harbor Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    postCode: "94105",
    manager: "Anna Chen",
    capacity: 110,
    storeType: "Asian Fusion",
    storeImage: "",
    description: "Asian fusion restaurant with harbor views",
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
    storeCode: "STR009",
    name: "Garden Terrace",
    arabicName: "شرفة الحديقة",
    phone: "+1-555-0109",
    email: "garden@terrace.com",
    address: "369 Garden Lane",
    city: "Portland",
    state: "OR",
    country: "USA",
    postCode: "97201",
    manager: "David Green",
    capacity: 75,
    storeType: "Vegetarian",
    storeImage: "",
    description: "Organic vegetarian restaurant with garden seating",
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
    storeCode: "STR010",
    name: "Skyline Lounge",
    arabicName: "صالة الأفق",
    phone: "+1-555-0110",
    email: "skyline@lounge.com",
    address: "741 Tower Heights",
    city: "Las Vegas",
    state: "NV",
    country: "USA",
    postCode: "89101",
    manager: "Rachel White",
    capacity: 180,
    storeType: "Lounge",
    storeImage: "",
    description: "Upscale lounge with panoramic city views",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
];

export default function StoresDataTable({
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
      accessorKey: "storeCode",
      title: "Store Code",
      options: ["STR001", "STR002", "STR003", "STR004", "STR005"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("storeCode")
          .localeCompare(row2.getValue("storeCode"));
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "name",
      title: "Store Name",
      options: [
        "Downtown Restaurant",
        "Riverside Cafe",
        "Mall Food Court",
        "Beachside Grill",
        "Mountain Lodge",
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
      accessorKey: "phone",
      title: "Phone",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("phone").localeCompare(row2.getValue("phone"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: 180,
      minSize: 150,
    },
    {
      accessorKey: "city",
      title: "City",
      options: [
        "New York",
        "Los Angeles",
        "Chicago",
        "Miami",
        "Denver",
        "Seattle",
        "Phoenix",
        "San Francisco",
        "Portland",
        "Las Vegas",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("city").localeCompare(row2.getValue("city"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "state",
      title: "State",
      options: ["NY", "CA", "IL", "FL", "CO", "WA", "AZ", "OR", "NV"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("state").localeCompare(row2.getValue("state"));
      },
      size: 80,
      minSize: 60,
    },
    {
      accessorKey: "manager",
      title: "Manager",
      options: [
        "John Smith",
        "Sarah Johnson",
        "Mike Davis",
        "Lisa Wilson",
        "Tom Brown",
        "Emma Taylor",
        "Carlos Rodriguez",
        "Anna Chen",
        "David Green",
        "Rachel White",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("manager").localeCompare(row2.getValue("manager"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "capacity",
      title: "Capacity",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("capacity") - row2.getValue("capacity");
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "storeType",
      title: "Store Type",
      options: [
        "Fine Dining",
        "Casual Dining",
        "Fast Food",
        "Seafood",
        "Lodge Dining",
        "Bistro",
        "Mexican",
        "Asian Fusion",
        "Vegetarian",
        "Lounge",
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
          .getValue("storeType")
          .localeCompare(row2.getValue("storeType"));
      },
      size: 120,
      minSize: 100,
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

  const filteredData = mockStores.filter((store) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return store.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return store.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return store.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return store.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return store.updatedAt !== store.createdAt;
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
