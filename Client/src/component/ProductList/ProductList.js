import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import UserContext from "../../context/UserContext";
import Product from "../Product/Product";
import axios from 'axios';
import Button from '../Additional/Button'

export default function ProductList({ chooseMessage, productState}) {

    const { setLoading } = useContext(LoadingContext);
    const [deletedProductId, setDeletedProductId] = useState(null);

    const [products, setProducts] = useState([]);
    const { setUserID } = useContext(UserContext);
    // Note this function does not work, but it's kind of the idea of what you need to work on
    // Most likely you will need a handleinput and not useffect, and somehow query based on that parameter
    
    useEffect(() => {
        let uID = JSON.parse( localStorage.getItem("chat-app-user"))._id;
        var apiString = "http://localhost:4000/api/getSpecificProducts/userID/" + JSON.parse(localStorage.getItem("chat-app-user"))._id;
        console.log("Message " + chooseMessage);
        
        setUserID(uID);

        if (chooseMessage === 1)
            DINOSGet(apiString, setLoading, setProducts);
        else if (chooseMessage === 0)
            DINOSGet("http://localhost:4000/api/getAllProducts", setLoading, setProducts);
        setLoading(false);
        console.log(">>>" + productState);
    }, [productState]);

    const handleDelete = async (_id) => {

        axios.delete(`http://localhost:4000/api/deleteProduct/${_id}`)
          .then(() => {
            alert("Product was deleted successfully");
            setDeletedProductId(_id);
          })
          .catch(error => {
            console.error(error);
          });
      }

    // Product expects an object that can directly be rendered
    // You would need to do a loop that queries for all objects necessary and then pass in
    // thos objects one by one into product

    return (
        <>
            <div className="">
                <div className="grid w-screen sm:grid-cols:1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map(product => (                        
                        <div style={{ display: product._id === deletedProductId ? 'none' : 'block' }} class = "group w-fit h-fit rounded-lg bg-slate-100 hover:bg-red-600 hover:shadow-xl active:bg-red-700 m-4 md:hover:text-neutral-50">
                            <Product key={product._id} {...product} />
                            {chooseMessage !== 0 && (
                            <Button onClick={() => handleDelete(product._id)} label="Delete Product" />)}
                        </div>
                          

                    ))}

                {/* <div key={item.id} style={{ display: item.id === deletedItemId ? 'none' : 'block' }}>
                        <p>{item.name}</p>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div> */}

                </div>

            </div>

            
        </>
    )
}