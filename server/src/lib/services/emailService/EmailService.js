class EmailService {
  constructor(EmailModel) {
    this.EmailModel = EmailModel;
  }

  countEmails = (emailType) => {
    switch (emailType) {
      case "inbox":
        return this.EmailModel.count({
          type: "received",
          isSpam: false,
        });

      case "important":
        return this.EmailModel.count({
          isImportant: true,
        });

      case "sent":
        return this.EmailModel.count({
          $or: [{ type: "outgoing" }, { type: "sent" }],
        });

      case "drafts":
        return this.EmailModel.count({
          type: "draft",
        });

      case "spam":
        return this.EmailModel.count({
          type: "received",
          isSpam: true,
        });

      default:
        throw new Error(`${emailType} is not a valid emailType`);
    }
  };

  setEmailToViewed = async (emailId, viewedAt) => {
    const email = await this.EmailModel.findById(emailId);
    email.viewedAt = viewedAt;
    return email.save();
  };

  getEmailOverview = async () => {
    const unreadInboxEmails = await this.EmailModel.count({
      type: "received",
      isSpam: false,
      viewedAt: undefined,
    });

    const draftEmails = await this.EmailModel.count({ type: "draft" });

    const unreadSpamEmails = await this.EmailModel.count({
      type: "received",
      isSpam: true,
      viewedAt: undefined,
    });

    return {
      unreadInboxEmails,
      draftEmails,
      unreadSpamEmails,
    };
  };

  createEmail = (recipients, subject, message) => {
    const type = "outgoing";
    return new this.EmailModel({ recipients, subject, message, type }).save();
  };

  createDraftEmail = (recipients, maybeSubject, message, viewedAt) => {
    const type = "draft";
    const subject = maybeSubject || "<No subject>";
    return new this.EmailModel({
      recipients,
      subject,
      message,
      type,
      viewedAt,
    }).save();
  };

  updateDraftEmail = async (emailId, recipients, subject, message) => {
    const email = await this.EmailModel.findById(emailId);
    email.recipients = recipients;
    email.subject = subject;
    email.message = message;

    return email.save();
  };

  getEmail = (emailId) => {
    return this.EmailModel.findById(emailId);
  };

  removeEmail = async (emailId) => {
    const email = await this.EmailModel.findById(emailId);
    return email.remove();
  };

  getInboxEmails = (offset, limit) => {
    return this.EmailModel.find({ type: "received", isSpam: false }, null, {
      skip: offset,
      limit,
    });
  };

  getImportantEmails = (offset, limit) => {
    return this.EmailModel.find({ isImportant: true }, null, {
      skip: offset,
      limit,
    });
  };

  getDraftEmails = (offset, limit) => {
    return this.EmailModel.find({ type: "draft" }, null, {
      skip: offset,
      limit,
    });
  };

  getSpamEmails = (offset, limit) => {
    return this.EmailModel.find({ isSpam: true }, null, {
      skip: offset,
      limit,
    });
  };

  setEmailAsImportant = async (emailId, isImportant) => {
    const email = await this.EmailModel.findById(emailId);
    email.isImportant = isImportant;
    return email.save();
  };

  getSentEmails = (offset, limit) => {
    return this.EmailModel.find(
      {
        $or: [{ type: "outgoing" }, { type: "sent" }],
      },
      null,
      {
        skip: offset,
        limit,
      }
    );
  };
}

module.exports = EmailService;
