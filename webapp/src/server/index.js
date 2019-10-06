const express = require('express');
const os = require('os');

const adafruitAPI = require("./adafruitAPI.js")

const app = express();

app.use(express.static('dist'));
app.post('/api/setVacationMode', (req, res) => {
  console.log("vacation mode value ")
  console.log(req.body)
  adafruitAPI.setVacationMode(req.body.value)
})
app.get('/api/getFeedData', (req, res) => {
  adafruitAPI.getFeedData().then((feedData) => {
    res.send(feedData)
  })
  // promises.push(new Promise(resolve => {
  //   request(baseURL + "/feeds/homeostasis.outdoor-temperature/data", {
  //     json: true,
  //     headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY }
  //   }, (error, response, body) => {
  //     resolve(Math.round(parseFloat(body[0].value)))
  //   })
  // }))
  //
  // Promise.all(promises).then((results) => {
  //   let [internalTemperature, externalTemperature] = results
  //   res.send({
  //     username: internalTemperature,
  //     externalTemperature: externalTemperature
  //   })
  // })
  // request(baseURL + "/feeds/homeostasis.temperature/data", {
  //   json: true,
  //   headers: { "X-AIO-Key": process.env.ADAFRUIT_IO_KEY }
  // }, (error, response, body) => {
  //   console.log(body)
  //   res.send({
  //     username: Math.round(parseFloat(body[0].value))
  //   })
  // })
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
