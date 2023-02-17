import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import Contacts from './Contacts';
import Chat from './Chat';
import Welcome from './Welcome';
import { io } from 'socket.io-client';
import { DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import {allUsersRoute, host} from '../../utils/Routes'


function ChatRoom() {
    const socket = useRef();
    const navigate = useNavigate();
    const { setLoading } = useContext(LoadingContext);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    useEffect(() => {
        async function fetchData() {
            if (!localStorage.getItem("userId")) {
                navigate("/");
            }
            else {
                setCurrentUser(await JSON.parse(localStorage.getItem("userId")));
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            if (currentUser) {
                DINOSPost('http://localhost:4000/api/getMessage', setLoading, { id: currentUser._id }).then(
                    (response) => {
                        console.log(response);
                        setContacts(response.data);
                    }
                )
            } else {
                navigate('/');

            }
        }
        fetchData();
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

    return (<>
        <Container>
            <div className='container'>
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {/* {currentChat === undefined ? <Welcome currentUser={currentUser} /> : */}
                {/* <Chat currentChat={currentChat} currentUser={currentUser} socket={socket} />} */}
            </div>
        </Container>
    </>
    )
}


const Container = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default ChatRoom
