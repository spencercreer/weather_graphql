import { InputGroup, FormControl, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function CityInput({ city, handleOnChange, handleSearch }) {
    const handleKeyUp = event => {
        if (event.keyCode === 13) {
            handleSearch()
        }
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
            />
            <Button
                id='search-btn'
                className='fas fa-search'
                variant='outline-primary'
                onClick={handleSearch}
            />
        </InputGroup>
    )
}

CityInput.propTypes = {
    handleOnChange: PropTypes.func,
    handleSubmit: PropTypes.func,
}