import styled, { css } from "styled-components";

const DietDinnerWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    /* flex-direction: column; */
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 1rem;
    padding: 1.5rem 1rem;
    /* background: ${palette.common.contrast}; */
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
  `
);

const DietDinner = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 1.5rem;

    h4 {
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

export { DietDinnerWrapper, DietDinner };
