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

const CheckedPopup = ({ checkedRows, deleteAction }: ICheckedPopupProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const rowsLength = () => {
    if (checkedRows.length === 1) {
      return `Wybrano ${checkedRows.length} element`;
    } else if (checkedRows.length > 1 && checkedRows.length < 5) {
      return `Wybrano ${checkedRows.length} elementy`;
    } else {
      return `Wybrano ${checkedRows.length} elementów`;
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

  return (
    <>
      <Styled.CheckedPopupWrapper
        variants={animationVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <p>{rowsLength()}</p>
        {/* <Button variant="data-delete-primary" width="15rem">
          <Icon.FaTrash />
          usuń
        </Button> */}
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
