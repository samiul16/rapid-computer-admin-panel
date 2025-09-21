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

type ShiftTypeData = {
  name: string;
  color: string;
  startTime: string;
  endTime: string;
  lunchStart: string;
  lunchEnd: string;
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

const initialData: ShiftTypeData = {
  name: "Morning Shift",
  color: "#3B82F6",
  startTime: "08:00",
  endTime: "16:00",
  lunchStart: "12:00",
  lunchEnd: "13:00",
  description: "Standard morning shift for office staff",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Shift type options for autocomplete
const shiftTypeOptions = [
  "Morning Shift",
  "Afternoon Shift",
  "Night Shift",
  "Split Shift",
  "Flexible Shift",
  "Weekend Shift",
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

export default function ShiftTypeDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedShiftType, setSelectedShiftType] = useState("Morning Shift");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("shiftType", "create");
  const canView: boolean = usePermission("shiftType", "view");
  const canEdit: boolean = usePermission("shiftType", "edit");
  const canDelete: boolean = usePermission("shiftType", "delete");
  const canExport: boolean = usePermission("shiftType", "export");
  const canPdf: boolean = usePermission("shiftType", "pdf");
  const canPrint: boolean = usePermission("shiftType", "print");
  const canSeeHistory: boolean = usePermission("shiftType", "history");

  // Field-level permissions
  const canViewName: boolean = usePermission("shiftType", "view", "name");
  const canViewColor: boolean = usePermission("shiftType", "view", "color");
  const canViewStartTime: boolean = usePermission(
    "shiftType",
    "view",
    "startTime"
  );
  const canViewEndTime: boolean = usePermission("shiftType", "view", "endTime");
  const canViewLunchStart: boolean = usePermission(
    "shiftType",
    "view",
    "lunchStart"
  );
  const canViewLunchEnd: boolean = usePermission(
    "shiftType",
    "view",
    "lunchEnd"
  );
  const canViewDescription: boolean = usePermission(
    "shiftType",
    "view",
    "description"
  );
  const canViewIsDefault: boolean = usePermission(
    "shiftType",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "shiftType",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission("shiftType", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "shiftType",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get shift type data based on selected shift type
  const getShiftTypeData = (shiftTypeName: string): ShiftTypeData => {
    const shiftTypeMap: Record<string, ShiftTypeData> = {
      "Morning Shift": {
        name: "Morning Shift",
        color: "#3B82F6",
        startTime: "08:00",
        endTime: "16:00",
        lunchStart: "12:00",
        lunchEnd: "13:00",
        description: "Standard morning shift for office staff",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Afternoon Shift": {
        name: "Afternoon Shift",
        color: "#10B981",
        startTime: "14:00",
        endTime: "22:00",
        lunchStart: "18:00",
        lunchEnd: "19:00",
        description: "Afternoon shift for retail and service staff",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Night Shift": {
        name: "Night Shift",
        color: "#8B5CF6",
        startTime: "22:00",
        endTime: "06:00",
        lunchStart: "02:00",
        lunchEnd: "03:00",
        description: "Overnight shift for security and maintenance",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Split Shift": {
        name: "Split Shift",
        color: "#F59E0B",
        startTime: "09:00",
        endTime: "17:00",
        lunchStart: "13:00",
        lunchEnd: "14:00",
        description: "Split shift with flexible hours",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Flexible Shift": {
        name: "Flexible Shift",
        color: "#EF4444",
        startTime: "10:00",
        endTime: "18:00",
        lunchStart: "14:00",
        lunchEnd: "15:00",
        description: "Flexible working hours for remote staff",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-24T15:20:00Z"),
        deletedAt: new Date("2024-02-01T09:00:00Z"),
        isDeleted: true,
      },
      "Weekend Shift": {
        name: "Weekend Shift",
        color: "#06B6D4",
        startTime: "09:00",
        endTime: "17:00",
        lunchStart: "13:00",
        lunchEnd: "14:00",
        description: "Weekend shift for essential services",
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

    return shiftTypeMap[shiftTypeName] || initialData;
  };

  const [shiftTypeData, setShiftTypeData] = useState<ShiftTypeData>(
    getShiftTypeData(selectedShiftType)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update shift type data when selection changes
  useEffect(() => {
    setShiftTypeData(getShiftTypeData(selectedShiftType));
  }, [selectedShiftType]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintShiftTypes = (shiftTypeData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Shift Type Details",
        data: [shiftTypeData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          color: "Color",
          startTime: "Start Time",
          endTime: "End Time",
          lunchStart: "Lunch Start",
          lunchEnd: "Lunch End",
          description: "Description",
          isDefault: "Default Shift Type",
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
      console.log("shiftTypeData on pdf click", shiftTypeData);
      const blob = await pdf(
        <GenericPDF
          data={[shiftTypeData]}
          title="Shift Type Details"
          subtitle="Shift Type Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shift-type-details.pdf";
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
        title="Viewing Shift Type"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/shift-type")}
        listText="List"
        listPath="shift-type"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/shift-type/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/shift-type/edit/1"),
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
                  handlePrintShiftTypes(shiftTypeData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Name, Color, Start Time, End Time */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewName && (
              <div className="mt-1">
                <Autocomplete
                  options={shiftTypeOptions}
                  value={selectedShiftType}
                  onValueChange={setSelectedShiftType}
                  placeholder="Select shift type..."
                  displayKey="shiftType"
                  valueKey="shiftType"
                  searchKey="shiftType"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewColor && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Color</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: shiftTypeData.color }}
                  ></div>
                  {displayValue(shiftTypeData.color)}
                </div>
              </div>
            )}

            {canViewStartTime && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Start Time</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shiftTypeData.startTime)}
                </div>
              </div>
            )}

            {canViewEndTime && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">End Time</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shiftTypeData.endTime)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Lunch Start, Lunch End, Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewLunchStart && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Lunch Start</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shiftTypeData.lunchStart)}
                </div>
              </div>
            )}

            {canViewLunchEnd && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Lunch End</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shiftTypeData.lunchEnd)}
                </div>
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shiftTypeData.description)}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {shiftTypeData.isDefault ? (
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

          {/* Row 3: Default, Draft, Active, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {shiftTypeData.isDraft ? (
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
                  {shiftTypeData.isActive ? (
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
                  {shiftTypeData.isDeleted ? (
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
          created: getRelativeTime(shiftTypeData.createdAt),
          updated: getRelativeTime(shiftTypeData.updatedAt),
          drafted: getRelativeTime(shiftTypeData.draftedAt),
          deleted: getRelativeTime(shiftTypeData.deletedAt),
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
