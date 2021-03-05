const http = require("http");
const fs = require("fs");
const app = require("./src/app");
const mongoose = require('mongoose');

require("dotenv").config();

// Database Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

// Start
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);



