import { gql } from '@apollo/client'

const GET_WEATHER = gql`
query ($city: String) {
  getWeather(city: $city)
}
`

export { GET_WEATHER }
