import { gql } from '@apollo/client'

const GET_MSRP = gql`query ($city: String){
  getMsrp (city: $city)
}`

export { GET_MSRP }
