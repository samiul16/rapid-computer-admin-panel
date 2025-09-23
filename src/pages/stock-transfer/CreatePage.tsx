/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Autocomplete } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { useNavigate } from "react-router-dom";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import DynamicInputTableList from "./dynamic-input-table/DynamicInputTableList";

// Define StockTransfer interface (renamed from OpeningStock)
interface StockTransfer {
  id: string;
  documentNumber: string;
  sourceBranch: string;
  destinationBranch: string;
  poNumber: string;
  documentDate: Date | string;
  remarks: string;
  amount: number;
  isActive: boolean;
  isDefault: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock branch data - memoized to prevent recreation
const MOCK_BRANCHES = [
  "Main Branch",
  "North Branch",
  "South Branch",
  "East Branch",
  "West Branch",
  "Central Branch",
  "Downtown Branch",
  "Suburban Branch",
  "Uptown Branch",
  "Riverside Branch",
  "Hillside Branch",
  "Lakeside Branch",
  "Garden Branch",
  "Plaza Branch",
  "Metro Branch",
  "Business District",
  "Airport Branch",
  "Mall Branch",
  "Harbor Branch",
  "Industrial Branch",
];

type Props = {
  isEdit?: boolean;
};

// Generate incremental document number - memoized function
const generateDocumentNumber = () => {
  const lastNumber = localStorage.getItem("lastStockTransferNumber") || "0";
  const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastStockTransferNumber", nextNumber);
  return `ST${nextNumber}`;
};

// Initial data factory function to prevent shared object references
const createInitialData = (): StockTransfer => ({
  id: "1",
  documentNumber: generateDocumentNumber(),
  sourceBranch: "",
  destinationBranch: "",
  poNumber: "",
  documentDate: new Date(),
  remarks: "",
  amount: 0,
  isActive: true,
  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
});

export default function StockTransferFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  // Refs for form elements
  const documentNumberInputRef = useRef<EditableInputRef>(null);
  const poNumberInputRef = useRef<EditableInputRef>(null);
  const remarksInputRef = useRef<EditableInputRef>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  // Print and PDF states
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Date picker state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state - use factory function to prevent shared references
  const [formData, setFormData] = useState<StockTransfer>(() =>
    createInitialData()
  );

  // Memoize the initial data for edit mode
  const initialData = useMemo(() => createInitialData(), []);

  // Memoize branch data to prevent unnecessary re-renders
  const memoizedBranches = useMemo(() => [...MOCK_BRANCHES], []);

  // Update translation data when remarks change - stabilized with useCallback
  const updateTranslations = useCallback((remarks: string) => {
    setTranslations([
      { id: 1, english: remarks || "", arabic: "", bangla: "" },
    ]);
  }, []);

  useEffect(() => {
    updateTranslations(formData.remarks);
  }, [formData.remarks, updateTranslations]);

  // Memoized focus navigation function
  const focusNextInput = useCallback((currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "documentNumber": {
        // Focus on source branch dropdown
        const sourceBranchInput = document.querySelector(
          'input[placeholder="Select source branch..."]'
        ) as HTMLInputElement;
        sourceBranchInput?.focus();
        break;
      }
      case "sourceBranch": {
        // Focus on destination branch dropdown
        const destBranchInput = document.querySelector(
          'input[placeholder="Select destination branch..."]'
        ) as HTMLInputElement;
        destBranchInput?.focus();
        break;
      }
      case "destinationBranch":
        poNumberInputRef.current?.focus();
        break;
      case "poNumber": {
        // Focus on the document date picker trigger
        const datePickerTrigger = document.querySelector(
          '[data-testid="date-picker-trigger"]'
        ) as HTMLButtonElement;
        datePickerTrigger?.focus();
        break;
      }
      case "documentDate":
        remarksInputRef.current?.focus();
        break;
      case "remarks":
        activeSwitchRef.current?.focus();
        break;
      case "active":
        defaultSwitchRef.current?.focus();
        break;
      case "default":
        draftSwitchRef.current?.focus();
        break;
      case "draft":
        deleteButtonRef.current?.focus();
        break;
      default:
        break;
    }
  }, []);

  // Memoized relative time calculation
  const getRelativeTime = useCallback((dateString: string | null | Date) => {
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
  }, []);

  // Stabilized switch key navigation handler
  const handleSwitchKeyDown = useCallback(
    (e: React.KeyboardEvent, currentField: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        // Trigger the switch/button action first
        switch (currentField) {
          case "active":
            setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
            break;
          case "default":
            setFormData((prev) => ({ ...prev, isDefault: !prev.isDefault }));
            break;
          case "draft":
            setFormData((prev) => ({ ...prev, isDraft: !prev.isDraft }));
            break;
          case "delete":
            setFormData((prev) => ({ ...prev, isDeleted: !prev.isDeleted }));
            break;
        }
        // Then move to next field
        setTimeout(() => focusNextInput(currentField), 50);
      }
    },
    [focusNextInput]
  );

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({ ...initialData });
    }
  }, [isEdit, initialData]);

  // Stabilized form field change handler
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  // Stabilized form submission handler
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Stock Transfer Form submitted:", formData);
    },
    [formData]
  );

  // Stabilized form reset handler
  const handleReset = useCallback(() => {
    if (window.confirm(t("form.resetConfirm"))) {
      const newData = createInitialData();
      setFormData(newData);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [t]);

  // Stabilized print handler
  const handlePrintStockTransfer = useCallback((stockData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Stock Transfer Details",
        data: [stockData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          documentNumber: "Document Number",
          sourceBranch: "Source Branch",
          destinationBranch: "Destination Branch",
          poNumber: "P.O Number",
          documentDate: "Document Date",
          remarks: "Remarks",
          amount: "Amount",
          isActive: "Active Status",
          isDefault: "Default Status",
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
  }, []);

  // Stabilized switch change handlers
  const handleSwitchChange = useCallback(
    (checked: boolean) => {
      setPrintEnabled(checked);
      if (checked && formData) {
        // Small delay to allow switch animation to complete
        setTimeout(() => handlePrintStockTransfer(formData), 100);
      }
    },
    [formData, handlePrintStockTransfer]
  );

  const handlePDFSwitchChange = useCallback((pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handleExportPDF(), 100);
    }
  }, []);

  // Stabilized PDF export handler
  const handleExportPDF = useCallback(async () => {
    console.log("Export PDF clicked");
    try {
      console.log("stockData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Stock Transfer Details"
          subtitle="Stock Transfer Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "stock-transfer-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  }, [formData]);

  // Memoized navigation handlers
  const popoverOptions = useMemo(
    () => [
      {
        label: isEdit ? "Create" : "Edit",
        onClick: () => {
          if (isEdit) {
            navigate("/stock-transfer/create");
          } else {
            navigate("/stock-transfer/edit/undefined");
          }
        },
      },
      {
        label: "View",
        onClick: () => {
          navigate("/stock-transfer/view");
        },
      },
    ],
    [isEdit, navigate]
  );

  // Memoized branch change handlers
  const handleSourceBranchChange = useCallback((value: string | null) => {
    setFormData((prev) => ({ ...prev, sourceBranch: value || "" }));
  }, []);

  const handleDestinationBranchChange = useCallback((value: string | null) => {
    setFormData((prev) => ({ ...prev, destinationBranch: value || "" }));
  }, []);

  // Memoized date change handler
  const handleDateChange = useCallback(
    (date: Date | undefined) => {
      setFormData((prev) => ({
        ...prev,
        documentDate: date || new Date(),
      }));
      setIsDatePickerOpen(false);
      focusNextInput("documentDate");
    },
    [focusNextInput]
  );

  // Memoized switch change handlers
  const handleActiveSwitchChange = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  }, []);

  const handleDefaultSwitchChange = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, isDefault: checked }));
  }, []);

  const handleDraftSwitchChange = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, isDraft: checked }));
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      isDeleted: !prev.isDeleted,
    }));
  }, []);

  // Memoized translation handlers
  const handleTranslationSave = useCallback((data: any) => {
    setTranslations(data);
    console.log("Stock Transfer translations saved:", data);
  }, []);

  // Memoized footer buttons
  const additionalFooterButtons = useMemo(
    () => (
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="gap-2 text-primary rounded-full border-primary"
          onClick={handleReset}
        >
          {t("button.reset")}
        </Button>
        <Button
          variant="outline"
          className="gap-2 text-primary rounded-full border-primary"
          onClick={() => formRef.current?.requestSubmit()}
        >
          {t("button.submit")}
        </Button>
      </div>
    ),
    [handleReset, t]
  );

  return (
    <>
      <PageLayout
        title={
          isEdit
            ? t("form.editingStockTransfer")
            : t("form.creatingStockTransfer")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/stock-transfer"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        additionalFooterButtons={additionalFooterButtons}
        className="w-full"
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* First Row: Document Number, Source Branch, Destination Branch, P.O Number, Document Date, Remarks */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("form.documentNumber")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                ref={documentNumberInputRef}
                id="documentNumber"
                name="documentNumber"
                className="w-full h-10 bg-gray-100"
                value={formData.documentNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("documentNumber")}
                onCancel={() => {}}
                tooltipText="Auto-generated document number"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("form.sourceBranch")} <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={memoizedBranches}
                value={formData.sourceBranch}
                onChange={handleSourceBranchChange}
                placeholder="Select source branch..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                    height: "40px",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("sourceBranch");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("form.destinationBranch")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={memoizedBranches}
                value={formData.destinationBranch}
                onChange={handleDestinationBranchChange}
                placeholder="Select destination branch..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                    height: "40px",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("destinationBranch");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">P.O Number</h3>
              <EditableInput
                ref={poNumberInputRef}
                id="poNumber"
                name="poNumber"
                className="w-full h-10"
                value={formData.poNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("poNumber")}
                onCancel={() => {}}
                tooltipText="Please enter purchase order number"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Document Date <span className="text-red-500">*</span>
              </h3>
              <Popover
                open={isDatePickerOpen}
                onOpenChange={setIsDatePickerOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    data-testid="date-picker-trigger"
                    variant="outline"
                    className={cn(
                      "w-full h-10 justify-start text-left font-normal",
                      !formData.documentDate && "text-muted-foreground"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        focusNextInput("documentDate");
                      }
                    }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.documentDate ? (
                      format(new Date(formData.documentDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.documentDate
                        ? new Date(formData.documentDate)
                        : undefined
                    }
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Remarks</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                ref={remarksInputRef}
                id="remarks"
                name="remarks"
                className="w-full h-10"
                value={formData.remarks}
                onChange={handleChange}
                onNext={() => focusNextInput("remarks")}
                onCancel={() => {}}
                tooltipText="Additional remarks or notes"
              />
            </div>
          </div>

          {/* Second Row: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={activeSwitchRef}
                  id="isActive"
                  name="isActive"
                  className=""
                  checked={formData.isActive}
                  onCheckedChange={handleActiveSwitchChange}
                  onKeyDown={(e) => handleSwitchKeyDown(e, "active")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Is Default</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={defaultSwitchRef}
                  id="isDefault"
                  name="isDefault"
                  className=""
                  checked={formData.isDefault}
                  onCheckedChange={handleDefaultSwitchChange}
                  onKeyDown={(e) => handleSwitchKeyDown(e, "default")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={draftSwitchRef}
                  id="isDraft"
                  name="isDraft"
                  className=""
                  checked={formData.isDraft}
                  onCheckedChange={handleDraftSwitchChange}
                  onKeyDown={(e) => handleSwitchKeyDown(e, "draft")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {formData.isDeleted ? t("button.restore") : t("button.delete")}
              </h3>
              <div className="h-10 flex items-center">
                <Button
                  ref={deleteButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={handleDeleteButtonClick}
                  onKeyDown={(e) => handleSwitchKeyDown(e, "delete")}
                >
                  {formData.isDeleted ? (
                    <Undo2 className="text-green-500" />
                  ) : (
                    <Trash2 className="text-red-500" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Third Row: Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium mb-1">{t("common.created")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.createdAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.updated")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.updatedAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.drafted")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.draftedAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.deleted")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Dynamic Input Table */}
          <DynamicInputTableList isEdit={isEdit} />
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Stock Transfer Language Translator"
        initialData={translations}
        onSave={handleTranslationSave}
      />
    </>
  );
}
