import React, { useEffect, useState } from "react";
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core'
import Map from './Map'
import "leaflet/dist/leaflet.css"

function App() {

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(['world'])
  const [countryInfo, setCountryInfo] = useState([])

  const [mapCenter, setMapCenter] = useState({ lat: 30, lng: 0 });
  const [mapZoom, setMapZoom] = useState(3);
  const [flagSrc, setFlagSrc] = useState([])

  //will run once when component loads or when variable in [] changes
  //initial as World is default
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
        console.table(data);
      })
  }, [])

  //read country names and codes
  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response => response.json()))
        .then((data) => {
          const countries =
            data.map((country) => (
              {
                name: country.country,
                value: country.countryInfo.iso2
              }));
          setCountries(countries);
          // console.table(data);
        })
    }
    getData();
  }, []);

  const oncountryChange = async (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);

    const url = countryCode === 'world' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.table(data.countryInfo)
        setCountryInfo(data);

        if(countryCode === 'world')
        {
          setMapCenter([30,0]);
          setMapZoom(3);
          setFlagSrc("");
        }
        else{
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(5);
          setFlagSrc(data.countryInfo.flag);
        }
      })
  }

  return (
    <div className="App">
      <FormControl>
        <Select onChange={oncountryChange} value={selectedCountry}>
          <MenuItem value='world'>World</MenuItem>
          {
            countries.map((object) => (
              <MenuItem value={object.value}>{object.name}</MenuItem>))
          }
        </Select>
      </FormControl>

      <div>
        <img className='infImg' src={require('./assets/infection.png')} alt="inf" />
        Cases: <text className='casesText'>{countryInfo.todayCases}</text> ({countryInfo.cases} total)
      </div>
      <div>
        <img className='deathImg' src={require('./assets/death.png')} alt="death" />
      Deaths: <text className="deathsText">{countryInfo.todayDeaths}</text> ({countryInfo.deaths} total)
      </div>
      <div>
        Recovered: <text className="recoveredText">{countryInfo.todayRecovered}</text> ({countryInfo.recovered} total)
      </div>

      <Map center={mapCenter} zoom={mapZoom} flagSrc={flagSrc} />
    </div>
  );
}

export default App;    