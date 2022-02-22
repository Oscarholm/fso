import React from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  const languages = Object.entries(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <ul>
        {languages.map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" width="150" />
      <h1>Weather in {country.capital}</h1>
      <Weather lat={country.latlng[0]} lon={country.latlng[1]} />
    </div>
  );
};

export default Country;
