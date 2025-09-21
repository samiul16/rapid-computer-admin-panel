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

type LeadStatusData = {
  name: string;
  order: number;
  color: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: LeadStatusData = {
  name: "New Lead",
  order: 1,
  color: "#3B82F6",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Lead Status Name options for autocomplete
const leadStatusNameOptions = [
  "New Lead",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
  "On Hold",
  "Rejected",
  "Follow Up",
  "Meeting Scheduled",
  "Demo Completed",
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

export default function LeadSourceDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeadStatusName, setSelectedLeadStatusName] =
    useState("New Lead");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("leadStatuses", "create");
  const canView: boolean = usePermission("leadStatuses", "view");
  const canEdit: boolean = usePermission("leadStatuses", "edit");
  const canDelete: boolean = usePermission("leadStatuses", "delete");
  const canExport: boolean = usePermission("leadStatuses", "export");
  const canPdf: boolean = usePermission("leadStatuses", "pdf");
  const canPrint: boolean = usePermission("leadStatuses", "pdf");
  const canSeeHistory: boolean = usePermission("leadStatuses", "history");

  // Field-level permissions
  const canViewName: boolean = usePermission("leadStatuses", "view", "name");
  const canViewOrder: boolean = usePermission("leadStatuses", "view", "order");
  const canViewColor: boolean = usePermission("leadStatuses", "view", "color");
  const canViewIsActive: boolean = usePermission(
    "leadStatuses",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "leadStatuses",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "leadStatuses",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get lead status data based on selected lead status name
  const getLeadStatusData = (leadStatusName: string): LeadStatusData => {
    const leadStatusMap: Record<string, LeadStatusData> = {
      "New Lead": {
        name: "New Lead",
        order: 1,
        color: "#3B82F6",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Contacted: {
        name: "Contacted",
        order: 2,
        color: "#10B981",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Qualified: {
        name: "Qualified",
        order: 3,
        color: "#F59E0B",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-05-15T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Proposal Sent": {
        name: "Proposal Sent",
        order: 4,
        color: "#8B5CF6",
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Negotiation: {
        name: "Negotiation",
        order: 5,
        color: "#EF4444",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2021-12-15T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-28T15:20:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return leadStatusMap[leadStatusName] || initialData;
  };

  const [leadStatusData, setLeadStatusData] = useState<LeadStatusData>(
    getLeadStatusData(selectedLeadStatusName)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update lead status data when selection changes
  useEffect(() => {
    const newLeadStatusData = getLeadStatusData(selectedLeadStatusName);
    setLeadStatusData(newLeadStatusData);
  }, [selectedLeadStatusName]);

  // Handle lead status name change
  const handleLeadStatusNameChange = (value: string) => {
    setSelectedLeadStatusName(value);
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintLeadStatus = (leadStatusData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Lead Status Details",
        data: [leadStatusData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          order: "Order",
          color: "Color",
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
      console.log("leadStatusData on pdf click", leadStatusData);
      const blob = await pdf(
        <GenericPDF
          data={[leadStatusData]}
          title="Lead Status Details"
          subtitle="Lead Status Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lead-status-details.pdf";
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

  return (
    <>
      <PageLayout
        title="Viewing Lead Status"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/lead-status")}
        listText="List"
        listPath="lead-status"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/lead-status/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/lead-status/edit/1"),
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
                  handlePrintLeadStatus(leadStatusData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Lead Status Name */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewName && (
              <div className="mt-1">
                <Autocomplete
                  options={leadStatusNameOptions}
                  value={selectedLeadStatusName}
                  onValueChange={handleLeadStatusNameChange}
                  placeholder="Select Lead Status Name..."
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Lead Status Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewOrder && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Order</span>
                </div>
                <div className="">
                  <span className="font-bold text-[15px]">
                    {leadStatusData.order}
                  </span>
                </div>
              </div>
            )}

            {canViewColor && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Color</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: leadStatusData.color }}
                  />
                  <span className="font-bold text-[15px]">
                    {leadStatusData.color}
                  </span>
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {leadStatusData.isActive ? (
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
                  {leadStatusData.isDraft ? (
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
                  {leadStatusData.isDeleted ? (
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
          created: getRelativeTime(leadStatusData.createdAt),
          updated: getRelativeTime(leadStatusData.updatedAt),
          drafted: getRelativeTime(leadStatusData.draftedAt),
          deleted: getRelativeTime(leadStatusData.deletedAt),
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
