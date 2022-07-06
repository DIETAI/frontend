import styled, { css } from "styled-components";

const StepWrapper = styled.section(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    gap: 2rem;
    flex-direction: column;
    width: 100%;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    gap: 3rem;
    padding: 4rem 2rem;
    border-radius: ${border.rounded.md};

    ${up(breakpoints.xs)} {
      padding: 4rem;
    }

    ${up(breakpoints.lg)} {
      /* width: 80rem; */
      /* flex: 1; */
      /* width: 65rem; */
      flex: 1;
    }
  `
);

const StepHeadingWrapper = styled.div(
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
    gap: 2rem;
    margin-bottom: 1rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      font-style: normal;
    }

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
    }
  `
);

const IconWrapper = styled.div(
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
    width: 5rem;
    height: 5rem;
    border: 0.2rem solid ${palette.common.border};
    border-radius: ${border.rounded.sm};
    background: ${palette.primary.light};

    svg {
      width: 2rem;
      height: 2rem;
      path {
        fill: ${palette.primary.main};
      }
    }
  `
);

export { StepWrapper, StepHeadingWrapper, IconWrapper };
