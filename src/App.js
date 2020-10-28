import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import "leaflet/dist/leaflet.css"

import './App.css';
import './InfoBox';
import Map from './Map';
import Table from "./Table";
import TodayTable from "./TodayTable"
import InfoBox from "./InfoBox";
import { sortData, sortTodayData } from "./utils";

function App() {

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(['world'])
  const [countryInfo, setCountryInfo] = useState([])
  const [tableData, setTableData] = useState([]);
  const [todayTableData, setTodayTableData] = useState([]);

  const [mapCenter, setMapCenter] = useState({ lat: 25, lng: 40 });
  const [mapZoom, setMapZoom] = useState(2);
  const [flagSrc, setFlagSrc] = useState([])
  const [mapCountries, setMapCountries] = useState([])



  //will run once when component loads or when variable in [] changes
  //initial as World is default
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
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

          setMapCountries(data);
          setTableData(sortData(data));
          setTodayTableData(sortTodayData(data));
          setCountries(countries);
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

        if (countryCode === 'world') {
          setMapZoom(2);
          setMapCenter([25, 40]);
          setFlagSrc("");
        }
        else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(5);
          setFlagSrc(data.countryInfo.flag);
        }
      })
  }

  return (
    <div className="App">
      <div className="App-left">
        <div className="App-header">
          <h1>Covid Tracker</h1>
          <FormControl>
            <h3>
              Choose country:
            </h3>
            <Select className="selector" variant="outlined" onChange={oncountryChange} value={selectedCountry}>
              <MenuItem value='world'>World</MenuItem>
              {
                countries.map((object) => (
                  <MenuItem value={object.value}>{object.name}</MenuItem>))
              }
            </Select>
          </FormControl>
        </div>

        <div className='App-stats'>
          <InfoBox title="Rocovers today" cases={countryInfo.todayRecovered} total={countryInfo.recovered} color={{ color: 'green' }} />
          <InfoBox title="Cases today" cases={countryInfo.todayCases} total={countryInfo.cases} color={{ color: 'red' }} />
          <InfoBox title="Deaths today" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} flagSrc={flagSrc} />
      </div>


      <Card className="App-right">
        <CardContent>
          Most cases:
          <Table countries={tableData}></Table>
            Most cases today:
          <TodayTable countries={todayTableData}></TodayTable>
        </CardContent>
      </Card>

    </div>

  );
}

export default App;    