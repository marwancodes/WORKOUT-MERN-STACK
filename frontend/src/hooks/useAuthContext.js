import { AuthContext } from "../contexts/auth/AuthContext"; 
import { useContext } from "react";

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuthContext must be used inside an AuthProvider");
    }

    return context;
}


export default useAuthContext;