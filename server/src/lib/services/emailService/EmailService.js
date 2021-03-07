class EmailService {
  constructor(EmailModel) {
    this.EmailModel = EmailModel;
  };

  createEmail = (recipients, subject, message) => {
    const type = "outgoing"
    return new this.EmailModel({ recipients, subject, message, type }).save();
  };

  getSentEmails = () => {
    return this.EmailModel.find({
      $or: [{ type: "outgoing" }, { type: "sent" }]
    });
  };

};

module.exports = EmailService;
