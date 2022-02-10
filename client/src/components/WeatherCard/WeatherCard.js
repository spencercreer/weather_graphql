import { Fragment } from 'react'
import { Card, Image, Alert, Spinner } from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';

const { Title, Body, Text } = Card

const WEATHER_QUERY = gql`
  query WeatherQuery($lat: Float!, $lon: Float!) {
    weather(lat: $lat, lon: $lon){
      timezone_offset
      current {
        temp
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
const LOCATION_QUERY = gql`
  query LocationQuery($lat: Float!, $lon: Float!) {
    location(lat: $lat, lon: $lon) {
      results {
        locations {
          adminArea1
          adminArea3
          adminArea5
        }
      }
    }
  }
`

export default function WeatherCard({ convertTemp, tempUnit, coords, handleError }) {

  const { loading: weatherLoading, data: weatherData, error: weatherError } = useQuery(WEATHER_QUERY, {
    variables: { lat: coords.lat, lon: coords.lon }
  })

  const { loading: locationLoading, data: locationData, error: locationError, } = useQuery(LOCATION_QUERY, {
    variables: { lat: coords.lat, lon: coords.lon }
  })
  
  if (weatherError || locationError) {
    handleError()
    return null
  }

  if (locationData) {
    var country = locationData.location.results[0].locations[0].adminArea1
    var state = locationData.location.results[0].locations[0].adminArea3
    var city = locationData.location.results[0].locations[0].adminArea5
  }

  if (weatherData) {
    console.log(weatherData)
    var { current: { humidity, temp, uvi, weather, wind_deg, wind_speed }, timezone_offset } = weatherData.weather
    var iconLink = weather[0].icon ? `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png` : 'http://openweathermap.org/img/wn/03n@2x.png'
    var windDir = wind_deg - 43 || -43
    var windDirStyle = {
      transform: `rotate(${windDir}deg)`,
      display: 'inline-block',
      fontSize: '10px'
    };
    var uviAlert = ''
    if (uvi <= 2)
      uviAlert = 'success'
    else if (uvi > 2 && uvi <= 7)
      uviAlert = 'warning'
    else
      uviAlert = 'danger'
  }

  if (weatherLoading || locationLoading) {
    return (
      <div style={{ position: 'relative' }}>
        <Spinner animation="border" variant="primary" className="m-3" style={{ position: 'absolute', top: '20px' }} />
        <Card style={{ opacity: '0.5', height: '305px' }} className='mb-2'>
        </Card>
      </div>
    )
  }

  return (
    <Card style={{ height: '305px' }} className='mb-2'>
      <Body>
        <Text>{moment().utcOffset(timezone_offset / 60).format('LLLL')}</Text>
        <Title>{city}, {country}
          <Image src={iconLink} style={{ display: 'inline-block', height: '60px', width: '60px' }} rounded />
        </Title>
        <Text>{convertTemp(temp) + String.fromCharCode(176)} {tempUnit}</Text>

        <Text>Humidity: {humidity}%</Text>
        <Text><span style={{ marginRight: '3px' }}>Wind Speed: {wind_speed}mph</span><span style={windDirStyle}><i className="fas fa-location-arrow"></i></span></Text>
        <Alert className='p-0' variant={uviAlert}>UV Index: {uvi}</Alert>
      </Body>
    </Card>
  )
}

WeatherCard.propTypes = {
  convertTemp: PropTypes.func,
  tempUnit: PropTypes.string,
  coords: PropTypes.object,
  handleError: PropTypes.func,
}