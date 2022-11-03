import styled, { css } from "styled-components";
import { ICalendarProps } from "./Calendar.interfaces";

const CalendarWrapper = styled.div<Pick<ICalendarProps, "fullWidth">>(
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
    width: 40rem;
    position: relative;

    ${fullWidth &&
    css`
      width: 100%;
    `}
  `
);

const CalendarInputWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    transition: 0.3s ease-out;
    width: 100%;

    label {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }

    input,
    textarea {
      padding: 0.7rem;
      border-radius: ${border.rounded.sm};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      border: 0.1rem solid ${palette.common.slate};
      letter-spacing: 0.05rem;
      background: transparent;
      transition: 0.1s ease-out;
    }

    textarea:focus,
    input:focus {
      outline: none;
      border: 0.1rem solid ${palette.primary.main};
    }

    textarea {
      resize: none;
      height: 10rem;
      /* max-width: 100%; */
    }

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.error};
      margin-top: 0.5rem;
      letter-spacing: 0.05rem;
    }
  `
);

export { CalendarWrapper, CalendarInputWrapper };
