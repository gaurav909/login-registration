import React, { useState } from 'react'
import { BlogButton } from '../CommonElement'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  const [msg,setMsg]=useState(null)
    const styles = {
        border: "2px solid black",
      };

      const [logindt, setLogindt]=useState({
        user_email:'',
        password:'',
        
      })

      const handleInputChange =(e)=>{
        const { name, value } = e.target;

    setLogindt({
      ...logindt,
      [name]: value,
    });


      }

      const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/user/userlogin',logindt)
    
            console.log(res)
            if(res.data.sts===0){

              localStorage.setItem('token',res.data.token)
              localStorage.setItem('uname',res.data.user_name)
              
              // setMsg(res.data.msg)
              navigate('/home')
            }else if(res.data.msg===0){
              setMsg(res.data.msg)
            }else{
              setMsg(res.data.msg)
            }
            
        } catch (error) {
            
            console.error(error)
        }

      }
  return (
   
   <>
    <table align="center">
       
        <tr>
          <td>User Email</td>
          <td>
            <input
              style={styles}
              type="text"
              name="user_email"
              onChange={handleInputChange}
            />
          </td>
        </tr>
       
        <tr>
          <td>Password</td>
          <td>
            <input
              style={styles}
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button onClick={handleSubmit} style={styles}>Login</button>
          </td>
        </tr>
        <tr>
          <td colSpan={2} align='center' style={{color:'red'}}>
            {msg}


          </td>
        </tr>
        <tr>
            <td colSpan={2} align="center">
                If already Registration  <a href='login' style={{color:'blue'}}> Login Here</a>
            </td>
        </tr>
      </table>

   </>
  )
}

export default Login