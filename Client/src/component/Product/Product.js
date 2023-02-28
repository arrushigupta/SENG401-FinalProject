import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import Input from "../Login/Input";
import ProductModal from './ProductModal';



export default function Product({ name, description, price, userID}){

    const { setLoading } = useContext(LoadingContext);

    

    // possibly will add an array of tags

    //product use state for testing
    const [product, setProduct] = useState({
        name: "Kendama",
        description: "Used it during all of grade 6, decided it was time to move on",
        price: 20,
        image: null,
    });
    //use state for modal
    const [showModal, setShowModal] = React.useState(false);
    //function to load modal
    const loadModal = () => {
        console.log("loading modal",name, description, price );
        setShowModal(true);
    }


    return(
        <>
        <div class = " rounded-lg bg-slate-100 hover:bg-red-200 hover:shadow-xl active:bg-red-400 m-4"
             onClick={loadModal}>
            
            <div class="max-w-sm rounded overflow-hidden shadow-lg ">
                <img class="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{name}</div>
                    <p class="text-gray-700 text-base">{description}</p>
                    <p class="font-bold text-lg mb-2">${price}</p>
                    <p class="font-bold text-lg mb-2">${userID}</p>
                </div>
                <div class="px-6 pt-1 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
            </div>
        </div>
        {showModal ? (
            <>
                <ProductModal name = {name} description = {description} price = {price} setShowModal = {setShowModal} />
            </>
      ) : null}
            
        </>
    )

}