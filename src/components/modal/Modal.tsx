import React, { useEffect, useRef } from "react";
import ReactDom from "react-dom";

//interfaces
import { IModalProps } from "./Modal.interfaces";
import { IChildrenProps } from "interfaces/children.interfaces";

//styles
import * as Styles from "./Modal.styles";

const Modal = ({
  open,
  children,
  onClose,
  width,
}: IModalProps & IChildrenProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node) && onClose) {
        document.body.style.overflowY = "visible";
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <Styles.ModalContainer>
        <Styles.ModalContentWrapper ref={modalRef} modalWidth={width}>
          {children}
        </Styles.ModalContentWrapper>
      </Styles.ModalContainer>
    </>,
    document.getElementById("modal-portal") as HTMLElement
  );
};

export default Modal;
