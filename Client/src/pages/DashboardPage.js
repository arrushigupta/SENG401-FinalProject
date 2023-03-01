import Dashboard from "../component/Dashboard/Dashboard"
import NavBar from "../component/NavBar/NavBar"
import CreateProduct from "../component/Product/CreateProduct"
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardContacts from '../component/Dashboard/DashboardContacts';
import axios from 'axios';
import { allUsersRoute } from '../utils/Routes'

export default function DashboardPage() {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
          let userData = await JSON.parse(localStorage.getItem("chat-app-user"))
          if (!userData) {
            navigate("/");
          }
          else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user"))); //user info, id, username, email
            console.log(await JSON.parse(localStorage.getItem("chat-app-user")))
          }
        }
        fetchData();
      }, []);
    
      useEffect(() => {
        async function fetchData() {
          if (currentUser) {
            if (currentUser.isAvatarImageSet) {
              const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
              console.log("User data", currentUser)
              console.log("Contact data for all users", data)
    
              setContacts(data.data);
            } else {
              navigate('/setAvatar');
            }
          }
        }
        fetchData();
      }, [currentUser]);

      const handleChatChange = (chat) => {
        setCurrentChat(chat)
        console.log("current chat changed", chat)
      }


    return (
        <>
            <NavBar />
            

            <div >
                <h1>My username is: {JSON.parse(localStorage.getItem("chat-app-user")).username}</h1>
            <h1> Home </h1>
            <DashboardContacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />

                <Dashboard></Dashboard>


                {/* <ProductList />
            <CreateProduct/> */}
            </div>

        </>
    )
}