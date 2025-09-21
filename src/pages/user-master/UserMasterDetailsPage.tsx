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
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError, toastSuccess } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import { usePermission } from "@/hooks/usePermissions";
import type { UserMasterData } from "@/types/userMaster.types";
import { mockUserMasterData } from "@/mockData/userMaster-mockdata";

const MOCK_USERS = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com" },
  { id: "4", name: "Sarah Wilson", email: "sarah@example.com" },
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

const USER_DATA = MOCK_USERS.map((user) => user.name);

export default function UserMasterDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("John Doe");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  // Permission checks
  const canCreate: boolean = usePermission("userMaster", "create");
  const canView: boolean = usePermission("userMaster", "view");
  const canEdit: boolean = usePermission("userMaster", "edit");
  const canDelete: boolean = usePermission("userMaster", "delete");

  // Field-level permissions
  const name: boolean = usePermission("userMaster", "view", "name");
  const mobileNumber: boolean = usePermission(
    "userMaster",
    "view",
    "mobileNumber"
  );
  const email: boolean = usePermission("userMaster", "view", "email");
  const password: boolean = usePermission("userMaster", "view", "password");
  const confirmPassword: boolean = usePermission(
    "userMaster",
    "view",
    "confirmPassword"
  );
  const otp: boolean = usePermission("userMaster", "view", "otp");
  const facebook: boolean = usePermission("userMaster", "view", "facebook");
  const linkedin: boolean = usePermission("userMaster", "view", "linkedin");
  const instagram: boolean = usePermission("userMaster", "view", "instagram");

  const canPdf: boolean = usePermission("userMaster", "pdf");
  const canPrint: boolean = usePermission("userMaster", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  const userData: UserMasterData = mockUserMasterData[0] || {
    name: selectedUser,
    mobileNumber: "+1234567890",
    countryCode: "US",
    email:
      MOCK_USERS.find((u) => u.name === selectedUser)?.email ||
      "john@example.com",
    password: "password123",
    confirmPassword: "password123",
    otp: "123456",
    facebook: "https://facebook.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
    code: "USER001",
    state: "California",
    country: "United States",
    userType: "admin",
    status: "Active",
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

  const handlePrintUserMaster = (userData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "User Master Details",
        data: [userData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "User Name",
          mobileNumber: "Mobile Number",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          otp: "OTP",
          facebook: "Facebook",
          linkedin: "LinkedIn",
          instagram: "Instagram",
          code: "Code",
          state: "State",
          country: "Country",
          userType: "User Type",
          status: "Status",
          isDefault: "Default User",
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
      setTimeout(() => handlePrintUserMaster(userData), 100);
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
      console.log("userData on pdf click", userData);
      const blob = await pdf(
        <GenericPDF
          data={[userData]}
          title="User Master Details"
          subtitle="User Master Report"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "user-master-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleDeleteRestore = () => {
    if (userData.isDeleted) {
      toastSuccess("User Master restored successfully!");
    } else {
      toastSuccess("User Master deleted successfully!");
    }
    console.log(userData.isDeleted ? "Restoring..." : "Deleting...");
  };

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

  return (
    <div className="relative w-full">
      {/* Container with full height minus external footer (80px assumed) */}
      <div className="flex flex-col h-[82vh] overflow-hidden border rounded shadow bg-white dark:bg-gray-800 ">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <VideoModal src={video} header={"Rapid ERP Video"} />
            <h1 className="text-xl font-bold text-primary">
              Viewing User Master
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Button
                variant="outline"
                className="gap-2 text-primary rounded-full border-primary"
                onClick={() => navigate("/user-master")}
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Row 1: Name, Mobile Number, Email */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {name && (
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Name</h3>
                <Autocomplete
                  data={USER_DATA}
                  value={selectedUser}
                  onChange={setSelectedUser}
                  placeholder="Select a user..."
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
            )}

            {mobileNumber && (
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Mobile Number</h3>
                <div className="w-full py-2 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {userData.mobileNumber}
                </div>
              </div>
            )}

            {email && (
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Email</h3>
                <div className="w-full py-2 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {userData.email}
                </div>
              </div>
            )}

            <div></div>
          </div>

          {/* Row 2: Password, Confirm Password, OTP */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {password && (
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Password</h3>
                <div className="w-full py-2 text-gray-700 dark:text-gray-300">
                  ••••••••
                </div>
              </div>
            )}

            {confirmPassword && (
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Confirm Password</h3>
                <div className="w-full py-2 text-gray-700 dark:text-gray-300">
                  ••••••••
                </div>
              </div>
            )}

            {otp && (
              <div className="space-y-2">
                <h3 className="font-medium mb-1">OTP</h3>
                <div className="w-full py-2 text-gray-700 dark:text-gray-300">
                  {userData.otp}
                </div>
              </div>
            )}

            <div></div>
          </div>

          {/* Row 3: Social Media Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {facebook && (
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Facebook</h3>
                <div className="w-full py-2 text-gray-700 dark:text-gray-300">
                  {userData.facebook}
                </div>
              </div>
            )}

            {linkedin && (
              <div className="space-y-2">
                <h3 className="font-medium mb-1">LinkedIn</h3>
                <div className="w-full py-2 text-gray-700 dark:text-gray-300">
                  {userData.linkedin}
                </div>
              </div>
            )}

            {instagram && (
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Instagram</h3>
                <div className="w-full py-2 text-gray-700 dark:text-gray-300">
                  {userData.instagram}
                </div>
              </div>
            )}

            <div></div>
          </div>

          {/* Row 4: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Default Switch */}
            <div className="md:col-span-1">
              <h3 className="font-medium mb-1">Default</h3>
              <Switch
                checked={userData.isDefault}
                disabled
                className={` data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="md:col-span-1">
              <h3 className="font-medium mb-1">Active</h3>
              <Switch
                checked={userData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="md:col-span-1">
              <h3 className="font-medium mb-1">Draft</h3>
              <Switch
                checked={userData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            {canDelete && (
              <div className="md:col-span-1">
                <h3 className="font-medium mb-1">
                  {userData.isDeleted ? "Restore" : "Delete"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDeleteRestore}
                  disabled={userData.isDeleted}
                  className="disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  {userData.isDeleted ? (
                    <Undo size={20} className="text-blue-500" />
                  ) : (
                    <Trash2 size={20} className="text-red-600" />
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Row 5 - Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Created</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(userData.createdAt)}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(userData.updatedAt)}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(userData.draftedAt)}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(userData.deletedAt)}
              </p>
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
              {canPdf && (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={pdfChecked}
                    className="data-[state=checked]:bg-blue-400"
                    onCheckedChange={handlePDFSwitchChange}
                  />
                  <span className="dark:text-gray-200">PDF</span>
                </div>
              )}
              {canPrint && (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={printEnabled}
                    onCheckedChange={handleSwitchChange}
                    className="data-[state=checked]:bg-blue-400"
                  />
                  <span className="dark:text-gray-200">Print</span>
                </div>
              )}
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
              User Master History
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
