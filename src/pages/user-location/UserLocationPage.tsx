import { useState } from "react";

import PageHeader from "./components/PageHeader";
import UserLocationGrid from "./UserLocationGrid";
import UserLocationDataTable from "./UserLocationDataTable";
import UserLocationTab from "./components/user-LocationTab";
import UserLocationTableTab from "./components/User-LocationTableTab";

export default function UserLocationPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataTableFilter] = useState({});

  return (
    <div className="w-100vw px-2 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <PageHeader
        setViewMode={setViewMode}
        viewMode={viewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsFilterOpen={setIsFilterOpen}
        isFilterOpen={isFilterOpen}
        setIsExportOpen={setIsExportOpen}
        setShowVisibility={setShowVisibility}
        showVisibility={showVisibility}
        setTimeLabel={() => {}}
        title="Users Location"
        createPath=""
      />

      {/* Grap section or gmail tab */}
      {viewMode === "grid" ? (
        <UserLocationTab
          viewMode={viewMode}
          setViewMode={setViewMode}
          setIsExportOpen={setIsExportOpen}
          isExportOpen={isExportOpen}
          setIsFilterOpen={setIsFilterOpen}
          setShowVisibility={setShowVisibility}
        />
      ) : (
        <UserLocationTableTab
          setIsExportOpen={setIsExportOpen}
          isExportOpen={isExportOpen}
          setIsFilterOpen={setIsFilterOpen}
          setShowVisibility={setShowVisibility}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}
      {/* Scrollable Content Area */}
      {viewMode === "grid" ? (
        <div className="mt-8 h-[calc(100vh-300px)] md:h-[calc(100vh-300px)] lg:h-[calc(100vh-300px)] xl:h-[calc(100vh-300px)] border-1 rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <UserLocationGrid
            searchQuery={searchQuery}
            setIsFilterOpen={setIsFilterOpen}
            isFilterOpen={isFilterOpen}
            setIsExportOpen={setIsExportOpen}
            isExportOpen={isExportOpen}
          />
        </div>
      ) : (
        <div className="mt-4 h-[calc(100vh-322px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <UserLocationDataTable
            viewMode={viewMode}
            searchQuery={searchQuery}
            setViewMode={setViewMode}
            dataTableFilter={dataTableFilter}
            setShowExport={setIsExportOpen}
            showExport={isExportOpen}
            setShowFilter={setIsFilterOpen}
            showFilter={isFilterOpen}
            setShowVisibility={setShowVisibility}
            showVisibility={showVisibility}
          />
        </div>
      )}
    </div>
  );
}
