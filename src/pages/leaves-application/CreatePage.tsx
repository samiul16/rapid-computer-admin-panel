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
import { Check, Edit, Eye, Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type LeavesData = {
  branch: string;
  iqamaNo: string;
  leaveType: string;
  fromDate: string;
  endDate: string;
  totalDays: number;
  applicationHardCopy: File | null;
  reason: string;
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

const initialData: LeavesData = {
  branch: "Riyadh Branch",
  iqamaNo: "1234567890",
  leaveType: "Annual Leave",
  fromDate: "2024-02-15",
  endDate: "2024-02-20",
  totalDays: 6,
  applicationHardCopy: null,
  reason: "Family vacation",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function LeavesFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Employee modal states
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    name: string;
    designation: string;
    photo: string;
    iqamaImage: string;
  } | null>(null);

  // File upload states
  const [isDragging, setIsDragging] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Permission checks
  const canCreate = usePermission("leavesApplication", "create");
  const canView = usePermission("leavesApplication", "view");
  const canEdit = usePermission("leavesApplication", "edit");
  const canDelete = usePermission("leavesApplication", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const branch: boolean = usePermission(
    "leavesApplication",
    "create",
    "branch"
  );
  const iqamaNo: boolean = usePermission(
    "leavesApplication",
    "create",
    "iqamaNo"
  );
  const leaveType: boolean = usePermission(
    "leavesApplication",
    "create",
    "leaveType"
  );
  const fromDate: boolean = usePermission(
    "leavesApplication",
    "create",
    "fromDate"
  );
  const endDate: boolean = usePermission(
    "leavesApplication",
    "create",
    "endDate"
  );
  const totalDays: boolean = usePermission(
    "leavesApplication",
    "create",
    "totalDays"
  );
  const applicationHardCopy: boolean = usePermission(
    "leavesApplication",
    "create",
    "applicationHardCopy"
  );
  const reason: boolean = usePermission(
    "leavesApplication",
    "create",
    "reason"
  );
  const isDraft: boolean = usePermission(
    "leavesApplication",
    "create",
    "isDraft"
  );
  const canPdf: boolean = usePermission("leavesApplication", "pdf");
  const canPrint: boolean = usePermission("leavesApplication", "print");

  console.log("branch", branch);
  console.log("iqamaNo", iqamaNo);
  console.log("leaveType", leaveType);
  console.log("fromDate", fromDate);
  console.log("endDate", endDate);
  console.log("totalDays", totalDays);
  console.log("applicationHardCopy", applicationHardCopy);
  console.log("reason", reason);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const branchOptions = ["Riyadh Branch", "Jeddah Branch", "Dammam Branch"];

  const iqamaNoOptions = [
    "1234567890",
    "2345678901",
    "3456789012",
    "4567890123",
    "5678901234",
    "6789012345",
    "7890123456",
    "8901234567",
    "9012345678",
    "0123456789",
  ];

  // Employee data mapping for Iqama numbers
  const employeeData: Record<
    string,
    {
      name: string;
      designation: string;
      photo: string;
      iqamaImage: string;
    }
  > = {
    "1234567890": {
      name: "Rizwan Safdar Majoka",
      designation: "Technical Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "2345678901": {
      name: "Ahmed Al-Rashid",
      designation: "Software Engineer",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "3456789012": {
      name: "Fatima Al-Zahra",
      designation: "HR Specialist",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "4567890123": {
      name: "Mohammed Al-Otaibi",
      designation: "Project Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "5678901234": {
      name: "Sarah Al-Mansouri",
      designation: "Business Analyst",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "6789012345": {
      name: "Abdullah Al-Harbi",
      designation: "Finance Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "7890123456": {
      name: "Noura Al-Ghamdi",
      designation: "Marketing Coordinator",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
  };

  const leaveTypeOptions = [
    "Annual Leave",
    "Sick Leave",
    "Maternity Leave",
    "Personal Leave",
    "Study Leave",
    "Bereavement Leave",
  ];

  // Form state
  const [formData, setFormData] = useState<LeavesData>({
    branch: "",
    iqamaNo: "",
    leaveType: "",
    fromDate: "",
    endDate: "",
    totalDays: 0,
    applicationHardCopy: null,
    reason: "",
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
          navigate("/leaves-application/create");
        } else {
          navigate("/leaves-application/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/leaves-application/view");
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
      handlePrintLeaves(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Leave created successfully!");
      handleReset();
    } else {
      toastSuccess("Leave created successfully!");
      navigate("/leaves-application");
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
      branch: "",
      iqamaNo: "",
      leaveType: "",
      fromDate: "",
      endDate: "",
      totalDays: 0,
      applicationHardCopy: null,
      reason: "",
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

    // Reset file preview
    setFilePreview(null);

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["branch"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  // File upload handlers
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
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    if (file) {
      setFormData({ ...formData, applicationHardCopy: file });

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }

      if (file) {
        focusNextInput("reason");
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Leave Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          leaveTypes: "Leave Types",
          notes: "Notes",
          isDefault: "Default Leave",
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
          title="Leave Details"
          subtitle="Leave Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leave-details.pdf";
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
              toastRestore("Leave saved as draft successfully");
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
        title={
          isEdit ? "Editing Leave Application" : "Creating Leave Application"
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="leaves-application"
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
            {/* All fields in multiple rows */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Branch field */}
              {branch && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("branch")(el)}
                      id="branch"
                      name="branch"
                      allowCustomInput={true}
                      options={branchOptions}
                      value={formData.branch}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, branch: value });
                        if (value) {
                          focusNextInput("iqamaNo");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.branch) {
                          focusNextInput("iqamaNo");
                        }
                      }}
                      placeholder=" "
                      labelText="Branch"
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

              {/* Iqama No field */}
              {iqamaNo && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("iqamaNo")(el)}
                      id="iqamaNo"
                      name="iqamaNo"
                      allowCustomInput={true}
                      options={iqamaNoOptions}
                      value={formData.iqamaNo}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, iqamaNo: value });

                        // Show employee details if valid Iqama No is selected
                        if (value && employeeData[value]) {
                          setSelectedEmployee(employeeData[value]);
                          setIsEmployeeModalOpen(true);
                        }

                        if (value) {
                          focusNextInput("leaveType");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.iqamaNo) {
                          focusNextInput("leaveType");
                        }
                      }}
                      placeholder=" "
                      labelText="Iqama No"
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

              {/* Leave Type field */}
              {leaveType && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("leaveType")(el)}
                      id="leaveType"
                      name="leaveType"
                      allowCustomInput={true}
                      options={leaveTypeOptions}
                      value={formData.leaveType}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, leaveType: value });
                        if (value) {
                          focusNextInput("fromDate");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.leaveType) {
                          focusNextInput("fromDate");
                        }
                      }}
                      placeholder=" "
                      labelText="Leave Type"
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

              {/* From Date field */}
              {fromDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("fromDate")}
                    id="fromDate"
                    name="fromDate"
                    type="date"
                    value={formData.fromDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("endDate")}
                    onCancel={() => setFormData({ ...formData, fromDate: "" })}
                    labelText="From Date"
                    tooltipText="Select start date"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* End Date field */}
              {endDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("endDate")}
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("totalDays")}
                    onCancel={() => setFormData({ ...formData, endDate: "" })}
                    labelText="End Date"
                    tooltipText="Select end date"
                    required
                  />
                </div>
              )}

              {/* Total Days field */}
              {totalDays && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("totalDays")}
                    id="totalDays"
                    name="totalDays"
                    type="number"
                    value={formData.totalDays.toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFormData({ ...formData, totalDays: value });
                    }}
                    onNext={() => focusNextInput("applicationHardCopy")}
                    onCancel={() => setFormData({ ...formData, totalDays: 0 })}
                    labelText="Total Days"
                    tooltipText="Enter total days"
                    required
                  />
                </div>
              )}

              {/* Reason field */}
              {reason && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("reason")}
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDraft")}
                    onCancel={() => setFormData({ ...formData, reason: "" })}
                    labelText="Reason"
                    tooltipText="Enter reason for leave"
                    required
                  />
                </div>
              )}
            </div>

            {/* Third row */}
            <div className="grid my-8 relative -mt-8">
              {/* Application Hard Copy field */}
              {applicationHardCopy && (
                <div className="space-y-2 my-8 cursor-pointer relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Application Hard Copy
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 bg-[#f8fafc] text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
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
                        if (filePreview) {
                          setFilePreview(null);
                          setFormData({
                            ...formData,
                            applicationHardCopy: null,
                          });
                          setTimeout(() => {
                            triggerFileInput();
                          }, 0);
                        } else {
                          triggerFileInput();
                        }
                      }
                    }}
                  >
                    {filePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={filePreview}
                          alt="File Preview"
                          className="w-40 h-28 object-contain rounded-md"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilePreview(null);
                            setFormData({
                              ...formData,
                              applicationHardCopy: null,
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : formData.applicationHardCopy ? (
                      <div className="flex flex-col items-center justify-center gap-2 py-14">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <p className="text-base text-gray-500">
                          {formData.applicationHardCopy.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 py-14">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <p className="text-base text-gray-500">
                          Drag and drop your file here, or click to browse
                        </p>
                        <p className="text-sm text-gray-400">
                          Supports PDF, JPG, JPEG, PNG, GIF
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file) {
                          handleFileChange(file);
                        }
                      }}
                      accept=".pdf,.jpg,.jpeg,.png,.gif"
                      className="hidden"
                    />
                  </div>
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

      {/* Employee Details Modal */}
      <Modal
        opened={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        title="Employee Details"
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        centered
      >
        {selectedEmployee && (
          <div className="p-6">
            {/* Employee Header with Photo and Basic Info */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-shrink-0">
                <img
                  src={selectedEmployee.photo}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedEmployee.name}
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  {selectedEmployee.designation}
                </p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Active Employee
                </div>
              </div>
            </div>

            {/* Iqama Card Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Iqama Card
                </h3>
                <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  Verified ✓
                </span>
              </div>

              {/* Iqama Card Display */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-green-300">
                <div className="bg-green-600 text-white px-4 py-2 text-center font-bold">
                  Kingdom of Saudi Arabia - Iqama Card
                </div>
                <div className="p-4">
                  <img
                    src={selectedEmployee.iqamaImage}
                    alt="Iqama Card"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Iqama Number</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formData.iqamaNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-full transition-colors"
              >
                Continue with Application
              </Button>
            </div>
          </div>
        )}
      </Modal>

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
