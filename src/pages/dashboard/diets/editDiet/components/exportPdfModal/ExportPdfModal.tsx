import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Svg,
  Font,
} from "@react-pdf/renderer";
import { IDietDayData } from "interfaces/diet/dietDays.interfaces";
import { IDietData } from "interfaces/diet/diet.interfaces";
import { getDiet, getDietQuery } from "services/getDiets";
import { useParams } from "react-router";
import Logo from "assets/logo-icon.png";
import DinnerNotFoundImg from "assets/dinnerNotFoundPdf.png";
import { IDietQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./ExportPdfModal.styles";

// Create styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    fontFamily: "Roboto",
    marginBottom: 20,
    marginTop: 20,
    color: "#263656",
  },
  introPage: {
    fontFamily: "Roboto",
    flexDirection: "column",
    // padding: 20,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: "#263656",
  },
  introHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  introContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    flexGrow: 1,
    fontSize: 50,
    fontWeight: 800,
  },
  introBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    objectFit: "cover",
    objectPosition: "left",
    height: "100%",
    width: "100%",
    zIndex: -1,
    opacity: 0.05,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  logo: {
    width: 100,
    height: 40,
    objectFit: "contain",
  },
  dayHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "#f6f3fc",
  },
  section: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 40,
    width: "100%",
    borderBottom: 1,
    borderBottomStyle: "dashed",
    borderBottomColor: "#ece2ff",
  },

  mealHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 20,
    border: 1,
    borderStyle: "dashed",
    borderColor: "#ece2ff",
  },

  dinnersContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginBottom: 10,
  },
  dinnerSection: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  dinnerSectionImage: {
    width: 120,
    // height: 150,
    objectFit: "contain",
  },
  dinnerSectionContentWrapper: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginLeft: 20,
    fontSize: 16,
  },
  productsWrapper: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 10,
  },
  product: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
    fontSize: 13,
  },
  dietItemImage: {
    width: 150,
    height: 100,
    // borderRadius: 2,
    objectFit: "cover",
    objectPosition: "left",
  },
});

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontStyle: "light",
    },
    {
      src: "https://fonts.google.com/share?selection.family=Roboto:wght@900",
      fontStyle: "bold",
      fontWeight: 800,
    },
  ],
  // src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

// Create Document Component
export const MyDocument = ({ diet }: { diet: IDietQueryData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.introPage} wrap={true}>
        <View style={styles.introHeader}>
          <Image src={Logo} style={styles.logo} />
        </View>
        <View style={styles.introContent}>
          <Text>Jadłospis</Text>
        </View>
        <Image src={Logo} style={styles.introBackground} />
      </Page>
      {diet.days.map((day) => (
        <Page key={day._id} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={Logo} style={styles.logo} />
          </View>
          <View style={styles.dayHeader}>
            <Text>Dzień {day.order}</Text>
          </View>
          {day.meals.map((meal) => (
            <View key={meal._id} style={styles.section} wrap={true}>
              <View style={styles.mealHeader} break>
                <Text>{meal.name}</Text>
                <Text>8:00</Text>
              </View>

              <View style={styles.dinnersContainer} wrap={true}>
                {meal.dinners.length > 0 &&
                  meal.dinners.map((dietDinner) => (
                    <View key={dietDinner._id} style={styles.dinnerSection}>
                      {dietDinner.dinnerPortion.dinner.imageObj ? (
                        <Image
                          style={styles.dinnerSectionImage}
                          src={
                            dietDinner.dinnerPortion.dinner.imageObj.imageURL
                          }
                        />
                      ) : (
                        <Image
                          style={styles.dinnerSectionImage}
                          src={DinnerNotFoundImg}
                        />
                      )}
                      <View style={styles.dinnerSectionContentWrapper}>
                        <Text>{dietDinner.dinnerPortion.dinner.name}</Text>

                        <View style={styles.productsWrapper}>
                          {dietDinner.dinnerPortion.dinnerProducts.map(
                            (dinnerProduct) => (
                              <View
                                key={dinnerProduct.dinnerProductId}
                                style={styles.product}
                              >
                                <Text>•</Text>
                                <Text style={{ marginHorizontal: 4 }}>
                                  {dinnerProduct.dinnerProduct.product.name} -{" "}
                                  {dinnerProduct.portion} g
                                </Text>
                              </View>
                            )
                          )}
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </Page>
      ))}
    </Document>
  );
};

const ExportDietModal = () => {
  const { dietEditId } = useParams();

  if (!dietEditId) return null;
  const { dietQuery, dietQueryLoading, dietQueryError } =
    getDietQuery(dietEditId);

  if (dietQueryLoading || dietQueryError) return <div>loading...</div>;
  if (!dietQuery) return <div>error..</div>;

  return (
    <Styled.ExportPdfModalContainer>
      {/* <PDFDownloadLink
        document={<MyDocument diet={dietQuery} />}
        fileName={`${dietQuery.name}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink> */}
      {/* <PDFViewer style={styles.container}> */}
      <PDFViewer style={styles.container}>
        <MyDocument diet={dietQuery} />
      </PDFViewer>
    </Styled.ExportPdfModalContainer>
  );
};

export default ExportDietModal;
