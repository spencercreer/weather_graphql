import axios from 'axios'

const search = (query) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=cb77ba3879d59e814a56609394606986`)
}

export default search