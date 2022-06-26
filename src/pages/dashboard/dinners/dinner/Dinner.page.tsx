import React from "react";
import { useParams } from "react-router";
import { getDinner } from "services/getDinners";

const Dinner = () => {
  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;

  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

  if (dinnerLoading) return <div>dinner loading...</div>;
  if (dinnerError || !dinner) return <div>dinner error</div>;

  console.log({ dinner });
  return <div>Dinner : {dinner.name}</div>;
};

export default Dinner;
