import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "icons/icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import { ISelectProps } from "./Select.interfaces";

import * as Styled from "./Select.styles";

import { useTranslation, Trans } from "react-i18next";

import PolishFlag from "assets/poland.png";
import EnglishFlag from "assets/english.png";
import { AnimatePresence } from "framer-motion";
import { IPageNavLink } from "../PageNav";

const Select = ({
  // options,
  // handleSelect,
  // optionLabel,
  // optionRender,
  // selectedOption,
  pageNavLinks,
}: {
  pageNavLinks: IPageNavLink[];
}) => {
  const location = useLocation();
  const modalRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  const [selectPopup, setSelectPopup] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        setSelectPopup(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const activePath = () => {
    const activeLink = pageNavLinks.find(
      (navLink) => navLink.path === location.pathname
    );

    if (!activeLink) return;

    return activeLink.title;
  };

  return (
    <Styled.SelectWrapper ref={modalRef}>
      <Styled.SelectContent
        onClick={() => setSelectPopup(!selectPopup)}
        popupOpen={selectPopup}
      >
        {/* <img src={language.flagImg} /> */}
        {activePath()}
        <span>
          <FaChevronDown />
        </span>
      </Styled.SelectContent>

      <AnimatePresence>
        {selectPopup && (
          <Styled.SelectPopupWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {pageNavLinks.map((navLink) => (
              <Styled.SelectPopupItemLink
                key={navLink.id}
                to={navLink.path}
                currentPath={location.pathname === navLink.path}
              >
                {navLink.title}
              </Styled.SelectPopupItemLink>
            ))}
          </Styled.SelectPopupWrapper>
        )}
      </AnimatePresence>
    </Styled.SelectWrapper>
  );
};

export default Select;
