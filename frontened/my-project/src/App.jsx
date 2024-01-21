import { BrowserRouter, Route, Routes } from "react-router-dom";
import Testblog from "./components/Testblog";
import Login from "./components/login";
import Registration from "./components/Registration";
import './App.css'
import Home from "./components/Home";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const token = localStorage.getItem('token')
  const [tokendt,setTokendt]=useState({
    token
  })

  

  useEffect (()=>{
    const checkToken = async()=>{
      try {
        const res = await axios.post('http://localhost:5000/api/user/checktoken',tokendt)
        console.log(res)

        if(res.data.toknests===1){
          localStorage.removeItem('token')
          localStorage.removeItem('uname')
        }
        
      } catch (error) {
        console.error(error)
        
      }

    }
    checkToken()
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Registration/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
