import { Card, Row, Col, Image } from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

export default function WeatherCard({ location, currentWeather, locationTime, convertTemp }) {

    console.log(currentWeather)
    const weather = currentWeather?.weather || []

    let iconLink = ''
    if (weather.length > 0) {
        iconLink = `http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`
    }

    return (
        <Card>
            <Card.Body>
                <Card.Text>{moment(locationTime).format('LLLL')}</Card.Text>
                <Card.Title>{location?.city}, {location?.country}</Card.Title>
                <Row>
                    <Col xs={2}>
                        <Card.Text>{convertTemp(currentWeather?.temp) + String.fromCharCode(176)} F</Card.Text>
                    </Col>
                    <Col>
                        <Image src={iconLink} style={{ display: "inline-block", height: "50px", width: "50px" }} rounded />
                    </Col>
                </Row>
                <Card.Text>Humidity: {currentWeather?.humidity}%</Card.Text>
                <Card.Text>Wind Speed: {currentWeather?.wind?.speed} mph {currentWeather?.wind?.deg} degrees</Card.Text>
                <Card.Text>UV Index:</Card.Text>
            </Card.Body>
        </Card>
    )
}

WeatherCard.defaultProps = {
    name: "",
    current: {},
    sys: {},
    timezone: 0,
    weather: [],
    wind: {}
}

WeatherCard.propTypes = {
    name: PropTypes.string,
    main: PropTypes.object,
    sys: PropTypes.object,
    timezone: PropTypes.number,
    weather: PropTypes.array,
    wind: PropTypes.object,
}