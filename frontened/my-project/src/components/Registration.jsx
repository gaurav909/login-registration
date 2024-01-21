import axios from "axios";
import React, { useState } from "react";

const Registration = () => {
  const styles = {
    border: "2px solid black",
  };

  const [userdt, setUserdt] = useState({
    user_name: "",
    user_email: "",
    user_dob: "",
    gender: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserdt({
      ...userdt,
      [name]: value,
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
        const res = await axios.post('http://localhost:5000/api/user/adduser',userdt)

        console.log(res)
        
    } catch (error) {
        
        console.error(error)
    }
  }
  return (
    <div>
      <table align="center">
        <tr>
          <td>Username</td>
          <td>
            <input
              style={styles}
              type="text"
              name="user_name"
              onChange={handleInputChange}
            />
          </td>
        </tr>
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
          <td>Dob</td>
          <td>
            <input
              style={styles}
              type="text"
              name="user_dob"
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>
            <select style={styles} name="gender" onChange={handleInputChange}>
              <option value={""}>-Select-</option>
              <option value={"male"}>male</option>
              <option value={"female"}>female</option>
            </select>
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
            <button onClick={handleSubmit} style={styles}>Registration</button>
          </td>
        </tr>
        <tr>
            <td colSpan={2} align="center">
                If already Registration  <a href='login' style={{color:'bl'}}> Login Here</a>
            </td>
        </tr>
      </table>
    </div>
  );
};

export default Registration;
