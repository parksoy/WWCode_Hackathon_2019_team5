const request = require('request')
const baseURL = "https://io.adafruit.com/api/v2/mabmierau"

const lat = 45.5051
const lng = -122.6750

function getOutsideTemperature() {
  return new Promise(resolve => {
    const requestURL = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${lng}`
    request(requestURL, {json: true}, (error, res, body) => {
      let currentData = body.currently
      console.log("Received temperature " + currentData.temperature)
      resolve(parseFloat(currentData.temperature))
    })
  })
}

function getAirQuality() {
  return new Promise(resolve => {
    const requestURL = `https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_KEY}`
    console.log(requestURL)
    request(requestURL, {json: true}, (error, res, body) => {
      let currentData = body.data[0]
      resolve(currentData.aqi)
    })
  })
}

function publishTemperature(value) {
  return new Promise(resolve => {
    const requestURL = baseURL + "/feeds/homeostasis.outdoor-temperature/data?limit=1";
    console.log(requestURL)
    const options = {
      url: requestURL,
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY },
      formData: { value: value }
    }
    request.post(options, (error, res, body) => {
      resolve()
    })
  })
}

function publishAirQuality(value) {
  return new Promise(resolve => {
    const requestURL = baseURL + "/feeds/homeostasis.outdoor-air-quality/data?limit=1";
    console.log(requestURL)
    const options = {
      url: requestURL,
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY },
      formData: { value: value }
    }
    request.post(options, (error, res, body) => {
      resolve()
    })
  })
}

function main() {
  getOutsideTemperature().then(result => {
    publishTemperature(result).then(() => {
      console.log("Done writing temperature " + result)
    })
  })
  getAirQuality().then(result => {
    publishAirQuality(result).then(() => {
      console.log("Done writing air quality: " + result)
    })
  })
}

main()
