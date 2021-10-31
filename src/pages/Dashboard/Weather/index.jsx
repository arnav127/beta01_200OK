import React, { useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Select from "react-select";

import { AuthContext } from "../../../context/auth";
import { useQuery } from "@apollo/client";

import {GET_WEATHER} from "../../../graphql/weather"


import DashBar from "../../../components/Navigation/DashBar";
import Sidebar from "../../../components/Navigation/Sidebar";

import SoilHealth from "../SoilHealth";
import Map from "../Map";


const Weather = () => {
  const currentDate = new Date();
  const date = `${currentDate.toDateString()}`;

  const { user } = useContext(AuthContext);

  const {data:weatherData} = useQuery(GET_WEATHER, {
    variables: {
      city: "Bhopal",
    }
  })




  return (
<main className="flex flex-no-wrap">
<h1>Weather</h1>
{JSON.stringify(weatherData,  null, 2)}
  </main>
)
}

export default Weather
