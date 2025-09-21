/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import PDF from "@/components/common/pdf";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Trash2, Undo2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type CountryData = {
  code: string;
  title: string;
  exchange: string;
  currency: string;
  country: string;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;

  flag: string | null;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: CountryData = {
  code: "US",
  title: "United States of America",
  exchange: "10",
  flag: null,
  currency: "US Dollar",
  country: "United States of America",

  isDefault: false,
  isActive: true,
  isDraft: false,

  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,

  isDeleted: false,
};

export default function CountryFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const codeInputRef = useRef<EditableInputRef>(null);
  const currencyInputRef = useRef<EditableInputRef>(null);
  const exchangeInputRef = useRef<EditableInputRef>(null);
  const countryInputRef = useRef<EditableInputRef>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const flagUploadRef = useRef<HTMLInputElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CountryData>({
    code: "",
    title: "",
    currency: "",
    exchange: "",
    flag: null,
    country: "",

    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,

    isDeleted: false,
  });

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "code":
        currencyInputRef.current?.focus();
        break;
      case "currency":
        exchangeInputRef.current?.focus();
        break;
      case "exchange":
        countryInputRef.current?.focus();
        break;
      case "country":
        defaultSwitchRef.current?.focus();
        break;
      case "default":
        activeSwitchRef.current?.focus();
        break;
      case "active":
        draftSwitchRef.current?.focus();
        break;
      case "draft":
        deleteButtonRef.current?.focus();
        break;
      case "delete":
        flagUploadRef.current?.focus();
        break;
      default:
        break;
    }
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

  // Add this function to handle key navigation for switches and buttons
  const handleSwitchKeyDown = (
    e: React.KeyboardEvent,
    currentField: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Trigger the switch/button action first
      switch (currentField) {
        case "default":
          setFormData({ ...formData, isDefault: !formData.isDefault });
          break;
        case "active":
          setFormData({ ...formData, isActive: !formData.isActive });
          break;
        case "draft":
          setFormData({ ...formData, isDraft: !formData.isDraft });
          break;
        case "delete":
          setFormData({ ...formData, isDeleted: !formData.isDeleted });
          break;
      }
      // Then move to next field
      setTimeout(() => focusNextInput(currentField), 50);
    }
  };

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
        flag: null,
      });
      if (initialData.flag) {
        setImagePreview(initialData.flag);
      }
    }
  }, [isEdit, initialData]);

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  // Handle image file selection
  const handleImageFile = (file: File) => {
    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData({ ...formData, flag: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload via file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

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
    console.log("Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        code: "",
        title: "",
        currency: "",
        exchange: "",
        country: "",
        isDefault: false,
        isActive: true,
        isDraft: false,
        flag: null,
        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      });
      setImagePreview(null);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePrintCountry = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Currency Report",
        data: printData,
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
    if (checked && formData) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintCountry(formData), 100);
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
      console.log("countryData on pdf click", formData);
      const blob = await pdf(
        <PDF
          data={[formData]}
          title="Currency Details"
          subtitle="Currency Information Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "currencies-details.pdf";
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
        title={isEdit ? t("form.editingCurrency") : t("form.creatingCurrency")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/currencies"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/currencies/create");
              } else {
                // Navigate to edit page
                navigate("/currencies/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/currencies/view");
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
          {/* First Row: Code, Calling Code, Country */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.code")}</h3>
              <EditableInput
                ref={codeInputRef}
                id="code"
                name="code"
                className="w-full h-10"
                value={formData.code}
                onChange={handleChange}
                maxLength={3}
                onNext={() => focusNextInput("code")}
                onCancel={() => {}}
                tooltipText="Please enter currency code (e.g., USD, EUR)"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.currency")}</h3>
              <EditableInput
                ref={currencyInputRef}
                id="currency"
                name="currency"
                className="w-full h-10"
                value={formData.currency}
                onChange={handleChange}
                onNext={() => focusNextInput("currency")}
                onCancel={() => {}}
                tooltipText="Please enter currency name (e.g., US Dollar)"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium">{t("Exchange")}</h3>
              <EditableInput
                ref={exchangeInputRef}
                id="exchange"
                name="exchange"
                className="w-full h-10"
                value={formData.exchange}
                onChange={handleChange}
                onNext={() => focusNextInput("exchange")}
                onCancel={() => {}}
                tooltipText="Please enter exchange rate"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium">{t("Country")}</h3>
              <EditableInput
                ref={countryInputRef}
                id="country"
                name="country"
                className="w-full h-10"
                value={formData.country}
                onChange={handleChange}
                onNext={() => focusNextInput("country")}
                onCancel={() => {}}
                tooltipText="Please enter country name"
                required
              />
            </div>
          </div>

          {/* Second Row: Default, Draft, Active, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.default")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={defaultSwitchRef}
                  id="isDefault"
                  name="isDefault"
                  className=""
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDefault: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "default")}
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={activeSwitchRef}
                  id="isActive"
                  name="isActive"
                  className=""
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "active")}
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={draftSwitchRef}
                  id="isDraft"
                  name="isDraft"
                  className=""
                  checked={formData.isDraft}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDraft: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "draft")}
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">
                {formData.isDeleted ? t("button.restore") : t("button.delete")}
              </h3>
              <div className="h-10 flex items-center">
                <Button
                  ref={deleteButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isDeleted: !formData.isDeleted,
                    })
                  }
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

          {/* Third Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p>{getRelativeTime(formData.createdAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{getRelativeTime(formData.updatedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{getRelativeTime(formData.draftedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p>{getRelativeTime(formData.deletedAt)}</p>
            </div>
          </div>

          {/* Flag Upload */}
          <div className="space-y-2">
            <h3 className="font-medium mb-1">{t("form.symbol")}</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              tabIndex={0}
              ref={flagUploadRef}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  triggerFileInput();
                }
              }}
            >
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt={t("form.flagPreview")}
                    className="w-40 h-28 object-contain rounded-md"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setFormData({ ...formData, flag: null });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {t("form.dragDropImage")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t("form.orClickToSelect")}
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </form>
      </PageLayout>

      {/* Options Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Options"
        size="xl"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="pt-5 pb-14 px-5">Modal Content</div>
      </Modal>
    </>
  );
}
