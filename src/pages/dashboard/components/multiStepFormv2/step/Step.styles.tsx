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
    gap: 2.4rem;
    flex-direction: column;
    width: 100%;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    padding: 4rem 2.4rem;
    border-radius: ${border.rounded.md};

    ${up(breakpoints.xs)} {
      padding: 3.2rem;
    }

    ${up(breakpoints.lg)} {
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
    margin-bottom: 1.2rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
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
    width: 4.8rem;
    height: 4.8rem;
    border: 0.2rem solid ${palette.common.border};
    border-radius: ${border.rounded.sm};
    background: ${palette.primary.light};

    svg {
      width: 1.8rem;
      height: 1.8rem;
      path {
        fill: ${palette.primary.main};
      }
    }
  `
);

export { StepWrapper, StepHeadingWrapper, IconWrapper };
