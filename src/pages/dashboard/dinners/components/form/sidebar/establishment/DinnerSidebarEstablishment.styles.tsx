import styled, { css } from "styled-components";

const SidebarEstablishmentContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
    position: relative;
    width: 90%;
    border-right: 0.1rem dashed ${palette.primary.light};
    height: 100%;
  `
);

export { SidebarEstablishmentContainer };
