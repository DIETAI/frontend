import React from "react";

//components
import NewDinnerForm from "./components/NewDinnerForm";

//styles
import * as Styled from "./NewDinnerPage.styles";

const NewDinner = () => {
  return (
    <Styled.Container>
      <NewDinnerForm />
    </Styled.Container>
  );
};

export default NewDinner;
