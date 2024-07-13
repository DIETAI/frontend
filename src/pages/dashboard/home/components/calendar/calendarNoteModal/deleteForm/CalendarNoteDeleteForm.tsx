import React, { useState } from "react";
import axios from "utils/api";
import { mutate } from "swr";
import { IPage } from "../CalendarNoteModal";
import IconButton from "components/iconButton/IconButton";
import { ICalendarNoteData } from "interfaces/calendarNote";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//assets
import DeleteImg from "assets/delete.svg";

//components
import Button from "components/form/button/Button";

//styles
import * as Styled from "./CalendarNoteEditForm.styles";

//icons
import { FaChevronLeft } from "react-icons/fa";

const CalendarNoteDeleteForm = ({
  calendarNote,
  closeModal,
  page,
  setPage,
}: {
  calendarNote: ICalendarNoteData;
  closeModal: () => void;
  page: IPage;
  setPage: React.Dispatch<React.SetStateAction<IPage>>;
}) => {
  const { handleAlert } = useAlert();
  const [deleteItemValue, setDeleteItemValue] = useState("");

  const deleteAction = async () => {
    try {
      const calendarNoteData = await axios.delete(
        `/api/v1/calendarNotes/${calendarNote._id}`,
        {
          withCredentials: true,
        }
      );

      handleAlert("success", "Usunięto notatkę");

      await mutate(`/api/v1/calendarNotes`);
      closeModal();
    } catch (e) {
      handleAlert("error", "Usuwanie notatki nie powiodło się");
      console.log(e);
    }
  };

  return (
    <>
      <IconButton onClick={() => setPage("info")} icon={<FaChevronLeft />} />
      <Styled.ContentWrapper>
        <img src={DeleteImg} />
        <h2>
          Czy napewno chcesz usunąć <b>{calendarNote.title}</b> ?
        </h2>
        <p>Aby potwierdzić wpisz nazwę obiektu</p>
        <input
          onChange={(e) => setDeleteItemValue(e.currentTarget.value)}
        ></input>

        <Button
          variant={
            deleteItemValue !== calendarNote.title ? "disabled" : "primary"
          }
          onClick={deleteAction as any}
        >
          usuń
        </Button>
      </Styled.ContentWrapper>
    </>
  );
};

export default CalendarNoteDeleteForm;
