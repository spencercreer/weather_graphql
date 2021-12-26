import { Row } from 'react-bootstrap'
import DayCard from '../DayCard/DayCard'
import PropTypes from 'prop-types'

export default function ForecastCard({ forecastData, locationTime, convertTemp }) {
    console.log(forecastData)
    let fiveDayForecast = forecastData.slice(0, 5)
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
    forecastData: [],
}

ForecastCard.propTypes = {
    forecastData: PropTypes.array,
    locationTime: PropTypes.object,
    convertTemp: PropTypes.func,
}