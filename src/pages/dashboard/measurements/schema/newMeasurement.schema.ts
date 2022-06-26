import * as yup from "yup";

export const measurementInformationsSchema = yup.object({
  name: yup.string().required("To pole jest wymagane").default(""),
  date: yup.date().required("To pole jest wymagane").default(new Date()),
  sex: yup
    .string()
    .oneOf(["male", "female"])
    .required("To pole jest wymagane")
    .default(""),
  age: yup
    .number()
    .typeError("To pole jest wymagane")
    .positive("Wymagana wartość większa od 0")
    .required("To pole jest wymagane"),
  notes: yup.string().default(""),
  images: yup.array(yup.string().required("To pole jest wymagane")),
});

export const measurementBasicDataSchema = yup.object({
  weight: yup
    .number()
    .positive("Niewłaściwa wartość")
    .required("To pole jest wymagane"),
  height: yup
    .number()
    .positive("Niewłaściwa wartość")
    .required("To pole jest wymagane"),
  pal: yup
    .number()
    .positive("To pole jest wymagane")
    .required("To pole jest wymagane")
    .default(1.4),
  ppmHarris: yup
    .number()
    .positive("Niewłaściwa wartość")
    .required("To pole jest wymagane"),
  ppmMifflin: yup
    .number()
    .positive("Niewłaściwa wartość")
    .required("To pole jest wymagane"),
  cpm: yup
    .number()
    .positive("Niewłaściwa wartość")
    .required("To pole jest wymagane"),
  bmi: yup
    .number()
    .positive("Niewłaściwa wartość")
    .required("To pole jest wymagane"),
});

export const measurementAdditionalDataSchema = yup.object({
  chest_breath: yup.number().positive("Niewłaściwa wartość").default(2),
  chest_exhaust: yup.number().positive("Niewłaściwa wartość").default(2),
  shoulder: yup.number().positive("Niewłaściwa wartość").default(2),
  shoulder_tonus: yup.number().positive("Niewłaściwa wartość").default(2),
  waist: yup.number().positive("Niewłaściwa wartość").default(2),
  hip: yup.number().positive("Niewłaściwa wartość").default(2),
  forearm: yup.number().positive("Niewłaściwa wartość").default(2),
  thigh: yup.number().positive("Niewłaściwa wartość").default(2),
  calf: yup.number().positive("Niewłaściwa wartość").default(2),
  biceps: yup.number().positive("Niewłaściwa wartość").default(2),
  triceps: yup.number().positive("Niewłaściwa wartość").default(2),
  shoulder_blade: yup.number().positive("Niewłaściwa wartość").default(2),
  ala_of_ilium: yup.number().positive("Niewłaściwa wartość").default(2),
  iliac_spine: yup.number().positive("Niewłaściwa wartość").default(2),
  whtr: yup.number().positive("Niewłaściwa wartość").default(2),
  whr: yup.number().positive("Niewłaściwa wartość").default(2),
  ymca: yup.number().default(2),
});

export type IMeasurementInformations = yup.InferType<
  typeof measurementInformationsSchema
>;
export type IMeasurementBasicData = yup.InferType<
  typeof measurementBasicDataSchema
>;
export type IMeasurementAdditionalData = yup.InferType<
  typeof measurementAdditionalDataSchema
>;
