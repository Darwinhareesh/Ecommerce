import { createContext, use } from "react";
import { useState } from "react";

export const AuthContext = createContext(null);


export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loggedIn,setLoggedIn] = useState(false);
    const [token,setToken] = useState(null);

    function handleLogin(user,token) {
        setUser(user);
        setToken(token);
        setLoggedIn(true);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    }

    function getLoggedInUser() {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        return{
            token:token,
            User:user?JSON.parse(user):null
        } 
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    return <AuthContext.Provider value={{ user,loggedIn,handleLogin,token ,logout}}>
        {children}
    </AuthContext.Provider>;
}

