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

type ShiftTypeData = {
  name: string;
  color: string;
  startTime: string;
  endTime: string;
  lunchStart: string;
  lunchEnd: string;
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

const initialData: ShiftTypeData = {
  name: "Morning Shift",
  color: "#3B82F6",
  startTime: "08:00",
  endTime: "16:00",
  lunchStart: "12:00",
  lunchEnd: "13:00",
  description: "Standard morning shift for office staff",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function ShiftTypeFormPage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("shiftType", "create");
  const canView = usePermission("shiftType", "view");
  const canEdit = usePermission("shiftType", "edit");
  const canDelete = usePermission("shiftType", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof ShiftTypeData>(
    "shiftType",
    "create",
    [
      "name",
      "color",
      "startTime",
      "endTime",
      "lunchStart",
      "lunchEnd",
      "description",
      "isDefault",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("shiftType", "pdf");
  const canPrint: boolean = usePermission("shiftType", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const colorOptions = [
    "#3B82F6",
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
    "#EF4444",
    "#06B6D4",
    "#EC4899",
    "#84CC16",
    "#F97316",
    "#DC2626",
    "#059669",
    "#7C3AED",
    "#1E40AF",
    "#374151",
  ];
  const timeOptions = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  // Form state
  const [formData, setFormData] = useState<ShiftTypeData>({
    name: "",
    color: "#3B82F6",
    startTime: "",
    endTime: "",
    lunchStart: "",
    lunchEnd: "",
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
          navigate("/shift-type/create");
        } else {
          navigate("/shift-type/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/shift-type/view");
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
      handlePrintShiftTypes(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Shift type created successfully!");
      handleReset();
    } else {
      toastSuccess("Shift type created successfully!");
      navigate("/shift-type");
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
      name: "",
      color: "#3B82F6",
      startTime: "",
      endTime: "",
      lunchStart: "",
      lunchEnd: "",
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
      inputRefs.current["name"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintShiftTypes = (shiftTypeData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Shift Type Details",
        data: [shiftTypeData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          color: "Color",
          startTime: "Start Time",
          endTime: "End Time",
          lunchStart: "Lunch Start",
          lunchEnd: "Lunch End",
          description: "Description",
          isDefault: "Default Shift Type",
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
      console.log("shiftTypeData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Shift Type Details"
          subtitle="Shift Type Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shift-type-details.pdf";
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
              toastRestore("Shift type saved as draft successfully");
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
        title={isEdit ? "Editing Shift Type" : "Creating Shift Type"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="shift-type"
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
            {/* Basic Shift Type Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.name && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("color")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="Name"
                    tooltipText="Enter shift type name"
                    required
                  />
                </div>
              )}

              {permissionsFields.color && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("color")(el)}
                    id="color"
                    name="color"
                    options={colorOptions}
                    value={formData.color}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        color: value,
                      }));
                      focusNextInput("startTime");
                    }}
                    onEnterPress={() => {
                      if (formData.color) {
                        focusNextInput("startTime");
                      }
                    }}
                    placeholder=" "
                    labelText="Color"
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

              {permissionsFields.startTime && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("startTime")(el)}
                    id="startTime"
                    name="startTime"
                    options={timeOptions}
                    value={formData.startTime}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        startTime: value,
                      }));
                      focusNextInput("endTime");
                    }}
                    onEnterPress={() => {
                      if (formData.startTime) {
                        focusNextInput("endTime");
                      }
                    }}
                    placeholder=" "
                    labelText="Start Time"
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

              {permissionsFields.endTime && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("endTime")(el)}
                    id="endTime"
                    name="endTime"
                    options={timeOptions}
                    value={formData.endTime}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        endTime: value,
                      }));
                      focusNextInput("lunchStart");
                    }}
                    onEnterPress={() => {
                      if (formData.endTime) {
                        focusNextInput("lunchStart");
                      }
                    }}
                    placeholder=" "
                    labelText="End Time"
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

            {/* Lunch Time Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.lunchStart && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("lunchStart")(el)}
                    id="lunchStart"
                    name="lunchStart"
                    options={timeOptions}
                    value={formData.lunchStart}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        lunchStart: value,
                      }));
                      focusNextInput("lunchEnd");
                    }}
                    onEnterPress={() => {
                      if (formData.lunchStart) {
                        focusNextInput("lunchEnd");
                      }
                    }}
                    placeholder=" "
                    labelText="Lunch Start"
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

              {permissionsFields.lunchEnd && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("lunchEnd")(el)}
                    id="lunchEnd"
                    name="lunchEnd"
                    options={timeOptions}
                    value={formData.lunchEnd}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        lunchEnd: value,
                      }));
                      focusNextInput("description");
                    }}
                    onEnterPress={() => {
                      if (formData.lunchEnd) {
                        focusNextInput("description");
                      }
                    }}
                    placeholder=" "
                    labelText="Lunch End"
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
                    tooltipText="Enter shift type description"
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
