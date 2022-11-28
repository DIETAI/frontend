import * as yup from "yup";

export const calendarNoteSchema = yup.object({
  title: yup.string().required("form.schema.required").default(""),
  description: yup.string(),
  date: yup.date().required(),
});

export type ICalendarNoteSchema = yup.InferType<typeof calendarNoteSchema>;
