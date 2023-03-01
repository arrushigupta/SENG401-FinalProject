import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
// import Logo  from "../../assets/logo.svg"
import Logo from "../../img/dinosM.png"
function DashboardContacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [drawerOpen, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
      console.log(currentUser.username)
      console.log(currentUser.avatarImage)
    }
  }, [currentUser]);

  useEffect(() => {
    if (contacts) {
      console.log("received contacts", contacts)

    }
  }, [contacts]);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(!drawerOpen)

  };

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    }
    if (!drawerOpen) {
      document.body.style.overflow = 'unset'
    }
  }, [drawerOpen])


  return (
    <>
      {
        currentUserName && currentUserImage && (
          <div>
            <div class="text-center absolute mt-20">
              {<button class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" onClick={handleOpenDrawer}>
                Show Inbox
              </button>}
            </div>
            {drawerOpen && <div
              className={
                " fixed min-h-full overflow-y-scroll overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                (drawerOpen
                  ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                  : " transition-all delay-500 opacity-0 translate-x-full  ")
              }
            >
              <section
                className={
                  " w-screen  max-w-lg right-0 absolute bg-white h-full min-h-screen shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
                  (drawerOpen ? " translate-x-0 " : " translate-x-full ")
                }
              >
                <header className="p-4 font-bold text-lg absolute mt-20">Inbox</header>
                <Container>
                  <div className="contacts">
                    {contacts.map((contact, index) => {
                      return (
                        <div
                          key={contact._id}
                          className={`contact ${index === currentSelected ? "selected" : ""
                            }`}
                          onClick={() => changeCurrentChat(index, contact)}
                        >
                          <div className="avatar">
                            <img
                              src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                              alt="avatar"
                            />
                          </div>
                          <div className="username">
                            <h3>{contact.username}</h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Container>
              </section>
              <section
                className="w-screen h-full cursor-pointer "
                onClick={() => {
                  setOpenDrawer(false);
                }}
              ></section>
            </div>
            }
          </div>
        )
      }
    </>
  )
}

const Container = styled.div`
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #36454F;
  min-height: 100vh;
  scroll-behaviour: smooth;
  

  .contacts {
    margin-top: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 1rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #616161;
      min-height: 6rem;
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
          color: white;
        }
      }
    }
    .selected {
      background-color: #FBCB0A;
    }
  }
  .current-user {
    background-color: #FBCB0A;
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

export default DashboardContacts