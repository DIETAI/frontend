import React from "react";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";

const MyDoc = () => (
  <Document>
    <Page>
      <Text>hello</Text>
    </Page>
  </Document>
);

const App = () => (
  <div>
    <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  </div>
);
