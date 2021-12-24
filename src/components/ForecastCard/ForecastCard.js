import { Row } from 'react-bootstrap'
import DayCard from '../DayCard/DayCard'
import PropTypes from 'prop-types'

export default function ForecastCard({ daily, locationTime, convertTemp }) {
    let fiveDayForecast = daily.slice(0, 5)
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

ForecastCard.propTypes = {
    daily: PropTypes.array,
    locationTime: PropTypes.object,
    convertTemp: PropTypes.func,
}