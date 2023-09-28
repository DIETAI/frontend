import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom";

//components
import Button from "components/form/button/Button";

//styles
import * as Styled from "./NoClientsModal.styles";

//images
import NoDataImg from "assets/noData.svg";

const NoClientsModal = () => {
  const navigate = useNavigate();
  return (
    <Styled.EstablishmentModalContainer>
      <Styled.EstablishmentEmptyWrapper>
        <img src={NoDataImg} />
        <h2>Dodaj pierwszego pacjenta aby stworzyć jadłospis.</h2>
        <Button
          onClick={() =>
            navigate({
              pathname: `/dashboard/clients/new`,
            })
          }
        >
          dodaj pacjenta
        </Button>
      </Styled.EstablishmentEmptyWrapper>
    </Styled.EstablishmentModalContainer>
  );
};

export default NoClientsModal;
