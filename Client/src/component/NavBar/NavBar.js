import img from '../../img/dinosM.png';
import React, { useContext } from "react";
import UserContext from '../../context/UserContext';
import { useNavigate } from "react-router-dom";
import Button from '../Additional/Button'



export default function NavBar() {
    const navigate = useNavigate();

    const {userID, setUserID} = useContext(UserContext);


    const handleNavigateChatRoom = (e) => {
        
            console.log("NavBar userID:", userID);
            navigate("/chat")
        
    }

    const handleClick = () => {
        navigate("/")
        
      };

    return (
        <nav id= "navbar" class="bg-white px-2 sm:px-4 py-2.5  fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
            <div class="container flex flex-wrap items-center justify-between mx-auto">
                <a href="/home" class="flex items-center">
                    <img src={img} class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                    <span class="text-xl font-semibold whitespace-nowrap  text-neutral-50">Dinos Marketplace</span>
                </a>
                <div class="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul class="flex flex-row p-4 mt-4 border rounded-2xl space-x-4 ">
                        <li>
                            <a href="/home" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0  text-neutral-50    ">Home</a>
                        </li>
                        <li>
                            <a href="/user" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0  text-neutral-50  ">User</a>
                        </li>
                        <li>
                            <button  onClick={handleNavigateChatRoom} href="/chat" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0  text-neutral-50  ">Chats</button>
                        </li>
                        <li>
                            <a href="/settings" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0  text-neutral-50  ">Settings</a>
                        </li>

                    </ul>
                </div>
                <div class="flex md:order-2">
                    <Button onClick={handleClick} label="Sign Out" />
                </div>
            </div>
        </nav>
    )
}