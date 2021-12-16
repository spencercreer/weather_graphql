import Header from './components/Header'
import CityInput from './components/CityInput'
import ErrorAlert from './components/ErrorAlert'
import SearchHistory from './components/SearchHistory'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import { Container, Row, Col } from 'react-bootstrap'
import search from './utils/api'
import axios from 'axios'

let city = 'Phoenix'

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb77ba3879d59e814a56609394606986`)
.then(({data}) => {
  console.log(data)
})
.catch(err => console.log(err))

function App() {
  return (
    <Container className="px-0" fluid>
      <Header />
      <Row>
        <Col sm={4}>
          <CityInput />
          <ErrorAlert />
          <SearchHistory />
        </Col>
        <Col sm={8}>
          <WeatherCard />
        </Col>
      </Row>
      <Row>
        <Col md>
          <ForecastCard />
        </Col>
        <Col md>
          <ForecastCard />
        </Col>
        <Col md>
          <ForecastCard />
        </Col>
        <Col md>
          <ForecastCard />
        </Col>
        <Col md>
          <ForecastCard />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
