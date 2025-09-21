/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { exportToCSV } from "@/lib/exportToCSV";
import { exportToExcel } from "@/lib/exportToExcel";
import { pdf } from "@react-pdf/renderer";
import PDF from "@/components/common/pdf";
import { toastError } from "@/lib/toast";
import type { Currency } from "@/types/currencies.types";

interface SimpleFilterProps {
  data: Currency[];
  setFilteredData: (filtered: Currency[]) => void;
  setIsExportOpen: (visible: boolean) => void;
}

// Example dummy currency data for export preview (not used in actual export)
// const mockData: Currency[] = [
//   {
//     id: "1",
//     code: "USD",
//     currency: "US Dollar",
//     exchange: 1,
//     symbol: "$",
//     isDefault: true,
//     isActive: true,
//     isDraft: false,
//     isDeleted: false,
//     createdAt: new Date("2023-01-01"),
//     draftedAt: null,
//     updatedAt: new Date("2024-01-01"),
//     deletedAt: null,
//   },
//   {
//     id: "2",
//     code: "EUR",
//     currency: "Euro",
//     exchange: 1.09,
//     symbol: "€",
//     isDefault: false,
//     isActive: true,
//     isDraft: false,
//     isDeleted: false,
//     createdAt: new Date("2023-02-01"),
//     draftedAt: null,
//     updatedAt: new Date("2024-02-01"),
//     deletedAt: null,
//   },
// ];

export default function SimpleFilterComponent({
  data,
  setFilteredData,
  setIsExportOpen,
}: SimpleFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );

  const filterableFields = useMemo(() => {
    if (data.length === 0) return [];
    // Return string fields (exclude id or non-string if needed)
    return Object.keys(data[0]).filter((key) => key !== "id");
  }, [data]);

  const resetFilters = () => {
    setSelectedFilters(new Set());
    setSearch("");
  };

  const applyFilters = () => {
    if (selectedFilters.size === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((row) => {
        return Array.from(selectedFilters).some((key) => {
          const value = row[key as keyof Currency];
          return value !== undefined && value !== null;
        });
      });
      setFilteredData(filtered);
    }
    setIsExportOpen(false);
  };

  const handleCheckboxChange = (key: string, checked: boolean | string) => {
    setSelectedFilters((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(key);
      } else {
        newSet.delete(key);
      }
      return newSet;
    });
  };

  // Export handlers use the actual data, not mockData
  const handleCSV = () => exportToCSV(data, "currencies.csv");
  const handleExcel = () => exportToExcel(data, "currencies.xlsx");
  const handleExport = async () => {
    try {
      // Convert your Currency[] data to the format expected by CurrenciesPDF
      // If your CurrenciesPDF expects different field names, map accordingly
      const exportableDataList = data.map((item) => ({
        code: item.code,
        name: item.currency,
        created_at: item.createdAt ? item.createdAt.toISOString() : "",
        updated_at: item.updatedAt ? item.updatedAt.toISOString() : "",
        deleted_at: item.deletedAt ? item.deletedAt.toISOString() : "",
        drafted_at: item.draftedAt ? item.draftedAt.toISOString() : "",
        is_active: item.isActive,
        is_draft: item.isDraft,
        is_deleted: item.isDeleted,
        is_default: item.isDefault,
      }));

      const blob = await pdf(
        <PDF
          data={[exportableDataList]}
          title="Currencies Details"
          subtitle="Currencies Information Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "currencies-summery.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch {
      toastError("Something went wrong when generating PDF");
    }
  };

  return (
    <div className="w-76 h-[100vh] flex flex-col border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Top Bar - Full Width */}
      <div className="border-b px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 rounded-full">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="pl-8 h-8 w-full rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setSearch("");
              setIsExportOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Middle Section - 2 Sections */}
      <div className="flex-1 flex overflow-y-auto">
        {/* Left Section - Checkboxes */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
          {filterableFields
            .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
            .map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1"
              >
                <Checkbox
                  id={`filter-${key}`}
                  checked={selectedFilters.has(key)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(key, checked)
                  }
                  className="data-[state=checked]:text-white"
                />
                <label
                  htmlFor={`filter-${key}`}
                  className="text-sm font-medium"
                >
                  {key}
                </label>
              </div>
            ))}
        </div>

        {/* Right Section - Export Options */}
        <div className="w-20 border-l bg-gray-50 dark:bg-gray-800 flex flex-col items-center py-3 gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 border-2 border-primary hover:scale-110 transition-all"
            title="Print"
            onClick={() => window.print()}
          >
            <Printer className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-primary hover:scale-110 transition-all"
            title="Export to Excel"
            onClick={handleExcel}
          >
            <FileSpreadsheet className="h-5 w-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-primary hover:scale-110 transition-all"
            title="Export to PDF"
            onClick={handleExport}
          >
            <FileText className="h-5 w-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-primary hover:scale-110 transition-all"
            title="Export to CSV"
            onClick={handleCSV}
          >
            <Download className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>

      {/* Bottom Bar - Full Width */}
      <div className="border-t px-3 py-2 flex-shrink-0">
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={applyFilters}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
