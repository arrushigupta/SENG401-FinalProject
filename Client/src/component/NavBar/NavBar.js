import img from '../../img/dinosM.png';
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Button from '../Additional/Button'
import DashboardContacts from '../Dashboard/DashboardContacts';



export default function NavBar({ contacts, currentUser, changeChat }) {
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    React.useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);    

    const handleClick = () => {
        // needs to delete sign in token.
        localStorage.clear();
        navigate("/");
      };

    return (
        <nav id= "navbar" className="bg-white px-2 sm:px-4 py-2.5  fixed w-full z-20 top-0 left-0 border-b border-gray-200 flex justify-between items-center">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="/home" className="flex items-center">
                    <img src={img} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                    <span className="text-xl font-semibold whitespace-nowrap  text-neutral-50">Dinos Marketplace</span>
                </a>
                <div className="flex items-center">
                    <ul className="flex flex-row p-4 space-x-4 ">
                        <li>
                            <a href="/home" className={activeLink === '/home' ? 'active text-red-700 px-1 py-2 rounded-md text-md font-medium' : 'hover:text-red-700 px-1 py-2 rounded-md text-md font-medium text-white'}>Home</a>
                        </li>
                        <li>
                            <a href="/user" className={activeLink === '/user' ? 'active text-red-700 px-1 py-2 rounded-md text-md font-medium' : 'hover:text-red-700 px-1 py-2 rounded-md text-md font-medium text-white'}>User</a>
                        </li>
                        <li>
                            <a href="/chat" className={activeLink === '/chat' ? 'active text-red-700 px-1 py-2 rounded-md text-md font-medium' : 'hover:text-red-700 px-1 py-2 rounded-md text-md font-medium text-white'}>Chats</a>
                        </li>
                        
                        <li>
                            <a href="/settings" className={activeLink === '/settings' ? 'active text-red-700 px-1 py-2 rounded-md text-md font-medium' : 'hover:text-red-700 px-1 py-2 rounded-md text-md font-medium text-white'}>Settings</a>
                        </li>
                        

                    </ul>
                </div>

                <div class="flex md:order-2">
                <DashboardContacts contacts={contacts} currentUser={currentUser} changeChat={changeChat} />

                    <Button onClick={handleClick} label="Sign Out" />
                </div>

            </div>
        </nav>
    )
}