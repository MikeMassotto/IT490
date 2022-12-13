import express from 'express';
import cors from 'cors';
import { StreamChat } from 'stream-chat';
import bcrypt from 'bcrypt';

import * as rabbit from './rabbit.js';

const app = express();

app.use(cors());
app.use(express.json());

const api_key = "pv5nh9adqmbd";
const api_secret = "99udkqms5uteg7ccdac53cu4rq7wfbmwe3sgqp74q5hzszt3s5cz2jq7dqs664qa";

const serverClient = StreamChat.getInstance(api_key, api_secret);

const data = {
  type: rabbit.types.user.get_username_from_id,
  user_id: "45"
};
rabbit.send( "steamTagQueue", data ).then((response) => {
  console.log(response);
  });


app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    res.json({ username, hashedPassword });

    var data = {
      type: "new_user",
      username: username,
      password: password
    };

    rabbit.send("steamTagQueue", data).then((response) => {
      console.log(response);
      // Authenticate the user with bcrypt
      if( bcrypt.compareSync("guest", response['hash']) ) {
        console.log("Authenticated with ID: " + response['id']);
      }
    });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  res.json({ username, hashedPassword });

  var data = {
    type: 'login',
    username: username,
  };

  rabbit.send("steamTagQueue", data).then((response) => {
    console.log(response);
    if( bcrypt.compareSync(password, response['hash']) ) {
      console.log("Authenticated with ID: " + response['id']);
      res.json = { status: 'success', id: response['id'] };
    }
  });
});


app.post("/game", async (req, res) => {
  const { type, username, password } = req.body;
  res.json({ username, hashedPassword });

  var data = {
    type: type,
    username: password,
  };

  rabbit.send("steamTagQueue", data).then((response) => {
    console.log(response);
    if( bcrypt.compareSync(password, response['hash']) ) {
      console.log("Authenticated with ID: " + response['id']);
      res.json = { status: 'success', id: response['id'] };
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});