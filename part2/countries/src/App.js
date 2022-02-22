import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Components/Filter";
import Countries from "./Components/Countries";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearch = (event) => setSearch(event.target.value);

  const handleShow = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <Filter
        title="search countries "
        handleFunction={handleSearch}
        search={search}
      />
      <Countries
        countries={countries}
        search={search}
        handleShow={handleShow}
      />
    </div>
  );
}

export default App;
