/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete } from "@/components/common/Autocomplete";
import HistoryDataTable from "@/components/common/HistoryDataTableNew";
import { mockHistoryData } from "@/mockData/country-mockdata";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type TasksData = {
  subject: string;
  hourlyRate: number;
  startDate: string;
  dueDate: string;
  priority: string;
  repeatEvery: string;
  relatedTo: string;
  assignees: string;
  followers: string;
  checklist: string;
  tags: string;
  description: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: TasksData = {
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
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Task options for autocomplete
const taskOptions = [
  "Website Redesign",
  "Database Migration",
  "Mobile App Testing",
  "API Documentation",
  "Security Audit",
  "Performance Optimization",
];

// Type definition for TypeScript
export type HistoryEntry = {
  id: string;
  date: string;
  user: string;
  status: "Active" | "InActive" | "Delete" | "Draft";
  export: "Single" | "Bulk";
  pdf: boolean;
  csv: boolean;
  xls: boolean;
  doc: boolean;
  print: boolean;
};

export default function TasksDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("Website Redesign");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("tasks", "create");
  const canView: boolean = usePermission("tasks", "view");
  const canEdit: boolean = usePermission("tasks", "edit");
  const canDelete: boolean = usePermission("tasks", "delete");
  const canExport: boolean = usePermission("tasks", "export");
  const canPdf: boolean = usePermission("tasks", "pdf");
  const canPrint: boolean = usePermission("tasks", "print");
  const canSeeHistory: boolean = usePermission("tasks", "history");

  // Field-level permissions
  const canViewSubject: boolean = usePermission("tasks", "view", "subject");
  const canViewHourlyRate: boolean = usePermission(
    "tasks",
    "view",
    "hourlyRate"
  );
  const canViewStartDate: boolean = usePermission("tasks", "view", "startDate");
  const canViewDueDate: boolean = usePermission("tasks", "view", "dueDate");
  const canViewPriority: boolean = usePermission("tasks", "view", "priority");
  const canViewRepeatEvery: boolean = usePermission(
    "tasks",
    "view",
    "repeatEvery"
  );
  const canViewRelatedTo: boolean = usePermission("tasks", "view", "relatedTo");
  const canViewAssignees: boolean = usePermission("tasks", "view", "assignees");
  const canViewFollowers: boolean = usePermission("tasks", "view", "followers");
  const canViewChecklist: boolean = usePermission("tasks", "view", "checklist");
  const canViewTags: boolean = usePermission("tasks", "view", "tags");
  const canViewDescription: boolean = usePermission(
    "tasks",
    "view",
    "description"
  );
  const canViewIsDefault: boolean = usePermission("tasks", "view", "isDefault");
  const canViewIsActive: boolean = usePermission("tasks", "view", "isActive");
  const canViewIsDraft: boolean = usePermission("tasks", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission("tasks", "view", "isDeleted");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get tasks data based on selected task
  const getTasksData = (taskName: string): TasksData => {
    const tasksMap: Record<string, TasksData> = {
      "Website Redesign": {
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
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Database Migration": {
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
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Mobile App Testing": {
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
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "API Documentation": {
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
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Security Audit": {
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
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-24T15:20:00Z"),
        deletedAt: new Date("2024-02-01T09:00:00Z"),
        isDeleted: true,
      },
      "Performance Optimization": {
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
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return tasksMap[taskName] || initialData;
  };

  const [tasksData, setTasksData] = useState<TasksData>(
    getTasksData(selectedTask)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update tasks data when selection changes
  useEffect(() => {
    setTasksData(getTasksData(selectedTask));
  }, [selectedTask]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintTasks = (tasksData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Task Details",
        data: [tasksData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          subject: "Subject",
          hourlyRate: "Hourly Rate",
          startDate: "Start Date",
          dueDate: "Due Date",
          priority: "Priority",
          repeatEvery: "Repeat Every",
          relatedTo: "Related To",
          assignees: "Assignees",
          followers: "Followers",
          checklist: "Checklist",
          tags: "Tags",
          description: "Description",
          isDefault: "Default Task",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
          draftedAt: "Drafted At",
          deletedAt: "Deleted At",
        },
      });
      printHtmlContent(html);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when printing");
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("tasksData on pdf click", tasksData);
      const blob = await pdf(
        <GenericPDF
          data={[tasksData]}
          title="Task Details"
          subtitle="Task Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "task-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (date: Date | null) => {
    if (!date) return "–";

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "–" : value;
  };

  return (
    <>
      <PageLayout
        title="Viewing Task"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/tasks")}
        listText="List"
        listPath="tasks"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/tasks/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/tasks/edit/1"),
          },
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        onHistoryClick={
          canSeeHistory ? () => setIsOptionModalOpen(true) : undefined
        }
        onExport={
          canPdf && canPrint
            ? () => {
                if (!pdfChecked && !printEnabled) {
                  setShowExportModal(true);
                  return;
                }

                if (pdfChecked) {
                  handleExportPDF();
                }
                if (printEnabled) {
                  handlePrintTasks(tasksData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Subject, Hourly Rate, Start Date, Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewSubject && (
              <div className="mt-1">
                <Autocomplete
                  options={taskOptions}
                  value={selectedTask}
                  onValueChange={setSelectedTask}
                  placeholder="Select task..."
                  displayKey="task"
                  valueKey="task"
                  searchKey="task"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Subject"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewHourlyRate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Hourly Rate</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  ${displayValue(tasksData.hourlyRate)}
                </div>
              </div>
            )}

            {canViewStartDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Start Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.startDate)}
                </div>
              </div>
            )}

            {canViewDueDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Due Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.dueDate)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Priority, Repeat Every, Related To, Assignees */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewPriority && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Priority</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.priority)}
                </div>
              </div>
            )}

            {canViewRepeatEvery && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Repeat Every</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.repeatEvery)}
                </div>
              </div>
            )}

            {canViewRelatedTo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Related To</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.relatedTo)}
                </div>
              </div>
            )}

            {canViewAssignees && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Assignees</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.assignees)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Followers, Checklist, Tags, Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewFollowers && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Followers</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.followers)}
                </div>
              </div>
            )}

            {canViewChecklist && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Checklist</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.checklist)}
                </div>
              </div>
            )}

            {canViewTags && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Tags</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.tags)}
                </div>
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(tasksData.description)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Default, Draft, Active, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {tasksData.isDefault ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {tasksData.isDraft ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {tasksData.isActive ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {tasksData.isDeleted ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </PageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(tasksData.createdAt),
          updated: getRelativeTime(tasksData.updatedAt),
          drafted: getRelativeTime(tasksData.draftedAt),
          deleted: getRelativeTime(tasksData.deletedAt),
        }}
      />

      {/* Export Warning Modal */}
      <ResetFormModal
        opened={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={() => setShowExportModal(false)}
        title="Export Options Required"
        message="Please select PDF/Print options before exporting. You need to enable at least one to export the data."
        confirmText="OK"
        cancelText="Cancel"
      />
    </>
  );
}
