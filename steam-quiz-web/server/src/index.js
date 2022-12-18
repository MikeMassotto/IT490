import express from "express";
import session from "express-session";
import passport from "passport";
import passprtSteam from "passport-steam";
import cors from "cors";
import { StreamChat } from "stream-chat";
import bcrypt from "bcrypt";

// import "./game.js";
// import { Rabbit } from "./rabbit.js";

var SteamStrategy = passprtSteam.Strategy;

const app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(
  session({
    secret: "d31c51f4-687b-4ff3-a31f-ce96f47c88bd",
    resave: false,
    saveUninitialized: false,
  })
);

const api_key = "pv5nh9adqmbd";
const api_secret =
  "99udkqms5uteg7ccdac53cu4rq7wfbmwe3sgqp74q5hzszt3s5cz2jq7dqs664qa";

const serverClient = StreamChat.getInstance(api_key, api_secret);

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
// Initiate Strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:" + 5173 + "/api/auth/steam/return",
      realm: "http://localhost:" + 5173 + "/",
      apiKey: "7E93DCA49A64743A0B3815833308A199",
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);
app.use(
  session({
    secret: "d31c51f4-687b-4ff3-a31f-ce96f47c88bd",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/auth/steam", passport.authenticate("steam"), (req, res) => {
  // Return user data as JSON
  res.json(req.user);
});
app.get(
  "/api/auth/steam/return",
  passport.authenticate("steam"),
  (req, res) => {
    // Return user data as JSON
    res.json(req.user);
  }
);

// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//   // res.json({ username, hashedPassword });

//   var data = {
//     type: "new_user",
//     username: username,
//     password: hashedPassword,
//   };

//   Rabbit.sendRequest(data).then((response) => {
//     console.log(response);
//     if (response == "succ") {
//       res.json({ username, status: "success" });
//     }
//   });
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   //res.json({ username, hashedPassword });

//   var data = {
//     type: "login",
//     username: username,
//   };

//   Rabbit.sendRequest(data).then((response) => {
//     console.log(Object.entries(response));
//     if (response["hash"] == null) {
//       res.json({ success: false });
//       return;
//     }

//     if (bcrypt.compareSync(password, response["hash"])) {
//       console.log("Authenticated with ID: " + response["id"]);
//       req.session.loggedIn = true;
//       req.session.username = username;
//       req.session.password = password;
//       res.json({ success: true, username, id: response["id"] });
//     } else {
//       res.json({ success: false });
//     }
//   });
// });

app.get("/game", async (req, res) => {
  if (req.session.loggedIn) {
    // The user is logged in, so you can access their session values
    const username = req.session.username;
    const password = req.session.password;
  } else {
    // The user is not logged in, so redirect them to the login page
    res.redirect("/login");
  }
});

app.post("/api/userRequest", async (req, res) => {
  const { username, request } = req.body;
  console.log(req.body);
  res.json({
    friends: ["friend1", "friend2", "friend3", "friend4", "friend5"]
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
