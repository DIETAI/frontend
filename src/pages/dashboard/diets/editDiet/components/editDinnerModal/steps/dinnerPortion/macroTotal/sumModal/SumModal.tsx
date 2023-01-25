import React, { useState } from "react";
import * as Styled from "../DinnerPortionMacroTotal.styles";
import { AnimatePresence } from "framer-motion";

//utils
import {
  procentClasses,
  percentageRangeClasses,
} from "pages/dashboard/diets/editDiet/utils/procentClasses";

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
                {option === "percentageRange" && (
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
