import React, { useState } from "react";

//components
import Heading from "components/heading/Heading";
import CalendarNoteEditForm from "./editForm/CalendarNoteEditForm";
import CalendarNoteDeleteForm from "./deleteForm/CalendarNoteDeleteForm";

import Button from "components/form/button/Button";

//icons
import { FaFileAlt } from "icons/icons";

//styles
import * as Styled from "./CalendarNoteModal.styles";

//utils
import { ICalendarNoteData } from "interfaces/calendarNote";

export type IPage = "info" | "edit" | "delete";

const CalendarNoteModal = ({
  date,
  closeModal,
  calendarNote,
}: {
  date: Date;
  closeModal: () => void;
  calendarNote?: ICalendarNoteData;
}) => {
  const [page, setPage] = useState<IPage>("info");

  if (!calendarNote) return null;

  return (
    <Styled.ModalContentWrapper>
      <Heading icon={<FaFileAlt />} title="Notatka" />

      {page === "info" && (
        <>
          <Styled.NoteWrapper>
            <h2>{calendarNote.title}</h2>
            <p>{calendarNote.description}</p>
          </Styled.NoteWrapper>
          <Styled.ButtonsWrapper>
            <Button variant="primary" onClick={() => setPage("edit")}>
              edytuj
            </Button>
            <Button variant="delete" onClick={() => setPage("delete")}>
              usuń
            </Button>
          </Styled.ButtonsWrapper>
        </>
      )}

      {page === "edit" && (
        <CalendarNoteEditForm
          closeModal={closeModal}
          calendarNote={calendarNote}
          page={page}
          setPage={setPage}
        />
      )}

      {page === "delete" && (
        <CalendarNoteDeleteForm
          closeModal={closeModal}
          calendarNote={calendarNote}
          page={page}
          setPage={setPage}
        />
      )}
    </Styled.ModalContentWrapper>
  );
};

export default CalendarNoteModal;
