import React from "react";

export default function SearchBox({ setSearchQuery, searchQuery, setSearchCategory, searchCategory, setSearchFlag, searchFlag }) {

    const handleCategory = (e) => { 
        setSearchCategory(e.target.value);
    }

    const handleSearch = (e) => { 
        setSearchQuery(e.target.value);
    }

    const handleSubmit = (e) => { 
        setSearchFlag(searchFlag + 1);
    }

    return (
        <div className="flex">
            <div className="flex space-x-1">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={ handleSearch}
                    className="block w-full px-4 py-2 text-black-700 bg-white border rounded-full focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search Product..."
                />
                <label className="w-1/2 justify-start flex-cols items-start"> 
                    Category
                    <select
                        value={searchCategory}
                        onChange={handleCategory}
                        name="category"
                        id="category"
                        className="form-select block w-full mt-1 border rounded">
                        <option value="All">All</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Textbooks">Textbooks</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="Services">Services</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Events">Events</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <button onClick={handleSubmit} className="px-4 text-white bg-red-600 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}