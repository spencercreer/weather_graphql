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
  const [coords, setCoords] = useState([0, 0])
  const [error, setError] = useState(false)
  const [forecastData, setForeCastData] = useState({})
  const [searchHistory, setSearchHistory] = useState([])

  useEffect(() => {
    //get users geolocation or set coords to Phoenix
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords([position.coords.latitude, position.coords.longitude])
      });
    } else {
      setCoords([33.4636012, -112.0535987])
    }

    //local storage search history
    let citySearches = JSON.parse(localStorage.getItem('searchHistory')) || []
    setSearchHistory(citySearches)
  }, [])

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&appid=cb77ba3879d59e814a56609394606986`)
    .then(res => {
      console.log('Forecast Data', res.data)
      setForeCastData(res.data)
    })
    .catch(err => {
      if (err)
        setError(true)
    })
  }, [coords])

  const handleOnChange = event => {
    setCity(event.target.value)
    setError(false)
  }

  const handleOnClick = event => {
    console.log(event.target.value)
    getWeather(event.target.value)
  }

  const getWeather = (search) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=cb77ba3879d59e814a56609394606986`)
      .then(res => {
        let lat = res.data.coord.lat
        let lon = res.data.coord.lon
        setCity(res.data.name)
        setCoords([lat, lon])
        storeCitySearch(res.data.name)
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
              city={city}
              handleOnChange={handleOnChange}
              handleOnClick={handleOnClick}
            />
            <ErrorAlert
              city={city}
              error={error}
            />
            <SearchHistory 
              history={searchHistory}
              handleOnClick={handleOnClick}
            />
          </Col>
          <Col sm={8}>
            <WeatherCard
              city={city}
              currentWeather={forecastData?.current}
              locationTime={moment().utcOffset(forecastData?.timezone / 60)}
              convertTemp={convertTemp}
            />
          </Col>
        </Row>
        <ForecastCard
          forecastData={forecastData?.daily}
          locationTime={moment().utcOffset(forecastData?.timezone / 60)}
          convertTemp={convertTemp}
        />
      </Container>
    </>
  );
}

export default App;
