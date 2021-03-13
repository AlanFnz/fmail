const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

// Services and utils
const emailService = require("./lib/services").emailService;
const validateIncomingEmail = require("./lib/services/emailService/validateIncomingEmail");
const validateIncomingImportantRequest = require("./lib/services/emailService/validateIncomingImportantRequest");
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
    const emails = await emailService.getInboxEmails();
    res.json(emails);
  })
);

app.get(
  "/api/v1/emails/:emailId",
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const email = await emailService.getEmail(emailId);
    const now = Date.now();
    await emailService.setEmailToViewed(emailId, now);
    res.json(email);
  })
);

app.get(
  "/api/v1/important-emails",
  catchExceptions(async (req, res) => {
    const emails = await emailService.getImportantEmails();
    res.json(emails);
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
  "/api/v1/email-overview",
  catchExceptions(async (req, res) => {
    const emailOverview = await emailService.getEmailOverview();
    res.json(emailOverview);
  })
);

app.get(
  "/api/v1/draft-emails",
  catchExceptions(async (req, res) => {
    const draftEmails = await emailService.getDraftEmails();
    res.json(draftEmails);
  })
);

app.get(
  "/api/v1/spam-emails",
  catchExceptions(async (req, res) => {
    const spamEmails = await emailService.getSpamEmails();
    res.json(spamEmails);
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

app.post(
  "/api/v1/emails/:emailId/important",
  validateIncomingImportantRequest,
  catchExceptions(async (req, res) => {
    const { emailId } = req.params;
    const { isImportant } = req.body;
    const email = await emailService.setEmailAsImportant(emailId, isImportant);
    res.json(email);
  })
);

app.post(
  "/api/v1/draft-emails",
  catchExceptions(async (req, res) => {
    const { recipients, subject, message } = req.body;
    const email = await emailService.createDraftEmail(recipients, subject, message);
    res.json(email);
  })
);

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

module.exports = app;
