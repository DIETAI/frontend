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

    // <div>

    //   <p>popup z dodaniem diety</p>
    //   <p>1) ilość dni (liczba lub kalendarz)</p>
    //   <p>2) wybór założeń lub tworzenie założeń</p>
    //   <p>
    //     3) stwórz jadłospis (przekierowanie do edycji) - stworzenie modeli dni w
    //     bazie
    //   </p>
    // </div>
  );
};

export default NewDiet;
