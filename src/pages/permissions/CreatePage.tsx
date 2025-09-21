/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import type { RootState } from "@/store";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PermissionComponent from "./PermissionComponent";
import PermissionCreatePageLayout from "./components/PermissionCreatePageLayout";

export default function PermissionsCreatePage() {
  const labels = useLanguageLabels();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const formRef = useRef<HTMLFormElement>(null);
  const permissionRef = useRef<{ getValues: () => any }>(null);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (permissionRef.current && permissionRef.current.getValues) {
      const values = permissionRef.current.getValues();
      // console.log({
      //   selectedUser: values.selectedUser,
      //   company: values.company,
      //   branch: values.branch,
      //   permissions: values.permissions,
      // });
      console.log("Form submitted with values:", values);
    }
    // Api call
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormKey((prev) => prev + 1);
  };

  return (
    <>
      <PermissionCreatePageLayout
        title={"Creating Permission"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="permissions"
        scrollBoxClassNames="overflow-y-hidden px-0 py-0"
        activePage={"create"}
        additionalFooterButtons={
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              className="gap-2 text-primary bg-sky-200 hover:bg-primary rounded-full border-primary w-32 font-semibold!"
              onClick={handleResetClick}
            >
              {labels.reset}
            </Button>
            <Button
              variant="outline"
              className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
              onClick={() => formRef.current?.requestSubmit()}
            >
              {labels.submit}
            </Button>
          </div>
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"} className="h-full">
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6 relative h-full px-6 py-6"
          >
            <PermissionComponent ref={permissionRef} />
          </form>
        </div>
      </PermissionCreatePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
      />
    </>
  );
}
