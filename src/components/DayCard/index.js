import { Card, Image } from 'react-bootstrap'
import moment from 'moment'

export default function DayCard({ day }) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{moment().add(day, 'days').format('LL')}</Card.Title>
                <Card.Text>Max. Temperature: F</Card.Text>
                <Card.Text>Min. Temperature: F</Card.Text>
                <Card.Text>Humidity: %</Card.Text>
                <Card.Text>Wind Speed: mph degrees</Card.Text>
                <Card.Text></Card.Text>            
                <Image style={{ display: "inline-block", height: "20px", width: "20px" }} rounded />
            </Card.Body>
        </Card>
    )
}