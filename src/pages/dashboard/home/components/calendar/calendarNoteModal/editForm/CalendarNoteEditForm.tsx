import React from "react";
import axios from "utils/api";
import { mutate } from "swr";
import { IPage } from "../CalendarNoteModal";
import IconButton from "components/iconButton/IconButton";
import { ICalendarNoteData } from "interfaces/calendarNote";

import { useForm, FormProvider, FieldValues } from "react-hook-form";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import {
  calendarNoteSchema,
  ICalendarNoteSchema,
} from "./CalendarNoteEditForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";

//components
import ReactLoading from "react-loading";
import Input from "components/form/input/Input";
import Button from "components/form/button/Button";

//styles
import * as Styled from "./CalendarNoteEditForm.styles";

//icons
import { FaChevronLeft } from "react-icons/fa";

const CalendarNoteEditForm = ({
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

  const calendarNoteDefaultValues: ICalendarNoteSchema = {
    title: calendarNote.title,
    description: calendarNote.description,
    date: calendarNote.date,
  };

  const methods = useForm({
    resolver: yupResolver(calendarNoteSchema),
    shouldUnregister: false,
    defaultValues: calendarNoteDefaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    trigger,
    reset,
    setFocus,
    getValues,
    watch,
  } = methods;

  const onSubmit = async (data: ICalendarNoteSchema) => {
    try {
      const calendarNoteData = await axios.put(
        `/api/v1/calendarNotes/${calendarNote._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ calendarNoteData });
      handleAlert("success", "Zaktualizowano notatkę");
      reset();
      await mutate(`/api/v1/calendarNotes`);
      closeModal();
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie notatki nie powiodło się");
      //set error alert
    }
  };
  return (
    <>
      <IconButton onClick={() => setPage("info")} icon={<FaChevronLeft />} />
      <FormProvider {...methods}>
        <Styled.FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Input name="title" label={"tytuł"} type="text" fullWidth />
          <Input
            textarea
            name="description"
            label="opis"
            type="text"
            fullWidth
          />
          <Button
            type="submit"
            variant={
              isSubmitting || !isValid || !isDirty ? "disabled" : "primary"
            }
          >
            {isSubmitting ? (
              <ReactLoading type="spin" width={20} height={20} />
            ) : (
              "edytuj"
            )}
          </Button>
        </Styled.FormWrapper>
      </FormProvider>
    </>
  );
};

export default CalendarNoteEditForm;
