import React from "react";
import Country from "./Country";
import ShowCountries from "./ShowCountries";

const Countries = ({ countries, search, handleShow }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  const length = filteredCountries.length;

  if (length > 10) return <div>Too many matches, specify another filter</div>;
  else if (length > 1) {
    return (
      <ShowCountries countries={filteredCountries} handleShow={handleShow} />
    );
  } else if (length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else return <div>Nothing to show</div>;
};

export default Countries;
