import React, { useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import axios from "utils/api";
import { mutate } from "swr";
import {
  getDinnerPortions,
  getDinnerPortionsQuery,
} from "services/getDinnerPortions";

//components
import Modal from "components/modal/Modal";
import AddDinnerPortionModalContent from "./addDinnerPortionModal/AddDinnerPortionModal";

//styles
import * as Styled from "./Portions.styles";

const Portions = () => {
  const [dinnerPortionModalOpen, setDinnerPortionModalOpen] = useState(false);

  const { t } = useTranslation();
  const { dinnerId } = useParams();
  const {
    dinnerPortionsQuery,
    dinnerPortionsLoadingQuery,
    dinnerPortionsErrorQuery,
  } = getDinnerPortionsQuery(dinnerId as string);

  // const { dinnerPortions, dinnerPortionsLoading, dinnerPortionsError } =
  //   getDinnerPortions(dinnerId as string);

  const deletePortion = async (portionId: string) => {
    try {
      await axios.delete(`/api/v1/dinnerPortions/${portionId}`, {
        withCredentials: true,
      });
      await mutate(`/api/v1/dinnerPortions/dinner/${dinnerId}/query`);

      console.log("usunięto porcje z posiłku");
    } catch (e) {
      console.log(e);
    }
  };

  if (dinnerPortionsLoadingQuery) return <div>loading...</div>;
  if (dinnerPortionsErrorQuery) return <div>error...</div>;

  console.log({ dinnerPortionsQuery });

  return (
    <Styled.PortionsWrapper>
      {dinnerPortionsQuery &&
        dinnerPortionsQuery.length > 0 &&
        dinnerPortionsQuery.map((dinnerPortion) => (
          <Styled.PortionWrapper key={dinnerPortion._id}>
            <h2> Rodzaj zestawu: {dinnerPortion.type}</h2>
            <div>razem (kcal): {dinnerPortion.total.kcal}</div>
            <button
              type="button"
              onClick={() => deletePortion(dinnerPortion._id)}
            >
              usuń
            </button>
            <ul>
              {dinnerPortion.dinnerProducts.map((dinnerProduct) => (
                <li key={dinnerProduct.dinnerProductId}>
                  <p>
                    dinner produkt:{" "}
                    <b> {dinnerProduct.dinnerProduct.product.name} </b>
                  </p>
                  <p> porcja: {dinnerProduct.portion}</p>
                  <div>razem (kcal): {dinnerProduct.total.kcal}</div>
                </li>
              ))}
            </ul>
          </Styled.PortionWrapper>
        ))}

      <button type="button" onClick={() => setDinnerPortionModalOpen(true)}>
        dodaj zestaw porcji
      </button>
      <Modal
        open={dinnerPortionModalOpen}
        onClose={() => setDinnerPortionModalOpen(false)}
      >
        <AddDinnerPortionModalContent
          closeModal={() => setDinnerPortionModalOpen(false)}
        />
      </Modal>
    </Styled.PortionsWrapper>
  );
};

export default Portions;
