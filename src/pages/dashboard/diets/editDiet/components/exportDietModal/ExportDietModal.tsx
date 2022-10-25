import React, { useState } from "react";
import { getDietQuery } from "services/getDiets";
import { useParams } from "react-router";

//components
import Heading from "components/heading/Heading";
import PdfView from "./pdf/PdfView";

//icons
import { FaFileExport, FaFileExcel, FaFilePdf } from "icons/icons";

//styles
import * as Styled from "./ExportDietModal.styles";

//pdf
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

//csv
import { CSVLink } from "react-csv";

const csvColumns = ["dieta", "dni", "posiłki", "potrawy", "produkty"];
const csvData = [
  ["Dieta 1", "Dzień 1", "Śniadanie", "Owsianka", "Płatki owsiane"],
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
        <Styled.ExportDietOption optionType="excel">
          <CSVLink
            data={csvData}
            headers={csvColumns}
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
        </Styled.ExportDietOption>
      </Styled.ExportDietOptionsWrapper>
      <PDFViewer style={{ width: "100%", height: "100rem" }}>
        <PdfView diet={dietQuery} />
      </PDFViewer>
    </Styled.ExportDietModalContainer>
  );
};

export default ExportDietModal;
