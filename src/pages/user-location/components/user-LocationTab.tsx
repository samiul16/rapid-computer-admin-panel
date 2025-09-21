/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Group, Box } from "@mantine/core";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePermission } from "@/hooks/usePermissions";

export default function UserLocationTab({
  viewMode,
  setViewMode,
  setIsExportOpen,
  isExportOpen,
  setIsFilterOpen,
  setShowVisibility,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  setShowVisibility: (showVisibility: boolean) => void;
}) {
  const handleExportClick = () => {
    setIsExportOpen(!isExportOpen);
    setIsFilterOpen(false);
    setShowVisibility(false);
  };

  // get permission
  const canExport: boolean = usePermission("countries", "export");

  return (
    <Tabs
      variant="outline"
      defaultValue="gallery"
      styles={{
        panel: {
          borderLeft: "1px solid #dee2e6",
          borderRight: "1px solid #dee2e6",
          borderTop: "1px solid #dee2e6",
          padding: "1rem",
          zIndex: 10,
          bottom: "-1px",
        },
        list: {
          borderBottom: "none",
        },
      }}
    >
      <Box style={{ position: "relative" }}>
        <Group justify="flex-end" gap="xs" style={{ alignItems: "center" }}>
          {/* Export Button */}
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

          <div className="">
            <button
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 relative cursor-pointer",
                viewMode === "grid"
                  ? "text-primary"
                  : "text-gray-600 hover:text-gray-800"
              )}
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? (
                <List className="h-5 w-5" />
              ) : (
                <Grid className="h-5 w-5" />
              )}
            </button>
          </div>
        </Group>
      </Box>
    </Tabs>
  );
}
