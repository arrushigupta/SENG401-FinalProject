import Header from "../component/Login/Header"
import Login from "../component/Login/Login"

export default function LoginPage(){
    return(
        <>
        <div className="min-h-full h-screen-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <Header
                heading="Dinos Marketplace"
                paragraph="Don't have an account yet? "
                linkName="Sign Up"
                linkUrl="/signup"
                />
            <Login/>
            </div>
            </div> 
        </>
    )
}