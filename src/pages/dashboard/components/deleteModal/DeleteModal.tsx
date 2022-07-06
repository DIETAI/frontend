import React, { useState } from "react";

//styles
import * as Styled from "./DeleteModal.styles";

//components
import Button from "components/form/button/Button";

interface IDeleteModalProps {
  deleteItemName: string;
  deleteAction: () => void;
}

const DeleteModal = ({ deleteItemName, deleteAction }: IDeleteModalProps) => {
  const [deleteItemValue, setDeleteItemValue] = useState("");
  return (
    <Styled.DeleteModalWrapper>
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
    </Styled.DeleteModalWrapper>
  );
};

export default DeleteModal;
