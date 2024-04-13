// import React from 'react';
// import './DetailPage.css';

// const DetailPage = () => {
//   return (
//     <div className="weatherImg">
//     <div className="weather-detail-container">
//       <div className="weather-card">
//         <h2 className="weather-title">Current Weather</h2>
//         <div className="temperature-info">
//           <span className="temperature">32°C</span>
//           <span className="weather-description">Haze, Jaipur, India</span>
//         </div>
//         <div className="weather-stats">
//           <div className="weather-stat">
//             <span className="stat-icon" style={{fontSize:"2.5rem"}}>🌇</span>
//             <span className="stat-title">Sunset</span>
//             <span className="stat-value">18:49 PM</span>
//           </div>
//           <div className="weather-stat">
//             <span className="stat-icon" style={{fontSize:"2.5rem"}}>💧</span>
//             <span className="stat-title">Humidity</span>
//             <span className="stat-value">22</span>
//           </div>
//           <div className="weather-stat">
//             <span className="stat-icon" style={{fontSize:"2.5rem"}}>🔍</span>
//             <span className="stat-title">Pressure</span>
//             <span className="stat-value">1010</span>
//           </div>
//           <div className="weather-stat">
//             <span className="stat-icon" style={{fontSize:"2.5rem"}}>💨</span>
//             <span className="stat-title">Speed</span>
//             <span className="stat-value">2.57</span>
//           </div>
//         </div>
//         <div className="weather-actions">
//           <button className="button-celsius">Celsius</button>
//           <button className="button-more-info">More Info →</button>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default DetailPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetailPage.css';

interface Weather {
  temperature: number;
  description: string;
  icon: string;
  sunset: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  country: string;
  city: string;
}

const DetailPage = () => {
  const { city } = useParams<{ city: string }>();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [unit,setUnit]=useState("Celsius")

  const navigate=useNavigate()

  const handleBack=()=>{
    navigate('/')
  }



  useEffect(() => {
    const fetchWeather = async () => {
      if (typeof city === 'string') { 
        const apiKey = '94749519e1ef7e1c176399f75ffb04c3'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.cod === 200) {
            setWeather({
              temperature: data.main.temp,
              description: data.weather[0].main,
              icon: data.weather[0].icon,
              sunset: data.sys.sunset,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              windSpeed: data.wind.speed,
              country: data.sys.country,
              city: data.name,
            });
          } else {
            console.error('Weather data fetch error:', data.message);
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      } else {
        console.error('City is undefined');
      }
    };

    fetchWeather();
  }, [city]);


  const handleToggle=()=>{
    if(weather){
      setWeather({
        ...weather,
        temperature:unit==='Celsius'
        ?weather.temperature*9/5+32
        :(weather.temperature - 32) * 5/9,
      });
      setUnit(unit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
    }
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  const sunsetTime = new Date(weather.sunset * 1000).toLocaleTimeString();

  return (
    <div className="weatherImg">
       <button className="button-more-info" onClick={handleBack} style={{margin:"2rem"}}>
  ← Back
</button>
      <div className="weather-detail-container">
     
        <div className="weather-card">
          <h2 className="weather-title">Current Weather</h2>
          <div className="temperature-info">
            <span className="temperature">{`${weather.temperature } ${unit=='Celsius'? "°C":"F"}`}</span>
            <span className="weather-description">
              {weather.description}, {weather.city}, {weather.country}
            </span>
          </div>
          <div className="weather-stats">
 
            <div className="weather-stat">
              <span className="stat-icon" style={{ fontSize: '2.5rem' }}>
                🌇
              </span>
              <span className="stat-title">Sunset</span>
              <span className="stat-value">{sunsetTime}</span>
            </div>
            <div className="weather-stat">
              <span className="stat-icon" style={{ fontSize: '2.5rem' }}>
                💧
              </span>
              <span className="stat-title">Humidity</span>
              <span className="stat-value">{weather.humidity}</span>
            </div>
            <div className="weather-stat">
              <span className="stat-icon" style={{ fontSize: '2.5rem' }}>
                🔍
              </span>
              <span className="stat-title">Pressure</span>
              <span className="stat-value">{weather.pressure}</span>
            </div>
            <div className="weather-stat">
              <span className="stat-icon" style={{ fontSize: '2.5rem' }}>
                💨
              </span>
              <span className="stat-title">Speed</span>
              <span className="stat-value">{weather.windSpeed}</span>
            </div>
          </div>
          <div className="weather-actions">
          <button className="button-celsius" onClick={handleToggle}>
              {unit === 'Celsius' ? 'To Fahrenheit' : 'To Celsius'}
            </button>
            {/* <button className="button-more-info" onClick={handleBack}>
  ← Back
</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
