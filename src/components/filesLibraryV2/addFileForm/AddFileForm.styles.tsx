import styled, { css } from "styled-components";

const AddFileFormContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100%;
    backdrop-filter: blur(3px);
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    height: 100%;
  `
);

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
    width: 60rem;
    min-height: 100%;
    gap: 4rem;
    padding: 4rem;
    background: ${palette.common.main};
    border-left: 0.1rem solid ${palette.primary.light};

    img {
      width: 40rem;
      height: 40rem;
      object-fit: cover;
    }
  `
);

export { AddFileFormContainer, AddFileFormWrapper };
