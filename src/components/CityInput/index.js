import { InputGroup, FormControl, Button } from 'react-bootstrap'

export default function index() {
    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    id="city-input"
                    placeholder="Search a City"
                />
                <div className="input-group-append">
                    <Button
                        variant="outline-primary"
                        id="searchBtn"
                        className="fas fa-search"
                    />
                </div>
            </InputGroup>
        </>
    )
}
