import React from "react";
import { clientNavLinks } from "../utils/navLinks";

//components
import NewClientForm from "./components/NewClientForm";
import PageNav from "components/pageNav/PageNav";

const NewClient = () => {
  return (
    <>
      <PageNav headingTitle={"Pacjenci"} pageNavLinks={clientNavLinks} />
      <NewClientForm />
    </>
  );
};

export default NewClient;
