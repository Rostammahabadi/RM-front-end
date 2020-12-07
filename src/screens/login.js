import React, { useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../context";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { setToken, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  function handleSubmit(email, password) {
    Axios.post("http://localhost:3000/api/v1/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        setToken(response.data["data"]["user"]["token"]);
        setIsLoggedIn(true);
        localStorage.setItem("token", response.data["data"]["user"]["token"]);
      })
      .catch((e) => {
        setError(e.response.data.data.user.errors);
      });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(email, password);
      }}
    >
      <label>
        Email:
        <input
          type="text"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <input type="submit" value="Submit" />
      <div>{error ? <p>{error}</p> : null}</div>
    </form>
  );
};

export default Login;
