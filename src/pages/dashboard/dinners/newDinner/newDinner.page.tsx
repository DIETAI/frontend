import React from "react";
import { dinnerNavLinks } from "../utils/navLinks";

//components
import NewDinnerForm from "./components/NewDinnerForm";
import PageNav from "components/pageNav/PageNav";

//styles
import * as Styled from "./NewDinnerPage.styles";

const NewDinner = () => {
  return (
    <>
      <PageNav headingTitle={"Posiłki"} pageNavLinks={dinnerNavLinks} />
      <Styled.Container>
        <NewDinnerForm />
      </Styled.Container>
    </>
  );
};

export default NewDinner;
