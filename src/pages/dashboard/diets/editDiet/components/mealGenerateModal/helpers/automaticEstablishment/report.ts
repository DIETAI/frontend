import React from "react";

export interface IReport {
  macroType: "fat" | "carbohydrates" | "protein";
  name: string;
  description: string;
}

export const establishmentReport = (
  proteinCheck: boolean,
  carbohydratesCheck: boolean,
  fatCheck: boolean
) => {
  const reportResult: IReport[] = [];

  if (proteinCheck && fatCheck && carbohydratesCheck) {
    reportResult.push(
      {
        macroType: "protein",
        name: "Odpowiednia ilość białka",
        description: "Ilość białka w produktach odpowiada założeniom",
      },
      {
        macroType: "fat",
        name: "Odpowiednia ilość tłuszczów",
        description: "Ilość tłuszczu w produktach odpowiada założeniom",
      },
      {
        macroType: "carbohydrates",
        name: "Odpowiednia ilość węglowodanów",
        description: "Ilość węglowodanów w produktach odpowiada założeniom",
      }
    );
  }

  if (!proteinCheck) {
    reportResult.push({
      macroType: "protein",
      name: "nieodpowiednia ilość białka",
      description: "Ilość białka w produktach nie spełnia założeń",
    });
  }
  if (!fatCheck) {
    reportResult.push({
      macroType: "fat",
      name: "nieodpowiednia ilość tłuszczów",
      description: "Ilość tłuszczów w produktach nie spełnia założeń",
    });
  }
  if (!carbohydratesCheck) {
    reportResult.push({
      macroType: "carbohydrates",
      name: "nieodpowiednia ilość węglowodanów",
      description: "Ilość węglowodanów w produktach nie spełnia założeń",
    });
  }

  return reportResult;
};
