import React, { useState, useEffect, useRef } from "react";
import { useMeasurements } from "services/useMeasurements";
import { AnimatePresence } from "framer-motion";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import { useTheme } from "styled-components";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

//styles
import * as Styled from "./MeasurementReport.styles";

//icon
import { FaChevronDown, FaCog, FaFileAlt } from "react-icons/fa";

//components
import IconButton from "components/iconButton/IconButton";
import { IMeasurementData } from "interfaces/measurement.interfaces";

interface IMeasurementOption {
  id: number;
  name: string;
  key: keyof Pick<IMeasurementData, "weight" | "bmi" | "cpm">;
  unit: string;
}

const measurementOptions: IMeasurementOption[] = [
  { id: 1, name: "masa ciała [kg]", key: "weight", unit: "kg" },
  { id: 2, name: "bmi [kg/m2]", key: "bmi", unit: "kg/m2" },
  { id: 3, name: "cpm [kcal]", key: "cpm", unit: "kcal" },
];

interface IMeasurementReportArgs {
  measurementStart: IMeasurementData;
  measurementEnd: IMeasurementData;
  currentOption: IMeasurementOption;
}

export const round2 = (macro: number) => {
  return Math.round(macro * 1e2) / 1e2;
};

const renderMeasurementReportValue = ({
  measurementStart,
  measurementEnd,
  currentOption,
}: IMeasurementReportArgs) => {
  const value =
    measurementEnd[currentOption.key] - measurementStart[currentOption.key];

  return `${value > 0 && "+"} ${round2(value)} ${currentOption.unit}`;
};

const dateFormat = (date: string) => {
  const formatDate = format(new Date(date), "dd.MM.yyyy", {
    locale: pl,
  });

  return formatDate;
};

const MeasurementReport = () => {
  const theme = useTheme();
  const { measurements, measurementsLoading, measurementsError } =
    useMeasurements();

  const [currentOption, setCurrentOption] = useState(measurementOptions[0]);
  const [measurementStart, setMeasurementStart] = useState<IMeasurementData>();
  const [measurementEnd, setMeasurementEnd] = useState<IMeasurementData>();
  const [measurementOptionsOpen, setMeasurementOptionsOpen] = useState(false);

  useEffect(() => {
    if (measurements) {
      setMeasurementStart(measurements[0]);
      setMeasurementEnd(measurements[measurements.length - 1]);
    }
  }, [measurements]);

  const openAllMeasurementValuesModal = () => {
    console.log("openAllMeasurementValuesModal");
  };

  const openMeasurementOptionsPopup = () => {
    setMeasurementOptionsOpen(!measurementOptionsOpen);
  };

  if (measurementsLoading) return <div>measurements loading</div>;
  if (measurementsError || !measurements) return <div>measurements error</div>;

  if (measurements.length < 2) {
    return (
      <Styled.MeasurementEmptyReportWrapper>
        <h2>Brak wystarczającej ilości pomiarów</h2>
        <p>Dodaj minimum 2 pomiary dla pacjenta aby wygenerować raport</p>
      </Styled.MeasurementEmptyReportWrapper>
    );
  }

  return (
    <Styled.MeasurementReportWrapper>
      <Styled.MeasurementReportNavWrapper>
        <Styled.MeasurementSelectWrapper active={measurementOptionsOpen}>
          <button onClick={openMeasurementOptionsPopup}>
            <p>{currentOption.name}</p>
            <FaChevronDown />
          </button>
          <AnimatePresence>
            {measurementOptionsOpen && (
              <MeasurementSelectPopup
                setCurrentOption={setCurrentOption}
                closePopup={() => setMeasurementOptionsOpen(false)}
              />
            )}
          </AnimatePresence>
        </Styled.MeasurementSelectWrapper>
        <Styled.MeasurementNavButtonsWrapper>
          <IconButton
            icon={<FaCog />}
            onClick={() => console.log("open settings")}
          />
          <IconButton
            icon={<FaFileAlt />}
            onClick={() => console.log("open settings")}
          />
        </Styled.MeasurementNavButtonsWrapper>
      </Styled.MeasurementReportNavWrapper>
      {measurementStart && measurementEnd && (
        <Styled.MeasurementReportValuesWrapper>
          <Styled.MeasurementReportDatesWrapper>
            <p>
              {dateFormat(measurementStart.date)} -{" "}
              {dateFormat(measurementEnd.date)}
            </p>
          </Styled.MeasurementReportDatesWrapper>
          <Styled.MeasurementReportValueWrapper>
            <span>
              {renderMeasurementReportValue({
                measurementStart,
                measurementEnd,
                currentOption,
              })}
            </span>
          </Styled.MeasurementReportValueWrapper>
        </Styled.MeasurementReportValuesWrapper>
      )}

      {/* <Styled.MeasurementReportItem>
        <div>
          <input type="checkbox" name="all" />
          <label>wszystkie pomiary</label>
        </div>
        <div>
          <input type="checkbox" name="all" />
          <label>porównaj pomiary</label>
        </div>
      </Styled.MeasurementReportItem> */}
      {/* <Styled.MeasurementReportItem>
        <input placeholder="1 pomiar"></input>
        <input placeholder="2 pomiar"></input>
        <button>porównaj</button>
      </Styled.MeasurementReportItem>
      <Styled.MeasurementReportItem>
        <p>20.06.22 - 23.07.22</p>
        Masa ciała: + 2kg
      </Styled.MeasurementReportItem>
      <Styled.MeasurementReportItem>
        <button> zaawansowany raport</button>
      </Styled.MeasurementReportItem> */}
      {/* <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="red" />
        </AreaChart>
      </ResponsiveContainer> */}

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={measurements}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.palette.common.slate}
          />
          <XAxis
            dataKey="name"
            stroke={theme.palette.common.text}
            tickMargin={10}
            style={{
              fontFamily: "Poppins",
            }}
          />
          <YAxis
            dataKey={currentOption.key}
            stroke={theme.palette.common.text}
            style={{
              fontFamily: "Poppins",
            }}
            width={40}
          />
          <Tooltip label={currentOption.name} />

          <Line
            type="monotone"
            dataKey={currentOption.key}
            aria-label={currentOption.name}
            stroke="#7647cc"
          />
          <defs>
            <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
              <stop offset="20%" stopColor="#8884d8" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={currentOption.key}
            fill="url(#colorUv)"
            stroke="#8884d8"

            // fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Styled.MeasurementReportWrapper>
  );
};

const MeasurementSelectPopup = ({
  setCurrentOption,
  closePopup,
}: {
  setCurrentOption: (option: IMeasurementOption) => void;
  closePopup: () => void;
}) => {
  const popupRef = useRef<HTMLUListElement>(null);
  const selectAction = (option: IMeasurementOption) => {
    setCurrentOption(option);
    closePopup();
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!popupRef.current?.contains(e.target as Node)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <Styled.MeasurementSelectPopupWrapper
      ref={popupRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {measurementOptions.map((option) => (
        <Styled.MeasurementSelectPopupItem
          key={option.id}
          onClick={() => selectAction(option)}
        >
          {option.name}
        </Styled.MeasurementSelectPopupItem>
      ))}
    </Styled.MeasurementSelectPopupWrapper>
  );
};

export default MeasurementReport;
