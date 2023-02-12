import * as yup from "yup";

export const measurementInformationsSchema = yup.object({
  name: yup.string().required("To pole jest wymagane").default(""),
  date: yup.date().required("To pole jest wymagane").default(new Date()),
  client: yup.string().required("To pole jest wymagane").default(""),
  // sex: yup
  //   .string()
  //   .oneOf(["male", "female"])
  //   .required("To pole jest wymagane")
  //   .default(""),
  // age: yup
  //   .number()
  //   .typeError("To pole jest wymagane")
  //   .positive("Wymagana wartość większa od 0")
  //   .required("To pole jest wymagane"),
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
  // pal: yup
  //   .number()
  //   .positive("To pole jest wymagane")
  //   .required("To pole jest wymagane")
  //   .default(1.4),
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
  chest_breath: yup.number().positive("Niewłaściwa wartość"),
  chest_exhaust: yup.number().positive("Niewłaściwa wartość"),
  shoulder: yup.number().positive("Niewłaściwa wartość"),
  shoulder_tonus: yup.number().positive("Niewłaściwa wartość"),
  waist: yup.number().positive("Niewłaściwa wartość"),
  hip: yup.number().positive("Niewłaściwa wartość"),
  forearm: yup.number().positive("Niewłaściwa wartość"),
  thigh: yup.number().positive("Niewłaściwa wartość"),
  calf: yup.number().positive("Niewłaściwa wartość"),
  biceps: yup.number().positive("Niewłaściwa wartość"),
  triceps: yup.number().positive("Niewłaściwa wartość"),
  shoulder_blade: yup.number().positive("Niewłaściwa wartość"),
  ala_of_ilium: yup.number().positive("Niewłaściwa wartość"),
  iliac_spine: yup.number().positive("Niewłaściwa wartość"),
  whtr: yup.number().positive("Niewłaściwa wartość"),
  whr: yup.number().positive("Niewłaściwa wartość"),
  ymca: yup.number(),
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
