import { InputGroup, FormControl, Button } from 'react-bootstrap'

export default function CityInput({ handleOnChange, handleSubmit }) {
    return (
            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    id="city-input"
                    placeholder="Search City"
                    onChange={handleOnChange}
                />
                <div className="input-group-append">
                    <Button
                        id="search-btn"
                        className="fas fa-search"
                        variant="outline-primary"
                        onClick={handleSubmit}
                    />
                </div>
            </InputGroup>
    )
}
