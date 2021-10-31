import React from "react";
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../../context/auth";
import i18n from '../../../translations/i18n';

import { useTranslation } from "react-i18next";

export default function Navigation() {
    const {t} = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    const [lang, setLang] = React.useState("en")

    const history = useHistory();
    const { logout } = React.useContext(AuthContext);

    return (
        <>
            <nav className="flex flex-wrap items-center justify-between px-2 mt-2 py-3 mb-3">
                <div className="container px-4 mx-auto flex items-center justify-between">
                    <div className="w-full flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                            to="/"
                        >
                            {t("Farmer's Helpdesk")}
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-gray-300 mr-2 rounded-full flex items-center justify-center h-8 w-8 text-sm inline-block font-bold " onClick={() => {
                            if (lang === "en") { setLang("hi"); i18n.changeLanguage(lang); } else { setLang("en"); i18n.changeLanguage(lang); };
                        }}>{lang == "en" ? "हि" : "En"}</button>
                        <button
                            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                            onClick={() => {
                                logout();
                                history.replace("/");
                            }}
                        >
                            <span className="mr-2 hidden sm:inline-block font-bold leading-relaxed">
                                {t("Logout")}
                            </span>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
