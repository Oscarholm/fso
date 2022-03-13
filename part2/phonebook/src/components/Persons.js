import React from "react";
import Person from "./Person";

const Persons = ({ persons, search, deleteContact }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.includes(search))
        .map((person) => (
          <Person
            name={person.name}
            number={person.number}
            key={person.id}
            deleteContact={() => deleteContact(person.id)}
            id={person.id}
          />
        ))}
    </div>
  );
};

export default Persons;
