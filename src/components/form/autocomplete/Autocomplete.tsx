import React, { useState, useRef, useEffect } from "react";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./Autocomplete.styles";

import { IAutocompleteProps } from "./Autocomplete.interfaces";
import { useController, useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import AutocompletePopup from "./autocompletePopup/AutocompletePopup";

const Autocomplete = ({
  name,
  label,
  fullWidth = false,
  options,
  optionLabel,
  optionRender,
}: IAutocompleteProps) => {
  const renderValue = optionRender || optionLabel;
  const { t } = useTranslation();
  const {
    field,
    fieldState: { error, isTouched },
  } = useController({ name });

  const { setValue, trigger } = useFormContext();

  const inputProps = {
    ...field,
    name,
  };

  const [autocompletePopup, setAutocompletePopup] = useState(false);
  const [inputContent, setInputContent] = useState<string>(
    field.value?.toString() || ""
  );

  useEffect(() => {
    //close popup helper
    const listFilter = options.filter(
      (option) => option[optionLabel].toString() === inputContent
    );

    if (listFilter.length < 1) {
      if (typeof options[0][renderValue] === "number") {
        setValue(name, 0);
      } else {
        setValue(name, "");
      }
      setInputContent("");
    }
    return;
  }, [autocompletePopup]);

  //initial values
  useEffect(() => {
    const getOptionLabel = options.find(
      (option) => option[renderValue] === field.value
    );

    if (getOptionLabel) {
      setValue(name, field.value);
      setInputContent(getOptionLabel[optionLabel].toString());
    }
  }, [options]);

  const optionFilter = (options: IAutocompleteProps["options"]) => {
    if (
      options.find((option) => option[optionLabel].toString() === inputContent)
    ) {
      return options;
    }

    return options.filter((option) =>
      option[optionLabel]
        .toString()
        .toLowerCase()
        .includes(inputContent.toLowerCase())
    );
  };

  const handleChange = (value: string) => {
    if (typeof options[0][renderValue] === "number") {
      const numberValue = parseFloat(parseFloat(value).toFixed(2));

      setValue(name, numberValue);
    } else {
      setValue(name, value !== null ? value : "");
    }

    const getOptionLabel = options.find(
      (option) => option[renderValue].toString() === value
    );

    if (getOptionLabel) {
      setInputContent(getOptionLabel[optionLabel].toString());
      setAutocompletePopup(false);
    }

    trigger();
  };

  return (
    <Styled.AutocompleteWrapper
      fullWidth={fullWidth}

      // onClick={() => setAutocompletePopup(true)}
    >
      <Styled.AutoCompleteInputWrapper>
        <label htmlFor={name}>{label}</label>
        <input
          onFocus={() => setAutocompletePopup(true)}
          autoComplete="off"
          {...inputProps}
          // onClick={() => setAutocompletePopup(!autocompletePopup)}
          onChange={(e) => setInputContent(e.target.value)}
          value={inputContent}
        />
        {isTouched && error && (
          <p className="text-xs text-red-500 font-medium">
            {t(error.message as string)}
          </p>
        )}
      </Styled.AutoCompleteInputWrapper>

      <AutocompletePopup
        open={autocompletePopup}
        close={() => setAutocompletePopup(false)}
        fullWidth={fullWidth}
        options={optionFilter(options)}
        optionLabel={optionLabel}
        renderValue={renderValue}
        handleChange={handleChange}
      />
    </Styled.AutocompleteWrapper>
  );
};

export default Autocomplete;
