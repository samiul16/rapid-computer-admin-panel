/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useInvoiceFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { TemplateContent } from "@/components/common/TemplateContent";
import { cn } from "@/lib/utils";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import DynamicInputTableList from "@/components/common/dynamic-input-table/DynamicInputTableList";
import EnglishDate from "@/components/EnglishDateInput";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";

// Define Sales Return interface
interface Invoice {
  id: string;
  documentNumber: string;
  salesInvoiceNumber: string;
  poNumber: string;
  poDate: string;
  customer: string;
  vatNumber: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: string;
  country: string;
  state: string;
  city: string;
  remarks: string;
  salesman: string;
  status: "Active" | "Inactive" | "Draft" | "Deleted";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock customer data for auto-fill functionality
interface CustomerData {
  name: string;
  vatNumber: string;
  country: string;
  state: string;
  city: string;
}

const MOCK_CUSTOMERS: CustomerData[] = [
  {
    name: "ABC Trading LLC",
    vatNumber: "VAT-1234567890",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
  },
  {
    name: "Global Exports",
    vatNumber: "VAT-2345678901",
    country: "UAE",
    state: "Dubai",
    city: "Business Bay",
  },
  {
    name: "Sunrise Mart",
    vatNumber: "VAT-3456789012",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Mussafah",
  },
];

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

// Salesman options
const SALESMAN_OPTIONS = [
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
];

// Mock invoice data for editing
const MOCK_INVOICES: Invoice[] = [
  {
    id: "1",
    documentNumber: "DOC001",
    salesInvoiceNumber: "INV-2024-001",
    poNumber: "PO-2024-001",
    poDate: "2024-07-20",
    customer: "ABC Trading LLC",
    vatNumber: "VAT-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: "2024-08-23",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    remarks: "Urgent delivery required",
    salesman: "John Smith",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-07-24"),
    draftedAt: null,
    updatedAt: new Date("2024-07-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    documentNumber: "DOC002",
    salesInvoiceNumber: "INV-2024-002",
    poNumber: "PO-2024-002",
    poDate: "2024-07-22",
    customer: "Global Exports",
    vatNumber: "VAT-2345678901",
    paymentMode: "Credit Card",
    dueDays: 15,
    paymentDate: "2024-08-09",
    country: "UAE",
    state: "Dubai",
    city: "Business Bay",
    remarks: "Standard delivery",
    salesman: "Sarah Johnson",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-07-25"),
    draftedAt: null,
    updatedAt: new Date("2024-07-31"),
    deletedAt: null,
    isDeleted: false,
  },
];

type Props = {
  isEdit?: boolean;
};

export default function InvoiceEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const detectedModule = "sales-return";

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useInvoiceFormData();

  const [showTemplates, setShowTemplates] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [isCustomerAutoFilled, setIsCustomerAutoFilled] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Permission checks
  const canCreate = usePermission(detectedModule, "create");
  const canView = usePermission(detectedModule, "view");
  const canPdf: boolean = usePermission(detectedModule, "pdf");
  const canPrint: boolean = usePermission(detectedModule, "print");
  const statusPerm: boolean = usePermission(detectedModule, "edit", "status");
  const isDefaultPerm: boolean = usePermission(
    detectedModule,
    "edit",
    "isDefault"
  );

  // Form state
  const [formData, setFormData] = useState<Invoice>({
    id: "",
    documentNumber: "",
    salesInvoiceNumber: "",
    poNumber: "",
    poDate: "",
    customer: "",
    vatNumber: "",
    paymentMode: "",
    dueDays: 0,
    paymentDate: "",
    country: "",
    state: "",
    city: "",
    remarks: "",
    salesman: "",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  });

  // Memoize customer data to prevent unnecessary re-renders
  const memoizedCustomers = useMemo(() => [...MOCK_CUSTOMERS], []);
  const memoizedPaymentModes = useMemo(() => [...PAYMENT_MODES], []);
  const memoizedSalesmanOptions = useMemo(() => [...SALESMAN_OPTIONS], []);

  // Invoice options for autocomplete
  const invoiceOptions = useMemo(
    () =>
      MOCK_INVOICES.map((invoice) => ({
        value: invoice.documentNumber,
        label: `${invoice.documentNumber} - ${invoice.customer}`,
      })),
    []
  );

  // Helper function to check if customer fields should be disabled
  const isCustomerFieldsDisabled = () => {
    return !formData.customer || formData.customer.trim() === "";
  };

  // Function to search for customer by name
  const findCustomerByName = useCallback(
    (name: string): CustomerData | null => {
      if (!name.trim()) return null;

      // Find exact match first
      let customer = memoizedCustomers.find(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      );

      // If no exact match, find partial match
      if (!customer) {
        customer = memoizedCustomers.find(
          (s) =>
            s.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(s.name.toLowerCase())
        );
      }

      return customer || null;
    },
    [memoizedCustomers]
  );

  // Function to find and load invoice data
  const loadInvoiceData = useCallback((documentNumber: string) => {
    const invoiceData = MOCK_INVOICES.find(
      (invoice) => invoice.documentNumber === documentNumber
    );

    if (invoiceData) {
      setFormData({
        ...invoiceData,
        updatedAt: new Date(), // Update the timestamp
      });
      toastSuccess(`Loaded data for ${documentNumber}`);
    } else {
      toastError(`Invoice ${documentNumber} not found`);
    }
  }, []);

  // Handle document number selection
  const handleDocumentNumberChange = useCallback(
    (value: string | null) => {
      if (value) {
        const documentNumber = value.split(" - ")[0]; // Extract document number from "DOC001 - Customer Name"
        setFormData((prev) => ({ ...prev, documentNumber }));
        loadInvoiceData(documentNumber);
      }
    },
    [loadInvoiceData]
  );

  // Update translation data when customer changes
  const updateTranslations = useCallback((customer: string) => {
    setTranslations([
      { id: 1, english: customer || "", arabic: "", bangla: "" },
    ]);
  }, []);

  useEffect(() => {
    updateTranslations(formData.customer);
  }, [formData.customer, updateTranslations]);

  // Refs for form elements
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Simplified restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData &&
      !isRestoredFromMinimized &&
      !formData.customer &&
      !formData.documentNumber;

    if (shouldAutoRestore) {
      setFormData({
        ...(moduleData as any),
        isDraft: (moduleData as any)?.isDraft || false,
      });

      setIsDefaultState((moduleData as any)?.isDefault ? "Yes" : "No");
      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition(
        "sales-return-edit-module"
      );
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    formData.customer,
    formData.documentNumber,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && !hasMinimizedData && !isRestoredFromMinimized) {
      if (id && id !== "undefined") {
        const invoiceData = MOCK_INVOICES.find((invoice) => invoice.id === id);
        if (invoiceData) {
          setFormData(invoiceData);
          setIsDefaultState(invoiceData.isDefault ? "Yes" : "No");
        } else {
          const defaultInvoice = MOCK_INVOICES[0];
          setFormData(defaultInvoice);
          setIsDefaultState(defaultInvoice.isDefault ? "Yes" : "No");
        }
      } else {
        const defaultInvoice = MOCK_INVOICES[0];
        setFormData(defaultInvoice);
        setIsDefaultState(defaultInvoice.isDefault ? "Yes" : "No");
      }
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized, id]);

  // Handle customer changes and auto-fill related fields
  const handleCustomerChange = useCallback(
    (value: string | null) => {
      const newCustomer = value || "";

      setFormData((prev) => ({
        ...prev,
        customer: newCustomer,
        updatedAt: new Date(),
      }));

      // Search for matching customer
      const matchedCustomer = findCustomerByName(newCustomer);

      if (matchedCustomer) {
        // Auto-fill related fields
        setFormData((prev) => ({
          ...prev,
          customer: newCustomer,
          vatNumber: matchedCustomer.vatNumber,
          country: matchedCustomer.country,
          state: matchedCustomer.state,
          city: matchedCustomer.city,
          updatedAt: new Date(),
        }));
        setIsCustomerAutoFilled(true);
      } else {
        // Clear auto-filled fields when customer is empty or no match
        setIsCustomerAutoFilled(false);
        setFormData((prev) => ({
          ...prev,
          customer: newCustomer,
          vatNumber: "",
          country: "",
          state: "",
          city: "",
          updatedAt: new Date(),
        }));
      }
    },
    [findCustomerByName]
  );

  // Handle form field changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newFormData = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
        updatedAt: new Date(), // Update timestamp on any change
      };
      setFormData(newFormData);
    },
    [formData]
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintInvoice(formData);
    }

    if (keepCreating) {
      toastSuccess(
        `${detectedModule} ${isEdit ? "updated" : "created"} successfully!`
      );
      handleReset();
    } else {
      toastSuccess(
        `${detectedModule} ${isEdit ? "updated" : "created"} successfully!`
      );
      navigate(`/${detectedModule}`);
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Update handleReset function
  const handleReset = async () => {
    const originalData = MOCK_INVOICES.find(
      (invoice) => invoice.documentNumber === formData.documentNumber
    );
    if (originalData) {
      setFormData(originalData);
      setIsDefaultState(originalData.isDefault ? "Yes" : "No");
      setIsRestoredFromMinimized(false);
      setIsCustomerAutoFilled(false);

      if (formRef.current) {
        formRef.current.reset();
      }

      setFormKey((prev) => prev + 1);

      if (hasMinimizedData) {
        try {
          await resetModuleData("sales-return-edit-module");
          console.log("Form data reset in Redux");
        } catch (error) {
          console.error("Error resetting form data:", error);
        }
      }

      toastSuccess("Form reset to original values");

      setTimeout(() => {
        inputRefs.current["documentNumber"]?.focus();
      }, 100);
    }
  };

  const handlePrintInvoice = useCallback(
    (invoiceData: any) => {
      try {
        const html = PrintCommonLayout({
          title: `${detectedModule} Details`,
          data: [invoiceData],
          excludeFields: ["id", "__v", "_id"],
          fieldLabels: {
            documentNumber: "Document Number",
            salesInvoiceNumber: "Sales Invoice Number",
            poNumber: "P.O Number",
            poDate: "P.O Date",
            customer: "Customer",
            vatNumber: "VAT Number",
            paymentMode: "Payment Mode",
            dueDays: "Due Days",
            paymentDate: "Payment Date",
            remarks: "Remarks",
            country: "Country",
            state: "State",
            city: "City",
            salesman: "Salesman",
            status: "Status",
            isDefault: "Default",
            isActive: "Active Status",
            isDraft: labels.draft,
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
    },
    [detectedModule, labels]
  );

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
    if (checked && formData) {
      setTimeout(() => handlePrintInvoice(formData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title={`${detectedModule} Details`}
          subtitle={`${detectedModule} Information`}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${detectedModule}-${formData.documentNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: "Create",
      icon: <Plus className="w-5 h-5 text-green-500" />,
      onClick: () => {
        navigate(`/${detectedModule}/create`);
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate(`/${detectedModule}/view`);
      },
      show: canView,
    },
  ]);

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      if (!formData.isDraft) {
        return [
          ...filteredOptions,
          {
            label: labels.draft || "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore(`${detectedModule} saved as draft successfully`);
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, labels, canCreate, detectedModule]);

  // Translation handlers
  const handleTranslationSave = useCallback((data: any) => {
    setTranslations(data);
    console.log("Invoice translations saved:", data);
  }, []);

  // Create minimize handler
  const handleMinimize = useCallback((): any => {
    return {
      ...formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="sales-return-edit-module"
        moduleName={`Edit ${detectedModule}`}
        moduleRoute={`/${detectedModule}/edit/${
          formData.documentNumber || "new"
        }`}
        onMinimize={handleMinimize}
        title={`Editing ${detectedModule}`}
        listPath={detectedModule}
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
        module={detectedModule}
        additionalFooterButtons={
          <div className="flex gap-4 max-[435px]:gap-2">
            <Button
              variant="outline"
              className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
              onClick={handleResetClick}
            >
              {labels.reset}
            </Button>
            <Button
              variant="outline"
              className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
              onClick={handleSubmit}
            >
              {labels.submit}
            </Button>
          </div>
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* First Row: Document Number, Sales Invoice Number, P.O Number, P.O Date */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Document Number */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("documentNumber")(el)}
                  id="documentNumber"
                  name="documentNumber"
                  allowCustomInput={false}
                  options={invoiceOptions.map((opt) => opt.label)}
                  value={
                    formData.documentNumber
                      ? `${formData.documentNumber} - ${formData.customer}`
                      : ""
                  }
                  onValueChange={handleDocumentNumberChange}
                  isShowTemplateIcon={false}
                  onEnterPress={() => focusNextInput("salesInvoiceNumber")}
                  placeholder=""
                  labelText="Document Number"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Select document number to edit"
                />
              </div>

              {/* Sales Invoice Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("salesInvoiceNumber")}
                  id="salesInvoiceNumber"
                  name="salesInvoiceNumber"
                  value={formData.salesInvoiceNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("poNumber")}
                  onCancel={() =>
                    setFormData({
                      ...formData,
                      salesInvoiceNumber: "",
                    })
                  }
                  labelText="Sales Invoice Number"
                  tooltipText="Reference sales invoice number"
                />
              </div>

              {/* P.O Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("poNumber")}
                  id="poNumber"
                  name="poNumber"
                  value={formData.poNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("poDate")}
                  onCancel={() => setFormData({ ...formData, poNumber: "" })}
                  labelText="P.O Number"
                  tooltipText="Purchase order number"
                />
              </div>

              {/* P.O Date */}
              <div className="space-y-2">
                <EnglishDate
                  isDate={true}
                  isShowCalender={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  onChange={(date: string) =>
                    setFormData({ ...formData, poDate: date })
                  }
                  value={formData.poDate}
                  disabled={false}
                  labelText="P.O Date"
                  className={cn("transition-all", "ring-1 ring-primary")}
                  setStartNextFocus={() => focusNextInput("customer")}
                />
              </div>
            </div>

            {/* Second Row: Customer, VAT Number, Payment Mode, Due Days */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Customer */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("customer")(el)}
                  id="customer"
                  name="customer"
                  labelText="Customer"
                  allowCustomInput={true}
                  options={memoizedCustomers.map((s) => s.name)}
                  value={formData.customer}
                  onValueChange={handleCustomerChange}
                  onEnterPress={() => focusNextInput("vatNumber")}
                  placeholder=""
                  className="relative"
                  tooltipText="Select or type customer"
                  userLang={isRTL ? "ar" : "en"}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  setShowTemplates={setShowTemplates}
                  showTemplates={showTemplates}
                />
              </div>

              {/* VAT Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("vatNumber")}
                  id="vatNumber"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("paymentMode")}
                  onCancel={() => setFormData({ ...formData, vatNumber: "" })}
                  labelText="VAT Number"
                  tooltipText={
                    isCustomerFieldsDisabled()
                      ? "Select customer first"
                      : "VAT Registration Number"
                  }
                  readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                  disabled={isCustomerFieldsDisabled()}
                  className={
                    isCustomerFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isCustomerAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
                />
              </div>
              {/* Payment Mode */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("paymentMode")(el)}
                  id="paymentMode"
                  name="paymentMode"
                  allowCustomInput={true}
                  options={memoizedPaymentModes}
                  value={formData.paymentMode}
                  onValueChange={(value: string | null) =>
                    setFormData({ ...formData, paymentMode: value || "" })
                  }
                  onEnterPress={() => focusNextInput("dueDays")}
                  placeholder=""
                  labelText="Payment Mode"
                  className="relative"
                  tooltipText="Select payment mode"
                  userLang={isRTL ? "ar" : "en"}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
              {/* Payment Date */}
              <div className="space-y-2">
                <EnglishDate
                  isDate={true}
                  isShowCalender={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  onChange={(date: string) =>
                    setFormData({ ...formData, paymentDate: date })
                  }
                  value={formData.paymentDate}
                  disabled={false}
                  labelText="Payment Date"
                  className={cn("transition-all", "ring-1 ring-primary")}
                  setStartNextFocus={() => focusNextInput("trnNumber")}
                />
              </div>
            </div>

            {/* Third Row: Country, State, City, Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {" "}
              {/* Due Days */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("dueDays")}
                  id="dueDays"
                  name="dueDays"
                  type="number"
                  value={formData.dueDays.toString()}
                  onChange={handleChange}
                  onNext={() => focusNextInput("paymentDate")}
                  onCancel={() => setFormData({ ...formData, dueDays: 0 })}
                  labelText="Due Days"
                  tooltipText="Number of days until payment is due"
                />
              </div>
              {/* Country */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("country")}
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onNext={() => focusNextInput("state")}
                  onCancel={() => setFormData({ ...formData, country: "" })}
                  labelText="Country"
                  tooltipText="Country"
                  readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                  disabled={isCustomerFieldsDisabled()}
                  className={
                    isCustomerFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isCustomerAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
                />
              </div>
              {/* State */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("state")}
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onNext={() => focusNextInput("city")}
                  onCancel={() => setFormData({ ...formData, state: "" })}
                  labelText="State"
                  tooltipText="State"
                  readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                  disabled={isCustomerFieldsDisabled()}
                  className={
                    isCustomerFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isCustomerAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
                />
              </div>
              {/* City */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("city")}
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onNext={() => focusNextInput("remarks")}
                  onCancel={() => setFormData({ ...formData, city: "" })}
                  labelText="City"
                  tooltipText="City"
                  readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                  disabled={isCustomerFieldsDisabled()}
                  className={
                    isCustomerFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isCustomerAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
                />
              </div>
              {/* Remarks */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("remarks")}
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  onNext={() => focusNextInput("salesman")}
                  onCancel={() => setFormData({ ...formData, remarks: "" })}
                  labelText="Remarks"
                  tooltipText="Additional remarks or notes"
                />
              </div>
              {/* Salesman */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("salesman")(el)}
                  id="salesman"
                  name="salesman"
                  allowCustomInput={true}
                  options={memoizedSalesmanOptions}
                  value={formData.salesman}
                  onValueChange={(value: string | null) =>
                    setFormData({ ...formData, salesman: value || "" })
                  }
                  onEnterPress={() => focusNextInput("isDefault")}
                  placeholder=""
                  labelText="Salesman"
                  className="relative"
                  tooltipText="Select salesman"
                  userLang={isRTL ? "ar" : "en"}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>
              {/* Default field - only show if user can edit */}
              {isDefaultPerm && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: "Yes",
                        value: "Yes",
                        date: "Set default",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Unset default",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === "Yes"
                        : value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Mark as default sales invoice"
                  />
                </div>
              )}
              {/* Status field - only show if user can edit */}
              {statusPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    labelText="Status"
                    multiSelect={false}
                    options={[
                      {
                        label: "Active",
                        value: "Active",
                        date: "Set active",
                      },
                      {
                        label: "Inactive",
                        value: "InActive",
                        date: "Set inactive",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set deleted",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as
                          | "Active"
                          | "Inactive"
                          | "Draft"
                          | "Deleted",
                        isDeleted: stringValue === "Delete",
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
                      }));
                    }}
                    placeholder=""
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                    tooltipText="Set the sales invoice status"
                  />
                </div>
              )}
            </div>

            {/* Fourth Row: Salesman, Default, Status, Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Actions */}
              <div className="space-y-2">
                <ActionsAutocomplete
                  ref={(el: any) => setRef("actions")(el)}
                  id="actions"
                  name="actions"
                  labelText="Action"
                  value={selectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "Karim",
                      role: "Super User",
                      date: "06 Aug 2025",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Rahim",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "updated",
                    },
                    {
                      action: "Drafted",
                      user: "Karim",
                      role: "Super User",
                      date: "07 Aug 2025",
                      value: "drafted",
                    },
                    {
                      action: "Deleted",
                      user: "Abdullah",
                      role: "Super Admin",
                      date: "09 Aug 2025",
                      value: "deleted",
                    },
                  ]}
                  placeholder=""
                  onValueChange={(value: string) => {
                    setSelectedAction(value);
                  }}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Sales Invoice Action History"
                />
              </div>
            </div>

            {/* Dynamic Input Table */}
            <DynamicInputTableList />
          </form>
        </div>
      </MinimizablePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
      />

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Sales Invoice Language Translator"
        initialData={translations}
        onSave={handleTranslationSave}
      />

      {/* Templates Modal */}
      <Modal
        opened={showTemplates}
        onClose={() => setShowTemplates(false)}
        size="xl"
        radius={20}
        overlayProps={{ backgroundOpacity: 0.25, blur: 1 }}
        withCloseButton={false}
        centered
      >
        <TemplateContent
          headers={[
            { key: "documentNumber", label: "Document Number" },
            { key: "customer", label: "Customer" },
            { key: "paymentMode", label: "Payment Mode" },
            { key: "dueDays", label: "Due Days" },
          ]}
          data={[
            {
              documentNumber: "DOC001",
              customer: "ABC Trading LLC",
              paymentMode: "Bank Transfer",
              dueDays: "30 days",
            },
            {
              documentNumber: "DOC002",
              customer: "Global Exports",
              paymentMode: "Credit Card",
              dueDays: "15 days",
            },
            {
              documentNumber: "DOC003",
              customer: "Sunrise Mart",
              paymentMode: "Cash",
              dueDays: "7 days",
            },
            {
              documentNumber: "DOC004",
              customer: "Blue Ocean Foods",
              paymentMode: "Wire Transfer",
              dueDays: "45 days",
            },
            {
              documentNumber: "DOC005",
              customer: "Prime Retailers",
              paymentMode: "Check",
              dueDays: "21 days",
            },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false);
            setFormData((prev) => ({
              ...prev,
              customer: selectedData.customer,
              paymentMode: selectedData.paymentMode,
              dueDays: parseInt(selectedData.dueDays.replace(" days", "")),
            }));
            // Trigger auto-fill for customer
            handleCustomerChange(selectedData.customer);
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
