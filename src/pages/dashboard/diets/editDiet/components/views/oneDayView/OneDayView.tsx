import {
  IDietDayQueryData,
  IDietQueryData,
} from "interfaces/diet/dietQuery.interfaces";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDietQuery } from "services/getDiets";
import { AnimatePresence } from "framer-motion";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//utils
import { procentClasses } from "../../../utils/procentClasses";

//helpers
import { percentageRangeClasses } from "../../../utils/procentClasses";

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

  const dateFormat = (date: Date) => {
    const formatDate = format(new Date(date), "eee / dd.MM.yyyy", {
      locale: pl,
    });

    return formatDate;
  };

  return (
    <Styled.OneDayViewContainer>
      <Styled.OneDayViewNav>
        {dietQuery.days.map((dietDay) => (
          <Styled.OneDayViewNavItem
            active={currentDay?._id === dietDay._id}
            key={dietDay._id}
            onClick={() => setCurrentDay(dietDay)}
          >
            {dietDay.date ? dateFormat(dietDay.date) : `Dzień ${dietDay.order}`}{" "}
          </Styled.OneDayViewNavItem>
        ))}
      </Styled.OneDayViewNav>
      <Styled.OneDayViewTotalWrapper>
        <TotalItem
          macroType="B (g)"
          // macroProcent={currentDay?.total.protein.procent}
          variant={percentageRangeClasses({
            minValue: dietQuery.establishment.protein.min_gram,
            maxValue: dietQuery.establishment.protein.max_gram,
            value: currentDay?.total.protein.gram || 0,
          })}
          totalValue={currentDay?.total.protein.gram || 0}
          modalContent={`${dietQuery.establishment.protein.min_gram} - ${dietQuery.establishment.protein.max_gram} g`}
        />
        <TotalItem
          macroType="T (g)"
          // macroProcent={currentDay?.total.fat.procent}
          variant={percentageRangeClasses({
            minValue: dietQuery.establishment.fat.min_gram,
            maxValue: dietQuery.establishment.fat.max_gram,
            value: currentDay?.total.fat.gram || 0,
          })}
          totalValue={currentDay?.total.fat.gram || 0}
          modalContent={`${dietQuery.establishment.fat.min_gram} - ${dietQuery.establishment.fat.max_gram} g`}
        />
        <TotalItem
          macroType="W (g)"
          // macroProcent={currentDay?.total.carbohydrates.procent}
          variant={percentageRangeClasses({
            minValue: dietQuery.establishment.carbohydrates.min_gram,
            maxValue: dietQuery.establishment.carbohydrates.max_gram,
            value: currentDay?.total.carbohydrates.gram || 0,
          })}
          totalValue={currentDay?.total.carbohydrates.gram || 0}
          modalContent={`${dietQuery.establishment.carbohydrates.min_gram} - ${dietQuery.establishment.carbohydrates.max_gram} g`}
        />
        {/* <Styled.OneDayViewTotalItem
          variant={procentClasses({
            establishment: dietQuery.establishment.protein.gram,
            total: currentDay?.total.protein.gram || 0,
          })}
        >
          <h2>B (g):</h2>
          <p>
            <b>{currentDay?.total.protein.gram}</b>/
            {dietQuery.establishment.protein.gram}
          </p>
        </Styled.OneDayViewTotalItem> */}
        {/* <Styled.OneDayViewTotalItem
          variant={procentClasses({
            establishment: dietQuery.establishment.fat.gram,
            total: currentDay?.total.fat.gram || 0,
          })}
        >
          <h2>T (g):</h2>
          <p>
            <b>{currentDay?.total.fat.gram}</b>/
            {dietQuery.establishment.fat.gram}
          </p>
        </Styled.OneDayViewTotalItem>
        <Styled.OneDayViewTotalItem
          variant={procentClasses({
            establishment: dietQuery.establishment.carbohydrates.gram,
            total: currentDay?.total.carbohydrates.gram || 0,
          })}
        >
          <h2>W (g):</h2>
          <p>
            <b>{currentDay?.total.carbohydrates.gram}</b>/
            {dietQuery.establishment.carbohydrates.gram}
          </p>
        </Styled.OneDayViewTotalItem> */}
        <Styled.OneDayViewTotalItem
          variant={procentClasses({
            establishment: dietQuery.establishment.fiber.gram,
            total: currentDay?.total.fiber.gram || 0,
          })}
        >
          <h2>Bł (g):</h2>
          <p>
            <b>{currentDay?.total.fiber.gram}</b>/
            {dietQuery.establishment.fiber.gram}
          </p>
        </Styled.OneDayViewTotalItem>
        <Styled.OneDayViewTotalItem
          variant={procentClasses({
            establishment: dietQuery.establishment.kcal,
            total: currentDay?.total.kcal || 0,
          })}
        >
          <h2>Kcal:</h2>
          <p>
            <b>{currentDay?.total.kcal}</b>/{dietQuery.establishment.kcal}
          </p>
        </Styled.OneDayViewTotalItem>
      </Styled.OneDayViewTotalWrapper>

      <Styled.OneDayViewTableWrapper className="w-full flex flex-col overflow-x-auto relative">
        <Styled.OneDayViewTableHeaderWrapper className="w-fit flex border-x border-y 2xl:w-full">
          <Styled.TableHeaderItem
            style={{ flex: 1 }}
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
          <Meal
            key={index}
            meal={meal}
            establishment={dietQuery.establishment}
          />
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

const TotalItem = ({
  macroType,
  macroProcent,
  totalValue,
  modalContent,
  variant,
}: {
  macroType: string;
  macroProcent?: number;
  totalValue?: number;
  modalContent: string;
  variant?: "red" | "yellow" | "green";
}) => {
  const [totalItemModalOpen, setTotalItemModalOpen] = useState(false);
  return (
    <Styled.TotalItem
      onMouseEnter={() => setTotalItemModalOpen(true)}
      onMouseLeave={() => setTotalItemModalOpen(false)}
      variant={variant}
    >
      <h2>{macroType}:</h2>
      <h3>
        <b>{totalValue}</b>
      </h3>
      {macroProcent && (
        <h3>
          ({macroProcent}
          %)
        </h3>
      )}

      <AnimatePresence>
        {totalItemModalOpen && (
          <Styled.TotalItemModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>{modalContent}</p>
          </Styled.TotalItemModal>
        )}
      </AnimatePresence>
    </Styled.TotalItem>
  );
};

export default OneDayView;
