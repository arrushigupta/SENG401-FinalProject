import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import Contacts from '../component/ChatRoom/Contacts';
import Welcome from '../component/ChatRoom/Welcome';
import Chat from '../component/ChatRoom/Chat';
import { io } from 'socket.io-client';
import { allUsersRoute, host } from '../utils/Routes'
import LogOut from '../component/ChatRoom/LogOut';
import Map from "../component/Map/Map"
import NavBar from "../component/NavBar/NavBar"
import { useLocation, /* other hooks */ } from 'react-router-dom';

function ChatPage(props) {
  const socket = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [selectedLocation, setSelectedLocation] = useState(null);


  useEffect(() => {
    async function fetchData() {
      let userData = await JSON.parse(localStorage.getItem("chat-app-user"))
      if (!userData) {
        navigate("/");
      }
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user"))); //user info, id, username, email
        // console.log(await JSON.parse(localStorage.getItem("chat-app-user")))
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          // console.log("User data", currentUser)
          // console.log("Contact data for all users", data)

          setContacts(data.data);
        } else {
          navigate('/setAvatar');
        }
      }
    }
    fetchData();
    
  }, [currentUser]);


  useEffect(() => {
    if (contacts === [])
      return
    if (location && location.state && location.state.currentSelected !== undefined) {
      setCurrentChat(contacts[location.state.currentSelected])
      handleChatChange(contacts[location.state.currentSelected])
    }
  }, [location, contacts]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
    console.log("current chat changed", chat)
  }

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])

  return (
    <div>
      <NavBar />
      <Container>
        <div className='container'>
          <Contacts currentChat={currentChat} contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />


          {currentChat === undefined ? <Welcome currentUser={currentUser} /> :
            <Chat currentChat={currentChat} setCurrentChat={setCurrentChat} currentUser={currentUser} socket={socket} />}
          {/* <div>
          <Map setSelectedLocation={setSelectedLocation} />
        </div> */}
        </div>

      </Container>
    </div>
  )
}


const Container = styled.div`
margin-top: 5px;  
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #9CA3AF;
  .container {
    border-radius: 0.4rem;
    height: 75vh;
    width: 85vw;
    background-color: #2a2d35;
    display: grid;
    grid-template-columns: 30% 70%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default ChatPage