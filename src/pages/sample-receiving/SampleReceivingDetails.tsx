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

type SampleReceivingData = {
  branch: string;
  receivingNo: string;
  clientName: string;
  clientReference: string;
  typeOfSample: string;
  requiredTests: string;
  numberOfSample: number;
  section: string;
  deliveredBy: string;
  receivedBy: string;
  receivingDate: string; // Format: "YYYY-MM-DD"
  receivingTime: string; // Format: "HH:mm"
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: SampleReceivingData = {
  branch: "Main Branch",
  receivingNo: "SR-001",
  clientName: "ABC Laboratories",
  clientReference: "REF-2024-001",
  typeOfSample: "Blood Sample",
  requiredTests: "CBC, Blood Sugar",
  numberOfSample: 5,
  section: "Hematology",
  deliveredBy: "John Smith",
  receivedBy: "Dr. Sarah Johnson",
  receivingDate: "2024-01-15",
  receivingTime: "10:30",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Receiving No options for autocomplete
const receivingNos = [
  "SR-001",
  "SR-002",
  "SR-003",
  "SR-004",
  "SR-005",
  "SR-006",
  "SR-007",
  "SR-008",
  "SR-009",
  "SR-010",
  "SR-011",
  "SR-012",
  "SR-013",
  "SR-014",
  "SR-015",
  "SR-016",
  "SR-017",
  "SR-018",
  "SR-019",
  "SR-020",
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

export default function SampleReceivingDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedReceivingNo, setSelectedReceivingNo] = useState("SR-001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("sampleReceiving", "create");
  const canView: boolean = usePermission("sampleReceiving", "view");
  const canEdit: boolean = usePermission("sampleReceiving", "edit");
  const canDelete: boolean = usePermission("sampleReceiving", "delete");
  const canExport: boolean = usePermission("sampleReceiving", "export");
  const canPdf: boolean = usePermission("sampleReceiving", "pdf");
  const canPrint: boolean = usePermission("sampleReceiving", "print");
  const canSeeHistory: boolean = usePermission("sampleReceiving", "history");

  // Field-level permissions
  const canViewBranch: boolean = usePermission(
    "sampleReceiving",
    "view",
    "branch"
  );
  const canViewReceivingNo: boolean = usePermission(
    "sampleReceiving",
    "view",
    "receivingNo"
  );
  const canViewClientName: boolean = usePermission(
    "sampleReceiving",
    "view",
    "clientName"
  );
  const canViewClientReference: boolean = usePermission(
    "sampleReceiving",
    "view",
    "clientReference"
  );
  const canViewTypeOfSample: boolean = usePermission(
    "sampleReceiving",
    "view",
    "typeOfSample"
  );
  const canViewRequiredTests: boolean = usePermission(
    "sampleReceiving",
    "view",
    "requiredTests"
  );
  const canViewNumberOfSample: boolean = usePermission(
    "sampleReceiving",
    "view",
    "numberOfSample"
  );
  const canViewSection: boolean = usePermission(
    "sampleReceiving",
    "view",
    "section"
  );
  const canViewDeliveredBy: boolean = usePermission(
    "sampleReceiving",
    "view",
    "deliveredBy"
  );
  const canViewReceivedBy: boolean = usePermission(
    "sampleReceiving",
    "view",
    "receivedBy"
  );
  const canViewReceivingDate: boolean = usePermission(
    "sampleReceiving",
    "view",
    "receivingDate"
  );
  const canViewReceivingTime: boolean = usePermission(
    "sampleReceiving",
    "view",
    "receivingTime"
  );
  const canViewIsDefault: boolean = usePermission(
    "sampleReceiving",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "sampleReceiving",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "sampleReceiving",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "sampleReceiving",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get sample receiving data based on selected receiving number
  const getSampleReceivingData = (receivingNo: string): SampleReceivingData => {
    const sampleReceivingMap: Record<string, SampleReceivingData> = {
      "SR-001": {
        branch: "Main Branch",
        receivingNo: "SR-001",
        clientName: "ABC Laboratories",
        clientReference: "REF-2024-001",
        typeOfSample: "Blood Sample",
        requiredTests: "CBC, Blood Sugar",
        numberOfSample: 5,
        section: "Hematology",
        deliveredBy: "John Smith",
        receivedBy: "Dr. Sarah Johnson",
        receivingDate: "2024-01-15",
        receivingTime: "10:30",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "SR-002": {
        branch: "North Branch",
        receivingNo: "SR-002",
        clientName: "XYZ Medical Center",
        clientReference: "REF-2024-002",
        typeOfSample: "Urine Sample",
        requiredTests: "Urinalysis, Culture",
        numberOfSample: 3,
        section: "Microbiology",
        deliveredBy: "Mike Wilson",
        receivedBy: "Dr. Robert Chen",
        receivingDate: "2024-01-16",
        receivingTime: "09:15",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "SR-003": {
        branch: "South Branch",
        receivingNo: "SR-003",
        clientName: "City Hospital",
        clientReference: "REF-2024-003",
        typeOfSample: "Tissue Sample",
        requiredTests: "Histopathology",
        numberOfSample: 2,
        section: "Pathology",
        deliveredBy: "Lisa Brown",
        receivedBy: "Dr. David Miller",
        receivingDate: "2024-01-17",
        receivingTime: "16:20",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "SR-004": {
        branch: "East Branch",
        receivingNo: "SR-004",
        clientName: "Community Clinic",
        clientReference: "REF-2024-004",
        typeOfSample: "Swab Sample",
        requiredTests: "PCR Test",
        numberOfSample: 4,
        section: "Molecular Biology",
        deliveredBy: "Anna Davis",
        receivedBy: "Dr. Emily White",
        receivingDate: "2024-01-18",
        receivingTime: "12:00",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "SR-005": {
        branch: "West Branch",
        receivingNo: "SR-005",
        clientName: "Private Practice",
        clientReference: "REF-2024-005",
        typeOfSample: "Stool Sample",
        requiredTests: "Parasitology",
        numberOfSample: 1,
        section: "Parasitology",
        deliveredBy: "Tom Anderson",
        receivedBy: "Dr. Maria Garcia",
        receivingDate: "2024-01-19",
        receivingTime: "08:30",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-24T15:20:00Z"),
        deletedAt: new Date("2024-02-01T09:00:00Z"),
        isDeleted: true,
      },
      "SR-006": {
        branch: "Central Branch",
        receivingNo: "SR-006",
        clientName: "Research Institute",
        clientReference: "REF-2024-006",
        typeOfSample: "Serum Sample",
        requiredTests: "Biochemistry Panel",
        numberOfSample: 6,
        section: "Biochemistry",
        deliveredBy: "Peter Johnson",
        receivedBy: "Dr. James Wilson",
        receivingDate: "2024-01-20",
        receivingTime: "14:15",
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

    return sampleReceivingMap[receivingNo] || initialData;
  };

  const [sampleReceivingData, setSampleReceivingData] =
    useState<SampleReceivingData>(getSampleReceivingData(selectedReceivingNo));

  const inputRef = useRef<HTMLInputElement>(null);

  // Update sample receiving data when selection changes
  useEffect(() => {
    setSampleReceivingData(getSampleReceivingData(selectedReceivingNo));
  }, [selectedReceivingNo]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintSampleReceiving = (sampleReceivingData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Sample Receiving Details",
        data: [sampleReceivingData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          receivingNo: "Receiving No",
          clientName: "Client Name",
          clientReference: "Client Reference",
          typeOfSample: "Type of Sample",
          requiredTests: "Required Tests",
          numberOfSample: "Number of Sample",
          section: "Section",
          deliveredBy: "Delivered By",
          receivedBy: "Received By",
          receivingDate: "Receiving Date",
          receivingTime: "Receiving Time",
          isDefault: "Default Sample Receiving",
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
      console.log("sampleReceivingData on pdf click", sampleReceivingData);
      const blob = await pdf(
        <GenericPDF
          data={[sampleReceivingData]}
          title="Sample Receiving Details"
          subtitle="Sample Receiving Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample-receiving-details.pdf";
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
        title="Viewing Sample Receiving"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/sample-receiving")}
        listText="List"
        listPath="sample-receiving"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/sample-receiving/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/sample-receiving/edit/1"),
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
                  handlePrintSampleReceiving(sampleReceivingData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Receiving No, Branch, Client Name, Client Reference */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewReceivingNo && (
              <div className="mt-1">
                <Autocomplete
                  options={receivingNos}
                  value={selectedReceivingNo}
                  onValueChange={setSelectedReceivingNo}
                  placeholder="Select receiving number..."
                  displayKey="receivingNo"
                  valueKey="receivingNo"
                  searchKey="receivingNo"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Receiving No"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewBranch && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Branch</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.branch)}
                </div>
              </div>
            )}

            {canViewClientName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Client Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.clientName)}
                </div>
              </div>
            )}

            {canViewClientReference && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Client Reference
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.clientReference)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Type of Sample, Required Tests, Number of Sample, Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewTypeOfSample && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Type of Sample
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.typeOfSample)}
                </div>
              </div>
            )}

            {canViewRequiredTests && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Required Tests
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.requiredTests)}
                </div>
              </div>
            )}

            {canViewNumberOfSample && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Number of Sample
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.numberOfSample)}
                </div>
              </div>
            )}

            {canViewSection && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Section</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.section)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Delivered By, Received By, Receiving Date, Receiving Time */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewDeliveredBy && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Delivered By</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.deliveredBy)}
                </div>
              </div>
            )}

            {canViewReceivedBy && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Received By</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.receivedBy)}
                </div>
              </div>
            )}

            {canViewReceivingDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Receiving Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.receivingDate)}
                </div>
              </div>
            )}

            {canViewReceivingTime && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Receiving Time
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleReceivingData.receivingTime)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Default, Draft, Active, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {sampleReceivingData.isDefault ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
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
                  {sampleReceivingData.isDraft ? (
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
                  <span className="text-[15px] text-gray-600">Inactive</span>
                </div>
                <div className="">
                  {!sampleReceivingData.isActive ? (
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
                  {sampleReceivingData.isDeleted ? (
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
          created: getRelativeTime(sampleReceivingData.createdAt),
          updated: getRelativeTime(sampleReceivingData.updatedAt),
          drafted: getRelativeTime(sampleReceivingData.draftedAt),
          deleted: getRelativeTime(sampleReceivingData.deletedAt),
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
