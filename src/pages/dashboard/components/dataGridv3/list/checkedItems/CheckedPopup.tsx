import React, { useState, useRef, useEffect } from "react";

//styles
import * as Styled from "./CheckedPopup.styles";

//animations
import { animationVariants } from "./CheckedPopup.animations";

//interfaces
import { ICheckedPopupProps } from "./CheckedPopup.interfaces";

//components
import Button from "components/form/button/Button";

//icons
import * as Icon from "icons/icons";

// { checkedRows, deleteAction }: ICheckedPopupProps

//context
import { useDataGridSelect } from "../../context/DataGridSelect.context";

const CheckedPopup = () => {
  const { selectedItems } = useDataGridSelect();
  const [modalOpen, setModalOpen] = useState(false);

  const rowsLength = () => {
    if (selectedItems.length === 1) {
      return `Wybrano ${selectedItems.length} element`;
    } else if (selectedItems.length > 1 && selectedItems.length < 5) {
      return `Wybrano ${selectedItems.length} elementy`;
    } else {
      return `Wybrano ${selectedItems.length} elementów`;
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  if (selectedItems.length < 1) return null;

  return (
    <>
      <Styled.CheckedPopupWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p>{rowsLength()}</p>
        <Button variant="data-delete-primary" width="15rem">
          <Icon.FaTrash />
          usuń
        </Button>
        {/* <span onClick={() => setModalOpen(true)}>
          <Icon.FaEllipsisV />
        </span> */}
      </Styled.CheckedPopupWrapper>
      {/* {modalOpen && (
        <Styled.PhoneModal ref={modalRef}>
          <Button variant="data-delete-primary" width="15rem">
            <Icon.FaTrash />
            usuń
          </Button>
        </Styled.PhoneModal>
      )} */}
    </>
  );
};

export default CheckedPopup;
