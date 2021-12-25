import React from "react";

const Header = (props) => {
  return <h1>{props.courseName}</h1>;
};

const Part = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

const Content = (props) => {
  const parts = props.parts;
  return (
    <div>
      <Part name={parts[0].name} number={parts[0].number} />
      <Part name={parts[1].name} number={parts[1].number} />
      <Part name={parts[2].name} number={parts[2].number} />
    </div>
  );
};

const Total = (props) => {
  var sum = 0;
  for (const item of props.parts) {
    sum += item.number;
  }
  return <p>Number of exercises - {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        number: 10,
      },
      {
        name: "Using props to pass data",
        number: 7,
      },
      {
        name: "State of a component",
        number: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
