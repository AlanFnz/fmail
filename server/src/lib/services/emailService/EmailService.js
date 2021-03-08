class EmailService {
  constructor(EmailModel) {
    this.EmailModel = EmailModel;
  };

  createEmail = (recipients, subject, message) => {
    const type = "outgoing"
    return new this.EmailModel({ recipients, subject, message, type }).save();
  };

  createDraftEmail = (recipients, maybeSubject, message) => {
    const type = "draft"
    const subject = maybeSubject || "<No subject>";
    return new this.EmailModel({ recipients, subject, message, type }).save();
  };

  getDraftEmails = () => {
    return this.EmailModel.find({ type: "draft" });
  };

  getSentEmails = () => {
    return this.EmailModel.find({
      $or: [{ type: "outgoing" }, { type: "sent" }]
    });
  };

};

module.exports = EmailService;
