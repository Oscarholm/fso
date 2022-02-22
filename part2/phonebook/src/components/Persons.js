import React from "react";
import Person from "./Person";

const Persons = ({ persons, search }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.includes(search))
        .map((person) => (
          <Person name={person.name} number={person.number} key={person.name} />
        ))}
    </div>
  );
};

export default Persons;
