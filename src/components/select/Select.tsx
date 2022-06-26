import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "icons/icons";

import { ISelectProps } from "./Select.interfaces";

import * as Styled from "./Select.styles";

import { useTranslation, Trans } from "react-i18next";

import PolishFlag from "assets/poland.png";
import EnglishFlag from "assets/english.png";
import { AnimatePresence } from "framer-motion";

const Select = ({ options }: ISelectProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState({
    current: i18n.language,
    flagImg: i18n.language === "en" ? EnglishFlag : PolishFlag,
    title: i18n.language === "en" ? "English" : "Polski",
  });

  const [selectPopup, setSelectPopup] = useState(false);

  const changeCurrentLanguage = (
    slug: string,
    image: string,
    title: string
  ) => {
    setLanguage({
      current: slug,
      flagImg: image,
      title,
    });

    i18n.changeLanguage(slug);
    setSelectPopup(false);
  };

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

  return (
    <Styled.SelectWrapper ref={modalRef}>
      <Styled.SelectContent
        onClick={() => setSelectPopup(!selectPopup)}
        popupOpen={selectPopup}
      >
        <img src={language.flagImg} />
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
            {options.map(({ id, image, title, slug }) => (
              <Styled.SelectPopupItem
                key={id}
                onClick={() => changeCurrentLanguage(slug, image, title)}
              >
                {image && <img src={image} />}
                {title}
              </Styled.SelectPopupItem>
            ))}
          </Styled.SelectPopupWrapper>
        )}
      </AnimatePresence>
    </Styled.SelectWrapper>
  );
};

export default Select;
