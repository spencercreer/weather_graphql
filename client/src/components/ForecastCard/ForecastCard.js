import { Row, Spinner } from 'react-bootstrap'
import DayCard from '../DayCard/DayCard'
import moment from 'moment'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const FORECAST_QUERY = gql`
    query ForecastQuery($lat: Float!, $lon: Float!) {
        weather(lat: $lat, lon: $lon) {
        timezone_offset
        daily {
            temp {
                min
                max
            }
            humidity
            uvi
            wind_speed
            wind_deg
            weather {
                icon
            }
        }
    }
}
`

export default function ForecastCard({ locationTime, convertTemp, tempUnit, coords }) {

    return (
        <Query query={FORECAST_QUERY} variables={{ lat: coords.lat, lon: coords.lon }}>
            {
                ({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <Spinner animation="border" variant="primary" className="m-3" style={{ opacity: '0.5' }} />
                        )
                    }
                    if (error) console.log(error)

                    console.log(data)
                    const { daily, timezone_offset } = data.weather

                    let fiveDayForecast = daily.slice(0, 5)
                    return (
                        <Row>
                            {fiveDayForecast.map((forecast, i) => (
                                <DayCard
                                    key={i}
                                    index={i + 1}
                                    forecast={forecast}
                                    locationTime={moment().utcOffset(timezone_offset / 60)}
                                    convertTemp={convertTemp}
                                    tempUnit={tempUnit}
                                    loading={loading}
                                />
                            ))}
                        </Row>
                    )
                }
            }
        </Query>
    )
}

ForecastCard.defaultProps = {
    forecastData: [],
}

ForecastCard.propTypes = {
    coords: PropTypes.object,
    locationTime: PropTypes.object,
    convertTemp: PropTypes.func,
    tempUnit: PropTypes.string,
}