import { useSelector, useDispatch } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((a) => a.content.includes(state.filter));
  });

  const sortedAnecdotes = [...anecdotes].sort((a, b) =>
    a.votes > b.votes ? -1 : 1
  );
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    const message = `you voted '${anecdote.content}'`;
    dispatch(incrementVotes(anecdote));
    dispatch(notify(message, 5));
  };

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                handleVote(anecdote);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
