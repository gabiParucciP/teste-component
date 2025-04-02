import React from "react";
import { Control, Controller } from "react-hook-form";
import "./radio.css";
interface Props {
  disabled?: boolean;
  control: Control<any>;
  name: string;
  label?: string;
  defaultChecked?: boolean;
}

export const Radio = ({
  disabled,
  control,
  name,
  label,
  defaultChecked,
}: Props) => {
  return (
    <Controller
      name={name as never}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <label className="custom-radio flex items-center">
              <input
                name={name}
                id={name}
                type="radio"
                className=""
                onClick={(e: any) => {
                  field.onChange(e.target.value);
                }}
                defaultChecked={defaultChecked}
                disabled={disabled}
              />
              <span></span>
            </label>
            {label && (
              <label htmlFor={name} className="text-p-md cursor-pointer -pt-1">
                {label}
              </label>
            )}
          </div>
        );
      }}
    />
  );
};
