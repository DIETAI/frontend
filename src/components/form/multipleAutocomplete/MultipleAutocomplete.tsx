import React, { useState, useRef, useEffect } from "react";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./MultipleAutocomplete.styles";

import { IAutocompleteProps } from "./MultipleAutocomplete.interfaces";
import { useController, useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

//icons
import { FaTimes } from "react-icons/fa";

//components
import AutocompletePopup from "./autocompletePopup/AutocompletePopup";

const MultipleAutocomplete = ({
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

  const { setValue, trigger, watch, getValues } = useFormContext();

  const fieldValues = watch(name) as any[];

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
    // const listFilter = options.filter(
    //   (option) => option[optionLabel].toString() === inputContent
    // );

    // if (listFilter.length < 1) {
    //   if (typeof options[0][renderValue] === "number") {
    //     setValue(name, 0);
    //   } else {
    //     setValue(name, "");
    //   }
    //   setInputContent("");
    // }
    return setInputContent("");
  }, [autocompletePopup]);

  // initial values
  // useEffect(() => {
  //   const getOptionLabel = options.find(
  //     (option) => option[renderValue] === field.value
  //   );

  //   if (getOptionLabel) {
  //     setValue(name, field.value);
  //     setInputContent(getOptionLabel[optionLabel].toString());
  //   }
  // }, [options]);

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

      setValue(name, [...fieldValues, numberValue]);
    } else {
      setValue(name, value !== null && [...fieldValues, value]);
    }

    // const getOptionLabel = options.find(
    //   (option) => option[renderValue].toString() === value
    // );

    // if (getOptionLabel) {
    //   setInputContent(getOptionLabel[optionLabel].toString());
    //   setAutocompletePopup(false);
    // }

    setAutocompletePopup(false);

    trigger();
  };

  const removeItem = (itemRender: string | number) => {
    const selectedValues = fieldValues.filter(
      (fieldValue) => fieldValue !== itemRender
    );
    setValue(name, selectedValues);
  };

  const getOptionLabel = (fieldValue: string) => {
    const option = options.find(
      (option) => option[renderValue].toString() === fieldValue
    );

    if (!option) return "";

    return option[optionLabel].toString();
  };

  return (
    <Styled.AutocompleteWrapper
      fullWidth={fullWidth}

      // onClick={() => setAutocompletePopup(true)}
    >
      <Styled.AutoCompleteInputWrapper>
        <label htmlFor={name}>{label}</label>
        <Styled.MultipleAutoCompleteContentWrapper>
          {fieldValues.length > 0 &&
            fieldValues.map((fieldValue) => (
              <Styled.SelectedItem
                key={fieldValue}
                onClick={() => removeItem(fieldValue)}
              >
                <span>{getOptionLabel(fieldValue)}</span>
                <button>
                  <FaTimes />
                </button>
              </Styled.SelectedItem>
            ))}

          <input
            placeholder={label}
            onFocus={() => setAutocompletePopup(true)}
            autoComplete="off"
            {...inputProps}
            // onClick={() => setAutocompletePopup(!autocompletePopup)}
            onChange={(e) => setInputContent(e.target.value)}
            value={inputContent}
          />
        </Styled.MultipleAutoCompleteContentWrapper>

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
        name={name}
      />
    </Styled.AutocompleteWrapper>
  );
};

export default MultipleAutocomplete;
