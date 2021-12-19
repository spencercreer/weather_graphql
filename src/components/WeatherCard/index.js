import { Card, Row, Col, Image } from 'react-bootstrap'
import moment from 'moment'

export default function WeatherCard({ name, main, sys, locationTime, weather, wind, convertTemp }) {

    console.log(locationTime)

    let iconLink = ''
    if (weather.length > 0) {
        iconLink = `http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`
    }

    return (
        <Card>
            <Card.Body>
                <Card.Text>{moment(locationTime).format('LLLL')}</Card.Text>
                <Card.Title>{name}, {sys?.country}</Card.Title>
                <Card.Text>Temperature: {convertTemp(main?.temp) + String.fromCharCode(176)} F</Card.Text>
                <Card.Text>Humidity: {main?.humidity}%</Card.Text>
                <Card.Text>Wind Speed: {wind?.speed} mph {wind?.deg} degrees</Card.Text>
                <Card.Text>UV Index:</Card.Text>
                <Image src={iconLink} style={{ display: "inline-block", height: "200px", width: "200px" }} rounded />
            </Card.Body>
        </Card>
    )
}

WeatherCard.defaultProps = {
    name: "",
    main: {},
    sys: {},
    timezone: 0,
    weather: [],
    wind: {}
}
