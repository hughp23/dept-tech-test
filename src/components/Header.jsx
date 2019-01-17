import React from "react";
import "../css/Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1 className="mainHeader">Compare your Air</h1>
      <h3 className="subHeader">
        Compare the air quality between cities in the UK
      </h3>
      <h3 className="subHeader">
        Select cities to compare using the search tool below
      </h3>
    </div>
  );
};

export default Header;
