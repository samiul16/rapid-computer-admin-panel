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
import { Modal } from "@mantine/core";
import { Button } from "@/components/ui/button";

type LeavesData = {
  branch: string;
  iqamaNo: string;
  leaveType: string;
  fromDate: string;
  endDate: string;
  totalDays: number;
  applicationHardCopy: File | null;
  reason: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: LeavesData = {
  branch: "Riyadh Branch",
  iqamaNo: "1234567890",
  leaveType: "Annual Leave",
  fromDate: "2024-02-15",
  endDate: "2024-02-20",
  totalDays: 6,
  applicationHardCopy: null,
  reason: "Family vacation",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Branch options for autocomplete
const branchOptions = ["Riyadh Branch", "Jeddah Branch", "Dammam Branch"];

// Iqama No options for autocomplete
const iqamaNoOptions = [
  "1234567890",
  "2345678901",
  "3456789012",
  "4567890123",
  "5678901234",
  "6789012345",
  "7890123456",
  "8901234567",
  "9012345678",
  "0123456789",
];

// Leave Types options for autocomplete
const leaveTypeOptions = [
  "Annual Leave",
  "Sick Leave",
  "Maternity Leave",
  "Personal Leave",
  "Study Leave",
  "Bereavement Leave",
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

export default function LeavesDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Riyadh Branch");
  const [selectedIqamaNo, setSelectedIqamaNo] = useState("1234567890");
  const [selectedLeaveType, setSelectedLeaveType] = useState("Annual Leave");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Employee modal states
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    name: string;
    designation: string;
    photo: string;
    iqamaImage: string;
  } | null>(null);

  // get permission
  const canCreate: boolean = usePermission("leavesApplication", "create");
  const canView: boolean = usePermission("leavesApplication", "view");
  const canEdit: boolean = usePermission("leavesApplication", "edit");
  const canDelete: boolean = usePermission("leavesApplication", "delete");
  const canExport: boolean = usePermission("leavesApplication", "export");
  const canPdf: boolean = usePermission("leavesApplication", "pdf");
  const canPrint: boolean = usePermission("leavesApplication", "print");
  const canSeeHistory: boolean = usePermission("leavesApplication", "history");

  // Field-level permissions
  const canViewBranch: boolean = usePermission(
    "leavesApplication",
    "view",
    "branch"
  );
  const canViewIqamaNo: boolean = usePermission(
    "leavesApplication",
    "view",
    "iqamaNo"
  );
  const canViewLeaveType: boolean = usePermission(
    "leavesApplication",
    "view",
    "leaveType"
  );
  const canViewFromDate: boolean = usePermission(
    "leavesApplication",
    "view",
    "fromDate"
  );
  const canViewEndDate: boolean = usePermission(
    "leavesApplication",
    "view",
    "endDate"
  );
  const canViewTotalDays: boolean = usePermission(
    "leavesApplication",
    "view",
    "totalDays"
  );
  const canViewApplicationHardCopy: boolean = usePermission(
    "leavesApplication",
    "view",
    "applicationHardCopy"
  );
  const canViewReason: boolean = usePermission(
    "leavesApplication",
    "view",
    "reason"
  );
  const canViewIsActive: boolean = usePermission(
    "leavesApplication",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "leavesApplication",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "leavesApplication",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get leaves data based on selected leave type
  const getLeavesData = (leaveType: string): LeavesData => {
    const leavesMap: Record<string, LeavesData> = {
      "Annual Leave": {
        branch: "Riyadh Branch",
        iqamaNo: "1234567890",
        leaveType: "Annual Leave",
        fromDate: "2024-02-15",
        endDate: "2024-02-20",
        totalDays: 6,
        applicationHardCopy: null,
        reason: "Family vacation",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Sick Leave": {
        branch: "Jeddah Branch",
        iqamaNo: "2345678901",
        leaveType: "Sick Leave",
        fromDate: "2024-02-10",
        endDate: "2024-02-12",
        totalDays: 3,
        applicationHardCopy: null,
        reason: "Medical appointment",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Maternity Leave": {
        branch: "Dammam Branch",
        iqamaNo: "3456789012",
        leaveType: "Maternity Leave",
        fromDate: "2024-03-01",
        endDate: "2024-05-31",
        totalDays: 92,
        applicationHardCopy: null,
        reason: "Pregnancy leave",
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Personal Leave": {
        branch: "Riyadh Branch",
        iqamaNo: "4567890123",
        leaveType: "Personal Leave",
        fromDate: "2024-02-25",
        endDate: "2024-02-26",
        totalDays: 2,
        applicationHardCopy: null,
        reason: "Personal emergency",
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Study Leave": {
        branch: "Jeddah Branch",
        iqamaNo: "5678901234",
        leaveType: "Study Leave",
        fromDate: "2024-03-15",
        endDate: "2024-03-20",
        totalDays: 6,
        applicationHardCopy: null,
        reason: "Exam preparation",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-24T15:20:00Z"),
        deletedAt: new Date("2024-02-01T09:00:00Z"),
        isDeleted: true,
      },
      "Bereavement Leave": {
        branch: "Dammam Branch",
        iqamaNo: "6789012345",
        leaveType: "Bereavement Leave",
        fromDate: "2024-02-05",
        endDate: "2024-02-08",
        totalDays: 4,
        applicationHardCopy: null,
        reason: "Family bereavement",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return leavesMap[leaveType] || initialData;
  };

  const [leavesData, setLeavesData] = useState<LeavesData>(
    getLeavesData(selectedLeaveType)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Employee data mapping for Iqama numbers
  const employeeData: Record<
    string,
    {
      name: string;
      designation: string;
      photo: string;
      iqamaImage: string;
    }
  > = {
    "1234567890": {
      name: "Rizwan Safdar Majoka",
      designation: "Technical Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "2345678901": {
      name: "Ahmed Al-Rashid",
      designation: "Software Engineer",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "3456789012": {
      name: "Fatima Al-Zahra",
      designation: "HR Specialist",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "4567890123": {
      name: "Mohammed Al-Otaibi",
      designation: "Project Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "5678901234": {
      name: "Sarah Al-Mansouri",
      designation: "Business Analyst",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "6789012345": {
      name: "Abdullah Al-Harbi",
      designation: "Finance Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "7890123456": {
      name: "Noura Al-Ghamdi",
      designation: "Marketing Coordinator",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
  };

  // Update leaves data when selection changes
  useEffect(() => {
    const newLeavesData = getLeavesData(selectedLeaveType);
    setLeavesData(newLeavesData);
    setSelectedBranch(newLeavesData.branch);
    setSelectedIqamaNo(newLeavesData.iqamaNo);
  }, [selectedLeaveType]);

  // Handle Iqama No change to show employee details
  const handleIqamaNoChange = (value: string) => {
    setSelectedIqamaNo(value);

    // Show employee details if valid Iqama No is selected
    if (value && employeeData[value]) {
      setSelectedEmployee(employeeData[value]);
      setIsEmployeeModalOpen(true);
    }
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Leave Application Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          iqamaNo: "Iqama No",
          leaveType: "Leave Type",
          fromDate: "From Date",
          endDate: "End Date",
          totalDays: "Total Days",
          applicationHardCopy: "Application Hard Copy",
          reason: "Reason",
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
      console.log("leavesData on pdf click", leavesData);
      const blob = await pdf(
        <GenericPDF
          data={[leavesData]}
          title="Leave Details"
          subtitle="Leave Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leave-details.pdf";
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
        title="Viewing Leave Application"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/leaves-application")}
        listText="List"
        listPath="leaves-application"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/leaves-application/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/leaves-application/edit/1"),
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
                  handlePrintLeaves(leavesData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Branch, Iqama No, Leave Type */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewBranch && (
              <div className="mt-1">
                <Autocomplete
                  options={branchOptions}
                  value={selectedBranch}
                  onValueChange={setSelectedBranch}
                  placeholder="Select branch..."
                  displayKey="branch"
                  valueKey="branch"
                  searchKey="branch"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Branch"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewIqamaNo && (
              <div className="mt-1">
                <Autocomplete
                  options={iqamaNoOptions}
                  value={selectedIqamaNo}
                  onValueChange={handleIqamaNoChange}
                  placeholder="Select Iqama No..."
                  displayKey="iqamaNo"
                  valueKey="iqamaNo"
                  searchKey="iqamaNo"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Iqama No"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewLeaveType && (
              <div className="mt-1">
                <Autocomplete
                  options={leaveTypeOptions}
                  value={selectedLeaveType}
                  onValueChange={setSelectedLeaveType}
                  placeholder="Select leave type..."
                  displayKey="leaveType"
                  valueKey="leaveType"
                  searchKey="leaveType"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Leave Type"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewFromDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">From Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.fromDate)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: End Date, Total Days, Reason */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewEndDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">End Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.endDate)}
                </div>
              </div>
            )}

            {canViewTotalDays && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Total Days</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.totalDays)}
                </div>
              </div>
            )}

            {canViewReason && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Reason</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.reason)}
                </div>
              </div>
            )}

            {canViewApplicationHardCopy && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Application Hard Copy
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {leavesData.applicationHardCopy ? (
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      View File
                    </span>
                  ) : (
                    <span className="text-gray-500">No file uploaded</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Status fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {leavesData.isActive ? (
                    <span className="font-bold text-[15px]">Yes</span>
                  ) : (
                    <span className="font-bold text-[15px]">No</span>
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
                  {leavesData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
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
                  {leavesData.isDeleted ? (
                    <span className="text-red-600 font-bold text-[15px]">
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
          created: getRelativeTime(leavesData.createdAt),
          updated: getRelativeTime(leavesData.updatedAt),
          drafted: getRelativeTime(leavesData.draftedAt),
          deleted: getRelativeTime(leavesData.deletedAt),
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

      {/* Employee Details Modal */}
      <Modal
        opened={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        title="Employee Details"
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        centered
      >
        {selectedEmployee && (
          <div className="p-6">
            {/* Employee Header with Photo and Basic Info */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-shrink-0">
                <img
                  src={selectedEmployee.photo}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedEmployee.name}
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  {selectedEmployee.designation}
                </p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Active Employee
                </div>
              </div>
            </div>

            {/* Iqama Card Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Iqama Card
                </h3>
                <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  Verified ✓
                </span>
              </div>

              {/* Iqama Card Display */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-green-300">
                <div className="bg-green-600 text-white px-4 py-2 text-center font-bold">
                  Kingdom of Saudi Arabia - Iqama Card
                </div>
                <div className="p-4">
                  <img
                    src={selectedEmployee.iqamaImage}
                    alt="Iqama Card"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Iqama Number</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedIqamaNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-full transition-colors"
              >
                Continue with Application
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
