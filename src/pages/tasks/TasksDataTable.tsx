/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockTasks = [
  {
    id: "1",
    subject: "Website Redesign",
    hourlyRate: 50,
    startDate: "2024-01-15",
    dueDate: "2024-02-15",
    priority: "High",
    repeatEvery: "Never",
    relatedTo: "Project A",
    assignees: "John Doe",
    followers: "Jane Smith",
    checklist: "Design mockups, Frontend dev, Testing",
    tags: "Design, Frontend",
    description: "Complete website redesign for client",
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
    subject: "Database Migration",
    hourlyRate: 75,
    startDate: "2024-01-16",
    dueDate: "2024-01-30",
    priority: "Medium",
    repeatEvery: "Never",
    relatedTo: "System Upgrade",
    assignees: "Mike Johnson",
    followers: "Sarah Wilson",
    checklist: "Backup data, Migrate, Verify",
    tags: "Database, Backend",
    description: "Migrate database to new version",
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
    subject: "Mobile App Testing",
    hourlyRate: 45,
    startDate: "2024-01-17",
    dueDate: "2024-02-01",
    priority: "Low",
    repeatEvery: "Weekly",
    relatedTo: "Mobile Project",
    assignees: "Lisa Brown",
    followers: "Tom Davis",
    checklist: "Unit tests, Integration tests, UI tests",
    tags: "Testing, Mobile",
    description: "Comprehensive testing of mobile app",
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
    subject: "API Documentation",
    hourlyRate: 60,
    startDate: "2024-01-18",
    dueDate: "2024-01-25",
    priority: "Medium",
    repeatEvery: "Never",
    relatedTo: "API Project",
    assignees: "Alex Turner",
    followers: "Emma White",
    checklist: "Write docs, Review, Publish",
    tags: "Documentation, API",
    description: "Create comprehensive API documentation",
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
    subject: "Security Audit",
    hourlyRate: 90,
    startDate: "2024-01-19",
    dueDate: "2024-02-10",
    priority: "High",
    repeatEvery: "Monthly",
    relatedTo: "Security",
    assignees: "David Lee",
    followers: "Rachel Green",
    checklist: "Vulnerability scan, Penetration test, Report",
    tags: "Security, Audit",
    description: "Perform security audit of all systems",
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
    subject: "Performance Optimization",
    hourlyRate: 70,
    startDate: "2024-01-20",
    dueDate: "2024-02-05",
    priority: "Medium",
    repeatEvery: "Never",
    relatedTo: "Performance",
    assignees: "Chris Martin",
    followers: "Anna Taylor",
    checklist: "Profile code, Optimize, Benchmark",
    tags: "Performance, Optimization",
    description: "Optimize application performance",
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
    subject: "User Training",
    hourlyRate: 55,
    startDate: "2024-01-21",
    dueDate: "2024-01-28",
    priority: "Low",
    repeatEvery: "Quarterly",
    relatedTo: "Training",
    assignees: "Maria Garcia",
    followers: "James Wilson",
    checklist: "Prepare materials, Conduct sessions, Feedback",
    tags: "Training, User",
    description: "Train users on new system features",
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
    subject: "Code Review",
    hourlyRate: 65,
    startDate: "2024-01-22",
    dueDate: "2024-01-29",
    priority: "Medium",
    repeatEvery: "Daily",
    relatedTo: "Development",
    assignees: "Paul Anderson",
    followers: "Sophie Clark",
    checklist: "Review code, Provide feedback, Approve",
    tags: "Code Review, Development",
    description: "Review pull requests and provide feedback",
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
    subject: "Backup Verification",
    hourlyRate: 40,
    startDate: "2024-01-23",
    dueDate: "2024-01-26",
    priority: "Low",
    repeatEvery: "Weekly",
    relatedTo: "Operations",
    assignees: "Kevin Miller",
    followers: "Laura Davis",
    checklist: "Check backups, Test restore, Verify",
    tags: "Backup, Operations",
    description: "Verify all backup systems are working",
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
    subject: "Feature Planning",
    hourlyRate: 80,
    startDate: "2024-01-24",
    dueDate: "2024-02-20",
    priority: "High",
    repeatEvery: "Never",
    relatedTo: "Product",
    assignees: "Nina Patel",
    followers: "Mark Thompson",
    checklist: "Gather requirements, Design, Plan",
    tags: "Planning, Product",
    description: "Plan new features for next release",
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
    subject: "Bug Fixes",
    hourlyRate: 50,
    startDate: "2024-01-25",
    dueDate: "2024-02-02",
    priority: "High",
    repeatEvery: "Never",
    relatedTo: "Maintenance",
    assignees: "Ryan Cooper",
    followers: "Helen Baker",
    checklist: "Identify bugs, Fix, Test, Deploy",
    tags: "Bug Fix, Maintenance",
    description: "Fix critical bugs in production",
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
    subject: "Deployment",
    hourlyRate: 70,
    startDate: "2024-01-26",
    dueDate: "2024-01-27",
    priority: "Medium",
    repeatEvery: "Weekly",
    relatedTo: "DevOps",
    assignees: "Steve Rogers",
    followers: "Natasha Romanoff",
    checklist: "Prepare release, Deploy, Monitor",
    tags: "Deployment, DevOps",
    description: "Deploy new version to production",
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
    subject: "Code Review",
    hourlyRate: 65,
    startDate: "2024-01-27",
    dueDate: "2024-02-01",
    priority: "Medium",
    repeatEvery: "Daily",
    relatedTo: "Development",
    assignees: "John Smith",
    followers: "Jane Doe",
    checklist: "Review code, Provide feedback, Approve",
    tags: "Code Review, Development",
    description: "Review pull requests and provide feedback",
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
    subject: "Testing",
    hourlyRate: 45,
    startDate: "2024-01-28",
    dueDate: "2024-02-02",
    priority: "Low",
    repeatEvery: "Weekly",
    relatedTo: "Quality Assurance",
    assignees: "Test Engineer",
    followers: "QA Manager",
    checklist: "Unit tests, Integration tests, UI tests",
    tags: "Testing, QA",
    description: "Comprehensive testing of application",
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
    subject: "Documentation",
    hourlyRate: 55,
    startDate: "2024-01-29",
    dueDate: "2024-02-03",
    priority: "Medium",
    repeatEvery: "Never",
    relatedTo: "Documentation",
    assignees: "Tech Writer",
    followers: "Product Manager",
    checklist: "Write docs, Review, Publish",
    tags: "Documentation, Technical",
    description: "Create comprehensive documentation",
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
    subject: "Bug Fix",
    hourlyRate: 50,
    startDate: "2024-01-30",
    dueDate: "2024-02-04",
    priority: "High",
    repeatEvery: "Never",
    relatedTo: "Maintenance",
    assignees: "Developer",
    followers: "Team Lead",
    checklist: "Identify bugs, Fix, Test, Deploy",
    tags: "Bug Fix, Maintenance",
    description: "Fix critical bugs in production",
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
    subject: "Feature Development",
    hourlyRate: 75,
    startDate: "2024-01-31",
    dueDate: "2024-02-05",
    priority: "High",
    repeatEvery: "Never",
    relatedTo: "Product",
    assignees: "Senior Developer",
    followers: "Product Manager",
    checklist: "Design, Develop, Test, Deploy",
    tags: "Feature, Development",
    description: "Develop new feature for application",
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
    subject: "Performance Optimization",
    hourlyRate: 70,
    startDate: "2024-02-01",
    dueDate: "2024-02-06",
    priority: "Medium",
    repeatEvery: "Never",
    relatedTo: "Performance",
    assignees: "Performance Engineer",
    followers: "Tech Lead",
    checklist: "Profile code, Optimize, Benchmark",
    tags: "Performance, Optimization",
    description: "Optimize application performance",
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
    subject: "Security Update",
    hourlyRate: 85,
    startDate: "2024-02-02",
    dueDate: "2024-02-07",
    priority: "High",
    repeatEvery: "Monthly",
    relatedTo: "Security",
    assignees: "Security Engineer",
    followers: "Security Manager",
    checklist: "Security scan, Update, Test",
    tags: "Security, Update",
    description: "Apply security updates to system",
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
    subject: "Database Maintenance",
    hourlyRate: 60,
    startDate: "2024-02-03",
    dueDate: "2024-02-08",
    priority: "Medium",
    repeatEvery: "Weekly",
    relatedTo: "Database",
    assignees: "DBA",
    followers: "System Admin",
    checklist: "Backup, Optimize, Monitor",
    tags: "Database, Maintenance",
    description: "Perform database maintenance tasks",
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

export default function TasksDataTable({
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
  const canCreate = usePermission("tasks", "create");

  const componentColumns = [
    {
      accessorKey: "subject",
      title: "Subject",
      options: [...new Set(mockTasks.map((item) => item.subject))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("subject").localeCompare(row2.getValue("subject"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "subject",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "priority",
      title: "Priority",
      options: [...new Set(mockTasks.map((item) => item.priority))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const priorityOrder: { [key: string]: number } = {
          High: 3,
          Medium: 2,
          Low: 1,
        };
        const priority1 = row1.getValue("priority") as string;
        const priority2 = row2.getValue("priority") as string;
        return priorityOrder[priority2] - priorityOrder[priority1];
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "priority",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "assignees",
      title: "Assignees",
      options: [...new Set(mockTasks.map((item) => item.assignees))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("assignees")
          .localeCompare(row2.getValue("assignees"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "assignees",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "dueDate",
      title: "Due Date",
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
          new Date(row1.getValue("dueDate")).getTime() -
          new Date(row2.getValue("dueDate")).getTime()
        );
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "dueDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "hourlyRate",
      title: "Hourly Rate",
      options: [...new Set(mockTasks.map((item) => item.hourlyRate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("hourlyRate") - row2.getValue("hourlyRate");
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "hourlyRate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "tags",
      title: "Tags",
      options: [...new Set(mockTasks.map((item) => item.tags))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("tags").localeCompare(row2.getValue("tags"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "tags",
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

  const filteredData = mockTasks.filter((task) => {
    if (dataTableFilter.status === "Active") {
      return task.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !task.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return task.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return task.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return task.isUpdated;
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
      fixedColumns={["subject"]} // Pin subject column
      pathName="tasks"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
