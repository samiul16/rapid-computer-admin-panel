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
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import PDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";

const MOCK_CITIES = [
  { code: "NYC", name: "New York", flag: "🗽" },
  { code: "LON", name: "London", flag: "🎡" },
  { code: "DXB", name: "Dubai", flag: "🏙️" },
  { code: "DEL", name: "Delhi", flag: "🕌" },
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

const CITIES_DATA = MOCK_CITIES.map((item) => item.code);

const CitiesDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("NYC");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  let cityData = {
    code: selectedCity,
    country: "United States",
    state: "New York",

    title: MOCK_CITIES.find((c) => c.code === selectedCity)?.name || "New York",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    flag: "https://flagcdn.com/us.svg",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  };

  // const formatDate = (date: string | null) => {
  //   if (!date) return "--/--/----";
  //   const d = new Date(date);
  //   const day = d.getDate();
  //   const month = d.toLocaleString("default", { month: "short" });
  //   const year = d.getFullYear();
  //   return `${day} ${month} ${year}`;
  // };

  const inputRef = useRef<HTMLInputElement>(null);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  //   setOpen(true); // Ensure dropdown stays open when typing
  // };

  // const handleSelect = (value: string) => {
  //   const country = MOCK_CITIES.find((c) => c.code === value);
  //   setSelectedCity(country?.code || "");
  //   setSearchTerm(""); // Clear search term
  //   setOpen(false);
  // };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      cityData = {
        code: selectedCity,
        country: "",
        state: "",
        title: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        flag: "",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  // const handlePrint = () => {
  //   window.print();
  //   setPrintEnabled(false); // Reset switch after printing
  // };

  const handlePrintCountry = (cityData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "City Report",
        data: cityData,
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
      setTimeout(() => handlePrintCountry(cityData), 100);
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
      console.log("cityData on pdf click", cityData);
      const blob = await pdf(
        <PDF
          data={[cityData]}
          title="City Details"
          subtitle="City Information Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "countries-details.pdf";
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
    console.log(cityData.isDeleted ? "Restoring..." : "Deleting...");

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
        title={t("button.viewingCity")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        onListClick={() => navigate("/cities")}
        listText="List"
        listPath="/cities"
        popoverOptions={[
          {
            label: "Create",
            onClick: () => navigate("/cities/create"),
          },
          {
            label: "Edit",
            onClick: () => navigate("/cities/edit/1"),
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
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Code</h3>
            <Autocomplete
              data={CITIES_DATA}
              value={selectedCity}
              onChange={setSelectedCity}
              placeholder="Select a country..."
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

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">City</h3>
            </div>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {cityData.title}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">State</h3>
            </div>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {cityData.state}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">Country</h3>
            </div>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {cityData.country}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Default Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Default</h3>
            <Switch
              checked={cityData.isDefault}
              disabled
              className={` data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Active Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Active</h3>
            <Switch
              checked={cityData.isActive}
              disabled
              className={`data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Draft Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Draft</h3>
            <Switch
              checked={cityData.isDraft}
              disabled
              className={`data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Delete/Restore Button */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">
              {cityData.isDeleted ? "Restore" : "Delete"}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteRestore}
              disabled={cityData.isDeleted}
              className="disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {cityData.isDeleted ? (
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
              {getRelativeTime(cityData.createdAt)}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Updated</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(cityData.updatedAt)}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Drafted</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(cityData.draftedAt)}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Deleted</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(cityData.deletedAt)}
            </p>
          </div>
        </div>
      </PageLayout>

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
              Country History
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
};

export default CitiesDetails;
