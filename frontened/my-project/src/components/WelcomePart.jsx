import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomePart = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const uname = localStorage.getItem('uname')
   
  const [tokendt,setTokendt]=useState({
    token
  })


    const logout = async(e)=>{

        const res = await axios.post('http://localhost:5000/api/user/logout',tokendt)
        if(res.data.logout_sts === 0){
            localStorage.removeItem('token')
            localStorage.removeItem('uname')
            navigate('/login')

        }else{
            console.log("Logout failed  due to server issues")

        }
    }

  return (
    <>
     <p>
            Welcome : {uname} | <a href='#' onClick={logout} style={{color:'blue'}}>Logout</a>
        </p>
    </>
  )
}

export default WelcomePart