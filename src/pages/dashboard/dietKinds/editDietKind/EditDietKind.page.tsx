import React from "react";
import { useParams } from "react-router";
import { getDietKind } from "services/getDietKinds";

//components
import EditDietKindForm from "../components/EditDietKindForm";

const EditDietKind = () => {
  const { dietKindId } = useParams();
  console.log({ dietKindId });

  if (!dietKindId) return <div>not found</div>;

  const { dietKind, dietKindError, dietKindLoading } = getDietKind(dietKindId);

  if (dietKindLoading) return <div>dietKind loading...</div>;
  if (dietKindError || !dietKind) return <div>dietKind error</div>;

  return <EditDietKindForm dietKind={dietKind} />;
};

export default EditDietKind;
