import React, { useState } from "react";
import { useParams } from "react-router";
import { getDiet, getDietQuery } from "services/getDiets";

//components
import DietNav from "./components/nav/DietNav";
import DietContent from "./components/content/DietContent";
import ManyDaysView from "./components/views/manyDaysView/days/Days";
import OneDayView from "./components/views/oneDayView/OneDayView";

export type DaysView = "oneDay" | "manyDays";

const EditDiet = () => {
  const [view, setView] = useState<DaysView>("manyDays");
  const { dietEditId } = useParams();
  console.log({ dietEditId });

  if (!dietEditId) return <div>not found</div>;

  const { diet, dietError, dietLoading } = getDiet(dietEditId);

  // if (dietLoading) return <div>diet loading...</div>;
  if (dietError || !diet) return <div>diet error</div>;
  return (
    <>
      <DietNav setView={setView} view={view} diet={diet} />
      <DietContent>
        {view === "oneDay" ? <OneDayView /> : <ManyDaysView />}
      </DietContent>
    </>
  );
};

export default EditDiet;
