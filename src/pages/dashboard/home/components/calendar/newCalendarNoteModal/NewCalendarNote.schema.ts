import * as yup from "yup";

export const calendarNoteSchema = yup.object({
  title: yup.string().required("form.schema.required").default(""),
  description: yup.string().default(""),
  date: yup.date().required().default(new Date()),
});

export type ICalendarNoteSchema = yup.InferType<typeof calendarNoteSchema>;
