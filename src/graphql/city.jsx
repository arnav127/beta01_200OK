import { gql } from "@apollo/client";

const GET_CITIES = gql`
    {
        allCities {
            value: city
            label: city
        }
    }
`;

export { GET_CITIES };
