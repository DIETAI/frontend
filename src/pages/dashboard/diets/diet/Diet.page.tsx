import React from "react";
import { useParams } from "react-router";
import { getDiet } from "services/getDiets";
import { Link } from "react-router-dom";

const Diet = () => {
  const { dietId } = useParams();
  console.log({ dietId });

  if (!dietId) return <div>not found</div>;
  const { diet, dietError, dietLoading } = getDiet(dietId);

  if (dietLoading) return <div>diet loading...</div>;
  if (dietError || !diet) return <div>diet error</div>;
  return (
    <div>
      <p>Diet : {diet.name}</p>
      <Link to={`/dashboard/diets/edit/${dietId}`}>edytuj</Link>
    </div>
  );
};

export default Diet;
