import React from "react";

//components
import Button from "components/form/button/Button";
import Heading from "components/heading/Heading";

//icons
import { FaFileAlt } from "react-icons/fa";

//styles
import * as Styled from "./AllReportsModal.styles";

const MeasurementAllReportsModal = () => {
  return (
    <Styled.ModalContentWrapper>
      <Heading
        icon={<FaFileAlt />}
        title="Wszystkie pomiary"
        // description={t("dinner.form.products.modal.description")}
      />
      <p>masa ciała</p>
      <p>wysokość</p>
      <p>bmi</p>
      <p>obwód klatki piersiowej we wdechu (cm)</p>
    </Styled.ModalContentWrapper>
  );
};

export default MeasurementAllReportsModal;
