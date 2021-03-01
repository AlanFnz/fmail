const express = require("express");
const path = require("path");
const morgan = require('morgan');

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('foo');
});

app.get("/emails", (req, res) => {
  const emails = [
    {
      id: "1",
      subject: "My subject",
      isImportant: true,
      body:
        "This is my email, and it is super long so that we are forced to cut it short in the inbox view",
      timestamp: Date.now() + 1001,
    },
    {
      id: "2",
      subject: "My subject 2",
      isImportant: true,
      body:
        "This is my email, and it is super long so that we are forced to cut it short in the inbox view",
      timestamp: Date.now() + 1002,
    },
    {
      id: "3",
      subject: "My subject 3",
      isImportant: true,
      body:
        "This is my email, and it is super long so that we are forced to cut it short in the inbox view",
      timestamp: Date.now() + 1003,
    },
  ];
  res.json(emails);
});

module.exports = app;
