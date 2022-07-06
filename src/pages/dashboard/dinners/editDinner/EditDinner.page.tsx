import React from "react";
import { useParams, useNavigate } from "react-router";
import { getDinner } from "services/getDinners";

//components
import EditDinnerForm from "./components/EditDinnerForm";

const EditDinner = () => {
  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;

  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

  if (dinnerLoading) return <div>dinner loading...</div>;
  if (dinnerError || !dinner) return <div>dinner error</div>;

  console.log({ dinner });

  return <EditDinnerForm dinner={dinner} />;
};

export default EditDinner;
