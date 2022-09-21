import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { getDietDays } from "services/getDietDays";
import { getDietQuery } from "services/getDiets";
import ReactLoading from "react-loading";

//components
import Day from "../day/Day";

//styles
import * as Styled from "./Days.styles";

const ManyDaysView = () => {
  const [width, setWidth] = useState(600);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (carousel.current) {
    //   setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    // }

    setWidth(600);
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dayPerPage, setDayPerPage] = useState(7);

  //query to diet days
  const { dietEditId } = useParams();

  if (!dietEditId) return <div>brak diety</div>;

  const { dietQuery, dietQueryLoading, dietQueryError } =
    getDietQuery(dietEditId);

  console.log({ dietQuery });

  if (dietQueryLoading)
    return (
      <Styled.DaysLoadingWrapper>
        <ReactLoading type="spin" color="blue" height={50} width={50} />
        <h3>pobieranie dni</h3>
      </Styled.DaysLoadingWrapper>
    );

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
      {/* <Styled.DaysContentContainer ref={carousel}> */}
      <Styled.DaysContentWrapper
      // drag="x"
      // dragConstraints={{ right: 0, left: -width }}
      >
        {currentDays.map((day) => (
          <Day
            key={day._id}
            day={day}
            establishment={dietQuery.establishment}
          />
        ))}
      </Styled.DaysContentWrapper>
      {/* </Styled.DaysContentContainer> */}
    </Styled.DaysContainer>
  );
};

export default ManyDaysView;
