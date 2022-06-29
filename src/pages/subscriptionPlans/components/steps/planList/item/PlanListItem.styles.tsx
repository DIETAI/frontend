import styled, { css } from "styled-components";

interface ISelectedPlan {
  selectedPlan: boolean;
}

const PlanListItemWrapper = styled.div<ISelectedPlan>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
    selectedPlan,
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

    ${selectedPlan &&
    css`
      border: 0.2rem solid ${palette.primary.main};
    `}
  `
);

export { PlanListItemWrapper };
