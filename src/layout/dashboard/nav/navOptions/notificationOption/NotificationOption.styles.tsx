import styled, { css } from "styled-components";

const NotificationOptionWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    width: 30rem;
  `
);

const Notification = styled.div(
  ({
    theme: {
      palette,
      layout: { padding, border },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;

    img {
      width: 4rem;
      height: 4rem;
      object-fit: cover;
      border-radius: ${border.rounded.sm};
    }
  `
);

const NotificationInfoWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    padding: 1rem 0;

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const Divider = styled.span(
  ({
    theme: {
      palette,
      layout: { padding },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
  }) => css`
    width: 100%;
    border-bottom: 0.1rem dashed ${palette.primary.light};
  `
);

export {
  NotificationOptionWrapper,
  Notification,
  NotificationInfoWrapper,
  Divider,
};
