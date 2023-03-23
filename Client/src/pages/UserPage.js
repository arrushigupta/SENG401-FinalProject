import NavBar from "../component/NavBar/NavBar"
import ProductList from "../component/ProductList/ProductList"

import Dashboard from "../component/Dashboard/Dashboard"
import CreateProduct from "../component/Product/CreateProduct"
import { IoIosAdd } from 'react-icons/io';
import Modal from "../component/Product/CreateProductModal";
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardContacts from '../component/Dashboard/DashboardContacts';
import axios from 'axios';
import { allUsersRoute } from '../utils/Routes'

export default function UserPage() {
    
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

    const [isOpen, setIsOpen] = useState(false);
    const [productState, setProductState] = useState(0);

    const updateProductState = () => { 
        setProductState(productState + 1);
    }

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };


    return (
        <>
            <NavBar contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
            {/* <NavBar /> */}
            <div class="py-24">
                <h1 class="font-sans text-3xl uppercase">YOUR PRODUCTS:</h1>
                <button
                    style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
                    onClick={ handleOpenModal}
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-4 rounded-full z-50"
                >
                    <IoIosAdd className="h-8 w-8" />
                </button>
                <Modal isOpen={isOpen} close={handleCloseModal}>
                    <CreateProduct closeModal={handleCloseModal} updateProductState={ updateProductState} />
                </Modal>
                <div  className= "product-list-dashboard">
                    <ProductList chooseMessage={1} productState={productState} />
                </div>
            </div>
        </>
    )
}
