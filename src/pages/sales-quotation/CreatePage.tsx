/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import ToggleStatusControls from "@/components/common/create-page-components/ToggleStatusControls";
import DynamicInputTableList from "@/components/common/dynamic-input-table/DynamicInputTableList";
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

// Define Order interface to ensure type consistency
interface DataTypes extends Record<string, unknown> {
  id: string;
  documentNumber: string;
  customer: string;
  quotationNumber: string;
  quotationDate: Date | string;
  vatNumber: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date | string;
  country: string;
  state: string;
  city: string;
  remarks: string;
  salesMan: string;

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

const initialData: DataTypes = {
  id: "1",
  documentNumber: "7",
  customer: "",
  quotationNumber: "",
  quotationDate: "",
  vatNumber: "",
  paymentMode: "Split",
  dueDays: 45,
  paymentDate: "",
  country: "",
  state: "",
  city: "",
  remarks: "",
  salesMan: "",

  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
  isDefault: false,
};

export default function SalesQuotationCreatePage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Dummy data for purchase invoices
  const customerData = [
    {
      id: "1",
      documentNumber: "1",
      customer: "Customer 1",
      vatNumber: "VAT-001",
      salesMan: "Sales Man 43",
      paymentDate: "2023-02-20",
      country: "Bangladesh",
      state: "Dhaka",
      city: "Narayanganj",
    },
    {
      id: "2",
      documentNumber: "2",
      customer: "Customer 2",
      vatNumber: "VAT-002",
      salesMan: "Sales Man 1",
      paymentDate: "2023-02-20",
      country: "UAE",
      state: "Abu Dhabi",
      city: "Abu Dhabi",
    },
  ];

  // Format for the select dropdown
  const customerValueList = customerData.map((item) => ({
    value: item.customer,
    label: `${item.customer} - ${item.documentNumber}`,
    ...item,
  }));

  // Form state
  const [formData, setFormData] = useState<DataTypes>({
    id: "",
    documentNumber: "",
    customer: "",
    quotationNumber: "",
    quotationDate: "",
    vatNumber: "",
    paymentMode: "Split",
    dueDays: 0,
    paymentDate: "",
    country: "",
    state: "",
    city: "",
    remarks: "",
    salesMan: "",

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
      { id: 1, english: formData.customer || "", arabic: "", bangla: "" },
    ]);
  }, [formData.customer]);

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
    console.log("Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        id: "",
        documentNumber: "",
        customer: "",
        quotationNumber: "",
        quotationDate: "",
        vatNumber: "",
        paymentMode: "Split",
        dueDays: 0,
        paymentDate: "",
        country: "",
        state: "",
        city: "",
        remarks: "",
        salesMan: "",

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
        title: "Sales Quotation Details",
        data: [orderData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          documentNumber: "Document Number",
          quotationNumber: "Quotation Number",
          quotationDate: "Quotation Date",
          vatNumber: "VAT Number",
          paymentMode: "Payment Mode",
          dueDays: "Due Days",
          paymentDate: "Payment Date",
          customer: "Customer",
          remarks: "Remarks",
          country: "Country",
          state: "State",
          city: "City",
          salesMan: "Sales Man",
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
          title="Sales Quotation Details"
          subtitle="Sales Quotation Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sales-quotation-details.pdf";
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
            ? t("form.editingSalesQuotation")
            : t("form.creatingSalesQuotation")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/sales-quotation"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/sales-quotation/create");
              } else {
                // Navigate to edit page
                navigate("/sales-quotation/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/sales-quotation/view");
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
                setRef={setRef("documentNumber")}
                id="documentNumber"
                name="documentNumber"
                className="w-full h-10 bg-gray-100"
                value={formData.documentNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("quotationNumber")}
                onCancel={() => {}}
                tooltipText="Auto-generated document number"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Quotation Number</h3>
              <EditableInput
                setRef={setRef("quotationNumber")}
                id="quotationNumber"
                name="quotationNumber"
                className="w-full h-10"
                value={formData.quotationNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("quotationDate")}
                onCancel={() => {}}
                tooltipText="Please enter quotation number"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Quotation Date <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                setRef={setRef("quotationDate")}
                id="quotationDate"
                name="quotationDate"
                type="date"
                className="w-full h-10"
                value={formData.quotationDate.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("customer")}
                onCancel={() => {}}
                tooltipText="Please select quotation date"
                required
              />
            </div>

            <div className="space-y-2 col-span-2">
              <h3 className="font-medium mb-1">Customer</h3>

              <Select
                ref={(el) => setRef("customer")(el as HTMLElement)}
                id="customer"
                name="customer"
                className="w-full h-10"
                value={formData.customer}
                onChange={(value) => {
                  if (value) {
                    // Find the selected invoice data
                    const selectedInvoice = customerValueList.find(
                      (inv) => inv.customer === value
                    );

                    if (selectedInvoice) {
                      // Update form data with the selected invoice details
                      setFormData((prev) => ({
                        ...prev,
                        customer: selectedInvoice.customer,
                        vatNumber: selectedInvoice.vatNumber,
                        paymentDate: selectedInvoice.paymentDate,
                        country: selectedInvoice.country,
                        state: selectedInvoice.state,
                        city: selectedInvoice.city,
                        salesMan: selectedInvoice.salesMan,
                      }));
                    } else {
                      // Just update the invoice number if no matching invoice found
                      setFormData((prev) => ({
                        ...prev,
                        customer: value,
                      }));
                    }
                    focusNextInput("paymentMode");
                  }
                }}
                data={customerValueList.map((item) => ({
                  value: item.value,
                  label: item.label,
                  id: item.id,
                }))}
                placeholder="Select a customer..."
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
                    focusNextInput("paymentMode");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">VAT Number</h3>
              <EditableInput
                setRef={setRef("vatNumber")}
                id="vatNumber"
                name="vatNumber"
                type="text"
                className="w-full h-10"
                value={formData.vatNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("paymentMode")}
                onCancel={() => {}}
                tooltipText="Please enter VAT number"
                readOnly
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
                onNext={() => focusNextInput("country")}
                onCancel={() => {}}
                tooltipText="Payment date"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Country</h3>
              <EditableInput
                id="country"
                setRef={setRef("country")}
                name="country"
                className={`w-full h-10`}
                value={formData.country}
                onChange={handleChange}
                onNext={() => focusNextInput("state")}
                onCancel={() => {}}
                tooltipText="Country"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">State</h3>
              <EditableInput
                setRef={setRef("state")}
                id="state"
                name="state"
                className={`w-full h-10`}
                value={formData.state}
                onChange={handleChange}
                onNext={() => focusNextInput("city")}
                onCancel={() => {}}
                tooltipText="State"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">City</h3>
              <EditableInput
                setRef={setRef("city")}
                id="city"
                name="city"
                className={`w-full h-10`}
                value={formData.city}
                onChange={handleChange}
                onNext={() => focusNextInput("remarks")}
                onCancel={() => {}}
                tooltipText="City"
                readOnly
              />
            </div>
          </div>

          {/* Third Row: Remarks */}
          <div className="grid grid-cols-6 gap-4">
            <div className="space-y-2 col-span-4">
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

            <div className="space-y-2 col-span-2">
              <h3 className="font-medium mb-1">Sales Man</h3>
              <EditableInput
                id="salesMan"
                name="salesMan"
                className={`w-full h-10`}
                value={formData.salesMan}
                onChange={handleChange}
                onNext={() => focusNextInput("isDefault")}
                onCancel={() => {}}
                tooltipText="Sales Man"
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
          <DynamicInputTableList isEdit={isEdit} />
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
