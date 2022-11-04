import React from "react";
import { useTranslation } from "react-i18next";
import ReportImg from "assets/report.svg";
import * as Styled from "./HomeInfo.styles";
import { useNavigate } from "react-router";

//components
import Button from "components/form/button/Button";

const HomeInfo = () => {
  const navigate = useNavigate();
  return (
    <Styled.HomeInfoWrapper>
      <Styled.InfoHeading>
        <h2>Witaj</h2>
        <p>
          Miło nam, że korzystasz z DietAI, sprawdź nowości lub korzystaj z
          dostępnych funkcji w aplikacji
        </p>
        <Styled.ButtonWrapper>
          {/* <Button variant="secondary">zobacz nowości</Button> */}
          <Button onClick={() => navigate("/dashboard/diets/new")}>
            zobacz nowości
          </Button>
        </Styled.ButtonWrapper>
      </Styled.InfoHeading>
      <img src={ReportImg} />
    </Styled.HomeInfoWrapper>
  );
};

export default HomeInfo;
