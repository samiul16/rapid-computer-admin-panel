/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, Grid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/usePermissions";

interface GmailTabsProps {
  viewMode?: string;
  setViewMode: (viewMode: string) => void;

  setIsExportOpen?: (isExportOpen: boolean) => void;
  isExportOpen?: boolean;
  setIsFilterOpen?: (isFilterOpen: boolean) => void;
  setShowVisibility?: (showVisibility: boolean) => void;
}

const GmailTabs: React.FC<GmailTabsProps> = ({
  viewMode,
  setViewMode,
  setIsExportOpen,
  setIsFilterOpen,
  setShowVisibility,
  isExportOpen,
}) => {
  // get permission
  const canExport: boolean = usePermission("countries", "export");

  const handleExportClick = () => {
    setIsExportOpen?.(!isExportOpen);
    setIsFilterOpen?.(false);
    setShowVisibility?.(false);
  };

  return (
    <div className="flex justify-end w-full items-center gap-2 mb-4">
      {canExport && (
        <Button
          className={cn(
            "bg-sky-200 hover:bg-primary text-black rounded-full cursor-pointer",
            isExportOpen && "bg-primary text-white"
          )}
          onClick={handleExportClick}
        >
          <span className="font-semibold">Export</span>
        </Button>
      )}

      <button
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 relative cursor-pointer text-primary",
          viewMode === "grid"
            ? "text-primary border-b-2 border-primary"
            : "text-gray-600 hover:text-gray-800"
        )}
        onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
      >
        {viewMode === "grid" ? (
          <List className="h-5 w-5 text-primary" />
        ) : (
          <Grid className="h-5 w-5 text-primary" />
        )}
        {/* <span>Grid</span> */}
      </button>
    </div>
  );
};

export default GmailTabs;
