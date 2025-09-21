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

type OnboardingData = {
  selectStaff: string;
  generalInformation: string;
  staffFullName: string;
  address: string;
  assetAllocation: string;
  typeOfTraining: string;
  trainingProgram: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: OnboardingData = {
  selectStaff: "John Doe",
  generalInformation: "New hire onboarding",
  staffFullName: "John Michael Doe",
  address: "123 Main St, City, State 12345",
  assetAllocation: "Laptop, Phone, ID Card",
  typeOfTraining: "Technical Training",
  trainingProgram: "Full Stack Development",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Onboarding options for autocomplete
const onboardingOptions = [
  "John Doe - New hire onboarding",
  "Jane Smith - Department transfer",
  "Mike Johnson - Promotion onboarding",
  "Sarah Wilson - Intern onboarding",
  "David Brown - Contractor onboarding",
  "Lisa Davis - Returning employee",
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

export default function OnboardingDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedOnboarding, setSelectedOnboarding] = useState(
    "John Doe - New hire onboarding"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("onboarding", "create");
  const canView: boolean = usePermission("onboarding", "view");
  const canEdit: boolean = usePermission("onboarding", "edit");
  const canDelete: boolean = usePermission("onboarding", "delete");
  const canExport: boolean = usePermission("onboarding", "export");
  const canPdf: boolean = usePermission("onboarding", "pdf");
  const canPrint: boolean = usePermission("onboarding", "print");
  const canSeeHistory: boolean = usePermission("onboarding", "history");

  // Field-level permissions
  const canViewSelectStaff: boolean = usePermission(
    "onboarding",
    "view",
    "selectStaff"
  );
  const canViewGeneralInformation: boolean = usePermission(
    "onboarding",
    "view",
    "generalInformation"
  );
  const canViewStaffFullName: boolean = usePermission(
    "onboarding",
    "view",
    "staffFullName"
  );
  const canViewAddress: boolean = usePermission(
    "onboarding",
    "view",
    "address"
  );
  const canViewAssetAllocation: boolean = usePermission(
    "onboarding",
    "view",
    "assetAllocation"
  );
  const canViewTypeOfTraining: boolean = usePermission(
    "onboarding",
    "view",
    "typeOfTraining"
  );
  const canViewTrainingProgram: boolean = usePermission(
    "onboarding",
    "view",
    "trainingProgram"
  );
  const canViewIsDefault: boolean = usePermission(
    "onboarding",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "onboarding",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "onboarding",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "onboarding",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get onboarding data based on selected onboarding
  const getOnboardingData = (onboardingName: string): OnboardingData => {
    const onboardingMap: Record<string, OnboardingData> = {
      "John Doe - New hire onboarding": {
        selectStaff: "John Doe",
        generalInformation: "New hire onboarding",
        staffFullName: "John Michael Doe",
        address: "123 Main St, City, State 12345",
        assetAllocation: "Laptop, Phone, ID Card",
        typeOfTraining: "Technical Training",
        trainingProgram: "Full Stack Development",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Jane Smith - Department transfer": {
        selectStaff: "Jane Smith",
        generalInformation: "Department transfer",
        staffFullName: "Jane Elizabeth Smith",
        address: "456 Oak Ave, Town, State 67890",
        assetAllocation: "Desktop, Headset, Badge",
        typeOfTraining: "Process Training",
        trainingProgram: "Customer Service Excellence",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Mike Johnson - Promotion onboarding": {
        selectStaff: "Mike Johnson",
        generalInformation: "Promotion onboarding",
        staffFullName: "Michael Robert Johnson",
        address: "789 Pine Rd, Village, State 11111",
        assetAllocation: "Laptop, Monitor, Keyboard",
        typeOfTraining: "Leadership Training",
        trainingProgram: "Management Skills",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Sarah Wilson - Intern onboarding": {
        selectStaff: "Sarah Wilson",
        generalInformation: "Intern onboarding",
        staffFullName: "Sarah Anne Wilson",
        address: "321 Elm St, Borough, State 22222",
        assetAllocation: "Tablet, Notebook, Pen",
        typeOfTraining: "Basic Training",
        trainingProgram: "Company Orientation",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "David Brown - Contractor onboarding": {
        selectStaff: "David Brown",
        generalInformation: "Contractor onboarding",
        staffFullName: "David Christopher Brown",
        address: "654 Maple Dr, County, State 33333",
        assetAllocation: "Temporary Badge, Access Card",
        typeOfTraining: "Security Training",
        trainingProgram: "Workplace Safety",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-24T15:20:00Z"),
        deletedAt: new Date("2024-02-01T09:00:00Z"),
        isDeleted: true,
      },
      "Lisa Davis - Returning employee": {
        selectStaff: "Lisa Davis",
        generalInformation: "Returning employee",
        staffFullName: "Lisa Marie Davis",
        address: "987 Cedar Ln, District, State 44444",
        assetAllocation: "Laptop, Phone, Reissued Badge",
        typeOfTraining: "Refresher Training",
        trainingProgram: "Updated Procedures",
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

    return onboardingMap[onboardingName] || initialData;
  };

  const [onboardingData, setOnboardingData] = useState<OnboardingData>(
    getOnboardingData(selectedOnboarding)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update onboarding data when selection changes
  useEffect(() => {
    setOnboardingData(getOnboardingData(selectedOnboarding));
  }, [selectedOnboarding]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintOnboardings = (onboardingData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Onboarding Details",
        data: [onboardingData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          selectStaff: "Select Staff",
          generalInformation: "General Information",
          staffFullName: "Staff Full Name",
          address: "Address",
          assetAllocation: "Asset Allocation",
          typeOfTraining: "Type of Training",
          trainingProgram: "Training Program",
          isDefault: "Default Onboarding",
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
      console.log("onboardingData on pdf click", onboardingData);
      const blob = await pdf(
        <GenericPDF
          data={[onboardingData]}
          title="Onboarding Details"
          subtitle="Onboarding Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "onboarding-details.pdf";
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
        title="Viewing Onboarding"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/onboarding")}
        listText="List"
        listPath="onboarding"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/onboarding/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/onboarding/edit/1"),
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
                  handlePrintOnboardings(onboardingData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Select Staff, General Information, Staff Full Name, Address */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewSelectStaff && (
              <div className="mt-1">
                <Autocomplete
                  options={onboardingOptions}
                  value={selectedOnboarding}
                  onValueChange={setSelectedOnboarding}
                  placeholder=" "
                  displayKey="onboarding"
                  valueKey="onboarding"
                  searchKey="onboarding"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Staff"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewGeneralInformation && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  General Information
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(onboardingData.generalInformation)}
                </div>
              </div>
            )}

            {canViewStaffFullName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Staff Full Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(onboardingData.staffFullName)}
                </div>
              </div>
            )}

            {canViewAddress && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Address</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(onboardingData.address)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Asset Allocation, Type of Training, Training Program */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewAssetAllocation && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Asset Allocation
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(onboardingData.assetAllocation)}
                </div>
              </div>
            )}

            {canViewTypeOfTraining && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Type of Training
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(onboardingData.typeOfTraining)}
                </div>
              </div>
            )}

            {canViewTrainingProgram && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Training Program
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(onboardingData.trainingProgram)}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {onboardingData.isDefault ? (
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

          {/* Row 3: Draft, Active, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {onboardingData.isDraft ? (
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
                  {onboardingData.isActive ? (
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
                  {onboardingData.isDeleted ? (
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
          created: getRelativeTime(onboardingData.createdAt),
          updated: getRelativeTime(onboardingData.updatedAt),
          drafted: getRelativeTime(onboardingData.draftedAt),
          deleted: getRelativeTime(onboardingData.deletedAt),
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
