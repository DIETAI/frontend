import React, { useState } from "react";
import { useParams } from "react-router";
import { getDietDays } from "services/getDietDays";
import { getDietQuery } from "services/getDiets";

//components
import Day from "../day/Day";

//styles
import * as Styled from "./Days.styles";

const ManyDaysView = () => {
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dayPerPage, setDayPerPage] = useState(7);

  //query to diet days
  const { dietEditId } = useParams();

  if (!dietEditId) return <div>brak diety</div>;

  const { dietQuery, dietQueryLoading, dietQueryError } =
    getDietQuery(dietEditId);

  console.log({ dietQuery });

  if (dietQueryLoading) return <div>dietDays loading...</div>;
  if (dietQueryError || !dietQuery) return <div>diet query error</div>;

  // const { dietDays, dietDaysError, dietDaysLoading } = getDietDays(dietEditId);

  // console.log({ dietDays });

  // if (dietDaysLoading) return <div>dietDays loading...</div>;
  // if (dietDaysError || !dietDays) return <div>dietDays error</div>;

  const indexOfLastData = currentPage * dayPerPage;
  const indexOfFirstData = indexOfLastData - dayPerPage;
  const currentDays = dietQuery.days.slice(indexOfFirstData, indexOfLastData);

  const paginate = () => {
    if (currentPage === 1) {
      return setCurrentPage(2);
    }
    setCurrentPage(1);
  };

  return (
    <Styled.DaysContainer>
      <Styled.DaysNav>
        dni:{" "}
        <b>
          {indexOfFirstData + 1} / {indexOfLastData}
        </b>
        {dietQuery.days.length > dayPerPage && (
          <div>
            <button type="button" className="border" onClick={paginate}>
              wstecz
            </button>
            <button type="button" className="border" onClick={paginate}>
              dalej
            </button>
          </div>
        )}
      </Styled.DaysNav>
      <Styled.DaysContentWrapper>
        {currentDays.map((day) => (
          <Day key={day._id} day={day} />
        ))}
      </Styled.DaysContentWrapper>
    </Styled.DaysContainer>
  );
};

export default ManyDaysView;
