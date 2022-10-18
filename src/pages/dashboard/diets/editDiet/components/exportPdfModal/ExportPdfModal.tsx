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
import { IDietQueryData } from "interfaces/diet/dietQuery.interfaces";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    fontFamily: "Roboto",
  },
  introPage: {
    fontFamily: "Roboto",
    flexDirection: "column",
    padding: 20,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    padding: 10,
    width: "100%",
    borderBottom: 1,
    borderBottomColor: "lightgrey",
  },
  logo: {
    width: 100,
    height: 40,
    objectFit: "contain",
  },
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: "100%",
    borderBottom: 2,
    borderBottomColor: "red",
  },
  dietItemImage: {
    width: 150,
    height: 100,
    // borderRadius: 2,
    objectFit: "contain",
  },
});

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

// Create Document Component
export const MyDocument = ({ diet }: { diet: IDietQueryData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.introPage}>
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
          <View style={styles.section}>
            <Text>Dzień {day.order}</Text>
          </View>
          {day.meals.map((meal) => (
            <View key={meal._id} style={styles.section}>
              <Text>{meal.name}</Text>
              {meal.dinners.length > 0 &&
                meal.dinners.map((dietDinner) => (
                  <View key={dietDinner._id} style={styles.section}>
                    {dietDinner.dinnerPortion.dinner.imageObj && (
                      <Image
                        style={styles.dietItemImage}
                        src={dietDinner.dinnerPortion.dinner.imageObj.imageURL}

                        // src={{
                        //   uri: dietDinner.dinnerPortion.dinner.imageObj
                        //     .imageURL,
                        //   method: "GET",
                        //   headers: { "Cache-Control": "no-cache" },
                        //   body: "",
                        // }}
                      />
                    )}
                    <Text>{dietDinner.dinnerPortion.dinner.name}</Text>
                    <Text>produkty:</Text>
                    {dietDinner.dinnerPortion.dinnerProducts.map(
                      (dinnerProduct) => (
                        <View
                          key={dinnerProduct.dinnerProductId}
                          style={styles.section}
                        >
                          <Text>
                            {dinnerProduct.dinnerProduct.product.name}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                ))}
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
    <div>
      <PDFDownloadLink
        document={<MyDocument diet={dietQuery} />}
        fileName={`${dietQuery.name}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
      <PDFViewer>
        <MyDocument diet={dietQuery} />
      </PDFViewer>
    </div>
  );
};

export default ExportDietModal;
