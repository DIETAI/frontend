import React from "react";
import { IInputProps } from "./Input.interfaces";
import { useController, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import * as Styled from "./Input.styles";
import { t } from "i18next";

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
  textarea,
  step,
  customValue,
}: IInputProps) => {
  const { t } = useTranslation();
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
    step,
  };

  if (controlled && onChange) {
    // inputProps.value = field.value !== 0 ? field.value : "";
    (inputProps.value = field.value), (inputProps.onChange = onChange);
  }

  if (customValue) {
    inputProps.value = customValue;
  }

  return (
    <Styled.InputWrapper fullWidth={fullWidth}>
      <label htmlFor={name}>{label}</label>
      {textarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
      {isTouched && error && (
        <p className="text-xs text-red-500 font-medium">
          {t(error.message as string)}
        </p>
      )}
    </Styled.InputWrapper>
  );
};

export default Input;
