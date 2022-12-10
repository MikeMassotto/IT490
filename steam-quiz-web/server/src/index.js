import express from 'express';
import cors from 'cors';
import { StreamChat } from 'stream-chat';
import bcrypt from 'bcrypt';

import * as rabbit from './rabbit.js';

const app = express();

app.use(cors());
app.use(express.json());

var data = {
type: "ping"
};

rabbit.send("steamTagQueue", data).then((response) => {
  console.log(response);
});

const api_key = "pv5nh9adqmbd";
const api_secret = "99udkqms5uteg7ccdac53cu4rq7wfbmwe3sgqp74q5hzszt3s5cz2jq7dqs664qa";

const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    res.json({ username, hashedPassword });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});