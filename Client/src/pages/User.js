import NavBar from "../component/NavBar/NavBar"
import ProductList from "../component/ProductList/ProductList"
import CreateProduct from "../component/Product/CreateProduct"

export default function UserPage() {
    return (
        <>
            <NavBar />
            <div class="py-24">
                <h1 class = "font-sans text-3xl uppercase">Welcome {JSON.parse(localStorage.getItem("chat-app-user")).username}</h1>
                <h1 class = "font-sans " > Create New Post:</h1>
                <div className="center-form" >
                    <CreateProduct/>
                </div>
                <div  class= "product-list-dashboard">
                    <ProductList />
                </div>
            </div>
        </>
    )
}
