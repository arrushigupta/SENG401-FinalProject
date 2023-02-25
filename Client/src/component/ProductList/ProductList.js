import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import Product from "../Product/Product"

export default function ProductList() {

    const { setLoading } = useContext(LoadingContext);
    const [products, setProducts] = useState([]);

    // Note this function does not work, but it's kind of the idea of what you need to work on
    // Most likely you will need a handleinput and not useffect, and somehow query based on that parameter

    useEffect(() => {
        
        DINOSGet("http://localhost:4000/api/getAllProducts", setLoading, setProducts);
        setLoading(false);

        console.log( JSON.parse(localStorage.getItem("chat-app-user")));
        console.log(JSON.parse(localStorage.getItem("chat-app-user")).username);
        console.log(JSON.parse(localStorage.getItem("chat-app-user"))._id);

    },[]);

    // Product expects an object that can directly be rendered
    // You would need to do a loop that queries for all objects necessary and then pass in
    // thos objects one by one into product

    return (
        <>
            <div className="py-24">            
            
            <div>
            {products.map(product => (
                <Product key={product._id} {...product} />
            ))}
            </div>

            </div>
        </>
    )
}