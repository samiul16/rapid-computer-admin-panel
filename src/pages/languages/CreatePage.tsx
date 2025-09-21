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
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";

type LanguageData = {
  id?: string;
  seq: number;
  code: string;
  language: string;
  default: boolean;
  status: "active" | "inactive";
  isDeleted: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: LanguageData = {
  seq: 1,
  code: "en",
  language: "English",
  default: true,
  status: "active",
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export default function LanguageFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isActiveState, setIsActiveState] = useState<"Yes" | "No">("Yes");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [languageValues, setLanguageValues] = useState<Record<string, string>>(
    {}
  );

  // Permission checks
  const canCreate: boolean = usePermission("languages", "create");
  const canView: boolean = usePermission("languages", "view");

  // Field-level permissions
  const seq: boolean = usePermission("languages", "create", "seq");
  const languageCode: boolean = usePermission("languages", "create", "code");
  const languageName: boolean = usePermission(
    "languages",
    "create",
    "language"
  );
  const isDefault: boolean = usePermission("languages", "create", "default");
  const isActive: boolean = usePermission("languages", "create", "status");
  const canPdf: boolean = usePermission("languages", "pdf");
  const canPrint: boolean = usePermission("languages", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);
  console.log("seq", seq);
  console.log("languageCode", languageCode);
  console.log("languageName", languageName);
  console.log("isDefault", isDefault);
  console.log("isActive", isActive);

  // Language codes for autocomplete
  const languageCodes = [
    "en",
    "es",
    "fr",
    "de",
    "it",
    "pt",
    "ru",
    "zh",
    "ja",
    "ko",
    "ar",
    "hi",
    "ur",
    "bn",
  ];

  // Form state
  const [formData, setFormData] = useState<LanguageData>({
    seq: 1,
    code: "",
    language: "",
    default: isDefaultState === "Yes",
    status: "active",
    isDeleted: false,
    createdAt: null,
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
          navigate("/languages/create");
        } else {
          navigate("/languages/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/languages/view");
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
      setIsDefaultState(initialData.default ? "Yes" : "No");
      setIsActiveState(initialData.status === "active" ? "Yes" : "No");
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

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintLanguage(formData);
    }

    if (keepCreating) {
      toastSuccess("Language created successfully!");
      handleReset();
    } else {
      toastSuccess("Language created successfully!");
      navigate("/languages");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const [formKey, setFormKey] = useState(0);

  const handleReset = () => {
    setFormData({
      seq: 1,
      code: "",
      language: "",
      default: false,
      status: "active",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setIsActiveState("Yes");

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handlePrintLanguage = (languageData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Language Details",
        data: [languageData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          seq: "Sequence",
          code: "Language Code",
          language: "Language Name",
          default: "Default Language",
          status: "Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      console.log("languageData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Language Details"
          subtitle="Language Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "languages-details.pdf";
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

      return [
        ...filteredOptions,
        {
          label: "Draft",
          icon: <Check className="text-green-500" />,
          onClick: () => {
            setFormData((prev) => ({
              ...prev,
              status: "inactive",
            }));
            toastRestore("Language saved as draft successfully");
          },
          show: canCreate,
        },
      ];
    });
  }, [canCreate]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Language" : "Creating Language"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="languages"
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
            {/* First Row: Sequence, Code, Language Name, Default, Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Sequence field */}
              {seq && (
                <div className=" space-y-2">
                  <EditableInput
                    setRef={setRef("seq")}
                    id="seq"
                    name="seq"
                    type="number"
                    value={formData.seq.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        seq: parseInt(e.target.value) || 1,
                      });
                      if (e.target.value) {
                        focusNextInput("code");
                      }
                    }}
                    onNext={() => focusNextInput("code")}
                    onCancel={() => setFormData({ ...formData, seq: 1 })}
                    labelText="Sequence"
                    tooltipText="Enter sequence number"
                    required
                  />
                </div>
              )}

              {/* Language Code field */}
              {languageCode && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("code")(el)}
                    id="code"
                    name="code"
                    allowCustomInput={true}
                    options={languageCodes}
                    value={formData.code}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, code: value });
                      if (value) {
                        focusNextInput("language");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.code) {
                        focusNextInput("language");
                      }
                    }}
                    placeholder=" "
                    labelText="Code"
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

              {/* Language Name field */}
              {languageName && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("language")}
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      onNext={() => focusNextInput("isDefault")}
                      onCancel={() =>
                        setFormData({ ...formData, language: "" })
                      }
                      labelText="Language"
                      tooltipText="Enter the language name"
                      required
                    />

                    {/* Language Input Dropdown */}
                    <LanguageInputDropdown
                      onSubmit={(values) => {
                        setLanguageValues(values);
                        console.log("Language translations:", values);
                        setFormData((prev) => ({
                          ...prev,
                          language_ar: values.ar || "",
                          language_hi: values.hi || "",
                          language_ur: values.ur || "",
                          language_bn: values.bn || "",
                        }));
                        setTimeout(() => {
                          focusNextInput("isDefault");
                        }, 100);
                      }}
                      title="Language Name"
                      initialValues={languageValues}
                    />
                  </div>
                </div>
              )}

              {/* Default field */}
              {isDefault && (
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
                      setFormData((prev) => ({
                        ...prev,
                        default: isYes,
                      }));
                      focusNextInput("isActive");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.default === true ||
                        formData.default === false
                      ) {
                        focusNextInput("isActive");
                      }
                    }}
                    placeholder=" "
                    labelText="Default Language"
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Status field */}
              {isActive && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isActive")(el)}
                    id="isActive"
                    name="isActive"
                    options={["Yes", "No"]}
                    value={isActiveState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsActiveState(isYes ? "Yes" : "No");
                      setFormData((prev) => ({
                        ...prev,
                        status: isYes ? "active" : "inactive",
                      }));
                    }}
                    onEnterPress={() => {
                      if (
                        formData.status === "active" ||
                        formData.status === "inactive"
                      ) {
                        focusNextInput("submitButton");
                      }
                    }}
                    placeholder=" "
                    labelText="Status"
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
        message="Are you sure you want to reset the form? All entered data will be lost."
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
