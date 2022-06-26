import React from "react";
import { useParams } from "react-router";
import { getDiet, getDietQuery } from "services/getDiets";

//components
import DietNav from "./components/nav/DietNav";
import DietContent from "./components/content/DietContent";
import ManyDaysView from "./components/views/manyDaysView/days/Days";

const EditDiet = () => {
  const { dietEditId } = useParams();
  console.log({ dietEditId });

  if (!dietEditId) return <div>not found</div>;

  const { diet, dietError, dietLoading } = getDiet(dietEditId);

  if (dietLoading) return <div>diet loading...</div>;
  if (dietError || !diet) return <div>diet error</div>;
  return (
    <>
      <DietNav />
      <DietContent>
        <ManyDaysView />
      </DietContent>
      <p>edytowanie diety : {diet.name}</p>
    </>
  );
};

export default EditDiet;
