import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // increaseVotes was replaced by initializeVotes -> setAnecdotes. Cleaner, but better?
    // increaseVotes(state, action) {
    //   const id = action.payload;
    //   const anecdoteToChange = state.find((a) => a.id === id);
    //   const updatedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1,
    //   };
    //   return state.map((a) => (a.id !== id ? a : updatedAnecdote));
    // },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { increaseVotes, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = (content) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const incrementVotes = (anecdote) => {
  return async (dispatch) => {
    await anecdoteServices.vote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(initializeAnecdotes());
  };
};

export default anecdoteSlice.reducer;
