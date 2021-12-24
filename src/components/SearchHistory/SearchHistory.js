export default function SearchHistory({ history }) {
    return (
        <div>
            {history.map(city => <div className="list-group cityList pl-0">{city}</div>)}
        </div>
    )
}
