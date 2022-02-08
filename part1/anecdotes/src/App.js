import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const length = anecdotes.length;
  const random = Math.floor(Math.random() * length);
  const array = new Array(length);
  for (let i = 0; i < length; i++) array[i] = 0;

  const [selected, setSelected] = useState(random);
  const [points, setPoints] = useState(array);
  const [most, setMost] = useState(0);

  const handleAnecdotes = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVotes = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  if (points[selected] > points[most]) setMost(selected);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="vote" handleClick={handleVotes} />
      <Button handleClick={handleAnecdotes} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[most]}</p>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

export default App;
