/* eslint-disable no-useless-computed-key */
import React from "react";
import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";
import { Float } from "@headlessui-float/react";
import { Button } from "../Button";
import { format } from "date-fns";
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
import { DatePicker3, DateRangePicker3 } from "@blueprintjs/datetime2";

interface Props {
  icon?: JSX.Element;
  label?: string;
  onApply?: () => void;
  onClear?: () => void;
  control: Control;
  name: string;
  rangeCalendar?: boolean;
  defaultShortcut?: number | null;
  shortcutsChange?: (e) => void;
  singleMonth?: boolean;
  maxDate?: Date | undefined;
}

export const FilterCalendar = ({
  icon,
  label,
  onApply,
  onClear,
  control,
  name,
  rangeCalendar = true,
  defaultShortcut,
  shortcutsChange,
  singleMonth = false,
  maxDate = undefined,
}: Props) => {
  const style = {
    filter:
      "rounded-3xl shadow-input bg-white hover:bg-light-gray-100 border border-dark-blue-300 active:text-blue-700 active:bg-blue-100 active:border-blue-700",
    filterOpen:
      "rounded-3xl shadow-input border border-blue-700 bg-blue-100 text-blue-700",
    filterActive:
      "rounded-3xl border border-blue-700 text-blue-700 bg-blue-100  shadow-input hover:bg-blue-700 hover:text-white active:text-white active:bg-blue-900 active:border-blue-900",
  };

  const [currentValue, setCurrentValue] = useState<any>([]);
  const [calendarLabel, setCalendarLabel] = useState("");

  const isMobileSize = window?.innerWidth < 768;

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
  const [selectedShortcut, setSelectedShortcut] = useState(
    defaultShortcut || shorcuts[0]
  );

  const calendar = (
    <div id="group-input-calendar" className="relative">
      {rangeCalendar ? (
        <DateRangePicker3
          allowSingleDayRange
          shortcuts={shorcuts}
          selectedShortcutIndex={selectedShortcut}
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
              setCalendarLabel("");

              if (setSelectedShortcut) setSelectedShortcut(null);
            }
            setCalendarLabel("");
            setCurrentValue(date);
          }}
          singleMonthOnly={singleMonth}
          value={currentValue}
          highlightCurrentDay={true}
          minDate={subYears(new Date(), 50)}
          maxDate={maxDate}
          locale="pt"
          onShortcutChange={(e) => {
            const index = shorcuts.findIndex((item) => item.label === e.label);
            if (index !== -1 && setSelectedShortcut) {
              setSelectedShortcut(index);
            }
            setCalendarLabel(e?.label);
          }}
        />
      ) : (
        <DatePicker3
          onChange={(e) => {
            setCurrentValue(e);
          }}
          value={currentValue}
          highlightCurrentDay={true}
          locale="pt"
        />
      )}
    </div>
  );
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        let hasValue = field?.value?.length > 0;
        return (
          <Popover
            className={clsx(
              { ["w-full"]: isMobileSize },
              "relative text-paragraph"
            )}
          >
            {({ open }) => (
              <Float composable shift={8} zIndex={99} offset={2}>
                <Float.Reference>
                  <PopoverButton as="button">
                    <div
                      className={clsx(
                        {
                          [style.filter]: !hasValue && !open,
                          [style.filterOpen]: open && !hasValue,
                          [style.filterActive]:
                            (open && hasValue) || (!open && hasValue),
                        },
                        `group px-3 h-[36px] text-p-ls font-bold  disabled:shadow-none active:shadow-none flex items-center justify-between outline-none gap-2`
                      )}
                    >
                      {icon && (
                        <div
                          className={clsx({
                            ["text-label group-active:text-blue-700"]:
                              !field.value && !open,
                            ["text-blue-700"]: open && !field.value,
                            ["text-blue-700 group-hover:text-white group-active:text-white"]:
                              open && field.value,
                          })}
                        >
                          {icon}
                        </div>
                      )}
                      <label
                        className={clsx(
                          {
                            ["text-paragraph group-active:text-blue-700"]:
                              !field.value && !open,
                            ["text-blue-700"]: open && !field.value,
                            ["text-blue-700 group-hover:text-white group-active:text-white"]:
                              open && field.value,
                          },
                          "truncate cursor-pointer"
                        )}
                      >
                        {calendarLabel
                          ? calendarLabel
                          : field?.value?.length > 0
                          ? field?.value
                              ?.map((item) =>
                                item !== null ? format(item, "dd/MM/yyyy") : ""
                              )
                              .join(" - ")
                          : label}
                      </label>

                      <i
                        className={clsx(
                          {
                            ["text-label group-active:text-blue-700"]:
                              !field.value && !open,
                            ["text-blue-700"]: open && !field.value,
                            ["text-blue-700 group-hover:text-white group-active:text-white"]:
                              open && field.value,
                          },
                          "uil uil-angle-down text-[18px]"
                        )}
                      ></i>
                    </div>
                  </PopoverButton>
                </Float.Reference>
                {(open as any) && (
                  <Float.Content>
                    <PopoverPanel className="p-3 whitespace-nowrap bg-white rounded-lg shadow-dropdown border-[0.5px] border-dark-blue-300">
                      {({ close }) => {
                        const onClose = () => {
                          setCurrentValue(field.value);
                          close();
                        };

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                          setCurrentValue(field.value);
                        }, [open]);

                        return (
                          <div className="flex flex-col gap-2">
                            {calendar}
                            <div className="flex gap-2 items-center justify-end border-t border-t-light-gray-200 pt-3">
                              {onClear && (
                                <div className="mr-1">
                                  <Button
                                    variant="link"
                                    size="xxs"
                                    onClick={() => {
                                      if (onClear) {
                                        onClear();
                                        setCurrentValue([]);
                                        field.onChange([]);
                                      }
                                      close();
                                    }}
                                  >
                                    Limpar
                                  </Button>
                                </div>
                              )}
                              <Button
                                size="xs"
                                variant="secondary"
                                onClick={() => {
                                  onClose();
                                }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                size="xs"
                                variant="primary"
                                disabled={
                                  JSON.stringify(currentValue) ===
                                  JSON.stringify(field?.value)
                                }
                                onClick={() => {
                                  field.onChange(currentValue);
                                  if (onApply) onApply();
                                  close();
                                }}
                              >
                                Aplicar
                              </Button>
                            </div>
                          </div>
                        );
                      }}
                    </PopoverPanel>
                  </Float.Content>
                )}
              </Float>
            )}
          </Popover>
        );
      }}
    />
  );
};
