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

type TasksData = {
  subject: string;
  hourlyRate: number;
  startDate: string;
  dueDate: string;
  priority: string;
  repeatEvery: string;
  relatedTo: string;
  assignees: string;
  followers: string;
  checklist: string;
  tags: string;
  description: string;
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

const initialData: TasksData = {
  subject: "Website Redesign",
  hourlyRate: 50,
  startDate: "2024-01-15",
  dueDate: "2024-02-15",
  priority: "High",
  repeatEvery: "Never",
  relatedTo: "Project A",
  assignees: "John Doe",
  followers: "Jane Smith",
  checklist: "Design mockups, Frontend dev, Testing",
  tags: "Design, Frontend",
  description: "Complete website redesign for client",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function TasksFormPage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("tasks", "create");
  const canView = usePermission("tasks", "view");
  const canEdit = usePermission("tasks", "edit");
  const canDelete = usePermission("tasks", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof TasksData>("tasks", "create", [
    "subject",
    "hourlyRate",
    "startDate",
    "dueDate",
    "priority",
    "repeatEvery",
    "relatedTo",
    "assignees",
    "followers",
    "checklist",
    "tags",
    "description",
    "isDefault",
    "isDraft",
  ]);

  const canPdf: boolean = usePermission("tasks", "pdf");
  const canPrint: boolean = usePermission("tasks", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const priorityOptions = ["High", "Medium", "Low"];
  const repeatOptions = ["Never", "Daily", "Weekly", "Monthly", "Quarterly"];
  const projectOptions = [
    "Project A",
    "Project B",
    "Project C",
    "System Upgrade",
    "Mobile Project",
    "API Project",
    "Security",
    "Performance",
    "Training",
    "Development",
    "Operations",
    "Product",
    "Maintenance",
    "DevOps",
    "Quality Assurance",
    "Documentation",
  ];

  // Form state
  const [formData, setFormData] = useState<TasksData>({
    subject: "",
    hourlyRate: 0,
    startDate: "",
    dueDate: "",
    priority: "",
    repeatEvery: "",
    relatedTo: "",
    assignees: "",
    followers: "",
    checklist: "",
    tags: "",
    description: "",
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
          navigate("/tasks/create");
        } else {
          navigate("/tasks/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/tasks/view");
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
      handlePrintTasks(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Task created successfully!");
      handleReset();
    } else {
      toastSuccess("Task created successfully!");
      navigate("/tasks");
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
      subject: "",
      hourlyRate: 0,
      startDate: "",
      dueDate: "",
      priority: "",
      repeatEvery: "",
      relatedTo: "",
      assignees: "",
      followers: "",
      checklist: "",
      tags: "",
      description: "",
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
      inputRefs.current["subject"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintTasks = (tasksData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Task Details",
        data: [tasksData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          subject: "Subject",
          hourlyRate: "Hourly Rate",
          startDate: "Start Date",
          dueDate: "Due Date",
          priority: "Priority",
          repeatEvery: "Repeat Every",
          relatedTo: "Related To",
          assignees: "Assignees",
          followers: "Followers",
          checklist: "Checklist",
          tags: "Tags",
          description: "Description",
          isDefault: "Default Task",
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
      console.log("sampleReceivingData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Task Details"
          subtitle="Task Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "task-details.pdf";
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
              toastRestore("Task saved as draft successfully");
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
        title={isEdit ? "Editing Task" : "Creating Task"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="tasks"
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
            {/* Basic Task Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.subject && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("subject")}
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onNext={() => focusNextInput("hourlyRate")}
                    onCancel={() => setFormData({ ...formData, subject: "" })}
                    labelText="Subject"
                    tooltipText="Enter task subject"
                    required
                  />
                </div>
              )}

              {permissionsFields.hourlyRate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("hourlyRate")}
                    type="number"
                    id="hourlyRate"
                    name="hourlyRate"
                    value={formData.hourlyRate.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("startDate")}
                    onCancel={() => setFormData({ ...formData, hourlyRate: 0 })}
                    labelText="Hourly Rate"
                    tooltipText="Enter hourly rate"
                    required
                  />
                </div>
              )}

              {permissionsFields.startDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("startDate")}
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("dueDate")}
                    onCancel={() => setFormData({ ...formData, startDate: "" })}
                    labelText="Start Date"
                    tooltipText="Select start date"
                    required
                  />
                </div>
              )}

              {permissionsFields.dueDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("dueDate")}
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("priority")}
                    onCancel={() => setFormData({ ...formData, dueDate: "" })}
                    labelText="Due Date"
                    tooltipText="Select due date"
                    required
                  />
                </div>
              )}
            </div>

            {/* Task Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.priority && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("priority")(el)}
                    id="priority"
                    name="priority"
                    options={priorityOptions}
                    value={formData.priority}
                    labelClassName="rounded-lg"
                 
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        priority: value,
                      }));
                      focusNextInput("repeatEvery");
                    }}
                    onEnterPress={() => {
                      if (formData.priority) {
                        focusNextInput("repeatEvery");
                      }
                    }}
                    placeholder=" "
                    labelText="Priority"
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

              {permissionsFields.repeatEvery && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("repeatEvery")(el)}
                    id="repeatEvery"
                    name="repeatEvery"
                    options={repeatOptions}
                    value={formData.repeatEvery}
                    labelClassName="rounded-lg"
            
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        repeatEvery: value,
                      }));
                      focusNextInput("relatedTo");
                    }}
                    onEnterPress={() => {
                      if (formData.repeatEvery) {
                        focusNextInput("relatedTo");
                      }
                    }}
                    placeholder=" "
                    labelText="Repeat Every"
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

              {permissionsFields.relatedTo && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("relatedTo")(el)}
                    id="relatedTo"
                    name="relatedTo"
                    allowCustomInput={true}
                    options={projectOptions}
                    value={formData.relatedTo}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        relatedTo: value,
                      }));
                      focusNextInput("assignees");
                    }}
                    onEnterPress={() => {
                      if (formData.relatedTo) {
                        focusNextInput("assignees");
                      }
                    }}
                    placeholder=" "
                    labelText="Related To"
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

              {permissionsFields.assignees && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("assignees")}
                    id="assignees"
                    name="assignees"
                    value={formData.assignees}
                    onChange={handleChange}
                    onNext={() => focusNextInput("followers")}
                    onCancel={() => setFormData({ ...formData, assignees: "" })}
                    labelText="Assignees"
                    tooltipText="Enter assignees"
                    required
                  />
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.followers && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("followers")}
                    id="followers"
                    name="followers"
                    value={formData.followers}
                    onChange={handleChange}
                    onNext={() => focusNextInput("checklist")}
                    onCancel={() => setFormData({ ...formData, followers: "" })}
                    labelText="Followers"
                    tooltipText="Enter followers"
                    required
                  />
                </div>
              )}

              {permissionsFields.checklist && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("checklist")}
                    id="checklist"
                    name="checklist"
                    value={formData.checklist}
                    onChange={handleChange}
                    onNext={() => focusNextInput("tags")}
                    onCancel={() => setFormData({ ...formData, checklist: "" })}
                    labelText="Checklist"
                    tooltipText="Enter checklist items"
                    required
                  />
                </div>
              )}

              {permissionsFields.tags && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("tags")}
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, tags: "" })}
                    labelText="Tags"
                    tooltipText="Enter tags"
                    required
                  />
                </div>
              )}

              {permissionsFields.description && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter task description"
                    required
                  />
                </div>
              )}
            </div>

            {/* System Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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
