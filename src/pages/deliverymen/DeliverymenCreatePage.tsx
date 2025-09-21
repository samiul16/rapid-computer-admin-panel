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
import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  isEdit?: boolean;
};

type VehicleType = "Bike" | "Bicycle" | "Car" | "Walk" | "Other";

type FormType = {
  code: string;
  name: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  nationalId?: string;
  vehicleType: VehicleType;
  assignedArea?: string;

  image: string | null;

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
  code: "DM001",
  name: "Rahim Uddin",
  phoneNumber: "01711112222",
  email: "rahim@example.com",
  address: "Mirpur, Dhaka",
  nationalId: "1234567890",
  vehicleType: "Bike",
  assignedArea: "Mirpur",
  image: "/customer-dummy-image.jpg",

  createdAt: new Date("2025-07-01T10:00:00Z"),
  draftedAt: null,
  updatedAt: new Date("2025-07-05T14:30:00Z"),
  deletedAt: null,
  isDeleted: false,

  isDefault: true,
  isActive: true,
  isDraft: false,
};

export default function DeliverymenCreatePage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormType>({
    code: "",
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    nationalId: "",
    vehicleType: "Bike",
    assignedArea: "",
    image: null,

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
        image: null,
      });
      if (initialFormData.image) {
        setImagePreview(initialFormData.image);
      }
    }
  }, [isEdit]);

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
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        nationalId: "",
        vehicleType: "Bike",
        assignedArea: "",
        image: null,

        isDefault: false,
        isActive: true,
        isDraft: false,
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

  const handlePrint = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Deliveryman Report",
        data: printData,
        fieldLabels: {
          code: "Code",
          name: "Name",
          phoneNumber: "Phone Number",
          email: "Email",
          address: "Address",
          nationalId: "National ID",
          vehicleType: "Vehicle Type",
          assignedArea: "Assigned Area",
          image: "Image",
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
          title="Deliveryman Details"
          subtitle="Deliveryman Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deliverymen-details.pdf";
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
          isEdit ? t("form.editingDeliveryman") : t("form.creatingDeliveryman")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/deliverymen"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/deliverymen/create");
              } else {
                // Navigate to edit page
                navigate("/deliverymen/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/deliverymen/view");
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
                value={formData.code}
                onChange={handleChange}
                onNext={() => focusNextInput("name")}
                setRef={setRef("code")}
                tooltipText="Please enter brand code"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.name")}</h3>
              <EditableInput
                type="text"
                id="name"
                name="name"
                className="w-full h-10"
                value={formData.name}
                onChange={handleChange}
                onNext={() => focusNextInput("phoneNumber")}
                setRef={setRef("name")}
                tooltipText="Please enter brand name"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.phone")}</h3>
              <EditableInput
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full h-10"
                value={formData.phoneNumber ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("email")}
                setRef={setRef("phoneNumber")}
                tooltipText="Please enter phone number"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.email")}</h3>
              <EditableInput
                type="email"
                id="email"
                name="email"
                className="w-full h-10"
                value={formData.email ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("address")}
                setRef={setRef("email")}
                tooltipText="Please enter email"
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.address")}</h3>
              <EditableInput
                type="text"
                id="address"
                name="address"
                className="w-full h-10"
                value={formData.address ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("nationalId")}
                setRef={setRef("address")}
                tooltipText="Please enter address"
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.nationalId")}</h3>
              <EditableInput
                type="text"
                id="nationalId"
                name="nationalId"
                className="w-full h-10"
                value={formData.nationalId ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("vehicleType")}
                setRef={setRef("nationalId")}
                tooltipText="Please enter national ID"
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.vehicleType")}</h3>
              <EditableInput
                type="text"
                id="vehicleType"
                name="vehicleType"
                className="w-full h-10"
                value={formData.vehicleType ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("assignedArea")}
                setRef={setRef("vehicleType")}
                tooltipText="Please enter vehicle type"
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.assignedArea")}</h3>
              <EditableInput
                type="text"
                id="assignedArea"
                name="assignedArea"
                className="w-full h-10"
                value={formData.assignedArea ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("isDefault")}
                setRef={setRef("assignedArea")}
                tooltipText="Please enter assigned area"
              />
            </div>
          </div>

          {/* Second Row: Default, Draft, Active, Delete */}
          <ToggleStatusControls
            formData={formData}
            setFormData={setFormData}
            focusNextInput={focusNextInput}
            setRef={setRef}
            lastField="fileUploadElement"
          />

          {/* Third Row: Dates */}
          <StatusDateDisplay formData={formData} />

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
