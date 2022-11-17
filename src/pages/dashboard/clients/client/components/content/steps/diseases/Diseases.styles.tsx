import styled, { css } from "styled-components";

const ClientListItem = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1.5rem;
    /* border-bottom: 0.1rem dashed ${palette.primary.light};
    padding-bottom: 1.5rem; */
    width: 100%;

    li,
    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const ClientListNavItem = styled.span(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0.2rem 1rem;
    border-radius: ${border.rounded.sm};
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    color: ${palette.primary.main};
  `
);

export { ClientListItem, ClientListNavItem };
