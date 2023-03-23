import Dashboard from "../component/Dashboard/Dashboard"
import NavBar from "../component/NavBar/NavBar"
import SearchBox from "../component/SearchBox/SearchBox"
import ProductList from "../component/ProductList/ProductList"
import CreateProduct from "../component/Product/CreateProduct"
import Footer from '../component/Additional/Footer'
import React from 'react'

export default function HomePage() {

    const [message, setMessage] = React.useState("Hello World");
    const chooseMessage = (message) => {
        setMessage(message);
    };

    return (
        <>
            {/* <NavBar /> */}

            <div class="py-24">
            <h1> Home </h1>
            <h1>message</h1>
            <ProductList chooseMessage={chooseMessage}/>
            <CreateProduct/>
            </div>
        </>
    )
}