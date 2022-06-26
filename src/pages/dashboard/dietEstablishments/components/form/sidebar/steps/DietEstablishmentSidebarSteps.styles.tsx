import styled, { css } from "styled-components";

const SidebarStepsContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
    position: relative;
    width: 90%;
    border-right: 0.1rem dashed ${palette.primary.light};
    height: 100%;
  `
);

const SidebarStepWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
    padding-right: 3rem;
    border-radius: ${border.rounded.md};
    transition: 0.3s ease-out;
    cursor: pointer;
    position: relative;

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      font-style: normal;
    }

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }

    .step-cursor {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: ${palette.primary.main};
      position: absolute;
      right: -1.5rem;

      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      color: white;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }

    :hover {
      background: ${palette.common.contrast};
    }
  `
);

const SidebarStepInfo = styled.span(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    padding: 0.7rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${border.rounded.sm};
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};

    font-size: 1.1rem;
    font-weight: ${fontWeight.medium};
    color: ${palette.primary.main};
    letter-spacing: 0.05rem;
    font-style: normal;
  `
);

export { SidebarStepsContainer, SidebarStepWrapper, SidebarStepInfo };
