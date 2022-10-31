import React, { useState } from "react";
import { getDietQuery } from "services/getDiets";
import { useParams } from "react-router";

//components
import Heading from "components/heading/Heading";
import PdfView from "./pdf/PdfView";

//icons
import { FaFileExport, FaFileExcel, FaFilePdf, FaFileAlt } from "icons/icons";

//styles
import * as Styled from "./ExportDietModal.styles";

//pdf
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

//csv
import { CSVLink } from "react-csv";

const csvHeaders = [
  { label: "Posiłek", key: "meals" },
  { label: "Potrawa", key: "dinners" },
  { label: "produkty", key: "products" },
];

const csvData = [
  {
    meals: [
      { name: "Śniadanie", dinners: [{ name: "Owsianka" }, { name: "Sok" }] },
    ],
  },
];

const ExportDietModal = () => {
  //csv
  const [downloadDataLoading, setDownloadDataLoading] =
    useState<boolean>(false);

  const getData = (e: unknown, done: (action: boolean) => void) => {
    setDownloadDataLoading(true);

    const downloadData = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(csvData);
      }, 500);
    });

    downloadData
      .then(() => {
        done(true);
      })
      .catch(() => done(false))
      .finally(() => setDownloadDataLoading(false));
  };

  const { dietEditId } = useParams();

  if (!dietEditId) return null;

  const { dietQuery, dietQueryLoading, dietQueryError } =
    getDietQuery(dietEditId);

  if (dietQueryLoading || dietQueryError) return <div>loading...</div>;
  if (!dietQuery) return <div>error..</div>;

  const exportJSONData = dietQuery.days.map((day) => ({
    day: `Dzień ${day.order}`,
    meals: day.meals.map((meal) => ({
      mealName: meal.name,
      mealDinners: meal.dinners.map((dinner) => ({
        dinnerName: dinner.dinnerPortion.dinner.name,
        products: dinner.dinnerPortion.dinnerProducts.map((product) => ({
          productName: product.dinnerProduct.product.name,
        })),
      })),
    })),
  }));

  const getCsv = () => {
    //csv
    const items = exportJSONData;
    const replacer = (key: any, value: any) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    const csv = [
      header.join(","), // header row first
      ...items.map((row: any) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(",")
      ),
    ].join("\r\n");

    console.log(csv);

    return csv;
  };

  return (
    <Styled.ExportDietModalContainer>
      <Heading icon={<FaFileExport />} title="Eksportuj dietę" />
      <Styled.ExportDietOptionsWrapper>
        <Styled.ExportDietOption optionType="pdf">
          <PDFDownloadLink
            document={<PdfView diet={dietQuery} />}
            fileName={`${dietQuery.name}.pdf`}
          >
            {/* {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download now!"
            } */}

            <span>
              <FaFilePdf />
            </span>

            <h3>Eksportuj plik pdf</h3>
          </PDFDownloadLink>
        </Styled.ExportDietOption>

        <Styled.ExportDietOption optionType="json">
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(exportJSONData)
            )}`}
            download="diet.json"
          >
            <span>
              <FaFileAlt />
            </span>

            <h3>Eksportuj plik json</h3>
          </a>
        </Styled.ExportDietOption>
        {/* <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(getCsv())}`}
          download="diet.csv"
        >
          <span>
            <FaFileAlt />
          </span>

          <h3>Eksportuj plik csv</h3>
        </a> */}
        {/* <button type="button" onClick={getCsv}>
          get csv
        </button> */}
        {/* <Styled.ExportDietOption optionType="excel">
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            asyncOnClick={true}
            onClick={getData}
          >
            <span>
              <FaFileExcel />
            </span>
            {downloadDataLoading ? (
              <h3>Pobieranie danych..</h3>
            ) : (
              <h3>Eksportuj plik csv</h3>
            )}
          </CSVLink>
        </Styled.ExportDietOption> */}
      </Styled.ExportDietOptionsWrapper>
      {/* <PDFViewer style={{ width: "100%", height: "100rem" }}>
        <PdfView diet={dietQuery} />
      </PDFViewer> */}
    </Styled.ExportDietModalContainer>
  );
};

export default ExportDietModal;
