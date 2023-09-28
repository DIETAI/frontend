import React from "react";
import { dietsNavLinks } from "../utils/navLinks";

//components
import NewDietForm from "./components/NewDietForm";
import PageNav from "components/pageNav/PageNav";

//styles
import * as Styled from "./NewDietPage.styles";

const NewDiet = () => {
  return (
    <>
      <PageNav headingTitle={"Jadłospisy"} pageNavLinks={dietsNavLinks} />
      <Styled.Container>
        <NewDietForm />
      </Styled.Container>
    </>
  );
};

export default NewDiet;
