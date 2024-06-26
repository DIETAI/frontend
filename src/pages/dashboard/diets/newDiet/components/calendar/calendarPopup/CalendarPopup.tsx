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
  isBefore,
  isWithinInterval,
  isAfter,
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
    trigger,
  } = useFormContext();

  const dayStart = watch("dayStart");
  const dayEnd = watch("dayEnd");

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

  const currentDay = new Date();

  const [selectedDay, setSelectedDay] = useState<Date>();
  const [selectedDayStart, setSelectedDayStart] = useState(currentDay);
  const [selectedDayEnd, setSelectedDayEnd] = useState(currentDay);

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

    if (name === "dayStart" && dayEnd) {
      setValue("dayEnd", undefined);
    }

    setValue(name, newDayFormat);

    trigger();

    //change days {order: 1, date}
  };

  if (!open) return null;

  console.log({
    selectedDayStart,
    selectedDayEnd,
    dayStart: new Date(dayStart),
  });

  const getDayAfter = () => {
    const startedDay = new Date(dayStart);
    const afterDate = addDays(startedDay, 13);

    return afterDate;
  };

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
            // currentDay={isSameDay(day, new Date())}
            notCurrentMonth={!isSameMonth(day, calendarValues.month)}
            selectedDay={selectedDay && isSameDay(day, selectedDay)}
            // selectedDayStart={isSameDay(day, selectedDayStart)}
            // selectedDayEnd={isSameDay(day, selectedDayEnd)}
            // dayBetween={isWithinInterval(new Date(day), {
            //   start: new Date(selectedDayStart),
            //   end: new Date(selectedDayEnd),
            // })}
            beforeDay={
              dayStart && name !== "dayStart"
                ? isBefore(day, new Date(dayStart))
                : isBefore(
                    day,
                    new Date(
                      currentDay.getFullYear(),
                      currentDay.getMonth(),
                      currentDay.getDay() - 1
                    )
                  )
            }
            afterDay={
              dayStart && name !== "dayStart" && isAfter(day, getDayAfter())
            }
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
