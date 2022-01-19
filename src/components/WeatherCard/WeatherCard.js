import { Card, Row, Col, Image } from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

export default function WeatherCard({ location, currentWeather, locationTime, convertTemp, tempUnit }) {

    const iconLink = currentWeather?.weather[0]?.icon ? `http://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@2x.png`: ''

    return (
        <Card>
            <Card.Body>
                <Card.Text>{moment(locationTime).format('LLLL')}</Card.Text>
                <Card.Title>{location?.city}, {location?.country}
                    <Image src={iconLink} style={{ display: 'inline-block', height: '60px', width: '60px' }} rounded />
                </Card.Title>
                <Card.Text>{convertTemp(currentWeather?.temp) + String.fromCharCode(176)} {tempUnit}</Card.Text>

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