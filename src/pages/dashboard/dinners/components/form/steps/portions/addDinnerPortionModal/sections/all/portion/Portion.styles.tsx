import styled, { css } from "styled-components";

interface IActivePortion {
  active: boolean;
}

const Portion = styled.li<IActivePortion>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    active,
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    transition: 0.3s ease-out;
    cursor: pointer;
    padding: 2rem;
    :hover {
      background: ${palette.common.contrast};
    }

    ${active &&
    css`
      border: 0.2rem dashed ${palette.primary.main};
    `}
  `
);

export { Portion };
