import { Fragment, useState, useEffect } from 'react'
import CityInput from '../CityInput/CityInput'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import SearchHistory from '../SearchHistory/SearchHistory'
import WeatherCard from '../WeatherCard/WeatherCard'
import ForecastCard from '../ForecastCard/ForecastCard'
import { Container, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'

import {
    useQuery
} from '@apollo/client';
import gql from 'graphql-tag'

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
const WeatherDashboard = () => {
    const [coords, setCoords] = useState({ lat: 33.4, lon: -112.1 })

    const [city, setCity] = useState('')
    const [location, setLocation] = useState({ country: 'US', state: 'AZ', city: 'Phoenix' })
    const [error, setError] = useState(false)
    const [forecastData, setForeCastData] = useState({})
    const [searchHistory, setSearchHistory] = useState([])
    const [tempUnit, setTempUnit] = useState('F')
    const [loading, setLoading] = useState(true)
    
    const {   data } = useQuery(LOCATION_QUERY, {
        variables: { lat: 113, lon: 12 }
    })
    console.log(data)


    useEffect(() => {
        axios.get(`https://www.mapquestapi.com/geocoding/v1/reverse?key=4vnji15LY55BpLWMGKkSMcsBGz5hkuAM&location=${coords[0]},${coords[1]}&includeRoadMetadata=true&includeNearestIntersection=true`)
          .then(res => {
            setLocation({
              country: res.data.results[0].locations[0].adminArea1,
              state: res.data.results[0].locations[0].adminArea3,
              city: res.data.results[0].locations[0].adminArea5,
            })
          })
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&appid=cb77ba3879d59e814a56609394606986`)
          .then(res => {
            setForeCastData(res.data)
            setLoading(false)
          })
          .catch(err => {
            if (err)
              setError(true)
          })
    }, [coords])

    const handleOnChange = event => {
        setCity(event.target.value)
        setError(false)
    }

    const handleSearch = () => {
        getCoords(city)
        setCity('')
    }

    const handleOnClick = event => {
        // setLoading(true)
        getCoords(event.target.value)
    }

    const getCoords = (search) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=cb77ba3879d59e814a56609394606986`)
            .then(res => {
                setCoords({ lat: res.data.coord.lat, lon: res.data.coord.lon })
                storeCitySearch(res.data.name)
            })
            .catch(err => {
                if (err)
                    setError(true)
            })
    }

    const storeCitySearch = (city) => {
        //check search history to ensure it is not a duplicate
        let found = searchHistory.find(x => x === city)
        if (!found) {
            //store city search in local storage
            searchHistory.unshift(city)
            if (searchHistory.length > 6) {
                searchHistory.pop()
            }
            setSearchHistory(searchHistory)
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        }
    }

    const handleUnitChange = () => {
        const newTempUnit = tempUnit === 'F' ? 'C' : 'F'
        setTempUnit(newTempUnit)
    }

    const convertTemp = (tempK) => {
        let convertedTemp

        if (tempUnit === 'F') {
            convertedTemp = (tempK - 273.15) * 1.80 + 32;
        } else if (tempUnit === 'C') {
            convertedTemp = (tempK - 273.15)
        }

        return convertedTemp.toFixed()
    }

    return (
        <Container className='px-5' fluid><div>Hello</div>
            <Form>
                <Form.Switch
                    label={`${String.fromCharCode(176)}${tempUnit}`}
                    onChange={handleUnitChange}
                />
            </Form>
            <Row>
                <Col sm={4}>
                    <CityInput
                        city={city}
                        handleOnChange={handleOnChange}
                        handleSearch={handleSearch}
                    />
                    <ErrorAlert
                        // location={location}
                        error={error}
                    />
                    <SearchHistory
                        history={searchHistory}
                        handleOnClick={handleOnClick}
                    />
                </Col>
                <Col sm={8} className='px-1'>
                    <WeatherCard
                        coords={coords}
                        // location={location}
                        currentWeather={forecastData?.current}
                        convertTemp={convertTemp}
                        tempUnit={tempUnit}
                    // loading={loading}
                    />
                </Col>
            </Row>
            <ForecastCard
                coords={coords}
                convertTemp={convertTemp}
                tempUnit={tempUnit}
            />
        </Container>
    );
};

export default WeatherDashboard;
