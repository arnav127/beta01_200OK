import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/user";

import Spinner from "../../components/Spinner";

export default function Register() {
    const history = useHistory();
    const [errMsg, setErrMsg] = useState("");
    const [loadAnimation, setLoadAnimation] = useState(false);

    const [registerUser] = useMutation(REGISTER_USER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadAnimation(true);
        const formData = new FormData(e.currentTarget);

        const { data, error } = await registerUser({
            variables: {
                email: formData.get("email"),
                username: formData.get("username"),
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                password1: formData.get("password"),
                password2: formData.get("password"),
            },
        });
        setLoadAnimation(false);

        if (error) {
            setErrMsg(error.message);
        } else {
            if (data.register.success) {
                history.push("/login");
            } else {
                setErrMsg(JSON.stringify(data.register.errors));
            }
        }
    };

    return (
        <div
            className="w-full h-screen bg-repeat"
            style={{
                backgroundColor: "#ecfccb",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='88' viewBox='0 0 80 88' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 21.91V26h-2c-9.94 0-18 8.06-18 18 0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73 3.212-6.99 9.983-12.008 18-12.73V62h2c9.94 0 18-8.06 18-18 0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73-3.212 6.99-9.983 12.008-18 12.73zM54 58v4.696c-5.574 1.316-10.455 4.428-14 8.69-3.545-4.262-8.426-7.374-14-8.69V58h-5.993C12.27 58 6 51.734 6 44c0-7.732 6.275-14 14.007-14H26v-4.696c5.574-1.316 10.455-4.428 14-8.69 3.545 4.262 8.426 7.374 14 8.69V30h5.993C67.73 30 74 36.266 74 44c0 7.732-6.275 14-14.007 14H54zM42 88c0-9.94 8.06-18 18-18h2v-4.09c8.016-.722 14.787-5.738 18-12.73v7.434c-3.545 4.262-8.426 7.374-14 8.69V74h-5.993C52.275 74 46 80.268 46 88h-4zm-4 0c0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73v7.434c3.545 4.262 8.426 7.374 14 8.69V74h5.993C27.73 74 34 80.266 34 88h4zm4-88c0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73v-7.434c-3.545-4.262-8.426-7.374-14-8.69V14h-5.993C52.27 14 46 7.734 46 0h-4zM0 34.82c3.213-6.992 9.984-12.008 18-12.73V18h2c9.94 0 18-8.06 18-18h-4c0 7.732-6.275 14-14.007 14H14v4.696c-5.574 1.316-10.455 4.428-14 8.69v7.433z' fill='%233f6212' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
        >
            <div className="container flex items-center justify-center flex-1 h-full mx-auto">
                <div className="w-full max-w-lg">
                    <div className="leading-loose max-w-sm p-10 m-auto bg-white bg-opacity-50 rounded shadow-xl">
                        {loadAnimation ? (
                            <div className="flex justify-center items-center">
                                <Spinner />
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <p className="flex mb-8 text-2xl font-bold justify-center items-center text-teal-600">
                                    <svg
                                        className="w-12 h-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                        />
                                    </svg>
                                    Register
                                </p>
                                <div className="mb-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="rounded-lg border-transparent flex-1 appearance-none border border-teal-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                            placeholder="First name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="rounded-lg border-transparent flex-1 appearance-none border border-teal-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                            placeholder="Last name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="relative">
                                        <input
                                            type="username"
                                            id="username"
                                            name="username"
                                            className="rounded-lg border-transparent flex-1 appearance-none border border-teal-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                            placeholder="Username"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="rounded-lg border-transparent flex-1 appearance-none border border-teal-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="relative">
                                        <input
                                            type="select"
                                            id="city"
                                            name="city"
                                            className="rounded-lg border-transparent flex-1 appearance-none border border-teal-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="rounded-lg border-transparent flex-1 appearance-none border border-teal-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                            placeholder="Password"
                                            required
                                            minlength="8"
                                        />
                                    </div>
                                </div>
                                {errMsg && (
                                    <p className="text-red-400 text-sm">
                                        {errMsg}
                                    </p>
                                )}
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 focus:ring-offset-teal-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    >
                                        Register
                                    </button>
                                </div>
                                <div className="text-sm font-light text-center mt-2">
                                    Already have an account?{" "}
                                    <Link to="/register">Login</Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
