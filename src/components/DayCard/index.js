import { Col, Card, Image } from 'react-bootstrap'
import moment from 'moment'

export default function DayCard({ index, forecast, convertTemp }) {
    console.log(forecast)
    return (
        <Col md>
            <Card>
                <Card.Body>
                    <Card.Title>{moment().add(index + 1, 'days').format('LL')}</Card.Title>
                    <Card.Text>Max. Temperature: {convertTemp(forecast?.temp.max) + String.fromCharCode(176)} F</Card.Text>
                    <Card.Text>Min. Temperature: {convertTemp(forecast?.temp.min) + String.fromCharCode(176)} F</Card.Text>
                    <Card.Text>Humidity: %</Card.Text>
                    <Card.Text>Wind Speed: mph degrees</Card.Text>
                    <Card.Text></Card.Text>
                    <Image style={{ display: "inline-block", height: "20px", width: "20px" }} rounded />
                </Card.Body>.
            </Card>
        </Col>
    )
}

DayCard.defaultProps = {
    forecast: {},
}