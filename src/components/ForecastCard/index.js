export default function ForecastCard() {
    return (
        <div className="card text-white bg-primary mb-3">
            <div className="card-header text-center pb-0">
                <h5 className="wday1"></h5>
                <h5 className="day1 m-0"></h5>
                <img className="weatherIcon1" />
            </div>
            <div className="card-body">
                <p className="card-text maxDay1 text-center"></p>
                <p className="card-text minDay1 text-center"></p>
                <p className="card-text humDay1 text-center"></p>
            </div>
        </div>
    )
}
