import { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function CityInput({ handleSearch }) {
    const [city, setCity] = useState('')

    const handleOnChange = event => {
        setCity(event.target.value)
    }
    
    const handleKeyUp = event => {
        if (event.keyCode === 13) {
            handleSearch(city)
            setCity('')
        }
    }

    const handleSubmit = () => {
        handleSearch(city)
        setCity('')
    }

    return (
        <InputGroup className='mb-3'>
            <FormControl
                type='text'
                id='city-input'
                placeholder='Search City'
                value={city}
                onChange={handleOnChange}
                onKeyUp={handleKeyUp}
                onBlur={handleSubmit}
            />
            <Button
                id='search-btn'
                className='fas fa-search'
                variant='outline-primary'
                onClick={handleSubmit}
            />
        </InputGroup>
    )
}

CityInput.propTypes = {
    city: PropTypes.string,
    handleOnChange: PropTypes.func,
    handleSubmit: PropTypes.func,
}