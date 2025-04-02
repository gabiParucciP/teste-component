import React from "react";
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  JSX,
  forwardRef,
} from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import clsx from "clsx";
import IntlCurrencyInput from "react-intl-currency-input";

type InputMoneyProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  type?: HTMLInputTypeAttribute;
  control: any;
  onClick?: any;
  error?: Merge<FieldError, FieldErrorsImpl<any>>;
  onBlur?: (value: any) => void;
  onChangeValue?: (e: any) => void;
  inputProps?: any;
  icon?: JSX.Element;
  clearField?: boolean;
  name?: string;
  isWeightField?: boolean;
  minFractionDigits?: number;
};

export const InputMoney = forwardRef(
  (
    {
      label,
      type,
      onClick,
      error,
      onBlur,
      onChangeValue,
      inputProps,
      icon,
      clearField,
      name,
      required,
      disabled,
      value,
      placeholder,
      control,
      defaultValue,
      isWeightField,
      minFractionDigits = 2,
    }: InputMoneyProps,
    ref: any
  ) => {
    const numberConfig = isWeightField
      ? {
          currency: "BRL",
          minimumFractionDigits: minFractionDigits,
          maximumFractionDigits: minFractionDigits,
          useGrouping: false,
        }
      : {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: minFractionDigits,
          maximumFractionDigits: minFractionDigits,
        };
    const currencyConfig: any = {
      locale: "pt-BR",
      formats: {
        number: {
          BRL: numberConfig,
        },
      },
    };

    const fieldValidationMessages = [error?.message];

    const hasError = fieldValidationMessages.some((item) => item !== undefined);

    const styles = {
      input: `text-p-md pl-2 peer text-paragraph shadow-input  border  rounded-lg outline-none block pb-[10px] h-[46px] w-full disabled:bg-light-gray-100 focus-visible:border  ${
        label ? "pt-[22px]" : "pt-[10px]"
      } ${
        hasError
          ? "border-dangerous-700 text-dangerous-700"
          : "border-dark-blue-300 focus-visible:border-blue-700"
      }`,
      icon: `absolute bg-light-gray-100 h-[44px] top-[1px] left-[1px] w-[38px] rounded-l-lg ${
        hasError ? "text-dangerous-700" : "text-label"
      }
        `,
      label:
        "absolute text-label top-[0.80rem] z-10 origin-[0] transform -translate-y-3 scale-75 duration-300 text-sm peer-focus:text-blue-700 peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
      buttonsWrapper:
        "absolute top-[7px] right-[10px] cursor-pointer text-label flex flex-col gap-[2px]",
      button: "border-[0.5px] border-dark-blue-300 rounded shadow-input",
    };

    return (
      <Controller
        control={control}
        name={name as string}
        defaultValue={defaultValue}
        render={({ field }) => {
          const handleChange = (event: any, value: any, maskedValue: any) => {
            event.preventDefault();
            field.onChange(value);
            if (onChangeValue) {
              onChangeValue(value);
            }
          };

          if (typeof field.value === "string")
            field.value = Number(field.value);

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
                    ref={ref}
                    className={clsx({
                      [styles.input]: true,
                      ["pr-10"]: clearField,
                      ["pr-2"]: !clearField,
                      ["pl-[46px]"]: (!label && placeholder && icon) || icon,
                    })}
                    placeholder={!label && placeholder ? placeholder : " "}
                    onClick={onClick}
                    disabled={disabled}
                    currency="BRL"
                    config={currencyConfig}
                    onChange={handleChange}
                    onBlur={() => {
                      if (onBlur) {
                        onBlur(field.value);
                      }
                    }}
                  />
                  <label
                    className={clsx(
                      {
                        [styles.label]: true,
                        ["left-[46px]"]: icon,
                        ["left-2.5"]: !icon,
                      },
                      "cursor-text"
                    )}
                    // onClick={() => ref?.current.focus()}
                  >
                    {label}
                    {required && label && (
                      <strong className="text-dangerous-700">&nbsp;*</strong>
                    )}
                  </label>
                </div>
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
        }}
      />
    );
  }
);
export default InputMoney;
