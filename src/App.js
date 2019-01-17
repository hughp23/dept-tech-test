import React, { Component } from "react";
import "./css/App.css";
import SearchBox from "./components/SearchBox";
import CardDetails from "./components/CardDetails";
import Header from "./components/Header";

class App extends Component {
  state = {
    selectedCity: null
  };
  render() {
    const { selectedCity } = this.state;
    return (
      <div className="App">
        <Header classname="header" />
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
