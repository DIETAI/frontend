import React from "react";

//components
import NewDietForm from "./components/NewDietForm";

//styles
import * as Styled from "./NewDietPage.styles";

const NewDiet = () => {
  return (
    <Styled.Container>
      <NewDietForm />
    </Styled.Container>
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
