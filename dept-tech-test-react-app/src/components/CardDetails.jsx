import React, { Component } from "react";
import * as api from "../api";

const selectedCities = [];

class CardDetails extends Component {
  state = {
    cities: []
  };
  render() {
    const { cities } = this.state;
    console.log(cities[0], "cities in render");
    return (
      <div>
        <h1>Card Details</h1>
        {cities.map(city => {
          return <h3 key={city.location}>{city.location}</h3>;
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
}

export default CardDetails;
