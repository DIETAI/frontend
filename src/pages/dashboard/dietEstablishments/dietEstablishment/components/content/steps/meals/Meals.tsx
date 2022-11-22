import React from "react";
import { useTranslation } from "react-i18next";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//styles
import * as Styled from "./Meals.styles";
import * as StepStyled from "../../DietEstablishmentContent.styles";

//icons
import { FaUtensils } from "icons/icons";

//assets
import NoDataImg from "assets/noData.svg";

//components
import LoadingGrid from "../../../loading/LoadingGrid";
import { getDietEstablishmentQuery } from "services/useDietEstablishments";

// interface IProductPrices {
//   prices: IProductData["prices"];
// }

const pricesTest = [
  { shop: "sklep 1", price: 20, currency: "PLN" },
  { shop: "sklep 2", price: 30, currency: "PLN" },
];

const Meals = () => {
  const { t } = useTranslation();

  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;
  const {
    dietEstablishmentQuery,
    dietEstablishmentQueryError,
    dietEstablishmentQueryLoading,
  } = getDietEstablishmentQuery(dietEstablishmentId);

  if (dietEstablishmentQueryError) return <div>Diet establishment error</div>;

  return (
    <StepStyled.DietEstablishmentStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaUtensils />
        </StepStyled.IconWrapper>
        <h2>Posiłki</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.DietEstablishmentStepContentContainer>
        <AnimatePresence>
          {dietEstablishmentQueryLoading && (
            <StepStyled.DietEstablishmentLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingGrid rows={4} />
            </StepStyled.DietEstablishmentLoadingWrapper>
          )}
        </AnimatePresence>
        {dietEstablishmentQuery && (
          <StepStyled.DietEstablishmentStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            {dietEstablishmentQuery.meals.length < 1 && (
              <StepStyled.DietEstablishmentEmptyItemWrapper>
                <img src={NoDataImg} />
                <h2>Brak dodanych posiłków</h2>
              </StepStyled.DietEstablishmentEmptyItemWrapper>
            )}
            {dietEstablishmentQuery.meals.length > 1 && (
              <StepStyled.DietEstablishmentItemsWrapper>
                {dietEstablishmentQuery.meals.map((meal, index) => (
                  <Styled.FieldWrapper key={meal._id}>
                    <Styled.FieldHeadWrapper>
                      <Styled.FieldNumberWrapper>
                        <p>{index + 1}</p>
                      </Styled.FieldNumberWrapper>
                    </Styled.FieldHeadWrapper>
                    <StepStyled.DietEstablishmentItem>
                      <h2>posiłek: </h2>
                      <p>{meal.name}</p>
                    </StepStyled.DietEstablishmentItem>
                    <StepStyled.DietEstablishmentItem>
                      <h2>godzina: </h2>
                      <p>{meal.time}</p>
                    </StepStyled.DietEstablishmentItem>
                    <StepStyled.DietEstablishmentItem>
                      <h2>procent: </h2>
                      <p>{meal.procent}</p>
                    </StepStyled.DietEstablishmentItem>
                    <StepStyled.DietEstablishmentItem>
                      <h2>kcal: </h2>
                      <p>{meal.kcal}</p>
                    </StepStyled.DietEstablishmentItem>
                  </Styled.FieldWrapper>
                ))}
              </StepStyled.DietEstablishmentItemsWrapper>
            )}
          </StepStyled.DietEstablishmentStepContentWrapper>
        )}
      </StepStyled.DietEstablishmentStepContentContainer>
    </StepStyled.DietEstablishmentStepWrapper>
  );
};

export default Meals;
