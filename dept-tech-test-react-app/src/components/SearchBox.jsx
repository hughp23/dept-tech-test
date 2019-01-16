import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import * as api from "../api";

class SearchBox extends Component {
  state = {
    cities: [],
    selectedCity: null
  };
  render() {
    const { cities } = this.state;
    return (
      <div>
        <h2>Search Box</h2>
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          //   defaultValue={[colourOptions[4], colourOptions[5]]}
          //   isMulti
          //   value={selectedCity}
          options={cities}
          onChange={this.handleSelect}
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
