import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../assets/robot.gif";
import LogOut from './LogOut';

export default function Welcome() {
  const [userName, setUserName]=useState("")
  useEffect(() => {
    async function fetchData() {
      setUserName(
        await JSON.parse(
          localStorage.getItem("chat-app-user")
        ).username
      );
      console.log(await JSON.parse(
        localStorage.getItem("chat-app-user")
      ).username)
    }
    fetchData();
  }, []);

  return (
    <Container>
      <div className='chat-header'>
        {/* <LogOut /> */}
      </div>

      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}
// display: flex;
// justify-content: center;
// align-items: center;
// color: white;
// flex-direction: column;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  chat-header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 0 2rem;
    align-items: flex-end,
    flex-direction : row,

  }
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;