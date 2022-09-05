import styled, { css } from "styled-components";

const DayWrapper = styled.div(
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
    width: 30rem;
    min-height: 50rem;
    /* flex-grow: 1; */
    padding: 1rem;
    gap: 2rem;
    /* border: 0.1rem solid ${palette.common.border}; */
    border-radius: ${border.rounded.md};
    /* cursor: pointer;
    transition: 0.3s ease-out; */

    /* :hover {
      box-shadow: ${palette.common["box-shadow"]};
    } */
  `
);

const DayHeading = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    h2 {
      font-size: ${fontSize.m};
      color: ${palette.common.text};
    }
  `
);

const DayTotal = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    list-style: none;
    gap: 0.5rem;
  `
);

const DayTotalItem = styled.li(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    font-size: ${fontSize.xs};
    flex-grow: 1;

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      text-align: center;
      padding: 0.5rem;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background: ${palette.primary.main};
      border-radius: ${border.rounded.sm} ${border.rounded.sm} 0 0;
      padding: 0.2rem;
      /* border-radius: ${border.rounded.sm}; */
      color: white;
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
    }

    /* :nth-of-type(2) {
      border: 0.1rem solid lightblue;
      span {
        background: lightblue;
      }
    }

    :nth-of-type(3) {
      border: 0.1rem solid lightgreen;
      span {
        background: lightgreen;
      }
    }

    :nth-of-type(4) {
      border: 0.1rem solid lightcoral;
      span {
        background: lightcoral;
      }
    } */
  `
);

const DayMealsWrapper = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
  `
);

export { DayWrapper, DayHeading, DayMealsWrapper, DayTotal, DayTotalItem };
