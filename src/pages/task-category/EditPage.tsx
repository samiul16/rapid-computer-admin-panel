/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";

type TaskCategoryData = {
  department: string;
  designation: string;
  task: string;
  description: string;
  // Add multilingual task names
  task_ar?: string;
  task_hi?: string;
  task_ur?: string;
  task_bn?: string;
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

const initialData: TaskCategoryData = {
  department: "Kitchen",
  designation: "Chef",
  task: "Food Preparation",
  description: "Prepare and cook food items according to recipes and standards",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function TaskCategoryEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isActiveState, setIsActiveState] = useState<"Yes" | "No" | string>(
    "No"
  );

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [taskCategoryLanguageValues, setTaskCategoryLanguageValues] = useState<
    Record<string, string>
  >({});

  // Form state
  const [formData, setFormData] = useState<TaskCategoryData>({
    department: "",
    designation: "",
    task: "",
    description: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // get permission
  const canPdf: boolean = usePermission("taskCategory", "pdf");
  const canPrint: boolean = usePermission("taskCategory", "print");

  // Department options for autocomplete
  const departments = [
    "Kitchen",
    "Service",
    "Bar",
    "Storage",
    "Management",
    "Bakery",
    "Dessert",
    "Salad Bar",
    "Grill",
    "Pizza",
    "Sushi",
    "Coffee Shop",
    "Fast Food",
    "Catering",
    "Wine Cellar",
    "Takeaway",
    "VIP Lounge",
    "Outdoor Dining",
    "Buffet",
    "Private Events",
  ];

  // Designation options for autocomplete
  const designations = [
    "Chef",
    "Waiter",
    "Bartender",
    "Storekeeper",
    "Manager",
    "Baker",
    "Pastry Chef",
    "Salad Chef",
    "Grill Chef",
    "Pizza Chef",
    "Sushi Chef",
    "Barista",
    "Fast Food Chef",
    "Catering Manager",
    "Sommelier",
    "Takeaway Staff",
    "VIP Host",
    "Outdoor Staff",
    "Buffet Staff",
    "Event Coordinator",
  ];

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
      // Initialize language values if they exist
      setTaskCategoryLanguageValues({
        ar: initialData.task_ar || "",
        hi: initialData.task_hi || "",
        ur: initialData.task_ur || "",
        bn: initialData.task_bn || "",
      });
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsActiveState(initialData.isActive ? "Yes" : "No");
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
    // Normal submit logic here (API call)

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintTaskCategory(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("department");
    } else {
      navigate("/task-category");
    }
    toastSuccess("Task Category Edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      department: "",
      designation: "",
      task: "",
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
    setIsActiveState("No");
    setTaskCategoryLanguageValues({});

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["department"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintTaskCategory = (taskCategoryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Task Category Details",
        data: [taskCategoryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          department: "Department",
          designation: "Designation",
          task: "Task",
          description: "Description",
          isDefault: "Default Task Category",
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
      console.log("taskCategoryData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Task Category Details"
          subtitle="Task Category Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "task-category-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/task-category/create");
        } else {
          navigate("/task-category/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/task-category/view");
      },
    },
  ]);

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

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
              toastRestore("Task category saved as draft successfully");
            },
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Task Category" : "Creating Task Category"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="task-category"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
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
              className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold! focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:transform focus:scale-105 focus:transition-all focus:duration-300`}
              onClick={() => formRef.current?.requestSubmit()}
            >
              Submit
            </Button>
          </div>
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* First Row: Department, Designation, Task, Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("department")(el)}
                  id="department"
                  name="department"
                  allowCustomInput={true}
                  options={departments}
                  value={formData.department}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, department: value });
                    focusNextInput("designation");
                  }}
                  onEnterPress={() => {
                    if (formData.department) {
                      focusNextInput("designation");
                    }
                  }}
                  placeholder=" "
                  labelText="Department"
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

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("designation")(el)}
                  id="designation"
                  name="designation"
                  allowCustomInput={true}
                  options={designations}
                  value={formData.designation}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, designation: value });
                    focusNextInput("task");
                  }}
                  onEnterPress={() => {
                    if (formData.designation) {
                      focusNextInput("task");
                    }
                  }}
                  placeholder=" "
                  labelText="Designation"
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

              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("task")}
                    id="task"
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, task: "" })}
                    labelText="Task"
                    tooltipText="Enter the task name"
                    required
                  />

                  {/* Language Input Dropdown */}
                  <LanguageInputDropdown
                    onSubmit={(values) => {
                      setTaskCategoryLanguageValues(values);
                      console.log("Task category translations:", values);
                      setFormData((prev) => ({
                        ...prev,
                        task_ar: values.ar || "",
                        task_hi: values.hi || "",
                        task_ur: values.ur || "",
                        task_bn: values.bn || "",
                      }));
                      setTimeout(() => {
                        focusNextInput("description");
                      }, 100);
                    }}
                    title="Task Name"
                    initialValues={taskCategoryLanguageValues}
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("description")}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onNext={() => focusNextInput("isDefault")}
                  onCancel={() => setFormData({ ...formData, description: "" })}
                  labelText="Description"
                  tooltipText="Enter task description"
                  required
                />
              </div>
            </div>

            {/* Second Row: Default, Active */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isDefault")(el)}
                  id="isDefault"
                  name="isDefault"
                  options={["No", "Yes"]}
                  isSelectableOnly={true}
                  value={isDefaultState === "Yes" ? "Yes" : "No"}
                  onValueChange={(value: string) => {
                    const isYes = value === "Yes";
                    setIsDefaultState(isYes ? "Yes" : "No");
                    setFormData((prev) => ({
                      ...prev,
                      isDefault: isYes,
                    }));
                    focusNextInput("isActive");
                  }}
                  onEnterPress={() => {
                    focusNextInput("isActive");
                  }}
                  placeholder=" "
                  labelText="Default"
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

              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isActive")(el)}
                  id="isActive"
                  name="isActive"
                  labelText="Active"
                  isSelectableOnly={true}
                  options={["No", "Yes"]}
                  value={isActiveState === "Yes" ? "Yes" : "No"}
                  onValueChange={(value: string) => {
                    const isYes = value === "Yes";
                    setIsActiveState(isYes ? "Yes" : "No");
                    setFormData((prev) => ({
                      ...prev,
                      isActive: isYes,
                    }));
                    focusNextInput("submitButton");
                  }}
                  onEnterPress={() => {
                    focusNextInput("submitButton");
                  }}
                  placeholder=" "
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
