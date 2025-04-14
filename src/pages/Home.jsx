import React, { useEffect, useState } from 'react';
import { WiThermometer, WiHumidity, WiBarometer, WiStrongWind } from "react-icons/wi";
import { BsThermometerSun, BsThermometerSnow } from "react-icons/bs";
import { toastinfo } from '../components/Toast';
import { ToastContainer } from 'react-toastify';
import SearchBar from '../components/SearchBar';


const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Lucknow,Uttar Pradesh');

    const getWeather = async () => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
            );
            const data = await res.json();
            if (data.cod === '404') {
                toastinfo(data.message)
                return
            }else{
                setWeatherData(data);
            }
        } catch (err) {
            console.error('Error fetching weather data:', err);
        }
    };

    useEffect(() => {
        getWeather();
    }, []);

 
    const getEmoji = (main) => {
        switch (main) {
            case 'Clouds':
                return '☁️';
            case 'Clear':
                return '☀️';
            case 'Rain':
                return '🌧️';
            case 'Snow':
                return '❄️';
            case 'Thunderstorm':
                return '⛈️';
            default:
                return '🌤️';
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 to-blue-700 text-white flex flex-col items-center justify-center p-6">
            <SearchBar value={{city, setCity, getWeather}}/>
            {weatherData && weatherData.weather && (
                <div className="bg-white/20 p-6 rounded-lg shadow-lg w-full max-w-md backdrop-blur-md">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-2xl font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
                            <p className="text-sm text-white/70">{new Date().toLocaleDateString()}</p>
                        </div>
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt="weather icon"
                            className="w-16 h-16"
                        />
                    </div>

                    <div className="text-center text-4xl font-bold mb-2">
                        {Math.round(weatherData.main.temp)}°C {getEmoji(weatherData.weather[0].main)}
                    </div>
                    <p className="text-center capitalize text-white/80 mb-4">
                        {weatherData.weather[0].description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/10 p-3 rounded flex items-center gap-2">
                            <WiThermometer size={24} />
                            <div>
                                <p className="font-semibold">Feels Like</p>
                                <p>{Math.round(weatherData.main.feels_like)}°C</p>
                            </div>
                        </div>

                        <div className="bg-white/10 p-3 rounded flex items-center gap-2">
                            <WiHumidity size={24} />
                            <div>
                                <p className="font-semibold">Humidity</p>
                                <p>{weatherData.main.humidity}%</p>
                            </div>
                        </div>

                        <div className="bg-white/10 p-3 rounded flex items-center gap-2">
                            <WiBarometer size={24} />
                            <div>
                                <p className="font-semibold">Pressure</p>
                                <p>{weatherData.main.pressure} hPa</p>
                            </div>
                        </div>

                        <div className="bg-white/10 p-3 rounded flex items-center gap-2">
                            <WiStrongWind size={24} />
                            <div>
                                <p className="font-semibold">Wind</p>
                                <p>{weatherData.wind.speed} m/s</p>
                            </div>
                        </div>

                        <div className="bg-white/10 p-3 rounded flex items-center gap-2">
                            <BsThermometerSnow size={20} />
                            <div>
                                <p className="font-semibold">Temp Min</p>
                                <p>{Math.round(weatherData.main.temp_min)}°C</p>
                            </div>
                        </div>

                        <div className="bg-white/10 p-3 rounded flex items-center gap-2">
                            <BsThermometerSun size={20} />
                            <div>
                                <p className="font-semibold">Temp Max</p>
                                <p>{Math.round(weatherData.main.temp_max)}°C</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Home;
