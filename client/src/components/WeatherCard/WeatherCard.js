import { Card, Image, Alert, Spinner } from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

export default function WeatherCard({ location, currentWeather, locationTime, convertTemp, tempUnit, loading }) {

    let styles = loading ? { opacity: '0.5' } : null

    const windDir = currentWeather?.wind_deg - 43 || -43
    const windDirStyle = {
        transform: `rotate(${windDir}deg)`,
        display: 'inline-block',
        fontSize: '10px'
    };

    const iconLink = currentWeather?.weather[0]?.icon ? `http://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@2x.png` : 'http://openweathermap.org/img/wn/03n@2x.png'

    let uviAlert = ''
    const uvi = currentWeather?.uvi || 0
    if (uvi <= 2)
        uviAlert = 'success'
    else if (uvi > 2 && uvi <= 7)
        uviAlert = 'warning'
    else
        uviAlert = 'danger'

    return (
        <div style={{position: 'relative'}}>
            {loading && <Spinner animation="border" variant="primary" className="m-3" style={{position: 'absolute', top: '20px'}} />}
            <Card style={styles} className='mb-2'>
                <Card.Body>
                    <Card.Text>{moment(locationTime).format('LLLL')}</Card.Text>
                    <Card.Title>{location?.city}, {location?.country}
                        <Image src={iconLink} style={{ display: 'inline-block', height: '60px', width: '60px' }} rounded />
                    </Card.Title>
                    <Card.Text>{convertTemp(currentWeather?.temp) + String.fromCharCode(176)} {tempUnit}</Card.Text>

                    <Card.Text>Humidity: {currentWeather?.humidity}%</Card.Text>
                    <Card.Text><span style={{ marginRight: '3px' }}>Wind Speed: {currentWeather?.wind_speed}mph</span><span style={windDirStyle}><i className="fas fa-location-arrow"></i></span></Card.Text>
                    <Alert className='p-0' variant={uviAlert}>UV Index: {uvi}</Alert>
                </Card.Body>
            </Card>
        </div>
    )
}

WeatherCard.propTypes = {
    location: PropTypes.object,
    currentWeather: PropTypes.object,
    locationTime: PropTypes.object,
    convertTemp: PropTypes.func,
    tempUnit: PropTypes.string,
    loading: PropTypes.bool
}