// import { AuthContext } from "./services/context/AuthContext";
// import { useContext, useState } from "react";
// import axios from "axios";

// export function Home() {
//   const { user, loggedIn, handleLogin,token,logout } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async() => {
//     console.log(username, password);
//     let response = await axios.post("http://localhost:8000/api/login/", {
//       username,
//       password
//   });
//   if(response.status === 200){
//     // let token = response.data.token;
//     localStorage.setItem("token", token);
//     handleLogin(username,password);
//     alert("login successfull");
//   }
//   else{
//     alert("login failed");

//   }
// }

//   const handleLogout = () => {
//     setUser(null);
//     setLoggedIn(false);
//   }

//   return (
//     <>
//       <h1>Home page</h1>
//       <h2>User Token: {user}</h2>
//       <h2>Logged In: {loggedIn.toString()}</h2>
//       <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
//       <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={login}>Login</button>
//       <button onClick={handleLogout}>Logout</button>

//       {
//         loggedIn && 
//         <>
//         <h1>Welcome, {user}!</h1>
//         <button onClick={logout}>Logout</button>  
//         </>
//         }
// </>);
// }

import { useContext } from "react";
import { AuthContext } from "./services/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";

export function Home(){
    const {user, loggedIn, handleLogin, logout } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async() => {
        console.log(username, password);
        let response = await axios.get("http://localhost:8000/api/token/", {
            username,
            password
        });
        if(response.status === 200){
            let token = response.data.token;
            handleLogin(username, token);
            alert("Login successful");
        }else{
            alert("Login failed");
        }
    };

    const  handleLogout = () => {
        logout();
        alert("Logged out");
    }
    return <>
        <h1>Home Page</h1>
        <h1>{user}</h1>
        <h1>{loggedIn}</h1>


        <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
        <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>


        <button onClick={login}>Login</button>
        <button onClick={handleLogout}>Logout</button>


        { loggedIn && 
            <>
                <h2>Welcome, {user}</h2>
                <Products></Products>
            </>
        }
    </>
}

function Products() {
    const [products, setProducts] = useState([]);
    const { token,user } = useContext(AuthContext);
    const getProducts = async() => {
        console.log("Token:", token);
        
        let response = await axios.get("http://localhost:8000/api/products/",{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        if(response.status === 200){
            setProducts(response.data);
        }
        else{
            alert("Failed to fetch products");
            console.log(response);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    
    return <>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            </>
}