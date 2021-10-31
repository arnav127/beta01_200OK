import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Select from "react-select";

import { AuthContext } from "../../../context/auth";
import { useQuery } from "@apollo/client";

import { GET_WEATHER } from "../../../graphql/weather";

import DashBar from "../../../components/Navigation/DashBar";
import Sidebar from "../../../components/Navigation/Sidebar";

import SoilHealth from "../SoilHealth";
import Map from "../Map";

const Weather = () => {
    const currentDate = new Date();
    const date = `${currentDate.toDateString()}`;
    const [wData, setWData] = useState();
    const { user } = useContext(AuthContext);

    const { data: weatherData } = useQuery(GET_WEATHER, {
        variables: {
            city: "Bhopal",
        },
    });

    useEffect(() => {
        if (weatherData?.getWeather !== undefined) {
            console.log(JSON.parse(weatherData?.getWeather));
            setWData(JSON.parse(weatherData?.getWeather));
        }
    }, [weatherData]);

    return (
        <main className="flex flex-no-wrap">
            <h1>Weather</h1>
            {wData ? (
                <>
                    <h2>Location: {wData?.location?.name}</h2> <br />
                    <h2>Temperature: {wData?.current?.temp_c}</h2> <br />
                    <h2>Feels Like: {wData?.current?.feelslike_c}</h2> <br />
                    <h2>Gusts: {wData?.current?.gust_kph}</h2> <br />
                    <h2>Humidity: {wData?.current?.humidity}</h2> <br />
                    <h2>Pressure: {wData?.current?.pressure_mb}</h2> <br />
                    <h2>Wind: {wData?.current?.wind_kph}</h2> <br />
                    <h2>Humidity: {wData?.current?.humidity}</h2> <br />
                    <h2>Conditions: {wData?.current?.condition?.text}</h2>{" "}
                    <br />
                    <img src={wData?.current?.condition?.icon}></img>
                </>
            ) : (
                ""
            )}
        </main>
    );
};

export default Weather;
