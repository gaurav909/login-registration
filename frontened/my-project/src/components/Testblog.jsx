import React from 'react'
import './Testblog.css'
import styled from 'styled-components'
import { BlogButton, BlogPara } from '../CommonElement';




const Testblog = () => {
    const StyledBtn = styled.button`
color:white;
background-color:red;
border:2px double black;
font-size:34px;
border-radius:5px
`;

   
    const pStyle = {
        color:'blue',
        fontSize:'28px'
    }
  return (
    <>
    <p style={pStyle}> Hello</p>


    <p style={{color:'red'}}>Lorem ipsum </p>

    <p className='myParagraph'>External Css</p>

    <StyledBtn>Login</StyledBtn>
    <StyledBtn>Registrations</StyledBtn>

    <BlogButton>Text Button</BlogButton>
    
    <BlogPara>lorem ipsum</BlogPara>
    
    </>
  )
}

export default Testblog