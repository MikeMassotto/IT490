import React from "react";
import { types as Rabbit } from "../util/rabbit";
import Axios from "axios";
import Select from 'react-select';

const GamePackForm = ({username}) => {
  const [pack_name, setPack] = React.useState(null);

  const sendPackReq = () => {
    Axios.post('http://localhost:3001/userReqest', pack_name)
      .then((res) => {
      });
  };

  return (
    <div>
    </div>
  );
};

export default GamePackForm;