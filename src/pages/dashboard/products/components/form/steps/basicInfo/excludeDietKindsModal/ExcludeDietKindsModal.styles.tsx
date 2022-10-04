import styled, { css } from "styled-components";

const ExcludeDietKindsModalWrapper = styled.div(
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
    width: 100%;
  `
);

const ExcludeDietKindsContent = styled.div(
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
    gap: 4rem;
    width: 100%;
  `
);

const DietKindsSearchWrapper = styled.div(
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
    width: 50rem;
    border: 0.1rem solid ${palette.primary.main};
  `
);

const SelectedDietKindsWrapper = styled.div(
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
    width: 100%;
    border: 0.1rem solid red;
  `
);

export {
  ExcludeDietKindsModalWrapper,
  ExcludeDietKindsContent,
  DietKindsSearchWrapper,
  SelectedDietKindsWrapper,
};
