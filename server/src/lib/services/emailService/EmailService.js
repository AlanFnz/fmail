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

  getEmail(emailId) {
    return this.EmailModel.findById(emailId);
  }
  
  getImportantEmails = () => {
    return this.EmailModel.find({ isImportant: true });
  };

  getDraftEmails = () => {
    return this.EmailModel.find({ type: "draft" });
  };

  setEmailAsImportant = async (emailId, isImportant) => {
    const email = await this.EmailModel.findById(emailId);
    email.isImportant = isImportant;
    return email.save();
  };

  getSentEmails = () => {
    return this.EmailModel.find({
      $or: [{ type: "outgoing" }, { type: "sent" }]
    });
  };

};

module.exports = EmailService;
