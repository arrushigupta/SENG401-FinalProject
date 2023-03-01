import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import Input from "../Login/Input";
import ProductModal from './ProductModal';



export default function Product({ name, description, price, userID, category}){

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
        <div class = " group w-fit h-fit rounded-lg bg-slate-100 hover:bg-red-600 hover:shadow-xl active:bg-red-700 m-4 md:hover:text-neutral-50"
             onClick={loadModal}>
            
            <div class="relative max-w-sm rounded overflow-hidden shadow-lg ">
                <span class="absolute top-1 right-1 inline-block group-hover:bg-red-600 bg-gray-100 opacity-60 group-hover:opacity-100 rounded-full px-3 py-1 mx-2 text-lg font-semibold group-hover:text-gray-100 text-gray-700 mr-2 mb-2">${price}</span>
                <img class="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
                <div class="px-6 py-4 ">
                    <div class="font-bold text-xl mb-2">
                        {name}
                    </div>
                    <span class="inline-block group-hover:bg-gray-200 bg-red-500 rounded-full px-3 py-1 mx-2 text-sm font-semibold group-hover:text-gray-700 text-gray-100 mr-2 mb-2">{category}</span>
                    <p class="text-gray-700 text-base ">{description}</p>
                </div>
                
            </div>
        </div>
        {showModal ? (
            <>
                <ProductModal userID={userID} category = {category} name = {name} description = {description} price = {price} setShowModal = {setShowModal} />
            </>
      ) : null}
            
        </>
    )

}