import React, { useEffect } from "react";

//icons
import { FaCarrot, FaInfoCircle } from "icons/icons";

//components
import * as Step from "../components/form/steps";

//schema
import {
  basicInfoSchema,
  dinnerProductsSchema,
  productPortionListSchema,
} from "../schema/newDinner.schema";

export const dinnerFormSteps = [
  {
    id: 1,
    requiredFields: true,
    title: "dinner.form.basic_info.heading", //i18next
    description: "dinner.form.basic_info.info",
    icon: <FaInfoCircle />,
    validationSchema: basicInfoSchema,
    stepContent: <Step.BasicInfo />,
    sectionId: "dinner_form_1",
  },
  {
    id: 2,
    requiredFields: true,
    title: "dinner.form.products.heading",
    description: "dinner.form.products.info",
    icon: <FaCarrot />,
    validationSchema: dinnerProductsSchema,
    stepContent: <Step.Products />,
    sectionId: "dinner_form_2",
  },
  {
    id: 3,
    requiredFields: false,
    title: "Zestawy porcji",
    description: "Dodaj zestawy porcji produktów w posiłku",
    icon: <FaCarrot />,
    validationSchema: productPortionListSchema,
    stepContent: <Step.Portions />,
    sectionId: "dinner_form_3",
  },
];
