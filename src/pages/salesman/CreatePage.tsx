/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";

// Define Salesman interface to ensure type consistency
interface Salesman {
  id: string;
  code: string;
  name: string;
  description: string;
  commission: number;
  territory: string;
  experience: string;
  department: string;
  manager: string;
  phone: string;
  email: string;
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

const initialData: Salesman = {
  id: "1",
  code: "S001",
  name: "John Smith",
  description: "Senior sales representative specializing in enterprise clients",
  commission: 8.5,
  territory: "North Region",
  experience: "5+ years",
  department: "Enterprise Sales",
  manager: "Sarah Johnson",
  phone: "+1-555-0123",
  email: "john.smith@company.com",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function SalesmanFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const codeInputRef = useRef<EditableInputRef>(null);
  const nameInputRef = useRef<EditableInputRef>(null);
  const commissionInputRef = useRef<EditableInputRef>(null);
  const phoneInputRef = useRef<EditableInputRef>(null);
  const emailInputRef = useRef<EditableInputRef>(null);
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
  const [formData, setFormData] = useState<Salesman>({
    id: "",
    code: "",
    name: "",
    description: "",
    commission: 0,
    territory: "",
    experience: "",
    department: "",
    manager: "",
    phone: "",
    email: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Update translation data when salesman name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.name || "", arabic: "", bangla: "" },
    ]);
  }, [formData.name]);

  // Territory options
  const TERRITORIES = [
    "North Region",
    "South Region",
    "East Region",
    "West Region",
    "Central Region",
    "Southwest Region",
    "Northwest Region",
    "Online Channel",
    "Hispanic Markets",
    "Corporate Accounts",
    "Rural Areas",
    "Technical Markets",
    "International",
    "Channel Partners",
    "Inside Sales",
    "Government Sector",
    "Training Division",
  ];

  // Experience options
  const EXPERIENCE_LEVELS = [
    "1+ year",
    "2+ years",
    "3+ years",
    "4+ years",
    "5+ years",
    "6+ years",
    "7+ years",
    "8+ years",
    "9+ years",
    "10+ years",
  ];

  // Department options
  const DEPARTMENTS = [
    "Enterprise Sales",
    "Retail Sales",
    "Tech Sales",
    "Key Accounts",
    "Regional Sales",
    "B2B Sales",
    "Junior Sales",
    "E-commerce Sales",
    "Market Segments",
    "Corporate Sales",
    "Field Sales",
    "Product Sales",
    "Global Sales",
    "Channel Sales",
    "Inside Sales",
    "Government Sales",
    "Sales Training",
  ];

  // Manager options
  const MANAGERS = [
    "Sarah Johnson",
    "Mike Davis",
    "Lisa Wong",
    "Robert Brown",
    "Jennifer Lee",
    "Tom Wilson",
    "Maria Garcia",
    "Kevin Anderson",
    "Patricia White",
    "Steven Clark",
    "Nancy Lewis",
    "Daniel Miller",
    "Christine Davis",
    "Andrew Wilson",
    "Michelle Brown",
    "Richard Taylor",
    "Elizabeth Martinez",
  ];

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "code":
        nameInputRef.current?.focus();
        break;
      case "name": {
        // Focus on the commission input
        commissionInputRef.current?.focus();
        break;
      }
      case "commission": {
        // Focus on territory autocomplete
        const territoryInput = document.querySelector(
          'input[placeholder="Select territory..."]'
        ) as HTMLInputElement;
        territoryInput?.focus();
        break;
      }
      case "territory": {
        // Focus on experience autocomplete
        const experienceInput = document.querySelector(
          'input[placeholder="Select experience..."]'
        ) as HTMLInputElement;
        experienceInput?.focus();
        break;
      }
      case "experience": {
        // Focus on department autocomplete
        const departmentInput = document.querySelector(
          'input[placeholder="Select department..."]'
        ) as HTMLInputElement;
        departmentInput?.focus();
        break;
      }
      case "department": {
        // Focus on manager autocomplete
        const managerInput = document.querySelector(
          'input[placeholder="Select manager..."]'
        ) as HTMLInputElement;
        managerInput?.focus();
        break;
      }
      case "manager":
        phoneInputRef.current?.focus();
        break;
      case "phone":
        emailInputRef.current?.focus();
        break;
      case "email": {
        // Focus on description field
        const descInput = document.querySelector(
          'input[name="description"]'
        ) as HTMLInputElement;
        descInput?.focus();
        break;
      }
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
        code: "",
        name: "",
        description: "",
        commission: 0,
        territory: "",
        experience: "",
        department: "",
        manager: "",
        phone: "",
        email: "",
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

  const handlePrintSalesman = (salesmanData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Salesman Details",
        data: [salesmanData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Salesman Code",
          name: "Salesman Name",
          description: "Description",
          commission: "Commission Rate",
          territory: "Territory",
          experience: "Experience",
          department: "Department",
          manager: "Manager",
          phone: "Phone Number",
          email: "Email Address",
          isDefault: "Default Salesman",
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
      setTimeout(() => handlePrintSalesman(formData), 100);
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
      console.log("salesmanData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Salesman Details"
          subtitle="Salesman Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "salesman-details.pdf";
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
        title={isEdit ? t("form.editingSalesman") : t("form.creatingSalesman")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/salesman"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/salesman/create");
              } else {
                // Navigate to edit page
                navigate("/salesman/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/salesman/view");
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
          {/* First Row: Code, Name, Commission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.code")}</h3>
              <EditableInput
                ref={codeInputRef}
                id="code"
                name="code"
                className="w-full h-10"
                value={formData.code}
                onChange={handleChange}
                maxLength={10}
                onNext={() => focusNextInput("code")}
                onCancel={() => {}}
                tooltipText="Please enter salesman code (e.g., S001, S002)"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.salesmanName")}</h3>
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
                tooltipText="Please enter salesman name"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.commission")}</h3>
              <EditableInput
                ref={commissionInputRef}
                id="commission"
                name="commission"
                type="number"
                className="w-full h-10"
                value={formData.commission.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("commission")}
                onCancel={() => {}}
                tooltipText="Please enter commission rate (e.g., 8.5 for 8.5%)"
                required
              />
            </div>
          </div>

          {/* Second Row: Territory, Experience, Department */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.territory")}</h3>
              <Autocomplete
                data={TERRITORIES}
                value={formData.territory}
                onChange={(value) => {
                  setFormData({ ...formData, territory: value });
                }}
                placeholder="Select territory..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("territory");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.experience")}</h3>
              <Autocomplete
                data={EXPERIENCE_LEVELS}
                value={formData.experience}
                onChange={(value) => {
                  setFormData({ ...formData, experience: value });
                }}
                placeholder="Select experience..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("experience");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.department")}</h3>
              <Autocomplete
                data={DEPARTMENTS}
                value={formData.department}
                onChange={(value) => {
                  setFormData({ ...formData, department: value });
                }}
                placeholder="Select department..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("department");
                  }
                }}
              />
            </div>
          </div>

          {/* Third Row: Manager, Phone, Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.manager")}</h3>
              <Autocomplete
                data={MANAGERS}
                value={formData.manager}
                onChange={(value) => {
                  setFormData({ ...formData, manager: value });
                }}
                placeholder="Select manager..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("manager");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.phone")}</h3>
              <EditableInput
                ref={phoneInputRef}
                id="phone"
                name="phone"
                className="w-full h-10"
                value={formData.phone}
                onChange={handleChange}
                onNext={() => focusNextInput("phone")}
                onCancel={() => {}}
                tooltipText="Please enter phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.email")}</h3>
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
                required
              />
            </div>
          </div>

          {/* Fourth Row: Description */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.description")}</h3>
              <EditableInput
                id="description"
                name="description"
                className="w-full h-10"
                value={formData.description}
                onChange={handleChange}
                onNext={() => focusNextInput("description")}
                onCancel={() => {}}
                tooltipText="Please enter salesman description"
              />
            </div>
          </div>

          {/* Fifth Row: Default, Draft, Active, Delete */}
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
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Salesman Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Salesman translations saved:", data);
        }}
      />
    </>
  );
}
