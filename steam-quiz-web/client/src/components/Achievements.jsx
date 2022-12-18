import React from "react";
import Axios from "axios";
import { types as Rabbit } from "../util/rabbit";

const Achievements = ({ username }) => {

    data = {
      username: username,
      request: Rabbit.user.get_achievements,
    };

    Axios.post("http://localhost:3001/api/userRequest", data).then((res) => {
      console.log(res.data);
    });


  return <div></div>;
};
  
export default Achievements;