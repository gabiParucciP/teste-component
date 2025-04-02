import React from "react";
import { Controller, FieldError } from "react-hook-form";
import CreatableSelect, { components, ValueContainerProps } from "react-select";
import { customStyles } from "./InputTag.styles";
import { KeyboardEventHandler, useState } from "react";
import clsx from "clsx";
import "./inputtag.css";

export type OptionType = {
  value: number | string;
  label: string;
};

interface SelectFieldProps {
  name: string;
  defaultValue?: any;
  control?: any;
  placeholder?: string;
  required?: boolean;
  label?: string;
  error?: FieldError | undefined;
  onKeyDown?: (event: any) => void;
  blockSpaces?: boolean;
}

export const InputTag = ({
  name,
  label = "",
  error,
  defaultValue,
  control,
  required,
  placeholder,
  blockSpaces = false,
}: SelectFieldProps) => {
  const [inputValue, setInputValue] = useState("");

  const fieldValidationMessages = [error?.message];

  const hasError = {
    hasError: fieldValidationMessages.some((item) => item !== undefined),
  };

  const removeSpaces = (value: string) => {
    return value
      ?.replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "");
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const handleKeyDown: KeyboardEventHandler = (event) => {
          if (
            !inputValue ||
            (field?.value || []).find((item) => item?.value === inputValue)
          )
            return;
          switch (event.key) {
            case "Enter":
            case "Tab":
              field.onChange([
                ...(field?.value || []),
                {
                  label: blockSpaces ? removeSpaces(inputValue) : inputValue,
                  value: blockSpaces ? removeSpaces(inputValue) : inputValue,
                },
              ]);

              setInputValue("");
              event.preventDefault();
          }
        };

        const hasLabel = {
          hasLabel: label?.length > 0,
        };

        return (
          <div
            className={`relative ${label ? "with-label" : ""}`}
            id="inputtag"
          >
            <CreatableSelect
              {...hasError}
              {...hasLabel}
              {...{ placeholder: placeholder }}
              {...field}
              styles={customStyles}
              menuIsOpen={false}
              placeholder={hasLabel.hasLabel ? " " : placeholder}
              isMulti
              tabSelectsValue={true}
              onKeyDown={handleKeyDown}
              isClearable={false}
              inputValue={inputValue}
              onInputChange={(newValue) => setInputValue(newValue)}
              isOptionDisabled={(option) => option.blocked}
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
      }}
    />
  );
};

export const ValueContainer = ({ children, ...props }: ValueContainerProps) => {
  return (
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  );
};
