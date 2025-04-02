import React from "react";
import { Switch } from "@headlessui/react";
import { Control, Controller } from "react-hook-form";

const { Group, Label } = Switch;

type ToggleProps = {
  name: string;
  label?: string;
  subLabel?: string;
  control: Control<any>;
  disabled?: boolean;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const Toggle = ({
  name,
  label,
  subLabel,
  control,
  disabled,
}: ToggleProps) => {
  return (
    <Group as="div" className="flex items-center">
      <Controller
        control={control}
        name={name as never}
        render={({ field }) => (
          <Switch
            disabled={disabled}
            {...field}
            className="h-[18px] w-[33px] focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 rounded-full"
            checked={Boolean(field.value)}
            onChange={(value: boolean) => {
              field.onChange(value);
            }}
          >
            {({ checked }) => (
              <div
                className={classNames(
                  checked ? "bg-blue-700" : "bg-light-gray-200",
                  "relative inline-flex h-[18px] p-[2px] w-[33px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out "
                )}
              >
                <span
                  className={classNames(
                    "pointer-events-none relative inline-block -top-[2px] right-[2px] h-[14px] w-[14px] transform rounded-full  shadow ring-0 transition duration-200 ease-in-out",
                    checked ? "translate-x-[15px]" : "translate-x-0",
                    disabled ? "bg-dark-blue-300" : "bg-white"
                  )}
                >
                  <span
                    className={classNames(
                      checked
                        ? "opacity-0 ease-out duration-100"
                        : "opacity-100 ease-in duration-200",
                      "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                    )}
                    aria-hidden="true"
                  ></span>
                  <span
                    className={classNames(
                      checked
                        ? "opacity-100 ease-in duration-200"
                        : "opacity-0 ease-out duration-100",
                      "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                    )}
                    aria-hidden="true"
                  ></span>
                </span>
              </div>
            )}
          </Switch>
        )}
      />

      {label && (
        <Label as="span" className="flex flex-col gap-1 ml-2 cursor-pointer">
          <span className="text-sm text-paragraph">{label}</span>
          {subLabel && <span className="text-sm">{subLabel}</span>}
        </Label>
      )}
    </Group>
  );
};
