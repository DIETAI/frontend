import React, { useState, useEffect, useRef } from "react";
import * as Styled from "./HomeCalendar.styles";

import { useFormContext } from "react-hook-form";

//icons
import { FaCalendar, FaChevronRight, FaChevronLeft } from "icons/icons";

//components
import Heading from "components/heading/Heading";
import Modal from "components/modal/Modal";
import NewCalendarNoteModal from "./newCalendarNoteModal/NewCalendarNoteModal";
import CalendarNoteModal from "./calendarNoteModal/CalendarNoteModal";

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
import { getCalendarNotes } from "services/getCalendarNotes";
import { ICalendarNoteData } from "interfaces/calendarNote";

const Calendar = () => {
  const { calendarNotes, calendarNotesError, calendarNotesLoading } =
    getCalendarNotes();

  const [selectedDay, setSelectedDay] = useState(new Date());

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
    setSelectedDay(day);
  };

  if (!open) return null;

  if (calendarNotesLoading) return <div>loading...</div>;
  if (calendarNotesError || !calendarNotes) return <div>error</div>;

  return (
    <Styled.CalendarWrapper>
      <Styled.HomeCalendarHeadingWrapper>
        <Heading title="Kalendarz" icon={<FaCalendar />} />
        {/* <Button variant="secondary">
          <img src={GoogleCalendarImg} /> połącz z kalendarzem google
        </Button> */}
        {/* <button>
          <img src={GoogleCalendarImg} /> połącz z kalendarzem google
        </button> */}
      </Styled.HomeCalendarHeadingWrapper>
      {/* <Styled.CalendarNavWrapper>
        <Styled.NavOptionsWrapper>
          <Styled.NavOption active={true}>wydarzenia</Styled.NavOption>
          <Styled.NavOption active={false}>jadłospisy</Styled.NavOption>
          <Styled.NavOption active={false}>raporty</Styled.NavOption>
        </Styled.NavOptionsWrapper>
        <Styled.NavDisplayDaysOptionsWrapper>
          <Styled.NavOption active={false}>dzień</Styled.NavOption>
          <Styled.NavOption active={true}>tydzień</Styled.NavOption>
          <Styled.NavOption active={false}>miesiąc</Styled.NavOption>
        </Styled.NavDisplayDaysOptionsWrapper>
      </Styled.CalendarNavWrapper> */}
      <Styled.CalendarOptions>
        <Styled.ChevronWrapper type="button" onClick={prevMonth}>
          <FaChevronLeft />
        </Styled.ChevronWrapper>
        {calendarValues.month && calendarValues.year ? (
          <h2>
            {format(calendarValues.month, "LLLL", { locale: pl })}{" "}
            {format(calendarValues.year, "yyyy", { locale: pl })}
          </h2>
        ) : (
          <h2>-</h2>
        )}

        <Styled.ChevronWrapper type="button" onClick={nextMonth}>
          <FaChevronRight />
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
          <CalendarDay
            key={index}
            day={day}
            month={calendarValues.month}
            selectedDay={selectedDay}
            handleChangeDay={handleChangeDay}
            calendarNotes={calendarNotes}
          />
        ))}
      </Styled.GridCalendar>
    </Styled.CalendarWrapper>
  );
};

const CalendarDay = ({
  day,
  selectedDay,
  month,
  handleChangeDay,
  calendarNotes,
}: {
  day: Date;
  selectedDay: Date;
  month: Date;
  handleChangeDay: (day: Date) => void;
  calendarNotes: ICalendarNoteData[];
}) => {
  const [newCalendarNoteModal, setNewCalendarNoteModal] = useState(false);
  const [calendarNoteModal, setCalendarNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<ICalendarNoteData>(
    calendarNotes[0]
  );

  const handleOpenNewCalendarNoteModal = () => {
    setNewCalendarNoteModal(true);
  };
  const handleOpenCalendarNoteModal = (note: ICalendarNoteData) => {
    setSelectedNote(note);
    setCalendarNoteModal(true);
  };

  const currentDateCalendarNotes = calendarNotes.filter((calendarNote) =>
    isSameDay(new Date(calendarNote.date), day)
  );

  return (
    <>
      <Styled.CalendarDay
        currentDay={isSameDay(day, new Date())}
        currentMonth={!isSameMonth(day, month)}
        selectedDay={isSameDay(day, selectedDay)}
        onClick={() => handleChangeDay(day)}
      >
        <Styled.CalendarDayHeading>
          {format(day, "dd")}
          <button onClick={handleOpenNewCalendarNoteModal}>+</button>
        </Styled.CalendarDayHeading>
        {currentDateCalendarNotes.length > 0 &&
          currentDateCalendarNotes.map((calendarNote) => (
            <Styled.CalendarNotesWrapper key={calendarNote._id}>
              <Styled.CalendarNote
                onClick={() => handleOpenCalendarNoteModal(calendarNote)}
              >
                <p>{calendarNote.title}</p>
              </Styled.CalendarNote>{" "}
            </Styled.CalendarNotesWrapper>
          ))}
      </Styled.CalendarDay>
      <Modal
        onClose={() => setNewCalendarNoteModal(false)}
        open={newCalendarNoteModal}
      >
        <NewCalendarNoteModal
          date={day}
          closeModal={() => setNewCalendarNoteModal(false)}
        />
      </Modal>
      <Modal
        onClose={() => setCalendarNoteModal(false)}
        open={calendarNoteModal}
      >
        <CalendarNoteModal
          calendarNote={selectedNote}
          date={day}
          closeModal={() => setCalendarNoteModal(false)}
        />
      </Modal>
    </>
  );
};

export default Calendar;
