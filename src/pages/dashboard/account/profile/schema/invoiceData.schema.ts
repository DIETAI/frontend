import * as yup from "yup";

export const invoiceDataSchema = yup.object({
  companyName: yup.string().required("To pole jest wymagane").default(""),
  taxpayerIdentificationNumber: yup
    .string()
    .required("To pole jest wymagane")
    .default(""),
  zipCode: yup.string().required("To pole jest wymagane").default(""),
  city: yup.string().required("To pole jest wymagane").default(""),
  street: yup.string().required("To pole jest wymagane").default(""),
  houseNumber: yup.string().required("To pole jest wymagane").default(""),
  apartmentNumber: yup.string().default(""),
});

export type IInvoiceData = yup.InferType<typeof invoiceDataSchema>;
