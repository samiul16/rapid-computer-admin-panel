/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Check, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import EditableInput from "@/components/common/EditableInput";
import { Autocomplete } from "@/components/common/Autocomplete";
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import PageLayout from "@/components/common/PageLayout";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import type { UserMasterData } from "@/types/userMaster.types";
import {
  initialUserMasterData,
  mockUserMasterData,
} from "@/mockData/userMaster-mockdata";
import { useNavigate } from "react-router-dom";

type Props = {
  isEdit?: boolean;
};

export default function UserMasterFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate: boolean = usePermission("userMaster", "create");
  const canView: boolean = usePermission("userMaster", "view");

  // Field-level permissions
  const name: boolean = usePermission("userMaster", "create", "name");
  const mobileNumber: boolean = usePermission(
    "userMaster",
    "create",
    "mobileNumber"
  );
  const email: boolean = usePermission("userMaster", "create", "email");
  const password: boolean = usePermission("userMaster", "create", "password");
  const confirmPassword: boolean = usePermission(
    "userMaster",
    "create",
    "confirmPassword"
  );
  const otp: boolean = usePermission("userMaster", "create", "otp");
  const facebook: boolean = usePermission("userMaster", "create", "facebook");
  const linkedin: boolean = usePermission("userMaster", "create", "linkedin");
  const instagram: boolean = usePermission("userMaster", "create", "instagram");

  const userType: boolean = usePermission("userMaster", "create", "userType");

  const canPdf: boolean = usePermission("userMaster", "pdf");
  const canPrint: boolean = usePermission("userMaster", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Form state
  const [formData, setFormData] = useState<UserMasterData>(
    initialUserMasterData
  );

  // User type options
  const userTypeOptions = [
    { value: "super_admin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
    { value: "super_user", label: "Super User" },
    { value: "user", label: "User" },
  ];

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
          navigate("/user-master/create");
        } else {
          navigate("/user-master/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Check className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/user-master/view");
      },
      show: canView,
    },
  ]);

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && mockUserMasterData.length > 0) {
      setFormData({
        ...mockUserMasterData[0], // Use first mock data for edit
      });
    }
  }, [isEdit]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintUserMaster(formData);
    }

    if (keepCreating) {
      toastSuccess("User Master created successfully!");
      handleReset();
    } else {
      toastSuccess("User Master created successfully!");
      navigate("/user-master");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const [formKey, setFormKey] = useState(0);

  // Handle form reset
  const handleReset = () => {
    setFormData(initialUserMasterData);
    if (formRef.current) {
      formRef.current.reset();
    }
    setFormKey((prev) => prev + 1);

    setTimeout(() => {
      inputRefs.current["name"]?.focus();
    }, 100);
  };

  const handlePrintUserMaster = (userMasterData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "User Master Details",
        data: [userMasterData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "User Name",
          mobileNumber: "Mobile Number",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          otp: "OTP",
          facebook: "Facebook",
          linkedin: "LinkedIn",
          instagram: "Instagram",
          code: "Code",
          state: "State",
          country: "Country",
          userType: "User Type",
          status: "Status",
          isDefault: "Default User",
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
      console.log("userMasterData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="User Master Details"
          subtitle="User Master Report"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "user-master-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleSaveTranslations = (translationData: any) => {
    console.log("Saved translations:", translationData);
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
              isDraft: true,
            }));
            toastSuccess("User Master saved as draft successfully");
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
        title={
          isEdit ? t("form.editingUserMaster") : t("form.creatingUserMaster")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/user-master"
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
            {/* First Row: Name, Mobile Number, Email, User Type */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Name field */}
              {name && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (e.target.value) {
                        focusNextInput("mobileNumber");
                      }
                    }}
                    onNext={() => {
                      if (formData.name) {
                        focusNextInput("mobileNumber");
                      }
                    }}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="Name"
                    tooltipText="Enter user name"
                    required
                  />
                </div>
              )}

              {/* Mobile Number field */}
              {mobileNumber && (
                <div className="space-y-2">
                  <h3 className="font-medium mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </h3>
                  <div className="phone-input-wrapper">
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={formData.mobileNumber}
                      onChange={(value) => {
                        setFormData({ ...formData, mobileNumber: value || "" });
                        if (value) {
                          focusNextInput("email");
                        }
                      }}
                      className="w-full"
                      inputClassName="!w-full !h-10 !px-3 !border !border-gray-300 !rounded-md !focus:border-primary !focus:outline-none !focus:ring-1 !focus:ring-primary !text-sm"
                      placeholder="Enter mobile number"
                      style={
                        {
                          "--PhoneInput-color--focus": "var(--primary)",
                        } as React.CSSProperties
                      }
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === "Enter" && formData.mobileNumber) {
                          focusNextInput("email");
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              {email && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (e.target.value) {
                        focusNextInput("password");
                      }
                    }}
                    onNext={() => {
                      if (formData.email) {
                        focusNextInput("password");
                      }
                    }}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter email address"
                    required
                  />
                </div>
              )}

              {/* User Type field */}
              {userType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("userType")(el)}
                    id="userType"
                    name="userType"
                    options={userTypeOptions}
                    value={formData.userType || ""}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, userType: value });
                      if (value) {
                        focusNextInput("password");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.userType) {
                        focusNextInput("password");
                      }
                    }}
                    placeholder=" "
                    labelText="User Type"
                    displayKey="label"
                    valueKey="value"
                    searchKey="label"
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

            {/* Second Row: Password, Confirm Password, OTP, (empty) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Password field */}
              {password && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("password")}
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (e.target.value) {
                        focusNextInput("confirmPassword");
                      }
                    }}
                    onNext={() => {
                      if (formData.password) {
                        focusNextInput("confirmPassword");
                      }
                    }}
                    onCancel={() => setFormData({ ...formData, password: "" })}
                    labelText="Password"
                    tooltipText="Enter password"
                    required
                  />
                </div>
              )}

              {/* Confirm Password field */}
              {confirmPassword && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("confirmPassword")}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      });
                      if (e.target.value) {
                        focusNextInput("otp");
                      }
                    }}
                    onNext={() => {
                      if (formData.confirmPassword) {
                        focusNextInput("otp");
                      }
                    }}
                    onCancel={() =>
                      setFormData({ ...formData, confirmPassword: "" })
                    }
                    labelText="Confirm Password"
                    tooltipText="Enter confirm password"
                    required
                  />
                </div>
              )}

              {/* OTP field */}
              {otp && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("otp")}
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={(e) => {
                      setFormData({ ...formData, otp: e.target.value });
                      if (e.target.value) {
                        focusNextInput("facebook");
                      }
                    }}
                    onNext={() => {
                      if (formData.otp) {
                        focusNextInput("facebook");
                      }
                    }}
                    onCancel={() => setFormData({ ...formData, otp: "" })}
                    labelText="OTP"
                    tooltipText="Enter OTP"
                    maxLength={6}
                  />
                </div>
              )}

              {facebook && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("facebook")}
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={(e) => {
                      setFormData({ ...formData, facebook: e.target.value });
                      if (e.target.value) {
                        focusNextInput("linkedin");
                      }
                    }}
                    onNext={() => {
                      if (formData.facebook) {
                        focusNextInput("linkedin");
                      }
                    }}
                    onCancel={() => setFormData({ ...formData, facebook: "" })}
                    labelText="Facebook"
                    tooltipText="Enter Facebook URL"
                  />
                </div>
              )}
            </div>

            {/* Third Row: Social Media Links */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Facebook field */}

              {/* LinkedIn field */}
              {linkedin && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("linkedin")}
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => {
                      setFormData({ ...formData, linkedin: e.target.value });
                      if (e.target.value) {
                        focusNextInput("instagram");
                      }
                    }}
                    onNext={() => {
                      if (formData.linkedin) {
                        focusNextInput("instagram");
                      }
                    }}
                    onCancel={() => setFormData({ ...formData, linkedin: "" })}
                    labelText="LinkedIn"
                    tooltipText="Enter LinkedIn URL"
                  />
                </div>
              )}

              {/* Instagram field */}
              {instagram && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("instagram")}
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={(e) => {
                      setFormData({ ...formData, instagram: e.target.value });
                      if (e.target.value) {
                        focusNextInput("code");
                      }
                    }}
                    onNext={() => {
                      if (formData.instagram) {
                        focusNextInput("code");
                      }
                    }}
                    onCancel={() => setFormData({ ...formData, instagram: "" })}
                    labelText="Instagram"
                    tooltipText="Enter Instagram URL"
                  />
                </div>
              )}

              <div></div>
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

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        onSave={handleSaveTranslations}
        initialData={[
          {
            id: 1,
            english: formData.state || "State Name",
            arabic: "",
            bangla: "",
          },
        ]}
        title="Language Translator"
      />
    </>
  );
}
