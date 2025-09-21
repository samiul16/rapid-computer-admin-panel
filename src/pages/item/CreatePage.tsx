/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
// Removed Autocomplete import - not needed for item form
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { useNavigate } from "react-router-dom";

// Define Item interface to ensure type consistency
interface Item {
  id: string;
  itemCode: string;
  name: string;
  arabicName: string;
  costPrice: number;
  regularPrice: number;
  offerPrice: number;
  startDate: Date | null;
  endDate: Date | null;
  openingStock: number;
  category: string;
  subCategory: string;
  unit: string;
  itemImage: string;
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

type Props = {
  isEdit?: boolean;
};

const initialData: Item = {
  id: "1",
  itemCode: "ITM001",
  name: "Grilled Chicken Breast",
  arabicName: "صدر دجاج مشوي",
  costPrice: 8.5,
  regularPrice: 15.0,
  offerPrice: 12.0,
  startDate: new Date("2024-01-15"),
  endDate: new Date("2024-12-31"),
  openingStock: 50,
  category: "Main Course",
  subCategory: "Chicken",
  unit: "Piece",
  itemImage: "",
  description: "Fresh grilled chicken breast with herbs and spices",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Mock data not needed for item form

export default function ItemFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const itemCodeInputRef = useRef<EditableInputRef>(null);
  const nameInputRef = useRef<EditableInputRef>(null);
  const arabicNameInputRef = useRef<EditableInputRef>(null);
  const costPriceInputRef = useRef<EditableInputRef>(null);
  const regularPriceInputRef = useRef<EditableInputRef>(null);
  const offerPriceInputRef = useRef<EditableInputRef>(null);
  const startDateInputRef = useRef<EditableInputRef>(null);
  const endDateInputRef = useRef<EditableInputRef>(null);
  const openingStockInputRef = useRef<EditableInputRef>(null);
  const categoryInputRef = useRef<EditableInputRef>(null);
  const subCategoryInputRef = useRef<EditableInputRef>(null);
  const unitInputRef = useRef<EditableInputRef>(null);
  const descriptionInputRef = useRef<EditableInputRef>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<Item>({
    id: "",
    itemCode: "",
    name: "",
    arabicName: "",
    costPrice: 0,
    regularPrice: 0,
    offerPrice: 0,
    startDate: null,
    endDate: null,
    openingStock: 0,
    category: "",
    subCategory: "",
    unit: "",
    itemImage: "",
    description: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Item form doesn't need filtered options

  // Update translation data when item name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.name || "", arabic: "", bangla: "" },
    ]);
  }, [formData.name]);

  // Item form doesn't need country/state/city filtering
  // These useEffect hooks are removed for item interface

  // Update the focusNextInput function for item form fields
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "itemCode":
        nameInputRef.current?.focus();
        break;
      case "name":
        arabicNameInputRef.current?.focus();
        break;
      case "arabicName":
        costPriceInputRef.current?.focus();
        break;
      case "costPrice":
        regularPriceInputRef.current?.focus();
        break;
      case "regularPrice":
        offerPriceInputRef.current?.focus();
        break;
      case "offerPrice":
        startDateInputRef.current?.focus();
        break;
      case "startDate":
        endDateInputRef.current?.focus();
        break;
      case "endDate":
        openingStockInputRef.current?.focus();
        break;
      case "openingStock":
        categoryInputRef.current?.focus();
        break;
      case "category":
        subCategoryInputRef.current?.focus();
        break;
      case "subCategory":
        unitInputRef.current?.focus();
        break;
      case "unit":
        descriptionInputRef.current?.focus();
        break;
      case "description":
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

  // Handle numeric input changes
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;
    setFormData({
      ...formData,
      [name]: numericValue,
    });
  };

  // Handle date input changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value ? new Date(value) : null,
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
        id: "",
        itemCode: "",
        name: "",
        arabicName: "",
        costPrice: 0,
        regularPrice: 0,
        offerPrice: 0,
        startDate: null,
        endDate: null,
        openingStock: 0,
        category: "",
        subCategory: "",
        unit: "",
        itemImage: "",
        description: "",
        isDefault: false,
        isActive: true,
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

  const handlePrintItem = (itemData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Item Details",
        data: [itemData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemCode: "Item Code",
          name: "Item Name",
          arabicName: "Arabic Name",
          costPrice: "Cost Price",
          regularPrice: "Regular Price",
          offerPrice: "Offer Price",
          startDate: "Start Date",
          endDate: "End Date",
          openingStock: "Opening Stock",
          category: "Category",
          subCategory: "Sub Category",
          unit: "Unit",
          itemImage: "Item Image",
          description: "Description",
          isDefault: "Default Item",
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
    if (checked && formData) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintItem(formData), 100);
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
      console.log("itemData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Item Details"
          subtitle="Item Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "item-details.pdf";
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
        title={isEdit ? t("form.editingItem") : t("form.creatingItem")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/items"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/items/create");
              } else {
                // Navigate to edit page
                navigate("/items/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/items/view");
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
          {/* First Row: Item Code, Item Name, Arabic Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.itemCode")}</h3>
              <EditableInput
                ref={itemCodeInputRef}
                id="itemCode"
                name="itemCode"
                className="w-full h-10"
                value={formData.itemCode}
                onChange={handleChange}
                maxLength={10}
                onNext={() => focusNextInput("itemCode")}
                onCancel={() => {}}
                tooltipText="Please enter item code (e.g., ITM001)"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Item Name</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                ref={nameInputRef}
                id="name"
                name="name"
                className="w-full h-10"
                value={formData.name}
                onChange={handleChange}
                onNext={() => focusNextInput("name")}
                onCancel={() => {}}
                tooltipText="Please enter item name"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Arabic Name</h3>
              <EditableInput
                ref={arabicNameInputRef}
                id="arabicName"
                name="arabicName"
                className="w-full h-10"
                value={formData.arabicName}
                onChange={handleChange}
                onNext={() => focusNextInput("arabicName")}
                onCancel={() => {}}
                tooltipText="Please enter Arabic name"
              />
            </div>
          </div>

          {/* Second Row: Cost Price, Regular Price, Offer Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Cost Price</h3>
              <EditableInput
                ref={costPriceInputRef}
                id="costPrice"
                name="costPrice"
                type="number"
                className="w-full h-10"
                value={formData.costPrice.toString()}
                onChange={handleNumericChange}
                onNext={() => focusNextInput("costPrice")}
                onCancel={() => {}}
                tooltipText="Please enter cost price"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Regular Price</h3>
              <EditableInput
                ref={regularPriceInputRef}
                id="regularPrice"
                name="regularPrice"
                type="number"
                className="w-full h-10"
                value={formData.regularPrice.toString()}
                onChange={handleNumericChange}
                onNext={() => focusNextInput("regularPrice")}
                onCancel={() => {}}
                tooltipText="Please enter regular price"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Offer Price</h3>
              <EditableInput
                ref={offerPriceInputRef}
                id="offerPrice"
                name="offerPrice"
                type="number"
                className="w-full h-10"
                value={formData.offerPrice.toString()}
                onChange={handleNumericChange}
                onNext={() => focusNextInput("offerPrice")}
                onCancel={() => {}}
                tooltipText="Please enter offer price"
              />
            </div>
          </div>

          {/* Third Row: Start Date, End Date, Opening Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Start Date</h3>
              <EditableInput
                ref={startDateInputRef}
                id="startDate"
                name="startDate"
                type="date"
                className="w-full h-10"
                value={
                  formData.startDate
                    ? formData.startDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleDateChange}
                onNext={() => focusNextInput("startDate")}
                onCancel={() => {}}
                tooltipText="Please enter start date"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">End Date</h3>
              <EditableInput
                ref={endDateInputRef}
                id="endDate"
                name="endDate"
                type="date"
                className="w-full h-10"
                value={
                  formData.endDate
                    ? formData.endDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleDateChange}
                onNext={() => focusNextInput("endDate")}
                onCancel={() => {}}
                tooltipText="Please enter end date"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Opening Stock</h3>
              <EditableInput
                ref={openingStockInputRef}
                id="openingStock"
                name="openingStock"
                type="number"
                className="w-full h-10"
                value={formData.openingStock.toString()}
                onChange={handleNumericChange}
                onNext={() => focusNextInput("openingStock")}
                onCancel={() => {}}
                tooltipText="Please enter opening stock"
              />
            </div>
          </div>

          {/* Fourth Row: Category, Sub Category, Unit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Category</h3>
              <EditableInput
                ref={categoryInputRef}
                id="category"
                name="category"
                className="w-full h-10"
                value={formData.category}
                onChange={handleChange}
                onNext={() => focusNextInput("category")}
                onCancel={() => {}}
                tooltipText="Please enter category"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Sub Category</h3>
              <EditableInput
                ref={subCategoryInputRef}
                id="subCategory"
                name="subCategory"
                className="w-full h-10"
                value={formData.subCategory}
                onChange={handleChange}
                onNext={() => focusNextInput("subCategory")}
                onCancel={() => {}}
                tooltipText="Please enter sub category"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Unit</h3>
              <EditableInput
                ref={unitInputRef}
                id="unit"
                name="unit"
                className="w-full h-10"
                value={formData.unit}
                onChange={handleChange}
                onNext={() => focusNextInput("unit")}
                onCancel={() => {}}
                tooltipText="Please enter unit"
              />
            </div>
          </div>

          {/* Fifth Row: Description */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Description</h3>
              <EditableInput
                ref={descriptionInputRef}
                id="description"
                name="description"
                className="w-full h-10"
                value={formData.description}
                onChange={handleChange}
                onNext={() => focusNextInput("description")}
                onCancel={() => {}}
                tooltipText="Please enter item description"
              />
            </div>
          </div>

          {/* Sixth Row: Default, Draft, Active, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="space-y-2">
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

            <div className="space-y-2">
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
            <div className="space-y-2">
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
            <div className="space-y-2">
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

          {/* Seventh Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium mb-1">Created</h3>
              <p>{getRelativeTime(formData.createdAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{getRelativeTime(formData.updatedAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{getRelativeTime(formData.draftedAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Deleted</h3>
              <p>{getRelativeTime(formData.deletedAt)}</p>
            </div>
          </div>
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Item Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Item translations saved:", data);
        }}
      />
    </>
  );
}
