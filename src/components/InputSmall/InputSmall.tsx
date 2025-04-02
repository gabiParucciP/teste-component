import React from "react";
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useRef,
} from "react";
import "./input-small.css";
import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

type InputFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type?: HTMLInputTypeAttribute;
  registration?: UseFormRegisterReturn;
  onClick?: any;
  onBlur?: any;
  onChange?: any;
  inputProps?: any;
  icon?: JSX.Element;
  clearField?: boolean;
  searchOnClick?: () => void;
  onClear?: () => void;
  collapsed?: boolean;
};

export default function InputSmall({
  type,
  registration,
  onClick,
  onBlur,
  onChange,
  inputProps,
  icon,
  clearField,
  disabled,
  placeholder,
  className,
  onKeyDown,
  value,
  searchOnClick,
  onClear,
  collapsed,
}: InputFieldProps) {
  const inputRef = useRef(null);

  const styles = {
    input: `text-p-md text-paragraph w-full outline-none placeholder:text-label`,
    icon: "text-label group-focus-within:text-dark-blue-600 m-[10px]",
    wrapper: `shadow-input border border-dark-blue-300 focus-within:border-blue-700 group rounded-lg h-9 w-full text-paragraph flex items-center justify-between disabled:bg-light-gray-100 ${
      disabled ? "bg-light-gray-100" : "bg-white"
    } ${className}`,
    clear: "pr-[5px] cursor-pointer text-label text-[16px]",
  };

  const elem = inputRef?.current as any;
  return (
    <div className={clsx(styles.wrapper)}>
      {icon && !searchOnClick && (
        <div className={clsx(styles.icon)}>{icon}</div>
      )}
      <input
        {...registration}
        {...inputProps}
        type="search-text"
        ref={inputRef}
        className={clsx(
          {
            ["pl-1"]: collapsed,
          },
          styles.input
        )}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick}
        disabled={disabled}
        onKeyDown={onKeyDown}
      />
      {clearField && value && !disabled && (
        <i
          className={clsx(styles.clear, "uil uil-times")}
          onClick={() => {
            elem.value = "";
            elem?.focus();
            onChange("");
            if (onClear) {
              onClear();
            }
          }}
        ></i>
      )}
      {searchOnClick && (
        <div className="py-1">
          <button
            type="button"
            className={clsx({
              ["border-l border-input pl-1"]: clearField && value && !disabled,
              ["text-blue-700"]: !disabled,
              ["text-dark-blue-300"]: disabled,
              ["pl-[2px]"]: collapsed,
            })}
            onClick={searchOnClick}
          >
            <i className="uil uil-search text-[16px] mr-2 pl-1"></i>
          </button>
        </div>
      )}
    </div>
  );
}
