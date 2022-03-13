import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import AddContact from "./components/AddContact";
import personService from "./services/persons";
import Notification from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setErrorMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage("We've encountered an error");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...entry[0], number: newNumber };
        personService
          .update(entry[0].id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : changedPerson
              )
            );
            setErrorMessage(`Updated ${entry[0].name}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage("We've encountered an error!");
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
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
      personService.remove(id).then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
        setErrorMessage("Contact has been deleted");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
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
      <Notification message={errorMessage} />
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
