import React from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import AsyncSelect from "react-select/async";
import { components, ValueContainerProps } from "react-select";
import { customStyles } from "./MultiSelectBottom.styles";
import clsx from "clsx";
import { useState } from "react";
import "./multiselect-bottom.css";

export type OptionType = {
  value: number | string;
  label: string;
};

interface SelectFieldProps {
  name: string;
  options: OptionType[];
  defaultValue?: any;
  control?: any;
  placeholder?: string;
  isSearchable?: boolean;
  required?: boolean;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  disabled?: boolean;
  emptyMessage?: string;
  filterOptions?: (value: any) => any;
  debounce?: number;
}

export const MultiSelectBottom = ({
  name,
  options,
  label = "",
  error,
  defaultValue,
  control,
  isSearchable = false,
  required,
  disabled,
  emptyMessage,
  filterOptions,
  debounce = 0,
}: SelectFieldProps) => {
  const [loading, setLoading] = useState(false);
  const [optionsList, setOptionsList] = useState(() => options || []);
  const fieldValidationMessages = [error?.message];

  const hasError = {
    hasError: fieldValidationMessages.some((item) => item !== undefined),
  };

  const hasLabel = {
    hasLabel: label?.length > 0,
  };

  const loadOptions = (inputValue: string) => {
    setLoading(true);
    if (isSearchable && filterOptions) {
      if (!debounce || (debounce && inputValue.length >= debounce)) {
        const result = filterOptions(inputValue);
        setLoading(false);
        return result;
      }
    } else {
      setOptionsList(options);
    }
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

        const LoadingMessage = (props: any) => {
          if (
            !debounce ||
            (debounce && props.selectProps.inputValue.length >= debounce)
          ) {
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
          } else if (
            debounce &&
            props.selectProps.inputValue.length < debounce
          ) {
            return (
              <div className="p-2 text-dark-blue-300">
                Digite {debounce} ou mais caracteres para pesquisar
              </div>
            );
          }
        };

        return (
          <div className="relative h-full" id="multiselectbottom">
            <AsyncSelect
              {...field}
              {...hasError}
              isDisabled={disabled}
              name={field.name}
              ref={field.ref}
              styles={customStyles}
              placeholder=" "
              isSearchable={isSearchable}
              options={optionsList}
              isMulti
              defaultOptions={
                debounce > 0 ? false : options ? optionsList : true
              }
              loadOptions={loadOptions}
              tabSelectsValue={true}
              components={{
                ValueContainer,
                Option: IconOption,
                NoOptionsMessage: NoOptionsMessage as any,
                LoadingMessage: LoadingMessage as any,
                DropdownIndicator: DropdownIndicatorCustom,
              }}
              isOptionDisabled={(option: any) => option.blocked}
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              backspaceRemovesValue={false}
            />

            <span
              className={clsx("text-label text-sm left-2.5", {
                ["text-dangerous-700"]: hasError.hasError,
              })}
            >
              {label}
              {required && label && (
                <strong className="text-dangerous-700">&nbsp;*</strong>
              )}
            </span>
            {fieldValidationMessages?.map((message: any, index) => (
              <div
                key={index}
                className="text-dangerous-700 text-xs mt-[3px]"
                role="alert"
                aria-label={message}
              >
                {message}
              </div>
            ))}
            <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
              {field?.value?.length > 0 ? (
                field?.value?.map((item) => (
                  <div className="text-p-sm bg-light-gray-100 rounded-[20px] py-2 px-3 flex items-center justify-between mt-3">
                    <span className="whitespace-nowrap">{item.label}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const copy = [...field.value];
                        const index = copy.findIndex(
                          (opt) => opt.value == item.value
                        );
                        copy.splice(index, 1);
                        field.onChange(copy);
                      }}
                    >
                      <i className="uil uil-times text-sm text-dark-blue-400"></i>
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-p-md text-label pt-2 pl-2">
                  {emptyMessage || "Nenhuma opção selecionada"}
                </span>
              )}
            </div>
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
