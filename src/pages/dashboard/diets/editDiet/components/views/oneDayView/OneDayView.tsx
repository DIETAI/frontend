import {
  IDietDayQueryData,
  IDietQueryData,
} from "interfaces/diet/dietQuery.interfaces";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDietQuery } from "services/getDiets";

//csv
// import { CSVLink } from "react-csv";
// import { IDietTemplateEstablishments } from "@/interfaces/dietTemplateEstablishments";

//form
// import { useFormContext } from "react-hook-form";

//interfaces
// import { DietDays } from "../../../../helpers/createDays";

//components
import Meal from "./meal/Meal";
// import { IDinnerProduct } from "@/interfaces/dietGenerate.interfaces";
// import Spinner from "@/components/spinner/Spinner";

//context
// import { useGenerateDietAction } from "../../../context/generateDietAction";

//styles
import * as Styled from "./OneDayView.styles";

// const requiredColumns = [
//   { key: "meal", label: "posiłek" },
//   { key: "dinner", label: "potrawa" },
//   { key: "products", label: "produkty" },
//   { key: "quantity", label: "ilość (g)" },
// ];

// interface IDataColumns {
//   // key: keyof DietDays[0]["meals"][0]["dinners"][0]["dinnerProducts"][0]["product"];
//   key: keyof DietDays["dinners"][0]["dinnerProducts"][0]["macrohydrates"];
//   label: string;
// }

// export const columns: IDataColumns[] = [
//   { key: "proteinGram", label: "B (g)" },
//   { key: "fatGram", label: "T (g)" },
//   { key: "carbohydratesGram", label: "W (g)" },
//   { key: "kcal", label: "kcal" },
// ];

// interface DayData {
//   day: DietDays["days"][0];
// }

const procentClasses = (maxQuantity: number, currentQuantity: number) => {
  const currentProcent = (currentQuantity * 100) / maxQuantity;
  const missingProcent = Math.abs(100 - currentProcent);

  //procent
  if (missingProcent >= 50) {
    return "text-red-400";
  }

  if (missingProcent <= 5) {
    return "text-green-500";
  }
  return "text-yellow-400";
};

const OneDayView = () => {
  //query to diet days
  const { dietEditId } = useParams();
  if (!dietEditId) return <div>brak diety</div>;

  const { dietQuery, dietQueryLoading, dietQueryError } =
    getDietQuery(dietEditId);

  console.log({ dietQuery });

  const [currentDay, setCurrentDay] = useState<IDietDayQueryData>();

  useEffect(() => {
    if (dietQuery) {
      setCurrentDay(dietQuery.days[0]);
    }
  }, [dietQuery]);

  if (dietQueryLoading) return <div>dietDays loading...</div>;
  if (dietQueryError || !dietQuery) return <div>diet query error</div>;

  // const { dietDay, dietDayLoading, dietDayError } = getDietDay(dietEditId); //get dietDayQuery

  // if (dietDayLoading) return <div>loading...</div>;
  // if (dietDayError) return <div>error...</div>;

  // const { dietMeals } = useSelector((state: RootState) => state.diet);
  // const { changeDietGenerateAction, loading, dayId, loadingMsg } =
  //   useGenerateDietAction();

  // const { establishments } = day;
  // const establishmentProtein = establishments.macrohydrates[0];
  // const establishmentFat = establishments.macrohydrates[1];
  // const establishmentCarbohydrates = establishments.macrohydrates[2];

  // const currentDayMeals = dietMeals.filter(({ dayId }) => dayId === day.id);

  // const loadingDay = () => {
  //   const currentDayLoading = day.id === dayId;

  //   if (currentDayLoading && loading) {
  //     return true;
  //   }

  //   return false;
  // };

  return (
    <Styled.OneDayViewContainer>
      <Styled.OneDayViewNav>
        {dietQuery.days.map((dietDay) => (
          <Styled.OneDayViewNavItem
            active={currentDay?._id === dietDay._id}
            key={dietDay._id}
            onClick={() => setCurrentDay(dietDay)}
          >
            Dzień {dietDay.order}
          </Styled.OneDayViewNavItem>
        ))}
      </Styled.OneDayViewNav>

      {/* <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <ul className="flex gap-4 text-gray-800 flex-wrap">
          <li>
            <b>B (g)</b>:{" "}
            <span
              className={` font-medium ${procentClasses(
                establishmentProtein.gram,
                day.total.protein.gram
              )}`}
            >
              {day.total.protein.gram}
            </span>{" "}
            / {establishmentProtein.gram}
          </li>
          <li>
            <b>T (g)</b>:{" "}
            <span
              className={` font-medium ${procentClasses(
                establishmentFat.gram,
                day.total.fat.gram
              )}`}
            >
              {day.total.fat.gram}
            </span>{" "}
            / {establishmentFat.gram}
          </li>
          <li>
            <b>W (g)</b>:{" "}
            <span
              className={` font-medium ${procentClasses(
                establishmentCarbohydrates.gram,
                day.total.carbohydrates.gram
              )}`}
            >
              {day.total.carbohydrates.gram}
            </span>{" "}
            / {establishmentCarbohydrates.gram}
          </li>
        </ul>
        <ul className="flex gap-4 text-gray-800">
          <li>
            <b>kcal (g)</b>:{" "}
            <span
              className={` font-medium ${procentClasses(
                establishments.kcal,
                day.total.kcal
              )}`}
            >
              {day.total.kcal}
            </span>{" "}
            / {establishments.kcal}
          </li>
        </ul>
      </div> */}
      <Styled.OneDayViewTableWrapper className="w-full flex flex-col overflow-x-auto relative">
        <Styled.OneDayViewTableHeaderWrapper className="w-fit flex border-x border-y 2xl:w-full">
          <Styled.TableHeaderItem
            style={{ width: "26rem", flex: 1 }}
            className="w-40 p-5 border-r flex items-center justify-center text-base font-semibold 2xl:flex-auto"
          >
            posiłek
          </Styled.TableHeaderItem>
          <Styled.TableHeaderItem
            style={{ width: "26rem" }}
            className="w-40 p-5 border-r  flex items-center justify-center text-base font-semibold 2xl:w-64"
          >
            potrawa
          </Styled.TableHeaderItem>
          <Styled.TableHeaderItem
            style={{ width: "26rem" }}
            className="w-40 p-5 border-r flex items-center justify-center text-base font-semibold 2xl:w-64"
          >
            produkty
          </Styled.TableHeaderItem>
          <Styled.TableHeaderItem className="w-20 p-5 border-r flex items-center justify-center text-base font-semibold 2xl:w-32">
            ilość (g)
          </Styled.TableHeaderItem>
          <Styled.TableHeaderItem className="w-20 p-5 border-r last-of-type:border-none flex items-center justify-center text-base font-semibold 2xl:w-32">
            B (g)
          </Styled.TableHeaderItem>
          <Styled.TableHeaderItem className="w-20 p-5 border-r last-of-type:border-none flex items-center justify-center text-base font-semibold 2xl:w-32">
            T (g)
          </Styled.TableHeaderItem>
          <Styled.TableHeaderItem className="w-20 p-5 border-r last-of-type:border-none flex items-center justify-center text-base font-semibold 2xl:w-32">
            W (g)
          </Styled.TableHeaderItem>
          <Styled.TableHeaderItem className="w-20 p-5 border-r last-of-type:border-none flex items-center justify-center text-base font-semibold 2xl:w-32">
            kcal
          </Styled.TableHeaderItem>
          {/* {columns.length &&
            columns.map(({ key, label }) => (
              <li
                className="w-20 p-5 border-r last-of-type:border-none flex items-center justify-center text-base font-semibold 2xl:w-32"
                key={key}
              >
                {label}
              </li>
            ))} */}
        </Styled.OneDayViewTableHeaderWrapper>

        {currentDay?.meals.map((meal, index) => (
          <Meal key={index} meal={meal} />
        ))}

        {/* {loadingDay() && (
          <div className=" flex items-center justify-center w-full h-full absolute top-0 left-0 backdrop-blur-sm">
            <Spinner />
          </div>
        )} */}
      </Styled.OneDayViewTableWrapper>
    </Styled.OneDayViewContainer>
  );
};

export default OneDayView;
