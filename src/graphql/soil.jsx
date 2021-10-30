import { gql } from "@apollo/client";

const CREATE_SOIL = gql`
    mutation checkSoil(
        $humidity: Decimal
        $nitrogen: Decimal
        $ph: Decimal
        $phosphorous: Decimal
        $potas: Decimal
        $rainfall: Decimal
        $temp: Decimal
    ) {
        createSoilHealth(
            nitrogen: $nitrogen
            phosphorous: $phosphorous
            potas: $potas
            humidity: $humidity
            ph: $ph
            rainfall: $rainfall
            temp: $temp
        ) {
            soilHealth {
                id
            }
        }
    }
`;

const SOIL_SUBSCRIPTION = gql`
    subscription ($username: String) {
        soilRec(username: $username) {
            recommendations
        }
    }
`;

export { CREATE_SOIL, SOIL_SUBSCRIPTION };
