import img from '../../img/dinos.png';
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
        // console.log('Button clicked!');
        navigate("/")
        
      };

    return (
        <nav id= "navbar" class="bg-white px-2 sm:px-4 py-2.5 dark:bg-black fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div class="container flex flex-wrap items-center justify-between mx-auto">
                <a href="/home" class="flex items-center">
                    <img src={img} class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                    <span class="text-xl font-semibold whitespace-nowrap dark:text-white">Dinos Marketplace</span>
                </a>
                <div class="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul class="flex flex-row p-4 mt-4 border rounded-2xl space-x-4 bg-orange-50">
                        <li>
                            <a href="/home" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
                        </li>
                        <li>
                            <a href="/user" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">User</a>
                        </li>
                        <li>
                            <button  onClick={handleNavigateChatRoom} href="/chat" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Chats</button>
                        </li>
                        <li>
                            <a href="/settings" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Settings</a>
                        </li>

                    </ul>
                </div>
                <div class="flex md:order-2">
                    {/* <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button> */}
                    <Button onClick={handleClick} label="Sign Out" />
                </div>
            </div>
        </nav>
    )
}