import React, { useState } from "react";
import { IIconButtonProps } from "./IconButton.interfaces";
import { AnimatePresence } from "framer-motion";

import * as Styled from "./IconButton.styles";

const IconButton = ({
  icon,
  onClick,
  iconReverse,
  className,
  active,
  modalText,
}: IIconButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Styled.IconButtonWrapper
      onClick={onClick}
      iconReverse={iconReverse}
      className={className}
      active={active}
      onMouseEnter={() => setModalOpen(true)}
      onMouseLeave={() => setModalOpen(false)}
    >
      {icon}
      <AnimatePresence>
        {modalText && modalOpen && (
          <Styled.IconButtonModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>{modalText}</p>
          </Styled.IconButtonModal>
        )}
      </AnimatePresence>
    </Styled.IconButtonWrapper>
  );
};

export default IconButton;
