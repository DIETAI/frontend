import React, { useState, useEffect, useRef } from "react";
import * as Styled from "./CalendarPopup.styles";

import { useFormContext } from "react-hook-form";

//icons
import { FaCalendar, FaChevronRight, FaChevronLeft } from "icons/icons";

//date-fns
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import pl from "date-fns/locale/pl";

import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  startOfDay,
  addDays,
  isSameDay,
  isSameMonth,
} from "date-fns";

interface ICalendarPopupProps {
  open: boolean;
  close: () => void;
  fullWidth: boolean;
  name: string;
}

const CalendarPopup = ({
  open,
  close,
  fullWidth,
  name,
}: ICalendarPopupProps) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!calendarRef.current?.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const [selectedDay, setSelectedDay] = useState(new Date());

  useEffect(() => {
    if (selectedDay) {
      return close();
    }
  }, [selectedDay]);

  const startDate = addMonths(new Date(), 0);
  const date = startOfMonth(startDate);
  const startWeek = startOfWeek(date, { weekStartsOn: 1 });
  const endMonth = endOfMonth(date);
  const endWeek = endOfWeek(endMonth, { weekStartsOn: 1 });

  const [calendarValues, setCalendarValues] = useState({
    startDay: new Date(),
    endDay: new Date(),
    month: startDate,
    year: startDate,
    daysArray: eachDayOfInterval({
      start: startWeek,
      end: endWeek,
    }),
  });

  const [currentMonth, setCurrentMonth] = useState(0);

  const nextMonth = () => {
    const month = currentMonth + 1;
    handleOwnCalendar(month);
  };

  const prevMonth = () => {
    const month = currentMonth - 1;
    handleOwnCalendar(month);
  };

  const handleOwnCalendar = (month: number) => {
    setCurrentMonth(month);
    const startDate = addMonths(new Date(), month);
    const date = startOfMonth(startDate);
    const startWeek = startOfWeek(date, { weekStartsOn: 1 });
    const endMonth = endOfMonth(date);
    const endWeek = endOfWeek(endMonth, { weekStartsOn: 1 });

    const eachDaysInMonth = eachDayOfInterval({
      start: startWeek,
      end: endWeek,
    });

    setCalendarValues({
      ...calendarValues,
      startDay: startWeek,
      endDay: endWeek,
      month: date,
      year: date,
      daysArray: eachDaysInMonth,
    });
  };

  const handleChangeDay = (day: Date) => {
    const newDay = new Date(day);
    const newDayFormat = newDay.toJSON();

    console.log(newDayFormat);

    setSelectedDay(day);
    setValue(name, newDayFormat);
  };

  if (!open) return null;

  return (
    <Styled.CalendarWrapper ref={calendarRef} fullWidth={fullWidth}>
      <Styled.CalendarOptions>
        {calendarValues.month && calendarValues.year ? (
          <h2>
            {format(calendarValues.month, "LLLL", { locale: pl })}{" "}
            {format(calendarValues.year, "yyyy", { locale: pl })}
          </h2>
        ) : (
          <h2>-</h2>
        )}

        <Styled.ChevronWrapper>
          <button type="button" onClick={prevMonth}>
            <FaChevronLeft />
          </button>

          <button type="button" onClick={nextMonth}>
            <FaChevronRight />
          </button>
        </Styled.ChevronWrapper>
      </Styled.CalendarOptions>
      <Styled.GridCalendarInfo>
        <li>pon</li>
        <li>wt</li>
        <li>śr</li>
        <li>czw</li>
        <li>pt</li>
        <li>sob</li>
        <li>niedz</li>
      </Styled.GridCalendarInfo>
      <Styled.GridCalendar>
        {calendarValues.daysArray.map((day, index) => (
          <Styled.CalendarDay
            key={index}
            currentDay={isSameDay(day, new Date())}
            currentMonth={!isSameMonth(day, calendarValues.month)}
            selectedDay={isSameDay(day, selectedDay)}
            onClick={() => handleChangeDay(day)}
          >
            {format(day, "dd")}
          </Styled.CalendarDay>
        ))}
      </Styled.GridCalendar>
    </Styled.CalendarWrapper>
  );
};

export default CalendarPopup;
