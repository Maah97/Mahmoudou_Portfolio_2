import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState('en');
    const toggleLang = (lng) => {
        setLang(lng);
        i18n.changeLanguage(lng);
    }
    return (
        <LangContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LangContext.Provider>
    )
}