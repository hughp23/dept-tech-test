import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import * as api from "../api";
import "../css/SearchBox.css";

class SearchBox extends Component {
  state = {
    cities: [],
    selectedCity: null
  };
  render() {
    const { cities } = this.state;
    return (
      <div className="searchBox">
        <Select
          className="selectDropDown"
          closeMenuOnSelect={false}
          components={makeAnimated()}
          options={cities}
          onChange={this.handleSelect}
          placeholder="Enter city name..."
        />
      </div>
    );
  }

  componentDidMount() {
    api.getCities().then(data => {
      const cities = data.results.map(result => {
        return { value: result.city.toLowerCase(), label: result.city };
      });
      this.setState({ cities });
    });
  }

  handleSelect = event => {
    const { selectCity } = this.props;
    const { label } = event;
    selectCity(label);
  };
}

export default SearchBox;
