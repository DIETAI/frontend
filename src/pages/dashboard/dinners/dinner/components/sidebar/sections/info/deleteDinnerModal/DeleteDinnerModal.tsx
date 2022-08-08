import React, { useState } from "react";

//styles
import * as Styled from "./DeleteDinnerModal.styles";

//components
import Button from "components/form/button/Button";
import Heading from "components/heading/Heading";

//icons
import { FaUtensils, FaFileAlt } from "icons/icons";

//queries
import { getDietDinnersQuery } from "services/getDietDinners";

//assets
import DeleteImg from "assets/delete.svg";

interface IDeleteModalProps {
  deleteItemName: string;
  deleteAction: () => void;
}

const DeleteModal = ({ deleteItemName, deleteAction }: IDeleteModalProps) => {
  const [deleteItemValue, setDeleteItemValue] = useState("");

  //filtrowanie dinnersQuery by dinnerId
  // const { dietDinnersQuery, dietDinnersErrorQuery, dietDinnersLoadingQuery } =
  //   getDietDinnersQuery("das");

  // if (dietDinnersLoadingQuery) return <div>loading...</div>;
  // if (dietDinnersErrorQuery || !dietDinnersQuery) return <div>error...</div>;

  // dietDinnersQuery[0].dinnerPortion.dinnerId;
  return (
    <Styled.DeleteModalWrapper>
      <Heading
        icon={<FaUtensils />}
        title="Usuń posiłek"
        // description={t("dinner.form.products.modal.description")}
      />
      <Styled.ContentWrapper>
        <img src={DeleteImg} />

        <h2>
          Czy napewno chcesz usunąć <b>{deleteItemName}?</b>
        </h2>
        {/* {dietDinners.length > 0 && (
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
                 
                </Styled.Diet>
              ))}
            </Styled.List>
          </Styled.DietsWrapper>
        )} */}
        <h3>Aby potwierdzić wpisz nazwę posiłku</h3>

        <input
          onChange={(e) => setDeleteItemValue(e.currentTarget.value)}
        ></input>
        <Button
          variant={deleteItemValue !== deleteItemName ? "disabled" : "primary"}
          onClick={deleteAction}
        >
          usuń
        </Button>
      </Styled.ContentWrapper>
    </Styled.DeleteModalWrapper>
  );
};

export default DeleteModal;
