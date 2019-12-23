const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3f1188bb131662894dfdb150cb896d32/' + latitude + ',' + longitude + '?units=si';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather api', undefined);
        }
        else if (body.error) {
            callback("unable to find location", undefined);
        }
        else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out.There is a ${body.currently.precipProbability * 100}% chance of rain`);
        }
    })
}
module.exports = forecast;