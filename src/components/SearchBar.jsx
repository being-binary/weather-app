import React, { useState } from 'react';
import { toastinfo } from './Toast';

const SearchBar = ({ value }) => {
    const { city, setCity, getWeather } = value;
    const [resultCity, setResultCity] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const searchCityName = async (input) => {
        try {
            setCity(input); // Keep input in sync
            if (input.length < 2) {
                setResultCity([]);
                setShowDropdown(false);
                return;
            }

            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${import.meta.env.VITE_API_KEY}`);
            const data = await response.json();
            setResultCity(data);
            setShowDropdown(true);
        } catch (error) {
            toastinfo(error.message)
        }
    };

    const handleSelect = (selectedCity) => {
        setCity(`${selectedCity.name}`);
        setShowDropdown(false);
        setResultCity([]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getWeather()
        // You can call your weather fetching function here
    };

    return (
        <div className="relative w-full max-w-md">
            <form onSubmit={handleSearch} className="mb-6 w-full flex gap-2">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => searchCityName(e.target.value)}
                    className="flex-1 p-3 rounded text-white font-semibold outline-none border border-white bg-blue-600 placeholder-white"
                />
                <button
                    type="submit"
                    onClick={(e) => handleSearch(e)}
                    className="bg-white text-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-100"
                >
                    Search
                </button>
            </form>

            {showDropdown && resultCity.length > 0 && (
                <div className="absolute top-full mt-[-1rem] z-10 bg-white shadow-lg w-full rounded-b-lg border border-gray-300 max-h-60 overflow-y-auto text-black">
                    {resultCity.map((c, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(c)}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                            {c.name}, {c.state ? `${c.state}, ` : ''}{c.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
