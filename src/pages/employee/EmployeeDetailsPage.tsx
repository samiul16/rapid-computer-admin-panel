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

// Define Employee interface
interface EmployeeData {
  employeeName: string;
  email: string;
  phone?: string;
  department?: string;
  designation?: string;
  salary?: number;
  joiningDate?: Date;
  manager?: string;
  location?: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

const MOCK_EMPLOYEES = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Michael Davis" },
  { id: "4", name: "Emily Wilson" },
  { id: "5", name: "David Brown" },
  { id: "6", name: "Lisa Anderson" },
];

const EMPLOYEE_DATA = MOCK_EMPLOYEES.map((employee) => employee.name);

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

export default function EmployeeDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("John Smith");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  // Mock employee data based on selection
  const getEmployeeData = (employeeId: string): EmployeeData => {
    const employeeMap: Record<string, EmployeeData> = {
      "1": {
        employeeName: "John Smith",
        email: "john.smith@company.com",
        phone: "+1-555-0101",
        department: "Executive",
        designation: "Chief Executive Officer",
        salary: 200000,
        joiningDate: new Date("2023-01-15"),
        manager: "Board of Directors",
        location: "New York",
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
        employeeName: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        phone: "+1-555-0102",
        department: "Human Resources",
        designation: "HR Manager",
        salary: 85000,
        joiningDate: new Date("2023-02-16"),
        manager: "John Smith",
        location: "New York",
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
        employeeName: "Michael Davis",
        email: "michael.davis@company.com",
        phone: "+1-555-0103",
        department: "Information Technology",
        designation: "Software Engineer",
        salary: 75000,
        joiningDate: new Date("2023-03-17"),
        manager: "IT Manager",
        location: "San Francisco",
        isDefault: false,
        isActive: false,
        isDraft: true,
        isDeleted: false,
        createdAt: new Date("2023-01-10T11:00:00Z"),
        updatedAt: new Date("2023-11-15T13:20:00Z"),
        draftedAt: new Date("2023-01-10T11:00:00Z"),
        deletedAt: null,
      },
      "4": {
        employeeName: "Emily Wilson",
        email: "emily.wilson@company.com",
        phone: "+1-555-0104",
        department: "Marketing",
        designation: "Marketing Specialist",
        salary: 55000,
        joiningDate: new Date("2023-04-18"),
        manager: "Marketing Manager",
        location: "Los Angeles",
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
        employeeName: "David Brown",
        email: "david.brown@company.com",
        phone: "+1-555-0105",
        department: "Sales",
        designation: "Sales Representative",
        salary: 60000,
        joiningDate: new Date("2023-05-19"),
        manager: "Sales Manager",
        location: "Chicago",
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
        employeeName: "Lisa Anderson",
        email: "lisa.anderson@company.com",
        phone: "+1-555-0106",
        department: "Operations",
        designation: "Operations Manager",
        salary: 90000,
        joiningDate: new Date("2023-06-20"),
        manager: "John Smith",
        location: "New York",
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

    return employeeMap[employeeId] || employeeMap["1"];
  };

  const employeeData = getEmployeeData(selectedEmployee);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintEmployee = (employeeData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Employee Details",
        data: [employeeData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          employeeName: "Employee Name",
          email: "Email",
          phone: "Phone",
          department: "Department",
          designation: "Designation",
          salary: "Salary",
          joiningDate: "Joining Date",
          manager: "Manager",
          location: "Location",
          isDefault: "Default Employee",
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
      setTimeout(() => handlePrintEmployee(employeeData), 100);
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
      console.log("employeeData on pdf click", employeeData);
      const blob = await pdf(
        <GenericPDF
          data={[employeeData]}
          title="Employee Details"
          subtitle="Employee Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "employee-details.pdf";
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
    console.log(employeeData.isDeleted ? "Restoring..." : "Deleting...");

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
            <h1 className="text-xl font-bold text-primary">Viewing Employee</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/employee")}
                listText="List"
                listPath="/employee"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/employee/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/employee/edit/1"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* First Row: Employee Name, Email, Phone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Employee Name</h3>
              </div>
              <Autocomplete
                data={EMPLOYEE_DATA}
                value={selectedEmployee}
                onChange={setSelectedEmployee}
                placeholder="Select an employee..."
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
              <h3 className="font-medium mb-1">Email</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {employeeData.email}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Phone</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {employeeData.phone}
              </div>
            </div>
          </div>

          {/* Second Row: Department, Designation, Salary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Department</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {employeeData.department}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Designation</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {employeeData.designation}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Salary</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                ${employeeData.salary?.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Third Row: Manager, Location, Joining Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Manager</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {employeeData.manager}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Location</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {employeeData.location}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Joining Date</h3>
              <div className="w-full h-10 flex items-center text-gray-700">
                {employeeData.joiningDate?.toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Fourth Row: Default, Active, Draft, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">Default</h3>
              <div className="h-10 flex items-center">
                <Switch
                  checked={employeeData.isDefault}
                  disabled
                  className={`data-[state=unchecked]:bg-gray-600`}
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">Active</h3>
              <div className="h-10 flex items-center">
                <Switch
                  checked={employeeData.isActive}
                  disabled
                  className={`data-[state=unchecked]:bg-gray-600`}
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">Draft</h3>
              <div className="h-10 flex items-center">
                <Switch
                  checked={employeeData.isDraft}
                  disabled
                  className={`data-[state=unchecked]:bg-gray-600`}
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">
                {employeeData.isDeleted ? "Restore" : "Delete"}
              </h3>
              <div className="h-10 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDeleteRestore}
                  disabled={employeeData.isDeleted}
                  className="disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  {employeeData.isDeleted ? (
                    <Undo size={20} className="text-blue-500" />
                  ) : (
                    <Trash2 size={20} className="text-red-600" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Fifth Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(employeeData.createdAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(employeeData.updatedAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(employeeData.draftedAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(employeeData.deletedAt)}
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
              Employee History
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
