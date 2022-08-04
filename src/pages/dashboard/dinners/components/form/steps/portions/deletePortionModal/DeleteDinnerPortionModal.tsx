import React from "react";
import axios from "utils/api";
import { mutate } from "swr";
import { useParams } from "react-router";

//styles
import * as Styled from "./DeleteDinnerPortionModal.styles";

//icons
import { FaUtensils, FaFileAlt } from "icons/icons";

//components
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";

//assets
import DeleteImg from "assets/delete.svg";

//services
import { getDietDinnersByPortion } from "services/getDietDinners";

const DeleteDinnerPortionModal = ({
  closeModal,
  dinnerPortionId,
}: {
  closeModal: () => void;
  dinnerPortionId: string;
}) => {
  const { dinnerId } = useParams();
  const { dietDinners, dietDinnersLoading, dietDinnersError } =
    getDietDinnersByPortion(dinnerPortionId);

  if (dietDinnersLoading) return <div>loading...</div>;
  if (dietDinnersError || !dietDinners) return <div>error...</div>;

  console.log({ dietDinners });
  //find dietDinners where dinnerPortionId === dinnerPortionId

  const deletePortion = async () => {
    try {
      await axios.delete(`/api/v1/dinnerPortions/${dinnerPortionId}`, {
        withCredentials: true,
      });
      await mutate(`/api/v1/dinnerPortions/dinner/${dinnerId}/query`);

      console.log("usunięto porcje z posiłku");
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  const diets = dietDinners.map((dietDinner) => dietDinner.diet.name);
  const uniqueDiets = Array.from(new Set(diets));

  return (
    <Styled.DeleteDinnerPortionModalWrapper>
      <Heading
        icon={<FaUtensils />}
        title="Usuń porcję"
        // description={t("dinner.form.products.modal.description")}
      />
      <Styled.ContentWrapper>
        <img src={DeleteImg} />
        <h2>Czy napewno chcesz usunąć porcję?</h2>
        {dietDinners.length > 0 && (
          <Styled.DietsWrapper>
            <p>
              Porcja którą chcesz usunąć została dodana już do Twoich
              jadłospisów. Usunięcie porcji spowoduje{" "}
              <b>zmiany w jadłospisach</b>{" "}
            </p>
            <h3>porcja jest dodana do następujących jadłospisów:</h3>
            <Styled.List>
              {uniqueDiets.map((diet) => (
                <Styled.Diet key={diet}>
                  <span>
                    <FaFileAlt />
                  </span>
                  {diet}
                  {/* <p>dzień: {dietDinner.dietId}</p> */}
                </Styled.Diet>
              ))}
            </Styled.List>
          </Styled.DietsWrapper>
        )}

        <Button type="button" onClick={deletePortion as any}>
          usuń porcję
        </Button>
      </Styled.ContentWrapper>
    </Styled.DeleteDinnerPortionModalWrapper>
  );
};

export default DeleteDinnerPortionModal;
