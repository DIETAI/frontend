import React, { useState, useRef, useEffect } from "react";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./Calendar.styles";

import { ICalendarProps } from "./Calendar.interfaces";
import { useController, useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

//components
import CalendarPopup from "./calendarPopup/CalendarPopup";

const Calendar = ({ name, label, fullWidth = false }: ICalendarProps) => {
  const [calendarPopup, setCalendarPopup] = useState(false);
  const { t } = useTranslation();
  const {
    field,
    fieldState: { error, isTouched },
  } = useController({ name });

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const dayStart = watch("dayStart");

  const inputProps = {
    ...field,
    name,
  };

  const dateFormat = (date: string) => {
    const formatDate = format(new Date(date), "dd.MM.yyyy", {
      locale: pl,
    });

    return formatDate;
  };

  return (
    <Styled.CalendarWrapper
      disabled={name === "dayEnd" && !dayStart}
      fullWidth={fullWidth}
      onClick={() => setCalendarPopup(true)}
    >
      <Styled.CalendarInputWrapper>
        <label htmlFor={name}>{label}</label>
        <input
          {...inputProps}
          value={field.value ? dateFormat(field.value) : ""}
        />
        {isTouched && error && (
          <p className="text-xs text-red-500 font-medium">
            {t(error.message as string)}
          </p>
        )}
      </Styled.CalendarInputWrapper>

      <CalendarPopup
        open={calendarPopup}
        close={() => setCalendarPopup(false)}
        fullWidth={fullWidth}
        name={name}
      />
    </Styled.CalendarWrapper>
  );
};

export default Calendar;
