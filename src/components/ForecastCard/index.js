import { Row, Col } from 'react-bootstrap'
import DayCard from '../DayCard'

export default function ForecastCard() {
    return (
        <Row>
            <Col md>
                <DayCard />
            </Col>
            <Col md>
                <DayCard />
            </Col>
            <Col md>
                <DayCard />
            </Col>
            <Col md>
                <DayCard />
            </Col>
            <Col md>
                <DayCard />
            </Col>
        </Row>
    )
}
