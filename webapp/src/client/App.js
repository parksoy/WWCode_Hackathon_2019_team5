import React, { Component } from 'react';
import './app.css';
import LogoImage from './logo.png';

export default class App extends Component {
  state = { username: null };

  fetchData() {
    console.log("fetching data...")
    fetch('/api/getFeedData')
      .then(res => res.json())
      .then(data => this.setState({
        indoorTemperature: data.indoorTemperature,
        outdoorTemperature: data.outdoorTemperature,
        indoorHumidity: data.indoorHumidity,
        outdoorAirQuality: data.outdoorAirQuality,
        targetTemperature: data.targetTemperature,
        vacationMode: data.vacationMode,
        windowState: data.windowState
      }));
  }

  handleVacationClick() {
    let value = this.state.vacationMode == 1 ? "0" : "1"
    fetch("/api/setVacationMode?value=" + value, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({value: value})
    }).then(res => this.fetchData())
  }

  // 2 degrees above target: Open
  // 1 degree above target: Close

  calculateTempClass(value, reference) {
    const delta = 3
    let tempClass = "medium-temp"
    if (value > reference + 3) {
      tempClass = "hot-temp"
    } else if (value < reference - 3) {
      tempClass = "cool-temp"
    }

    return tempClass
  }

  componentDidMount() {
    setInterval(this.fetchData.bind(this), 10000)
    this.fetchData()
  }

  render() {
    const { outdoorTemperature, indoorTemperature, targetTemperature,
      indoorHumidity, outdoorAirQuality, vacationMode } = this.state;

    const indoorTempClass = this.calculateTempClass(indoorTemperature, targetTemperature)
    const outdoorTempClass = this.calculateTempClass(outdoorTemperature, targetTemperature)
    const doorStatus = "Open"
    const vacayToggleStr = vacationMode == "1" ? "Off" : "On"

    return (
      <div>
        <header><img className="Logo" src={LogoImage} alt="logo" /></header>
        <div className="container">
          <div className="row">
            <div className="three columns">
              &nbsp;
            </div>
            <div className="six columns Controls">
              <h1 className="Target">
                <a className="LeftControl" href="#">&lt;</a>
                <span className="TargetValue medium-temp">
                  {targetTemperature ? `${targetTemperature}\u00b0` : "..."}
                </span>
                <a className="RightControl" href="#">&gt;</a>
              </h1>
            </div>
            <div className="three columns Status">
              <h4>{outdoorAirQuality ? `Air Quality ${outdoorAirQuality}` : "..."}</h4>
              <button className="primary-button" onClick={this.handleVacationClick.bind(this)}>Turn {vacayToggleStr} Vacation Mode</button>
            </div>
          </div>
          <div className="row">
            <div className="two columns">&nbsp;</div>
            <div className="three columns Indoor">
              <h5 className="secondary">Indoors</h5>
              {indoorTemperature ? <h1 className={indoorTempClass}>{`${indoorTemperature}\u00b0`}</h1> : <h1>...</h1>}
              <h5 className="secondary">{indoorHumidity ? `Humidity ${indoorHumidity}%` : "..."}</h5>
            </div>
            <div className="two columns DoorStatus"><h5>{doorStatus}</h5></div>
            <div className="three columns Outdoor">
              &nbsp;
            </div>
            <div className="two columns">
            <h5 className="secondary">Outdoors</h5>
            {outdoorTemperature ? <h1 className={outdoorTempClass}>{`${outdoorTemperature}\u00b0`}</h1> : <h1>...</h1>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
