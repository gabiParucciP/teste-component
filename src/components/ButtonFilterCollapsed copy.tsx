import React from "react";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { Button } from "./Button";

type ButtonFilterCollapsedProps = {
  count: number;
  children?: ReactNode;
  onClear?: () => void;
};

export const ButtonFilterCollapsed = ({
  children,
  count,
  onClear,
}: ButtonFilterCollapsedProps) => {
  const [open, setOpen] = useState(false);
  const style = {
    filter:
      "rounded-3xl shadow-input bg-white hover:bg-light-gray-100 border border-dark-blue-300 active:text-blue-700 active:bg-blue-100 active:border-blue-700",
    filterOpen:
      "rounded-3xl shadow-input border border-blue-700 bg-blue-100 text-blue-700",
    filterActive:
      "rounded-3xl border border-blue-700 text-blue-700 bg-blue-100  shadow-input hover:bg-blue-100 active:text-white active:bg-blue-100 active:border-blue-700",
  };

  let isFill = count > 0;

  return (
    <div
      className={clsx({
        ["bg-light-gray-100 px-4 py-3 rounded-[12px]"]: open,
        ["bg-white"]: !open,
      })}
    >
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setOpen((val) => !val)}
          className={clsx(
            {
              [style.filter]: !isFill && !open,
              [style.filterOpen]: (!isFill && open) || (!open && isFill),
              [style.filterActive]: isFill && open,
            },
            "group px-3 h-[36px] w-full text-p-ls font-bold border-[0.5px] flex items-center justify-center disabled:shadow-none active:shadow-none gap-2 mb-3"
          )}
        >
          <div
            className={clsx(
              {
                ["text-label group-active:text-blue-700"]: !isFill && !open,
                ["text-blue-700"]: (!isFill && open) || (!open && isFill),
              },
              "text-lg"
            )}
          >
            <i className="uil uil-filter"></i>
          </div>
          Filtros
          {count > 0 && (
            <div className="bg-blue-700 text-white text-p-xs px-1 py-[2px] rounded">
              {count}
            </div>
          )}
          <i
            className={clsx(
              {
                ["text-label group-active:text-blue-700"]: !isFill && !open,
                ["text-blue-700"]: open && !isFill,
              },
              "uil uil-angle-down text-[18px]"
            )}
          ></i>
        </button>
        {open && (
          <i
            onClick={() => setOpen(false)}
            className="uil uil-times text-[24px] text-dark-blue-300"
          ></i>
        )}
      </div>
      {open && <div>{children}</div>}
      {onClear && open && count > 0 && (
        <div className="flex items-center justify-center mt-2">
          <Button
            size="xxs"
            variant="link"
            icon={<i className="uil uil-times"></i>}
            onClick={() => {
              onClear();
              setOpen(false);
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
};
