import React from "react";
import { MenuItem } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

type ItemProps = {
  index?: number;
  isActive?: boolean;
  onClick?: (event: any) => void;
  children?: ReactNode;
};

export const Item = ({ index, isActive, onClick, children }: ItemProps) => {
  return (
    <MenuItem key={index}>
      <div
        className={clsx(
          "h-[36px] p-2 rounded-lg items-center  cursor-pointer flex whitespace-nowrap no-underline ",
          {
            "bg-[#009EDB] hover:bg-[#009EDB] hover:text-[#FFFFFF] text-[#FFFFFF]":
              isActive,
          },
          {
            "hover:bg-light-gray-100 text-paragraph": !isActive,
          }
        )}
        tabIndex={index}
        role="button"
        onClick={onClick}
      >
        <div className="flex gap-2 w-full items-center whitespace-nowrap">
          {children}
        </div>
      </div>
    </MenuItem>
  );
};
