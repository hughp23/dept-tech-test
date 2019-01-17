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
        {cities.map(city => {
          return (
            <div key={city.location}>
              <div className="card">
                <div className="updateAndButton">
                  <h6 className="updateStatus">
                    LAST UPDATED {this.getLastUpdated(city.measurements)}
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
                <p className="city">in {`${city.city}, United Kingdom`}</p>
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

  getLastUpdated = updateTimes => {
    const timeInMSArray = updateTimes.map(time => {
      const d = new Date(time.lastUpdated);
      return Date.parse(d);
    });
    const timeInMS = Math.max(...timeInMSArray);
    const date = Date.now();
    const timeLastUpdated = date - timeInMS;
    const hours = Math.floor(timeLastUpdated / 3600000);
    const days = Math.floor(timeLastUpdated / 86400000);
    const weeks = Math.floor(timeLastUpdated / 604800000);
    const months = Math.floor(timeLastUpdated / 2592000000);
    const years = Math.floor(timeLastUpdated / 31104000000);
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
    } else if (weeks === 1) {
      return " A WEEK AGO";
    } else if (weeks >= 2 && weeks <= 4) {
      return `${weeks} WEEKS AGO`;
    } else if (months === 1) {
      return "A MONTH AGO";
    } else if (months >= 2 && months <= 11) {
      return `${months} MONTHS AGO`;
    } else if (years === 1) {
      return "A YEAR AGO";
    } else if (years >= 1) {
      return `${years} YEARS AGO`;
    }
  };
}

export default CardDetails;
