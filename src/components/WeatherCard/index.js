import { Card, Row, Col, Image } from 'react-bootstrap'

export default function WeatherCard({ name, weather, wind }) {

    const iconLink = `http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Temperature: F</Card.Text>
                <Card.Text>Humidity: %</Card.Text>
                <Card.Text>Wind Speed: {wind?.speed} mph {wind?.deg} degrees</Card.Text>
                <Card.Text>UV Index:</Card.Text>
                <Image src={iconLink} style={{ display: "inline-block", height: "200px", width: "200px" }} rounded />
            </Card.Body>
        </Card>
    )
}

WeatherCard.defaultProps = {
    name: "",
    weather: [],
    wind: {}
}
