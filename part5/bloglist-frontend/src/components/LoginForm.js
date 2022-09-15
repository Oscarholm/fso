import PropTypes from "prop-types";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => (
  <form onSubmit={handleLogin}>
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
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
