import React from 'react'
import Header from './components/Header'
import CityInput from './components/CityInput'
import SearchHistory from './components/SearchHistory'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'

function App() {
  return (
    <div className="App">
      <div className="jumbotron my-2 p-0">
        <Header />
        <CityInput />
        <SearchHistory />
        <WeatherCard />
        <ForecastCard />
        <ForecastCard />
      </div>
    </div>
  );
}

export default App;
