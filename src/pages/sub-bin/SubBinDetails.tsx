/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import video from "@/assets/videos/test.mp4";
import PageLayout from "@/components/common/PageLayout";
import PDF from "@/components/common/pdf";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { mockBinHistoryData } from "@/mockData/bin-history-mockdata copy";
import { Autocomplete, Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Trash2, Undo } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import HistoryDataTable from "./HistoryDataTable";

const MOCK_DATA = [
  {
    name: "Sub Bin A1",
    code: "SB-A1",
    description: "Main storage bin near entrance",

    isDefault: false,
    isActive: true,
    isDraft: false,

    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
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

const MOCK_DATA_SELECT = MOCK_DATA.map((item) => item.code);

export default function SubBinDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [initialSelectedValue, setInitialSelectedValue] = useState("BN-A1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  let viewData = {
    name: "Sub Bin A1",
    code: "SB-A1",
    description: "Main storage bin near entrance",

    isDefault: false,
    isActive: true,
    isDraft: false,

    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      viewData = {
        name: "",
        code: "",
        description: "",

        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        draftedAt: null,
        deletedAt: null,
      };
    }
  }, []);

  const handlePrintCountry = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Sub Bin Report",
        data: printData,
        fieldLabels: {
          name: "Name",
          code: "Code",
          description: "Description",
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
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintCountry(viewData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("viewData on pdf click", viewData);
      const blob = await pdf(
        <PDF
          data={[viewData]}
          title="Sub Bin Details"
          subtitle="Sub Bin Information Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sub-bin-details.pdf";
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
    console.log(viewData.isDeleted ? "Restoring..." : "Deleting...");

  const getRelativeTime = (dateString: string | null) => {
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
    <>
      <PageLayout
        title={t("button.viewingSubBin")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        onListClick={() => navigate("/sub-bin")}
        listText="List"
        listPath="/sub-bin"
        popoverOptions={[
          {
            label: "Create",
            onClick: () => navigate("/sub-bin/create"),
          },
          {
            label: "Edit",
            onClick: () => navigate("/sub-bin/edit/1"),
          },
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        onHistoryClick={() => setIsOptionModalOpen(true)}
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <h3 className="font-medium mb-1">Code</h3>
            <Autocomplete
              data={MOCK_DATA_SELECT}
              value={initialSelectedValue}
              onChange={setInitialSelectedValue}
              placeholder="Select a Code..."
              display="code"
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
          <div className="md:col-span-4">
            <h3 className="font-medium mb-1">Sub Bin Name</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {viewData.name}
            </div>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-medium mb-1">Description</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {viewData.description}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Default Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Default</h3>
            <Switch
              checked={viewData.isDefault}
              disabled
              className={` data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Active Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Active</h3>
            <Switch
              checked={viewData.isActive}
              disabled
              className={`data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Draft Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Draft</h3>
            <Switch
              checked={viewData.isDraft}
              disabled
              className={`data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Delete/Restore Button */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">
              {viewData.isDeleted ? "Restore" : "Delete"}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteRestore}
              disabled={viewData.isDeleted}
              className="disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {viewData.isDeleted ? (
                <Undo size={20} className="text-blue-500" />
              ) : (
                <Trash2 size={20} className="text-red-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Created</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(viewData.createdAt?.toString() || "")}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Updated</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(viewData.updatedAt?.toString() || "")}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Drafted</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(viewData.draftedAt || "")}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Deleted</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(viewData.deletedAt || "")}
            </p>
          </div>
        </div>
      </PageLayout>

      {/* History Modal */}
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
              Sub Bin History
            </span>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <HistoryDataTable columnData={mockBinHistoryData} />
        </Modal.Body>
      </Modal>
    </>
  );
}
