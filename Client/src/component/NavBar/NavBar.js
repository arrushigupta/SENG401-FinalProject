import img from '../../img/dinos.png'


export default function NavBar() {
    return (
        <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-black fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div class="container flex flex-wrap items-center justify-between mx-auto">
                <a href="/home" class="flex items-center">
                    <img src={img} class="h-6 mr-3 sm:h-9" alt="Flowbite Logo"/>
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Dinos Marketplace</span>
                </a>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul class="flex flex-row p-4 mt-4 border">
                        <li>
                            <a href="/home" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Home</a>
                        </li>
                        <li>
                            <a href="/user" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">User</a>
                        </li>
                        <li>
                            <a href="/settings" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Settings</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}