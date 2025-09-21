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

import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type LeavesApprovalData = {
  id: string;
  branch: string;
  employee: string;
  leaveType: string;
  fromDate: string;
  endDate: string;
  totalDays: number;
  hardCopy: string;
  approvedBy: string;
  status: string;
};

const initialData: LeavesApprovalData = {
  id: "1",
  branch: "Main Branch",
  employee: "John Doe",
  leaveType: "Annual Leave",
  fromDate: "2024-01-15",
  endDate: "2024-01-20",
  totalDays: 6,
  hardCopy: "Yes",
  approvedBy: "Manager Smith",
  status: "Active",
};

// Leave Types options for autocomplete
const leaveTypesOptions = [
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

export default function LeavesApprovalDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("Annual Leave");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("leavesApproval", "create");
  const canView: boolean = usePermission("leavesApproval", "view");
  const canEdit: boolean = usePermission("leavesApproval", "edit");
  const canDelete: boolean = usePermission("leavesApproval", "delete");
  const canExport: boolean = usePermission("leavesApproval", "export");
  const canPdf: boolean = usePermission("leavesApproval", "pdf");
  const canPrint: boolean = usePermission("leavesApproval", "print");
  const canSeeHistory: boolean = usePermission("leavesApproval", "history");

  // Field-level permissions
  const canViewBranch: boolean = usePermission(
    "leavesApproval",
    "view",
    "branch"
  );
  const canViewId: boolean = usePermission("leavesApproval", "view", "id");
  const canViewEmployee: boolean = usePermission(
    "leavesApproval",
    "view",
    "employee"
  );
  const canViewLeaveType: boolean = usePermission(
    "leavesApproval",
    "view",
    "leaveType"
  );
  const canViewFromDate: boolean = usePermission(
    "leavesApproval",
    "view",
    "fromDate"
  );
  const canViewEndDate: boolean = usePermission(
    "leavesApproval",
    "view",
    "endDate"
  );
  const canViewTotalDays: boolean = usePermission(
    "leavesApproval",
    "view",
    "totalDays"
  );
  const canViewHardCopy: boolean = usePermission(
    "leavesApproval",
    "view",
    "hardCopy"
  );
  const canViewApprovedBy: boolean = usePermission(
    "leavesApproval",
    "view",
    "approvedBy"
  );
  const canViewStatus: boolean = usePermission(
    "leavesApproval",
    "view",
    "status"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get leave approval data based on selected leave type
  const getLeaveApprovalData = (leaveType: string): LeavesApprovalData => {
    const leaveApprovalMap: Record<string, LeavesApprovalData> = {
      "Annual Leave": {
        id: "1",
        branch: "Main Branch",
        employee: "John Doe",
        leaveType: "Annual Leave",
        fromDate: "2024-01-15",
        endDate: "2024-01-20",
        totalDays: 6,
        hardCopy: "Yes",
        approvedBy: "Manager Smith",
        status: "Active",
      },
      "Sick Leave": {
        id: "2",
        branch: "North Branch",
        employee: "Jane Smith",
        leaveType: "Sick Leave",
        fromDate: "2024-01-16",
        endDate: "2024-01-18",
        totalDays: 3,
        hardCopy: "No",
        approvedBy: "Manager Johnson",
        status: "Draft",
      },
      "Maternity Leave": {
        id: "3",
        branch: "South Branch",
        employee: "Mike Wilson",
        leaveType: "Maternity Leave",
        fromDate: "2024-01-17",
        endDate: "2024-02-17",
        totalDays: 32,
        hardCopy: "Yes",
        approvedBy: "HR Manager",
        status: "Active",
      },
      "Personal Leave": {
        id: "4",
        branch: "East Branch",
        employee: "Sarah Brown",
        leaveType: "Personal Leave",
        fromDate: "2024-01-18",
        endDate: "2024-01-19",
        totalDays: 2,
        hardCopy: "No",
        approvedBy: "Manager Davis",
        status: "Inactive",
      },
      "Study Leave": {
        id: "5",
        branch: "West Branch",
        employee: "David Lee",
        leaveType: "Study Leave",
        fromDate: "2024-01-19",
        endDate: "2024-01-25",
        totalDays: 7,
        hardCopy: "Yes",
        approvedBy: "Manager Wilson",
        status: "Active",
      },
      "Bereavement Leave": {
        id: "6",
        branch: "Central Branch",
        employee: "Lisa Garcia",
        leaveType: "Bereavement Leave",
        fromDate: "2024-01-20",
        endDate: "2024-01-22",
        totalDays: 3,
        hardCopy: "No",
        approvedBy: "Manager Brown",
        status: "Draft",
      },
    };

    return leaveApprovalMap[leaveType] || initialData;
  };

  const [leaveApprovalData, setLeaveApprovalData] =
    useState<LeavesApprovalData>(getLeaveApprovalData(selectedLeaveType));

  const inputRef = useRef<HTMLInputElement>(null);

  // Update leave approval data when selection changes
  useEffect(() => {
    setLeaveApprovalData(getLeaveApprovalData(selectedLeaveType));
  }, [selectedLeaveType]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintLeaveApproval = (leaveApprovalData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Leave Approval Details",
        data: [leaveApprovalData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          employee: "Employee",
          leaveType: "Leave Type",
          fromDate: "From Date",
          endDate: "End Date",
          totalDays: "Total Days",
          hardCopy: "Hard Copy",
          approvedBy: "Approved By",
          status: "Status",
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
      console.log("leaveApprovalData on pdf click", leaveApprovalData);
      const blob = await pdf(
        <GenericPDF
          data={[leaveApprovalData]}
          title="Leave Approval Details"
          subtitle="Leave Approval Information"
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

  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "–" : value;
  };

  return (
    <>
      <PageLayout
        title="Viewing Leaves Approval"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/leaves-approval")}
        listText="List"
        listPath="leaves-approval"
        activePage="view"
        popoverOptions={[]}
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
                  handlePrintLeaveApproval(leaveApprovalData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Branch, Employee, Leave Type */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewLeaveType && (
              <div className="mt-1">
                <Autocomplete
                  options={leaveTypesOptions}
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

            {canViewBranch && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Branch</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leaveApprovalData.branch)}
                </div>
              </div>
            )}

            {canViewEmployee && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Employee</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leaveApprovalData.employee)}
                </div>
              </div>
            )}

            {canViewId && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">ID</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leaveApprovalData.id)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: From Date, End Date, Total Days */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewFromDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">From Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leaveApprovalData.fromDate)}
                </div>
              </div>
            )}

            {canViewEndDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">End Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leaveApprovalData.endDate)}
                </div>
              </div>
            )}

            {canViewTotalDays && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Total Days</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leaveApprovalData.totalDays)}
                </div>
              </div>
            )}

            {canViewHardCopy && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Hard Copy</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leaveApprovalData.hardCopy)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Approved By, Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewApprovedBy && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Approved By</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leaveApprovalData.approvedBy)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leaveApprovalData.status)}
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
          created: "2h ago",
          updated: "1h ago",
          drafted: "–",
          deleted: "–",
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
