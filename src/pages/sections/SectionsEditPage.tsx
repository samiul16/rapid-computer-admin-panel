/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import StatusDateDisplay from "@/components/common/create-page-components/StatusDateDisplay";
import ToggleStatusControls from "@/components/common/create-page-components/ToggleStatusControls";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { Button } from "@/components/ui/button";
import { Select } from "@mantine/core";

import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  isEdit?: boolean;
};

type FormType = {
  name: string;
  code: string;
  type: "Kitchen" | "Dining" | "POS" | "Bar" | "Inventory";
  description: string;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
};

export const initialFormData: FormType = {
  name: "Dining Area A",
  code: "DIN-A",
  type: "Dining",
  description: "Main seating area for customers",

  createdAt: new Date("2025-07-01T10:00:00Z"),
  draftedAt: null,
  updatedAt: new Date("2025-07-05T14:30:00Z"),
  deletedAt: null,
  isDeleted: false,

  isDefault: true,
  isActive: true,
  isDraft: false,
};

const SectionTypeData = [
  { value: "Kitchen", label: "Kitchen", id: "kitchen" },
  { value: "Dining", label: "Dining", id: "dining" },
  { value: "POS", label: "POS", id: "pos" },
  { value: "Bar", label: "Bar", id: "bar" },
  { value: "Inventory", label: "Inventory", id: "inventory" },
];

export default function SectionsEditPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormType>({
    name: "",
    code: "",
    type: "Dining",
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
        name: "",
        code: "",
        type: "Dining",
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

  const handlePrint = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Section Report",
        data: printData,
        fieldLabels: {
          name: "Name",
          code: "Code",
          type: "Type",
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
          title="Section Details"
          subtitle="Section Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "section-details.pdf";
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
        title={isEdit ? t("form.editingSection") : t("form.creatingSection")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/sections"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/sections/create");
              } else {
                // Navigate to edit page
                navigate("/sections/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/sections/view");
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
                type="text"
                id="code"
                name="code"
                className="w-full h-10"
                value={formData.code ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("name")}
                setRef={setRef("code")}
                tooltipText="Please enter code"
                required
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.sectionName")}</h3>
              <EditableInput
                type="text"
                id="name"
                name="name"
                className="w-full h-10"
                value={formData.name ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("type")}
                setRef={setRef("name")}
                tooltipText="Please enter section name"
                required
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.sectionType")}</h3>
              <Select
                ref={(el) => setRef("type")(el as HTMLElement)}
                id="type"
                name="type"
                className="w-full h-10"
                value={formData.type}
                onChange={(value) => {
                  // Only update if the value is one of the allowed types
                  if (
                    value === "Kitchen" ||
                    value === "Dining" ||
                    value === "POS" ||
                    value === "Bar" ||
                    value === "Inventory"
                  ) {
                    setFormData({
                      ...formData,
                      type: value,
                    });
                    focusNextInput("description");
                  }
                }}
                data={SectionTypeData.map((item) => ({
                  value: item.value,
                  label: item.label,
                  id: item.id,
                }))}
                placeholder="Select a section type..."
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
                onNext={() => focusNextInput("isDefault")}
                setRef={setRef("description")}
                tooltipText="Please enter description"
                required
              />
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
