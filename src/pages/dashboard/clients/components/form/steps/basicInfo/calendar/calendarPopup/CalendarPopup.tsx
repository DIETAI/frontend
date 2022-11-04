import React, { useState, useEffect, useRef } from "react";
import * as Styled from "./CalendarPopup.styles";

import { useFormContext } from "react-hook-form";

//icons
import {
  FaCalendar,
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
} from "icons/icons";

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
  eachYearOfInterval,
} from "date-fns";

interface ICalendarPopupProps {
  open: boolean;
  close: () => void;
  fullWidth: boolean;
  name: string;
}

const currentDate = new Date();

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
  const [openYearsBox, setOpenYearsBox] = useState(false);
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
    // const month = currentMonth + 1;

    const month = calendarValues.month.getMonth() + 1;
    handleOwnCalendar(month);
  };

  const prevMonth = () => {
    // const month = currentMonth - 1;

    const month = calendarValues.month.getMonth() - 1;
    handleOwnCalendar(month);
  };

  const changeYear = (year: Date) => {
    const month = currentMonth;
    const yearToChange = new Date(
      year.getFullYear(),
      calendarValues.month.getMonth(),
      selectedDay.getDay() - 1
    );

    // setCurrentMonth(0);

    handleOwnCalendar(month, yearToChange);
    setOpenYearsBox(false);
  };

  const handleOwnCalendar = (month: number, year?: Date) => {
    //błąd przy zmianie miesiąca => zmienia też rok
    setCurrentMonth(month);
    // const startDate = year ? year : addMonths(new Date(), month);
    const startDate = year
      ? year
      : new Date(
          calendarValues.year.getFullYear(),
          month,
          selectedDay.getDay() - 1
        );

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

  const openYears = () => {
    console.log("open years modal");
    setOpenYearsBox(!openYearsBox);
  };

  const dateFormat = (date: Date) => {
    const formatDate = format(new Date(date), "Y");

    return formatDate;
  };

  const calendarYears = eachYearOfInterval({
    start: new Date(currentDate.getFullYear() - 120, 11, 10),
    end: new Date(currentDate.getFullYear(), 11, 10),
  });

  if (!open) return null;

  return (
    <Styled.CalendarContainer ref={calendarRef} fullWidth={fullWidth}>
      <Styled.CalendarOptions>
        <Styled.CalendarYearOption active={openYearsBox}>
          {calendarValues.month && calendarValues.year ? (
            <h2>
              {format(calendarValues.month, "LLLL", { locale: pl })}{" "}
              {format(calendarValues.year, "yyyy", { locale: pl })}
            </h2>
          ) : (
            <h2>-</h2>
          )}

          <button type="button" onClick={openYears}>
            <FaChevronDown />
          </button>
        </Styled.CalendarYearOption>

        <Styled.ChevronWrapper>
          <button type="button" onClick={prevMonth}>
            <FaChevronLeft />
          </button>

          <button type="button" onClick={nextMonth}>
            <FaChevronRight />
          </button>
        </Styled.ChevronWrapper>
      </Styled.CalendarOptions>
      <Styled.CalendarContentWrapper>
        {openYearsBox && (
          <Styled.CalendarYearsWrapper>
            {calendarYears.map((calendarYear, index) => (
              <Styled.CalendarYearItem
                key={calendarYear.toString()}
                onClick={() => changeYear(calendarYear)}
              >
                {/* {calendarYear.toString()} */}
                <p>{dateFormat(calendarYear)}</p>{" "}
              </Styled.CalendarYearItem>
            ))}
          </Styled.CalendarYearsWrapper>
        )}

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
      </Styled.CalendarContentWrapper>
    </Styled.CalendarContainer>
  );
};

export default CalendarPopup;
