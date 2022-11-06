// import React, { useRef, useEffect, useState } from "react";

// //styles
// import * as Styled from "./ExportPopup.styles";

// //icons
// import * as Icon from "icons/icons";

// //csv
// import { CSVLink } from "react-csv";

// //pdf
// import PdfTemplate from "../pdfTemplate/PdfTemplate";
// import { PDFDownloadLink } from "@react-pdf/renderer";

// //interfaces
// import { IExportPopupProps } from "./ExportPopup.interfaces";
// // import PopupContainer from "components/popup/PopupContainer";

// const ExportPopup = ({
//   popupDisplay,
//   setExportPopupDisplay,
//   availableColumns,
//   dataRows,
// }: IExportPopupProps) => {
//   const [downloadDataLoading, setDownloadDataLoading] =
//     useState<boolean>(false);

//   const getData = (e: unknown, done: (action: boolean) => void) => {
//     setDownloadDataLoading(true);

//     const downloadData = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(dataRows);
//       }, 500);
//     });

//     downloadData
//       .then(() => {
//         done(true);
//       })
//       .catch(() => done(false))
//       .finally(() => setDownloadDataLoading(false));
//   };

//   return (
//     // <PopupContainer
//     //   openPopup={popupDisplay}
//     //   setOpenPopup={setExportPopupDisplay}
//     // >
//     //   <Styled.PopupContentHeading>
//     //     <span>
//     //       <Icon.FaFileExport />
//     //     </span>
//     //     <h2>Eksportuj</h2>
//     //   </Styled.PopupContentHeading>

//     //   <Styled.PopupContentItemsWrapper>
//     //     <Styled.PopupContentItem variant="pdf">
//     //       <PDFDownloadLink
//     //         document={
//     //           <PdfTemplate data={dataRows} columns={availableColumns} />
//     //         }
//     //         fileName="data.pdf"
//     //       >
//     //         <span>
//     //           <Icon.FaFilePdf />
//     //         </span>
//     //         <h3>Eksportuj plik pdf</h3>
//     //       </PDFDownloadLink>
//     //     </Styled.PopupContentItem>

//     //     <Styled.PopupContentItem variant="csv">
//     //       <CSVLink
//     //         data={dataRows}
//     //         headers={availableColumns}
//     //         asyncOnClick={true}
//     //         onClick={getData}
//     //       >
//     //         <span>
//     //           <Icon.FaFileExcel />
//     //         </span>
//     //         {downloadDataLoading ? (
//     //           <h3>Pobieranie danych..</h3>
//     //         ) : (
//     //           <h3>Eksportuj plik csv</h3>
//     //         )}
//     //       </CSVLink>
//     //     </Styled.PopupContentItem>
//     //   </Styled.PopupContentItemsWrapper>
//     // </PopupContainer>
//     <div>export popup</div>
//   );
// };

// export default ExportPopup;
