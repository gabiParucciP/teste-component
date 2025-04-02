import React from "react";
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useMemo,
  useState,
} from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import clsx from "clsx";
import _debounce from "lodash/debounce";

type InputNumberProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  type?: HTMLInputTypeAttribute;
  control: any;
  onClick?: any;
  error?: Merge<FieldError, FieldErrorsImpl<any>>;
  onBlur?: any;
  onChangeValue?: (e) => void;
  inputProps?: any;
  icon?: JSX.Element;
  clearField?: boolean;
  name?: string;
  hideArrows?: boolean;
  onlyNumbers?: boolean;
  showZero?: boolean;
  maxValue?: number;
};
function InputNumber({
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
  hideArrows = false,
  maxLength,
  onlyNumbers,
  showZero,
  maxValue,
}: InputNumberProps) {
  const input = name ? document?.getElementById(name) : null;

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
    icon: `absolute bg-light-gray-100 h-[44px] top-[2px] left-[1.5px] w-[38px] rounded-l-lg ${
      hasError ? "text-dangerous-700" : "text-label"
    }
      `,
    label:
      "absolute text-label top-[0.80rem] z-10 origin-[0] transform -translate-y-3 scale-75 duration-300 text-sm peer-focus:text-blue-700 peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
    buttonsWrapper:
      "absolute top-[7px] right-[10px] cursor-pointer text-label flex flex-col gap-[2px]",
    button:
      "border-[0.5px] border-dark-blue-300 rounded shadow-input h-4 w-4 flex items-center justify-center",
  };
  const [debouncedCount, setDebouncedCount] = useState(0);
  const save = () => {
    if (onBlur) {
      onBlur(value);
    }
  };

  const updateCount = useMemo(() => {
    return _debounce(() => {
      save();
    }, 1000);
  }, []);

  return (
    <Controller
      control={control}
      name={name as any}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        const update = (value) => {
          updateCount();
          setDebouncedCount(value);
        };

        const changeValue = (value) => {
          onChange(value);
          if (onChangeValue) {
            const val = {
              ...value,
              target: {
                ...value.target,
                value: value.target.value.replace(/^0+/, ""),
              },
            };
            onChangeValue(val);
          }
          update(debouncedCount + 1);
        };
        return (
          <div className="relative">
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
                <input
                  type="number"
                  autoComplete="off"
                  id={name}
                  className={clsx({
                    [styles.input]: true,
                    ["pr-10"]: clearField,
                    ["pr-2"]: !clearField,
                    ["pl-[57px]"]: !label && placeholder && icon,
                  })}
                  placeholder={!label && placeholder ? placeholder : " "}
                  onKeyDown={(e) => {
                    if (
                      e.code === "ArrowUp" ||
                      e.code === "ArrowDown" ||
                      e.code === "Enter" ||
                      e.key === "+" ||
                      e.key === "-" ||
                      (e.key === "e" && !onlyNumbers)
                    ) {
                      e.preventDefault();
                    }
                    if (
                      onlyNumbers &&
                      ![
                        "Digit1",
                        "Digit2",
                        "Digit3",
                        "Digit4",
                        "Digit5",
                        "Digit6",
                        "Digit7",
                        "Digit8",
                        "Digit9",
                        "Digit0",
                        "Backspace",
                      ].includes(e.code)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onClick={onClick}
                  disabled={disabled}
                  value={
                    showZero ? String(value) : String(value).replace(/^0+/, "")
                  }
                  onChange={(e: any) => {
                    let value = maxLength
                      ? {
                          ...e,
                          target: {
                            ...e.target,
                            value: e.target.value.slice(0, maxLength),
                          },
                        }
                      : e;

                    if (
                      !maxValue ||
                      (maxValue && Number(e.target.value) <= maxValue)
                    ) {
                      changeValue(value);
                    } else {
                    }
                  }}
                  defaultValue={value}
                  onBlur={(evt) => {
                    if (onBlur) onBlur(evt.target.value);
                  }}
                />
                <label
                  className={clsx(
                    {
                      [styles.label]: true,
                      ["left-[3.5rem]"]: icon,
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
              {!hideArrows && (
                <div className={clsx([styles.buttonsWrapper])}>
                  <button
                    type="button"
                    className={clsx([styles.button])}
                    disabled={disabled}
                    onClick={() => {
                      if (
                        !maxValue ||
                        (maxValue && Number(value || 0) + 1 <= maxValue)
                      ) {
                        changeValue(String(Number(value || 0) + 1));
                      }
                    }}
                  >
                    <i className="uil uil-angle-up text-[12px] text-dark-blue-600"></i>
                  </button>
                  <button
                    type="button"
                    className={clsx([styles.button])}
                    disabled={disabled}
                    onClick={() => {
                      if (
                        !maxValue ||
                        (maxValue &&
                          Number(value === 0 ? 0 : Number(value) - 1) <=
                            maxValue)
                      ) {
                        changeValue(
                          value === 0 ? 0 : String(Number(value) - 1)
                        );
                      }
                    }}
                  >
                    <i className="uil uil-angle-down text-[12px] text-dark-blue-600"></i>
                  </button>
                </div>
              )}
            </div>
            {fieldValidationMessages.map((message: any, index) => (
              <div
                key={index}
                className="absolute text-dangerous-700 text-xs left-[4px] -bottom-[18px]"
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

export default InputNumber;
