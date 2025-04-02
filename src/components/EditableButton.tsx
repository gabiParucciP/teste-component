import React from "react";
import { ReactNode, useState } from "react";
import { Button } from "./Button";
type EditableTextProps = {
  children?: ReactNode;
  button?: ReactNode;
  onClose?: Function;
};

export const EditableButton = ({
  children,
  button,
  onClose,
}: EditableTextProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col relative">
      <div
        className="group flex gap-[5px] items-center cursor-pointer"
        onClick={() => setShowModal(!showModal)}
      >
        {button}
      </div>
      {showModal && (
        <div className="max-w-[294px] p-2 bg-white border border-dark-blue-300 top-14 absolute z-50 rounded-lg">
          <div className="pb-3">{children}</div>
          <div className="pt-3 pb-1 border-t border-light-gray-200 flex items-center justify-end gap-2">
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
                if (onClose) onClose();
              }}
            >
              Aplicar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
