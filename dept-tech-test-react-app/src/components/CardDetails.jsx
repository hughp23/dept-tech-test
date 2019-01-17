import React, { Component } from "react";
import * as api from "../api";
import "../css/CardDetails.css";

const selectedCities = [];

class CardDetails extends Component {
  state = {
    cities: []
  };
  render() {
    const { cities } = this.state;
    return (
      <div className="cards">
        {/* <h1>Card Details</h1> */}
        {cities.map(city => {
          return (
            <div key={city.location}>
              <div className="card">
                <div className="updateAndButton">
                  <h6 className="updateStatus">
                    LAST UPDATED{" "}
                    {this.getLastUpdated(city.measurements[0].lastUpdated)}
                  </h6>
                  <button
                    className="deleteButton"
                    value={city.location}
                    onClick={this.deleteCard}
                  >
                    <img
                      alt="Delete"
                      src={require("../assests/clear-button.png")}
                    />
                  </button>
                </div>
                <h3 className="location">{city.location}</h3>
                <p className="city">{`${city.city}, United Kingdom`}</p>
                <h4 className="valuesHeader">Values: </h4>
                <div className="values">
                  {city.measurements.map(measurement => {
                    return (
                      <p key={measurement.parameter}>{`${
                        measurement.parameter
                      }: ${measurement.value}`}</p>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const { selectedCity } = this.props;
    if (this.props.selectedCity !== prevProps.selectedCity) {
      selectedCities.push(selectedCity);

      const cityDetails = selectedCities.map(city => {
        return api.getCityData(city).then(async ({ results }) => {
          return results;
        });
      });

      Promise.all(cityDetails).then(results => {
        const merged = [].concat.apply([], results);
        this.setState({ cities: merged });
      });
    }
  }

  deleteCard = event => {
    const { value } = event.target;
    const { cities } = this.state;
    const newCities = cities.filter(city => {
      return city.location !== value;
    });
    this.setState({ cities: newCities });
  };

  getLastUpdated = lastUpdated => {
    const d = new Date(lastUpdated);
    const timeInMS = Date.parse(d);
    const date = Date.now();
    const timeLastUpdated = date - timeInMS;
    const hours = Math.floor(timeLastUpdated / 3600000);
    const days = Math.floor(timeLastUpdated / 86400000);
    if (hours < 24 && hours > 1) {
      return `${hours} HOURS AGO`;
    } else if (hours === 1) {
      return `AN HOUR AGO`;
    } else if (hours < 1) {
      return "LESS THAN AN HOUR AGO";
    } else if (hours / 24 < 7) {
      return `${days} DAYS AGO`;
    } else if (days === 1) {
      return `A DAY AGO`;
    }
  };
}

export default CardDetails;
