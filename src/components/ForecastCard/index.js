import { Row, Col } from 'react-bootstrap'
import DayCard from '../DayCard'

export default function ForecastCard({ daily, locationTime, convertTemp }) {
    let fiveDayForecast = daily.slice(0, 5)
    console.log('Five Day Forecast', fiveDayForecast)
    return (
        <Row>
            {fiveDayForecast.map((forecast, i) => (
                <DayCard
                    key={i}
                    index={i+1}
                    forecast={forecast}
                    locationTime={locationTime}
                    convertTemp={convertTemp}
                />
            ))}
        </Row>
    )
}

ForecastCard.defaultProps = {
    daily: [],
}