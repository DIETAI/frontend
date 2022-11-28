import React from "react";

import { useForm, FormProvider, FieldValues } from "react-hook-form";

//schema
import { calendarNoteSchema } from "./NewCalendarNote.schema";
import { yupResolver } from "@hookform/resolvers/yup";

//interfaces
import { ICalendarNoteSchema } from "./NewCalendarNote.schema";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//components
import Heading from "components/heading/Heading";
import Input from "components/form/input/Input";
import Button from "components/form/button/Button";
import ReactLoading from "react-loading";

//icons
import { FaFileAlt } from "icons/icons";

//styles
import * as Styled from "./NewCalendarNoteModal.styles";

//utils
import axios from "utils/api";
import { mutate } from "swr";

const defaultValues = calendarNoteSchema.cast({});

const CalendarNoteModal = ({
  date,
  closeModal,
}: {
  date: Date;
  closeModal: () => void;
}) => {
  const { handleAlert } = useAlert();

  const calendarNoteDefaultValues = {
    ...defaultValues,
    date,
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
      const calendarNoteData = await axios.post("/api/v1/calendarNotes", data, {
        withCredentials: true,
      });
      console.log({ calendarNoteData });
      handleAlert("success", "Dodano notatkę");
      reset();
      await mutate(`/api/v1/calendarNotes`);
      closeModal();
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie notatki nie powiodło się");
      //set error alert
    }
  };

  return (
    <Styled.ModalContentWrapper>
      <Heading icon={<FaFileAlt />} title="Stwórz notatkę" />
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
            variant={isSubmitting || !isValid ? "disabled" : "primary"}
          >
            {isSubmitting ? (
              <ReactLoading type="spin" width={20} height={20} />
            ) : (
              "wyślij"
            )}
          </Button>
        </Styled.FormWrapper>
      </FormProvider>
    </Styled.ModalContentWrapper>
  );
};

export default CalendarNoteModal;
