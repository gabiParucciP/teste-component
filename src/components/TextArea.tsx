import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { DetailedHTMLProps, TextareaHTMLAttributes, useRef } from "react";
import clsx from "clsx";

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  inputProps?: any;
};

export const TextArea = ({
  label,
  registration,
  disabled,
  error,
  inputProps,
  name,
}: TextAreaProps) => {
  const inputRef = useRef(null);

  const fieldValidationMessages = [error?.message];

  const hasError = fieldValidationMessages.some((item) => item !== undefined);

  const styles = {
    input: `border border-dark-blue-800 rounded-lg block pb-[10px] pt-[18px] w-full disabled:bg-light-gray-100 focus-visible:border-blue-700 focus-visible:border-1 text-p-md peer shadow-input pl-2 outline-none ${
      hasError
        ? "border-dangerous-700 text-dangerous-700"
        : "border-dark-blue-300 text-paragraph"
    }`,
    label: `cursor-text absolute text-label top-[0.70rem] z-10 transform origin-[0] -translate-y-3 scale-75 duration-300 text-sm peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 left-2.5`,
  };

  return (
    <div>
      <div className="relative outline-none">
        <textarea
          id={name}
          name={name}
          ref={inputRef}
          className={clsx(styles.input)}
          placeholder=" "
          disabled={disabled}
          rows={4}
          {...registration}
          {...inputProps}
        />
        <label className={clsx(styles.label)} htmlFor={name}>
          {label}
        </label>
      </div>
      {fieldValidationMessages.map((message, index) => (
        <div
          key={index}
          className="text-dangerous-700 text-xs mt-[2px]"
          role="alert"
          aria-label={message}
        >
          {message}
        </div>
      ))}
    </div>
  );
};
