import React from "react";
import { IInputProps } from "./Textarea.interfaces";
import { useController, useForm } from "react-hook-form";

import * as Styled from "./Textarea.styles";

const Input = ({
  name,
  placeholder,
  width,
  label,
  type = "text",
  disabled,
  onChange,
  fullWidth = false,
  controlled,
}: IInputProps) => {
  const {
    field,
    fieldState: { error, isTouched },
  } = useController({ name });

  const inputProps = {
    ...field,
    type,
    name,
    placeholder,
    disabled,
  };

  if (controlled && onChange) {
    inputProps.value = field.value;
    inputProps.onChange = onChange;
  }

  return (
    <Styled.InputWrapper fullWidth={fullWidth}>
      <label htmlFor={name}>{label}</label>
      <input {...inputProps} />
      {isTouched && error && (
        <p className="text-xs text-red-500 font-medium">{error.message}</p>
      )}
    </Styled.InputWrapper>
  );
};

export default Input;
