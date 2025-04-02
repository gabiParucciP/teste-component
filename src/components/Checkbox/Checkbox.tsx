import React from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";
import "./checkbox.css";
export type CheckboxProps = {
  key?: string;
  label?: string;
  registration?: UseFormRegisterReturn;
  disabled?: boolean;
};

export const Checkbox = ({
  key = "",
  label,
  registration,
  disabled,
}: CheckboxProps) => (
  <div>
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          {...registration}
          id={registration ? registration.name : key}
          disabled={disabled}
          type="checkbox"
          className={clsx(
            "disabled:hover:bg-light-gray-100 disabled:cursor-default cursor-pointer h-[16px] w-[16px] rounded-[2.5px] border border-light-gray-200 text-blue-700 focus:rounded-[4px] focus:border-[1.5px] focus:ring-blue-700 focus-visible:ring-blue-700 checked:after:text-blue-500 disabled:bg-light-gray-100"
          )}
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={registration?.name}
          className="cursor-pointer font-medium text-gray-700"
        >
          {label}
        </label>
      </div>
    </div>
  </div>
);
