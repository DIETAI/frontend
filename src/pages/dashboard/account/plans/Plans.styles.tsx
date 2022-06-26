import styled, { css } from "styled-components";

const Container = styled.div(
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
    width: 100%;
    margin-top: 12rem;
    gap: 3rem;
  `
);

const EmptyPlanWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: #ff000010;
    border: 0.1rem solid #ff000026;
    border-radius: 0.8rem;
    max-width: ${breakpoints.lg};
    gap: 1rem;

    h2 {
      color: red;
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
    }

    p {
      color: red;
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
    }
  `
);

const PlanItemWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: 0.8rem;
    max-width: ${breakpoints.lg};
    gap: 1rem;

    h2 {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
    }

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
    }
  `
);

export { Container, EmptyPlanWrapper, PlanItemWrapper };
