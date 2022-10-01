import styled, { css } from "styled-components";

const MealWrapper = styled.div(
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
    width: 100%;
    /* min-height: 20rem; */
    padding: 1rem;
    gap: 1rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
  `
);

const MealTotalWrapper = styled.div(
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
    width: 100%;
    padding: 1rem;
    gap: 1rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.sm};

    p {
      font-size: 1.1rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

const MealHeading = styled.div(
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
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    padding: 1rem;

    h3 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const MealDinnersList = styled.div(
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
    gap: 2rem;
    width: 100%;
  `
);

const AddDinnerButton = styled.button(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.7rem 2rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    background: transparent;
    color: ${palette.primary.main};
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    cursor: pointer;
    transition: 0.3s ease-out;

    svg {
      width: 1.2rem;
      height: 1.2rem;

      path {
        fill: ${palette.primary.main};
      }
    }

    :hover {
      background: ${palette.primary.main};
      color: white;

      svg {
        path {
          fill: white;
        }
      }
    }
  `
);

export {
  MealWrapper,
  MealTotalWrapper,
  MealHeading,
  AddDinnerButton,
  MealDinnersList,
};
