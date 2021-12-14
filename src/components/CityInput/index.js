import { InputGroup, FormControl, Button } from 'react-bootstrap'

export default function index() {
    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
            <div className="input-group mb-3">
                <input type="text" id="city-input" className="form-control city-input" placeholder="Search a City" aria-label="City"
                    aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button id="searchBtn" className="btn btn-primary fas fa-search" type="button"></button>
                </div>
            </div>
        </div>
    )
}
