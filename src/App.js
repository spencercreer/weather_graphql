import Header from './components/Header'
import CityInput from './components/CityInput'
import SearchHistory from './components/SearchHistory'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  return (
    <Container className="px-0" fluid>
      <Header />
      <Row>
        <Col sm={4}>
          <CityInput />
          <SearchHistory />
        </Col>
        <Col sm={8}>
          <WeatherCard />
        </Col>
      </Row>
      <Row>
        <Col sm>
          <ForecastCard />
        </Col>
        <Col sm>
          <ForecastCard />
        </Col>
        <Col sm>
          <ForecastCard />
        </Col>
        <Col sm>
          <ForecastCard />
        </Col>
        <Col sm>
          <ForecastCard />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
