import { Col, Card, Image, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import moment from 'moment'

const { Title, Body, Text } = Card

export default function DayCard({ index, forecast, locationTime, convertTemp, tempUnit, loading }) {

    // if (loading) {
    //     return (
    //         <Col md className='px-1'>
    //             <Card>
    //                 <div style={{ height: '311px' }}>
    //                 </div>
    //             </Card>
    //         </Col>
    //     )
    // }

    const windDir = forecast?.wind_deg - 43 || -43
    const styles = {
        transform: `rotate(${windDir}deg)`,
        display: 'inline-block',
        fontSize: '10px',
    };

    const iconLink = forecast?.weather[0]?.icon ? `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png` : 'http://openweathermap.org/img/wn/03n.png'

    let uviAlert = ''
    const uvi = forecast?.uvi || 0
    if (uvi <= 2)
        uviAlert = 'success'
    else if (uvi > 2 && uvi <= 7)
        uviAlert = 'warning'
    else
        uviAlert = 'danger'

    return (
        <Col md className='px-1'>
            <Card>
                <Body>
                    <Title>{moment(locationTime).add(index, 'days').format('dddd')}</Title>
                    <Text>{convertTemp(forecast?.temp.min)}/{convertTemp(forecast?.temp.max) + String.fromCharCode(176)} {tempUnit}
                        <Image src={iconLink} style={{ display: 'inline-block', height: '35px', width: '35px' }} rounded />
                    </Text>
                    <Text>Humidity: {forecast?.humidity}%</Text>
                    <Text>Wind: {forecast?.wind_speed}mph  <span style={styles}><i className="fas fa-location-arrow"></i></span>
                    </Text>
                    <Alert className='p-0' variant={uviAlert}>UV Index: {uvi}</Alert>
                </Body>
            </Card>
        </Col>
    )
}

DayCard.defaultProps = {
    forecast: {},
}

DayCard.propTypes = {
    index: PropTypes.number,
    forecast: PropTypes.object,
    locationTime: PropTypes.object,
    convertTemp: PropTypes.func,
    tempUnit: PropTypes.string,
}