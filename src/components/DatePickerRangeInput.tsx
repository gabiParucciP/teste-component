import React from "react";
import {
  format,
  set,
  sub,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  parse,
} from "date-fns";
import {
  Control,
  Controller,
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
import { DateRangeInput3 } from "@blueprintjs/datetime2";
import clsx from "clsx";
import { forwardRef } from "react";
import "../calendar.css";

interface Props {
  icon?: JSX.Element;
  label: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  inputProps?: any;
  control: Control<any>;
  name: string;
  required?: boolean;
}

export const DatePickerRangeInput = forwardRef(
  (
    {
      icon,
      label,
      registration,
      error,
      inputProps,
      control,
      name,
      required,
    }: Props,
    ref: any
  ) => {
    const dateFnsFormat = "dd/MM/yyyy";

    const fieldValidationMessages = [error?.message];

    const hasError = fieldValidationMessages.some((item) => item !== undefined);

    const shorcuts: any = [
      {
        label: "Hoje",
        dateRange: [
          set(new Date(), {
            hours: 0,
            minutes: 0,
            seconds: 0,
          }),
          set(new Date(), {
            hours: 23,
            minutes: 59,
            seconds: 59,
          }),
        ],
      },
      {
        label: "Ontem",
        dateRange: [
          set(sub(new Date(), { days: 1 }), {
            hours: 0,
            minutes: 0,
            seconds: 0,
          }),
          set(sub(new Date(), { days: 1 }), {
            hours: 23,
            minutes: 59,
            seconds: 59,
          }),
        ],
      },
      {
        label: "Últimos 7 dias",
        dateRange: [
          set(sub(new Date(), { days: 7 }), {
            hours: 0,
            minutes: 0,
            seconds: 0,
          }),
          set(new Date(), {
            hours: 23,
            minutes: 59,
            seconds: 59,
          }),
        ],
      },
      {
        label: "Últimos 14 dias",
        dateRange: [
          set(sub(new Date(), { days: 14 }), {
            hours: 0,
            minutes: 0,
            seconds: 0,
          }),
          set(new Date(), {
            hours: 23,
            minutes: 59,
            seconds: 59,
          }),
        ],
      },
      {
        label: "Últimos 30 dias",
        dateRange: [
          set(sub(new Date(), { days: 30 }), {
            hours: 0,
            minutes: 0,
            seconds: 0,
          }),
          set(new Date(), {
            hours: 23,
            minutes: 59,
            seconds: 59,
          }),
        ],
      },
      {
        label: "Últimos 60 dias",
        dateRange: [
          set(sub(new Date(), { days: 60 }), {
            hours: 0,
            minutes: 0,
            seconds: 0,
          }),
          set(new Date(), {
            hours: 23,
            minutes: 59,
            seconds: 59,
          }),
        ],
      },
      {
        label: "Últimos 90 dias",
        dateRange: [
          set(sub(new Date(), { days: 90 }), {
            hours: 0,
            minutes: 0,
            seconds: 0,
          }),
          set(new Date(), {
            hours: 23,
            minutes: 59,
            seconds: 59,
          }),
        ],
      },
      {
        label: "Esta semana",
        dateRange: [startOfWeek(new Date()), endOfWeek(new Date())],
      },
      {
        label: "Semana passada",
        dateRange: [
          startOfWeek(sub(new Date(), { days: 7 })),
          endOfWeek(sub(new Date(), { days: 7 })),
        ],
      },
      {
        label: "Semana passada",
        dateRange: [
          startOfWeek(sub(new Date(), { days: 7 })),
          endOfWeek(sub(new Date(), { days: 7 })),
        ],
      },
      {
        label: "Este Mês",
        dateRange: [startOfMonth(new Date()), endOfMonth(new Date())],
      },
      {
        label: "Mês passado",
        dateRange: [
          startOfMonth(sub(new Date(), { months: 1 })),
          endOfMonth(sub(new Date(), { months: 1 })),
        ],
      },
    ];

    const styles = {
      input: `text-p-md border rounded block pb-[10px] h-[46px] w-full disabled:bg-light-gray-100 ${
        label ? "pt-[15px]" : "pt-[10px]"
      }`,
      icon: `absolute bg-light-gray-100 h-[43px] top-[2px] left-[1.5px] w-11 rounded-l  ${
        hasError ? "text-dangerous-700" : "text-label"
      }`,
      label: "text-label text-sm",
      error: "border-dangerous-700 text-dangerous-700",
    };

    return (
      <div>
        <Controller
          control={control}
          name={name as never}
          render={({ field: { onChange, value } }) => (
            <div id="group-input-calendar" className="relative">
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
              <DateRangeInput3
                allowSingleDayRange
                shortcuts={shorcuts}
                startInputProps={{
                  placeholder: " ",
                  className: styles.input,
                }}
                endInputProps={{
                  placeholder: " ",
                  className: styles.input,
                }}
                locale="pt"
                onChange={onChange}
                formatDate={(value) => format(value, dateFnsFormat)}
                parseDate={(value) => parse(value, dateFnsFormat, new Date())}
                value={value}
              />
              <label
                className={clsx(
                  styles.label,
                  `
                    ${
                      value && value[0] !== null
                        ? " scale-75 -translate-y-3 "
                        : ""
                    }
                    ${icon ? "left-[3.5rem]" : "left-2.5"}`
                )}
              >
                {label}
                {required && label && (
                  <strong className="text-dangerous-700">*</strong>
                )}
              </label>
            </div>
          )}
        />
        {fieldValidationMessages.map((message, index) => (
          <div
            key={index}
            className="text-dangerous-700 text-xs mt-[2px]"
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
