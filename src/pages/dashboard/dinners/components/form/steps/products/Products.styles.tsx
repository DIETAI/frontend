import styled, { css } from "styled-components";

const FieldWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    width: 100%;
    padding: 4rem;
    border-radius: 0.4rem;
    border: 0.2rem dashed ${palette.primary.light};
  `
);

const FieldHeadWrapper = styled.div(
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
    justify-content: space-between;
    width: 100%;
  `
);

const FieldNumberWrapper = styled.span(
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
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 0.4rem;
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.primary.light};

    p {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
    }
  `
);

interface IIconButton {
  iconType: "delete" | "edit";
}

const IconOptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    gap: 1rem;
  `
);

const IconButtonWrapper = styled.button<IIconButton>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    iconType,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 1rem;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.8;
    }

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }

    ${iconType === "delete" &&
    css`
      background: #ff000018;
      border: 0.1rem solid #ff000024;
      svg {
        path {
          fill: red;
        }
      }
    `}

    ${iconType === "edit" &&
    css`
      background: #ffa6001e;
      border: 0.1rem solid #ffa60039;
      svg {
        path {
          fill: orange;
        }
      }
    `}
  `
);

const ItemWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 3rem;
    padding: 3rem;
    width: 100%;
    transition: 0.3s ease-out;
  `
);

const ItemContent = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1rem;

    h2 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.semibold};
      font-size: ${fontSize.l};
    }

    h3 {
      color: ${palette.common.text};
      font-weight: ${fontWeight.medium};
      font-size: 1.4rem;
    }

    p {
      color: ${palette.common.text};
      font-weight: ${fontWeight.light};
      font-size: ${fontSize.s};
    }
  `
);

const ItemFeature = styled.div(
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
    gap: 1rem;
    padding: 0.5rem 1rem;
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.common.contrast};
    color: ${palette.primary.main};
    font-weight: ${fontWeight.medium};
    font-size: 1.3rem;
    width: 10rem;
  `
);

export {
  FieldWrapper,
  FieldHeadWrapper,
  FieldNumberWrapper,
  IconOptionsWrapper,
  IconButtonWrapper,
  ItemWrapper,
  ItemContent,
  ItemFeature,
};
