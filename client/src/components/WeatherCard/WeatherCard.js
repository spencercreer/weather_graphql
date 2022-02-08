import { Fragment } from 'react'
import { Card, Image, Alert, Spinner } from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    useQuery
  } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  import gql from 'graphql-tag'

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
    location(lat: $lat, lon: $lon){
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

export default function WeatherCard({ location, convertTemp, tempUnit, coords }) {

    const { loading, data } = useQuery(LOCATION_QUERY, {
        variables: { lat: coords.lat, lon: coords.lon }
      })
    
    return (
        <div>Weather</div>
        // <Query query={WEATHER_QUERY} variables={{ lat: coords.lat, lon: coords.lon }}>
        //     {
        //         ({ loading, error, data }) => {
        //             if (loading) {
        //                 return (
        //                     <div style={{ position: 'relative' }}>
        //                         <Spinner animation="border" variant="primary" className="m-3" style={{ position: 'absolute', top: '20px' }} />
        //                         <Card style={{ opacity: '0.5', height: '305px' }} className='mb-2'>
        //                         </Card>
        //                     </div>
        //                 )
        //             }
        //             if (error) console.log(error)

        //             const { current: { humidity, temp, uvi, weather, wind_deg, wind_speed }, timezone_offset } = data.weather

        //             const iconLink = weather[0].icon ? `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png` : 'http://openweathermap.org/img/wn/03n@2x.png'

        //             const windDir = wind_deg - 43 || -43
        //             const windDirStyle = {
        //                 transform: `rotate(${windDir}deg)`,
        //                 display: 'inline-block',
        //                 fontSize: '10px'
        //             };

        //             let uviAlert = ''
        //             if (uvi <= 2)
        //                 uviAlert = 'success'
        //             else if (uvi > 2 && uvi <= 7)
        //                 uviAlert = 'warning'
        //             else
        //                 uviAlert = 'danger'

        //             return (
        //                 <Card style={{ height: '305px' }} className='mb-2'>
        //                     <Body>
        //                         <Text>{moment().utcOffset(timezone_offset / 60).format('LLLL')}</Text>
        //                         <Title>{location?.city}, {location?.country}
        //                             <Image src={iconLink} style={{ display: 'inline-block', height: '60px', width: '60px' }} rounded />
        //                         </Title>
        //                         <Text>{convertTemp(temp) + String.fromCharCode(176)} {tempUnit}</Text>

        //                         <Text>Humidity: {humidity}%</Text>
        //                         <Text><span style={{ marginRight: '3px' }}>Wind Speed: {wind_speed}mph</span><span style={windDirStyle}><i className="fas fa-location-arrow"></i></span></Text>
        //                         <Alert className='p-0' variant={uviAlert}>UV Index: {uvi}</Alert>
        //                     </Body>
        //                 </Card>
        //             )
        //         }
        //     }
        // </Query>
    )
}

WeatherCard.propTypes = {
    location: PropTypes.object,
    convertTemp: PropTypes.func,
    tempUnit: PropTypes.string,
    coords: PropTypes.object
}