/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, useCallback } from "react";
import { Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Modal } from "@mantine/core";
import HistoryDataTable from "@/components/common/HistoryDataTable";
import { mockHistoryData } from "@/mockData/country-mockdata";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import PDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import type { StateData } from "@/types/states.types";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";

const MOCK_STATES = [
  { code: "CA", name: "California", flag: "https://flagcdn.com/us.svg" },
  { code: "NY", name: "New York", flag: "https://flagcdn.com/us.svg" },
  { code: "TX", name: "Texas", flag: "https://flagcdn.com/us.svg" },
  { code: "FL", name: "Florida", flag: "https://flagcdn.com/us.svg" },
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

type StateViewModuleData = {
  selectedState: string;
  hasChanges: boolean;
  scrollPosition?: number;
  keepChanges?: boolean;
};

const STATE_DATA = MOCK_STATES.map((state) => state.code);

export default function StateDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Use the custom hook for minimized module data
  const { moduleData, hasMinimizedData, getModuleScrollPosition } =
    useMinimizedModuleData<StateViewModuleData>("states-view");

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("CA");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  const isViewPage = location.pathname.includes("/view");
  const inputRef = useRef<HTMLInputElement>(null);

  // Simplified restore logic using the custom hook
  useEffect(() => {
    // Auto-restore if module exists in Redux with data
    const shouldAutoRestore =
      hasMinimizedData && moduleData && !isRestoredFromMinimized;

    if (shouldAutoRestore) {
      if (moduleData.selectedState) {
        setSelectedState(moduleData.selectedState);
      }

      if (moduleData.keepChanges !== undefined) {
        setKeepChanges(moduleData.keepChanges);
      }

      setIsRestoredFromMinimized(true);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition("states-view");
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    getModuleScrollPosition,
  ]);

  let stateData: StateData = {
    code: selectedState,
    State:
      MOCK_STATES.find((s) => s.code === selectedState)?.name || "California",
    Country_name: "United States",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2023-05-15T10:30:00Z"),
    updatedAt: new Date("2023-11-20T14:45:00Z"),
    draftedAt: new Date("2025-05-20T14:45:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      stateData = {
        code: selectedState,
        State: "",
        Country_name: "",
        isDefault: false,
        isDraft: false,
        isActive: false,
        isDeleted: false,
        createdAt: null,
        updatedAt: null,
        draftedAt: null,
        deletedAt: null,
      };
    }
  }, []);

  const handlePrintState = (stateData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "State Details",
        data: [stateData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "State Code",
          State: "State Name",
          Country_name: "Country",
          isDefault: "Default State",
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
      setTimeout(() => handlePrintState(stateData), 100);
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
      console.log("stateData on pdf click", stateData);
      const blob = await pdf(
        <PDF
          data={[stateData]}
          title="State Details"
          subtitle="State Information Report"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "state-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleDeleteRestore = () =>
    console.log(stateData.isDeleted ? "Restoring..." : "Deleting...");

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

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): StateViewModuleData => {
    return {
      selectedState,
      hasChanges: true,
      scrollPosition: window.scrollY,
      keepChanges,
    };
  }, [selectedState, keepChanges]);

  const popoverOptions = [
    {
      label: "Create",
      onClick: () => navigate("/states/create"),
    },
    {
      label: "Edit",
      onClick: () => navigate("/states/edit/1"),
    },
  ];

  return (
    <>
      <MinimizablePageLayout
        moduleId="states-view"
        moduleName="View State"
        moduleRoute={location.pathname}
        onMinimize={handleMinimize}
        title="Viewing State"
        listPath="states"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        additionalFooterButtons={
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="gap-2 text-primary rounded-full cursor-pointer border-primary"
              onClick={() => setIsOptionModalOpen(true)}
            >
              <span className="hidden sm:inline">History</span>
            </Button>
          </div>
        }
        className="w-full"
      >
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="">
              <h3 className="font-medium mb-1">Code</h3>
              <Autocomplete
                data={STATE_DATA}
                value={selectedState}
                onChange={setSelectedState}
                placeholder="Select a state..."
                display="name"
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

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">State</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {stateData.State}
              </div>
            </div>

            <div className="">
              <h3 className="font-medium mb-1">Country</h3>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {stateData.Country_name}
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Default Switch */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Default</h3>
              <Switch
                checked={stateData.isDefault}
                disabled
                className={` data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Active</h3>
              <Switch
                checked={stateData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Draft</h3>
              <Switch
                checked={stateData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">
                {stateData.isDeleted ? "Restore" : "Delete"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={stateData.isDeleted}
                className="disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {stateData.isDeleted ? (
                  <Undo size={20} className="text-blue-500" />
                ) : (
                  <Trash2 size={20} className="text-red-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Row 4 - Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(stateData.createdAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(stateData.updatedAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(stateData.draftedAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(stateData.deletedAt)}
              </p>
            </div>
          </div>
        </div>
      </MinimizablePageLayout>

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
              State History
            </span>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <HistoryDataTable columnData={mockHistoryData} />
        </Modal.Body>
      </Modal>
    </>
  );
}
