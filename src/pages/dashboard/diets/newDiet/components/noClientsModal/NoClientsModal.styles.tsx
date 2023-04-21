import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const EstablishmentModalContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
  `
);

const EstablishmentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    position: relative;
    min-height: 40rem;
  `
);

const EstablishmentLoadingWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    flex: 1;
    width: 100%;
    transition: 0.3s ease-out;
  `
);

const EstablishmentModalNav = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 2rem;

    button {
      width: 100%;
    }

    input {
      width: 100%;
      max-width: 40rem;
      border: 0.1rem solid ${palette.common.slate};
      border-radius: ${border.rounded.sm};
      padding: 1rem;
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      :focus {
        outline: none;
      }
      ::placeholder {
        color: ${palette.common.slate};
        font-weight: ${fontWeight.light};
      }
    }

    ${up(breakpoints.md)} {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      button {
        width: auto;
      }

      input {
        width: 30rem;
      }
    }
  `
);

const EstablishmentList = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 2rem;
  `
);

interface IActiveItem {
  activeItem: boolean;
}

const EstablishmentItem = styled.div<IActiveItem>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    activeItem,
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    padding: 2rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};

    ${activeItem &&
    css`
      border: 0.1rem dashed ${palette.primary.main};
    `}

    ${up(breakpoints.xs)} {
      flex-direction: row;
      justify-content: space-between;
    }
  `
);

const EstablishmentItemContent = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 2rem;

    h2 {
      color: ${palette.common.text};
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.semibold};
    }
  `
);

const EstablishmentItemMacroList = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 1rem;

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
    }
  `
);

const MacroItem = styled.li(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    flex-direction: column;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
    }

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const EstablishmentButtonWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 1rem;
  `
);

interface IButtonVariant {
  buttonVariant: "add" | "view";
}

const EstablishmentButton = styled.button<IButtonVariant>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    buttonVariant,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: ${border.rounded.sm};
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.8;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    ${buttonVariant === "view" &&
    css`
      background: ${palette.common.contrast};
      border: 0.1rem solid ${palette.primary.light};
      svg {
        path {
          fill: ${palette.primary.main};
        }
      }
    `}

    ${buttonVariant === "add" &&
    css`
      background: #90ee9020;
      border: 0.1rem solid #90ee90a5;
      svg {
        path {
          fill: lightgreen;
        }
      }
    `}
  `
);

const EstablishmentEmptyWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    min-height: 30rem;

    img {
      width: 15rem;
      height: 20rem;
      object-fit: contain;
    }

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }
  `
);

const ErrorWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 4rem;
    border: 0.1rem solid #ff000025;
    border-radius: ${border.rounded.md};
    background: #ff000019;
    min-height: 40rem;

    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};

    svg {
      width: 2.5rem;
      height: 2.5rem;
      path {
        fill: red;
      }
    }

    h3 {
      color: ${palette.common.text};
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
    }

    ${up(breakpoints.sm)} {
      flex-direction: row;
    }
  `
);

export {
  EstablishmentModalContainer,
  EstablishmentWrapper,
  EstablishmentLoadingWrapper,
  EstablishmentModalNav,
  EstablishmentList,
  EstablishmentItem,
  EstablishmentItemContent,
  EstablishmentItemMacroList,
  MacroItem,
  EstablishmentButtonWrapper,
  EstablishmentButton,
  EstablishmentEmptyWrapper,
  ErrorWrapper,
};
