const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const redis = require('redis');
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const { emailRoutes, userRoutes } = require("./routes");

// App
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

app.disable("x-powered-by");

let redisClient = redis.createClient({
  host: 'localhost',
  port: 6123,
  password: 'my secret',
  db: 1,
})
redisClient.unref()
redisClient.on('error', console.log)

app.use(
  session({
    store: new RedisStore(redisClient),
    secret: process.env.SESSION_SECRET || "secret",
    name: "session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      maxAge: 3600000, // 60 * 60 * 1000
      httpOnly: true,
      secure: false //TODO: enable when we are on https
    }
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "dist")));
app.use("/", emailRoutes, userRoutes);

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ error: error.message });
});

module.exports = app;
