import React from "react";
import Axios from "axios";
import SteamLoginButton from "./SteamButtonButton";

const Login = () => {
  const [user, setUser] = React.useState(null);

  const sendLoginReq = () => {
    Axios.post('http://localhost:3001/login', user)
      .then((res) => {
        if (res.data.success) {
          // Save the session information in the client's browser
          window.localStorage.setItem('loggedIn', true);
          window.localStorage.setItem('username', user.username);
          window.localStorage.setItem('passwordHashed', user.passwordHashed);

          console.log('Logged in successfully');
        } else {
          console.log('Error logging in');
        }
      });
  };

  return (
    <div className="w-32 mx-auto flex flex-col">
        <label for="uname">Username</label>
        <input
          className="bg-gray-300"
          type="text"
          id="uname"
          name="uname"
          placeholder="Username"
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
          }}
        />
        <label for="psw">Password</label>
        <input
          className="bg-gray-300"
          type="password"
          id="psw"
          name="psw"
          placeholder="Password"
          required
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
        />
        <button
          onClick={sendLoginReq}
          className="my-3 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
          <SteamLoginButton />
    </div>
  );
};

export default Login;
