import React, { useContext } from 'react'
import { useQuery } from "@apollo/client"

import { GET_WEATHER } from "../../../graphql/weather"
import { AuthContext } from "../../../context/auth"

const Weather = (props) => {
  // const { user } = useContext(AuthContext)
  // const { data: wData } = useQuery(GET_WEATHER, {
  //   variables: {
  //     city: user?.city
  //   }
  // })

  // const weatherData = JSON.parse(wData?.getWeather)

  return (
    <div>
      {/* {JSON.parse(wData?.getWeather)} */}
    </div>
  )
}

export default Weather
