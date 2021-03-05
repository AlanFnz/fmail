const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

// Services and utils
const emailService = require ("./lib/services").emailService;
const validateIncomingEmail = require("./lib/services/emailService/validateIncomingEmail");
const catchExceptions = require("./lib/utils/catchExceptions");

// App
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("foo");
});

// Endpoints
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
      isImportant: false,
      body:
        "This is my email, and it is super long so that we are forced to cut it short in the inbox view",
      timestamp: Date.now() + 1002,
    },
    {
      id: "3",
      subject: "My subject 3",
      isImportant: false,
      body:
        "This is my email, and it is super long so that we are forced to cut it short in the inbox view",
      timestamp: Date.now() + 1003,
    },
  ];
  res.json(emails);
});

app.post(
  "/emails",
  validateIncomingEmail,
  catchExceptions(async (req, res) => {
    const { recipients, subject, message } = req.body;
    const email = await emailService.createEmail(recipients, subject, message);
    res.json(email);
  })
);

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

module.exports = app;
