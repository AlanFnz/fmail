const mongoose = require("mongoose");
const EmailModel = require("./src/lib/services/emailService/EmailModel");

const uri = 'mongodb+srv://dbuser:test1234@cluster0.pnuxa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const promises = [];

for (let i = 0; i < 30; i++) {
  const recipients = ['test@fmail.com'];
  const subject = 'The subject';
  const message = 'Buy this thing that will make you happy instead of knowing yourself!';
  const type = 'received';
  const isSpam = true;
  const email = new EmailModel({ recipients, subject, message, type, isSpam });
  promises.push(email.save());
};

Promise.all(promises).then(emails => {
  console.log(`Created ${emails.length} emails`);
  process.exit(0);
});