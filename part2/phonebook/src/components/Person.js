import React from "react";

const Person = ({ name, number, id, deleteContact }) => {
  return (
    <div>
      {name} {number}
      <button onClick={deleteContact}>delete</button>
    </div>
  );
};

export default Person;
