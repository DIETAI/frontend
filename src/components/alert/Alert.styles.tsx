import styled, { css } from "styled-components";
import { motion } from "framer-motion";

//interfaces
import { IAlertProps } from "./Alert.interfaces";

const AlertContainer = styled(motion.div)<Pick<IAlertProps, "type">>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
    type,
  }) => css`
    position: fixed;
    right: 0;
    top: 12rem;
    min-width: 25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    background: ${palette.common.main};
    padding: 3rem;
    border-radius: ${border.rounded.md} 0 0 ${border.rounded.md};
    z-index: 2;

    ${type === "success" &&
    css`
      border: 0.2rem solid lightgreen;
    `}

    ${type === "error" &&
    css`
      border: 0.2rem solid red;
    `}

    ${type === "info" &&
    css`
      border: 0.2rem solid ${palette.primary.main};
    `}
  `
);

const AlertDescription = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
  }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;

    h2 {
      color: ${palette.common.text};
      font-size: ${fontSize.l};
    }
    p {
      color: ${palette.common.text};
      padding: 0.5rem 0;
      font-size: 1.4rem;
    }
  `
);

export { AlertContainer, AlertDescription };
