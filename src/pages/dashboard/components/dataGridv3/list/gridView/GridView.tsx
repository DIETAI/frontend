import React from "react";
import LogoBackground from "assets/logo-icon.svg";
import { useNavigate } from "react-router";

//interfaces
import { IDataGridListProps } from "../DataGridList.interfaces";

//styles
import * as Styled from "./GridView.styles";

const GridView = ({
  gridViewImage,
  data,
  renderKey,
  renderLabel,
  renderImage,
  linkPage,
}: {
  gridViewImage: IDataGridListProps["gridViewImage"];
  data: any[];
  renderKey: IDataGridListProps["renderKey"];
  renderLabel: IDataGridListProps["renderLabel"];
  renderImage: IDataGridListProps["renderImage"];
  linkPage: IDataGridListProps["viewLink"];
}) => {
  const navigate = useNavigate();
  return (
    <Styled.GridContainer>
      {data.length > 0 &&
        data.map((item) => (
          <Styled.GridItem
            key={item[renderKey]}
            onClick={() => {
              navigate(`${linkPage}/${item[renderKey]}`);
            }}
          >
            <Styled.GridItemImageWrapper>
              <img className="backgroundImg" src={LogoBackground} />
              <img
                className="itemImg"
                src={
                  renderImage && item[renderImage]
                    ? item[renderImage]
                    : gridViewImage
                }
              />
            </Styled.GridItemImageWrapper>
            <Styled.GridItemContentWrapper>
              <h3>{item[renderLabel]}</h3>{" "}
            </Styled.GridItemContentWrapper>
          </Styled.GridItem>
        ))}
    </Styled.GridContainer>
  );
};

export default GridView;
