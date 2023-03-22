import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import Product from "../Product/Product"

export default function ProductList({ chooseMessage }) {

    const { setLoading } = useContext(LoadingContext);
    const [products, setProducts] = useState([]);

    // Note this function does not work, but it's kind of the idea of what you need to work on
    // Most likely you will need a handleinput and not useffect, and somehow query based on that parameter

    useEffect(() => {

        var apiString = "http://localhost:4000/api/getSpecificProducts/userID/" + JSON.parse(localStorage.getItem("chat-app-user"))._id;

        console.log("Message " + chooseMessage);

        if(chooseMessage === 1)
            DINOSGet(apiString, setLoading, setProducts);
        else if(chooseMessage === 0)
            DINOSGet("http://localhost:4000/api/getAllProducts", setLoading, setProducts);
        
        setLoading(false);


        // console.log( JSON.parse(localStorage.getItem("chat-app-user")));
        // console.log(JSON.parse(localStorage.getItem("chat-app-user")).username);
        // console.log(JSON.parse(localStorage.getItem("chat-app-user"))._id);

    },[]);

    // Product expects an object that can directly be rendered
    // You would need to do a loop that queries for all objects necessary and then pass in
    // thos objects one by one into product

    return (
        <>

            <div className="py-24">            
            
            <div className = "grid w-screen sm:grid-cols:1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(product => (
                <Product key={product._id} {...product} />
            ))}
            </div>

            </div>
        </>
    )
}