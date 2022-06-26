import React from "react";
import { Document as PdfDocument, Page, Text, View } from "@react-pdf/renderer";

import { styles } from "./PdfTemplate.styles";
import { IPdfDoc } from "./PdfTemplate.interfaces";

const PdfTemplate = ({ columns, data }: IPdfDoc) => (
  // <Document>
  //   <Page style={styles.body}>
  //     <View style={styles.table}>
  //       <View style={styles.tableRow}>
  //         {columns.map((column) => (
  //           <View
  //             key={column.key}
  //             style={[
  //               styles.tableColHeader,
  //               { width: `${100 / columns.length} %` },
  //             ]}
  //           >
  //             <Text style={styles.tableCellHeader}>{column.label}</Text>
  //           </View>
  //         ))}
  //       </View>
  //       {data.map((row) => (
  //         <View key={row._id} style={styles.tableRow}>
  //           {columns.map((column) => (
  //             <View
  //               key={column.key}
  //               style={[
  //                 styles.tableCol,
  //                 { width: `${100 / columns.length} %` },
  //               ]}
  //             >
  //               <Text style={styles.tableCell}>{row[column.key]}</Text>
  //             </View>
  //           ))}
  //         </View>
  //       ))}
  //     </View>
  //   </Page>
  // </Document>
  <PdfDocument />
);

export default PdfTemplate;
