import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import { setNotes } from "../reducers/noteReducer";
import NewNote from "./NewNote";
import Notes from "./Notes";
import noteService from "../services/notes";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
