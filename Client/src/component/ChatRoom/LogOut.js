import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BiPowerOff } from "react-icons/bi";
import { BiHomeAlt } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";



function LogOut({setCurrentChat}) {
  const navigate = useNavigate();

  const handleClickLogOut = async () => {
    localStorage.clear();
    navigate('/');
  }

  const handleClickDashboard = async () => {
    navigate('/home');
  }

  const handleCloseChat = async () => {
    setCurrentChat(undefined)
  }

  return (
    <div>
      <Button onClick={handleCloseChat} >
        <IoMdClose />
      </Button>
      <Button onClick={handleClickLogOut} >
        <BiPowerOff />
      </Button>
      <Button onClick={handleClickDashboard} >
        <BiHomeAlt />
      </Button>
    </div>
  )
}
const Button = styled.button`

  display: inline;
  margin: 0.3rem;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #DC2626;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }`;


export default LogOut