const axios = require('axios');
const { GraphQLObjectType, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql')

const Weather = new GraphQLObjectType({
    name: 'Weather',
    fields: () => ({
        timezone_offset: { type: GraphQLInt },
        current: { type: CurrentForecast },
        daily: { type: new GraphQLList(DailyForecast) }
    })
})

const CurrentForecast = new GraphQLObjectType({
    name: 'CurrentForecast',
    fields: () => ({
        temp: { type: GraphQLFloat },
        humidity: { type: GraphQLInt },
        uvi: { type: GraphQLFloat },
        wind_speed: { type: GraphQLFloat },
        wind_deg: { type: GraphQLInt },
        weather: { type: new GraphQLList(WeatherIcon) }
    })
})

const DailyForecast = new GraphQLObjectType({
    name: 'DailyForecast',
    fields: () => ({
        temp: { type: DailyTemp },
        humidity: { type: GraphQLInt },
        wind_speed: { type: GraphQLFloat },
        wind_deg: { type: GraphQLInt },
        weather: { type: new GraphQLList(WeatherIcon) },
        uvi: { type: GraphQLFloat },
    })
})

const DailyTemp = new GraphQLObjectType({
    name: 'DailyTemp',
    fields: () => ({
        min: { type: GraphQLFloat },
        max: { type: GraphQLFloat }
    })
})

const WeatherIcon = new GraphQLObjectType({
    name: 'WeatherIcon',
    fields: () => ({
        icon: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        weather: {
            type: Weather,
            args: {
                lat: { type: GraphQLInt },
                lon: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${args.lat}&lon=${args.lon}&appid=cb77ba3879d59e814a56609394606986`)
                    .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})