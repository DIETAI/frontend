import React from "react";
import { useParams } from "react-router";
import { useDietEstablishment } from "services/useDietEstablishments";

const DietEstablishment = () => {
  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;

  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = useDietEstablishment(dietEstablishmentId);

  if (dietEstablishmentLoading) return <div>dietEstablishment loading...</div>;
  if (dietEstablishmentError || !dietEstablishment)
    return <div>dietEstablishment error</div>;
  return <div>DietEstablishment: {dietEstablishment.name}</div>;
};

export default DietEstablishment;
