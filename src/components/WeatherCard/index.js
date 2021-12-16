export default function WeatherCard() {
    return (
        <div className="card col-12 px-0">
            <div className="card-body py-1">
                <div className="row">
                    <div className="col-sm-6 px-0">
                        <h2 className="city px-2"></h2>
                        <h5 className="currentDay px-2"></h5>
                        <h5 className="currentDate px-2"></h5>
                        <p className="tempF px-2"></p>
                        <p className="humidity px-2"></p>
                        <p className="wind px-2"></p>
                        <p className="uvIndex rounded px-2"></p>
                    </div>
                    <div className="col-sm-6 p-0">
                        <img className="icon mx-auto d-block img-fluid" style={{display: "inline-block", height: "200px", width: "200px"}} />
                    </div>
                </div>
            </div>
        </div>
    )
}
