/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import ToggleStatusControls from "@/components/common/create-page-components/ToggleStatusControls";
import DynamicInputTableList from "@/components/common/dynamic-input-table/DynamicInputTableList";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { Select } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Define Order interface to ensure type consistency
interface Order extends Record<string, unknown> {
  id: string;
  documentNumber: string;
  purchaseInvoiceNumber: string;
  poNumber: string;
  poDate: Date | string;
  supplierName: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date | string;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  documents: string;
  expiryDate: Date | string;
  image: string | null;

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

const initialData: Order = {
  id: "1",
  documentNumber: "7",
  purchaseInvoiceNumber: "",
  poNumber: "",
  poDate: "24-07-2025",
  supplierName: "AL AHAD CURTAINS TEX &amp; FURNITURE TR.LLC",
  paymentMode: "Split",
  dueDays: 45,
  paymentDate: "",
  documents: "",
  expiryDate: "",
  image: "/customer-dummy-image.jpg",
  supplierNumber: "36",
  supplierStatus: "Active",
  supplierGroup: "",
  remarks: "44",
  country: "",
  state: "",
  city: "",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
  isDefault: false,
};

export default function PurchaseReturnsCreatePage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const documentNumberInputRef = useRef<EditableInputRef>(null);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Dummy data for purchase invoices
  const purchaseInvoiceData = [
    {
      id: "1",
      purchaseInvoiceNumber: "INV-2023-001",
      poNumber: "PO-2023-001",
      poDate: "2023-01-15",
      supplierName: "ABC Suppliers",
      paymentMode: "Credit",
      dueDays: 30,
      paymentDate: "2023-02-14",
      supplierNumber: "SUP-001",
      supplierStatus: "Active",
      supplierGroup: "Electronics",
      remarks: "First quarter order",
      country: "UAE",
      state: "Dubai",
      city: "Dubai",
    },
    {
      id: "2",
      purchaseInvoiceNumber: "INV-2023-002",
      poNumber: "PO-2023-002",
      poDate: "2023-02-20",
      supplierName: "XYZ Wholesale",
      paymentMode: "Cash",
      dueDays: 0,
      paymentDate: "2023-02-20",
      supplierNumber: "SUP-002",
      supplierStatus: "Active",
      supplierGroup: "Furniture",
      remarks: "Office furniture",
      country: "UAE",
      state: "Abu Dhabi",
      city: "Abu Dhabi",
    },
  ];

  // Format for the select dropdown
  const purchaseInvoiceNumberList = purchaseInvoiceData.map((invoice) => ({
    value: invoice.purchaseInvoiceNumber,
    label: `${invoice.purchaseInvoiceNumber} - ${invoice.supplierName}`,
    ...invoice, // Include all invoice data for auto-fill
  }));

  // Form state
  const [formData, setFormData] = useState<Order>({
    id: "1",
    documentNumber: "7",
    purchaseInvoiceNumber: "",
    poNumber: "",
    poDate: "",
    supplierName: "",
    paymentMode: "",
    dueDays: 0,
    paymentDate: "",
    supplierNumber: "",
    supplierStatus: "",
    supplierGroup: "",
    remarks: "",
    country: "",
    state: "",
    city: "",
    documents: "",
    expiryDate: "",
    image: null,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
    isDefault: false,
  });

  // Update translation data when supplier name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.supplierName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.supplierName]);

  // Payment mode options
  const PAYMENT_MODES = [
    "Cash",
    "Credit Card",
    "Debit Card",
    "Bank Transfer",
    "Check",
    "Split",
    "PayPal",
    "Wire Transfer",
    "ACH",
    "Digital Wallet",
  ];

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
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
        setFormData({ ...formData, image: e.target?.result as string });
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

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
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
    console.log("Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        id: "",
        documentNumber: "",
        poNumber: "",
        poDate: "",
        supplierName: "",
        paymentMode: "",
        dueDays: 0,
        purchaseInvoiceNumber: "",
        paymentDate: "",
        supplierNumber: "",
        supplierStatus: "",
        supplierGroup: "",
        remarks: "",
        country: "",
        state: "",
        city: "",
        documents: "",
        expiryDate: "",
        image: null,
        isActive: true,
        isDraft: false,
        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
        isDefault: false,
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  const handlePrintOrder = (orderData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Purchase Return Details",
        data: [orderData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          documentNumber: "Document Number",
          poNumber: "P.O Number",
          purchaseInvoiceNumber: "Purchase Invoice Number",
          poDate: "P.O Date",
          supplierName: "Supplier Name",
          paymentMode: "Payment Mode",
          dueDays: "Due Days",
          paymentDate: "Payment Date",
          supplierNumber: "Supplier Number",
          supplierStatus: "Supplier Status",
          supplierGroup: "Supplier Group",
          remarks: "Remarks",
          country: "Country",
          state: "State",
          city: "City",
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
      setTimeout(() => handlePrintOrder(formData), 100);
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
      console.log("orderData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Purchase Return Details"
          subtitle="Purchase Return Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "purchase-return-details.pdf";
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
          isEdit
            ? t("form.editingPurchaseReturn")
            : t("form.creatingPurchaseReturn")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/purchase-returns"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/purchase-returns/create");
              } else {
                // Navigate to edit page
                navigate("/purchase-returns/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/purchase-returns/view");
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
          {/* First Row: Document Number, P.O Number, P.O Date, Supplier Name */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
              <h3 className="font-medium mb-1">Purchase Invoice Number</h3>

              <Select
                ref={(el) => setRef("purchaseInvoiceNumber")(el as HTMLElement)}
                id="purchaseInvoiceNumber"
                name="purchaseInvoiceNumber"
                className="w-full h-10"
                value={formData.purchaseInvoiceNumber}
                onChange={(value) => {
                  if (value) {
                    // Find the selected invoice data
                    const selectedInvoice = purchaseInvoiceData.find(
                      (inv) => inv.purchaseInvoiceNumber === value
                    );

                    if (selectedInvoice) {
                      // Update form data with the selected invoice details
                      setFormData((prev) => ({
                        ...prev,
                        purchaseInvoiceNumber:
                          selectedInvoice.purchaseInvoiceNumber,
                        poNumber: selectedInvoice.poNumber,
                        poDate: selectedInvoice.poDate,
                        supplierName: selectedInvoice.supplierName,
                        paymentMode: selectedInvoice.paymentMode,
                        dueDays: selectedInvoice.dueDays,
                        paymentDate: selectedInvoice.paymentDate,
                        supplierNumber: selectedInvoice.supplierNumber,
                        supplierStatus: selectedInvoice.supplierStatus,
                        supplierGroup: selectedInvoice.supplierGroup,
                        remarks: selectedInvoice.remarks,
                        country: selectedInvoice.country,
                        state: selectedInvoice.state,
                        city: selectedInvoice.city,
                      }));
                    } else {
                      // Just update the invoice number if no matching invoice found
                      setFormData((prev) => ({
                        ...prev,
                        purchaseInvoiceNumber: value,
                      }));
                    }
                    focusNextInput("poDate");
                  }
                }}
                data={purchaseInvoiceNumberList.map((item) => ({
                  value: item.value,
                  label: item.label,
                  id: item.id,
                }))}
                placeholder="Select a order type..."
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
                    focusNextInput("poDate");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">P.O Number</h3>
              <EditableInput
                setRef={setRef("poNumber")}
                id="poNumber"
                name="poNumber"
                className="w-full h-10"
                value={formData.poNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("poDate")}
                onCancel={() => {}}
                tooltipText="Please enter purchase order number"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                P.O Date <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                setRef={setRef("poDate")}
                id="poDate"
                name="poDate"
                type="date"
                className="w-full h-10"
                value={formData.poDate.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("paymentMode")}
                onCancel={() => {}}
                tooltipText="Please select purchase order date"
                required
              />
            </div>

            <div className="space-y-2 col-span-2">
              <h3 className="font-medium mb-1">Supplier Name</h3>
              <EditableInput
                setRef={setRef("supplierName")}
                id="supplierName"
                name="supplierName"
                type="text"
                className="w-full h-10"
                value={formData.supplierName.toString()}
                onChange={handleChange}
                onCancel={() => {}}
                tooltipText="Please select supplier name"
                readOnly
                required
              />
            </div>
          </div>

          {/* Second Row: Payment Mode, Due Days, Payment Date, Supplier Number, Supplier Status, Supplier Group */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Mode</h3>
              <Select
                ref={(el) => setRef("paymentMode")(el as HTMLElement)}
                id="paymentMode"
                name="paymentMode"
                className="w-full h-10"
                value={formData.paymentMode}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    paymentMode: value || "",
                  });
                  // Call focusNextInput if needed
                  focusNextInput("dueDays");
                }}
                data={PAYMENT_MODES.map((item) => ({
                  value: item,
                  label: item,
                  id: item,
                }))}
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
                    focusNextInput("dueDays");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Due Days</h3>
              <EditableInput
                setRef={setRef("dueDays")}
                id="dueDays"
                name="dueDays"
                type="number"
                className="w-full h-10"
                value={formData.dueDays.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("remarks")}
                onCancel={() => {}}
                tooltipText="Number of days until payment is due"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Date</h3>
              <EditableInput
                setRef={setRef("paymentDate")}
                id="paymentDate"
                name="paymentDate"
                type="date"
                className={`w-full h-10`}
                value={formData.paymentDate.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("supplierName")}
                onCancel={() => {}}
                tooltipText="Payment date"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Supplier Number</h3>
              <EditableInput
                id="supplierNumber"
                name="supplierNumber"
                className={`w-full h-10`}
                value={formData.supplierNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("supplierNumber")}
                onCancel={() => {}}
                tooltipText="Supplier Name"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Supplier Status</h3>
              <EditableInput
                id="supplierStatus"
                name="supplierStatus"
                className={`w-full h-10`}
                value={formData.supplierStatus}
                onChange={handleChange}
                onNext={() => focusNextInput("supplierStatus")}
                onCancel={() => {}}
                tooltipText="Supplier status"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Supplier Group</h3>
              <EditableInput
                id="supplierGroup"
                name="supplierGroup"
                className={`w-full h-10`}
                value={formData.supplierGroup}
                onChange={handleChange}
                onNext={() => focusNextInput("supplierGroup")}
                onCancel={() => {}}
                tooltipText="Supplier group"
                readOnly
              />
            </div>
          </div>

          {/* Third Row: Remarks */}
          <div className="grid grid-cols-6 gap-4">
            <div className="space-y-2 col-span-3">
              <h3 className="font-medium mb-1">Remarks</h3>
              <EditableInput
                setRef={setRef("remarks")}
                id="remarks"
                name="remarks"
                className="w-full h-10"
                value={formData.remarks}
                onChange={handleChange}
                onNext={() => focusNextInput("isDefault")}
                onCancel={() => {}}
                tooltipText="Additional remarks or notes"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Country</h3>
              <EditableInput
                id="country"
                name="country"
                className={`w-full h-10`}
                value={formData.country}
                onChange={handleChange}
                onNext={() => focusNextInput("country")}
                onCancel={() => {}}
                tooltipText="Country"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">State</h3>
              <EditableInput
                id="state"
                name="state"
                className={`w-full h-10`}
                value={formData.state}
                onChange={handleChange}
                onNext={() => focusNextInput("state")}
                onCancel={() => {}}
                tooltipText="State"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">City</h3>
              <EditableInput
                id="city"
                name="city"
                className={`w-full h-10`}
                value={formData.city}
                onChange={handleChange}
                onNext={() => focusNextInput("city")}
                onCancel={() => {}}
                tooltipText="City"
                readOnly
              />
            </div>
          </div>

          {/* Toggle Status Control */}
          <ToggleStatusControls
            formData={formData}
            setFormData={setFormData}
            focusNextInput={focusNextInput}
            setRef={setRef}
          />

          {/* Sixth Row: Dates */}
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

          {/* Edit Dynamic Input Table */}
          <DynamicInputTableList />

          <div className="">
            <h3 className="text-2xl font-semibold border-b border-solid border-gray-300 pb-2 mb-4">
              Documents
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Documents</h3>

                <EditableInput
                  setRef={setRef("documents")}
                  id="documents"
                  name="documents"
                  className="w-full h-10"
                  value={formData.documents}
                  onChange={handleChange}
                  onNext={() => focusNextInput("expiryDate")}
                  tooltipText="Enter a Documents Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium mb-1">Expiry Date</h3>
                <EditableInput
                  setRef={setRef("expiryDate")}
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  className={`w-full h-10`}
                  value={formData.expiryDate.toString()}
                  onChange={handleChange}
                  onNext={() => focusNextInput("expiryDate")}
                  onCancel={() => {}}
                  tooltipText="Expiry Date"
                  required
                />
              </div>
            </div>
            {/* Flag Upload */}
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.customerLogo")}</h3>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                tabIndex={0}
                ref={(el) => setRef("fileUploadElement")(el as HTMLElement)}
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
                        setFormData({ ...formData, image: null });
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
          </div>
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Order Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Order translations saved:", data);
        }}
      />
    </>
  );
}
