import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const MeasurementCustomTooltip = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    /* gap: 1rem; */
    padding: 1rem;
    box-shadow: ${palette.common["box-shadow"]};
    background: ${palette.common.main};
    border-radius: ${border.rounded.sm};
    border: 0.1rem solid ${palette.primary.light};

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const MeasurementContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    width: 100%;
    position: relative;
    min-height: 20rem;
    overflow-y: hidden;
  `
);

const LoadingWrapper = styled(motion.div)(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    flex: 1;
    width: 100%;
    transition: 0.3s ease-out;
  `
);

const MeasurementReportWrapper = styled(motion.div)(
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
    gap: 2rem;
    flex-direction: column;
    width: 100%;
  `
);

const MeasurementEmptyReportWrapper = styled(motion.div)(
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
    flex-direction: column;
    width: 100%;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.md};
    padding: 2rem;

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const MeasurementReportNavWrapper = styled.div(
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
    width: 100%;
    gap: 1rem;

    ${up(breakpoints.xs)} {
      flex-direction: row;
      align-items: center;
    }
  `
);

const MeasurementNavButtonsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    /* ${up(breakpoints.xs)} {
      flex-direction: row;
      align-items: center;
    } */
  `
);

interface IActive {
  active: boolean;
}

const MeasurementSelectWrapper = styled.div<IActive>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    active,
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    width: 100%;
    /* width: 100%; */

    button {
      width: 100%;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: transparent;
      border: none;
      border: 0.1rem solid ${palette.primary.light};
      border-radius: ${border.rounded.sm};
      cursor: pointer;
    }

    svg {
      width: 2rem;
      height: 2rem;
      transition: 0.3s ease-out;
      path {
        fill: ${palette.common.grey};
      }
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    ${active &&
    css`
      button {
        pointer-events: none;
      }
      p {
        color: ${palette.primary.main};
      }
      svg {
        transform: rotate(180deg);
        path {
          fill: ${palette.primary.main};
        }
      }
    `}

    ${up(breakpoints.xs)} {
      width: auto;
    }
  `
);

const MeasurementSelectPopupWrapper = styled(motion.ul)(
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
    padding: 2rem;
    background: ${palette.common.main};
    border-radius: ${border.rounded.md};
    box-shadow: ${palette.common["box-shadow"]};
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    min-height: 15rem;
    border: 0.1rem solid ${palette.primary.light};
    list-style: none;
    z-index: 1;
  `
);

const MeasurementSelectPopupItem = styled.li(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;
    width: 100%;
    cursor: pointer;
    transition: 0.3s ease-out;
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.medium};
    color: ${palette.common.text};

    :hover {
      background: ${palette.common.contrast};
    }

    :not(:last-of-type) {
      border-bottom: 0.1rem solid ${palette.primary.light};
    }
  `
);

const MeasurementReportValuesWrapper = styled.div(
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
    width: 100%;
    gap: 1rem;
    background: ${palette.common.contrast};
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    flex-direction: column;
    padding: 1rem;

    ${up(breakpoints.sm)} {
      align-items: center;
      flex-direction: row;
    }
  `
);

const MeasurementReportDatesWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-grow: 1;
    gap: 1rem;
    /* padding: 1rem; */
    /* border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm}; */

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    ${up(breakpoints.sm)} {
      p {
        font-size: ${fontSize.m};
      }
    }
  `
);

const MeasurementReportValueWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    /* padding: 1rem; */

    /* background: ${palette.primary.main}; */

    span {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
      /* color: white; */
    }

    ${up(breakpoints.sm)} {
      span {
        font-size: ${fontSize.m};
      }
    }
  `
);

const MeasurementReportItem = styled.div(
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
    gap: 2rem;
    flex-direction: column;

    ${up(breakpoints.sm)} {
      flex-direction: row;
      align-items: center;
    }

    h2 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

export {
  MeasurementContainer,
  LoadingWrapper,
  MeasurementReportWrapper,
  MeasurementEmptyReportWrapper,
  MeasurementReportNavWrapper,
  MeasurementNavButtonsWrapper,
  MeasurementSelectWrapper,
  MeasurementSelectPopupWrapper,
  MeasurementSelectPopupItem,
  MeasurementReportValuesWrapper,
  MeasurementReportDatesWrapper,
  MeasurementReportValueWrapper,
  MeasurementReportItem,
  MeasurementCustomTooltip,
};
