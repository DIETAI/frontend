import React, { ReactNode } from "react";
import { FaChartLine } from "icons/icons";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";

export type DietEstablishmentKeyType =
  | "string"
  | "number"
  | "image"
  | "images"
  | "date"
  | "array"
  | "object";

interface IDietEstablishmentKey {
  key: keyof IDietEstablishmentData;
  label: string;
  type: DietEstablishmentKeyType;
}

interface IDietEstablishmentContentSection {
  id: number;
  title: string;
  icon: ReactNode;
  keys: IDietEstablishmentKey[];
}

export const dietEstablishmentContentSections: IDietEstablishmentContentSection[] =
  [
    {
      id: 1,
      title: "Informacje o założeniach",
      icon: <FaChartLine />,
      keys: [
        { key: "name", label: "nazwa", type: "string" },
        { key: "folder", label: "folder", type: "string" },
        { key: "description", label: "opis", type: "string" },
        { key: "dietKind", label: "rodzaj diety", type: "string" },
        { key: "measurementId", label: "pomiar", type: "string" },
        { key: "kcal", label: "kcal", type: "number" },
      ],
    },
    {
      id: 2,
      title: "Posiłki",
      icon: <FaChartLine />,
      keys: [{ key: "meals", label: "posiłki", type: "array" }],
    },
    {
      id: 3,
      title: "Makroskładniki",
      icon: <FaChartLine />,
      keys: [
        {
          key: "protein",
          label: "białka",
          type: "object",
        },
        {
          key: "fat",
          label: "tłuszcze",
          type: "object",
        },
        {
          key: "carbohydrates",
          label: "węglowodany",
          type: "object",
        },
      ],
    },
    {
      id: 4,
      title: "Kwasy tłuszczowe",
      icon: <FaChartLine />,
      keys: [
        {
          key: "saturatedFattyAcids",
          label: "nasycone kwasy tłuszczowe",
          type: "number",
        },
      ],
    },
    {
      id: 5,
      title: "Witaminy",
      icon: <FaChartLine />,
      keys: [
        {
          key: "vitaminA",
          label: "witamina A",
          type: "object",
        },
      ],
    },
    {
      id: 6,
      title: "Składniki mineralne",
      icon: <FaChartLine />,
      keys: [
        {
          key: "zinc",
          label: "cynk",
          type: "object",
        },
      ],
    },
  ];
