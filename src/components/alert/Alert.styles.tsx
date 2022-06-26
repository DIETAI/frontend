import styled, { css } from "styled-components";

//interfaces
import { IAlertType } from "./Alert.interfaces";

const AlertContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
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
    border-radius: 1rem 0 0 1rem;
    border: 2px solid
      ${({ type }: IAlertType) => (type === "success" ? "lightgreen" : "red")};
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
      font-size: ${fontSize.xs};
    }
  `
);

export { AlertContainer, AlertDescription };
