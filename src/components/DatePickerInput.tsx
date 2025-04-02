import React from "react";
import { DateInput3 } from "@blueprintjs/datetime2";
import { forwardRef, JSX, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
import clsx from "clsx";
import { format, parse } from "date-fns";

interface Props {
  icon?: JSX.Element;
  label: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  inputProps?: any;
  clearField?: boolean;
  control: Control<any>;
  name: string | never;
  required?: boolean;
  defaultValue?: any;
  onChangeFunction?: (e: any) => void;
  maxDate?: any;
  minDate?: any;
  disabled?: boolean;
  small?: boolean;
  onClear?: () => void;
}

export const DatePickerInput = forwardRef(
  (
    {
      icon,
      label,
      registration,
      error,
      inputProps,
      clearField,
      control,
      name,
      required,
      defaultValue,
      onChangeFunction,
      maxDate,
      minDate,
      disabled,
      small,
      onClear,
    }: Props,
    ref: any
  ) => {
    const [invalidDate, setInvalidDate] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const dateFnsFormat = "dd/MM/yyyy";

    const fieldValidationMessages = [error?.message];

    const hasError = fieldValidationMessages.some((item) => item !== undefined);

    const styles = {
      input: `text-p-md border rounded block pb-[10px] h-[46px] w-full disabled:bg-light-gray-100 `,
      icon: `absolute bg-light-gray-100 h-[44px] w-[38px] top-[1px] left-[1px] rounded-l-lg rounded-r-none  ${
        hasError ? "text-dangerous-700" : "text-label"
      }`,
      label: "absolute text-label text-sm",
      error: "border-dangerous-700 text-dangerous-700",
      clear:
        "absolute top-[8px] right-[8px] cursor-pointer text-label text-[22px]",
    };

    // const input = name ? document?.getElementById(name) : null;

    return (
      <div>
        <Controller
          control={control}
          name={name as never}
          render={({ field }) => {
            return (
              <div id="group-input-calendar" className="relative" ref={ref}>
                {icon && (
                  <div
                    id="icon"
                    className={clsx(
                      styles.icon,
                      "flex justify-center items-center text-[20px]"
                    )}
                  >
                    {icon}
                  </div>
                )}
                <DateInput3
                  outOfRangeMessage="Data não permitida"
                  invalidDateMessage="Data inválida"
                  onError={() => setInvalidDate(true)}
                  defaultValue={field.value}
                  inputProps={{
                    className: styles.input,
                    style: { height: "46px" },
                  }}
                  disabled={disabled}
                  onChange={(e: any) => {
                    field.onChange(e);
                    setShowCalendar(false);
                    if (onChangeFunction) {
                      onChangeFunction(e);
                    }
                    setInvalidDate(false);
                  }}
                  value={field.value}
                  locale="pt"
                  highlightCurrentDay={true}
                  formatDate={(value: any) => format(value, dateFnsFormat)}
                  parseDate={(value: any) =>
                    parse(value, dateFnsFormat, new Date())
                  }
                  maxDate={maxDate}
                  minDate={minDate}
                />
                <label
                  className={clsx(
                    "pointer-events-none ",
                    styles.label,
                    `
                    ${
                      (field.value && field.value[0] !== null) || invalidDate
                        ? " scale-75 -translate-y-3 "
                        : ""
                    }
                    ${icon ? "left-[3rem]" : "left-2.5"}`
                  )}
                  style={{ top: "13px" }}
                >
                  {label}
                  {required && label && (
                    <strong className="text-dangerous-700 ml-1">*</strong>
                  )}
                </label>
                {clearField &&
                  field?.value &&
                  field?.value !== "" &&
                  !disabled && (
                    <i
                      className={clsx(
                        {
                          [styles.clear]: true,
                        },
                        "uil uil-times clear-icon"
                      )}
                      onClick={() => {
                        // if (input) {
                        //   input?.focus();
                        // }
                        if (onClear) {
                          onClear();
                        }
                      }}
                    ></i>
                  )}
              </div>
            );
          }}
        />
        {fieldValidationMessages.map((message, index) => (
          <div
            key={index}
            className="absolute text-dangerous-700 text-xs mt-[2px] ml-1"
            role="alert"
            aria-label={message}
          >
            {message}
          </div>
        ))}
      </div>
    );
  }
);
