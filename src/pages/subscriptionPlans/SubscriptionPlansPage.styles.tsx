import styled, { css } from "styled-components";

const SubscriptionPlansContainer = styled.section(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    width: 100%;
    min-height: 100vh;
    background: ${palette.common.main};
    padding: 10rem 0;
  `
);

const SubscriptionPlansWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5rem;
    max-width: ${breakpoints.lg};
    margin: auto;
    /* border: 0.1rem solid blue; */

    background: ${palette.common.main};
  `
);

export { SubscriptionPlansContainer, SubscriptionPlansWrapper };
