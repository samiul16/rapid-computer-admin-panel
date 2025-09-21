/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import ToggleStatusControls from "@/components/common/create-page-components/ToggleStatusControls";
import EditableInput from "@/components/common/EditableInput";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { Select } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DynamicInputTableList from "./dynamic-input-table/DynamicInputTableList";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
// Define OpeningStock interface
interface OpeningStock {
  id: string;
  itemId: string;
  quantityDamaged: number;
  damageDate: Date | null | string;

  reportedBy: string;
  location: string;

  damageType: "Transit" | "Handling" | "Expired" | "Other";

  isActive: boolean;
  isDefault: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

type Props = {
  isEdit?: boolean;
};

const initialData: OpeningStock = {
  id: "1",
  itemId: "",
  quantityDamaged: 0,
  damageDate: "",
  reportedBy: "",
  location: "",
  damageType: "Transit",
  isActive: true,
  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function DamageItemsCreatePage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Date picker state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<OpeningStock>({
    id: "",
    itemId: "",
    quantityDamaged: 0,
    damageDate: "",
    reportedBy: "",
    location: "",
    damageType: "Transit",
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  });

  // Update translation data when remarks change
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.damageType || "", arabic: "", bangla: "" },
    ]);
  }, [formData.damageType]);

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  const itemIdData = [
    { id: 1, value: "Item 1", label: "Item 1" },
    { id: 2, value: "Item 2", label: "Item 2" },
    { id: 3, value: "Item 3", label: "Item 3" },
  ];

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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
    }
  }, [isEdit, initialData]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Opening Stock Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        id: "",
        itemId: "",
        quantityDamaged: 0,
        damageDate: "",
        reportedBy: "",
        location: "",
        damageType: "Transit",
        isActive: true,
        isDefault: false,
        isDraft: false,
        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  const handlePrintOpeningStock = (stockData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Damage Items Details",
        data: [stockData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemId: "Item ID",
          quantityDamaged: "Quantity Damaged",
          damageDate: "Damage Date",
          reportedBy: "Reported By",
          location: "Location",
          damageType: "Damage Type",
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
  };

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
    if (checked && formData) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintOpeningStock(formData), 100);
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
      console.log("damageItemsData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Damage Items Details"
          subtitle="Damage Items Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "damage-items-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  return (
    <>
      <PageLayout
        title={
          isEdit ? t("form.editingDamageItems") : t("form.creatingDamageItems")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/damage-items"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/damage-items/create");
              } else {
                // Navigate to edit page
                navigate("/damage-items/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/damage-items/view");
            },
          },
        ]}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        additionalFooterButtons={
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
        }
        className="w-full"
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* First Row: Document Number, Branch, P.O Number, Document Date, Remarks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Item ID <span className="text-red-500">*</span>
              </h3>
              <Select
                ref={(el) => setRef("itemId")(el as HTMLElement)}
                id="itemId"
                name="itemId"
                className="w-full h-10"
                value={formData.itemId}
                onChange={(value) => {
                  if (value) {
                    setFormData({
                      ...formData,
                      itemId: value,
                    });
                  }
                  // Call focusNextInput if needed
                  focusNextInput("quantityDamaged");
                }}
                data={itemIdData.map((item) => item.value)}
                placeholder="Select a customer id..."
                searchable
                clearable
                required
                styles={{
                  input: {
                    height: "40px",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("quantityDamaged");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Quantity Damaged</h3>
              <EditableInput
                setRef={setRef("quantityDamaged")}
                id="quantityDamaged"
                name="quantityDamaged"
                className="w-full h-10"
                value={formData.quantityDamaged.toString() || ""}
                onChange={handleChange}
                onNext={() => focusNextInput("damageDate")}
                onCancel={() => {}}
                tooltipText="Please enter quantity damaged"
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
                    name="damageDate"
                    ref={(el) => setRef("damageDate")(el as HTMLButtonElement)}
                    data-testid="date-picker-trigger"
                    variant="outline"
                    className={cn(
                      "w-full h-10 justify-start text-left font-normal",
                      !formData.damageDate && "text-muted-foreground"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        focusNextInput("reportedBy");
                      }
                    }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.damageDate ? (
                      format(new Date(formData.damageDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.damageDate
                        ? new Date(formData.damageDate)
                        : undefined
                    }
                    onSelect={(date) => {
                      setFormData({
                        ...formData,
                        damageDate: date || new Date(),
                      });
                      setIsDatePickerOpen(false);
                      focusNextInput("reportedBy");
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Reported By</h3>
              <EditableInput
                setRef={setRef("reportedBy")}
                id="reportedBy"
                name="reportedBy"
                className="w-full h-10"
                value={formData.reportedBy.toString() || ""}
                onChange={handleChange}
                onNext={() => focusNextInput("location")}
                onCancel={() => {}}
                tooltipText="Please enter reported by"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Location</h3>
              <EditableInput
                setRef={setRef("location")}
                id="location"
                name="location"
                className="w-full h-10"
                value={formData.location.toString() || ""}
                onChange={handleChange}
                onNext={() => focusNextInput("damageType")}
                onCancel={() => {}}
                tooltipText="Please enter location"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Damage Type</h3>
              <Select
                ref={(el) => setRef("damageType")(el as HTMLElement)}
                id="damageType"
                name="damageType"
                className="w-full h-10"
                value={formData.damageType}
                onChange={(value) => {
                  if (
                    value === "Transit" ||
                    value === "Handling" ||
                    value === "Expired" ||
                    value === "Other"
                  ) {
                    setFormData({
                      ...formData,
                      damageType: value,
                    });
                  }
                  // Call focusNextInput if needed
                  focusNextInput("isDefault");
                }}
                data={["Transit", "Handling", "Expired", "Other"]}
                placeholder="Select a customer id..."
                searchable
                clearable
                required
                styles={{
                  input: {
                    height: "40px",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("isDefault");
                  }
                }}
              />
            </div>
          </div>

          {/* Second Row: Status Switches */}
          {/* Toggle Status Control */}
          <ToggleStatusControls
            formData={formData as any}
            setFormData={setFormData as any}
            focusNextInput={focusNextInput}
            setRef={setRef}
          />

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
          <DynamicInputTableList />
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Opening Stock Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Opening Stock translations saved:", data);
        }}
      />
    </>
  );
}
