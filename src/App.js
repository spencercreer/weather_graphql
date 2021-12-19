import { useState, useEffect } from 'react'
import Header from './components/Header'
import CityInput from './components/CityInput'
import ErrorAlert from './components/ErrorAlert'
import SearchHistory from './components/SearchHistory'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

function App() {
  const [city, setCity] = useState('')
  const [error, setError] = useState(false)
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {

  }, [])

  const handleOnChange = event => {
    setCity(event.target.value)
    setError(false)
  }

  const handleSubmit = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb77ba3879d59e814a56609394606986`)
      .then(res => {
        console.log(res.data)
        setWeatherData(res.data)
      })
      .catch(err => {
        if (err)
          setError(true)
      })
  }

  return (
    <Container className="px-0" fluid>
      <Header />
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
          <SearchHistory />
        </Col>
        <Col sm={8}>
          <WeatherCard {...weatherData} />
        </Col>
      </Row>
      <ForecastCard />
    </Container>
  );
}

export default App;
