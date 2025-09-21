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
import PDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import countryDetailPrintContent from "@/lib/printContents/countryDetails";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { useNavigate, useParams } from "react-router-dom";

// Define Employee interface
interface EmployeeData {
  employeeName: string;
  email: string;
  phone?: string;
  department?: string;
  designation?: string;
  salary?: number;
  joiningDate?: Date;
  manager?: string;
  location?: string;
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

const initialData: EmployeeData = {
  employeeName: "John Smith",
  email: "john.smith@company.com",
  phone: "+1-555-0101",
  department: "Information Technology",
  designation: "Software Engineer",
  salary: 75000,
  joiningDate: new Date("2023-03-17"),
  manager: "IT Manager",
  location: "San Francisco",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Mock data for dropdowns
const MOCK_DEPARTMENTS = [
  "Executive",
  "Human Resources",
  "Information Technology",
  "Marketing",
  "Sales",
  "Operations",
  "Research & Development",
  "Legal",
  "Customer Service",
  "Quality Assurance",
  "Supply Chain",
  "Training & Development",
  "Security",
  "Facilities Management",
  "Communications",
  "Analytics",
];

const MOCK_DESIGNATIONS = [
  "Chief Executive Officer",
  "HR Manager",
  "Software Engineer",
  "Marketing Specialist",
  "Sales Representative",
  "Operations Manager",
  "Research Scientist",
  "Legal Counsel",
  "Customer Service Rep",
  "QA Analyst",
  "Supply Chain Coordinator",
  "Training Specialist",
  "Security Officer",
  "Facilities Technician",
  "Communications Coordinator",
  "Data Analyst",
];

const MOCK_LOCATIONS = [
  "New York",
  "San Francisco",
  "Los Angeles",
  "Chicago",
  "Boston",
  "Washington DC",
  "Austin",
  "Seattle",
  "Denver",
  "Miami",
  "Phoenix",
  "Portland",
  "Atlanta",
  "Dallas",
];

export default function EmployeeEditPage({ isEdit = true }: Props) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const employeeNameInputRef = useRef<EditableInputRef>(null);
  const emailInputRef = useRef<EditableInputRef>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const departmentInputRef = useRef<HTMLInputElement>(null);
  const designationInputRef = useRef<HTMLInputElement>(null);
  const salaryInputRef = useRef<HTMLInputElement>(null);
  const managerInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
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
  const [formData, setFormData] = useState<EmployeeData>({
    employeeName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: 0,
    joiningDate: new Date(),
    manager: "",
    location: "",
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

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "employeeName":
        emailInputRef.current?.focus();
        break;
      case "email":
        phoneInputRef.current?.focus();
        break;
      case "phone":
        departmentInputRef.current?.focus();
        break;
      case "department":
        designationInputRef.current?.focus();
        break;
      case "designation":
        salaryInputRef.current?.focus();
        break;
      case "salary":
        managerInputRef.current?.focus();
        break;
      case "manager":
        locationInputRef.current?.focus();
        break;
      case "location":
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
        employeeName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: 0,
        joiningDate: new Date(),
        manager: "",
        location: "",
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

  const handlePrintEmployee = (employeeData: any) => {
    try {
      const html = countryDetailPrintContent([employeeData]);
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
      setTimeout(() => handlePrintEmployee(formData), 100);
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
      console.log("employeeData on pdf click", formData);
      const blob = await pdf(
        <PDF
          data={[formData]}
          title="Employee Details"
          subtitle="Employee Information Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "employee-details.pdf";
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
        title={isEdit ? t("form.editingEmployee") : t("form.creatingEmployee")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/employee"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/employee/create");
              } else {
                // Navigate to edit page
                navigate("/employee/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/employee/view");
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
          {/* First Row: Employee Name, Email, Phone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Employee Name</h3>
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
              <h3 className="font-medium mb-1">Email</h3>
              <EditableInput
                ref={emailInputRef}
                id="email"
                name="email"
                className="w-full h-10"
                value={formData.email}
                onChange={handleChange}
                onNext={() => focusNextInput("email")}
                onCancel={() => {}}
                tooltipText="Please enter employee email"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Phone</h3>
              <input
                ref={phoneInputRef}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number..."
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("phone");
                  }
                }}
              />
            </div>
          </div>

          {/* Second Row: Department, Designation, Salary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Department</h3>
              <Autocomplete
                ref={departmentInputRef}
                data={MOCK_DEPARTMENTS}
                value={formData.department}
                onChange={(value) => {
                  setFormData({ ...formData, department: value });
                }}
                placeholder="Select a department..."
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

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Designation</h3>
              <Autocomplete
                ref={designationInputRef}
                data={MOCK_DESIGNATIONS}
                value={formData.designation}
                onChange={(value) => {
                  setFormData({ ...formData, designation: value });
                }}
                placeholder="Select a designation..."
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
                    focusNextInput("designation");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Salary</h3>
              <input
                ref={salaryInputRef}
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter salary..."
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                step="1000"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("salary");
                  }
                }}
              />
            </div>
          </div>

          {/* Third Row: Manager, Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Manager</h3>
              <input
                ref={managerInputRef}
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                placeholder="Enter manager name..."
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("manager");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Location</h3>
              <Autocomplete
                ref={locationInputRef}
                data={MOCK_LOCATIONS}
                value={formData.location}
                onChange={(value) => {
                  setFormData({ ...formData, location: value });
                }}
                placeholder="Select a location..."
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
                    focusNextInput("location");
                  }
                }}
              />
            </div>
          </div>

          {/* Fourth Row: Default, Draft, Active, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 space-y-2">
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
            <div className="md:col-span-3 space-y-2">
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
            <div className="md:col-span-3 space-y-2">
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
            <div className="md:col-span-3 space-y-2">
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

          {/* Fifth Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p>{getRelativeTime(formData.createdAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{getRelativeTime(formData.updatedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{getRelativeTime(formData.draftedAt)}</p>
            </div>
            <div className="md:col-span-3">
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
        title="Employee Name Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Employee translations saved:", data);
        }}
      />
    </>
  );
}
