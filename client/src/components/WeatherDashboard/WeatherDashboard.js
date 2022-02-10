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

const COORDS_QUERY = gql`
    query CityCoordsQuery($city: String!) {
        cityCoords(city: $city) {
            coord {
                lat
                lon
            }
        }
    }
`

const WeatherDashboard = () => {

    // const [coords, setCoords] = useState({ lat: 33.4, lon: -112.1 })
    const [city, setCity] = useState('Phoenix')
    const [searchError, setSearchError] = useState(false)
    const [searchHistory, setSearchHistory] = useState([])
    const [tempUnit, setTempUnit] = useState('F')

    useEffect(() => {
        let mounted = true

        if (mounted) {
            //     //get users geolocation or set coords to Phoenix
            //     if (navigator.geolocation)
            //         navigator.geolocation.getCurrentPosition((position) => {
            //             setCoords({ lat: position.coords.latitude, lon: position.coords.longitude })
            //         })
            //     else
            //         setCoords({ lat: 33.4, lon: -112.1 })

            //local storage search history
            const citySearches = JSON.parse(localStorage.getItem('searchHistory')) || []
            setSearchHistory(citySearches)
        }

        return () => mounted = false
    }, [])

    const { data, loading } = useQuery(COORDS_QUERY, {
        variables: { city: city }
    })

    if (loading) return <h1>Loading...</h1>

    const coords = { lat: data.cityCoords.coord.lat, lon: data.cityCoords.coord.lon }

    const handleSearch = (city) => {
        setCity(city)
        storeCitySearch(city)
    }

    const handleError = () => setSearchError(true)

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
                        handleSearch={handleSearch}
                    />
                    <ErrorAlert
                        // location={location}
                        error={searchError}
                    />
                    <SearchHistory
                        history={searchHistory}
                        handleSearch={handleSearch}
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
