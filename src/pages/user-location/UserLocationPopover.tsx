import React, { useState, useEffect } from "react";
import { Accordion, Text } from "@mantine/core";
import { Search, Mic } from "lucide-react";
import { NormalSwitch } from "../../components/ui/normalSwitch";
import { Button } from "@/components/ui/button";

interface UserLocationPopoverProps {
  opened: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  userData?: {
    id: string;
    name: string;
    avatar: string;
    totalCompanies: number;
    totalBranches: number;
    status: string;
    isDeleted: boolean;
  } | null;
}

interface BankBranch {
  id: string;
  name: string;
  enabled: boolean;
}

interface CompanyBranch {
  id: string;
  name: string;
  enabled: boolean;
}

interface CompanyData {
  id: string;
  name: string;
  branches: CompanyBranch[];
}

interface BankData {
  id: string;
  name: string;
  branches: BankBranch[];
}

const UserLocationPopover: React.FC<UserLocationPopoverProps> = ({
  opened,
  onClose,
  position,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [arrowPosition, setArrowPosition] = useState<"top" | "bottom">("top");

  // Companies data state
  const [companies, setCompanies] = useState<CompanyData[]>([
    {
      id: "1",
      name: "Akter General Trading LLC",
      branches: [
        { id: "1", name: "Pabna", enabled: true },
        { id: "2", name: "Dhaka", enabled: true },
        { id: "3", name: "Rajshahi", enabled: true },
      ],
    },
    {
      id: "2",
      name: "Tech Solutions Ltd",
      branches: [
        { id: "4", name: "Chittagong", enabled: true },
        { id: "5", name: "Sylhet", enabled: false },
        { id: "6", name: "Barisal", enabled: true },
        { id: "7", name: "Rangpur", enabled: false },
      ],
    },
    {
      id: "3",
      name: "Global Industries Corp",
      branches: [
        { id: "8", name: "Khulna", enabled: true },
        { id: "9", name: "Mymensingh", enabled: true },
        { id: "10", name: "Comilla", enabled: false },
        { id: "11", name: "Jessore", enabled: true },
      ],
    },
  ]);

  // Banks data state
  const [banks, setBanks] = useState<BankData[]>([
    {
      id: "1",
      name: "Rapid Software",
      branches: [
        { id: "1", name: "Dhaka Branch", enabled: true },
        { id: "2", name: "Chittagong Branch", enabled: false },
        { id: "3", name: "Sylhet Branch", enabled: true },
        { id: "4", name: "Rajshahi Branch", enabled: false },
        { id: "5", name: "Khulna Branch", enabled: true },
      ],
    },
    {
      id: "2",
      name: "Digital Banking Solutions",
      branches: [
        { id: "6", name: "Barisal Branch", enabled: true },
        { id: "7", name: "Rangpur Branch", enabled: false },
        { id: "8", name: "Mymensingh Branch", enabled: true },
        { id: "9", name: "Comilla Branch", enabled: true },
      ],
    },
    {
      id: "3",
      name: "FinTech Innovations",
      branches: [
        { id: "10", name: "Jessore Branch", enabled: false },
        { id: "11", name: "Bogra Branch", enabled: true },
        { id: "12", name: "Kushtia Branch", enabled: true },
        { id: "13", name: "Dinajpur Branch", enabled: false },
      ],
    },
  ]);

  // Adjust position to ensure popover stays within viewport
  useEffect(() => {
    if (opened) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const popoverWidth = 600;
      const popoverHeight = 500; // Approximate height
      const arrowSize = 12; // Arrow height
      const margin = 20; // Minimum margin from viewport edges

      let x = position.x - popoverWidth / 2;
      let y = position.y + 10; // Add some space for the arrow
      let arrowPos: "top" | "bottom" = "top";

      // Adjust horizontal position if popover goes outside viewport
      if (x < margin) {
        x = margin;
      } else if (x + popoverWidth > viewportWidth - margin) {
        x = viewportWidth - popoverWidth - margin;
      }

      // Check if popover would go below viewport
      if (y + popoverHeight > viewportHeight - margin) {
        // Try to position above the card
        y = position.y - popoverHeight - arrowSize - 10;
        arrowPos = "bottom"; // Arrow points down TO the card

        // If still goes above viewport, position it at the top with margin
        if (y < margin) {
          y = margin;
          arrowPos = "top"; // Arrow points up TO the card
        }
      }

      // Ensure popover doesn't go above viewport
      if (y < margin) {
        y = margin;
        arrowPos = "top"; // Arrow points up TO the card
      }

      console.log("Popover positioning:", {
        originalPosition: position,
        adjustedPosition: { x, y },
        arrowPosition: arrowPos,
        viewportHeight,
        popoverHeight,
        wouldGoBelow: y + popoverHeight > viewportHeight - margin,
      });

      // Temporary fix: force arrow to bottom for testing
      const finalArrowPos = "bottom";

      setAdjustedPosition({ x, y });
      setArrowPosition(finalArrowPos);
    }
  }, [opened, position]);

  // Calculate arrow left position (centered relative to trigger position)
  const getArrowLeftPosition = () => {
    const popoverWidth = 600;
    const arrowWidth = 24; // Arrow width
    const triggerCenterX = position.x;
    const popoverLeft = adjustedPosition.x;

    // Calculate arrow position relative to popover
    let arrowLeft = triggerCenterX - popoverLeft - arrowWidth / 2;

    // Ensure arrow stays within popover bounds with some padding
    const minArrowLeft = 30;
    const maxArrowLeft = popoverWidth - arrowWidth - 30;

    arrowLeft = Math.max(minArrowLeft, Math.min(maxArrowLeft, arrowLeft));

    console.log("Arrow positioning:", {
      triggerCenterX,
      popoverLeft,
      calculatedArrowLeft: triggerCenterX - popoverLeft - arrowWidth / 2,
      finalArrowLeft: arrowLeft,
      minArrowLeft,
      maxArrowLeft,
    });

    return arrowLeft;
  };

  const handleCompanyBranchToggle = (companyId: string, branchId: string) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              branches: company.branches.map((branch) =>
                branch.id === branchId
                  ? { ...branch, enabled: !branch.enabled }
                  : branch
              ),
            }
          : company
      )
    );
  };

  const handleBankBranchToggle = (bankId: string, branchId: string) => {
    setBanks((prev) =>
      prev.map((bank) =>
        bank.id === bankId
          ? {
              ...bank,
              branches: bank.branches.map((branch) =>
                branch.id === branchId
                  ? { ...branch, enabled: !branch.enabled }
                  : branch
              ),
            }
          : bank
      )
    );
  };

  const handleSubmit = () => {
    console.log("Settings saved:", {
      companies,
      banks,
    });
    onClose();
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-location-popover")) {
        onClose();
      }
    };

    if (opened) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [opened, onClose]);

  if (!opened) return null;

  return (
    <div
      className="user-location-popover fixed z-[9999]"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
        width: "600px",
        maxHeight: "80vh",
      }}
    >
      {/* Arrow */}
      <div
        className={`absolute w-6 h-3 ${
          arrowPosition === "top" ? "-top-3" : "-bottom-3"
        }`}
        style={{
          left: `${getArrowLeftPosition()}px`,
          zIndex: 1,
        }}
      >
        {arrowPosition === "top" ? (
          // Top arrow (pointing up) - when popover is below the card
          <svg
            width="24"
            height="12"
            viewBox="0 0 24 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M12 0L24 12H0L12 0Z"
              fill="oklch(82.8% 0.111 230.318)"
              stroke="oklch(82.8% 0.111 230.318)"
              strokeWidth="0.5"
            />
          </svg>
        ) : (
          // Bottom arrow (pointing down) - when popover is above the card
          <svg
            width="24"
            height="12"
            viewBox="0 0 24 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M12 12L0 0H24L12 12Z"
              fill="oklch(82.8% 0.111 230.318)"
              stroke="oklch(82.8% 0.111 230.318)"
              strokeWidth="0.5"
            />
          </svg>
        )}
      </div>

      {/* Main Popover Content */}
      <div className="bg-sky-300 rounded-lg shadow-2xl border border-sky-400 overflow-hidden border-b-0 max-h-[80vh]">
        {/* Search Bar */}
        <div className="bg-sky-300 p-4 border-b border-sky-400">
          <div className="relative">
            <div className="flex items-center bg-sky-100 rounded-full px-3 py-2 border border-gray-200">
              <Search size={16} className="text-sky-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
              />
              <div className="flex items-center gap-2 ml-2">
                <div className="w-px h-4 bg-gray-300"></div>
                <Mic
                  size={16}
                  className="text-sky-400 cursor-pointer hover:text-gray-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="h-48 overflow-y-auto p-2 my-4">
          {/* Accordion */}
          <Accordion variant="separated" radius="lg">
            {/* Companies */}
            {companies.map((company) => (
              <Accordion.Item
                key={company.id}
                value={`company-${company.id}`}
                className="bg-sky-200!"
              >
                <Accordion.Control>
                  <Text fw={500}>{company.name}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <div className="overflow-hidden rounded-md border border-sky-300 max-h-40 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-sky-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Branch Name
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-sky-100 divide-y divide-sky-300">
                        {company.branches.map((branch) => (
                          <tr key={branch.id} className="hover:bg-sky-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <Text size="sm" fw={500}>
                                {branch.name}
                              </Text>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <NormalSwitch
                                checked={branch.enabled}
                                onCheckedChange={() =>
                                  handleCompanyBranchToggle(
                                    company.id,
                                    branch.id
                                  )
                                }
                                label=""
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}

            {/* Banks */}
            {banks.map((bank) => (
              <Accordion.Item
                key={bank.id}
                value={`bank-${bank.id}`}
                className="bg-sky-200!"
              >
                <Accordion.Control>
                  <Text fw={500}>{bank.name}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <div className="overflow-hidden rounded-md border border-sky-300 max-h-40 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-sky-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Branch Name
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-sky-100 divide-y divide-sky-300">
                        {bank.branches.map((branch) => (
                          <tr key={branch.id} className="hover:bg-sky-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <Text size="sm" fw={500}>
                                {branch.name}
                              </Text>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <NormalSwitch
                                checked={branch.enabled}
                                onCheckedChange={() =>
                                  handleBankBranchToggle(bank.id, branch.id)
                                }
                                label=""
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-sky-400">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            size="sm"
            className={`gap-2 text-primary rounded-full border-primary/80 w-20 bg-sky-200 hover:bg-primary font-semibold! shadow`}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSubmit}
            className={`gap-2 text-primary rounded-full border-primary w-20 bg-primary hover:bg-primary font-semibold! shadow`}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserLocationPopover;
