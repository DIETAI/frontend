import React from "react";
import axios from "utils/api";
import { mutate } from "swr";
import { IDietDinnerQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./DeleteModalContent.styles";
import Button from "components/form/button/Button";

//components
import Heading from "components/heading/Heading";

//icons
import { FaUtensils } from "react-icons/fa";

//assets
import DeleteImg from "assets/delete.svg";
import { IDietDinnerPopulateData } from "interfaces/diet/dietPopulate.interfaces";

const DeleteModalContent = ({
  dietDinner,
  closeModal,
}: {
  dietDinner: IDietDinnerPopulateData;
  closeModal: () => void;
}) => {
  const deleteDietDinner = async () => {
    try {
      await axios.delete(`/api/v1/dietDinners/${dietDinner._id}`, {
        withCredentials: true,
      });

      console.log("usunięto posiłek z diety");
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Styled.ModalContentWrapper>
      <Heading
        icon={<FaUtensils />}
        title="Usuń posiłek"
        // description={t("dinner.form.products.modal.description")}
      />
      <Styled.ContentWrapper>
        <img src={DeleteImg} />
        <h2>
          Czy napewno chcesz usunąć{" "}
          <b>{dietDinner.dinnerPortionId.dinnerId.name}</b> ?
        </h2>

        <Button type="button" onClick={deleteDietDinner as () => void}>
          usuń posiłek
        </Button>
      </Styled.ContentWrapper>
    </Styled.ModalContentWrapper>
  );
};

export default DeleteModalContent;
