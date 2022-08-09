import React, { useState, useEffect } from "react";

//styles
import * as Styled from "./ProductSelect.styles";

//components
import ProductSelectPopup from "./productSelectPopup/ProductSelectPopup";

const ProductSelect = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Styled.SelectWrapper>
      <input
        placeholder="Szukaj produktu"
        onFocus={() => setOpenPopup(true)}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
      <ProductSelectPopup
        openPopup={openPopup}
        closePopup={() => setOpenPopup(false)}
        searchValue={searchValue}
      />
    </Styled.SelectWrapper>
  );
};

export default ProductSelect;
