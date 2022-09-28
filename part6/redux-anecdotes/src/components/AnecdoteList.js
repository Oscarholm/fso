import { useSelector, useDispatch } from "react-redux";
import { increaseVotes } from "../reducers/anecdoteReducer";
import {
  resetNotification,
  updateNotification,
} from "../reducers/notificationReducer";

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
  //anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1));
  const dispatch = useDispatch();

  const handleVote = (content, id) => {
    const message = `you voted '${content}'`;
    dispatch(increaseVotes(id));
    dispatch(updateNotification(message));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
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
                handleVote(anecdote.content, anecdote.id);
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
