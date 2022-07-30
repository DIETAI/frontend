import React from "react";

//components
import Input from "components/form/input/Input";

//styles
import * as Styled from "./Establishment.styles";

const Establishment = () => {
  return (
    <Styled.EstablishmentWrapper>
      <div>
        <p>założenia</p>
        <p>wyniki</p>
      </div>
      <div>
        <input type="checkbox" name="range" />
        <label htmlFor="range">przedział procentowy</label>
      </div>
      <Input name="kcal" label="kcal" />
      <div>
        <span>Białko</span>
        <Input name="protein.procent" label="procent" />
        <Input name="protein.gram" label="gram" />
        <Input name="protein.kcal" label="kcal" />
      </div>
      <div>
        <span>Tłuszcze</span>
        <Input name="fat.procent" label="procent" />
        <Input name="fat.gram" label="gram" />
        <Input name="fat.kcal" label="kcal" />
      </div>
      <div>
        <span>Węglowodany</span>
        <Input name="carbohydrates.procent" label="procent" />
        <Input name="carbohydrates.gram" label="gram" />
        <Input name="carbohydrates.kcal" label="kcal" />
      </div>
    </Styled.EstablishmentWrapper>
  );
};

export default Establishment;
