import styled, { css } from "styled-components";

const EstablishmentWrapper = styled.div(
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
    width: 100%;
    gap: 2rem;
    padding: 1rem 0;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    box-shadow: ${palette.common["box-shadow"]};
    padding: 4rem;

    /* h3 {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
    } */
  `
);

export { EstablishmentWrapper };
