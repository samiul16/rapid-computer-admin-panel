import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GmailTabs from "@/components/common/TableTabs";
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";
import StoreGrid from "./StoreGrid";
import StoreDataTable from "./StoreDataTable";
import VerticalSummaryCards from "@/components/common/grid-data-table/VerticalSummaryCards";

export default function TablePage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const { t } = useTranslation();
  const [dataTableFilter, setDataTableFilter] = useState({});

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 25,
    draft: 5,
    active: 20,
    inactive: 5,
    deleted: 2,
    updated: 3,
  };

  const cardConfigs = [
    {
      key: "total" as keyof typeof summaryData,
      title: "TOTAL STORES",
      icon: "/book-icon.svg",
      color: "blue",
      total: summaryData.total,
    },
    {
      key: "active" as keyof typeof summaryData,
      title: "ACTIVE STORES",
      icon: "/activity-01.svg",
      color: "green",
      total: summaryData.active,
    },
    {
      key: "draft" as keyof typeof summaryData,
      title: "DRAFT STORES",
      icon: "/pencil-edit-02.svg",
      color: "yellow",
      total: summaryData.draft,
    },
    {
      key: "updated" as keyof typeof summaryData,
      title: "UPDATED STORES",
      icon: "/arrow-reload-horizontal.svg",
      color: "purple",
      total: summaryData.updated,
    },
    {
      key: "inactive" as keyof typeof summaryData,
      title: "INACTIVE STORES",
      icon: "/unavailable.svg",
      color: "gray",
      total: summaryData.inactive,
    },
    {
      key: "deleted" as keyof typeof summaryData,
      title: "DELETED STORES",
      icon: "/delete-02.svg",
      color: "red",
      total: summaryData.deleted,
    },
  ];

  return (
    <div className="w-100vw px-2 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <VideoModal src={video} header={"Rapid ERP Video"} />
        <h1 className="text-2xl font-bold flex-1 text-primary">Store</h1>
        <Button
          className="bg-primary text-white rounded-full cursor-pointer"
          onClick={() => navigate("/store/create")}
        >
          <span className="hidden sm:inline">{t("button.create")}</span>
          <span className="sm:hidden">{t("button.create")}</span>
        </Button>
      </div>

      {viewMode === "grid" ? (
        <VerticalSummaryCards statistics={summaryData} data={cardConfigs} />
      ) : (
        <GmailTabs
          dataTableFilter={dataTableFilter}
          setDataTableFilter={setDataTableFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}

      {/* Scrollable Content Area */}
      {viewMode === "grid" ? (
        <div className="mt-4 h-[calc(100vh-420px)] md:h-[calc(100vh-420px)] lg:h-[calc(100vh-420px)] xl:h-[calc(100vh-420px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <StoreGrid setViewMode={setViewMode} />
        </div>
      ) : (
        <div className="mt-4 h-[calc(100vh-270px)] md:h-[calc(100vh-270px)] lg:h-[calc(100vh-270px)] xl:h-[calc(100vh-270px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <StoreDataTable
            viewMode={viewMode}
            setViewMode={setViewMode}
            dataTableFilter={dataTableFilter}
          />
        </div>
      )}
    </div>
  );
}
