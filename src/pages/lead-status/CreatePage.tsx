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

type LeadStatusData = {
  name: string;
  order: number;
  color: string;
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

const initialData: LeadStatusData = {
  name: "New Lead",
  order: 1,
  color: "#3B82F6",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function LeadSourceFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("leadStatuses", "create");
  const canView = usePermission("leadStatuses", "view");
  const canEdit = usePermission("leadStatuses", "edit");
  const canDelete = usePermission("leadStatuses", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const name: boolean = usePermission("leadStatuses", "create", "name");
  const order: boolean = usePermission("leadStatuses", "create", "order");
  const color: boolean = usePermission("leadStatuses", "create", "color");
  const isDraft: boolean = usePermission("leadStatuses", "create", "isDraft");
  const canPdf: boolean = usePermission("leadStatuses", "pdf");
  const canPrint: boolean = usePermission("leadStatuses", "print");

  console.log("name", name);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const nameOptions = [
    "New Lead",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Negotiation",
    "Closed Won",
    "Closed Lost",
    "On Hold",
    "Rejected",
    "Follow Up",
    "Meeting Scheduled",
    "Demo Completed",
  ];

  // Form state
  const [formData, setFormData] = useState<LeadStatusData>({
    name: "",
    order: 1,
    color: "#3B82F6",
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
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/lead-status/create");
        } else {
          navigate("/lead-status/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/lead-status/view");
      },
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
    }
  }, [isEdit, initialData]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintLeadSource(formData);
    }

    if (keepCreating) {
      toastSuccess("Lead status created successfully!");
      handleReset();
    } else {
      toastSuccess("Lead status created successfully!");
      navigate("/lead-status");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const [formKey, setFormKey] = useState(0);

  const handleReset = () => {
    setFormData({
      name: "",
      order: 1,
      color: "#3B82F6",
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    setTimeout(() => {
      inputRefs.current["name"]?.focus();
    }, 100);
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeadSource = (leadSourceData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Lead Source Details",
        data: [leadSourceData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          isDefault: "Default Source",
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
      console.log("leadSourceData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Lead Source Details"
          subtitle="Lead Source Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lead-source-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

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
              toastRestore("Lead status saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Lead Status" : "Creating Lead Status"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="lead-status"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        additionalFooterButtons={
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
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Name field */}
              {name && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("name")(el)}
                      id="name"
                      name="name"
                      allowCustomInput={true}
                      options={nameOptions}
                      value={formData.name}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, name: value });
                        if (value) {
                          focusNextInput("order");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.name) {
                          focusNextInput("order");
                        }
                      }}
                      placeholder=" "
                      labelText="Name"
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
                </div>
              )}

              {/* Order field */}
              {order && (
                <div className="space-y-2">
                  <EditableInput
                    ref={(el: any) => setRef("order")(el)}
                    id="order"
                    name="order"
                    type="number"
                    value={formData.order.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 1,
                      });
                      if (e.target.value) {
                        focusNextInput("color");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && formData.order) {
                        focusNextInput("color");
                      }
                    }}
                    placeholder=" "
                    labelText="Order"
                    className="relative"
                  />
                </div>
              )}

              {/* Color field */}
              {color && (
                <div className="space-y-2">
                  <EditableInput
                    ref={(el: any) => setRef("color")(el)}
                    id="color"
                    name="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => {
                      setFormData({ ...formData, color: e.target.value });
                      if (e.target.value) {
                        focusNextInput("submitButton");
                      }
                    }}
                    className="relative"
                    labelText="Color"
                    title="Choose color"
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
