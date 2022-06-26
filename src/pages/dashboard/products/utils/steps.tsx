import React from "react";

//icons
import {
  FaCubes,
  FaInfoCircle,
  FaGripHorizontal,
  FaTh,
  FaTint,
  FaWeight,
  FaDollarSign,
} from "icons/icons";

//components
import * as Step from "../components/form/steps";

//schema
import {
  product_basic_info_schema,
  product_fatty_acids_schema,
  product_macrohydrates_schema,
  product_vitamins_schema,
  product_minerals_schema,
  product_measures_schema,
  product_prices_schema,
} from "../schema/productFormSchema";

export const productFormSteps = [
  {
    id: 1,
    requiredFields: true,
    title: "product.form.basic_info.heading", //i18next
    description:
      "Podstawowe informacje o produkcie takie jak opis, zdjęcie, grupa",
    icon: <FaInfoCircle />,
    validationSchema: product_basic_info_schema,
    stepContent: <Step.BasicInfo />,
    sectionId: "product_form_1",
  },
  {
    id: 2,
    requiredFields: true,
    title: "product.form.macrohydrates.heading",
    description: "Uzupełnij wartości makroelementów",
    icon: <FaCubes />,
    validationSchema: product_macrohydrates_schema,
    stepContent: <Step.Macrohydrates />,
    sectionId: "product_form_2",
  },
  {
    id: 3,
    requiredFields: false,
    title: "product.form.vitamins.heading",
    description: "Uzupełnij wartości witamin",
    icon: <FaGripHorizontal />,
    validationSchema: product_vitamins_schema,
    stepContent: <Step.Vitamins />,
    sectionId: "product_form_3",
  },
  {
    id: 4,
    requiredFields: false,
    title: "product.form.minerals.heading",
    description: "Uzupełnij wartości składników mineralnych",
    icon: <FaTh />,
    validationSchema: product_minerals_schema,
    stepContent: <Step.Minerals />,
    sectionId: "product_form_4",
  },
  {
    id: 5,
    requiredFields: false,
    title: "product.form.fattyAcids.heading",
    description: "Uzupełnij wartości kwasów tłuszczowych",
    icon: <FaTint />,
    validationSchema: product_fatty_acids_schema,
    stepContent: <Step.FattyAcids />,
    sectionId: "product_form_5",
  },
  {
    id: 6,
    requiredFields: false,
    title: "product.form.measures.heading",
    description: "Dodaj miary produktu",
    icon: <FaWeight />,
    validationSchema: product_measures_schema,
    stepContent: <Step.Measures />,
    sectionId: "product_form_6",
  },
  {
    id: 7,
    requiredFields: false,
    title: "product.form.prices.heading",
    description: "Dodaj ceny produktu",
    icon: <FaDollarSign />,
    validationSchema: product_prices_schema,
    stepContent: <Step.Prices />,
    sectionId: "product_form_7",
  },
];
