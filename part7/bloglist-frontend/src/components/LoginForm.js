import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import RegForm from "./RegForm";
import Togglable from "./Togglable";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const registrationRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Log in to application</h2>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
      <p>Not registered?</p>
      <Togglable id="register" buttonLabel="Register" ref={registrationRef}>
        <RegForm />
      </Togglable>
    </div>
  );
};

export default LoginForm;
