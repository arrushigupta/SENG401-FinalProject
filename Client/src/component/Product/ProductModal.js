import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import img from '../../img/Gorilla.jpg';
import axios from 'axios';
import { addMessageRoute } from "../../utils/Routes";
import Button from '../Additional/Button'


export default function ProductModal({ name, description, price, category, setShowModal}){
    
    const { setLoading } = useContext(LoadingContext);

    const handleClick = () => {
      setShowModal(false);

      console.log("Sending message, funct not implemented")
    };

    // const handleSendMsg = async (msg) => {
    //   const data = await axios.post(addMessageRoute, {
    //     from: currentUser._id,
    //     to: currentChat._id,
    //     message: msg,
    //   });
    //   socket.current.emit("send-msg", {
    //     from: currentUser._id,
    //     to: currentChat._id,
    //     message: msg,
    //   });
  
    //   const msgs = [...messages];
    //   msgs.push({ fromSelf: true, message: msg });
    //   setMessages(msgs);
  
  
    // }
    
    // possibly will add an array of tags





    return(
        <>
          <div
            className="justify-center items-center mt-5 mb-5 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-fit h-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex justify-start bg-red-700 p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="grow text-3xl text-neutral-50 ">
                    {name}
                  </h3>
                  <span class="shrink inline-block h-fit self-end justify-self-start  ml-3 mr-20 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ">
                    {category}
                  </span>
                  <button
                    className=" shrink text-black self-start justify-self-end background-transparent font-bold uppercase  text-sm outline-none focus:outline-none mb-1 "
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex justify-center bg-zinc-300">
                    <div className="w-fit">
                        <img class="object-cover h-60 w-110 rounded shadow" src={img} alt="Sunset in the mountains"/>
                        <div className="flex items-start justify-start p-1 rounded-t">
                            <p className="my-2 text-slate-500 text-lg leading-relaxed">
                                Seller 
                            </p>
                            <p class="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2 my-2 ">
                                Your mother
                            </p>  
                        </div>
                        <div className="flex items-start justify-start p-1 rounded-t">
                            <p className="my-2 text-slate-500 text-lg leading-relaxed">
                                Price 
                            </p>
                            <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2 my-2 ">
                                ${price}
                            </p>
                        </div>
                        <div className="flex items-start justify-start p-1 rounded-t">
                            <p className="my-2 text-slate-500 text-lg leading-relaxed">
                                Details 
                            </p>
                            <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2 my-2 ">
                                {description}
                            </p>
                        </div>                        

                    </div>
                  
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b bg-zinc-700">
                  <input type="text" placeholder="Write a message to seller" class="px-3 py-3 mr-7  placeholder-slate-400 text-slate-600 relative bg-slate-200 rounded text-sm border-0 shadow outline-slate-200 focus:outline-slate-300 focus:ring w-full">
                  </input>
                  <Button onClick={handleClick} label="Message Seller" />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )

}