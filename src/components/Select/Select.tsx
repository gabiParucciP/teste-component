import React from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { components, ValueContainerProps } from "react-select";
import AsyncSelect from "react-select/async";
import { customStyles } from "./Select.styles";
import { useEffect, useState } from "react";
import clsx from "clsx";
import "./select.css";
export type OptionType = {
  value: number | string;
  label: string;
};

type SelectFieldProps = {
  name: string;
  defaultValue?: any;
  control?: any;
  placeholder?: string;
  isSearchable?: boolean;
  onChange?: any;
  required?: boolean;
  isClearable?: boolean;
  filterOptions?: (value) => any;
  debounce?: number;
  error?: Merge<FieldError, FieldErrorsImpl<any>>;
  optionsList?: any;
  disabled?: boolean;
  onChangeValue?: (value) => void;
  label?: string;
};

export const SelectField = ({
  name,
  label = "",
  error,
  defaultValue,
  control,
  placeholder,
  isSearchable = false,
  isClearable = false,
  onChange,
  required,
  debounce = 0,
  filterOptions,
  optionsList,
  disabled,
  onChangeValue,
}: SelectFieldProps) => {
  const { Option, DropdownIndicator, ClearIndicator } = components;
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(() => optionsList || []);

  const loadOptions = (inputValue: string) => {
    setLoading(true);
    if (isSearchable && filterOptions) {
      if ((debounce && inputValue.length >= debounce) || !debounce) {
        const result = filterOptions(inputValue);
        setLoading(false);
        return result;
      }
    } else {
      setOptions(optionsList);
    }
  };

  const fieldValidationMessages = [error?.message];

  const hasError = {
    hasError: fieldValidationMessages.some((item) => item !== undefined),
  };

  const hasLabel = {
    hasLabel: label?.length > 0,
  };

  useEffect(() => {
    setOptions(() => optionsList);
  }, [optionsList]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const IconOption = (props) => {
          return (
            <Option {...props}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span className={clsx("text-p-md focus:text-white")}>
                  {props.data.label}
                </span>
              </div>
            </Option>
          );
        };

        const LoadingMessage = (props: any) => {
          if (!debounce || (debounce && inputValue.length >= debounce)) {
            return (
              <div
                {...props.innerProps}
                className="flex items-center gap-[6px] p-2"
              >
                <img
                  className="animate-spin "
                  src="/spinner.svg"
                  alt="circle"
                  width={16}
                  height={16}
                />
                Buscando...
              </div>
            );
          } else if (debounce && inputValue.length < debounce) {
            return (
              <div className="p-2 text-dark-blue-300">
                Digite {debounce} ou mais caracteres para pesquisar
              </div>
            );
          }
        };

        const NoOptionsMessage = (props: any) => {
          if (
            (props.selectProps.inputValue.length == 0 && debounce > 0) ||
            (debounce > 0 && props.selectProps.inputValue.length < debounce)
          ) {
            return (
              <div className="p-2 text-dark-blue-300">
                Digite {debounce} ou mais caracteres para pesquisar
              </div>
            );
          } else if (
            props.selectProps.inputValue.length > 0 &&
            props?.options?.length == 0
          ) {
            return (
              <div className="p-2 text-dark-blue-300">
                Nenhum dado encontrado
              </div>
            );
          }
        };

        const DropdownIndicatorCustom = (props: any) => {
          return (
            <DropdownIndicator {...props}>
              <i className="uil uil-angle-down text-[20px]"></i>
            </DropdownIndicator>
          );
        };

        const ClearIndicatorCustom = (props: any) => {
          return (
            <ClearIndicator {...props}>
              <i className="uil uil-times text-[20px]"></i>
            </ClearIndicator>
          );
        };

        console.log(debounce > 0 ? false : optionsList ? options : true);

        return (
          <div className="relative" id="select">
            <AsyncSelect
              {...field}
              {...hasError}
              {...hasLabel}
              isDisabled={disabled}
              loadingMessage={() => <div>Carregando</div>}
              isLoading={loading}
              defaultOptions={
                debounce > 0 ? false : optionsList ? options : true
              }
              loadOptions={loadOptions}
              name={field.name}
              isClearable={isClearable}
              ref={field.ref}
              styles={customStyles}
              placeholder=" "
              isSearchable={isSearchable}
              options={options}
              tabSelectsValue={true}
              components={{
                ValueContainer,
                Option: IconOption,
                LoadingIndicator: () => <></>,
                LoadingMessage: LoadingMessage as any,
                NoOptionsMessage: NoOptionsMessage as any,
                DropdownIndicator: DropdownIndicatorCustom,
                ClearIndicator: ClearIndicatorCustom,
              }}
              closeMenuOnSelect
              hideSelectedOptions={false}
              onChange={(value) => {
                field.onChange(value);
                if (onChangeValue) {
                  onChangeValue(value);
                }
              }}
            />
            <span
              className={clsx(
                "text-label text-sm left-2.5 cursor-pointer pointer-events-none",
                {
                  [" scale-75 -translate-y-3 "]: field.value,
                  ["text-dangerous-700"]: hasError.hasError,
                }
              )}
            >
              {label}
            </span>
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
};

export const ValueContainer = ({ children, ...props }: ValueContainerProps) => {
  return (
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  );
};
