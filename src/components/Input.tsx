import React from "react";
import clsx from "clsx";
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

type InputFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  type?: HTMLInputTypeAttribute;
  registration?: UseFormRegisterReturn;
  onClick?: () => void;
  error?: Merge<FieldError, FieldErrorsImpl<any>>;
  onBlur?: (value: Event) => void;
  inputProps?: any;
  icon?: JSX.Element;
  clearField?: boolean;
  name?: string;
  onClear?: () => void;
  hideInput?: boolean;
};

const Input = ({
  label,
  type,
  registration,
  onClick,
  error,
  onBlur,
  inputProps,
  icon,
  clearField,
  name,
  required,
  disabled,
  value,
  placeholder,
  defaultValue,
  onKeyUp,
  onKeyDown,
  onClear,
  hideInput,
  onChange,
  ref,
}: InputFieldProps) => {
  const fieldValidationMessages = [error?.message];

  const hasError = fieldValidationMessages.some((item) => item !== undefined);

  const styles = {
    input: `text-p-md pl-2 peer shadow-input  border  rounded-lg outline-none block pb-[10px] h-[46px] w-full disabled:bg-light-gray-100 focus-visible:border-1 focus-visible:border-blue-700 ${
      label ? "pt-[22px]" : "pt-[10px]"
    }
      ${!hasError ? "border-dark-blue-300" : ""}`,
    icon: `absolute bg-light-gray-100 h-[44px] top-[1px] left-[1.5px] w-[38px] rounded-l-lg text-[20px] ${
      hasError ? "text-dangerous-700" : "text-label"
    }`,
    rightIcon: "absolute h-[44px] top-[1px] right-[1.5px] w-[38px] text-[22px]",
    label:
      "absolute text-label top-[0.80rem] z-10 origin-[0] transform -translate-y-3 scale-75 duration-300 text-sm peer-focus:text-blue-700 peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
    clear:
      "absolute top-[8px] right-[8px] cursor-pointer text-label text-[22px]",
    error: "border-dangerous-700 text-dangerous-700",
  };

  const input = name ? document?.getElementById(name) : null;
  return (
    <div className="relative">
      <div className="relative outline-none">
        {icon && (
          <div
            className={clsx(styles.icon, "flex justify-center items-center")}
          >
            {icon}
          </div>
        )}
        <div>
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            className={clsx({
              [styles.error]: hasError,
              [styles.input]: true,
              ["pr-10"]: clearField,
              ["pr-2"]: !clearField,
              ["pl-[48px]"]: (!label && placeholder && icon) || icon,
            })}
            placeholder={!label && placeholder ? placeholder : " "}
            onChange={onChange}
            onBlur={onBlur}
            onClick={onClick}
            disabled={disabled}
            ref={ref}
            {...inputProps}
            {...registration}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
          />
          {hideInput && (
            <div
              className={clsx(
                styles.rightIcon,
                "flex justify-center items-center"
              )}
            >
              <i className="uil uil-eye text-label cursor-pointer text-[20px]"></i>
            </div>
          )}
          <label
            className={clsx(
              {
                [styles.label]: true,
                ["left-[3rem]"]: icon,
                ["left-2.5"]: !icon,
              },
              "cursor-text whitespace-nowrap text-ellipsis overflow-hidden"
            )}
            htmlFor={name}
          >
            {label}
            {required && label && (
              <strong className="text-dangerous-700">&nbsp;*</strong>
            )}
          </label>
        </div>
        {clearField && value && value !== "" && !disabled && (
          <i
            className={clsx(
              {
                [styles.clear]: true,
              },
              "uil uil-times clear-icon"
            )}
            onClick={() => {
              if (input) {
                input?.focus();
              }
              if (onClear) {
                onClear();
              }
            }}
          ></i>
        )}
      </div>
      {fieldValidationMessages.map((message: any, index) => (
        <div
          key={index}
          className="text-dangerous-700 text-xs mt-1 ml-[2px]"
          role="alert"
          aria-label={message}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default Input;
