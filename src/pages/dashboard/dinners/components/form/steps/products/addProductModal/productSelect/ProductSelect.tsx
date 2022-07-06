import React, { useState } from "react";

//styles
import * as Styled from "./ProductSelect.styles";

//components
import ProductSelectPopup from "./productSelectPopup/ProductSelectPopup";

const ProductSelect = () => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <Styled.SelectWrapper onClick={() => setOpenPopup(true)}>
      <input placeholder="Szukaj produktu"></input>
      <ProductSelectPopup
        openPopup={openPopup}
        closePopup={() => setOpenPopup(false)}
      />
    </Styled.SelectWrapper>
  );
};

export default ProductSelect;
