import React from "react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { ReactNode, useState } from "react";
import { Button } from "./Button";

type EditableTextProps = {
  control?: any;
  name?: string;
  emptyLabel?: string | JSX.Element;
  children?: ReactNode;
  onApply?: () => void;
  value?: (value) => JSX.Element;
  hideEditIcon?: boolean;
  truncate?: boolean;
};

export const EditableText = ({
  control,
  name = "",
  emptyLabel,
  children,
  onApply,
  value,
  hideEditIcon,
  truncate,
}: EditableTextProps) => {
  const [showModal, setShowModal] = useState(false);

  const truncateText = (str, max, len) => {
    return str.length > max ? str.substring(0, len) + "..." : str;
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="flex flex-col relative">
            <div
              className="group flex gap-[5px] items-baseline cursor-pointer z-[500]"
              onClick={() => setShowModal(!showModal)}
            >
              {value && field.value ? (
                <>
                  {truncate
                    ? value(truncateText(field.value, 14, 12))
                    : value(field.value)}
                </>
              ) : field.value ? (
                <label
                  className={clsx(
                    {
                      ["text-label"]: !field.value,
                      ["text-paragraph"]: field.value,
                    },
                    "text-p-md group-hover:underline group-hover:underline-offset-[3px] cursor-pointer decoration-blue-700"
                  )}
                >
                  Preenchido
                </label>
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
              {!hideEditIcon && (
                <i
                  style={{ fontSize: "14px" }}
                  className="uil uil-pen text-sm text-blue-700"
                ></i>
              )}
            </div>
            {showModal && (
              <div>
                <div className="w-[160px] md:w-[294px] p-2 bg-white border border-dark-blue-300 absolute z-[500] rounded-lg">
                  <div className="pb-3 ">{children}</div>
                  <div className="pt-3 pb-1 border-t border-light-gray-200 flex flex-col md:flex-row md:items-center md:justify-end gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setShowModal(false);
                        onApply && onApply();
                      }}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
                <div
                  className="fixed top-0 bottom-0 left-0 right-0 z-40"
                  onClick={() => setShowModal(false)}
                ></div>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
