import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import Input from "../Login/Input";



export default function Product(){

    const { setLoading } = useContext(LoadingContext);

    // possibly will add an array of tags

    const [product, setProduct] = useState({
        name: "Kendama",
        description: "Used it during all of grade 6, decided it was time to move on",
        price: 20,
        image: null,
    });

    return(
        <>
        <div>
            
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{product.name}</div>
                    <p class="text-gray-700 text-base">{product.description}</p>
                    <p class="font-bold text-lg mb-2">{product.price} $</p>
                </div>
                <div class="px-6 pt-1 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
            </div>
        </div>

        </>
    )

}