import React, { Component } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import CardDetails from "./components/CardDetails";
// import * as api from "./api";

class App extends Component {
  state = {
    selectedCity: null
  };
  render() {
    const { selectedCity } = this.state;
    return (
      <div className="App">
        <h1>Compare your Air</h1>
        <SearchBox selectCity={this.selectCity} />
        <CardDetails selectedCity={selectedCity} />
      </div>
    );
  }

  // componentDidMount() {
  //   api.getCities().then(data => {
  //     console.log(data);
  //   });
  // }

  selectCity = selectedCity => {
    this.setState({ selectedCity });
  };
}

export default App;
