import React from 'react'

export default function index() {
    return (
        <div className="input-group mb-3">
            <input type="text" id="city-input" className="form-control city-input" placeholder="Search a City" aria-label="City"
                aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button id="searchBtn" className="btn btn-primary fas fa-search" type="button"></button>
                </div>
        </div>
    )
}
