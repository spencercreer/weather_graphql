import { Col, Card, Image } from 'react-bootstrap'
import moment from 'moment'

export default function DayCard({ index, forecast, locationTime, convertTemp }) {
    console.log(forecast)
    return (
        <Col md>
            <Card>
                <Card.Body>
                    <Card.Title>{moment(locationTime).add(index, 'days').format('dddd')}</Card.Title>
                    <Card.Text>{convertTemp(forecast?.temp.max)}/{convertTemp(forecast?.temp.min) + String.fromCharCode(176)} F</Card.Text>
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