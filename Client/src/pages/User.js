import NavBar from "../component/NavBar/NavBar"
import ProductList from "../component/ProductList/ProductList"
import CreateProduct from "../component/Product/CreateProduct"

export default function UserPage() {
    return (
        <>
            <NavBar />
            <div class="py-24">
                <h1>My username is: {JSON.parse(localStorage.getItem("chat-app-user")).username}</h1>
                <h1> User </h1>
                <ProductList />
                <CreateProduct/>
            </div>
        </>
    )
}
