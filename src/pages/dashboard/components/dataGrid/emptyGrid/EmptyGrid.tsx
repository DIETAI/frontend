import React from "react";
import { useTranslation } from "react-i18next";

//styles
import * as Styled from "./EmptyGrid.styles";

// //images
import noData from "assets/noData.svg";

const EmptyGrid = () => {
  const { t } = useTranslation();
  return (
    <Styled.EmptyGridWrapper>
      <img src={noData} />
      <h3>{t("dataGrid.noData")}</h3>
    </Styled.EmptyGridWrapper>
  );
};

export default EmptyGrid;
