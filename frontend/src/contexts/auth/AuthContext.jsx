import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
}

export const AuthProvider = ({children}) => {

    const initialState = { user: null };
    const [ state, dispatch ] = useReducer(AuthReducer, initialState);
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // if we have user in local storage that means user has an object, if it not we get null
        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, []);

    console.log('AuthContext state: ', state);

    return(
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}