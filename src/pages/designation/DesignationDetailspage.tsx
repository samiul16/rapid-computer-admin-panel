/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Modal } from "@mantine/core";
import HistoryDataTable from "@/components/common/HistoryDataTable";
import { mockHistoryData } from "@/mockData/country-mockdata";
import { SplitButton } from "@/components/common/SplitButton";
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";

// Define Designation interface
interface DesignationData {
  Designation: string;
  Description: string;
  Department?: string;
  EmployeeCount?: number;
  MinSalary?: number;
  MaxSalary?: number;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

const MOCK_DESIGNATIONS = [
  { id: "1", name: "Chief Executive Officer" },
  { id: "2", name: "Software Engineer" },
  { id: "3", name: "Human Resources Manager" },
  { id: "4", name: "Marketing Specialist" },
  { id: "5", name: "Sales Representative" },
  { id: "6", name: "Operations Manager" },
];

const DESIGNATION_DATA = MOCK_DESIGNATIONS.map(
  (designation) => designation.name
);

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

export default function DesignationDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(
    "Chief Executive Officer"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  // Mock designation data based on selection
  const getDesignationData = (designationId: string): DesignationData => {
    const designationMap: Record<string, DesignationData> = {
      "1": {
        Designation: "Chief Executive Officer",
        Description: "Overall strategic leadership and management",
        Department: "Executive",
        EmployeeCount: 1,
        MinSalary: 200000,
        MaxSalary: 500000,
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date("2023-05-15T10:30:00Z"),
        updatedAt: new Date("2023-11-20T14:45:00Z"),
        draftedAt: new Date("2025-05-20T14:45:00Z"),
        deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      },
      "2": {
        Designation: "Software Engineer",
        Description: "Develops and maintains software applications",
        Department: "Information Technology",
        EmployeeCount: 15,
        MinSalary: 70000,
        MaxSalary: 110000,
        isDefault: false,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date("2023-03-20T09:15:00Z"),
        updatedAt: new Date("2023-12-01T16:30:00Z"),
        draftedAt: null,
        deletedAt: null,
      },
      "3": {
        Designation: "Human Resources Manager",
        Description: "Manages HR policies and employee relations",
        Department: "Human Resources",
        EmployeeCount: 2,
        MinSalary: 80000,
        MaxSalary: 120000,
        isDefault: false,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date("2023-01-10T11:00:00Z"),
        updatedAt: new Date("2023-11-15T13:20:00Z"),
        draftedAt: null,
        deletedAt: null,
      },
      "4": {
        Designation: "Marketing Specialist",
        Description: "Executes marketing campaigns and strategies",
        Department: "Marketing",
        EmployeeCount: 8,
        MinSalary: 50000,
        MaxSalary: 75000,
        isDefault: false,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date("2023-02-14T14:30:00Z"),
        updatedAt: new Date("2023-11-28T10:45:00Z"),
        draftedAt: null,
        deletedAt: null,
      },
      "5": {
        Designation: "Sales Representative",
        Description: "Manages client relationships and sales",
        Department: "Sales",
        EmployeeCount: 20,
        MinSalary: 45000,
        MaxSalary: 80000,
        isDefault: false,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date("2023-04-05T08:20:00Z"),
        updatedAt: new Date("2023-12-03T15:10:00Z"),
        draftedAt: null,
        deletedAt: null,
      },
      "6": {
        Designation: "Operations Manager",
        Description: "Oversees daily business operations",
        Department: "Operations",
        EmployeeCount: 3,
        MinSalary: 85000,
        MaxSalary: 125000,
        isDefault: false,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date("2023-01-30T12:45:00Z"),
        updatedAt: new Date("2023-11-25T17:00:00Z"),
        draftedAt: null,
        deletedAt: null,
      },
    };

    return designationMap[designationId] || designationMap["1"];
  };

  const designationData = getDesignationData(selectedDesignation);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintDesignation = (designationData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Designation Details",
        data: [designationData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          Designation: "Designation Name",
          Description: "Description",
          Department: "Department",
          EmployeeCount: "Employee Count",
          MinSalary: "Minimum Salary",
          MaxSalary: "Maximum Salary",
          isDefault: "Default Designation",
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
    if (checked) {
      setTimeout(() => handlePrintDesignation(designationData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("designationData on pdf click", designationData);
      const blob = await pdf(
        <GenericPDF
          data={[designationData]}
          title="Designation Details"
          subtitle="Designation Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "designation-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleDeleteRestore = () =>
    console.log(designationData.isDeleted ? "Restoring..." : "Deleting...");

  const getRelativeTime = (dateString: string | null | Date) => {
    if (!dateString) return "--/--/----";

    const date = new Date(dateString);
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

  return (
    <div className="relative w-full">
      {/* Container with full height minus external footer (80px assumed) */}
      <div className="flex flex-col h-[82vh] overflow-hidden border rounded shadow bg-white dark:bg-gray-800 ">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <VideoModal src={video} header={"Rapid ERP Video"} />
            <h1 className="text-xl font-bold text-primary">
              Viewing Designation
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/designation")}
                listText="List"
                listPath="/designation"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/designation/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/designation/edit/1"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* First Row: Designation, Description, Department */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Designation</h3>
              </div>
              <Autocomplete
                data={DESIGNATION_DATA}
                value={selectedDesignation}
                onChange={setSelectedDesignation}
                placeholder="Select a designation..."
                disabled={false}
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Description</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {designationData.Description}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Department</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {designationData.Department}
              </div>
            </div>
          </div>

          {/* Second Row: Employee Count, Min Salary, Max Salary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Employee Count</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {designationData.EmployeeCount}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Min Salary</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                ${designationData.MinSalary?.toLocaleString()}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Max Salary</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                ${designationData.MaxSalary?.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Third Row: Default, Active, Draft, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">Default</h3>
              <div className="h-10 flex items-center">
                <Switch
                  checked={designationData.isDefault}
                  disabled
                  className={`data-[state=unchecked]:bg-gray-600`}
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">Active</h3>
              <div className="h-10 flex items-center">
                <Switch
                  checked={designationData.isActive}
                  disabled
                  className={`data-[state=unchecked]:bg-gray-600`}
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">Draft</h3>
              <div className="h-10 flex items-center">
                <Switch
                  checked={designationData.isDraft}
                  disabled
                  className={`data-[state=unchecked]:bg-gray-600`}
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">
                {designationData.isDeleted ? "Restore" : "Delete"}
              </h3>
              <div className="h-10 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDeleteRestore}
                  disabled={designationData.isDeleted}
                  className="disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  {designationData.isDeleted ? (
                    <Undo size={20} className="text-blue-500" />
                  ) : (
                    <Trash2 size={20} className="text-red-600" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Fourth Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(designationData.createdAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(designationData.updatedAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(designationData.draftedAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(designationData.deletedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="sticky bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <Switch
                  checked={keepChanges}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={setKeepChanges}
                />
                <span className="dark:text-gray-200">{t("button.keep")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={pdfChecked}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={handlePDFSwitchChange}
                />
                <span className="dark:text-gray-200">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={printEnabled}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-blue-400"
                />
                <span className="dark:text-gray-200">Print</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 text-primary rounded-full cursor-pointer border-primary"
                onClick={() => setIsOptionModalOpen(true)}
              >
                <span className="hidden sm:inline">History</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        size="50%"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        withCloseButton={false}
        styles={{
          body: {
            height: "720px", // Fixed height in pixels
            overflow: "hidden",
            padding: 4,
          },
          content: {
            // height: "80vh", // Fixed height - 80% of viewport height
            display: "flex",
            flexDirection: "column",
          },
          header: {
            flexShrink: 0,
          },
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-lg font-semibold text-blue-600">
              Designation History
            </span>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <HistoryDataTable columnData={mockHistoryData} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
