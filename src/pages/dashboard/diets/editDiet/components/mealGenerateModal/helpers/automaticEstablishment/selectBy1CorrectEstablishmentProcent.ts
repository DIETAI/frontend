import { ICartesianResult } from "../cartesianDinners/cartesianDinners";
import { ISelectGroupInfo } from "../selectGroups";
// import { TMealEstablishment } from "../../../components/form/FormInfoPopup";
import { establishmentReport, IReport } from "./report";

export interface IAutomaticEstablishmentGroupInfo extends ISelectGroupInfo {
  report: IReport[];
  group: IGroup | undefined;
}

export interface IGroup extends ICartesianResult {
  correct: boolean;
  proteinEstablishmentProcent: number;
  fatEstablishmentProcent: number;
  carbohydratesEstablishmentProcent: number;
  report: IReport[];
}

export const selectByCorrect1EstablishmentProcent = (
  cartesianGroups: ICartesianResult[],
  // mealEstablishment: TMealEstablishment | undefined
  mealEstablishment?: any
) => {
  const automatic1CorrectEstablishmentGroup: IAutomaticEstablishmentGroupInfo =
    {
      report: [],
      group: undefined,
      type: "automaticEstablishmentCorrect1Macro",
      name: "wybieranie zestawu dla wartości % 1 makroskładnika mieszczących się w określonym przedziale",
      description:
        "wybieranie zestawu dla wartości % 1 makroskładnika mieszczących się w określonym przedziale",
    };

  const selectedGroupsByPerfectKcal = cartesianGroups.filter(
    ({ missingProcentCount }) =>
      Math.abs(missingProcentCount.missingKcalProcent) <= 5
  );

  if (selectedGroupsByPerfectKcal.length < 1) {
    return automatic1CorrectEstablishmentGroup;
  }

  const macroEstablishmentProcent = selectedGroupsByPerfectKcal.map((group) => {
    //obliczanie procenta założeń do total kcal danej grupy, nie całego dania (różnica np. 20 kcal)
    const totalKcal = group.macroTotalCount.total_kcal;
    const totalProteinKcal = group.macroTotalCount.total_protein_gram * 4;
    const totalFatKcal = group.macroTotalCount.total_fat_gram * 9;
    const totalCarbohydratesKcal =
      group.macroTotalCount.total_carbohydrates_gram * 4;
    //procent
    const proteinEstablishmentProcent = Math.round(
      (totalProteinKcal * 100) / totalKcal
    );
    const fatEstablishmentProcent = Math.round(
      (totalFatKcal * 100) / totalKcal
    );
    const carbohydratesEstablishmentProcent = Math.round(
      (totalCarbohydratesKcal * 100) / totalKcal
    );

    const { protein, fat, carbohydrates } = mealEstablishment;

    const proteinCheck =
      proteinEstablishmentProcent >= protein.min_procent &&
      proteinEstablishmentProcent <= protein.max_procent;

    const fatCheck =
      fatEstablishmentProcent >= fat.min_procent &&
      fatEstablishmentProcent <= fat.max_procent;

    const carbohydratesCheck =
      carbohydratesEstablishmentProcent >= carbohydrates.min_procent &&
      carbohydratesEstablishmentProcent <= carbohydrates.max_procent;

    const report = establishmentReport(
      proteinCheck,
      carbohydratesCheck,
      fatCheck
    );

    const macroCheckArr = Object.values({
      proteinCheck,
      fatCheck,
      carbohydratesCheck,
    });

    const filterMacroCheckArr = macroCheckArr.filter((macro) => macro === true);

    if (filterMacroCheckArr.length !== 1) {
      return {
        ...group,
        proteinEstablishmentProcent,
        fatEstablishmentProcent,
        carbohydratesEstablishmentProcent,
        correct: false,
        report,
      };
    }

    return {
      ...group,
      proteinEstablishmentProcent,
      fatEstablishmentProcent,
      carbohydratesEstablishmentProcent,
      correct: true,
      report,
    };
  });

  const selectedCorrectAutomaticGroups = macroEstablishmentProcent.filter(
    ({ correct }) => correct === true
  );

  console.log({ automatic1MacroEstGroups: selectedCorrectAutomaticGroups });

  if (selectedCorrectAutomaticGroups.length < 1) {
    return {
      ...automatic1CorrectEstablishmentGroup,
      report: macroEstablishmentProcent[0].report,
    };
  }

  const selectGroup = () => {
    const group = [...selectedCorrectAutomaticGroups].sort(
      (a, b) =>
        Math.abs(a.missingProcentCount.missingKcalProcent) -
        Math.abs(b.missingProcentCount.missingKcalProcent)
    )[0];

    return group;
  };

  return {
    ...automatic1CorrectEstablishmentGroup,
    group: selectGroup(),
    report: selectGroup().report,
  };
};
