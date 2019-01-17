import React, { Component } from "react";
import * as api from "../api";

const selectedCities = [];

class CardDetails extends Component {
  state = {
    cities: []
  };
  render() {
    const { cities } = this.state;
    return (
      <div>
        <h1>Card Details</h1>
        {cities.map(city => {
          return (
            <div key={city.location}>
              <h4>
                Last Updated{" "}
                {this.getLastUpdated(city.measurements[0].lastUpdated)}
              </h4>
              <h3>{city.location}</h3>
              <p>{`${city.city}, United Kingdom`}</p>
              <h4>
                Values:{" "}
                {city.measurements.map(measurement => {
                  return (
                    <p key={measurement.parameter}>{`${
                      measurement.parameter
                    }: ${measurement.value}`}</p>
                  );
                })}
              </h4>
              <button value={city.location} onClick={this.deleteCard}>
                Delete Card
              </button>
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
    console.log(newCities);
    this.setState({ cities: newCities });
  };

  getLastUpdated = lastUpdated => {
    const d = new Date(lastUpdated);
    const timeInMS = Date.parse(d);
    const date = Date.now();
    const timeLastUpdated = date - timeInMS;
    console.log(timeLastUpdated, "time in milliseconds");
    // const hours =
    return timeLastUpdated;
  };
}

export default CardDetails;
