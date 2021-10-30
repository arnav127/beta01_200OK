import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Select from "react-select";

import { AuthContext } from "../../context/auth";
import { useMutation, useQuery } from "@apollo/client";

import Sidebar from "../../components/Navigation/Sidebar";
import DashBar from "../../components/Navigation/DashBar";

import { GET_CROPS, CREATE_PLANTATION } from '../../graphql/crop'

import CropList from "./CropList";
import SoilHealth from "./SoilHealth";
import Weather from "./Weather";
import Map from "./Map";

const Dashboard = () => {
    const currentDate = new Date();
    const date = `${currentDate.toDateString()}`;

    const { user } = useContext(AuthContext);

    const { data: allCropData } = useQuery(GET_CROPS);
    const [createPlantation] = useMutation(CREATE_PLANTATION);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const { data, error } = await createPlantation({
            variables: {
                cropName: formData.get("cropName"),
                plantedDate: formData.get("plantedDate"),
            },
        });

        console.log(data)
    };

    return (
        <main className="flex flex-no-wrap">
            <Sidebar />

            <div className="container mx-auto pb-10 h-64 md:w-4/5 w-11/12 px-6">
                <DashBar />
                <Switch>
                    <Route exact path="/dashboard">
                        <div className="flex flex-col md:flex-row">
                            <div
                                className="flex flex-shrink-0 items-end rounded-lg h-56 p-8 md:w-2/3 bg-repeat bg-center text-white"
                                style={{
                                    backgroundColor: "#166534",
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%234ade80' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E")`,
                                }}
                            >
                                <div>
                                    <h2 className="text-bold text-3xl">
                                        Welcome back, {user?.firstName}
                                    </h2>
                                    <p className="text-semibold mt-1">{date}</p>
                                </div>
                            </div>
                            <div className="bg-teal-50 w-full rounded-xl mt-4 md:mt-0 md:ml-4 p-4">

                                <h4 className="uppercase leading-tight font-semibold  text-teal-800 flex items-center">
                                    <svg
                                        className="w-6 h-6 inline-block mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Add crop</h4>

                                <form className="my-4" onSubmit={handleSubmit}>
                                    <Select
                                        placeholder="Crop"
                                        options={allCropData?.allCrops}
                                        inputId="cropName"
                                        name="cropName"
                                        className="my-2"
                                    />
                                    <input
                                        type="date"
                                        id="plantedDate"
                                        name="plantedDate"
                                        className="rounded-lg border-transparent flex-1 appearance-none border border-cyan-300 w-full mb-2 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                                        placeholder="Date"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 focus:ring-offset-teal-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    >
                                        Add
                                    </button>
                                </form>
                            </div>

                        </div>

                        <h4 className="text-2xl font-semibold p-2 mt-4">
                            Your crops
                        </h4>
                        <hr />
                        <CropList />
                    </Route>
                    <Route path="/dashboard/soil">
                        <SoilHealth />
                    </Route>
                    <Route path="/dashboard/map">
                        <Map />
                    </Route>
                    <Route path="/dashboard/weather">
                        <Weather />
                    </Route>
                </Switch>
            </div>
        </main>
    );
};

export default Dashboard;
