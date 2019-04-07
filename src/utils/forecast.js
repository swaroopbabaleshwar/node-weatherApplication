const req = require('request')

const forecast = (lattitude, longitude, callback) => {
    console.log(lattitude, longitude)
    const url = `https://api.darksky.net/forecast/8f908b1bc2fa2606afcaecd6470c9933/${lattitude},${longitude}`;
    req({ url: url, json: true }, (error, response) => {
        console.log(error)
        if(error) {
            callback(error)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
            // console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast;