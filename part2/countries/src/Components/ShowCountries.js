import React from "react";

const ShowCountries = ({ countries, handleShow }) => {
  return countries.map((country) => (
    <div key={country.name.common}>
      {country.name.common}
      <button type="button" value={country.name.common} onClick={handleShow}>
        show
      </button>
    </div>
  ));
};

export default ShowCountries;
