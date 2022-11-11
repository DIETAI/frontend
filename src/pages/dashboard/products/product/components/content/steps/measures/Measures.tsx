import React from "react";
import { useTranslation } from "react-i18next";
import { IProductData } from "interfaces/product.interfaces";

//styles
import * as Styled from "./Measures.styles";
import * as StepStyled from "../../ProductContent.styles";

//icons
import { FaWeight } from "icons/icons";

//assets
import NoDataImg from "assets/noData.svg";

interface IProductMeasures {
  measures: IProductData["measures"];
}

const measures = [
  { id: 1, name: "porcja" },
  { id: 2, name: "sztuka" },
  { id: 3, name: "szklanka" },
  { id: 4, name: "łyżka" },
  { id: 5, name: "łyżeczka" },
  { id: 6, name: "garść" },
  { id: 7, name: "opakowanie" },
  { id: 8, name: "plaster" },
  { id: 9, name: "ząbek" },
  { id: 10, name: "kostka" },
];

const measuresTest = [
  { unit: "g", type: "plaster", amount: 20 },
  { unit: "g", type: "plaster", amount: 20 },
];

const Measures = ({ measures }: IProductMeasures) => {
  const { t } = useTranslation();

  return (
    <>
      <StepStyled.ProductStepWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
      >
        <StepStyled.StepHeadingWrapper>
          <StepStyled.IconWrapper>
            <FaWeight />
          </StepStyled.IconWrapper>
          <h2>Miary</h2>
        </StepStyled.StepHeadingWrapper>
        {measures.length < 1 && (
          <StepStyled.ProductEmptyItemWrapper>
            <img src={NoDataImg} />
            <h2>Brak dodanych miar</h2>
          </StepStyled.ProductEmptyItemWrapper>
        )}
        {measures.length > 1 && (
          <StepStyled.ProductItemsWrapper>
            {measures.map((measure, index) => (
              <Styled.FieldWrapper key={index + 1}>
                <Styled.FieldHeadWrapper>
                  <Styled.FieldNumberWrapper>
                    <p>{index + 1}</p>
                  </Styled.FieldNumberWrapper>
                </Styled.FieldHeadWrapper>
                <StepStyled.ProductItem>
                  <h2>miara: </h2>
                  <p>{measure.type}</p>
                </StepStyled.ProductItem>
                <StepStyled.ProductItem>
                  <h2>ilość: </h2>
                  <p>{measure.amount}</p>
                </StepStyled.ProductItem>
                <StepStyled.ProductItem>
                  <h2>jednostka: </h2>
                  <p>{measure.unit}</p>
                </StepStyled.ProductItem>
              </Styled.FieldWrapper>
            ))}
          </StepStyled.ProductItemsWrapper>
        )}
      </StepStyled.ProductStepWrapper>
    </>
  );
};

export default Measures;
