import React from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/auth"

export default function Navigation() {
    const { user } = React.useContext(AuthContext)

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="flex flex-wrap items-center justify-between px-2 py-3 bg-white bg-opacity-30 mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            to="/"
                        >
                            Farmer's Helpdesk
                        </Link>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            {user ? (
                                <li className="nav-item">
                                    <Link
                                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                        to="/dashboard"
                                    >
                                        <span className="ml-2">Dashboard</span>
                                    </Link>
                                </li>
                            ) :
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link
                                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                                to="/login"
                                            >
                                                <span className="ml-2">Login</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                                to="/register"
                                            >
                                                <span className="ml-2">Register</span>
                                            </Link>
                                        </li>
                                    </>
                                )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
