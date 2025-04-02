import React from "react";
import {
  Menu as HeadlessMenu,
  Transition,
  MenuButton,
  MenuItems,
} from "@headlessui/react";
import { Fragment, ReactNode } from "react";

type MenuProps = {
  triggerElement?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export const Menu = ({ triggerElement, children, className }: MenuProps) => {
  return (
    <HeadlessMenu as="div" className={"relative h-full cursor-pointer"}>
      <MenuButton
        as="div"
        className="flex rounded-full text-sm h-full w-full items-center"
      >
        {triggerElement}
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={`border-[0.5px] mt-1 color-dark-blue-300 flex min-w-[200px] flex-col gap-y-2 p-3 absolute right-0 z-[999] rounded-lg shadow-[2px_4px_8px_rgba(57,60,77,0.1)] bg-white cursor-default ${className}`}
        >
          {children}
        </MenuItems>
      </Transition>
    </HeadlessMenu>
  );
};
