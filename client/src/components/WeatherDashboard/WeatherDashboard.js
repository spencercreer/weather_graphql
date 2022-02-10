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

const CITY_QUERY = gql`
    query CityQuery($city: String!) {
        city(city: $city) {
            coord {
                lat
                lon
            }
        }
    }
`

const WeatherDashboard = () => {

    const [coords, setCoords] = useState({ lat: 33.4, lon: -112.1 })
    const [city, setCity] = useState('')
    const [searchError, setSearchError] = useState(false)
    const [searchHistory, setSearchHistory] = useState([])
    const [tempUnit, setTempUnit] = useState('F')

    const { data } = useQuery(CITY_QUERY, {
        variables: { city: city }
    })

    if (data) {
        console.log(data)
    }

    useEffect(() => {
        let mounted = true

        if (mounted) {
            //get users geolocation or set coords to Phoenix
            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition((position) => {
                    setCoords({ lat: position.coords.latitude, lon: position.coords.longitude })
                })
            else
                setCoords({ lat: 33.4, lon: -112.1 })

            //local storage search history
            const citySearches = JSON.parse(localStorage.getItem('searchHistory')) || []
            setSearchHistory(citySearches)
        }

        return () => mounted = false
        // const mounted if mounted
        // if geolocation
        setCoords({ lat: 40.8, lon: -111.9 })
        // return mounted
    }, [])


    const handleOnChange = event => {
        setCity(event.target.value)
        setSearchError(false)
    }

    const handleSearch = () => {
        getCoords(city)
        setCity('')
    }
    const handleOnClick = event => {
        getCoords(event.target.value)
    }

    const handleError = () => setSearchError(true)

    const getCoords = (search) => {
        // axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Tempe&appid=cb77ba3879d59e814a56609394606986`)
        //     .then(res => {
        //         // setCoords({ lat: res.data.coord.lat, lon: res.data.coord.lon })
        //         storeCitySearch(res.data.name)
        //     })
        //     .catch(err => {
        //         // if (err)
        //         //     setSearchError(true)
        //     })
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
            // setSearchHistory(searchHistory)
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
        <Container className='px-5' fluid>
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
                        error={searchError}
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
                        convertTemp={convertTemp}
                        tempUnit={tempUnit}
                        handleError={handleError}
                    />
                </Col>
            </Row>
            <ForecastCard
                coords={coords}
                convertTemp={convertTemp}
                tempUnit={tempUnit}
                handleError={handleError}

            />
        </Container>
    );
};

export default WeatherDashboard;
