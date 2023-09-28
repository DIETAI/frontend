import React from "react";
import { useParams } from "react-router";
import { dietEstablishmentsNavLinks } from "../utils/dietEstablishmentLinks";

//components
import PageNav from "components/pageNav/PageNav";
import EditDietEstablishmentForm from "./components/EditDietEstablishmentForm";

//queries
import { getDietEstablishment } from "services/getDietEstablishments";

const EditDietEstablishment = () => {
  const { dietEstablishmentId } = useParams();

  if (!dietEstablishmentId) return <div>not found</div>;

  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = getDietEstablishment(dietEstablishmentId);

  if (dietEstablishmentLoading) return <div>dietEstablishment loading...</div>;
  if (dietEstablishmentError || !dietEstablishment)
    return <div>dietEstablishment error</div>;

  return (
    <>
      <PageNav
        headingTitle={"Założenia żywieniowe"}
        pageNavLinks={[
          ...dietEstablishmentsNavLinks,
          {
            id: dietEstablishmentsNavLinks.length + 1,
            title: "założenia",
            path: `/dashboard/diet-establishments/${dietEstablishmentId}`,
          },
          {
            id: dietEstablishmentsNavLinks.length + 2,
            title: "edytuj założenia",
            path: `/dashboard/diet-establishments/edit/${dietEstablishmentId}`,
          },
        ]}
      />
      <EditDietEstablishmentForm dietEstablishment={dietEstablishment} />
    </>
  );
};

export default EditDietEstablishment;
