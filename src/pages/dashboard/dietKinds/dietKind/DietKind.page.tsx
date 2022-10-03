import React from "react";
import { useParams } from "react-router";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";
import { Link } from "react-router-dom";
import { getDietKind } from "services/getDietKinds";

const DietKind = () => {
  const { dietKindId } = useParams();
  console.log({ dietKindId });

  if (!dietKindId) return <div>not found</div>;

  const { dietKind, dietKindError, dietKindLoading } = getDietKind(dietKindId);

  if (dietKindLoading) return <div>dietKind loading...</div>;
  if (dietKindError || !dietKind) return <div>dietKind error</div>;
  return (
    <div>
      dietKind: {dietKind.name}{" "}
      <Link to={`/dashboard/admin/dietKinds/edit/${dietKindId}`}>edit</Link>
    </div>
  );
};

export default DietKind;
