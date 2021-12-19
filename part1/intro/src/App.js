import React from "react";

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const App = () => {
  const name = "Anni";
  const age = 30;
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Oscar" age={19 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
};

export default App;
