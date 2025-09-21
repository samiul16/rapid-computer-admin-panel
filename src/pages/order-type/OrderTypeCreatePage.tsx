/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import StatusDateDisplay from "@/components/common/create-page-components/StatusDateDisplay";
import ToggleStatusControls from "@/components/common/create-page-components/ToggleStatusControls";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import { Button } from "@/components/ui/button";

import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Select } from "@mantine/core";

type Props = {
  isEdit?: boolean;
};

type FormType = {
  typeName: "Delivery" | "Pickup" | "Dine-in";
  description: string;
  customerId: string;
  requiresDeliveryman: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
};

const OrderTypeData = [
  { value: "Delivery", label: "Delivery", id: "delivery" },
  { value: "Pickup", label: "Pickup", id: "pickup" },
  { value: "Dine-in", label: "Dine-in", id: "dine-in" },
];

const customerIdList = [
  { value: "cus-001", label: "Customer 1", id: "cus-001" },
  { value: "cus-002", label: "Customer 2", id: "cus-002" },
  { value: "cus-003", label: "Customer 3", id: "cus-003" },
];

export const initialFormData: FormType = {
  typeName: "Delivery",
  description: "Popular sportswear brand",
  customerId: "cus-001",
  requiresDeliveryman: true,

  createdAt: new Date("2025-07-01T10:00:00Z"),
  draftedAt: null,
  updatedAt: new Date("2025-07-05T14:30:00Z"),
  deletedAt: null,
  isDeleted: false,

  isDefault: true,
  isActive: true,
  isDraft: false,
};

export default function OrderTypeCreatePage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormType>({
    typeName: "Delivery",
    description: "",
    customerId: "",
    requiresDeliveryman: false,

    isDefault: false,
    isActive: true,
    isDraft: false,

    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

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
    if (isEdit && initialFormData) {
      setFormData({
        ...initialFormData,
      });
    }
  }, [isEdit]);

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
        typeName: "Delivery",
        description: "",
        customerId: "",
        requiresDeliveryman: false,
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

  const handlePrint = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Order Type Report",
        data: printData,
        fieldLabels: {
          typeName: "Type Name",
          description: "Description",
          customerId: "Customer ID",
          requiresDeliveryman: "Requires Deliveryman",
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
      setTimeout(() => handlePrint(formData), 100);
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
      console.log("pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Order Type Details"
          subtitle="Order Type Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "order-type-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  // Add this function to handle key navigation for switches and buttons
  const handleSwitchKeyDown = (
    e: React.KeyboardEvent,
    currentField: string,
    nextField?: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      // Map field names to their corresponding state properties and toggle functions
      const fieldHandlers: Record<string, () => void> = {
        requiresDeliveryman: () =>
          setFormData((prev) => ({
            ...prev,
            requiresDeliveryman: !prev.requiresDeliveryman,
          })),
      };

      // Execute the handler if it exists
      const handler = fieldHandlers[currentField];
      if (handler) {
        handler();
        // Move to next field after a short delay
        setTimeout(
          () => focusNextInput(nextField ? nextField : currentField),
          50
        );
      }
    }
  };

  return (
    <>
      <PageLayout
        title={
          isEdit ? t("form.editingOrderType") : t("form.creatingOrderType")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/order-type"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/order-type/create");
              } else {
                // Navigate to edit page
                navigate("/order-type/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/order-type/view");
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
              <h3 className="font-medium mb-1">{t("form.orderType")}</h3>
              <Select
                ref={(el) => setRef("typeName")(el as HTMLElement)}
                id="typeName"
                name="typeName"
                className="w-full h-10"
                value={formData.typeName}
                onChange={(value) => {
                  // Only update if the value is one of the allowed types
                  if (
                    value === "Delivery" ||
                    value === "Pickup" ||
                    value === "Dine-in"
                  ) {
                    setFormData({
                      ...formData,
                      typeName: value,
                    });
                    focusNextInput("customerId");
                  }
                }}
                data={OrderTypeData.map((item) => ({
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
                    focusNextInput("customerId");
                  }
                }}
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.customerId")}</h3>
              <Select
                ref={(el) => setRef("customerId")(el as HTMLElement)}
                id="customerId"
                name="customerId"
                className="w-full h-10"
                value={formData.customerId}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    customerId: value || "",
                  });
                  // Call focusNextInput if needed
                  focusNextInput("description");
                }}
                data={customerIdList.map((item) => ({
                  value: item.value,
                  label: item.label,
                  id: item.id,
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
                    focusNextInput("description");
                  }
                }}
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.description")}</h3>
              <EditableInput
                type="text"
                id="description"
                name="description"
                className="w-full h-10"
                value={formData.description ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("requiresDeliveryman")}
                setRef={setRef("description")}
                tooltipText="Please enter description"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">
                {t("form.requiresDeliveryman")}
              </h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={(el) => setRef("requiresDeliveryman")(el as HTMLElement)}
                  id="requiresDeliveryman"
                  name="requiresDeliveryman"
                  checked={formData.requiresDeliveryman}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      requiresDeliveryman: checked,
                    }))
                  }
                  onKeyDown={(e) =>
                    handleSwitchKeyDown(e, "requiresDeliveryman", "isDefault")
                  }
                />
              </div>
            </div>
          </div>

          {/* Second Row: Default, Draft, Active, Delete */}
          <ToggleStatusControls
            formData={formData}
            setFormData={setFormData}
            focusNextInput={focusNextInput}
            setRef={setRef}
          />

          {/* Third Row: Dates */}
          <StatusDateDisplay formData={formData} />
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
