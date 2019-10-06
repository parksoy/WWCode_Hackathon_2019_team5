const request = require('request');

const baseURL = "https://io.adafruit.com/api/v2/mabmierau"

function getIndoorTemperature() {
  return new Promise(resolve => {
    request(baseURL + "/feeds/homeostasis.temperature/data?limit=1", {
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY }
    }, (error, response, body) => {
      resolve(Math.round(parseFloat(body[0].value)))
    })
  })
}

function getOutdoorTemperature() {
  return new Promise(resolve => {
    request(baseURL + "/feeds/homeostasis.outdoor-temperature/data?limit=1", {
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY }
    }, (error, response, body) => {
      resolve(Math.round(parseFloat(body[0].value)))
    })
  })
}

function getIndoorHumidity() {
  return new Promise(resolve => {
    request(baseURL + "/feeds/homeostasis.humidity/data?limit=1", {
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY }
    }, (error, response, body) => {
      resolve(Math.round(parseFloat(body[0].value)))
    })
  })
}

function getOutdoorAirQuality() {
  return new Promise(resolve => {
    request(baseURL + "/feeds/homeostasis.outdoor-air-quality/data?limit=1", {
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY }
    }, (error, response, body) => {
      resolve(Math.round(parseFloat(body[0].value)))
    })
  })
}

function getTargetTemperature() {
  return new Promise(resolve => {
    request(baseURL + "/feeds/homeostasis.target-temperature/data?limit=1", {
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY }
    }, (error, response, body) => {
      resolve(Math.round(parseFloat(body[0].value)))
    })
  })
}

function getVacationMode() {
  return new Promise(resolve => {
    request(baseURL + "/feeds/homeostasis.vacation-mode/data?limit=1", {
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY }
    }, (error, response, body) => {
      resolve(Math.round(parseFloat(body[0].value)))
    })
  })
}

function getWindowState() {
  return new Promise(resolve => {
    request(baseURL + "/feeds/homeostasis.window-state/data?limit=1", {
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY }
    }, (error, response, body) => {
      resolve(Math.round(parseFloat(body[0].value)))
    })
  })
}

module.exports = {
  setVacationMode: function(value) {
    const requestURL = baseURL + "/feeds/homeostasis.vacation-mode/data";
    console.log(requestURL)
    const options = {
      url: requestURL,
      json: true,
      headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY },
      formData: { value: value }
    }
    request.post(options, (error, res, body) => {
      console.log('finished post')
    })
  },
  getFeedData: function() {
    return new Promise(resolve => {
      let promises = []
      promises.push(getIndoorTemperature())
      promises.push(getOutdoorTemperature())
      promises.push(getIndoorHumidity())
      promises.push(getOutdoorAirQuality())
      promises.push(getTargetTemperature())
      promises.push(getVacationMode())
      promises.push(getWindowState())
      Promise.all(promises).then((results) => {
        let [indoorTemperature, outdoorTemperature, indoorHumidity,
          outdoorAirQuality, targetTemperature, vacationMode, windowState] = results
        resolve({
          indoorTemperature: indoorTemperature,
          outdoorTemperature: outdoorTemperature,
          indoorHumidity: indoorHumidity,
          outdoorAirQuality: outdoorAirQuality,
          targetTemperature: targetTemperature,
          vacationMode: vacationMode,
          windowState: windowState
        })
      })
    })
  }
}
