import React, { useState, useEffect, useRef } from "react";
import { useMeasurements } from "services/useMeasurements";
import { AnimatePresence } from "framer-motion";
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
} from "recharts";

//styles
import * as Styled from "./MeasurementReport.styles";

//icon
import { FaChevronDown, FaCog, FaFileAlt } from "react-icons/fa";

//components
import IconButton from "components/iconButton/IconButton";

interface IMeasurementOption {
  id: number;
  name: string;
  key: string;
}

const measurementOptions: IMeasurementOption[] = [
  { id: 1, name: "masa ciała", key: "weight" },
  { id: 2, name: "bmi", key: "bmi" },
  { id: 3, name: "cpm [kcal]", key: "cpm" },
];

const MeasurementReport = () => {
  const [currentOption, setCurrentOption] = useState(measurementOptions[0]);
  const [measurementOptionsOpen, setMeasurementOptionsOpen] = useState(false);

  const { measurements, measurementsLoading, measurementsError } =
    useMeasurements();

  const openAllMeasurementValuesModal = () => {
    console.log("openAllMeasurementValuesModal");
  };

  const openMeasurementOptionsPopup = () => {
    setMeasurementOptionsOpen(!measurementOptionsOpen);
  };

  if (measurementsLoading) return <div>measurements loading</div>;
  if (measurementsError || !measurements) return <div>measurements error</div>;

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
        <IconButton
          icon={<FaCog />}
          onClick={() => console.log("open settings")}
        />
        <IconButton
          icon={<FaFileAlt />}
          onClick={() => console.log("open settings")}
        />
      </Styled.MeasurementReportNavWrapper>

      <Styled.MeasurementReportItem>
        <h2>Masa ciała: </h2> <p>20 kg</p>
      </Styled.MeasurementReportItem>
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
      <ResponsiveContainer width="90%" height={250}>
        <LineChart
          data={measurements}
          margin={{
            right: 60,
            top: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey={currentOption.key} />
          <Tooltip label={currentOption.name} />
          {/* <Legend aria-label="masa ciała" /> */}
          <Line
            type="monotone"
            dataKey={currentOption.key}
            aria-label={currentOption.name}
            stroke="#7647cc"
          />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
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
