import styled, { css } from "styled-components";
import { IInputProps } from "./Textarea.interfaces";

const InputWrapper = styled.div<Pick<IInputProps, "fullWidth">>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    fullWidth,
  }) => css`
    display: flex;
    flex-direction: column;
    max-width: 40rem;
    transition: 0.3s ease-out;
    width: 100%;

    label {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }

    input {
      padding: 0.7rem;
      padding-right: 2.5rem;
      border-radius: ${border.rounded.sm};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      border: 0.1rem solid ${palette.common.slate};
      letter-spacing: 0.05rem;
      background: transparent;
    }

    input:focus {
      outline: none;
    }

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.error};
      margin-top: 0.5rem;
      letter-spacing: 0.05rem;
    }

    ${fullWidth &&
    css`
      max-width: 100%;
    `}
  `
);

export { InputWrapper };
