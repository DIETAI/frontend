import React from "react";

//styles
import * as Styled from "./ExcludeDietKindsModal.styles";

//components
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";

//icons
import { FaUtensils } from "icons/icons";

const ExcludeDietKindsModal = () => {
  return (
    <Styled.ExcludeDietKindsModalWrapper>
      <Heading
        icon={<FaUtensils />}
        title="Rodzaje diety"
        // description={t("dinner.form.products.modal.description")}
      />
      <Styled.ExcludeDietKindsContent>
        <Styled.DietKindsSearchWrapper>
          <input></input>
        </Styled.DietKindsSearchWrapper>
        <Styled.SelectedDietKindsWrapper>
          wykluczone rodzaje diet
        </Styled.SelectedDietKindsWrapper>
      </Styled.ExcludeDietKindsContent>
    </Styled.ExcludeDietKindsModalWrapper>
  );
};

export default ExcludeDietKindsModal;
