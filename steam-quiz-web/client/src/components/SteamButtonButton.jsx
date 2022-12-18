import React from 'react';
import axios from 'axios';

const SteamLoginButton = () => {
  const handleLogin = () => {
    // Make a POST request to the /api/auth/steam route
    axios.get('http://localhost:3001/api/auth/steam')
      .then(response => {
        // Use the user data to create a session in your frontend
        const user = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <button onClick={handleLogin}>Login with Steam</button>
  );
}

export default SteamLoginButton;