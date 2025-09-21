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

// Define Promotion interface to ensure type consistency
interface Promotion {
  id: string;
  code: string;
  employeeName: string;
  description: string;
  fromPosition: string;
  toPosition: string;
  fromDepartment: string;
  toDepartment: string;
  fromSalary: number;
  toSalary: number;
  promotionDate: Date;
  effectiveDate: Date;
  reason: string;
  approvedBy: string;
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

const initialData: Promotion = {
  id: "1",
  code: "P001",
  employeeName: "John Smith",
  description: "Promotion to Senior Manager due to exceptional performance",
  fromPosition: "Manager",
  toPosition: "Senior Manager",
  fromDepartment: "Sales",
  toDepartment: "Sales",
  fromSalary: 75000,
  toSalary: 90000,
  promotionDate: new Date("2024-01-15"),
  effectiveDate: new Date("2024-02-01"),
  reason: "Outstanding sales performance and team leadership",
  approvedBy: "Sarah Johnson",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function PromotionFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const codeInputRef = useRef<EditableInputRef>(null);
  const employeeNameInputRef = useRef<EditableInputRef>(null);
  const fromSalaryInputRef = useRef<EditableInputRef>(null);
  const toSalaryInputRef = useRef<EditableInputRef>(null);
  const reasonInputRef = useRef<EditableInputRef>(null);
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
  const [formData, setFormData] = useState<Promotion>({
    id: "",
    code: "",
    employeeName: "",
    description: "",
    fromPosition: "",
    toPosition: "",
    fromDepartment: "",
    toDepartment: "",
    fromSalary: 0,
    toSalary: 0,
    promotionDate: new Date(),
    effectiveDate: new Date(),
    reason: "",
    approvedBy: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Update translation data when employee name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.employeeName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.employeeName]);

  // Position options
  const POSITIONS = [
    "Manager",
    "Senior Manager",
    "Team Lead",
    "Department Head",
    "Store Manager",
    "District Manager",
    "Accountant",
    "Senior Accountant",
    "Business Analyst",
    "Product Manager",
    "HR Specialist",
    "HR Manager",
    "Software Developer",
    "Lead Developer",
    "Operations Manager",
    "Director of Operations",
    "Marketing Coordinator",
    "Senior Marketing Specialist",
    "QA Tester",
    "QA Lead",
    "Country Manager",
    "Regional Director",
    "Customer Support Specialist",
    "Customer Success Manager",
    "Data Analyst",
    "Senior Data Analyst",
    "Legal Assistant",
    "Legal Counsel",
    "Training Coordinator",
    "Training Manager",
    "UX Designer",
    "Senior UX Designer",
    "Security Analyst",
    "Security Manager",
    "Research Analyst",
    "Senior Research Analyst",
  ];

  // Department options
  const DEPARTMENTS = [
    "Sales",
    "Marketing",
    "IT",
    "Customer Service",
    "Operations",
    "Finance",
    "Product",
    "Human Resources",
    "Engineering",
    "Quality Assurance",
    "International",
    "Customer Success",
    "Analytics",
    "Legal",
    "Learning & Development",
    "Design",
    "Information Security",
    "Research & Development",
  ];

  // Approver options
  const APPROVERS = [
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
    "Jason Rodriguez",
    "Ashley Thompson",
    "Christopher Lee",
  ];

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "code":
        employeeNameInputRef.current?.focus();
        break;
      case "employeeName": {
        // Focus on the from position autocomplete
        const fromPositionInput = document.querySelector(
          'input[placeholder="Select from position..."]'
        ) as HTMLInputElement;
        fromPositionInput?.focus();
        break;
      }
      case "fromPosition": {
        // Focus on to position autocomplete
        const toPositionInput = document.querySelector(
          'input[placeholder="Select to position..."]'
        ) as HTMLInputElement;
        toPositionInput?.focus();
        break;
      }
      case "toPosition": {
        // Focus on from department autocomplete
        const fromDepartmentInput = document.querySelector(
          'input[placeholder="Select from department..."]'
        ) as HTMLInputElement;
        fromDepartmentInput?.focus();
        break;
      }
      case "fromDepartment": {
        // Focus on to department autocomplete
        const toDepartmentInput = document.querySelector(
          'input[placeholder="Select to department..."]'
        ) as HTMLInputElement;
        toDepartmentInput?.focus();
        break;
      }
      case "toDepartment":
        fromSalaryInputRef.current?.focus();
        break;
      case "fromSalary":
        toSalaryInputRef.current?.focus();
        break;
      case "toSalary": {
        // Focus on promotion date input
        const promotionDateInput = document.querySelector(
          'input[name="promotionDate"]'
        ) as HTMLInputElement;
        promotionDateInput?.focus();
        break;
      }
      case "promotionDate": {
        // Focus on effective date input
        const effectiveDateInput = document.querySelector(
          'input[name="effectiveDate"]'
        ) as HTMLInputElement;
        effectiveDateInput?.focus();
        break;
      }
      case "effectiveDate": {
        // Focus on approved by autocomplete
        const approvedByInput = document.querySelector(
          'input[placeholder="Select approver..."]'
        ) as HTMLInputElement;
        approvedByInput?.focus();
        break;
      }
      case "approvedBy":
        reasonInputRef.current?.focus();
        break;
      case "reason": {
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
        employeeName: "",
        description: "",
        fromPosition: "",
        toPosition: "",
        fromDepartment: "",
        toDepartment: "",
        fromSalary: 0,
        toSalary: 0,
        promotionDate: new Date(),
        effectiveDate: new Date(),
        reason: "",
        approvedBy: "",
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

  const handlePrintPromotion = (promotionData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Promotion Details",
        data: [promotionData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Promotion Code",
          employeeName: "Employee Name",
          description: "Description",
          fromPosition: "From Position",
          toPosition: "To Position",
          fromDepartment: "From Department",
          toDepartment: "To Department",
          fromSalary: "From Salary",
          toSalary: "To Salary",
          promotionDate: "Promotion Date",
          effectiveDate: "Effective Date",
          reason: "Reason",
          approvedBy: "Approved By",
          isDefault: "Default Promotion",
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
      setTimeout(() => handlePrintPromotion(formData), 100);
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
      console.log("promotionData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Promotion Details"
          subtitle="Promotion Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "promotion-details.pdf";
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
          isEdit ? t("form.editingPromotion") : t("form.creatingPromotion")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/promotion"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/promotion/create");
              } else {
                // Navigate to edit page
                navigate("/promotion/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/promotion/view");
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
          {/* First Row: Code, Employee Name */}
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
                tooltipText="Please enter promotion code (e.g., P001, P002)"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.employeeName")}</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                ref={employeeNameInputRef}
                id="employeeName"
                name="employeeName"
                className="w-full h-10"
                value={formData.employeeName}
                onChange={handleChange}
                onNext={() => focusNextInput("employeeName")}
                onCancel={() => {}}
                tooltipText="Please enter employee name"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.fromPosition")}</h3>
              <Autocomplete
                data={POSITIONS}
                value={formData.fromPosition}
                onChange={(value) => {
                  setFormData({ ...formData, fromPosition: value });
                }}
                placeholder="Select from position..."
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
                    focusNextInput("fromPosition");
                  }
                }}
              />
            </div>
          </div>

          {/* Second Row: From Position, To Position */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.toPosition")}</h3>
              <Autocomplete
                data={POSITIONS}
                value={formData.toPosition}
                onChange={(value) => {
                  setFormData({ ...formData, toPosition: value });
                }}
                placeholder="Select to position..."
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
                    focusNextInput("toPosition");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.fromDepartment")}</h3>
              <Autocomplete
                data={DEPARTMENTS}
                value={formData.fromDepartment}
                onChange={(value) => {
                  setFormData({ ...formData, fromDepartment: value });
                }}
                placeholder="Select from department..."
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
                    focusNextInput("fromDepartment");
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.toDepartment")}</h3>
              <Autocomplete
                data={DEPARTMENTS}
                value={formData.toDepartment}
                onChange={(value) => {
                  setFormData({ ...formData, toDepartment: value });
                }}
                placeholder="Select to department..."
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
                    focusNextInput("toDepartment");
                  }
                }}
              />
            </div>
          </div>

          {/* Third Row: From Department, To Department */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.fromSalary")}</h3>
              <EditableInput
                ref={fromSalaryInputRef}
                id="fromSalary"
                name="fromSalary"
                type="number"
                className="w-full h-10"
                value={formData.fromSalary.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("fromSalary")}
                onCancel={() => {}}
                tooltipText="Please enter current salary"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.toSalary")}</h3>
              <EditableInput
                ref={toSalaryInputRef}
                id="toSalary"
                name="toSalary"
                type="number"
                className="w-full h-10"
                value={formData.toSalary.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("toSalary")}
                onCancel={() => {}}
                tooltipText="Please enter new salary after promotion"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.promotionDate")}</h3>
              <EditableInput
                id="promotionDate"
                name="promotionDate"
                type="date"
                className="w-full h-10"
                value={
                  formData.promotionDate instanceof Date
                    ? formData.promotionDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                onNext={() => focusNextInput("promotionDate")}
                onCancel={() => {}}
                tooltipText="Please select promotion announcement date"
                required
              />
            </div>
          </div>

          {/* Sixth Row: Approved By, Reason */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.effectiveDate")}</h3>
              <EditableInput
                id="effectiveDate"
                name="effectiveDate"
                type="date"
                className="w-full h-10"
                value={
                  formData.effectiveDate instanceof Date
                    ? formData.effectiveDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                onNext={() => focusNextInput("effectiveDate")}
                onCancel={() => {}}
                tooltipText="Please select effective date of promotion"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.approvedBy")}</h3>
              <Autocomplete
                data={APPROVERS}
                value={formData.approvedBy}
                onChange={(value) => {
                  setFormData({ ...formData, approvedBy: value });
                }}
                placeholder="Select approver..."
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
                    focusNextInput("approvedBy");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.reason")}</h3>
              <EditableInput
                ref={reasonInputRef}
                id="reason"
                name="reason"
                className="w-full h-10"
                value={formData.reason}
                onChange={handleChange}
                onNext={() => focusNextInput("reason")}
                onCancel={() => {}}
                tooltipText="Please enter reason for promotion"
                required
              />
            </div>
          </div>

          {/* Seventh Row: Description */}
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
                tooltipText="Please enter promotion description"
              />
            </div>
          </div>

          {/* Eighth Row: Default, Draft, Active, Delete */}
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

          {/* Ninth Row: Dates */}
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
        title="Promotion Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Promotion translations saved:", data);
        }}
      />
    </>
  );
}
