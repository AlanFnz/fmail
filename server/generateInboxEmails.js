const mongoose = require("mongoose");
const EmailModel = require("./src/lib/services/emailService/EmailModel");

const uri = 'mongodb+srv://dbuser:test1234@cluster0.pnuxa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const promises = [];

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed sem fringilla, pulvinar quam at, scelerisque mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sollicitudin est turpis, sit amet bibendum sem euismod non. Etiam fermentum leo consectetur rhoncus suscipit. Pellentesque blandit vestibulum hendrerit. Quisque est lorem, facilisis ut ornare eget, hendrerit cursus eros. Morbi interdum cursus mattis. Vivamus ut tellus eros. Aenean eu eros lobortis, feugiat ligula ac, dapibus enim. Aenean scelerisque, tellus eget sodales faucibus, felis magna venenatis lorem, nec imperdiet ligula quam quis felis. Ut orci purus, euismod eget arcu sed, interdum cursus tellus. Donec semper turpis cursus ante interdum, in rhoncus nunc consectetur. Suspendisse sed lorem interdum lorem laoreet aliquam in lobortis eros. Aliquam id dui non augue volutpat aliquam nec quis nulla. Vestibulum ac nulla id ligula rutrum laoreet. Nam consequat id metus nec interdum. Ut quis mattis orci, non elementum ipsum. Duis sit amet quam sed mauris tempus volutpat. Duis finibus elit vel ligula molestie, at pellentesque neque consectetur. Etiam ipsum metus, volutpat nec lacus quis, laoreet maximus nunc. Aliquam sollicitudin orci sed posuere suscipit. Nulla ac lectus in neque vehicula faucibus in vel justo. Aliquam erat volutpat. Curabitur velit enim, venenatis et nulla nec, mattis lobortis massa. Integer non blandit eros. Duis et fringilla libero, quis rhoncus risus. Vivamus non turpis tortor. In et erat turpis. In fermentum ligula in elit tempus, id blandit elit venenatis. Donec posuere, arcu molestie tincidunt accumsan, tellus odio molestie libero, in aliquam tellus lorem sit amet ante. In quis pretium est, sit amet fermentum diam. Cras pellentesque ultrices nisi ac posuere. Vivamus consectetur scelerisque elementum. Fusce a risus et massa pellentesque volutpat ut vitae justo. Aliquam luctus ac dolor ut rutrum.'

for (let i = 0; i < 30; i++) {
  const recipients = ['test@fmail.com'];
  const subject = 'The subject';
  const message = lorem;
  const type = 'received';
  const email = new EmailModel({ recipients, subject, message, type });
  promises.push(email.save());
};

Promise.all(promises).then(emails => {
  console.log(`Created ${emails.length} emails`);
  process.exit(0);
});
