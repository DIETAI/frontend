import React from "react";
import { useMeasurements } from "services/useMeasurements";
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

const MeasurementReport = () => {
  const { measurements, measurementsLoading, measurementsError } =
    useMeasurements();

  if (measurementsLoading) return <div>measurements loading</div>;
  if (measurementsError || !measurements) return <div>measurements error</div>;

  return (
    <Styled.MeasurementReportWrapper>
      <Styled.MeasurementReportItem>
        <h2>Masa ciała: </h2> <p>20 kg</p>
      </Styled.MeasurementReportItem>
      <Styled.MeasurementReportItem>
        <div>
          <input type="checkbox" name="all" />
          <label>wszystkie pomiary</label>
        </div>
        <div>
          <input type="checkbox" name="all" />
          <label>porównaj pomiary</label>
        </div>
      </Styled.MeasurementReportItem>
      <Styled.MeasurementReportItem>
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
      </Styled.MeasurementReportItem>
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
          <YAxis dataKey="weight" />
          <Tooltip label={"masa ciała"} />
          {/* <Legend aria-label="masa ciała" /> */}
          <Line
            type="monotone"
            dataKey="weight"
            aria-label="masa ciała"
            stroke="#7647cc"
          />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Styled.MeasurementReportWrapper>
  );
};

export default MeasurementReport;
