import styled, { css } from "styled-components";
import { motion } from "framer-motion";

interface ISelectPopup {
  popupOpen: boolean;
}

const SelectWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { border },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.5rem;
    border-radius: ${border.rounded.sm};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.light};
    color: ${palette.common.text};
    border: 0.1rem solid ${palette.common.slate};
    letter-spacing: 0.05rem;
    background: transparent;
    position: relative;
  `
);

const SelectContent = styled.div<ISelectPopup>(
  ({
    theme: {
      palette,
      layout: { border },
      typography: { fontSize, fontWeight },
    },
    popupOpen,
  }) => css`
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    gap: 1rem;
    cursor: pointer;

    img {
      width: 2.5rem;
      height: 1.8rem;
      object-fit: cover;
      box-shadow: ${palette.common["box-shadow"]};
      border-radius: ${border.rounded.sm};
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      background: transparent;
      border: none;

      svg {
        width: 70%;
        height: 70%;
        transition: 0.3s ease-out;
        path {
          fill: ${palette.common.slate};
        }
      }
    }

    ${popupOpen &&
    css`
      span {
        svg {
          transform: rotate(180deg);
        }
      }
    `}
  `
);

const SelectPopupWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      layout: { border },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    position: absolute;
    top: 115%;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: ${palette.common.main};
    padding: 1rem;
    border: 1px solid ${palette.common.border};
    box-shadow: ${palette.common["box-shadow"]};
    border-radius: ${border.rounded.sm};
    z-index: 20;
  `
);

const SelectPopupItem = styled.div(
  ({
    theme: {
      palette,
      layout: { border },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    padding: 1rem 2rem;
    transition: 0.3s ease-out;
    border-radius: ${border.rounded.sm};

    :hover {
      background: ${palette.common.contrast};
    }

    img {
      width: 3rem;
      height: 2rem;
      object-fit: cover;
    }
  `
);

export { SelectWrapper, SelectContent, SelectPopupWrapper, SelectPopupItem };
