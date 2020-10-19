import React, { useEffect, useState } from "react";
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core'
import Map from './Map'
import "leaflet/dist/leaflet.css"

function App() {

  const [world, setWorld] = useState([])
  const [countries, setcountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(['world'])

  const [mapCenter, setMapCenter] = useState( { lat: 30, lng: 0 } );
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response => response.json()))
        .then((data) => {
          const countries =
            data.map((country) => (
              {
                name: country.country,
                value: country.countryInfo.iso2,
                cases: country.cases,
                deaths: country.deaths,
                recovered: country.recovered,

                tests: country.tests,

                todayCases: country.todayCases,
                todayDeaths: country.todayDeaths,
                todayRecovered: country.todayRecovered,
              }));
          setcountries(countries);
          console.table(data);
        })
    }
    getData();
  }, []);

  const oncountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
  }

  return (
    <div className="App">
      <FormControl>
        <Select onChange={oncountryChange} value={selectedCountry}>
          <MenuItem value='world'>World</MenuItem>
          {countries.map((object) => (
            <MenuItem value={object.value}>{object.name}</MenuItem>))}
        </Select>
      </FormControl>

      <div>
        <img className='infImg' src={require('./assets/infection.png')} alt="inf" />
        {
          countries.map((country) => {
            if (country.value === selectedCountry)
              return `cases: ${country.cases}, today: ${country.todayCases} `;
            return "";
          })
        }

        {selectedCountry === 'world' ? "cases: " + world.cases : ""}
      </div>


      <div>
        <img className='deathImg' src={require('./assets/death.png')} alt="death" />
        {
          countries.map((country) => {
            if (country.value === selectedCountry)
              return `deaths: ${country.deaths}, today: ${country.todayDeaths} `;
            return "";
          })
        }
        {selectedCountry === 'world' ? "deaths: " + world.deaths : ""}
      </div>
      <Map center={mapCenter} zoom={mapZoom} />
    </div>
  );
}

export default App;    