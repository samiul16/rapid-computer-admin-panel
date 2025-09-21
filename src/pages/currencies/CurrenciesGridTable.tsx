import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  List,
  Import,
  Download,
  Filter,
  Mic,
  Search,
  RefreshCw,
  CheckCircle2,
  Circle,
  Pencil,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "./GridFilterComponent";
import GridExportComponent from "./GridExportComponent";
import { Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";
import {
  currencies as mockCurrencies,
  currencySymbols,
  currencyNames,
} from "@/mockData/currency-mockdata"; // <-- mock data
import type { Currency } from "@/types/currencies.types";

// main component start
export default function CurrenciesGridTable({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Use mockCurrencies as initial data
  const [allCurrenciesData, setAllCurrenciesData] = useState<Currency[]>(mockCurrencies);
  const [currenciesData, setCurrenciesData] = useState<Currency[]>(mockCurrencies);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Currency",
    message: <ImportStepperTemp />,
  });

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // Infinite scroll dummy data generation
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const idx = allCurrenciesData.length + index;
      const symbol = currencySymbols[idx % currencySymbols.length];
      const name = currencyNames[idx % currencyNames.length];
      return {
        id: `${Date.now()}-${index}`,
        code: `CUR${idx + 1}`,
        currency: `Mock ${name}`,
        symbol,
        exchange: +(Math.random() * 100 + 0.5).toFixed(2),
        isActive: Math.random() > 0.3,
        isDraft: Math.random() > 0.7,
        isDeleted: false,
        isDefault: false,
        createdAt: null,
        draftedAt: null,
        updatedAt: null,
        deletedAt: null,
      } as Currency;
    });

    // Stop loading more after reaching 50 items for demo
    if (allCurrenciesData.length >= 46) {
      setHasMore(false);
    } else {
      setAllCurrenciesData((prev) => [...prev, ...newItems]);
      setCurrenciesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [allCurrenciesData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100;

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDeleteClick = (currencyId: string) => {
    setCurrenciesData((prev) =>
      prev.map((currency) =>
        currency.id === currencyId
          ? { ...currency, isDeleted: !currency.isDeleted }
          : currency
      )
    );
  };

  const handleRestoreClick = (currencyId: string) => {
    setCurrenciesData((prev) =>
      prev.map((currency) =>
        currency.id === currencyId
          ? { ...currency, isDeleted: !currency.isDeleted }
          : currency
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (currencyId: string) => {
    setCurrenciesData((prev) =>
      prev.map((currency) =>
        currency.id === currencyId
          ? { ...currency, isActive: !currency.isActive }
          : currency
      )
    );
  };

  // Filter currencies based on search query
  const filteredCurrencies = currenciesData.filter(
    (currency) =>
      currency.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent">
      {/* Fixed header controls */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 rounded-full min-w-[60px] sm:min-w-[80px]"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer rounded-full"
              onClick={() => {
                open();
                setModalData({
                  title: "Import Currency",
                  message: <ImportStepperTemp />,
                });
              }}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          </div>

          {/* Search */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-xs mx-auto">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400 z-10" />
                <Input
                  placeholder="Search..."
                  className="pl-9 pr-9 w-full rounded-full relative z-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Tooltip
                  arrowOffset={10}
                  arrowSize={7}
                  withArrow
                  position="top"
                  label="Search by voice"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0 z-10"
                  >
                    <Mic className="h-4 w-4 text-blue-700" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Right buttons */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isExportOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsExportOpen(!isExportOpen);
                setIsFilterOpen(false);
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.export")}</span>
            </Button>

            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isFilterOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsExportOpen(false);
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
            {filteredCurrencies.map((currency) => (
              <Card
                key={currency.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Symbol */}
                <div className="grid grid-cols-3 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <Tooltip label={currency.currency} position="top" withArrow>
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                      onClick={() => navigate(`/currencies/${currency.id}`)}
                    >
                      {currency.currency}
                    </CardTitle>
                  </Tooltip>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        currency.isActive
                          ? "Click to Inactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          currency.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(currency.id);
                          toastSuccess(
                            currency.isActive
                              ? "Currency activated successfully"
                              : "Currency inactivated successfully"
                          );
                        }}
                      >
                        {currency.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={currency.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          currency.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (currency.isDeleted) {
                            handleRestoreClick(currency.id);
                          } else {
                            handleDeleteClick(currency.id);
                          }
                          toastSuccess(
                            currency.isDeleted
                              ? "Currency restored successfully"
                              : "Currency deleted successfully"
                          );
                        }}
                      >
                        {currency.isDeleted ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip label="Edit" position="top" withArrow>
                      <div
                        className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500"
                        onClick={() =>
                          navigate(`/currencies/${currency.id}/edit`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Symbol */}
                  <div className="flex justify-end">
                    <span className="text-3xl font-bold">
                      {currency.symbol}
                    </span>
                  </div>
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Exchange */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {currency.code}
                    </div>
                  </div>

                  {/* Exchange - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Exchange
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {currency.exchange}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more currencies...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredCurrencies.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more currencies to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={allCurrenciesData}
                setFilteredData={setCurrenciesData}
                setShowFilter={setIsFilterOpen}
              />
            </div>
          </div>
        )}

        {/* Export component */}
        {isExportOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={currenciesData}
                setFilteredData={setCurrenciesData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div className="">
            <h3 className="text-lg font-semibold pl-4 ">Import Currency</h3>
          </div>
        }
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        style={{ zIndex: 9999 }}
        className="z-[9999]"
        centered
      >
        <div className="pt-5 pb-14 px-5">{modalData.message}</div>
      </Modal>
    </div>
  );
}
