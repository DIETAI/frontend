import React, { useState } from "react";

//styles
import * as Styled from "./DeleteModal.styles";

//components
import Button from "components/form/button/Button";
import Heading from "components/heading/Heading";

//icons
import { FaTrash } from "icons/icons";

//assets
import DeleteImg from "assets/delete.svg";

interface IDeleteModalProps {
  deleteItemName: string;
  deleteAction: () => void;
}

const DeleteModal = ({ deleteItemName, deleteAction }: IDeleteModalProps) => {
  const [deleteItemValue, setDeleteItemValue] = useState("");

  return (
    <>
      <Styled.ModalContentWrapper>
        <Heading
          icon={<FaTrash />}
          title="Usuń"
          // description={t("dinner.form.products.modal.description")}
        />
        <Styled.ContentWrapper>
          <img src={DeleteImg} />
          <h2>
            Czy napewno chcesz usunąć <b>{deleteItemName}</b> ?
          </h2>
          <p>Aby potwierdzić wpisz nazwę obiektu</p>
          <input
            onChange={(e) => setDeleteItemValue(e.currentTarget.value)}
          ></input>

          <Button
            variant={
              deleteItemValue !== deleteItemName ? "disabled" : "primary"
            }
            onClick={deleteAction}
          >
            usuń
          </Button>
        </Styled.ContentWrapper>
      </Styled.ModalContentWrapper>
      {/* <Styled.DeleteModalWrapper>
      <h2>Czy napewno chcesz usunąć {deleteItemName}?</h2>
      <h3>Aby potwierdzić wpisz nazwę obiektu</h3>
      <input
        onChange={(e) => setDeleteItemValue(e.currentTarget.value)}
      ></input>
      <Button
        variant={deleteItemValue !== deleteItemName ? "disabled" : "primary"}
        onClick={deleteAction}
      >
        usuń
      </Button>
    </Styled.DeleteModalWrapper> */}
    </>
  );
};

export default DeleteModal;
