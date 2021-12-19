import { Row, Col } from 'react-bootstrap'
import DayCard from '../DayCard'

export default function ForecastCard() {
    return (
        <Row>
            <Col md>
                <DayCard day={1}/>
            </Col>
            <Col md>
                <DayCard day={2} />
            </Col>
            <Col md>
                <DayCard day={3} />
            </Col>
            <Col md>
                <DayCard day={4} />
            </Col>
            <Col md>
                <DayCard day={5} />
            </Col>
        </Row>
    )
}
