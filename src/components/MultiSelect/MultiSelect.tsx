import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import Select, { components, ValueContainerProps } from "react-select";
import { customStyles } from "./MultiSelect.styles";
import clsx from "clsx";
import "./multiselect.css";

export type OptionType = {
  value: number | string;
  label: string;
};

interface SelectFieldProps {
  name: string;
  options: OptionType[];
  defaultValue?: OptionType;
  control?: Control<any>;
  isSearchable?: boolean;
  required?: boolean;
  label?: string;
  error?: Merge<FieldError, FieldErrorsImpl<any>>;
  disabled?: boolean;
}

export const MultiSelect = ({
  name,
  options,
  label = "",
  error,
  defaultValue,
  control,
  isSearchable = false,
  required,
  disabled,
}: SelectFieldProps) => {
  const fieldValidationMessages = [error?.message];

  const hasError = {
    hasError: fieldValidationMessages.some((item) => item !== undefined),
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const { DropdownIndicator, Option } = components;

        const DropdownIndicatorCustom = (props: any) => {
          return (
            <DropdownIndicator {...props}>
              <i className="uil uil-angle-down text-[20px]"></i>
            </DropdownIndicator>
          );
        };

        const IconOption = (props: any) => {
          return (
            <Option {...props}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <span className={clsx("text-p-md focus:text-white")}>
                  {props.data.label}
                </span>
              </div>
            </Option>
          );
        };

        const NoOptionsMessage = () => {
          return (
            <div className="p-2 text-dark-blue-300">Nenhum dado encontrado</div>
          );
        };

        return (
          <div className="relative h-full" id="multiselect">
            <Select
              {...field}
              {...hasError}
              isDisabled={disabled}
              name={field.name}
              ref={field.ref}
              styles={customStyles}
              placeholder=" "
              isSearchable={isSearchable}
              options={options}
              isMulti
              tabSelectsValue={true}
              components={{
                ValueContainer,
                Option: IconOption,
                NoOptionsMessage,
                DropdownIndicator: DropdownIndicatorCustom,
              }}
              isOptionDisabled={(option: any) => option.blocked}
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
            />

            <span
              className={clsx("text-label text-sm left-2.5", {
                [" scale-75 -translate-y-3 "]:
                  field.value && field.value.length > 0,
                ["text-dangerous-700"]: hasError.hasError,
              })}
            >
              {label}
              {required && label && (
                <strong className="text-dangerous-700">&nbsp;*</strong>
              )}
            </span>

            {fieldValidationMessages.map((message: any, index) => (
              <div
                key={index}
                className="text-dangerous-700 text-xs -mt-[5px]"
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
