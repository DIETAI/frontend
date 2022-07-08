import React, { useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  getDinnerPortions,
  getDinnerPortionsQuery,
} from "services/getDinnerPortions";

//components
import Modal from "components/modal/Modal";
import AddDinnerPortionModalContent from "./addDinnerPortionModal/AddDinnerPortionModal";

const Portions = () => {
  const [dinnerPortionModalOpen, setDinnerPortionModalOpen] = useState(false);

  const { t } = useTranslation();
  const { dinnerId } = useParams();
  const { dinnerPortionsQuery } = getDinnerPortionsQuery(dinnerId as string);

  const { dinnerPortions, dinnerPortionsLoading, dinnerPortionsError } =
    getDinnerPortions(dinnerId as string);

  if (dinnerPortionsLoading) return <div>loading...</div>;
  if (dinnerPortionsError) return <div>error...</div>;

  console.log({ dinnerPortionsQuery });

  return (
    <div>
      {dinnerPortions &&
        dinnerPortions.length > 0 &&
        dinnerPortions.map((dinnerPortion) => (
          <div key={dinnerPortion._id}>
            <h2> Rodzaj zestawu: {dinnerPortion.type}</h2>
            <div>razem (kcal): {dinnerPortion.total.kcal}</div>
            <ul>
              {dinnerPortion.dinnerProducts.map((dinnerProduct) => (
                <li key={dinnerProduct.dinnerProductId}>
                  <p> dinner produkt: {dinnerProduct.dinnerProductId}</p>
                  <p> porcja: {dinnerProduct.portion}</p>
                  <div>razem (kcal): {dinnerProduct.total.kcal}</div>
                </li>
              ))}
            </ul>
          </div>
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
    </div>
  );
};

export default Portions;
