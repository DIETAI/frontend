import React from "react";

const GeneratedDays = () => {
  return <div>GeneratedDays</div>;
};

export default GeneratedDays;

// import React, { useState } from "react";
// import { useParams } from "react-router";
// import { AnimatePresence } from "framer-motion";
// import { procentClasses } from "pages/dashboard/diets/editDiet/utils/procentClasses";

// //store
// import { RootState } from "store/store";
// import { useSelector, useDispatch } from "react-redux";

// //styles
// import * as Styled from "./GeneratedDays.styles";
// import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";
// import { getDietQuery } from "services/getDiets";
// import {
//   IDietDayQueryData,
//   IDietQueryData,
// } from "interfaces/diet/dietQuery.interfaces";
// import { IDietGenerate } from "store/dietGenerate";

// //components
// import Image from "components/form/images/image/Image";

// const GeneratedDays = () => {
//   const { dietEditId } = useParams();
//   const { generatedDays } = useSelector(
//     (state: RootState) => state.dietGenerate
//   );
//   console.log({ dietEditId });

//   if (!dietEditId) return <div>not found</div>;

//   const { dietQuery } = getDietQuery(dietEditId);

//   if (!dietQuery) return null;

//   const mealEstablishment = (
//     meal: IDietGenerate["generatedDays"][0]["meals"][0]
//   ) => {
//     const mealEst = dietQuery.establishment.meals.filter(
//       ({ type }) => type === meal.type
//     )[0];

//     return mealEst;
//   };

//   return (
//     <Styled.DaysContainer>
//       {generatedDays.map((day, dayIndex) => (
//         <Styled.DayWrapper key={day._id}>
//           <Styled.DayHeading>
//             <h2>Dzień {dayIndex + 1}</h2>
//           </Styled.DayHeading>
//           <Styled.DayTotalWrapper>
//             <SumModal
//               macroType="kcal"
//               totalValue={day.total.kcal}
//               establishmentValue={dietQuery.establishment.kcal}
//             />
//             <SumModal
//               macroType="B"
//               totalValue={day.total.protein.gram}
//               establishmentValue={dietQuery.establishment.protein.gram}
//             />
//             <SumModal
//               macroType="T"
//               totalValue={day.total.fat.gram}
//               establishmentValue={dietQuery.establishment.fat.gram}
//             />
//             <SumModal
//               macroType="W"
//               totalValue={day.total.carbohydrates.gram}
//               establishmentValue={dietQuery.establishment.carbohydrates.gram}
//             />
//           </Styled.DayTotalWrapper>
//           <Styled.DayMealsWrapper>
//             {day.meals.length > 0 &&
//               day.meals.map((meal) => (
//                 <Styled.MealWrapper key={meal._id}>
//                   <Styled.MealHeading>
//                     <h3>{meal.name}</h3>
//                     <h3>8.00</h3>
//                   </Styled.MealHeading>

//                   <Styled.MealTotalWrapper>
//                     <SumModal
//                       macroType="kcal"
//                       totalValue={
//                         meal.selectedGroup.macroTotalCount?.total_kcal || 0
//                       }
//                       establishmentValue={mealEstablishment(meal).kcal}
//                     />

//                     <p>
//                       B:
//                       <b>
//                         {meal.selectedGroup.macroTotalCount?.total_protein_gram}
//                       </b>
//                     </p>
//                     <p>
//                       T:
//                       <b>
//                         {meal.selectedGroup.macroTotalCount?.total_fat_gram}
//                       </b>
//                     </p>
//                     <p>
//                       W:{" "}
//                       <b>
//                         {
//                           meal.selectedGroup.macroTotalCount
//                             ?.total_carbohydrates_gram
//                         }
//                       </b>
//                     </p>
//                   </Styled.MealTotalWrapper>

//                   {meal.dinners.map((generateDinner) => (
//                     <Styled.DietDinnerWrapper key={generateDinner._id}>
//                       <Styled.DietDinner>
//                         {generateDinner.dinnerImage && (
//                           <div>
//                             <Image
//                               roundedDataGrid={true}
//                               imageId={generateDinner.dinnerImage}
//                             />
//                           </div>
//                         )}
//                         <h4>{generateDinner.dinnerName}</h4>
//                       </Styled.DietDinner>
//                       <Styled.DietDinnerTotalWrapper>
//                         <p>
//                           B: <b>{generateDinner.total.protein.gram}</b>
//                         </p>
//                         <p>
//                           T: <b>{generateDinner.total.fat.gram}</b>
//                         </p>
//                         <p>
//                           W: <b>{generateDinner.total.carbohydrates.gram}</b>
//                         </p>
//                         <p>
//                           kcal: <b>{generateDinner.total.kcal}</b>
//                         </p>
//                       </Styled.DietDinnerTotalWrapper>
//                     </Styled.DietDinnerWrapper>
//                   ))}
//                 </Styled.MealWrapper>
//               ))}
//           </Styled.DayMealsWrapper>
//         </Styled.DayWrapper>
//       ))}
//     </Styled.DaysContainer>
//   );
// };

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

// export default GeneratedDays;
