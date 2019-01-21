import React, { Component } from "react";
import * as api from "../api";
import "../css/CardDetails.css";
import { getLastUpdated } from "../utils";

class CardDetails extends Component {
  state = {
    cities: [],
    selectedCities: []
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
                    LAST UPDATED {getLastUpdated(city.measurements)}
                  </h6>
                  <button
                    className="deleteButton"
                    value={city.location}
                    onClick={this.deleteCard}
                  >
                    <img
                      className="deleteImage"
                      alt="Delete"
                      src={require("../assets/clear-button.svg")}
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
      const cityDetails = api.getCityData(selectedCity).then(({ results }) => {
        return results;
      });

      Promise.all([cityDetails]).then(results => {
        const { cities } = this.state;
        let merged;
        if (cities.length) {
          merged = [...cities, ...results[0]];
          this.setState({ cities: merged });
        } else merged = [...results[0]];
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
    this.setState({ cities: newCities, selectedCities: [] });
  };
}

export default CardDetails;
