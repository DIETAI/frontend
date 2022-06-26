import React, { ReactNode } from "react";
import { FaChartLine } from "icons/icons";
import { IMeasurementData } from "interfaces/measurement.interfaces";

interface IMesurementKey {
  key: keyof IMeasurementData;
  label: string;
  type: "string" | "number" | "image" | "images" | "date";
}

interface IMeasurementContentSection {
  id: number;
  title: string;
  icon: ReactNode;
  keys: IMesurementKey[];
}

export const measurementContentSections: IMeasurementContentSection[] = [
  {
    id: 1,
    title: "Informacje o pomiarze",
    icon: <FaChartLine />,
    keys: [
      { key: "name", label: "nazwa", type: "string" },
      { key: "sex", label: "płeć", type: "string" },
      { key: "age", label: "wiek (lata)", type: "string" },
      { key: "notes", label: "notatki", type: "string" },
      { key: "date", label: "data pomiaru", type: "date" },
      { key: "images", label: "zdjęcia sylwetki", type: "images" },
    ],
  },
  {
    id: 2,
    title: "Podstawowe dane pomiaru",
    icon: <FaChartLine />,
    keys: [
      { key: "weight", label: "masa ciała (kg)", type: "number" },
      { key: "height", label: "wysokość ciała (cm)", type: "number" },
      {
        key: "pal",
        label: "wskaźnik aktywności fizycznej (PAL)",
        type: "number",
      },
      {
        key: "ppmHarris",
        label: "ppm (harris-benedict) [kcal]",
        type: "number",
      },
      {
        key: "ppmMifflin",
        label: "ppm (mifflin) [kcal] ",
        type: "number",
      },
      {
        key: "cpm",
        label: "cpm [kcal]",
        type: "number",
      },
      {
        key: "bmi",
        label: "bmi",
        type: "number",
      },
    ],
  },
  {
    id: 3,
    title: "Dodatkowe dane pomiaru",
    icon: <FaChartLine />,
    keys: [
      {
        key: "chest_breath",
        label: "obwód klatki piersiowej we wdechu (cm)",
        type: "number",
      },
      {
        key: "chest_exhaust",
        label: "obwód klatki piersiowej we wydechu (cm)",
        type: "number",
      },
      {
        key: "shoulder",
        label: "obwód ramienia (cm)",
        type: "number",
      },
      {
        key: "shoulder_tonus",
        label: "obwód ramienia w napięciu (cm)",
        type: "number",
      },
      {
        key: "waist",
        label: "obwód talii (cm)",
        type: "number",
      },
      {
        key: "hip",
        label: "obwód bioder (cm)",
        type: "number",
      },
      {
        key: "forearm",
        label: "obwód przedramienia (cm)",
        type: "number",
      },
      {
        key: "thigh",
        label: "obwód uda (cm)",
        type: "number",
      },
      {
        key: "calf",
        label: "obwód łydki (cm)",
        type: "number",
      },
      {
        key: "biceps",
        label: "grubość fałdu skórno-tłuszczowego nad bicepsem (cm)",
        type: "number",
      },
      {
        key: "triceps",
        label: "grubość fałdu skórno-tłuszczowego nad tricepsem (cm)",
        type: "number",
      },
      {
        key: "shoulder_blade",
        label:
          "grubość fałdu skórno-tłuszczowego pod dolnym kątem łopatki (cm)",
        type: "number",
      },
      {
        key: "ala_of_ilium",
        label: "grubość fałdu skórno-tłuszczowego nad talerzem biodrowym (cm)",
        type: "number",
      },
      {
        key: "iliac_spine",
        label:
          "grubość fałdu skórno-tłuszczowego nad kolcem biodrowym przednim górnym (cm)",
        type: "number",
      },
      {
        key: "whtr",
        label: "wskaźnik WHtR talia/wzrost",
        type: "number",
      },
      {
        key: "whr",
        label: "wskaźnik WHR talia/biodra",
        type: "number",
      },
      {
        key: "ymca",
        label: "procentowa zawartość tkanki tłuszczowej YMCA",
        type: "number",
      },
    ],
  },
];
