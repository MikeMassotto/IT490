import { useState, useEffect } from "react";
import { types as Rabbit } from "../util/rabbit";
import axios from "axios";

function FriendList({ username }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = {
        username: username,
        request: Rabbit.user.get_friends,
      };

      const response = await axios.post(
        "http://localhost:3001/api/userRequest",
        data
      );
      setFriends(response.data["friends"]);
    }

    fetchData();
  }, []);

  return (
    <div>
      <b>{username}'s Friends</b>
      <ul>
        {friends.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;
