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

type InspectionData = {
  vehicle: string;
  inspectionForm: string;
  addedFrom: string;
  fromDate: string;
  toDate: string;
  // Conditional fields based on inspection form
  dones: "Yes" | "No";
  passFail: "Pass" | "Fail";
  safetyScore: number;
  maintenanceNotes: string;
  tripRoute: string;
  annualRating: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: InspectionData = {
  vehicle: "Toyota Camry 2023",
  inspectionForm: "Safety Inspection",
  addedFrom: "John Doe",
  fromDate: "2024-01-15",
  toDate: "2024-01-20",
  dones: "No",
  passFail: "Pass",
  safetyScore: 8,
  maintenanceNotes: "",
  tripRoute: "",
  annualRating: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Inspection options for autocomplete
const inspectionOptions = [
  "Toyota Camry 2023 - Safety Inspection",
  "Honda Civic 2022 - Maintenance Check",
  "Ford F-150 2023 - Pre-Trip Inspection",
  "BMW X5 2023 - Annual Inspection",
  "Mercedes C-Class 2022 - Safety Compliance",
  "Audi A4 2023 - Luxury Vehicle Check",
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

export default function InspectionsDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(
    "Toyota Camry 2023 - Safety Inspection"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("inspections", "create");
  const canView: boolean = usePermission("inspections", "view");
  const canEdit: boolean = usePermission("inspections", "edit");
  const canDelete: boolean = usePermission("inspections", "delete");
  const canExport: boolean = usePermission("inspections", "export");
  const canPdf: boolean = usePermission("inspections", "pdf");
  const canPrint: boolean = usePermission("inspections", "print");
  const canSeeHistory: boolean = usePermission("inspections", "history");

  // Field-level permissions
  const canViewVehicle: boolean = usePermission(
    "inspections",
    "view",
    "vehicle"
  );
  const canViewInspectionForm: boolean = usePermission(
    "inspections",
    "view",
    "inspectionForm"
  );
  const canViewAddedFrom: boolean = usePermission(
    "inspections",
    "view",
    "addedFrom"
  );
  const canViewFromDate: boolean = usePermission(
    "inspections",
    "view",
    "fromDate"
  );
  const canViewToDate: boolean = usePermission("inspections", "view", "toDate");
  const canViewDones: boolean = usePermission("inspections", "view", "dones");
  const canViewPassFail: boolean = usePermission(
    "inspections",
    "view",
    "passFail"
  );
  const canViewSafetyScore: boolean = usePermission(
    "inspections",
    "view",
    "safetyScore"
  );
  const canViewMaintenanceNotes: boolean = usePermission(
    "inspections",
    "view",
    "maintenanceNotes"
  );
  const canViewTripRoute: boolean = usePermission(
    "inspections",
    "view",
    "tripRoute"
  );
  const canViewAnnualRating: boolean = usePermission(
    "inspections",
    "view",
    "annualRating"
  );
  const canViewIsDefault: boolean = usePermission(
    "inspections",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "inspections",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "inspections",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "inspections",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get inspection data based on selected inspection
  const getInspectionData = (inspectionName: string): InspectionData => {
    const inspectionMap: Record<string, InspectionData> = {
      "Toyota Camry 2023 - Safety Inspection": {
        vehicle: "Toyota Camry 2023",
        inspectionForm: "Safety Inspection",
        addedFrom: "John Doe",
        fromDate: "2024-01-15",
        toDate: "2024-01-20",
        dones: "No",
        passFail: "Pass",
        safetyScore: 8,
        maintenanceNotes: "",
        tripRoute: "",
        annualRating: "",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Honda Civic 2022 - Maintenance Check": {
        vehicle: "Honda Civic 2022",
        inspectionForm: "Maintenance Check",
        addedFrom: "Jane Smith",
        fromDate: "2024-01-16",
        toDate: "2024-01-21",
        dones: "Yes",
        passFail: "Pass",
        safetyScore: 0,
        maintenanceNotes: "Oil change, brake check completed",
        tripRoute: "",
        annualRating: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Ford F-150 2023 - Pre-Trip Inspection": {
        vehicle: "Ford F-150 2023",
        inspectionForm: "Pre-Trip Inspection",
        addedFrom: "Mike Johnson",
        fromDate: "2024-01-17",
        toDate: "2024-01-22",
        dones: "Yes",
        passFail: "Pass",
        safetyScore: 0,
        maintenanceNotes: "",
        tripRoute: "Route 66 to Chicago",
        annualRating: "",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "BMW X5 2023 - Annual Inspection": {
        vehicle: "BMW X5 2023",
        inspectionForm: "Annual Inspection",
        addedFrom: "Sarah Wilson",
        fromDate: "2024-01-18",
        toDate: "2024-01-25",
        dones: "Yes",
        passFail: "Pass",
        safetyScore: 0,
        maintenanceNotes: "",
        tripRoute: "",
        annualRating: "Excellent",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Mercedes C-Class 2022 - Safety Compliance": {
        vehicle: "Mercedes C-Class 2022",
        inspectionForm: "Safety Compliance",
        addedFrom: "David Brown",
        fromDate: "2024-01-19",
        toDate: "2024-01-24",
        dones: "No",
        passFail: "Fail",
        safetyScore: 0,
        maintenanceNotes: "",
        tripRoute: "",
        annualRating: "",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-24T15:20:00Z"),
        deletedAt: new Date("2024-02-01T09:00:00Z"),
        isDeleted: true,
      },
      "Audi A4 2023 - Luxury Vehicle Check": {
        vehicle: "Audi A4 2023",
        inspectionForm: "Luxury Vehicle Check",
        addedFrom: "Lisa Davis",
        fromDate: "20244-01-20",
        toDate: "2024-01-25",
        dones: "Yes",
        passFail: "Pass",
        safetyScore: 0,
        maintenanceNotes: "",
        tripRoute: "",
        annualRating: "",
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

    return inspectionMap[inspectionName] || initialData;
  };

  const [inspectionData, setInspectionData] = useState<InspectionData>(
    getInspectionData(selectedInspection)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update inspection data when selection changes
  useEffect(() => {
    setInspectionData(getInspectionData(selectedInspection));
  }, [selectedInspection]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintInspections = (inspectionData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Inspection Details",
        data: [inspectionData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          vehicle: "Vehicle",
          inspectionForm: "Inspection Form",
          addedFrom: "Added From",
          fromDate: "From Date",
          toDate: "To Date",
          dones: "Dones",
          passFail: "Pass/Fail",
          safetyScore: "Safety Score",
          maintenanceNotes: "Maintenance Notes",
          tripRoute: "Trip Route",
          annualRating: "Annual Rating",
          isDefault: "Default Inspection",
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
      console.log("inspectionData on pdf click", inspectionData);
      const blob = await pdf(
        <GenericPDF
          data={[inspectionData]}
          title="Inspection Details"
          subtitle="Inspection Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "inspection-details.pdf";
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
        title="Viewing Inspection"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/inspections")}
        listText="List"
        listPath="inspections"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/inspections/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/inspections/edit/1"),
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
                  handlePrintInspections(inspectionData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Vehicle, Inspection Form, Added From, From Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewVehicle && (
              <div className="mt-1">
                <Autocomplete
                  options={inspectionOptions}
                  value={selectedInspection}
                  onValueChange={setSelectedInspection}
                  placeholder=" "
                  displayKey="inspection"
                  valueKey="inspection"
                  searchKey="inspection"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Inspection"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewInspectionForm && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Inspection Form
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.inspectionForm)}
                </div>
              </div>
            )}

            {canViewAddedFrom && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Added From</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.addedFrom)}
                </div>
              </div>
            )}

            {canViewFromDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">From Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.fromDate)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: To Date, Dones, Pass/Fail, Safety Score */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewToDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">To Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.toDate)}
                </div>
              </div>
            )}

            {canViewDones && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Dones</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.dones)}
                </div>
              </div>
            )}

            {canViewPassFail && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Pass/Fail</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.passFail)}
                </div>
              </div>
            )}

            {canViewSafetyScore && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Safety Score</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.safetyScore)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Maintenance Notes, Trip Route, Annual Rating, Default */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewMaintenanceNotes && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Maintenance Notes
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.maintenanceNotes)}
                </div>
              </div>
            )}

            {canViewTripRoute && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Trip Route</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.tripRoute)}
                </div>
              </div>
            )}

            {canViewAnnualRating && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Annual Rating
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(inspectionData.annualRating)}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {inspectionData.isDefault ? (
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

          {/* Row 4: Draft, Active, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {inspectionData.isDraft ? (
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
                  {inspectionData.isActive ? (
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
                  {inspectionData.isDeleted ? (
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
          created: getRelativeTime(inspectionData.createdAt),
          updated: getRelativeTime(inspectionData.updatedAt),
          drafted: getRelativeTime(inspectionData.draftedAt),
          deleted: getRelativeTime(inspectionData.deletedAt),
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
