import styled, { css } from "styled-components";

const AddFileFormWrapper = styled.form(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;

    img {
      width: 40rem;
      height: 40rem;
      object-fit: cover;
    }
  `
);

export { AddFileFormWrapper };
