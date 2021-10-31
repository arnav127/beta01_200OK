import { gql } from "@apollo/client";

const GET_CROPS = gql`
    {
        allCrops {
            value: name
            label: name
        }
    }
`;

const CREATE_PLANTATION = gql`
    mutation ($cropName: String, $plantedDate: Date, $harvestedDate: Date) {
        createCropPlantation(
            cropName: $cropName
            plantedDate: $plantedDate
            harvestedDate: $harvestedDate
        ) {
            cropPlantation {
                id
                crop {
                    name
                    id
                    season
                    photo
                    msrp
                }
            }
        }
    }
`;

const DELETE_PLANTATION = gql`
mutation ($id: ID!) {
  deleteCropPlantation(id: $id) {
    success
  }
}
`;
const PLANTED_CROPS = gql`
    {
        allCropsPlanted {
            id
            crop {
                name
                photo
                season
                msrp
            }
            plantedDate
        }
    }
`;

export { GET_CROPS, CREATE_PLANTATION, DELETE_PLANTATION, PLANTED_CROPS };
