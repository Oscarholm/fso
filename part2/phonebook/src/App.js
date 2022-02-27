import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import AddContact from "./components/AddContact";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    var entry = persons.filter((person) => person.name === newName);
    if (entry.length === 0) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject);
      setPersons(persons.concat(personObject));
    } else if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const changedPerson = { ...entry[0], number: newNumber };
      personService
        .update(entry[0].id, changedPerson)
        .then(
          setPersons(
            persons.map((person) =>
              person.id !== changedPerson.id ? person : changedPerson
            )
          )
        );
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteContact = (id) => {
    const result = window.confirm(
      `Are you sure you want to delete the contact with id ${id}?`
    );
    if (result) {
      console.log(`deleting ${id}`);
      personService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => setSearch(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        search={search}
        title="filter shown with "
        handleFunction={handleSearch}
      />
      <h2>Add a new contact</h2>
      <AddContact
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        search={search}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
