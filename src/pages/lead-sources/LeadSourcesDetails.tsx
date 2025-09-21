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

type LeadSourceData = {
  name: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: LeadSourceData = {
  name: "Website",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Lead Source Name options for autocomplete
const leadSourceNameOptions = [
  "Website",
  "Social Media",
  "Referral",
  "Cold Call",
  "Email Marketing",
  "Trade Show",
  "Online Advertisement",
  "Direct Mail",
  "Partnership",
  "Content Marketing",
  "Search Engine",
  "Influencer Marketing",
  "Digital Marketing",
  "Traditional Marketing",
  "Networking",
  "Events",
  "Publications",
  "Word of Mouth",
  "LinkedIn",
  "Facebook Ads",
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
  const [selectedLeadSourceName, setSelectedLeadSourceName] =
    useState("Website");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("leadSources", "create");
  const canView: boolean = usePermission("leadSources", "view");
  const canEdit: boolean = usePermission("leadSources", "edit");
  const canDelete: boolean = usePermission("leadSources", "delete");
  const canExport: boolean = usePermission("leadSources", "export");
  const canPdf: boolean = usePermission("leadSources", "pdf");
  const canPrint: boolean = usePermission("leadSources", "pdf");
  const canSeeHistory: boolean = usePermission("leadSources", "history");

  // Field-level permissions
  const canViewName: boolean = usePermission("leadSources", "view", "name");
  const canViewIsActive: boolean = usePermission(
    "leadSources",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "leadSources",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "leadSources",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get lead source data based on selected lead source name
  const getLeadSourceData = (leadSourceName: string): LeadSourceData => {
    const leadSourceMap: Record<string, LeadSourceData> = {
      Website: {
        name: "Website",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Social Media": {
        name: "Social Media",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Referral: {
        name: "Referral",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-05-15T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Cold Call": {
        name: "Cold Call",
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Email Marketing": {
        name: "Email Marketing",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2021-12-15T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-28T15:20:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return leadSourceMap[leadSourceName] || initialData;
  };

  const [leadSourceData, setLeadSourceData] = useState<LeadSourceData>(
    getLeadSourceData(selectedLeadSourceName)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update lead source data when selection changes
  useEffect(() => {
    const newLeadSourceData = getLeadSourceData(selectedLeadSourceName);
    setLeadSourceData(newLeadSourceData);
  }, [selectedLeadSourceName]);

  // Handle lead source name change
  const handleLeadSourceNameChange = (value: string) => {
    setSelectedLeadSourceName(value);
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintLeadSource = (leadSourceData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Lead Source Details",
        data: [leadSourceData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
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
      console.log("leadSourceData on pdf click", leadSourceData);
      const blob = await pdf(
        <GenericPDF
          data={[leadSourceData]}
          title="Lead Source Details"
          subtitle="Lead Source Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lead-source-details.pdf";
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
        title="Viewing Lead Source"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/lead-sources")}
        listText="List"
        listPath="lead-sources"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/lead-sources/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/lead-sources/edit/1"),
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
                  handlePrintLeadSource(leadSourceData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Lead Source Name */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewName && (
              <div className="mt-1">
                <Autocomplete
                  options={leadSourceNameOptions}
                  value={selectedLeadSourceName}
                  onValueChange={handleLeadSourceNameChange}
                  placeholder="Select Lead Source Name..."
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Lead Source Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {leadSourceData.isActive ? (
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
                  {leadSourceData.isDraft ? (
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
                  {leadSourceData.isDeleted ? (
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
          created: getRelativeTime(leadSourceData.createdAt),
          updated: getRelativeTime(leadSourceData.updatedAt),
          drafted: getRelativeTime(leadSourceData.draftedAt),
          deleted: getRelativeTime(leadSourceData.deletedAt),
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
