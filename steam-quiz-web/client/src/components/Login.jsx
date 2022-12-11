import React from "react";
import Axios from "axios";

const Login = () => {
  const [user, setUser] = React.useState(null);
  const SendLoginReq = () => {
    Axios.post("http://localhost:3001/register", user).then((res) => {
      const { username, passwordHahsed } = res.data;

      console.log(res.data);
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
          onClick={SendLoginReq}
          className="my-3 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
    </div>
  );
};

export default Login;
