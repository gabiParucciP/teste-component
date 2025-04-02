import React from "react";
import { DatePicker3, DateRangePicker3 } from "@blueprintjs/datetime2";
import {
  Control,
  Controller,
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
import {
  set,
  sub,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subYears,
} from "date-fns";
import "../../calendar.css";

interface Props {
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  control: Control<any>;
  name: string | never;
  rangeCalendar?: boolean;
  shortcutsChange?: (e) => void;
  selectedShortcut?: number | null;
  setSelectedShortcut?: (e) => void;
  maxDate?: Date;
  singleMonth?: boolean;
}
export const Calendar = ({
  registration,
  error,
  control,
  name,
  rangeCalendar = false,
  shortcutsChange,
  selectedShortcut,
  setSelectedShortcut,
  maxDate = new Date(),
  singleMonth = false,
}: Props) => {
  const fieldValidationMessages = [error?.message];

  const shorcuts: any = [
    {
      label: "Todo o período",
      dateRange: [],
    },
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
      dateRange: [
        startOfWeek(new Date()),
        set(new Date(), {
          hours: 23,
          minutes: 59,
          seconds: 59,
        }),
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
      dateRange: [
        startOfMonth(new Date()),
        set(new Date(), {
          hours: 23,
          minutes: 59,
          seconds: 59,
        }),
      ],
    },
    {
      label: "Mês passado",
      dateRange: [
        startOfMonth(sub(new Date(), { months: 1 })),
        endOfMonth(sub(new Date(), { months: 1 })),
      ],
    },
    {
      label: "Últimos 6 meses",
      dateRange: [
        startOfMonth(sub(new Date(), { months: 6 })),
        set(new Date(), {
          hours: 23,
          minutes: 59,
          seconds: 59,
        }),
        ,
      ],
    },
  ];
  return (
    <div>
      <Controller
        control={control}
        name={name as never}
        render={({ field: { onChange, value } }) => (
          <div id="group-input-calendar" className="relative">
            {rangeCalendar ? (
              <DateRangePicker3
                allowSingleDayRange
                shortcuts={shorcuts}
                selectedShortcutIndex={selectedShortcut || shorcuts[0]}
                onChange={(e) => {
                  let date = [];
                  if (e[0] && e[0] !== null) {
                    date.push(
                      set(e[0] as never, {
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                      }) as never
                    );
                  }

                  if (e[1] && e[1] !== null) {
                    date.push(
                      set(e[1] as never, {
                        hours: 23,
                        minutes: 59,
                        seconds: 59,
                      }) as never
                    );
                  }

                  if (e[0] !== null && e[1] == null) {
                    if (shortcutsChange) shortcutsChange(null);
                    if (setSelectedShortcut) setSelectedShortcut(null);
                  }
                  if (shortcutsChange) shortcutsChange("");
                  onChange(date);
                }}
                singleMonthOnly={singleMonth}
                value={value}
                highlightCurrentDay={true}
                minDate={subYears(new Date(), 50)}
                maxDate={maxDate}
                locale="pt"
                onShortcutChange={(e) => {
                  const index = shorcuts.findIndex(
                    (item) => item.label === e.label
                  );
                  if (index !== -1 && setSelectedShortcut) {
                    setSelectedShortcut(index);
                  }
                  if (shortcutsChange) shortcutsChange(e);
                }}
              />
            ) : (
              <DatePicker3
                onChange={(e) => {
                  onChange(e);
                }}
                value={value}
                highlightCurrentDay={true}
                locale="pt"
              />
            )}
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
};
