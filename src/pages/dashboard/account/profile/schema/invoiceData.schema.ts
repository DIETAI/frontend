import * as yup from "yup";

export const invoiceDataSchema = yup.object({
  companyName: yup.string().required("To pole jest wymagane").default(""),
  nip: yup.string().required("To pole jest wymagane").default(""),
  city: yup.string().required("To pole jest wymagane").default(""),
  streetNumber: yup.string().required("To pole jest wymagane").default(""),
});

export type IInvoiceData = yup.InferType<typeof invoiceDataSchema>;
