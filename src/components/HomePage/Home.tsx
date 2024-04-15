import  { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';



 
  // Define the type for city
  interface City {
    name: string;
    country: string;
    timezone: string;
    population: number;
  }

const Home = () => {
  const [cities, setCities] = useState<City[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100');
        const json = await response.json();
        const data = json.results.map((item: any) => ({
          name: item.name,
          country: item.cou_name_en,
          timezone: item.timezone,
       
        }));
      
        setCities(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
 
  return (
   
    <div className="tableContent">
      <div className="tableStart">

     
      <table className='table'>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
        {cities.map((city, index) => (
            <tr key={index}>
          <td><Link to={`/details/${city.name}`} className="city-link">{city.name}</Link></td>

              <td>{city.country}</td>
              <td>{city.timezone}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </div>
       </div>
   
   
  );
}

export default Home;
