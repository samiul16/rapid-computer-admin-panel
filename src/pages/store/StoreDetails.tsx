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

// Define Store interface to ensure type consistency
interface Store {
  id: string;
  storeCode: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
  manager: string;
  capacity: number;
  storeType: string;
  storeImage: string;
  description: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

const MOCK_STORES = [
  { storeCode: "STR001", name: "Downtown Restaurant" },
  { storeCode: "STR002", name: "Mall Food Court" },
  { storeCode: "STR003", name: "Airport Terminal" },
  { storeCode: "STR004", name: "University Campus" },
  { storeCode: "STR005", name: "Shopping Center" },
  { storeCode: "STR006", name: "Business District" },
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

const STORE_CODES = MOCK_STORES.map((store) => store.storeCode);

export default function StoreDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState("STR001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const storeData: Store = {
    id: "1",
    storeCode: selectedStore,
    name:
      MOCK_STORES.find((s) => s.storeCode === selectedStore)?.name ||
      "Downtown Restaurant",
    phone: "+1-555-0101",
    email: "downtown@restaurant.com",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    country: "USA",
    postCode: "10001",
    manager: "John Smith",
    capacity: 150,
    storeType: "Fine Dining",
    storeImage: "",
    description: "Premium downtown restaurant with elegant atmosphere",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2023-05-15T10:30:00Z"),
    updatedAt: new Date("2023-11-20T14:45:00Z"),
    draftedAt: new Date("2025-05-20T14:45:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintStore = (storeData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Store Details",
        data: [storeData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          storeCode: "Store Code",
          name: "Store Name",
          phone: "Phone",
          email: "Email",
          address: "Address",
          city: "City",
          state: "State",
          country: "Country",
          postCode: "Post Code",
          manager: "Manager",
          capacity: "Capacity",
          storeType: "Store Type",
          storeImage: "Store Image",
          description: "Description",
          isDefault: "Default Store",
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
      setTimeout(() => handlePrintStore(storeData), 100);
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
      console.log("storeData on pdf click", storeData);
      const blob = await pdf(
        <GenericPDF
          data={[storeData]}
          title="Store Details"
          subtitle="Store Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "store-details.pdf";
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
    console.log(storeData.isDeleted ? "Restoring..." : "Deleting...");

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

  // Generate initials for item photo
  const getItemInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getInitialsColor = (code: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
    ];
    const index = parseInt(code.slice(-1)) % colors.length;
    return colors[index];
  };

  return (
    <div className="relative w-full">
      {/* Container with full height minus external footer (80px assumed) */}
      <div className="flex flex-col h-[82vh] overflow-hidden border rounded shadow bg-white dark:bg-gray-800 ">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <VideoModal src={video} header={"Rapid ERP Video"} />
            <h1 className="text-xl font-bold text-primary">
              {t("form.viewingStore")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/store")}
                listText="List"
                listPath="/store"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/store/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/store/1/edit"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Row 1: Store Code, Store Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <h3 className="font-medium mb-1">{t("form.storeCode")}</h3>
              <Autocomplete
                data={STORE_CODES}
                value={selectedStore}
                onChange={setSelectedStore}
                placeholder="Select a store..."
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
                <h3 className="font-medium">Store Name</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.name}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Phone</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.phone}
              </div>
            </div>
          </div>

          {/* Row 2: Phone, Email, Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Email</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.email}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Address</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.address}
              </div>
            </div>
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">City</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.city}
              </div>
            </div>
          </div>

          {/* Row 3: City, State, Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">State</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.state}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Country</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.country}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Capacity</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.capacity}
              </div>
            </div>
          </div>

          {/* Row 5: Store Type, Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Store Type</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.storeType}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Description</h3>
              </div>
              <div className="w-full py-1 text-gray-500 font-normal text-md">
                {storeData.description}
              </div>
            </div>
          </div>

          {/* Row 6: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Default Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.default")}</h3>
              <Switch
                checked={storeData.isDefault}
                disabled
                className={` data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <Switch
                checked={storeData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <Switch
                checked={storeData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="">
              <h3 className="font-medium mb-1">
                {storeData.isDeleted ? t("button.restore") : t("button.delete")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={storeData.isDeleted}
                className="disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {storeData.isDeleted ? (
                  <Undo size={20} className="text-blue-500" />
                ) : (
                  <Trash2 size={20} className="text-red-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Row 7: Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="">
              <h3 className="font-medium mb-1">Created</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(storeData.createdAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(storeData.updatedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(storeData.draftedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(storeData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Store Photo */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-medium mb-2 text-center">Store Image</h3>
            <div className="w-32 h-20 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-110 transition duration-300">
              {storeData.storeImage ? (
                <img
                  src={storeData.storeImage}
                  alt="Store Image"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-white font-bold text-lg ${getInitialsColor(
                          storeData.storeCode
                        )}">
                          ${getItemInitials(storeData.name)}
                        </div>
                      `;
                    }
                  }}
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center text-white font-bold text-lg ${getInitialsColor(
                    storeData.storeCode
                  )}`}
                >
                  {getItemInitials(storeData.name)}
                </div>
              )}
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
              {t("form.storeHistory")}
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
