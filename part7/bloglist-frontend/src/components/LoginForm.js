import { Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../reducers/userReducer";
import RegForm from "./RegForm";
import Togglable from "./Togglable";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const registrationRef = useRef();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Typography variant="h6">Log in to application</Typography>
        <div>
          <TextField
            label="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            id="login-button"
          >
            Login
          </Button>
        </div>
      </form>
      <p>Not registered?</p>
      <Togglable id="register" buttonLabel="Register" ref={registrationRef}>
        <RegForm />
      </Togglable>
    </div>
  );
};

export default LoginForm;
