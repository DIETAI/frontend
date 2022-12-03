import React from "react";

//components
import Button from "components/form/button/Button";
import Heading from "components/heading/Heading";

//icons
import { FaCog } from "react-icons/fa";

//styles
import * as Styled from "./MeasurementSettingsModal.styles";

const MeasurementSettingsModal = () => {
  return (
    <Styled.ModalContentWrapper>
      <Heading
        icon={<FaCog />}
        title="Ustawienia raportu"
        // description={t("dinner.form.products.modal.description")}
      />
      <p>domyślnie wszystkie pomiary</p>
      <input placeholder="od" value={"Pomiar 1 (22.10.22)"} />
      <input placeholder="do" value={"Pomiar 3 (22.11.22)"} />
      <Button>zatwierdź</Button>
    </Styled.ModalContentWrapper>
  );
};

export default MeasurementSettingsModal;
