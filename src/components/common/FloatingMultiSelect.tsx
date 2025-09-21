import { MultiSelect, type MultiSelectProps } from "@mantine/core";
import { useState } from "react";
import clsx from "clsx";

type FloatingMultiSelectProps = MultiSelectProps & {
  label: string;
};

export function FloatingMultiSelect({
  label,
  value,
  onChange,
  data,
  disabled,
  ...props
}: FloatingMultiSelectProps) {
  const hasValue = Array.isArray(value) && value.length > 0;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <MultiSelect
        data={data}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        searchable
        clearable
        disabled={disabled}
        maxDropdownHeight={200}
        className="h-full"
        classNames={{
          wrapper: "h-full",
          input: clsx(
            "peer pt-6 pb-1 !min-h-[50px] !h-full !rounded-[12px] !flex !items-center !bg-[#f8fafc]",
            { "!border-primary !border-2": isFocused },
            { disabled: "!border-gray-600 !cursor-not-allowed" }
          ),
          pillsList: "h-full",
        }}
        placeholder=" "
        {...props}
      />

      <label
        className={clsx(
          "absolute left-1 px-2 text-base text-gray-800 dark:text-gray-400 bg-[#f8fafc] dark:bg-gray-900 transition-all duration-200 pointer-events-none",
          {
            "top-0 text-sm -translate-y-1/2 scale-75": isFocused || hasValue,
            "top-1/2 -translate-y-1/2": !isFocused && !hasValue,
            "!bg-transparent": disabled,
            "text-primary": isFocused,
          }
        )}
      >
        {label}
      </label>
    </div>
  );
}
