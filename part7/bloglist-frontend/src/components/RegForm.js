import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotifications } from "../reducers/notificationReducer";
import userServices from "../services/users";

const RegForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const userObject = {
      username,
      name,
      password,
    };
    try {
      await userServices.newUser(userObject);
      setUsername("");
      setPassword("");
      setName("");
      dispatch(setNotifications("User created!"));
    } catch (err) {
      dispatch(setNotifications("failed to create user"));
    }
  };

  return (
    <div>
      <Typography variant="h6">create new</Typography>
      <form onSubmit={handleRegistration}>
        <div>
          <TextField
            label="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            id="regUsername"
          />
        </div>
        <div>
          <TextField
            label="full name"
            type="name"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
            placeholder="Harry Potter"
            id="name"
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="enter password"
            id="regPassword"
          />
        </div>
        <Button variant="contained" type="submit" id="submit-button">
          register
        </Button>
      </form>
    </div>
  );
};

export default RegForm;
