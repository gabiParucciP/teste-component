import React from "react";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import { Transition } from "@headlessui/react";

interface Props {
  title: string;
  children: ReactNode;
  open: boolean;
}

export const Accordion = ({ title, children, open = false }: Props) => {
  const [isOpen, setOpen] = useState<boolean>(open);

  return (
    <div>
      <div
        className={clsx(
          {
            ["border-light-200"]: !isOpen,
            ["border-rose-700"]: isOpen,
          },
          "flex flex-col w-full px-3 py-2 shadow-input border rounded-lg"
        )}
      >
        <button
          onClick={() => {
            setOpen((state) => !state);
          }}
          type="button"
          className="flex items-center justify-between w-full "
        >
          <span>{title}</span>
          <i
            className={clsx(
              {
                ["transform rotate-[180deg]"]: isOpen,
              },
              "duration-300 uil uil-angle-down text-[30px]"
            )}
          ></i>
        </button>
        <Transition
          show={isOpen}
          enter="ease-in duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`${
              isOpen ? "flex opacity-100" : "hidden opacity-0"
            } overflow-auto table-scroll`}
          >
            {children}
          </div>
        </Transition>
      </div>
    </div>
  );
};
