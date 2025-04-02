import React from "react";
import { HTMLInputTypeAttribute, KeyboardEventHandler, useRef } from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import InputMask from "react-input-mask";
import Input from "./Input";

type MaskedInputProps = {
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  error?: Merge<FieldError, FieldErrorsImpl<any>>;
  mask?: string;
  control: any;
  name: string;
  required?: boolean;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  maskChar?: string;
  alwaysShowMask?: boolean;
  defaultValue?: any;
  disabled?: boolean;
};

export const MaskedInput = ({
  type = "text",
  name,
  label,
  placeholder,
  error,
  mask,
  control,
  required,
  onKeyUp,
  maskChar = "",
  alwaysShowMask,
  defaultValue,
  disabled,
}: MaskedInputProps) => {
  const ref = useRef(null);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const beforeMaskedValueChange = (newState: any, userInput: any) => {
          var { value } = newState;
          var selection = newState.selection;
          var cursorPosition = selection ? selection.start : null;
          var chars = [".", "-", "/", "(", ")", " "];
          var words = [...value];

          if (chars.includes(words[words.length - 1])) {
            if (cursorPosition === value.length) {
              cursorPosition--;
              selection = {
                start: cursorPosition,
                end: cursorPosition,
              };
            }
            value = value.slice(0, -1);
          }

          return {
            value,
            selection,
          };
        };

        return (
          <InputMask
            {...field}
            onKeyUp={onKeyUp}
            disabled={disabled}
            mask={mask}
            value={field.value || ""}
            onChange={field.onChange}
            maskChar={maskChar}
            alwaysShowMask={alwaysShowMask}
            beforeMaskedValueChange={beforeMaskedValueChange}
          >
            {(inputProps: any) => (
              <Input
                onKeyUp={onKeyUp}
                type={type}
                label={label}
                placeholder={placeholder}
                required={required}
                inputProps={inputProps}
                error={error}
                name={name}
                disabled={disabled}
                ref={ref}
              />
            )}
          </InputMask>
        );
      }}
    />
  );
};
