import React, { useEffect, useRef, useState, useContext } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';
import { DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";



export default function Chat({ currentChat, currentUser, socket }) {

    const { setLoading } = useContext(LoadingContext);

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState([]);
    const scrollRef = useRef();
    useEffect(() => {
        async function fetchData() {
            DINOSPost('http://localhost:4000/api/getMessage', setLoading, {
                from: currentUser._id,
                to: currentChat._id
            })
                .then((response) => { setMessages(response.data); })
        }
        fetchData();
    }, [currentChat]);

    const handleSendMsg = async (msg) => {


        const data = DINOSPost('http://localhost:4000/api/addmsg', setLoading, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        })


        socket.current.emit("send-msg", {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);


    }
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);

    }, [arrivalMessage]);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <Container><div className='chat-header'>
            <div className='user-details'>
                <div className='avatar'>
                    <img
                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                        alt="avatar"
                    />
                </div>
                <div className='username'>
                    <h3>{currentChat.username}</h3>

                </div>

            </div>
        </div>
            <div className='chat-messages' >

                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                <div className='content'>
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>)
                })}


            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
  
`;