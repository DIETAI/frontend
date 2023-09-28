// //interfaces
// import { DietDays } from "../../helpers/createDays";
// import { UseFormSetValue, FieldValues } from "react-hook-form";
// import { IDinnerToGenerate } from "../components/days/generateDietModal/mealsAmount";
// import { IDinner } from "@/interfaces/dietGenerate.interfaces";
// import { IDinnersResult } from "./elasticEstablishment/getDinnerResult";

// //functions
// import { randomDinner } from "./mealRandom";
// import { getDinnerPortionsMacro } from "./dinnerPortionsMacro";
// import { cartesianDinners } from "./cartesianDinners";
// import { cartesianDinners as elasticEstablishmentCartesian } from "./elasticEstablishment/cartesianDinners";
// import { ISelectedGroups, selectGroups } from "./selectGroups";
// import { dinnersResult } from "./dinnerResult";
// import { getDinnerResult } from "./elasticEstablishment/getDinnerResult";
// import { dinnerTotalCount } from "./elasticEstablishment/dinnerTotalCount";

// export const generateDiet = (
//   databaseDinners: IDinner[],
//   dayDinnersToGenerate: IDinnerToGenerate[],
//   meals: DietDays["meals"],
//   dayEstablishments: DietDays["days"][0]["establishments"],
//   elasticEstablishment: boolean,
//   dispatch: any,
//   setDinnerStore: any,
//   setMealMacroStore: any,
//   setDayMacroStore: any,
//   currentDay: DietDays["days"][0]
// ) => {
//   const generate = new Promise<IDinnersResult>((resolve) => {
//     setTimeout(() => {
//       //generate dinner (name: "Płatki owsiane", dinnerProducts: {product: Mleko}, min_amount: 200, max_amount: 300)
//       const randomDinners = dayDinnersToGenerate.map((dinnerToGenerate) =>
//         randomDinner(databaseDinners, dinnerToGenerate, meals)
//       );

//       //wybieranie porcji i obliczanie makroskładników
//       const dinnersPortionsMacro = randomDinners.map((randomDinner) =>
//         getDinnerPortionsMacro(randomDinner)
//       );

//       //web worker (elastic establishment) => funkcja idzie dalej => zmienia wylosowane posiłki => zmienia stan ładowania (ładowanie przezroczyste widać produkty)
//       // => dodaje załadowane ilosci produktów w redux
//       const portionsGroupsGenerate = () => {
//         if (elasticEstablishment) {
//           //opcja elastycznych założeń
//           const elasticEstablishmentMealDinners = dinnersPortionsMacro.flatMap(
//             ({ dinnerProductsPortions }) => dinnerProductsPortions
//           );

//           const elasticEstablishmentCartesianGroups =
//             elasticEstablishmentCartesian(
//               dayEstablishments,
//               ...elasticEstablishmentMealDinners
//             ); //problem z wydajnością (nie jeśli zawęza się grupy, dodać licznik wykonywania funkcji)

//           const selectedGroups = selectGroups(
//             elasticEstablishmentCartesianGroups
//           );
//           const dinnersResult = getDinnerResult(
//             randomDinners,
//             selectedGroups.main
//           );

//           //count dinners macro
//           const resultDinnersTotalMacro = dinnersResult.map((dinner) => ({
//             ...dinner,
//             total: dinnerTotalCount(dinner.dinnerProducts),
//           }));

//           return resultDinnersTotalMacro;
//         }

//         //znalezienie dań dla posiłku (połączyć i obliczyć iloczen kartzjanskim zbiorów)
//         const mealDinners = meals.map((meal) => {
//           const selectedDinners = dinnersPortionsMacro.filter(
//             ({ mealId }) => mealId === meal.id
//           );

//           const concatMealDinnersPortions = selectedDinners.flatMap(
//             ({ dinnerProductsPortions }) => dinnerProductsPortions
//           );

//           return {
//             meal,
//             concatMealDinnersPortions,
//           };
//         });

//         console.time("cartesianProduct");
//         //połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)
//         const dinnersCartesianGroups = mealDinners.map((dinner) => ({
//           mealId: dinner.meal.id,
//           mealName: dinner.meal.name,
//           mealEstablishments: dinner.meal.establishments,
//           groups: cartesianDinners(
//             dinner.meal.establishments,
//             ...dinner.concatMealDinnersPortions
//           ),
//         }));
//         console.timeEnd("cartesianProduct");

//         const selectedDinners = dinnersCartesianGroups.map((meal) => ({
//           mealId: meal.mealId,
//           mealName: meal.mealName,
//           groups: selectGroups(meal.groups),
//         }));

//         const result = dinnersResult(randomDinners, selectedDinners);

//         const resultDinnersTotalMacro = result.dinners.map((dinner) => ({
//           ...dinner,
//           total: dinnerTotalCount(dinner.dinnerProducts),
//         }));

//         console.log({ selectedDinners, result, resultDinnersTotalMacro });
//         return resultDinnersTotalMacro;
//       };

//       portionsGroupsGenerate().map((dinner) => {
//         dispatch(setDinnerStore({ dinner: dinner })); //correct
//       });

//       dispatch(setMealMacroStore(currentDay.id));
//       dispatch(setDayMacroStore(currentDay.id));

//       return resolve(portionsGroupsGenerate());
//     }, 1000);
//   });

//   return generate;
// };

// export const handleGenerateAllDaysDiet = async (
//   days: DietDays["days"],
//   meals: DietDays["meals"],
//   databaseDinners: IDinner[],
//   dinnersToGenerate: IDinnerToGenerate[],
//   checkedGenerateDays: number[],
//   setDinnerStore: any,
//   setMealMacroStore: any,
//   setDayMacroStore: any,
//   dispatch: any,
//   elasticEstablishment: boolean,
//   changeDietGenerateAction: (
//     dayId: number,
//     loading: boolean,
//     loadingMsg: string,
//     generatedDays: number[]
//   ) => void
// ) => {
//   //generuj dla wybranych dni [1,2] => checked GenerateDays

//   const generatedLoopDays = [0];

//   for (const [index, day] of checkedGenerateDays.entries()) {
//     changeDietGenerateAction(
//       day,
//       true,
//       "wybieranie posiłków",
//       generatedLoopDays
//     );

//     const currentDay = days.filter(({ id }) => id === day)[0];
//     const dayMeals = meals.filter(({ dayId }) => dayId === day);
//     const dayDinners = dinnersToGenerate.filter(({ dayId }) => dayId === day);

//     //w funkcji znaleśc mealType dla danego dinner i dla każdego losować (uwzględnić dinnerType np.zupa)
//     const newDinners = await generateDiet(
//       databaseDinners,
//       dayDinners,
//       dayMeals,
//       currentDay.establishments,
//       elasticEstablishment,
//       dispatch,
//       setDinnerStore,
//       setMealMacroStore,
//       setDayMacroStore,
//       currentDay
//     );

//     if (day === checkedGenerateDays[checkedGenerateDays.length - 1]) {
//       return changeDietGenerateAction(0, false, "", [0]);
//     }

//     generatedLoopDays.push(day);
//     changeDietGenerateAction(0, false, "", generatedLoopDays);
//   }
// };

export const hello = 3;
