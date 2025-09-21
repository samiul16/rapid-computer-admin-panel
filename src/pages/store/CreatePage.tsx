/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
// Removed Autocomplete import - not needed for store form
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { useNavigate } from "react-router-dom";

// Define Store interface to ensure type consistency
interface Store {
  id: string;
  storeCode: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
  manager: string;
  capacity: number;
  storeType: string;
  storeImage: string;
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

const initialData: Store = {
  id: "1",
  storeCode: "STR001",
  name: "Downtown Restaurant",
  phone: "+1-555-0101",
  email: "downtown@restaurant.com",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  country: "USA",
  postCode: "10001",
  manager: "John Smith",
  capacity: 150,
  storeType: "Fine Dining",
  storeImage: "",
  description: "Premium downtown restaurant with elegant atmosphere",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Mock data not needed for store form

export default function StoreFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const storeCodeInputRef = useRef<EditableInputRef>(null);
  const nameInputRef = useRef<EditableInputRef>(null);
  const phoneInputRef = useRef<EditableInputRef>(null);
  const emailInputRef = useRef<EditableInputRef>(null);
  const addressInputRef = useRef<EditableInputRef>(null);
  const cityInputRef = useRef<EditableInputRef>(null);
  const stateInputRef = useRef<EditableInputRef>(null);
  const countryInputRef = useRef<EditableInputRef>(null);
  const postCodeInputRef = useRef<EditableInputRef>(null);
  const managerInputRef = useRef<EditableInputRef>(null);
  const capacityInputRef = useRef<EditableInputRef>(null);
  const storeTypeInputRef = useRef<EditableInputRef>(null);
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
  const [formData, setFormData] = useState<Store>({
    id: "",
    storeCode: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postCode: "",
    manager: "",
    capacity: 0,
    storeType: "",
    storeImage: "",
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

  // Store form doesn't need filtered options

  // Update translation data when store name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.name || "", arabic: "", bangla: "" },
    ]);
  }, [formData.name]);

  // Store form doesn't need country/state/city filtering
  // These useEffect hooks are removed for store interface

  // Update the focusNextInput function for store form fields
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "storeCode":
        nameInputRef.current?.focus();
        break;
      case "name":
        phoneInputRef.current?.focus();
        break;
      case "phone":
        emailInputRef.current?.focus();
        break;
      case "email":
        addressInputRef.current?.focus();
        break;
      case "address":
        cityInputRef.current?.focus();
        break;
      case "city":
        stateInputRef.current?.focus();
        break;
      case "state":
        countryInputRef.current?.focus();
        break;
      case "country":
        postCodeInputRef.current?.focus();
        break;
      case "postCode":
        managerInputRef.current?.focus();
        break;
      case "manager":
        capacityInputRef.current?.focus();
        break;
      case "capacity":
        storeTypeInputRef.current?.focus();
        break;
      case "storeType":
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
        storeCode: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postCode: "",
        manager: "",
        capacity: 0,
        storeType: "",
        storeImage: "",
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

  const handlePrintStore = (storeData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Store Details",
        data: [storeData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          storeCode: "Store Code",
          name: "Store Name",
          phone: "Phone",
          email: "Email",
          address: "Address",
          city: "City",
          state: "State",
          country: "Country",
          postCode: "Post Code",
          manager: "Manager",
          capacity: "Capacity",
          storeType: "Store Type",
          storeImage: "Store Image",
          description: "Description",
          isDefault: "Default Store",
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
      setTimeout(() => handlePrintStore(formData), 100);
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
      console.log("storeData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Store Details"
          subtitle="Store Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "store-details.pdf";
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
        title={isEdit ? t("form.editingStore") : t("form.creatingStore")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/store"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/store/create");
              } else {
                // Navigate to edit page
                navigate("/store/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/store/view");
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
          {/* First Row: Store Code, Store Name, Arabic Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.storeCode")}</h3>
              <EditableInput
                ref={storeCodeInputRef}
                id="storeCode"
                name="storeCode"
                className="w-full h-10"
                value={formData.storeCode}
                onChange={handleChange}
                maxLength={10}
                onNext={() => focusNextInput("storeCode")}
                onCancel={() => {}}
                tooltipText="Please enter store code (e.g., STR001)"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Store Name</h3>
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
                tooltipText="Please enter store name"
                required
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Phone</h3>
              <EditableInput
                ref={phoneInputRef}
                id="phone"
                name="phone"
                type="tel"
                className="w-full h-10"
                value={formData.phone}
                onChange={handleChange}
                onNext={() => focusNextInput("phone")}
                onCancel={() => {}}
                tooltipText="Please enter phone number"
              />
            </div>
          </div>

          {/* Second Row: Phone, Email, Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Email</h3>
              <EditableInput
                ref={emailInputRef}
                id="email"
                name="email"
                type="email"
                className="w-full h-10"
                value={formData.email}
                onChange={handleChange}
                onNext={() => focusNextInput("email")}
                onCancel={() => {}}
                tooltipText="Please enter email address"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Address</h3>
              <EditableInput
                ref={addressInputRef}
                id="address"
                name="address"
                className="w-full h-10"
                value={formData.address}
                onChange={handleChange}
                onNext={() => focusNextInput("address")}
                onCancel={() => {}}
                tooltipText="Please enter address"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">City</h3>
              <EditableInput
                ref={cityInputRef}
                id="city"
                name="city"
                className="w-full h-10"
                value={formData.city}
                onChange={handleChange}
                onNext={() => focusNextInput("city")}
                onCancel={() => {}}
                tooltipText="Please enter city"
              />
            </div>
          </div>

          {/* Third Row: City, State, Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">State</h3>
              <EditableInput
                ref={stateInputRef}
                id="state"
                name="state"
                className="w-full h-10"
                value={formData.state}
                onChange={handleChange}
                onNext={() => focusNextInput("state")}
                onCancel={() => {}}
                tooltipText="Please enter state"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Country</h3>
              <EditableInput
                ref={countryInputRef}
                id="country"
                name="country"
                className="w-full h-10"
                value={formData.country}
                onChange={handleChange}
                onNext={() => focusNextInput("country")}
                onCancel={() => {}}
                tooltipText="Please enter country"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Capacity</h3>
              <EditableInput
                ref={capacityInputRef}
                id="capacity"
                name="capacity"
                type="number"
                className="w-full h-10"
                value={formData.capacity.toString()}
                onChange={handleNumericChange}
                onNext={() => focusNextInput("capacity")}
                onCancel={() => {}}
                tooltipText="Please enter store capacity"
              />
            </div>
          </div>

          {/* Fifth Row: Store Type, Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Store Type</h3>
              <EditableInput
                ref={storeTypeInputRef}
                id="storeType"
                name="storeType"
                className="w-full h-10"
                value={formData.storeType}
                onChange={handleChange}
                onNext={() => focusNextInput("storeType")}
                onCancel={() => {}}
                tooltipText="Please enter store type"
              />
            </div>

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
                tooltipText="Please enter store description"
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
        title="Store Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Store translations saved:", data);
        }}
      />
    </>
  );
}
