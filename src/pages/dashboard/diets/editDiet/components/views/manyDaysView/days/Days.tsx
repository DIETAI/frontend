import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { getDietDays } from "services/getDietDays";
import { getDietQuery } from "services/getDiets";
import ReactLoading from "react-loading";

//components
import Day from "../day/Day";
import IconButton from "components/iconButton/IconButton";

//styles
import * as Styled from "./Days.styles";

//icons
import { FaChevronLeft, FaChevronRight } from "icons/icons";

const ManyDaysView = () => {
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dayPerPage, setDayPerPage] = useState(7);

  //query to diet days
  const { dietEditId } = useParams();

  if (!dietEditId) return <div>brak diety</div>;

  const { dietQuery, dietQueryLoading, dietQueryError } =
    getDietQuery(dietEditId);

  if (dietQueryLoading)
    return (
      <Styled.DaysLoadingWrapper>
        <ReactLoading type="spin" color="blue" height={50} width={50} />
        <h3>pobieranie dni</h3>
      </Styled.DaysLoadingWrapper>
    );

  if (dietQueryError || !dietQuery) return <div>diet query error</div>;

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
        {dietQuery.days.length > dayPerPage ? (
          <>
            <IconButton icon={<FaChevronLeft />} onClick={paginate} />
            <p>
              dni:{" "}
              <b>
                {indexOfFirstData + 1} / {indexOfLastData}
              </b>
            </p>
            <IconButton icon={<FaChevronRight />} onClick={paginate} />
          </>
        ) : (
          <p>
            dni:{" "}
            <b>
              {indexOfFirstData + 1} / {indexOfLastData}
            </b>
          </p>
        )}
      </Styled.DaysNav>

      <Styled.DaysContentWrapper>
        {currentDays.map((day) => (
          <Day
            key={day._id}
            day={day}
            establishment={dietQuery.establishment}
          />
        ))}
      </Styled.DaysContentWrapper>
    </Styled.DaysContainer>
  );
};

export default ManyDaysView;
