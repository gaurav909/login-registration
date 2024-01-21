import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WelcomePart from './WelcomePart'

const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const uname = localStorage.getItem('uname')

    console.log(token)
  
useEffect(()=>{
    if (token===null){
       
        navigate('/login')

    }
})
    
  return (
    <div>
       <WelcomePart/>
    </div>
  )
}

export default Home