const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

// Services and utils
const emailService = require("./lib/services").emailService;
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
app.get(
  "/api/v1/inbox-emails",
  catchExceptions(async (req, res) => {
    res.json([]);
  })
);

app.get(
  "/api/v1/important-emails",
  catchExceptions(async (req, res) => {
    res.json([]);
  })
);

app.get(
  "/api/v1/sent-emails",
  catchExceptions(async (req, res) => {
    const email = await emailService.getSentEmails();
    res.json(email);
  })
);

app.get(
  "/api/v1/draft-emails",
  catchExceptions(async (req, res) => {
    res.json([]);
  })
);

app.post(
  "/api/v1/emails",
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
