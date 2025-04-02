import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ImagePreview({ open, setOpen, previewImage }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex flex-col min-w-[350px] min-h-[250px] relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                <div className="flex flex-col h-full flex-1">
                  <div className="flex justify-between mb-2">
                    <h2 className="text-t-sm font-bold">Prévia da imagem</h2>
                    <i
                      className="uil uil-times text-[28px] cursor-pointer"
                      onClick={() => setOpen(false)}
                    ></i>
                  </div>

                  <div className="border-b border-light-200 mb-4"></div>

                  <div className="flex flex-1 h-full items-center justify-center rounded-lg w-full ">
                    <img src={previewImage} alt="previewImage" />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
