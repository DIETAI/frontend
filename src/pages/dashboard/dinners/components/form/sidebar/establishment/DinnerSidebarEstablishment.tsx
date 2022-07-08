import React, { useState } from "react";
import * as Styled from "./DinnerSidebarEstablishment.styles";

//components
import Modal from "components/modal/Modal";
import EstablishmentModalContent from "./establishmentModal/EstablishmentModal";

const DinnerSidebarEstablishment = () => {
  const [establishmentModalOpen, setEstablishmentModalOpen] = useState(false);

  return (
    <>
      <Styled.SidebarEstablishmentContainer>
        DinnerSidebarEstablishment
        <p>wyświetlenie dinner portions</p>
        <button type="button" onClick={() => setEstablishmentModalOpen(true)}>
          dodaj założenia
        </button>
      </Styled.SidebarEstablishmentContainer>
      <Modal
        open={establishmentModalOpen}
        onClose={() => setEstablishmentModalOpen(false)}
      >
        <EstablishmentModalContent />
      </Modal>
    </>
  );
};

export default DinnerSidebarEstablishment;
