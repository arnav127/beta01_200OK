import React, { useReducer, createContext } from "react";

const initialState = {
    user: null,
};

const AuthContext = createContext({
    user: null,
    loadUser: (userData) => {},
    login: (userToken) => {},
    logout: () => {},
});

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        case "LOAD_USER":
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem("token", userData.token);
        dispatch({
            type: "LOGIN",
            payload: userData.user,
        });
    }

    function loadUser(userData) {
        dispatch({
            type: "LOAD_USER",
            payload: userData,
        });
    }

    function logout() {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, loadUser, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider };
