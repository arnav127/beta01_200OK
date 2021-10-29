import { gql } from "@apollo/client";

const REGISTER_USER = gql`
    mutation createUser(
        $email: String!
        $username: String!
        $firstName: String!
        $lastName: String!
        $password1: String!
        $password2: String!
        $city: String!
        $state: String!
        $phoneNumber: String!
    ) {
        register(
            email: $email
            username: $username
            firstName: $firstName
            lastName: $lastName
            password1: $password1
            password2: $password2
            city: $city
            state: $state
            phoneNumber: $phoneNumber
        ) {
            success
            errors
            token
            refreshToken
        }
    }
`;

const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            user {
                id
                username
                email
                firstName
                lastName
            }
            token
            refreshToken
            success
            errors
        }
    }
`;

const GET_USER = gql`
    {
        me {
            username
            email
            firstName
            lastName
            cropplantationSet {
                id
                crop
                harvestedDate
                plantedDate
            }
        }
    }
`;

export { REGISTER_USER, LOGIN_USER, GET_USER };
