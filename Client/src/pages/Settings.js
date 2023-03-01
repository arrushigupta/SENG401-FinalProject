import NavBar from "../component/NavBar/NavBar"

export default function SettingsPage() {
    return (
        <>
            <NavBar />
            <div class="py-24">
                <h1 class = "font-sans text-3xl uppercase">Welcome {JSON.parse(localStorage.getItem("chat-app-user")).username}</h1>
                <h1 class = "font-sans " > </h1>
            </div>
        </>
    )
}