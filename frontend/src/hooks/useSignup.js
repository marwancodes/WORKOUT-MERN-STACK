import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "axios";

const useSignup = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/signup`, {
                email,
                password
            });

            // Save the user in local storage if request is successful
            localStorage.setItem('user', JSON.stringify(response.data));

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: response.data });

        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }finally{
            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}

export default useSignup;