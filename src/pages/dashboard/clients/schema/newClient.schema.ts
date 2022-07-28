import * as yup from "yup";

export const clientBasicInfoSchema = yup.object({
  name: yup.string().required("To pole jest wymagane").default(""),
  lastName: yup.string().required("To pole jest wymagane").default(""),
  email: yup
    .string()
    .email("Wprowadzono nieprawidłowy adres e-mail")
    .default(""),
  phone: yup.string().default(""),
  onlineAccount: yup.boolean().default(false).required("To pole jest wymagane"),
  avatar: yup.string().default(""),
  gender: yup
    .string()
    .oneOf(["male", "female"])
    .required("To pole jest wymagane"),
  physiologicalState: yup.string().oneOf(["pregnancy", "lactation"]),
  // .when("gender", {
  //   is: "female",
  // }),
  dateOfBirth: yup.date().required("To pole jest wymagane"),
  street: yup.string().default(""),
  zipCode: yup.string().default(""),
  city: yup.string().default(""),
  notes: yup.string().default(""),
});

export const clientDiseasesSchema = yup.object({
  diseases: yup.array(
    yup
      .string()
      .oneOf([
        "flatulence",
        "constipation",
        "reflux",
        "obesity",
        "osteoporosis",
        "gout",
        "atherosclerosis",
        "hypertension",
        "tumor",
      ])
  ),
  alergens: yup.array(yup.string().oneOf(["peanuts", "rye", "eggProtein"])),

  //normy dobowe witaminy i składniki mineralne, pózniej możliwość edycji
  //główny pomiar i analiza składu ciała z bioimpedancji
  //cele => główny oczekiwana masa ciała w jakim czasie, inne
  //wywiad => 1) PAL, lubiane produkty, nielubiane produkty
  //treningi, ilość w ciągu dnia, rodzaj dyscypliny, treningi w klubie, treningi indywidualne, godziny treningów
  //suplementacja, suplementacja po treningu, rodzaj spożywanych płynów,
  //jakościowa ocena jadłospisu => częstotliwość występowania do generowania diety!!
  //ocena wyglądu pacjenta
  //pytania o rodzinę
  //styl życia => praca, regularne godziny pracy, podgrzewanie posiłków w pracy,
  //używki => kawa, herbata, alkohol, papierosy
  //ceny => ile chcesz wydawać na jedzenie w ciągu tygodnia
  //podjadanie pomiędzy posiłkami, słodycze
  //funkcjonowanie w ciągu dnia, tydzien, weekend o której wstaje
  //umiejętności kulinarne, szybkie posiłki, skomplikowane,
  //podsumowanie
});

export const clientMeasurementsSchema = yup.object({
  date: yup.date(),
  weight: yup.number(),
});

export const clientAimsSchema = yup.object({
  weightAim: yup.object({
    current: yup.number(),
    target: yup.number(),
  }),
  allAims: yup.array(yup.string()),
});

export const clientNutritionalInterviewSchema = yup.object({
  clientType: yup
    .string()
    .oneOf([
      "chory leżący",
      "niska aktywność fizyczna",
      "umiarkowana aktywność fizyczna",
      "aktywny tryb życia",
      "sportowiec amator",
      "sportowiec wyczynowy",
    ])
    .required(),
  pal: yup.number().required(),
  physicalActivity: yup.object({
    sportDyscyplines: yup.array(yup.string()),
    trainings: yup.object({
      day: yup
        .string()
        .oneOf([
          "monday, tuesday, wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ]),
      hour: yup.number(),
      time: yup.number(),
      temperature: yup.number(),
      weather: yup.string().oneOf(["sunny", "cloudy", "rainy", "windy"]),
    }),
  }),
  supplements: yup.array(
    yup.object({
      name: yup.string(),
      type: yup.string(),
      day: yup
        .string()
        .oneOf([
          "monday, tuesday, wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ]),
      hour: yup.number(),
    })
  ),
  likedProducts: yup.array(yup.string()),
  dislikedProducts: yup.array(yup.string()),
});

export type IClientBasicInfo = yup.InferType<typeof clientBasicInfoSchema>;
export type IClientDiseases = yup.InferType<typeof clientDiseasesSchema>;
export type IClientMeasurements = yup.InferType<
  typeof clientMeasurementsSchema
>;
export type IClientAims = yup.InferType<typeof clientAimsSchema>;
export type IClientNutritionalInterview = yup.InferType<
  typeof clientNutritionalInterviewSchema
>;
