/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type PaymentData = {
  invoiceType: string;
  currency: string;
  paymentTerms: string;
  dueDays: number;
  totalAmount: number;
  containerAmount: number;
  typeOfDeposit: string;
  depositAmount: number;
  depositDate: string;
  exchangeRate: number;
  localAmount: number;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: PaymentData = {
  invoiceType: "Commercial Invoice",
  currency: "USD",
  paymentTerms: "Net 30",
  dueDays: 30,
  totalAmount: 15000.0,
  containerAmount: 12000.0,
  typeOfDeposit: "Advance Payment",
  depositAmount: 3000.0,
  depositDate: "2024-01-15",
  exchangeRate: 1.0,
  localAmount: 15000.0,
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function PaymentFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("payment", "create");
  const canView = usePermission("payment", "view");
  const canEdit = usePermission("payment", "edit");
  const canDelete = usePermission("payment", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof PaymentData>(
    "payment",
    "create",
    [
      "invoiceType",
      "currency",
      "paymentTerms",
      "dueDays",
      "totalAmount",
      "containerAmount",
      "typeOfDeposit",
      "depositAmount",
      "depositDate",
      "exchangeRate",
      "localAmount",
      "isDefault",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("payment", "pdf");
  const canPrint: boolean = usePermission("payment", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const invoiceTypeOptions = [
    "Commercial Invoice",
    "Proforma Invoice",
    "Credit Note",
    "Debit Note",
  ];
  const currencyOptions = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    "AUD",
    "CHF",
    "SGD",
    "HKD",
    "NZD",
    "SEK",
    "NOK",
  ];
  const paymentTermsOptions = ["Net 30", "Net 45", "Net 60", "Net 90"];
  const depositTypeOptions = [
    "Advance Payment",
    "Letter of Credit",
    "Bank Guarantee",
    "Standby Letter of Credit",
  ];

  // Form state
  const [formData, setFormData] = useState<PaymentData>({
    invoiceType: "",
    currency: "",
    paymentTerms: "",
    dueDays: 0,
    totalAmount: 0,
    containerAmount: 0,
    typeOfDeposit: "",
    depositAmount: 0,
    depositDate: "",
    exchangeRate: 0,
    localAmount: 0,
    isDefault: isDefaultState === "Yes",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" /> // Green for Plus
      ) : (
        <Edit className="w-5 h-5 text-blue-500" /> // Blue for Edit
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/payment/create");
        } else {
          navigate("/payment/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/payment/view");
      },
      // Only show if user has permission
      show: canView,
    },
  ]);

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
      setIsDraftState(initialData.isDraft ? "Yes" : "No");
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)------------

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintPayment(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Payment created successfully!");
      handleReset();
    } else {
      toastSuccess("Payment created successfully!");
      navigate("/payment");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      invoiceType: "",
      currency: "",
      paymentTerms: "",
      dueDays: 0,
      totalAmount: 0,
      containerAmount: 0,
      typeOfDeposit: "",
      depositAmount: 0,
      depositDate: "",
      exchangeRate: 0,
      localAmount: 0,
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["invoiceType"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintPayment = (paymentData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Payment Details",
        data: [paymentData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          invoiceType: "Invoice Type",
          currency: "Currency",
          paymentTerms: "Payment Terms",
          dueDays: "Due Days",
          totalAmount: "Total Amount",
          containerAmount: "Container Amount",
          typeOfDeposit: "Type of Deposit",
          depositAmount: "Deposit Amount",
          depositDate: "Deposit Date",
          exchangeRate: "Exchange Rate",
          localAmount: "Local Amount",
          isDefault: "Default Payment",
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
      console.log("paymentData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Payment Details"
          subtitle="Payment Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payment-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      // Filter out any existing draft option first
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      // Add draft option only if not already a draft
      if (!formData.isDraft) {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Payment saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Payment" : "Creating Payment"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="payment"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        // Removed onExport prop
        additionalFooterButtons={
          // Only show buttons if user can create
          canCreate ? (
            <div className="flex gap-4 items-center">
              <Button
                variant="outline"
                className="gap-2 text-primary bg-sky-200 hover:bg-primary rounded-full border-primary w-32 font-semibold!"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
                id="submitButton"
                name="submitButton"
                variant="outline"
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                onClick={() => formRef.current?.requestSubmit()}
              >
                Submit
              </Button>
            </div>
          ) : null
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6 relative"
          >
            {/* Basic Payment Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.invoiceType && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("invoiceType")(el)}
                    id="invoiceType"
                    name="invoiceType"
                    options={invoiceTypeOptions}
                    value={formData.invoiceType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        invoiceType: value,
                      }));
                      focusNextInput("currency");
                    }}
                    onEnterPress={() => {
                      if (formData.invoiceType) {
                        focusNextInput("currency");
                      }
                    }}
                    placeholder=" "
                    labelText="Invoice Type"
                    className="relative"
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
              )}

              {permissionsFields.currency && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("currency")(el)}
                    id="currency"
                    name="currency"
                    options={currencyOptions}
                    value={formData.currency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currency: value,
                      }));
                      focusNextInput("paymentTerms");
                    }}
                    onEnterPress={() => {
                      if (formData.currency) {
                        focusNextInput("paymentTerms");
                      }
                    }}
                    placeholder=" "
                    labelText="Currency"
                    className="relative"
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
              )}

              {permissionsFields.paymentTerms && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentTerms")(el)}
                    id="paymentTerms"
                    name="paymentTerms"
                    options={paymentTermsOptions}
                    value={formData.paymentTerms}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentTerms: value,
                      }));
                      focusNextInput("dueDays");
                    }}
                    onEnterPress={() => {
                      if (formData.paymentTerms) {
                        focusNextInput("dueDays");
                      }
                    }}
                    placeholder=" "
                    labelText="Payment Terms"
                    className="relative"
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
              )}

              {permissionsFields.dueDays && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("dueDays")}
                    type="number"
                    id="dueDays"
                    name="dueDays"
                    value={formData.dueDays.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("totalAmount")}
                    onCancel={() => setFormData({ ...formData, dueDays: 0 })}
                    labelText="Due Days"
                    tooltipText="Enter due days"
                    required
                  />
                </div>
              )}
            </div>

            {/* Amount Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.totalAmount && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("totalAmount")}
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={formData.totalAmount.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("containerAmount")}
                    onCancel={() =>
                      setFormData({ ...formData, totalAmount: 0 })
                    }
                    labelText="Total Amount"
                    tooltipText="Enter total amount"
                    required
                  />
                </div>
              )}

              {permissionsFields.containerAmount && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("containerAmount")}
                    type="number"
                    id="containerAmount"
                    name="containerAmount"
                    value={formData.containerAmount.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("typeOfDeposit")}
                    onCancel={() =>
                      setFormData({ ...formData, containerAmount: 0 })
                    }
                    labelText="Container Amount"
                    tooltipText="Enter container amount"
                    required
                  />
                </div>
              )}

              {permissionsFields.typeOfDeposit && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("typeOfDeposit")(el)}
                    id="typeOfDeposit"
                    name="typeOfDeposit"
                    options={depositTypeOptions}
                    value={formData.typeOfDeposit}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        typeOfDeposit: value,
                      }));
                      focusNextInput("depositAmount");
                    }}
                    onEnterPress={() => {
                      if (formData.typeOfDeposit) {
                        focusNextInput("depositAmount");
                      }
                    }}
                    placeholder=" "
                    labelText="Type of Deposit"
                    className="relative"
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
              )}

              {permissionsFields.depositAmount && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("depositAmount")}
                    type="number"
                    id="depositAmount"
                    name="depositAmount"
                    value={formData.depositAmount.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("depositDate")}
                    onCancel={() =>
                      setFormData({ ...formData, depositAmount: 0 })
                    }
                    labelText="Deposit Amount"
                    tooltipText="Enter deposit amount"
                    required
                  />
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.depositDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("depositDate")}
                    type="date"
                    id="depositDate"
                    name="depositDate"
                    value={formData.depositDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("exchangeRate")}
                    onCancel={() =>
                      setFormData({ ...formData, depositDate: "" })
                    }
                    labelText="Deposit Date"
                    tooltipText="Select deposit date"
                    required
                  />
                </div>
              )}

              {permissionsFields.exchangeRate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("exchangeRate")}
                    type="number"
                    step="0.01"
                    id="exchangeRate"
                    name="exchangeRate"
                    value={formData.exchangeRate.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("localAmount")}
                    onCancel={() =>
                      setFormData({ ...formData, exchangeRate: 0 })
                    }
                    labelText="Exchange Rate"
                    tooltipText="Enter exchange rate"
                    required
                  />
                </div>
              )}

              {permissionsFields.localAmount && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("localAmount")}
                    type="number"
                    id="localAmount"
                    name="localAmount"
                    value={formData.localAmount.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, localAmount: 0 })
                    }
                    labelText="Local Amount"
                    tooltipText="Enter local amount"
                    required
                  />
                </div>
              )}

              {permissionsFields.isDefault && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      focusNextInput("isDraft");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("isDraft");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
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
              )}
            </div>

            {/* System Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDraftState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: newValue,
                      }));
                      focusNextInput("submitButton");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("submitButton");
                      }
                    }}
                    placeholder=" "
                    labelText="Draft"
                    className="relative"
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
              )}
            </div>
          </form>
        </div>
      </PageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Form"
        message="Are you sure you want to reset the form? All changes will be lost."
        confirmText="Reset"
        cancelText="Cancel"
      />

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
