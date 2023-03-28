import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { getUnreadMessagesCountRoute } from "../../utils/Routes";
// import Logo  from "../../assets/logo.svg"
import Logo from "../../img/dinosM.png"
import axios from 'axios';
import NotificationIcon from "./NotificationIcon"


function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentContact, setcurrentContact] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
      // console.log(currentUser.username)
      // console.log(currentUser.avatarImage)


    }
  }, [currentUser]);

  const updateFieldInArray = (id, newValue, index) => {


    setcurrentContact((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, unreadCount: newValue } : item
      )
    )
  };

  useEffect(() => {
    if (currentContact) {

      // console.log("current chat data updated ", currentContact)


    }
  }, [currentContact]);

  useEffect(() => {
    if (contacts === undefined || contacts === [])
      return
    setcurrentContact(contacts)

    async function fetchData(data, index) {
      const response = await axios.post(getUnreadMessagesCountRoute, {
        from: data._id,
        to: currentUser._id
      })
      // console.log(data, currentUser._id , response.data.unreadCount)
      updateFieldInArray(data._id, response.data.unreadCount.toString(), index);

      return (response.data.unreadCount).toString()
    }



    contacts.forEach((element, index) => {
      const unreadCount = fetchData(element, index)
    });
    // fetchData();

  }, [contacts]);



  useEffect(() => {
    if (currentSelected) {
      // console.log("Changed current selected user")

    }
  }, [currentSelected]);

  useEffect(() => {
    if (contacts) {
      // console.log("received contacts", contacts)

    }
  }, [contacts]);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {
        currentUserName && currentUserImage && (

          <Container>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>Dinos Marketplace</h3>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`relative contact ${index === currentSelected ? "selected" : ""
                      }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    {currentContact && currentContact[index] && currentContact[index].unreadCount &&
                        <NotificationIcon className="absolute top-1 left-1" currentContact={currentContact} index={index}> </NotificationIcon>}
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="username display:flex align-items:left">
                      <h3 className="username-name margin-right:250px">{contact.username}</h3>
                      
                    </div>
                    
                  </div>
                );
              })}
            </div>
            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </Container>
        )
      }
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #2a2d35;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: white;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
    .selected {
      background-color: #B91C1C;
    }
  }
  .current-user {
    background-color: #DC2626;
    border-radius: 0.2rem;
    width: 90%;
    margin-left: 1rem;
    margin-bottom: 1rem;
    padding: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts