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
      <h2>create new</h2>
      <form onSubmit={handleRegistration}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="HarryP"
            id="username"
          />
        </div>
        <div>
          name
          <input
            type="name"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
            placeholder="Harry Potter"
            id="name"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="enter password"
            id="password"
          />
        </div>
        <button type="submit" id="submit-button">
          register
        </button>
      </form>
    </div>
  );
};

export default RegForm;
