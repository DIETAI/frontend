import React from "react";

//styles
import * as Styled from "./DietGenerateModal.styles";

//components
import Heading from "components/heading/Heading";

//icons
import { FaCalendarPlus } from "icons/icons";

const DietGenerateModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <Styled.DietGenerateModalContainer>
      <Heading
        icon={<FaCalendarPlus />}
        title="Generuj dietę"
        // description={t("dinner.form.products.modal.description")}
      />
      generate
    </Styled.DietGenerateModalContainer>
  );
};

export default DietGenerateModal;
