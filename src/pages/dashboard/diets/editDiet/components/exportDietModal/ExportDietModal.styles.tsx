import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const ExportDietModalContainer = styled.div(
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
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    gap: 4rem;
  `
);

const LoadingWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    height: 60rem;

    h3 {
      color: ${palette.common.text};
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.semibold};
    }
  `
);

const ExportDietOptionsWrapper = styled.div(
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
    width: 100%;
    gap: 2rem;
  `
);

interface IExportDietOptionType {
  optionType: "pdf" | "excel";
}

const ExportDietOption = styled.div<IExportDietOptionType>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    optionType,
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 20rem;
    height: 30rem;
    flex-grow: 1;
    gap: 2rem;
    border: 0.2rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.sm};

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      transition: 0.3s ease-out;

      :hover {
        opacity: 0.7;
      }
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
    }
    svg {
      width: 2rem;
      height: 2rem;
    }
    ${optionType === "pdf" &&
    css`
      span {
        background: rgba(255, 0, 0, 0.097);
      }
      svg {
        path {
          fill: red;
        }
      }
    `}
    ${optionType === "excel" &&
    css`
      span {
        background: rgba(0, 210, 35, 0.135);
      }
      svg {
        path {
          fill: #00d222;
        }
      }
    `}
  `
);

export {
  ExportDietModalContainer,
  LoadingWrapper,
  ExportDietOptionsWrapper,
  ExportDietOption,
};
