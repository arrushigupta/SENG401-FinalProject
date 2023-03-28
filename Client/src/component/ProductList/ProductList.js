import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import UserContext from "../../context/UserContext";
import Product from "../Product/Product";
import axios from 'axios';
import Button from '../Additional/Button';
import SearchBox from '../SearchBox/SearchBox';
import LoadingAnimation from './LoadingAnimation';
import { deleteProductRoute, getAllProductsRoute, getSpecificProductCategoryRoute, getSpecificProductNameRoute, getSpecificProductRoute, getSpecificProductUserIDRoute, getTwoSpecificProductsCategoryRoute } from '../../utils/Routes';

export default function ProductList({ chooseMessage, productState }) {

    // all for search box
    const [searchFlag, setSearchFlag] = useState(0);
    const [prevSearchFlag, setPrevSearchFlag] = useState(0);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchCategory, setSearchCategory] = useState("All");

    const { loading, setLoading } = useContext(LoadingContext);
    const [deletedProductId, setDeletedProductId] = useState(null);

    const [products, setProducts] = useState([]);
    const { setUserID } = useContext(UserContext);
    // Note this function does not work, but it's kind of the idea of what you need to work on
    // Most likely you will need a handleinput and not useffect, and somehow query based on that parameter

    useEffect(() => {
        setLoading(true);
        let uID = JSON.parse(localStorage.getItem("chat-app-user"))._id;
        var apiString = getSpecificProductUserIDRoute + JSON.parse(localStorage.getItem("chat-app-user"))._id;
        
        setUserID(uID);
        

        if (chooseMessage === 0) {
            // Home page
            if (searchFlag != prevSearchFlag) {
                // Search has happend: make appropriate api call
                var apiString2;
                if (searchCategory == "All") {
                    if (searchQuery === "") {
                        apiString2 = getAllProductsRoute;
                    } else {
                        apiString2 = getSpecificProductNameRoute + searchQuery;
                    }
                } else {
                    if (searchQuery === "") {
                        apiString2 = apiString2 = getSpecificProductCategoryRoute + searchCategory;
                    } else {
                        apiString2 = getTwoSpecificProductsCategoryRoute + searchCategory + "/name/" + searchQuery;
                    }
                }
                console.log(">>> api: " + apiString2);
                
                DINOSGet(apiString2, setLoading, setProducts);
                setPrevSearchFlag(searchFlag);
            } else {
                // No search has happened: load all items
                DINOSGet(getAllProductsRoute, setLoading, setProducts);
            }

        } else {
            // User page. Return all items created by user
            DINOSGet(apiString, setLoading, setProducts);
        }

    }, [productState, searchFlag]);

    const handleDelete = async (_id) => {

        axios.delete(deleteProductRoute + `${_id}`)
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
            <div className="items-center flex-cols justify-center">
                {chooseMessage === 0 ? <div className="ml-4"> <SearchBox searchFlag={searchFlag} searchCategory={searchCategory} searchQuery={searchQuery} setSearchCategory={setSearchCategory} setSearchFlag={setSearchFlag} setSearchQuery={setSearchQuery}> </SearchBox> </div> : <div></div>}
                <div className="grid w-screen sm:grid-cols:1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map(product => (
                        <div style={{ display: product._id === deletedProductId ? 'none' : 'block' }} class="group w-fit h-fit rounded-lg bg-slate-100 hover:bg-red-600 hover:shadow-xl active:bg-red-700 m-4 md:hover:text-neutral-50">
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