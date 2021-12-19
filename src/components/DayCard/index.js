import { Card, Image } from 'react-bootstrap'

export default function DayCard() {
    return (
        <Card>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    <div className="wday1"></div>
                    <div className="day1 m-0"></div>
                    <div className="tempF px-2">Temperature: convert to F</div>
                    <div className="humidity px-2">Humidity: %</div>
                    <div className="wind px-2">Wind Speed: mph degrees</div>
                    <div className="uvIndex rounded px-2">UV Index:</div>
                </Card.Text>
                <Image style={{ display: "inline-block", height: "200px", width: "200px" }} rounded />
                <div className="card-text maxDay1 text-center"></div>
                <div className="card-text minDay1 text-center"></div>
                <div className="card-text humDay1 text-center"></div>
            </Card.Body>
        </Card>
    )
}