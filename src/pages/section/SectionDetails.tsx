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

type SectionData = {
  code: string;
  title: string;
  description: string;
  manager: string;
  employeeCount: number;
  budget: number;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: SectionData = {
  code: "S001",
  title: "Kitchen",
  description: "Main kitchen area for food preparation",
  manager: "Chef Johnson",
  employeeCount: 15,
  budget: 1200000,
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Section codes for autocomplete
const sectionCodes = ["S001", "S002", "S003", "S004", "S005", "S006"];

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

export default function SectionDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("S001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("section", "create");
  const canView: boolean = usePermission("section", "view");
  const canEdit: boolean = usePermission("section", "edit");
  const canDelete: boolean = usePermission("section", "delete");
  const canExport: boolean = usePermission("section", "export");
  const canPdf: boolean = usePermission("section", "pdf");
  const canPrint: boolean = usePermission("section", "print");
  const canSeeHistory: boolean = usePermission("section", "history");

  // Field-level permissions
  const canViewCode: boolean = usePermission("section", "view", "code");
  const canViewTitle: boolean = usePermission("section", "view", "title");
  const canViewDescription: boolean = usePermission(
    "section",
    "view",
    "description"
  );
  const canViewManager: boolean = usePermission("section", "view", "manager");
  const canViewEmployeeCount: boolean = usePermission(
    "section",
    "view",
    "employeeCount"
  );
  const canViewBudget: boolean = usePermission("section", "view", "budget");
  const canViewIsDefault: boolean = usePermission(
    "section",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission("section", "view", "isActive");
  const canViewIsDraft: boolean = usePermission("section", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "section",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get section data based on selected code
  const getSectionData = (code: string): SectionData => {
    const sectionMap: Record<string, SectionData> = {
      S001: {
        code: "S001",
        title: "Kitchen",
        description: "Main kitchen area for food preparation",
        manager: "Chef Johnson",
        employeeCount: 15,
        budget: 1200000,
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-05-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-15T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      S002: {
        code: "S002",
        title: "Dining Hall",
        description: "Main dining area for customers",
        manager: "Sarah Wilson",
        employeeCount: 12,
        budget: 800000,
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-06-20T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-02-10T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      S003: {
        code: "S003",
        title: "Bar",
        description: "Bar area for drinks and beverages",
        manager: "Mike Davis",
        employeeCount: 8,
        budget: 600000,
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2023-07-10T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-03-05T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      S004: {
        code: "S004",
        title: "Storage",
        description: "Storage area for inventory management",
        manager: "Lisa Brown",
        employeeCount: 6,
        budget: 400000,
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2023-08-25T12:00:00Z"),
        draftedAt: new Date("2024-04-01T10:00:00Z"),
        updatedAt: new Date("2024-04-01T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      S005: {
        code: "S005",
        title: "Office",
        description: "Administrative office area",
        manager: "John Smith",
        employeeCount: 5,
        budget: 300000,
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-09-15T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T15:20:00Z"),
        deletedAt: new Date("2024-05-01T09:00:00Z"),
        isDeleted: true,
      },
      S006: {
        code: "S006",
        title: "Kitchen Prep",
        description: "Food preparation area",
        manager: "Maria Garcia",
        employeeCount: 10,
        budget: 500000,
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

    return sectionMap[code] || initialData;
  };

  const [sectionData, setSectionData] = useState<SectionData>(
    getSectionData(selectedSection)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update section data when selection changes
  useEffect(() => {
    setSectionData(getSectionData(selectedSection));
  }, [selectedSection]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintSection = (sectionData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Section Details",
        data: [sectionData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Section Code",
          title: "Section Name",
          description: "Description",
          manager: "Manager",
          employeeCount: "Employee Count",
          budget: "Budget",
          isDefault: "Default Section",
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
      console.log("sectionData on pdf click", sectionData);
      const blob = await pdf(
        <GenericPDF
          data={[sectionData]}
          title="Section Details"
          subtitle="Section Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sections-details.pdf";
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
        title="Viewing Section"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/sections")}
        listText="List"
        listPath="section"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/section/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/section/edit/1"),
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
                  handlePrintSection(sectionData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewCode && (
              <div className="mt-1">
                <Autocomplete
                  options={sectionCodes}
                  value={selectedSection}
                  onValueChange={setSelectedSection}
                  placeholder="Select section code..."
                  displayKey="code"
                  valueKey="code"
                  searchKey="code"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Code"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewTitle && (
              <div className="">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-normal text-gray-600">Name</h3>
                </div>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sectionData.title)}
                </div>
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-fit py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sectionData.description)}
                </div>
              </div>
            )}

            {canViewManager && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Manager</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sectionData.manager)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2 - Additional Section Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewEmployeeCount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Employees</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sectionData.employeeCount)}
                </div>
              </div>
            )}

            {canViewBudget && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Budget</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sectionData.budget?.toLocaleString())}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="">
                <div className="flex flex-col">
                  <div className="">
                    <span className="text-[15px] text-gray-600">Default</span>
                  </div>
                  <div className="">
                    {sectionData.isDefault ? (
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
                  {sectionData.isDraft ? (
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

          {/* Row 3 - Status Labels */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Inactive</span>
                </div>
                <div className="">
                  {!sectionData.isActive ? (
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
                  {sectionData.isDeleted ? (
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
          created: getRelativeTime(sectionData.createdAt),
          updated: getRelativeTime(sectionData.updatedAt),
          drafted: getRelativeTime(sectionData.draftedAt),
          deleted: getRelativeTime(sectionData.deletedAt),
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
