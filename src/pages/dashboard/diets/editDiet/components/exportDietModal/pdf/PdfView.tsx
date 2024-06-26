// import React from "react";
// import {
//   PDFDownloadLink,
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   Image,
//   Svg,
//   Font,
// } from "@react-pdf/renderer";
// import { IDietDayData } from "interfaces/diet/dietDays.interfaces";
// import { IDietData } from "interfaces/diet/diet.interfaces";
// import { getDiet, getDietQuery } from "services/getDiets";
// import { useParams } from "react-router";
// import Logo from "assets/logo-icon.png";
// import DinnerNotFoundImg from "assets/dinnerNotFoundPdf.png";
// import { IDietQueryData } from "interfaces/diet/dietQuery.interfaces";

// import format from "date-fns/format";
// import { pl } from "date-fns/locale";

// //fonts
// import RobotoRegular from "assets/fonts/roboto.regular.ttf";
// import RobotoBold from "assets/fonts/roboto.bold.ttf";
// import RobotoLight from "assets/fonts/roboto.light.ttf";
// import RobotoMedium from "assets/fonts/roboto.medium.ttf";
// import RobotoThin from "assets/fonts/roboto.thin.ttf";
// import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";

// Font.register({
//   family: "Roboto",
//   fonts: [
//     {
//       src: RobotoRegular,
//       fontWeight: 500,
//     },
//     {
//       src: RobotoBold,
//       fontWeight: 800,
//     },
//     {
//       src: RobotoLight,
//       fontWeight: 400,
//     },
//     {
//       src: RobotoThin,
//       fontWeight: 300,
//     },
//     {
//       src: RobotoMedium,
//       fontWeight: 600,
//     },
//   ],
//   // src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
// });

// // Create styles
// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//   },
//   page: {
//     flexDirection: "column",
//     backgroundColor: "white",
//     fontFamily: "Roboto",
//     marginBottom: 20,
//     marginTop: 20,
//     color: "#263656",
//   },
//   introPage: {
//     fontFamily: "Roboto",
//     flexDirection: "column",
//     // padding: 20,
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     color: "#263656",
//   },
//   introHeader: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     padding: 10,
//   },
//   introContent: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     padding: 10,
//     flexGrow: 1,
//     fontSize: 50,
//     fontWeight: 600,
//   },
//   introBackground: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     objectFit: "cover",
//     objectPosition: "left",
//     height: "100%",
//     width: "100%",
//     zIndex: -1,
//     opacity: 0.05,
//   },
//   header: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "center",
//     width: "100%",
//     paddingHorizontal: 40,
//     paddingVertical: 10,
//   },
//   logo: {
//     width: 100,
//     height: 40,
//     objectFit: "contain",
//   },
//   dayContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     width: "100%",
//     padding: 15,
//     backgroundColor: "#f6f3fc",
//     paddingHorizontal: 40,
//     paddingVertical: 20,
//   },
//   dayHeader: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "center",
//     width: "100%",
//     fontWeight: 500,
//     // color: "#0000ee",
//   },

//   dayTotal: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     flexDirection: "row",
//     width: "100%",
//     flexWrap: "wrap",
//     paddingTop: 15,
//   },
//   dayTotalItem: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexGrow: 1,
//     border: 1,
//     borderColor: "#ece2ff",
//     borderRadius: 6,
//     color: "#0000ee",
//     fontWeight: 500,
//     fontSize: 12,
//     backgroundColor: "#f6f3fc",
//     marginRight: 6,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   section: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     paddingHorizontal: 40,
//     width: "100%",
//     borderBottom: 1,
//     borderBottomStyle: "dashed",
//     borderBottomColor: "#ece2ff",
//   },

//   mealContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     marginBottom: 20,
//     marginTop: 20,
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     border: 1,
//     borderStyle: "dashed",
//     borderColor: "#ece2ff",
//   },

//   mealHeader: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     width: "100%",
//     flexDirection: "row",
//     fontWeight: 500,
//     fontSize: 16,
//   },

//   mealTotal: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     flexDirection: "row",
//     width: "100%",
//     flexWrap: "wrap",
//     paddingTop: 15,
//   },

//   mealTotalItem: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexGrow: 1,
//     border: 1,
//     borderColor: "#ece2ff",
//     borderRadius: 6,
//     color: "#0000ee",
//     fontWeight: 500,
//     fontSize: 12,
//     backgroundColor: "#f6f3fc",
//     marginRight: 6,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },

//   dinnersContainer: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     flexDirection: "column",
//     marginBottom: 10,
//   },
//   dinnerSection: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     flexDirection: "row",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   dinnerSectionImage: {
//     width: 120,
//     // height: 150,
//     objectFit: "contain",
//   },
//   dinnerSectionContentWrapper: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     flexDirection: "column",
//     marginLeft: 20,
//     fontSize: 16,
//     fontWeight: 500,
//   },
//   productsWrapper: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     flexDirection: "column",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   product: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     flexDirection: "row",
//     width: "100%",
//     fontSize: 13,
//     fontWeight: 400,
//     marginTop: 4,
//     opacity: 0.8,
//   },
//   dietItemImage: {
//     width: 150,
//     height: 100,
//     // borderRadius: 2,
//     objectFit: "cover",
//     objectPosition: "left",
//   },
// });

// const dateFormat = (date: Date) => {
//   const formatDate = format(new Date(date), "eeee / dd.MM.yyyy", {
//     locale: pl,
//   });

//   return formatDate;
// };

// // Create Document Component
// export const PdfView = ({ diet }: { diet: IDietQueryData }) => {
//   return (
//     <Document>
//       <Page size="A4" style={styles.introPage} wrap={true}>
//         <View style={styles.introHeader}>
//           <Image src={Logo} style={styles.logo} />
//         </View>
//         <View style={styles.introContent}>
//           <Text>Jadłospis</Text>
//         </View>
//         <Image src={Logo} style={styles.introBackground} />
//       </Page>
//       {diet.days.map((day) => (
//         <Page key={day._id} size="A4" style={styles.page}>
//           <View style={styles.header}>
//             <Image src={Logo} style={styles.logo} />
//           </View>
//           <View style={styles.dayContainer}>
//             <View style={styles.dayHeader}>
//               <Text>
//                 {day.date ? dateFormat(day.date) : `Dzień ${day.order}`}
//               </Text>
//             </View>
//             <View style={styles.dayTotal}>
//               <View style={styles.dayTotalItem}>
//                 <Text>kcal: {day.total.kcal}</Text>
//               </View>
//               <View style={styles.dayTotalItem}>
//                 <Text>B (g): {day.total.protein.gram}</Text>
//               </View>
//               <View style={styles.dayTotalItem}>
//                 <Text>T (g): {day.total.fat.gram}</Text>
//               </View>
//               <View style={{ ...styles.dayTotalItem, margin: 0 }}>
//                 <Text>W (g): {day.total.carbohydrates.gram}</Text>
//               </View>
//             </View>
//           </View>
//           {day.meals
//             .filter((dayMeal) => dayMeal.dinners.length > 0)
//             .map((meal) => (
//               <View key={meal._id} style={styles.section} wrap={true}>
//                 <View style={styles.mealContainer} break>
//                   <View style={styles.mealHeader} break>
//                     <Text>{meal.name}</Text>
//                     <Text>
//                       {
//                         diet.establishment.meals.find(
//                           ({ _id }) => _id === meal.establishmentMealId
//                         )?.time
//                       }
//                     </Text>
//                   </View>
//                   <View style={styles.mealTotal}>
//                     <View style={styles.mealTotalItem}>
//                       <Text>kcal: {meal.total.kcal}</Text>
//                     </View>
//                     <View style={styles.mealTotalItem}>
//                       <Text>B (g): {meal.total.protein.gram}</Text>
//                     </View>
//                     <View style={styles.mealTotalItem}>
//                       <Text>T (g): {meal.total.fat.gram}</Text>
//                     </View>
//                     <View style={{ ...styles.mealTotalItem, margin: 0 }}>
//                       <Text>W (g): {meal.total.carbohydrates.gram}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 <View style={styles.dinnersContainer} wrap={true}>
//                   {meal.dinners.length > 0 &&
//                     meal.dinners.map((dietDinner) => (
//                       <View
//                         key={dietDinner._id}
//                         style={styles.dinnerSection}
//                         break
//                       >
//                         {dietDinner.dinnerPortion.dinner.imageObj ? (
//                           <Image
//                             style={styles.dinnerSectionImage}
//                             src={
//                               dietDinner.dinnerPortion.dinner.imageObj.imageURL
//                             }
//                           />
//                         ) : (
//                           <Image
//                             style={styles.dinnerSectionImage}
//                             src={DinnerNotFoundImg}
//                           />
//                         )}
//                         <View style={styles.dinnerSectionContentWrapper}>
//                           <Text>{dietDinner.dinnerPortion.dinner.name}</Text>

//                           <View style={styles.productsWrapper}>
//                             {dietDinner.dinnerPortion.dinnerProducts.map(
//                               (dinnerProduct) => (
//                                 <View
//                                   key={dinnerProduct.dinnerProductId}
//                                   style={styles.product}
//                                 >
//                                   <Text>•</Text>
//                                   <Text style={{ marginHorizontal: 4 }}>
//                                     {dinnerProduct.dinnerProduct.product.name} -{" "}
//                                     {dinnerProduct.portion} g
//                                   </Text>
//                                 </View>
//                               )
//                             )}
//                           </View>
//                         </View>
//                       </View>
//                     ))}
//                 </View>
//               </View>
//             ))}
//         </Page>
//       ))}
//     </Document>
//   );
// };

// export default PdfView;

export {};
