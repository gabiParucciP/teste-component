import React from "react";
import clsx from "clsx";
import { JSX, ReactNode, cloneElement } from "react";
import Modal from "react-modal";
import { Button } from "./Button";

export type ModalProps = {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  triggerButton?: React.ReactElement;
  confirmButton?: React.ReactElement;
  title?: string | React.ReactElement;
  cancelButton?: React.ReactElement;
  icon?: JSX.Element;
  alertType?: keyof typeof alertTypes;
  size?: keyof typeof sizes;
  info?: React.ReactElement;
  description?: string;
  children?: ReactNode;
};

const alertTypes = {
  success: "text-success-700",
  error: "text-dangerous-700",
  warning: "text-warning-700",
  info: "text-blue-700",
  primary: "text-rose-700",
};

const sizes = {
  xs: "w-[350px]",
  sm: "w-[662px]",
  md: "w-[960px]",
  lg: "w-[80%] min-w-[800px]",
  null: "",
};

export const ModalDialog = ({
  open,
  onOpen = () => {},
  onClose,
  onCancel,
  triggerButton,
  confirmButton,
  title,
  cancelButton,
  icon,
  alertType,
  size = "sm",
  info,
  description,
  children,
}: ModalProps) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #E8E8E9",
      padding: "24px",
      borderRadius: "8px",
      overflow: "initial",
    },
    overlay: {
      backgroundColor: "rgb(107,114,128,0.50)",
      zIndex: 9999,
    },
  };
  const trigger = cloneElement(triggerButton as any, {
    onClick: () => {
      onOpen();
    },
  });
  return (
    <div>
      {trigger}
      <Modal
        animation={false}
        ariaHideApp={false}
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        onClick={(e) => e.stopPropagation()}
        contentLabel="Example Modal"
      >
        <div className={clsx(sizes[size])}>
          <div className="pb-2 border-b border-b-light-gray-200 flex items-center justify-between">
            <h3 className="text-[24px] font-bold flex items-center gap-2">
              {alertType && (
                <div className={clsx([alertTypes[alertType]], "text-[30px]")}>
                  {icon}
                </div>
              )}
              {title}
            </h3>
            <button
              onClick={onCancel}
              className="text-dark-blue-500 text-[24px]"
            >
              <i className="uil uil-times"></i>
            </button>
          </div>
          <div>{children}</div>
          <div className="pt-6 border-t border-t-light-gray-200 flex w-full items-center justify-between">
            <div
              className={clsx({
                ["flex-1"]: info,
              })}
            >
              {info}
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-3 items-center md:justify-end w-full md:w-auto">
              {cancelButton || (
                <Button
                  onClick={() => {
                    if (onCancel) {
                      onCancel();
                    }
                  }}
                  variant="secondary"
                  size="sm"
                >
                  Cancelar
                </Button>
              )}
              {confirmButton}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
