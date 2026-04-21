import axios from "axios";
import { use, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(null);
    
    const getUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data', {withCredentials: true})
            data.success ? setUserData(data.userData) : toast.error(data.message)
            console.log(data.userData);
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);
    
    const value = {navigate, backendUrl, setIsLoggedin, getUserData, userData, setUserData}
    return (
        <AppContext.Provider value = {value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
} 