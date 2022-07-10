import styled, { css } from "styled-components";

const MealEstablishmentModalWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 100%;
    min-height: 30rem;
  `
);

export { MealEstablishmentModalWrapper };
