import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import DynamicInputTableList from "@/components/common/dynamic-input-table/DynamicInputTableList";

// Define Invoice interface to ensure type consistency
interface Invoice {
  id: string;
  documentNumber: string;
  invoiceNumber: string;
  invoiceDate: Date | string;
  customer: string;
  trnNumber: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date | string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  salesman: string;
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
  trn: string;
  country: string;
  state: string;
  city: string;
  paymentDate: string;
  salesman: string;
}

const MOCK_CUSTOMERS: CustomerData[] = [
  {
    name: "John Doe",
    trn: "TRN123456789",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    paymentDate: "2024-08-15",
    salesman: "Alice Smith",
  },
  {
    name: "Jane Smith",
    trn: "TRN987654321",
    country: "UAE",
    state: "Sharjah",
    city: "Industrial Area",
    paymentDate: "2024-08-10",
    salesman: "Bob Johnson",
  },
  {
    name: "Peter Jones",
    trn: "TRN112233445",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Mussafah",
    paymentDate: "2024-08-05",
    salesman: "Charlie Brown",
  },
  {
    name: "Mary White",
    trn: "TRN556677889",
    country: "UAE",
    state: "Dubai",
    city: "Al Qusais",
    paymentDate: "2024-08-03",
    salesman: "Diana Prince",
  },
  {
    name: "David Lee",
    trn: "TRN123123123",
    country: "UAE",
    state: "Sharjah",
    city: "Al Nahda",
    paymentDate: "2024-07-20",
    salesman: "Ethan Hunt",
  },
  {
    name: "Lisa Green",
    trn: "TRN456456456",
    country: "UAE",
    state: "Dubai",
    city: "Jumeirah",
    paymentDate: "2024-07-18",
    salesman: "Fiona Smith",
  },
  {
    name: "Mike Black",
    trn: "TRN789789789",
    country: "UAE",
    state: "Dubai",
    city: "Al Karama",
    paymentDate: "2024-07-30",
    salesman: "George Washington",
  },
  {
    name: "Susan Red",
    trn: "TRN101101101",
    country: "Bangladesh",
    state: "Dhaka",
    city: "Gulshan",
    paymentDate: "2024-07-28",
    salesman: "Henry Ford",
  },
  {
    name: "Tom Brown",
    trn: "TRN202202202",
    country: "UAE",
    state: "Dubai",
    city: "Bur Dubai",
    paymentDate: "2024-07-25",
    salesman: "Isaac Newton",
  },
  {
    name: "Jerry White",
    trn: "TRN303303303",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Al Ain",
    paymentDate: "2024-07-22",
    salesman: "James Bond",
  },
  {
    name: "Harry Potter",
    trn: "TRN404404404",
    country: "UAE",
    state: "Sharjah",
    city: "Al Nahda",
    paymentDate: "2024-07-20",
    salesman: "John Wick",
  },
  {
    name: "Ron Weasley",
    trn: "TRN505505505",
    country: "UAE",
    state: "Dubai",
    city: "Jumeirah",
    paymentDate: "2024-07-18",
    salesman: "Kyle Reese",
  },
  {
    name: "Hermione Granger",
    trn: "TRN606606606",
    country: "UAE",
    state: "Dubai",
    city: "Downtown",
    paymentDate: "2024-07-15",
    salesman: "Lara Croft",
  },
  {
    name: "Rubeus Hagrid",
    trn: "TRN707707707",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Khalifa City",
    paymentDate: "2024-07-12",
    salesman: "Mario Bros",
  },
];

type Props = {
  isEdit?: boolean;
};

const initialData: Invoice = {
  id: "1",
  documentNumber: "7",
  invoiceNumber: "INV-2024-001",
  invoiceDate: "2024-07-24",
  customer: "John Doe",
  trnNumber: "TRN123456789",
  paymentMode: "Split",
  dueDays: 45,
  paymentDate: "2024-08-15",
  remarks: "44",
  country: "UAE",
  state: "Dubai",
  city: "Deira",
  salesman: "Alice Smith",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function EditPage({ isEdit = true }: Props) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const documentNumberInputRef = useRef<EditableInputRef>(null);
  const invoiceNumberInputRef = useRef<EditableInputRef>(null);
  const invoiceDateInputRef = useRef<EditableInputRef>(null);
  const customerInputRef = useRef<EditableInputRef>(null);
  const trnNumberInputRef = useRef<EditableInputRef>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // State to track if customer fields are auto-filled (and should be read-only)
  const [isCustomerAutoFilled, setIsCustomerAutoFilled] = useState(false);

  // Helper function to check if customer fields should be disabled
  const isCustomerFieldsDisabled = () => {
    return !formData.customer || formData.customer.trim() === "";
  };

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<Invoice>({
    id: "",
    documentNumber: "",
    invoiceNumber: "",
    invoiceDate: "",
    customer: "",
    trnNumber: "",
    paymentMode: "",
    dueDays: 0,
    paymentDate: "",
    remarks: "",
    country: "",
    state: "",
    city: "",
    salesman: "",
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Function to search for customer by name
  const findCustomerByName = (name: string): CustomerData | null => {
    if (!name.trim()) return null;

    // Find exact match first
    let customer = MOCK_CUSTOMERS.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    // If no exact match, find partial match
    if (!customer) {
      customer = MOCK_CUSTOMERS.find(
        (c) =>
          c.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(c.name.toLowerCase())
      );
    }

    return customer || null;
  };

  // Handle customer name changes and auto-fill related fields
  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCustomerName = e.target.value;

    // Update customer name first
    setFormData((prev) => ({
      ...prev,
      customer: newCustomerName,
    }));

    // Search for matching customer
    const matchedCustomer = findCustomerByName(newCustomerName);

    if (matchedCustomer) {
      // Auto-fill related fields
      setFormData((prev) => ({
        ...prev,
        customer: newCustomerName,
        trnNumber: matchedCustomer.trn,
        country: matchedCustomer.country,
        state: matchedCustomer.state,
        city: matchedCustomer.city,
        paymentDate: matchedCustomer.paymentDate,
        salesman: matchedCustomer.salesman,
      }));
      setIsCustomerAutoFilled(true);
    } else {
      // Clear auto-filled fields and disable editing when customer name is empty
      setIsCustomerAutoFilled(false);
      setFormData((prev) => ({
        ...prev,
        customer: newCustomerName,
        trnNumber: "",
        country: "",
        state: "",
        city: "",
        paymentDate: "",
        salesman: "",
      }));
    }
  };

  // Update translation data when customer name changes
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

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "documentNumber":
        invoiceNumberInputRef.current?.focus();
        break;
      case "invoiceNumber": {
        // Focus on the Invoice Date input
        const invoiceDateInput = document.querySelector(
          'input[name="invoiceDate"]'
        ) as HTMLInputElement;
        invoiceDateInput?.focus();
        break;
      }
      case "invoiceDate":
        customerInputRef.current?.focus();
        break;
      case "customer": {
        // Focus on TRN Number input
        const trnNumberInput = document.querySelector(
          'input[name="trnNumber"]'
        ) as HTMLInputElement;
        trnNumberInput?.focus();
        break;
      }
      case "trnNumber": {
        // Focus on payment mode autocomplete
        const paymentModeInput = document.querySelector(
          'input[placeholder="Select payment mode..."]'
        ) as HTMLInputElement;
        paymentModeInput?.focus();
        break;
      }
      case "paymentMode": {
        // Focus on due days field
        const dueDaysInput = document.querySelector(
          'input[name="dueDays"]'
        ) as HTMLInputElement;
        dueDaysInput?.focus();
        break;
      }
      case "dueDays": {
        // Focus on payment date field
        const paymentDateInput = document.querySelector(
          'input[name="paymentDate"]'
        ) as HTMLInputElement;
        paymentDateInput?.focus();
        break;
      }
      case "paymentDate": {
        // Focus on remarks field
        const remarksInput = document.querySelector(
          'input[name="remarks"]'
        ) as HTMLInputElement;
        remarksInput?.focus();
        break;
      }
      case "remarks": {
        // Focus on salesman field
        const salesmanInput = document.querySelector(
          'input[name="salesman"]'
        ) as HTMLInputElement;
        salesmanInput?.focus();
        break;
      }
      case "salesman": {
        // Focus on country field
        const countryInput = document.querySelector(
          'input[name="country"]'
        ) as HTMLInputElement;
        countryInput?.focus();
        break;
      }
      case "country": {
        // Focus on state field
        const stateInput = document.querySelector(
          'input[name="state"]'
        ) as HTMLInputElement;
        stateInput?.focus();
        break;
      }
      case "state": {
        // Focus on city field
        const cityInput = document.querySelector(
          'input[name="city"]'
        ) as HTMLInputElement;
        cityInput?.focus();
        break;
      }
      case "city":
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

  useEffect(() => {
    if (id && id !== "undefined") {
      const fetchedData = initialData;
      setFormData(fetchedData);
    }
  }, [id]);

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
        invoiceNumber: "",
        invoiceDate: "",
        customer: "",
        trnNumber: "",
        paymentMode: "",
        dueDays: 0,
        paymentDate: "",
        remarks: "",
        country: "",
        state: "",
        city: "",
        salesman: "",
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

  const handlePrintInvoice = (invoiceData: Invoice) => {
    try {
      const html = PrintCommonLayout({
        title: "Invoice Details",
        data: [invoiceData as unknown as Record<string, unknown>],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          documentNumber: "Document Number",
          invoiceNumber: "Invoice Number",
          invoiceDate: "Invoice Date",
          customer: "Customer",
          trnNumber: "TRN Number",
          paymentMode: "Payment Mode",
          dueDays: "Due Days",
          paymentDate: "Payment Date",
          remarks: "Remarks",
          salesman: "Salesman",
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
      setTimeout(() => handlePrintInvoice(formData), 100);
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
          title="Order Details"
          subtitle="Order Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "order-details.pdf";
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
        title={isEdit ? t("form.editingSalesInvoice") : t("form.creatingSalesInvoice")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/sales-invoice"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/sales-invoice/create");
              } else {
                // Navigate to edit page
                navigate("/sales-invoice/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/sales-invoice/view");
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
          {/* First Row: Document Number, Invoice Number, Invoice Date, Customer */}
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
              <h3 className="font-medium mb-1">Invoice Number</h3>
              <EditableInput
                ref={invoiceNumberInputRef}
                id="invoiceNumber"
                name="invoiceNumber"
                className="w-full h-10"
                value={formData.invoiceNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("invoiceNumber")}
                onCancel={() => {}}
                tooltipText="Please enter invoice number"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Invoice Date <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                ref={invoiceDateInputRef}
                id="invoiceDate"
                name="invoiceDate"
                type="date"
                className="w-full h-10"
                value={formData.invoiceDate.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("invoiceDate")}
                onCancel={() => {}}
                tooltipText="Please select invoice date"
                required
              />
            </div>

            <div className="space-y-2 col-span-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">
                  Customer <span className="text-red-500">*</span>
                </h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <Autocomplete
                data={MOCK_CUSTOMERS.map((c) => c.name)}
                value={formData.customer}
                onChange={(value) => {
                  // Create a fake event to pass to our handler
                  const fakeEvent = {
                    target: {
                      value: value || "",
                      name: "customer",
                    },
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleCustomerNameChange(fakeEvent);
                }}
                placeholder="Type customer name..."
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
                    focusNextInput("customer");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">TRN Number</h3>
              <EditableInput
                ref={trnNumberInputRef}
                id="trnNumber"
                name="trnNumber"
                className={`w-full h-10 ${
                  isCustomerFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-100"
                }`}
                value={formData.trnNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("trnNumber")}
                onCancel={() => {}}
                tooltipText={
                  isCustomerFieldsDisabled()
                    ? "Select customer first"
                    : "TRN number"
                }
                readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                disabled={isCustomerFieldsDisabled()}
              />
            </div>
          </div>

          {/* Second Row: Payment Mode, Due Days, Payment Date, Country, State, City */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Mode</h3>
              <Autocomplete
                data={PAYMENT_MODES}
                value={formData.paymentMode}
                onChange={(value) => {
                  setFormData({ ...formData, paymentMode: value || "" });
                }}
                placeholder="Select payment mode..."
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
                    focusNextInput("paymentMode");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Due Days</h3>
              <EditableInput
                id="dueDays"
                name="dueDays"
                type="number"
                className="w-full h-10"
                value={formData.dueDays.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("dueDays")}
                onCancel={() => {}}
                tooltipText="Number of days until payment is due"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Date</h3>
              <EditableInput
                id="paymentDate"
                name="paymentDate"
                type="date"
                className={`w-full h-10 ${
                  isCustomerFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isCustomerAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.paymentDate.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("paymentDate")}
                onCancel={() => {}}
                tooltipText={
                  isCustomerFieldsDisabled()
                    ? "Select customer first"
                    : "Payment date"
                }
                readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                disabled={isCustomerFieldsDisabled()}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Country</h3>
              <EditableInput
                id="country"
                name="country"
                className={`w-full h-10 ${
                  isCustomerFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isCustomerAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.country}
                onChange={handleChange}
                onNext={() => focusNextInput("country")}
                onCancel={() => {}}
                tooltipText={
                  isCustomerFieldsDisabled()
                    ? "Select customer first"
                    : "Country"
                }
                readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                disabled={isCustomerFieldsDisabled()}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">State</h3>
              <EditableInput
                id="state"
                name="state"
                className={`w-full h-10 ${
                  isCustomerFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isCustomerAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.state}
                onChange={handleChange}
                onNext={() => focusNextInput("state")}
                onCancel={() => {}}
                tooltipText={
                  isCustomerFieldsDisabled() ? "Select customer first" : "State"
                }
                readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                disabled={isCustomerFieldsDisabled()}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">City</h3>
              <EditableInput
                id="city"
                name="city"
                className={`w-full h-10 ${
                  isCustomerFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isCustomerAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.city}
                onChange={handleChange}
                onNext={() => focusNextInput("city")}
                onCancel={() => {}}
                tooltipText={
                  isCustomerFieldsDisabled() ? "Select customer first" : "City"
                }
                readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                disabled={isCustomerFieldsDisabled()}
              />
            </div>
          </div>

          {/* Third Row: Remarks, Salesman */}
          <div className="grid grid-cols-6 gap-4">
            <div className="space-y-2 col-span-3">
              <h3 className="font-medium mb-1">Remarks</h3>
              <EditableInput
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

            <div className="space-y-2 col-span-3">
              <h3 className="font-medium mb-1">Salesman</h3>
              <EditableInput
                id="salesman"
                name="salesman"
                className={`w-full h-10 ${
                  isCustomerFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isCustomerAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.salesman}
                onChange={handleChange}
                onNext={() => focusNextInput("salesman")}
                onCancel={() => {}}
                tooltipText={
                  isCustomerFieldsDisabled()
                    ? "Select customer first"
                    : "Salesman"
                }
                readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                disabled={isCustomerFieldsDisabled()}
              />
            </div>
          </div>

          {/* Fourth Row: Active, Draft, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
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
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Invoice Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Invoice translations saved:", data);
        }}
      />
    </>
  );
}
