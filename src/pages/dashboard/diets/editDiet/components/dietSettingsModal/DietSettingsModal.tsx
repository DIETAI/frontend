import React from "react";

interface IDietSettingsData {
  _id: string;
  defaultView: "oneDay" | "manyDays";
  day: {
    nutrientsOpen: ("kcal" | "protein" | "fat" | "carbohydrates" | "fiber")[];
    establishment: "percentageRange" | "perfectProcent";
  };
}

const DietSettingsModal = () => {
  return <div>DietSettingsModal</div>;
};

export default DietSettingsModal;
