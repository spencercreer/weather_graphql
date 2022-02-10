import PropTypes from 'prop-types'

export default function SearchHistory({ history, handleSearch }) {

    const handleOnClick = event => {
        handleSearch(event.target.value)
    }
    return (
        <div className='list-group cityList pl-0'>
            {history.map((city, i) => <button className='list-group-item list-group-item-action pl-0' key={i} onClick={handleOnClick} value={city} >{city}</button>)}
        </div>
    )
}

SearchHistory.propTypes = {
    history: PropTypes.array,
    handleOnClick: PropTypes.func,
}