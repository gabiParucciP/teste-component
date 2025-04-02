/* eslint-disable no-useless-computed-key */
import React from "react";
import { Fragment, Key, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import clsx from "clsx";
import { Float } from "@headlessui-float/react";
import { Button } from "../Button";
import InputSmall from "../InputSmall/InputSmall";

interface Options {
  id: any;
  label: any;
  description?: any;
  disabled?: boolean;
  icon?: JSX.Element;
}

interface Props {
  icon?: JSX.Element;
  label?: string;
  isMulti?: boolean;
  options: Options[];
  onApply?: () => void;
  onClear?: () => void;
  onSelectAll?: () => void;
  control: Control;
  name: string;
  fetch?: (value: string | number, button: string) => Promise<Options[]>;
  subFilters?: {
    id: string | any;
    name: string;
  }[];
  emptyMessage?: string;
  initialMessage?: string;
  applyOnClick?: boolean;
  showFilter?: boolean;
}

export const FilterOptions = ({
  icon,
  label,
  isMulti,
  options = [],
  onApply,
  onClear,
  onSelectAll,
  control,
  name,
  fetch,
  subFilters = [],
  emptyMessage,
  initialMessage,
  applyOnClick = false,
  showFilter = false,
}: Props) => {
  const style = {
    filter:
      "rounded-3xl shadow-input bg-white hover:bg-light-gray-100 border border-dark-blue-300 active:text-blue-700 active:bg-blue-100 active:border-blue-700",
    filterOpen:
      "rounded-3xl shadow-input border border-blue-700 bg-blue-100 text-blue-700",
    filterActive:
      "rounded-3xl border border-blue-700 text-blue-700 bg-blue-100  shadow-input hover:bg-blue-700 hover:text-white active:text-white active:bg-blue-900 active:border-blue-900",
  };

  const [currentValue, setCurrentValue] = useState<any>(isMulti ? [] : {});
  const [data, setData] = useState(() => options);
  const [filter, setFilter] = useState("");
  const [subFilter, setSubFilter] = useState(
    subFilters?.length > 0 ? subFilters[0].id : null
  );
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (filter?.length > 0 || options?.length > 0) {
      if (fetch) {
        setData(await fetch(filter, subFilter));
      } else {
        const result = options.filter((opt) =>
          opt?.label?.toLowerCase().includes(filter.toLowerCase())
        );
        const order = result.sort((a, b) => a?.label?.toLowerCase());
        setData(order);
      }
    } else {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      search();
    }, 400);

    return () => clearTimeout(timeout);
  }, [filter]);

  const optionStyle = (option, isSelected) => {
    return (
      <ListboxOption
        disabled={option.disabled}
        key={option.id as Key}
        value={option}
        as={Fragment}
      >
        <div
          className={clsx(
            "relative cursor-pointer outline-none select-none p-3 rounded-lg pr-9 text-paragraph mt-1 first:mt-0 overflow-hidden w-full",
            {
              ["hover:bg-light-gray-200"]: !option.disabled && !isSelected,
              ["text-gray-200"]: option.disabled,
              ["bg-blue-700 hover:bg-blue-700"]: isSelected,
            }
          )}
        >
          <span
            className={clsx(
              {
                ["font-semibold text-white"]: isSelected,
              },
              "text-wrap break-words font-normal block"
            )}
          >
            {option?.label}
          </span>
          <span
            className={clsx(
              {
                ["font-semibold text-white"]: isSelected,
              },
              "w-[200px] whitespace-nowrap text-ellipsis overflow-hidden text-label text-p-sm block"
            )}
          >
            {option?.description}
          </span>

          {isSelected ? (
            <span
              className={clsx(
                "absolute inset-y-0 text-white right-0 flex items-center pr-4"
              )}
            >
              <i className="uil uil-check text-lg"></i>
            </span>
          ) : null}
        </div>
      </ListboxOption>
    );
  };
  const isMobileSize = window?.innerWidth < 768;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        let hasValue = isMulti ? field?.value?.length > 0 : !!field?.value?.id;
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
                        {isMulti
                          ? label
                          : field?.value?.id
                          ? field?.value?.label
                          : label}
                      </label>
                      {isMulti && field.value && field.value.length > 0 && (
                        <div className="bg-blue-700 text-white text-p-xs px-1 py-[2px] rounded group-hover:bg-blue-600">
                          {field.value.length}
                        </div>
                      )}

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
                            <Listbox
                              value={currentValue || []}
                              onChange={setCurrentValue}
                              multiple={isMulti}
                            >
                              <ListboxOptions
                                static
                                className="max-h-60 w-full overflow-x-hidden overflow-y-auto bg-white text-p-md focus:outline-none sm:text-sm relative"
                              >
                                <div className="mr-1 sticky top-0 z-30">
                                  {showFilter && (
                                    <InputSmall
                                      icon={<i className="uil uil-search"></i>}
                                      onChange={(e: any) => setFilter(e)}
                                      value={filter}
                                      placeholder="Pesquisar"
                                      clearField
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === " " ||
                                          e.code === "Space"
                                        ) {
                                          e.stopPropagation();
                                        }
                                      }}
                                    />
                                  )}
                                  {subFilters && fetch && (
                                    <div className="flex items-center gap-2 pt-2 bg-white">
                                      {subFilters.map((item, index) => {
                                        const active = item?.id === subFilter;
                                        return (
                                          <button
                                            key={index}
                                            className={clsx(
                                              {
                                                ["bg-blue-700 text-white"]:
                                                  active,
                                                ["text-paragraph"]: !active,
                                              },
                                              `rounded-[20px] border-[0.5px] border-light-gray-200 px-4 py-[6px]`
                                            )}
                                            onClick={() => {
                                              if (subFilter == item.id) {
                                                setSubFilter(null);
                                              } else {
                                                setSubFilter(item.id);
                                              }
                                            }}
                                          >
                                            {item.name}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                                {loading && (
                                  <div className="flex items-center justify-center gap-2 w-full my-4">
                                    <img
                                      className="animate-spin"
                                      src="/spinner-gray.svg"
                                      alt="circle"
                                      width={13}
                                      height={13}
                                    />
                                    Carregando
                                  </div>
                                )}
                                {data?.length === 0 &&
                                  filter?.length > 0 &&
                                  !loading && (
                                    <div className="py-4">
                                      <span className="text-label text-p-md">
                                        {emptyMessage}
                                      </span>
                                    </div>
                                  )}
                                {initialMessage &&
                                  data?.length === 0 &&
                                  filter?.length === 0 &&
                                  !loading &&
                                  options?.length === 0 &&
                                  !currentValue?.id && (
                                    <div className="py-4">
                                      <span className="text-label text-p-md">
                                        {initialMessage}
                                      </span>
                                    </div>
                                  )}
                                {initialMessage &&
                                  currentValue &&
                                  currentValue?.id &&
                                  filter?.length === 0 && (
                                    <div className="py-2">
                                      {isMulti ? (
                                        <>
                                          {currentValue?.map((option) => {
                                            let isSelected = isMulti
                                              ? currentValue &&
                                                currentValue?.length > 0 &&
                                                currentValue?.some(
                                                  (e) => e.id === option.id
                                                )
                                              : currentValue &&
                                                currentValue?.id === option.id;
                                            return optionStyle(
                                              options,
                                              isSelected
                                            );
                                          })}
                                        </>
                                      ) : (
                                        optionStyle(field.value, true)
                                      )}
                                    </div>
                                  )}
                                {!loading &&
                                  data?.map((option) => {
                                    let isSelected = isMulti
                                      ? currentValue &&
                                        currentValue.length > 0 &&
                                        currentValue.some(
                                          (e) => e.id === option.id
                                        )
                                      : currentValue &&
                                        currentValue.id === option.id;
                                    return optionStyle(option, isSelected);
                                  })}
                              </ListboxOptions>
                            </Listbox>
                            {!applyOnClick && (
                              <div className="flex gap-2 items-center justify-end border-t border-t-light-gray-200 pt-3">
                                {isMulti && onSelectAll && (
                                  <div className="border-r pr-2 border-dark-blue-300">
                                    <Button
                                      variant="link"
                                      size="xxs"
                                      onClick={() => {
                                        onSelectAll();
                                        field.onChange(options);
                                        setCurrentValue(options);
                                        close();
                                      }}
                                    >
                                      Marcar todos
                                    </Button>
                                  </div>
                                )}
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
                            )}
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
