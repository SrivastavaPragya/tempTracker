import  { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {


  const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
  
    const handleInputChange = (event:any) => {
      setSearchInput(event.target.value);
    };
  
    const handleSearch = () => {

      navigate(`/details/${searchInput}`);
    };
  return (

    
  
      <div className="Header">
        <div className="logo">
          <h1>WeatherTracker</h1> 
        </div>
        <div className="searchbar">
        <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search..."
            className="search-input"
          />
          <button className='search-button' onClick={handleSearch}>Search</button>
        </div>
        <div className="icon">
          <span className="material-symbols-outlined">
            thermostat
          </span>
        </div>
        </div>
        
    
   
  )
}

export default Navbar
