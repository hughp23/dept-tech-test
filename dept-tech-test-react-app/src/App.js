import React, { Component } from "react";
import "./css/App.css";
import SearchBox from "./components/SearchBox";
import CardDetails from "./components/CardDetails";

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

  selectCity = selectedCity => {
    this.setState({ selectedCity });
  };
}

export default App;
