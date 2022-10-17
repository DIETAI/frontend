import React, { useState } from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import {
  procentClasses,
  percentageRangeClasses,
} from "pages/dashboard/diets/editDiet/utils/procentClasses";
import ReactLoading from "react-loading";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";

//styles
import * as Styled from "./GeneratedDays.styles";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";
import { getDietQuery } from "services/getDiets";
import {
  IDietDayQueryData,
  IDietQueryData,
} from "interfaces/diet/dietQuery.interfaces";
import { IDietGenerate, IDietGenerateMeal } from "store/dietGenerate";

//components
import Image from "components/form/images/image/Image";
import { IDietMealDinner } from "interfaces/diet/dietMeals.interfaces";
import { getDinnerPortion } from "services/getDinnerPortions";

const GeneratedDays = () => {
  const { dietEditId } = useParams();
  const { generatedDays, generateDietLoading } = useSelector(
    (state: RootState) => state.dietGenerate
  );
  console.log({ dietEditId });

  if (!dietEditId) return <div>not found</div>;

  const { dietQuery } = getDietQuery(dietEditId);

  if (!dietQuery) return null;

  const mealEstablishment = (meal: IDietGenerateMeal) => {
    const mealEst = dietQuery.establishment.meals.filter(
      ({ type }) => type === meal.type
    )[0];

    return mealEst;
  };

  if (generatedDays.length < 1) return null;

  return (
    <Styled.DaysContainer>
      {generatedDays.map((day, dayIndex) => (
        <Styled.DayWrapper key={day._id}>
          <Styled.DayHeading>
            <h2>Dzień {day.order}</h2>
          </Styled.DayHeading>
          {day.action === "loading" && (
            <Styled.DayLoadingWrapper>
              <ReactLoading type="spin" color="blue" height={50} width={50} />
              {/* <h3>generowanie diety</h3> */}
            </Styled.DayLoadingWrapper>
          )}

          {day.action === "generated" && day.total && day.meals && (
            <>
              <Styled.DayTotalWrapper>
                <SumModal
                  macroType="kcal"
                  totalValue={day.total.kcal}
                  establishmentValue={dietQuery.establishment.kcal}
                />
                <SumModal
                  macroType="B"
                  totalValue={day.total.protein.gram}
                  establishmentValue={dietQuery.establishment.protein.gram}
                  establishmentMinGram={
                    dietQuery.establishment.protein.min_gram
                  }
                  establishmentMaxGram={
                    dietQuery.establishment.protein.max_gram
                  }
                  optionType="percentageRange"
                />
                <SumModal
                  macroType="T"
                  totalValue={day.total.fat.gram}
                  establishmentValue={dietQuery.establishment.fat.gram}
                  establishmentMinGram={dietQuery.establishment.fat.min_gram}
                  establishmentMaxGram={dietQuery.establishment.fat.max_gram}
                  optionType="percentageRange"
                />
                <SumModal
                  macroType="W"
                  totalValue={day.total.carbohydrates.gram}
                  establishmentValue={
                    dietQuery.establishment.carbohydrates.gram
                  }
                  establishmentMinGram={
                    dietQuery.establishment.carbohydrates.min_gram
                  }
                  establishmentMaxGram={
                    dietQuery.establishment.carbohydrates.max_gram
                  }
                  optionType="percentageRange"
                />
              </Styled.DayTotalWrapper>
              {/* <Styled.DayTotalWrapper>
                <SumModal
                  macroType="kcal"
                  totalValue={day.total.kcal}
                  establishmentValue={dietQuery.establishment.kcal}
                />
                <SumModal
                  macroType="B"
                  totalValue={day.total.protein.gram}
                  establishmentValue={dietQuery.establishment.protein.gram}
                />
                <SumModal
                  macroType="T"
                  totalValue={day.total.fat.gram}
                  establishmentValue={dietQuery.establishment.fat.gram}
                />
                <SumModal
                  macroType="W"
                  totalValue={day.total.carbohydrates.gram}
                  establishmentValue={
                    dietQuery.establishment.carbohydrates.gram
                  }
                />
              </Styled.DayTotalWrapper> */}
              <Styled.DayMealsWrapper>
                {day.meals.length > 0 &&
                  day.meals.map((meal) => (
                    <Styled.MealWrapper
                      key={meal._id}
                      generatedType={meal.generatedType}
                    >
                      <Styled.MealHeading>
                        <h3>{meal.name}</h3>
                        <h3>8.00</h3>
                      </Styled.MealHeading>

                      <Styled.MealTotalWrapper>
                        <SumModal
                          macroType="kcal"
                          totalValue={meal.total.kcal}
                          establishmentValue={mealEstablishment(meal).kcal}
                        />

                        <p>
                          B:
                          <b>{meal.total.protein.gram}</b>
                        </p>
                        <p>
                          T:
                          <b>{meal.total.fat.gram}</b>
                        </p>
                        <p>
                          W: <b>{meal.total.carbohydrates.gram}</b>
                        </p>
                      </Styled.MealTotalWrapper>

                      {meal.addedMealObj &&
                        meal.addedMealObj.dinners.map((dietDinner) => (
                          <AddedDietDinner
                            key={dietDinner._id}
                            dietDinner={dietDinner}
                          />
                        ))}

                      {meal.generatedDinners &&
                        meal.generatedDinners.map((generateDinner) => (
                          <Styled.DietDinnerWrapper key={generateDinner._id}>
                            <Styled.DietDinner>
                              {generateDinner.dinnerImage && (
                                <div>
                                  <Image
                                    roundedDataGrid={true}
                                    imageId={generateDinner.dinnerImage}
                                  />
                                </div>
                              )}
                              <h4>{generateDinner.dinnerName}</h4>
                            </Styled.DietDinner>
                            <Styled.DietDinnerTotalWrapper>
                              <p>
                                B: <b>{generateDinner.total.protein.gram}</b>
                              </p>
                              <p>
                                T: <b>{generateDinner.total.fat.gram}</b>
                              </p>
                              <p>
                                W:{" "}
                                <b>{generateDinner.total.carbohydrates.gram}</b>
                              </p>
                              <p>
                                kcal: <b>{generateDinner.total.kcal}</b>
                              </p>
                            </Styled.DietDinnerTotalWrapper>
                          </Styled.DietDinnerWrapper>
                        ))}
                    </Styled.MealWrapper>
                  ))}
              </Styled.DayMealsWrapper>
            </>
          )}
        </Styled.DayWrapper>
      ))}
    </Styled.DaysContainer>
  );
};

const AddedDietDinner = ({ dietDinner }: { dietDinner: IDietMealDinner }) => {
  const { dinnerPortion } = getDinnerPortion(dietDinner.dinnerPortionId);

  if (!dinnerPortion) return null;

  return (
    <Styled.DietDinnerWrapper key={dietDinner._id}>
      <Styled.DietDinner>
        {dietDinner.dinner.image && (
          <div>
            <Image roundedDataGrid={true} imageId={dietDinner.dinner.image} />
          </div>
        )}
        <h4>{dietDinner.dinner.name}</h4>
      </Styled.DietDinner>
      <Styled.DietDinnerTotalWrapper>
        <p>
          B: <b>{dinnerPortion.total.protein.gram}</b>
        </p>
        <p>
          T: <b>{dinnerPortion.total.fat.gram}</b>
        </p>
        <p>
          W: <b>{dinnerPortion.total.carbohydrates.gram}</b>
        </p>
        <p>
          kcal: <b>{dinnerPortion.total.kcal}</b>
        </p>
      </Styled.DietDinnerTotalWrapper>
    </Styled.DietDinnerWrapper>
  );
};

type ISumModalEstablishmentOption = "perfectProcent" | "percentageRange";

export const SumModal = ({
  totalValue,
  establishmentValue,
  macroType,
  establishmentMinGram,
  establishmentMaxGram,
  optionType,
}: {
  totalValue: number;
  establishmentValue: number;
  macroType: string;
  establishmentMinGram?: number;
  establishmentMaxGram?: number;
  optionType?: ISumModalEstablishmentOption;
}) => {
  const [sumModalOpen, setSumModalOpen] = useState(false);
  const [option, setOption] =
    useState<ISumModalEstablishmentOption>("percentageRange");
  return (
    <Styled.SumItem
      onMouseEnter={() => setSumModalOpen(true)}
      onMouseLeave={() => setSumModalOpen(false)}
      variant={
        optionType === "percentageRange"
          ? percentageRangeClasses({
              value: totalValue,
              minValue: establishmentMinGram || 0,
              maxValue: establishmentMaxGram || 0,
            })
          : procentClasses({
              establishment: establishmentValue,
              total: totalValue,
            })
      }
    >
      <p>
        {macroType}: <b>{totalValue}</b>
      </p>

      <AnimatePresence>
        {sumModalOpen && (
          <Styled.SumItemModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {!establishmentMinGram && (
              <Styled.PerfectProcent
                variant={procentClasses({
                  establishment: establishmentValue,
                  total: totalValue,
                })}
              >
                <p>
                  <b>{totalValue}</b>/{establishmentValue}
                </p>
              </Styled.PerfectProcent>
            )}

            {establishmentMinGram && (
              <>
                {/* <Styled.SumItemNav>
                  <Styled.SumItemNavOption>
                    <CheckBoxWrapper
                      checked={option === "perfectProcent"}
                      onClick={() => setOption("perfectProcent")}
                    />
                    <p>
                      licz do preferowanej wartości procentowej z odchyleniem 5%
                    </p>
                  </Styled.SumItemNavOption>
                  <Styled.SumItemNavOption>
                    <CheckBoxWrapper
                      checked={option === "percentageRange"}
                      onClick={() => setOption("percentageRange")}
                    />
                    <p>licz do przedziału %</p>
                  </Styled.SumItemNavOption>
                </Styled.SumItemNav> */}
                {option === "percentageRange" && (
                  // <div>
                  //   <p>przedział procentowy: 10-22%</p>
                  //   <p>preferowana wartość %: 15%</p>
                  //   <p>obecna wartość %: 5%</p>
                  // </div>
                  <Styled.PercentageRangeWrapper
                    variant={percentageRangeClasses({
                      value: totalValue,
                      minValue: establishmentMinGram || 0,
                      maxValue: establishmentMaxGram || 0,
                    })}
                  >
                    <Styled.PercentageRangeItem>
                      <p>
                        <b>{totalValue}</b> g
                      </p>
                    </Styled.PercentageRangeItem>
                    <Styled.PercentageRangeItem>
                      <p>
                        /{establishmentMinGram} - {establishmentMaxGram} g
                      </p>
                    </Styled.PercentageRangeItem>
                  </Styled.PercentageRangeWrapper>
                )}

                {option === "perfectProcent" && (
                  <Styled.PerfectProcent
                    variant={procentClasses({
                      establishment: establishmentValue,
                      total: totalValue,
                    })}
                  >
                    <p>
                      <b>{totalValue}</b>/{establishmentValue}
                    </p>
                  </Styled.PerfectProcent>
                )}
              </>
            )}
          </Styled.SumItemModal>
        )}
      </AnimatePresence>
    </Styled.SumItem>
  );
};

// export const SumModal = ({
//   totalValue,
//   establishmentValue,
//   macroType,
// }: {
//   totalValue: number;
//   establishmentValue: number;
//   macroType: string;
// }) => {
//   const [sumModalOpen, setSumModalOpen] = useState(false);
//   return (
//     <Styled.SumItem
//       onMouseEnter={() => setSumModalOpen(true)}
//       onMouseLeave={() => setSumModalOpen(false)}
//       variant={procentClasses({
//         establishment: establishmentValue,
//         total: totalValue,
//       })}
//     >
//       <p>
//         {macroType}: <b>{totalValue}</b>
//       </p>

//       <AnimatePresence>
//         {sumModalOpen && (
//           <Styled.SumItemModal
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <p>
//               <b>{totalValue}</b>/{establishmentValue}
//             </p>
//           </Styled.SumItemModal>
//         )}
//       </AnimatePresence>
//     </Styled.SumItem>
//   );
// };

export default GeneratedDays;
