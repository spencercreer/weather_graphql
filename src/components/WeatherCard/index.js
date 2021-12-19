import { Card, Row, Col, Image } from 'react-bootstrap'

export default function WeatherCard({ name, weather, wind }) {

    const iconLink = `http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <Row>
                    <Col sm={6}>
                        <div className="city px-2"></div>
                        <div className="currentDay px-2"></div>
                        <div className="currentDate px-2"></div>
                        <div className="tempF px-2">Temperature: convert to F</div>
                        <div className="humidity px-2">Humidity: %</div>
                        <div className="wind px-2">Wind Speed: {wind?.speed}mph {wind?.deg}degrees</div>
                        <div className="uvIndex rounded px-2">UV Index:</div>
                    </Col>
                    <Col sm={6}>
                    <Image src={iconLink} style={{ display: "inline-block", height: "200px", width: "200px" }} rounded />
                        {/* <img className="icon mx-auto d-block img-fluid"  /> */}
                    </Col>

                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

WeatherCard.defaultProps = {
    name: "",
    weather: [],
    wind: {}
}
