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

type TaskCategoryData = {
  department: string;
  designation: string;
  task: string;
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

const initialData: TaskCategoryData = {
  department: "Kitchen",
  designation: "Chef",
  task: "Food Preparation",
  description: "Prepare and cook food items according to recipes and standards",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Department options for autocomplete
const departments = [
  "Kitchen",
  "Service",
  "Bar",
  "Storage",
  "Management",
  "Bakery",
  "Dessert",
  "Salad Bar",
  "Grill",
  "Pizza",
  "Sushi",
  "Coffee Shop",
  "Fast Food",
  "Catering",
  "Wine Cellar",
  "Takeaway",
  "VIP Lounge",
  "Outdoor Dining",
  "Buffet",
  "Private Events",
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

export default function TaskCategoryDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Kitchen");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("taskCategory", "create");
  const canView: boolean = usePermission("taskCategory", "view");
  const canEdit: boolean = usePermission("taskCategory", "edit");
  const canDelete: boolean = usePermission("taskCategory", "delete");
  const canExport: boolean = usePermission("taskCategory", "export");
  const canPdf: boolean = usePermission("taskCategory", "pdf");
  const canPrint: boolean = usePermission("taskCategory", "print");
  const canSeeHistory: boolean = usePermission("taskCategory", "history");

  // Field-level permissions
  const canViewDepartment: boolean = usePermission(
    "taskCategory",
    "view",
    "department"
  );
  const canViewDesignation: boolean = usePermission(
    "taskCategory",
    "view",
    "designation"
  );
  const canViewTask: boolean = usePermission("taskCategory", "view", "task");
  const canViewDescription: boolean = usePermission(
    "taskCategory",
    "view",
    "description"
  );
  const canViewIsDefault: boolean = usePermission(
    "taskCategory",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "taskCategory",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "taskCategory",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "taskCategory",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get task category data based on selected department
  const getTaskCategoryData = (department: string): TaskCategoryData => {
    const taskCategoryMap: Record<string, TaskCategoryData> = {
      Kitchen: {
        department: "Kitchen",
        designation: "Chef",
        task: "Food Preparation",
        description:
          "Prepare and cook food items according to recipes and standards",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-05-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-15T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Service: {
        department: "Service",
        designation: "Waiter",
        task: "Table Service",
        description:
          "Serve customers, take orders, and ensure customer satisfaction",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-06-20T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-02-10T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Bar: {
        department: "Bar",
        designation: "Bartender",
        task: "Beverage Service",
        description: "Prepare and serve alcoholic and non-alcoholic beverages",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2023-07-10T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-03-05T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Storage: {
        department: "Storage",
        designation: "Storekeeper",
        task: "Inventory Management",
        description:
          "Manage inventory, track stock levels, and handle deliveries",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2023-08-25T12:00:00Z"),
        draftedAt: new Date("2024-04-01T10:00:00Z"),
        updatedAt: new Date("2024-04-01T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Management: {
        department: "Management",
        designation: "Manager",
        task: "Team Supervision",
        description: "Supervise team members and ensure operational efficiency",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-09-15T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T15:20:00Z"),
        deletedAt: new Date("2024-05-01T09:00:00Z"),
        isDeleted: true,
      },
      Bakery: {
        department: "Bakery",
        designation: "Baker",
        task: "Bread Making",
        description: "Prepare fresh bread, pastries, and baked goods",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-10-05T14:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-02-28T16:40:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return taskCategoryMap[department] || initialData;
  };

  const [taskCategoryData, setTaskCategoryData] = useState<TaskCategoryData>(
    getTaskCategoryData(selectedDepartment)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update task category data when selection changes
  useEffect(() => {
    setTaskCategoryData(getTaskCategoryData(selectedDepartment));
  }, [selectedDepartment]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintTaskCategory = (taskCategoryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Task Category Details",
        data: [taskCategoryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          department: "Department",
          designation: "Designation",
          task: "Task",
          description: "Description",
          isDefault: "Default Task Category",
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
      console.log("taskCategoryData on pdf click", taskCategoryData);
      const blob = await pdf(
        <GenericPDF
          data={[taskCategoryData]}
          title="Task Category Details"
          subtitle="Task Category Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "task-category-details.pdf";
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
        title="Viewing Task Category"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/task-category")}
        listText="List"
        listPath="task-category"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/task-category/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/task-category/edit/1"),
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
                  handlePrintTaskCategory(taskCategoryData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewDepartment && (
              <div className="mt-1">
                <Autocomplete
                  options={departments}
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                  placeholder="Select department..."
                  displayKey="department"
                  valueKey="department"
                  searchKey="department"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Department"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewDesignation && (
              <div className="">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-normal text-gray-600">Designation</h3>
                </div>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.designation)}
                </div>
              </div>
            )}

            {canViewTask && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Task</h3>
                <div className="w-fit py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.task)}
                </div>
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.description)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2 - Additional Task Category Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDefault && (
              <div className="">
                <div className="flex flex-col">
                  <div className="">
                    <span className="text-[15px] text-gray-600">Default</span>
                  </div>
                  <div className="">
                    {taskCategoryData.isDefault ? (
                      <span className="text-black font-bold text-[15px]">
                        Yes
                      </span>
                    ) : (
                      <span className="text-black font-bold text-[15px]">
                        No
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {taskCategoryData.isDraft ? (
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
                  <span className="text-[15px] text-gray-600">Inactive</span>
                </div>
                <div className="">
                  {!taskCategoryData.isActive ? (
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
                  {taskCategoryData.isDeleted ? (
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
          created: getRelativeTime(taskCategoryData.createdAt),
          updated: getRelativeTime(taskCategoryData.updatedAt),
          drafted: getRelativeTime(taskCategoryData.draftedAt),
          deleted: getRelativeTime(taskCategoryData.deletedAt),
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
