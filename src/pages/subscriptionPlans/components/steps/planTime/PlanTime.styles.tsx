import styled, { css } from "styled-components";

const PlanTimeContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 2rem;
    margin-top: 2rem;
  `
);

interface ISelectedTimePlan {
  selectedTimePlan: boolean;
}

const PlanLTimeItemWrapper = styled.div<ISelectedTimePlan>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
    selectedTimePlan,
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 40rem;
    min-height: 60rem;
    cursor: pointer;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    transition: 0.3s ease-out;
    padding: 2rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    h3 {
      font-size: ${fontSize.xl};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    ${selectedTimePlan &&
    css`
      border: 0.2rem solid ${palette.primary.main};
    `}
  `
);

export { PlanTimeContainer, PlanLTimeItemWrapper };
