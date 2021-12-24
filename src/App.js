import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import CityInput from './components/CityInput/CityInput'
import ErrorAlert from './components/ErrorAlert/ErrorAlert'
import SearchHistory from './components/SearchHistory/SearchHistory'
import WeatherCard from './components/WeatherCard/WeatherCard'
import ForecastCard from './components/ForecastCard/ForecastCard'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'

function App() {
  const [city, setCity] = useState('')
  const [coords, setCoords] = useState([])
  const [error, setError] = useState(false)
  const [weatherData, setWeatherData] = useState({})
  const [forecastData, setForeCastData] = useState({})
  const [searchHistory, setSearchHistory] = useState([])

  useEffect(() => {
    //get users geolocation or set coords to Phoenix
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        setCoords([position.coords.latitude, position.coords.longitude])
      });
    } else {
      setCoords([33.4636012, -112.0535987])
    }

    //local storage search history
    let citySearches = JSON.parse(localStorage.getItem('searchHistory')) || []
    setSearchHistory(citySearches)
  }, [])

  const handleOnChange = event => {
    setCity(event.target.value)
    setError(false)
  }

  const handleSubmit = () => {
    getWeather()
  }

  const getWeather = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb77ba3879d59e814a56609394606986`)
      .then(res => {
        console.log('Weather Data', res.data)
        setWeatherData(res.data)
        let lat = res.data.coord.lat
        let lon = res.data.coord.lon
        setCoords([lat, lon])
        getForecast(lat, lon)
        storeCitySearch(res.data.name)
      })
      .catch(err => {
        if (err)
          setError(true)
      })
  }

  const getForecast = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=cb77ba3879d59e814a56609394606986`)
      .then(res => {
        console.log('Forecast Data', res.data)
        setForeCastData(res.data)
      })
      .catch(err => {
        if (err)
          setError(true)
      })
  }

  const storeCitySearch = (city) => {
    //check search history to ensure it is not a duplicate
    let found = searchHistory.find(x => x === city)
    if (!found) {
      //store city search in local storage
      searchHistory.push(city)
      setSearchHistory(searchHistory)
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    }
  }

  const convertTemp = (tempK) => {
    let tempF = (tempK - 273.15) * 1.80 + 32;
    return tempF.toFixed()
  }

  return (
    <>
      <Header />
      <Container className="px-0" fluid>
        <Row>
          <Col sm={4}>
            <CityInput
              handleOnChange={handleOnChange}
              handleSubmit={handleSubmit}
            />
            <ErrorAlert
              city={city}
              error={error}
            />
            <SearchHistory 
              history={searchHistory}
            />
          </Col>
          <Col sm={8}>
            <WeatherCard
              {...weatherData}
              locationTime={moment().utcOffset(weatherData?.timezone / 60)}
              convertTemp={convertTemp}
            />
          </Col>
        </Row>
        <ForecastCard
          {...forecastData}
          locationTime={moment().utcOffset(weatherData?.timezone / 60)}
          convertTemp={convertTemp}
        />
      </Container>
    </>
  );
}

export default App;
