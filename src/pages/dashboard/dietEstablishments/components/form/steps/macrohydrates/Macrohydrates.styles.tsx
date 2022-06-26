import styled, { css } from "styled-components";

interface ITotalProcent {
  procent: number;
}

const TotalProcentWrapper = styled.div<ITotalProcent>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    procent,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
    gap: 2;

    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.common.border};
    border-radius: ${border.rounded.sm};

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
    }
    h3 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    ${procent >= 50 &&
    css`
      h3 {
        color: orange;
      }
    `}

    ${(procent < 50 || procent > 100) &&
    css`
      h3 {
        color: ${palette.common.error};
      }
    `}

        ${procent === 100 &&
    css`
      h3 {
        color: #00c400;
      }
    `}
  `
);

const FieldWrapper = styled.div(
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
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    width: 100%;
    padding: 4rem;
    border-radius: 0.4rem;
    border: 0.2rem dashed ${palette.primary.light};
  `
);

const FieldHeadWrapper = styled.div(
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
    justify-content: space-between;
    width: 100%;
  `
);

const FieldNumberWrapper = styled.span(
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
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 0.4rem;
    border: 0.1rem solid ${palette.primary.light};
    background: ${palette.primary.light};

    p {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
    }
  `
);

interface IIconButton {
  iconType: "delete" | "edit";
}

const IconOptionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    gap: 1rem;
  `
);

const IconButtonWrapper = styled.button<IIconButton>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    iconType,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 1rem;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.8;
    }

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }

    ${iconType === "delete" &&
    css`
      background: #ff000018;
      border: 0.1rem solid #ff000024;
      svg {
        path {
          fill: red;
        }
      }
    `}

    ${iconType === "edit" &&
    css`
      background: #ffa6001e;
      border: 0.1rem solid #ffa60039;
      svg {
        path {
          fill: orange;
        }
      }
    `}
  `
);

export {
  TotalProcentWrapper,
  FieldWrapper,
  FieldHeadWrapper,
  FieldNumberWrapper,
  IconOptionsWrapper,
  IconButtonWrapper,
};
