import styled, { css } from "styled-components";

const SelectWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 1rem;
    width: 100%;
    position: relative;

    input {
      padding: 0.7rem;
      border-radius: ${border.rounded.sm};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      border: 0.1rem solid ${palette.common.slate};
      letter-spacing: 0.05rem;
      background: transparent;
      transition: 0.1s ease-out;
      width: 100%;
    }

    input:focus {
      outline: none;
      border: 0.1rem solid ${palette.primary.main};
    }
  `
);

export { SelectWrapper };
