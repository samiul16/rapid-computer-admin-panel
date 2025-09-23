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

// Define OpeningStock interface
interface OpeningStock {
  id: string;
  documentNumber: string;
  branch: string;
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
  const lastNumber = localStorage.getItem("lastOpeningStockNumber") || "0";
  const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastOpeningStockNumber", nextNumber);
  return `OS${nextNumber}`;
};

// Initial data factory function to prevent shared object references
const createInitialData = (): OpeningStock => ({
  id: "1",
  documentNumber: generateDocumentNumber(),
  branch: "",
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

export default function OpeningStockFormPage({ isEdit = false }: Props) {
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
  const [formData, setFormData] = useState<OpeningStock>(() =>
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
        // Focus on branch dropdown
        const branchInput = document.querySelector(
          'input[placeholder="Select branch..."]'
        ) as HTMLInputElement;
        branchInput?.focus();
        break;
      }
      case "branch":
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
      console.log("Opening Stock Form submitted:", formData);
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
  const handlePrintOpeningStock = useCallback((stockData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Opening Stock Details",
        data: [stockData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          documentNumber: "Document Number",
          branch: "Branch",
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
        setTimeout(() => handlePrintOpeningStock(formData), 100);
      }
    },
    [formData, handlePrintOpeningStock]
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
          title="Opening Stock Details"
          subtitle="Opening Stock Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "opening-stock-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
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
          // Handle navigation based on current state
          if (isEdit) {
            // Navigate to create page
            navigate("/opening-stock-inventory/create");
          } else {
            // Navigate to edit page
            navigate("/opening-stock-inventory/edit/undefined");
          }
        },
      },
      {
        label: "View",
        onClick: () => {
          navigate("/opening-stock-inventory/view");
        },
      },
    ],
    [isEdit, navigate]
  );

  // Memoized branch change handler
  const handleBranchChange = useCallback((value: string | null) => {
    setFormData((prev) => ({ ...prev, branch: value || "" }));
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
    console.log("Opening Stock translations saved:", data);
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
            ? t("form.editingOpeningStock")
            : t("form.creatingOpeningStock")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/opening-stock-inventory"
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
          {/* First Row: Document Number, Branch, P.O Number, Document Date, Remarks */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Document Number <span className="text-red-500">*</span>
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
                Branch <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={memoizedBranches}
                value={formData.branch}
                onChange={handleBranchChange}
                placeholder="Select branch..."
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
                    focusNextInput("branch");
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
        title="Opening Stock Language Translator"
        initialData={translations}
        onSave={handleTranslationSave}
      />
    </>
  );
}
