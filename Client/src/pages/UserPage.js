import NavBar from "../component/NavBar/NavBar"
import ProductList from "../component/ProductList/ProductList"
import CreateProduct from "../component/Product/CreateProduct"
import { IoIosAdd } from 'react-icons/io';
import React, { useState } from 'react';
import Modal from "../component/Product/CreateProductModal";

export default function UserPage() {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };


    return (
        <>
            <NavBar />
            <div class="py-24">
                <h1 class="font-sans text-3xl uppercase">Welcome {JSON.parse(localStorage.getItem("chat-app-user")).username}</h1>
                <button
                    style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
                    onClick={ handleOpenModal}
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-4 rounded-full z-50"
                >
                    <IoIosAdd className="h-8 w-8" />
                </button>
                <Modal isOpen={isOpen} close={handleCloseModal}>
                    <CreateProduct closeModal={handleCloseModal} />
                </Modal>
                <div  className= "product-list-dashboard">
                    <ProductList chooseMessage={1}/>
                </div>
            </div>
        </>
    )
}
