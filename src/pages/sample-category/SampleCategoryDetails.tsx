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

type SampleCategoryData = {
  name: string;
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

const initialData: SampleCategoryData = {
  name: "Food Samples",
  description: "Various food samples for testing and quality control",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Name options for autocomplete
const names = [
  "Food Samples",
  "Beverage Samples",
  "Dessert Samples",
  "Appetizer Samples",
  "Main Course Samples",
  "Salad Samples",
  "Bakery Samples",
  "Grilled Samples",
  "Pizza Samples",
  "Sushi Samples",
  "Coffee Samples",
  "Seasonal Samples",
  "Fast Food Samples",
  "Catering Samples",
  "Wine Samples",
  "Takeaway Samples",
  "VIP Samples",
  "Outdoor Dining Samples",
  "Buffet Samples",
  "Private Event Samples",
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

export default function SampleCategoryDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("Food Samples");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("sampleCategory", "create");
  const canView: boolean = usePermission("sampleCategory", "view");
  const canEdit: boolean = usePermission("sampleCategory", "edit");
  const canDelete: boolean = usePermission("sampleCategory", "delete");
  const canExport: boolean = usePermission("sampleCategory", "export");
  const canPdf: boolean = usePermission("sampleCategory", "pdf");
  const canPrint: boolean = usePermission("sampleCategory", "print");
  const canSeeHistory: boolean = usePermission("sampleCategory", "history");

  // Field-level permissions
  const canViewName: boolean = usePermission("sampleCategory", "view", "name");
  const canViewDescription: boolean = usePermission(
    "sampleCategory",
    "view",
    "description"
  );
  const canViewIsDefault: boolean = usePermission(
    "sampleCategory",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "sampleCategory",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "sampleCategory",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "sampleCategory",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get sample category data based on selected name
  const getSampleCategoryData = (name: string): SampleCategoryData => {
    const sampleCategoryMap: Record<string, SampleCategoryData> = {
      "Food Samples": {
        name: "Food Samples",
        description: "Various food samples for testing and quality control",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-05-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-15T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Beverage Samples": {
        name: "Beverage Samples",
        description: "Drink samples including soft drinks and juices",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-06-20T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-02-10T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Dessert Samples": {
        name: "Dessert Samples",
        description: "Sweet treats and dessert items for sampling",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2023-07-10T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-03-05T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Appetizer Samples": {
        name: "Appetizer Samples",
        description: "Starter dishes and appetizers for customer sampling",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2023-08-25T12:00:00Z"),
        draftedAt: new Date("2024-04-01T10:00:00Z"),
        updatedAt: new Date("2024-04-01T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Main Course Samples": {
        name: "Main Course Samples",
        description: "Primary meal samples for menu testing",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-09-15T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T15:20:00Z"),
        deletedAt: new Date("2024-05-01T09:00:00Z"),
        isDeleted: true,
      },
      "Salad Samples": {
        name: "Salad Samples",
        description: "Fresh salad and healthy food samples",
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

    return sampleCategoryMap[name] || initialData;
  };

  const [sampleCategoryData, setSampleCategoryData] =
    useState<SampleCategoryData>(getSampleCategoryData(selectedName));

  const inputRef = useRef<HTMLInputElement>(null);

  // Update sample category data when selection changes
  useEffect(() => {
    setSampleCategoryData(getSampleCategoryData(selectedName));
  }, [selectedName]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintSampleCategory = (sampleCategoryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Sample Category Details",
        data: [sampleCategoryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          description: "Description",
          isDefault: "Default Sample Category",
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
      console.log("sampleCategoryData on pdf click", sampleCategoryData);
      const blob = await pdf(
        <GenericPDF
          data={[sampleCategoryData]}
          title="Sample Category Details"
          subtitle="Sample Category Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample-category-details.pdf";
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
        title="Viewing Sample Category"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/sample-category")}
        listText="List"
        listPath="sample-category"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/sample-category/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/sample-category/edit/1"),
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
                  handlePrintSampleCategory(sampleCategoryData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewName && (
              <div className="mt-1">
                <Autocomplete
                  options={names}
                  value={selectedName}
                  onValueChange={setSelectedName}
                  placeholder="Select sample category..."
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(sampleCategoryData.description)}
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
                    {sampleCategoryData.isDefault ? (
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
                  {sampleCategoryData.isDraft ? (
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

          {/* Row 2 - Additional Sample Category Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Inactive</span>
                </div>
                <div className="">
                  {!sampleCategoryData.isActive ? (
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
                  {sampleCategoryData.isDeleted ? (
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
          created: getRelativeTime(sampleCategoryData.createdAt),
          updated: getRelativeTime(sampleCategoryData.updatedAt),
          drafted: getRelativeTime(sampleCategoryData.draftedAt),
          deleted: getRelativeTime(sampleCategoryData.deletedAt),
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
