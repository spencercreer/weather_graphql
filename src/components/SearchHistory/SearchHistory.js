export default function SearchHistory({ history, handleOnClick }) {
    return (
        <div className="list-group cityList pl-0">
            {history.map((city, i) => <button className="list-group-item list-group-item-action pl-0" key={i} onClick={handleOnClick} value={city} >{city}</button>)}
        </div>
    )
}
