import styled, { css } from "styled-components";

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

const EstablishmentModalNav = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 2rem;

    input {
      border: none;
      border-radius: ${border.rounded.sm};
      padding: 1rem;
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      :focus {
        outline: none;
      }
      ::placeholder {
        color: ${palette.common.grey};
        font-weight: ${fontWeight.light};
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
    },
    activeItem,
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    gap: 2rem;
    padding: 2rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};

    ${activeItem &&
    css`
      border: 0.1rem dashed ${palette.primary.main};
    `}
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

export {
  EstablishmentModalContainer,
  EstablishmentModalNav,
  EstablishmentList,
  EstablishmentItem,
  EstablishmentItemContent,
  EstablishmentItemMacroList,
  EstablishmentButtonWrapper,
  EstablishmentButton,
};
