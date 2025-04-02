import React from "react";
import { DetailedHTMLProps, InputHTMLAttributes, useRef } from "react";
import { Controller, FieldError } from "react-hook-form";
import clsx from "clsx";
import IntlCurrencyInput from "react-intl-currency-input";

type InputPercentageProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  control: any;
  onClick?: any;
  error?: FieldError;
  onBlur?: any;
  onChange?: any;
  inputProps?: any;
  icon?: JSX.Element;
  clearField?: boolean;
  name?: string;
  maskChar?: string;
  minFractionDigits?: number;
  onChangeValue?: (e) => void;
};
function InputPercentage({
  label,
  onClick,
  error,
  onBlur,
  inputProps,
  icon,
  clearField,
  name,
  required,
  disabled,
  placeholder,
  control,
  defaultValue,
  minFractionDigits = 2,
  onChangeValue,
  maxLength,
}: InputPercentageProps) {
  const config = {
    currency: "BRL",
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: minFractionDigits,
    useGrouping: false,
  };
  const currencyConfig: any = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: config,
      },
    },
  };
  let inputRef = useRef(null);
  const fieldValidationMessages = [error?.message];

  const hasError = fieldValidationMessages.some((item) => item !== undefined);

  const styles = {
    input: `text-p-md pl-2 peer shadow-input  border  rounded-lg outline-none block pb-[10px] h-[46px] w-full disabled:bg-light-gray-100 focus-visible:border-1  ${
      label ? "pt-[22px]" : "pt-[10px]"
    } ${
      hasError
        ? "border-dangerous-700 text-dangerous-700"
        : "border-dark-blue-300 focus-visible:border-blue-700"
    }`,
    icon: `absolute bg-light-gray-100 h-[44px] top-[1px] left-[1.5px] w-[38px] text-[22px] rounded-lg ${
      hasError ? "text-dangerous-700" : "text-label"
    }
    `,
    label:
      "absolute text-label top-[0.80rem] z-10 origin-[0] transform -translate-y-3 scale-75 duration-300 text-sm peer-focus:text-blue-700 peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
    buttonsWrapper:
      "absolute top-[7px] right-[10px] cursor-pointer text-label flex flex-col gap-[2px]",
    button: "border-[0.5px] border-dark-blue-300 rounded shadow-input",
  };
  const input = name ? document?.getElementById(name) : null;

  return (
    <Controller
      control={control}
      name={name as any}
      defaultValue={defaultValue}
      render={({ field }) => {
        const handleChange = (event, value, maskedValue) => {
          event.preventDefault();
          field.onChange(value.toString());
          if (onChangeValue) {
            onChangeValue(value.toString());
          }
        };

        if (typeof field.value === "string") field.value = Number(field.value);

        return (
          <div>
            <div className="relative outline-none">
              {icon && (
                <div
                  className={clsx(
                    styles.icon,
                    "flex justify-center items-center"
                  )}
                >
                  {icon}
                </div>
              )}
              <div>
                <IntlCurrencyInput
                  {...inputProps}
                  {...field}
                  type="text"
                  ref={inputRef}
                  className={clsx({
                    [styles.input]: true,
                    ["pr-10"]: clearField,
                    ["pr-2"]: !clearField,
                    ["pl-[3rem]"]: icon,
                  })}
                  placeholder={!label && placeholder ? placeholder : " "}
                  onClick={onClick}
                  disabled={disabled}
                  currency="BRL"
                  config={currencyConfig}
                  onChange={handleChange}
                  max={maxLength}
                />
                <label
                  className={clsx(
                    {
                      [styles.label]: true,
                      ["left-[3rem]"]: icon,
                      ["left-2.5"]: !icon,
                    },
                    "cursor-text"
                  )}
                  onClick={() => input?.focus()}
                >
                  {label}
                  {required && label && (
                    <strong className="text-dangerous-700">&nbsp;*</strong>
                  )}
                </label>
              </div>
            </div>
            {fieldValidationMessages.map((message, index) => (
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
      }}
    />
  );
}

export default InputPercentage;
