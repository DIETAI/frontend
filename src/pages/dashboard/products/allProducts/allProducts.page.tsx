import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getProducts } from "services/getProducts";
import { productNavLinks } from "../utils/navLinks";
import NoProductImage from "assets/noImage.svg";

//components
import PageNav from "components/pageNav/PageNav";

import {
  DataGridContainer,
  DataGridNav,
  DataGridList,
  DataGridPagination,
} from "../../components/dataGridv3";

//interfaces
import { IColumn } from "pages/dashboard/components/dataGridv2/DataGrid.interfaces";

const columns: IColumn[] = [
  { label: "zdjęcie", key: "imageURL", type: "image" },
  { label: "nazwa", key: "name", type: "text" },
  { label: "kcal", key: "kcal", type: "number" },
  { label: "białka (g)", key: "proteinGram", type: "number" },
  { label: "tłuszcze (g)", key: "fatGram", type: "number" },
  { label: "węglowodany (g)", key: "carbohydratesGram", type: "number" },
  { label: "błonnik (g)", key: "fiberGram", type: "number" },
  {
    label: "węglowodany przyswajalne (g)",
    key: "digestableCarbohydratesGram",
    type: "number",
  },
];

const AllProducts = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); //5 | 10 /15 /20
  const [pageCount, setPageCount] = useState(0);
  const { products, productsError, productsLoading, pagination } = getProducts(
    page.toString(),
    itemsPerPage
  );

  useEffect(() => {
    if (pagination) {
      setPageCount(pagination.pageCount);
    }
  }, [pagination]);

  const productsData = products?.map((data) => ({
    _id: data._id,
    imageURL: data.image?.imageURL,
    name: data.name,
    kcal: data.kcal,
    proteinGram: data.protein.gram,
    fatGram: data.fat.gram,
    carbohydratesGram: data.carbohydrates.gram,
    fiberGram: data.fiber.gram,
    digestableCarbohydratesGram: data.digestableCarbohydrates.gram,
  }));

  const deleteProducts = () => {
    return;
  };
  const deleteProduct = () => {
    console.log("delete product");
  };

  return (
    <>
      <PageNav headingTitle={"Produkty"} pageNavLinks={productNavLinks} />
      <DataGridContainer>
        <DataGridNav
          addLink="/dashboard/products/new"
          exportAction={() => console.log("open export popup")}
        />
        <DataGridList
          data={productsData}
          loadingData={productsLoading}
          errorData={productsError}
          columns={columns}
          viewLink="/dashboard/products"
          editLink="/dashboard/products/edit"
          deleteAction={deleteProduct}
          gridViewImage={NoProductImage}
          renderKey="_id"
          renderLabel="name"
          renderImage="imageURL"
        />
        <DataGridPagination
          currentPage={page}
          pageCount={pageCount}
          changePage={setPage}
          itemsPerPage={itemsPerPage}
          changeItemsPerPage={setItemsPerPage}
        />
      </DataGridContainer>
    </>
  );
};

export default AllProducts;
