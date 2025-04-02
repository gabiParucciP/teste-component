import React from "react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Fuse from "fuse.js";
import InputSmall from "./InputSmall/InputSmall";

type EditableTextProps = {
  control?: any;
  name: string;
  emptyLabel?: string | JSX.Element;
  children?: ReactNode;
  options?: any;
  optionStyle?: (value) => JSX.Element;
  valueStyle?: (value) => JSX.Element;
  showInputSeach?: boolean;
  onChangeValue?: (value) => void;
};

export const EditableTextSelect = ({
  control,
  name,
  emptyLabel,
  options,
  optionStyle,
  valueStyle,
  showInputSeach,
  onChangeValue,
}: EditableTextProps) => {
  const [showModal, setShowModal] = useState(false);
  const [optionsList, setOptionsList] = useState(() => options);
  const [inputSearch, setInputSearch] = useState("");

  const optionsFuse = {
    includeScore: false,
    keys: ["name"],
  };
  const fuse = new Fuse(optionsList, optionsFuse);

  const filter = () => {
    let results = [...options];
    if (inputSearch) {
      results = fuse.search(inputSearch)?.map((result) => result.item);
    }
    setOptionsList(results);
  };

  useEffect(() => {
    setOptionsList(() => options);
  }, [options]);

  useEffect(() => {
    filter();
  }, [inputSearch]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Menu>
            <Menu.Button>
              <div
                className="group flex gap-[5px] cursor-pointer z-[500] items-center"
                onClick={() => setShowModal(!showModal)}
              >
                {field.value ? (
                  valueStyle ? (
                    valueStyle(field.value)
                  ) : (
                    field?.value?.name
                  )
                ) : (
                  <label
                    className={clsx(
                      {
                        ["text-label"]: !field.value,
                        ["text-paragraph"]: field.value,
                      },
                      "text-p-md group-hover:underline group-hover:underline-offset-[3px] cursor-pointer decoration-blue-700"
                    )}
                  >
                    {emptyLabel ? emptyLabel : "Não informado"}
                  </label>
                )}
                <i
                  style={{ fontSize: "16px" }}
                  className="uil uil-pen text-sm text-blue-700"
                ></i>
              </div>
            </Menu.Button>
            <Menu.Items>
              <div className="w-[294px] p-2 bg-white border border-dark-blue-300 absolute z-[500] rounded-lg">
                {showInputSeach && (
                  <div className="mb-2">
                    <InputSmall
                      icon={<i className="uil uil-search"></i>}
                      onChange={(e: any) => setInputSearch(e)}
                      value={inputSearch}
                      placeholder="Pesquisar"
                      clearField
                      onKeyDown={(e) => {
                        if (e.key == " " || e.code == "Space") {
                          e.stopPropagation();
                        }
                      }}
                    />
                  </div>
                )}
                {optionsList?.map((opt) => {
                  const selected = opt?.id === field?.value?.id;
                  return (
                    <Menu.Item
                      onClick={() => {
                        field.onChange(opt);
                        if (onChangeValue) {
                          onChangeValue(opt);
                        }
                      }}
                      as="button"
                      className={clsx(
                        "p-3 mb-1 rounded-lg items-center flex whitespace-nowrap no-underline w-full",
                        {
                          "bg-blue-700 hover:bg-blue-700 hover:text-[#FFFFFF] text-[#FFFFFF]":
                            selected,
                        },
                        {
                          "hover:bg-light-gray-100 text-paragraph": !selected,
                        },
                        {
                          "cursor-pointer": !opt.disabled,
                        }
                      )}
                    >
                      <div className="flex gap-2 w-full items-center whitespace-nowrap">
                        <div className="flex w-full justify-between items-center">
                          {optionStyle ? (
                            <div>{optionStyle(opt)}</div>
                          ) : (
                            <div className="flex flex-col">
                              <span className="font-bold">{opt?.title}</span>
                              <span
                                className={clsx({
                                  "text-label": opt.disabled,
                                })}
                              >
                                {opt.name}
                              </span>
                              {opt?.description}
                            </div>
                          )}
                          <span
                            className={clsx(
                              "group-hover:text-[#fff] ",
                              {
                                "text-[#fff]": selected,
                              },
                              {
                                "text-blue-700": !selected,
                              }
                            )}
                          >
                            {selected && <i className="uil uil-check"></i>}
                          </span>
                        </div>
                      </div>
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Menu>
        );
      }}
    />
  );
};
