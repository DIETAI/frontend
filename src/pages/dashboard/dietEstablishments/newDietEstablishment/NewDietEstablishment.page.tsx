import React from "react";
import { dietEstablishmentsNavLinks } from "../utils/dietEstablishmentLinks";

//components
import NewDietEstablishmentForm from "./components/DietEstablishmentsForm";
import PageNav from "components/pageNav/PageNav";

const NewDietEstablishment = () => {
  return (
    <>
      <PageNav
        headingTitle={"Założenia żywieniowe"}
        pageNavLinks={dietEstablishmentsNavLinks}
      />
      <NewDietEstablishmentForm />
    </>
  );
};

export default NewDietEstablishment;
