import React, { useEffect, useState } from "react";

import {
  IDietDayQueryData,
  IDietQueryData,
} from "interfaces/diet/dietQuery.interfaces";
import { useParams } from "react-router";
import { getDietQuery } from "services/getDiets";
import { AnimatePresence } from "framer-motion";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//utils
import { procentClasses } from "../../../utils/procentClasses";

//helpers
import { percentageRangeClasses } from "../../../utils/procentClasses";

//components
import Meal from "./meal/Meal";

//styles
import * as Styled from "./OneDayView.styles";

const OneDayView = () => {
  const { dietEditId } = useParams();
  if (!dietEditId) return <div>brak diety</div>;

  const { dietQuery, dietQueryLoading, dietQueryError } =
    getDietQuery(dietEditId);

  const [currentDay, setCurrentDay] = useState<IDietDayQueryData>();

  useEffect(() => {
    if (dietQuery) {
      setCurrentDay(dietQuery.days[0]);
    }
  }, [dietQuery]);

  if (dietQueryLoading) return <div>dietDays loading...</div>;
  if (dietQueryError || !dietQuery) return <div>diet query error</div>;

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
          variant={percentageRangeClasses({
            minValue: dietQuery.establishment.carbohydrates.min_gram,
            maxValue: dietQuery.establishment.carbohydrates.max_gram,
            value: currentDay?.total.carbohydrates.gram || 0,
          })}
          totalValue={currentDay?.total.carbohydrates.gram || 0}
          modalContent={`${dietQuery.establishment.carbohydrates.min_gram} - ${dietQuery.establishment.carbohydrates.max_gram} g`}
        />

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

      <Styled.OneDayViewTableWrapper>
        <Styled.OneDayViewTableHeaderWrapper>
          <Styled.TableHeaderMealItem>posiłek</Styled.TableHeaderMealItem>
          <Styled.TableHeaderDinnerItem>potrawa</Styled.TableHeaderDinnerItem>
          <Styled.TableHeaderDinnerItem>produkty</Styled.TableHeaderDinnerItem>
          <Styled.TableHeaderItem>ilość (g)</Styled.TableHeaderItem>
          <Styled.TableHeaderItem>B (g)</Styled.TableHeaderItem>
          <Styled.TableHeaderItem>T (g)</Styled.TableHeaderItem>
          <Styled.TableHeaderItem>W (g)</Styled.TableHeaderItem>
          <Styled.TableHeaderItem>kcal</Styled.TableHeaderItem>
        </Styled.OneDayViewTableHeaderWrapper>

        {currentDay?.meals.map((meal, index) => (
          <Meal
            key={index}
            meal={meal}
            establishment={dietQuery.establishment}
          />
        ))}
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
