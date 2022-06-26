import React from "react";

//icons
import {
  FaInfoCircle,
  FaCarrot,
  FaGripHorizontal,
  FaTh,
  FaTint,
} from "icons/icons";

//components
import * as Step from "../components/form/steps";

//schema
import {
  establishmentBasicInfoSchema,
  establishmentMealsSchema,
  establishmentMacrohydratesSchema,
  establishmentFattyAcidsSchema,
  establishmentVitaminsSchema,
  establishmentMineralsSchema,
} from "../schema/dietEstablishment.schema";

export const dietEstablishmentsFormSteps = [
  {
    id: 1,
    requiredFields: true,
    title: "dietEstablishment.form.basic_info.heading", //i18next
    description: "dietEstablishment.form.basic_info.info",
    icon: <FaInfoCircle />,
    validationSchema: establishmentBasicInfoSchema,
    stepContent: <Step.BasicInfo />,
    sectionId: "establishment_form_1",
  },
  {
    id: 2,
    requiredFields: true,
    title: "dietEstablishment.form.meals.heading",
    description: "dietEstablishment.form.meals.info",
    icon: <FaCarrot />,
    validationSchema: establishmentMealsSchema,
    stepContent: <Step.Meals />,
    sectionId: "establishment_form_2",
  },
  {
    id: 3,
    requiredFields: true,
    title: "dietEstablishment.form.macrohydrates.heading",
    description: "dietEstablishment.form.macrohydrates.info",
    icon: <FaCarrot />,
    validationSchema: establishmentMacrohydratesSchema,
    stepContent: <Step.Macrohydrates />,
    sectionId: "establishment_form_3",
  },
  {
    id: 4,
    requiredFields: false,
    title: "dietEstablishment.form.fattyAcids.heading",
    description: "dietEstablishment.form.fattyAcids.info",
    icon: <FaCarrot />,
    validationSchema: establishmentFattyAcidsSchema,
    stepContent: <Step.FattyAcids />,
    sectionId: "establishment_form_4",
  },
  {
    id: 5,
    requiredFields: false,
    title: "dietEstablishment.form.vitamins.heading",
    description: "dietEstablishment.form.vitamins.info",
    icon: <FaGripHorizontal />,
    validationSchema: establishmentVitaminsSchema,
    stepContent: <Step.Vitamins />,
    sectionId: "establishment_form_5",
  },
  {
    id: 6,
    requiredFields: false,
    title: "dietEstablishment.form.minerals.heading",
    description: "dietEstablishment.form.minerals.info",
    icon: <FaTh />,
    validationSchema: establishmentMineralsSchema,
    stepContent: <Step.Minerals />,
    sectionId: "establishment_form_6",
  },
];
