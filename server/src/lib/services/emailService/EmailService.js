class EmailService {
  constructor(EmailModel, SearchService) {
    this.EmailModel = EmailModel;
    this.searchService = SearchService;
  }

  search = async (q, offset, limit) => {
    const results = await this.searchService.findEmail(q, offset, limit);
    const idArray = results.map((res) => res._source.id);
    return this.EmailModel.find({
      _id: { $in: idArray },
    });
  };

  countEmails = (emailType, q) => {
    switch (emailType) {
      case "search":
        return this.searchService.countFoundEmails(q);

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

  createEmail = async (recipients, subject, message) => {
    const type = "outgoing";
    const email = await new this.EmailModel({
      recipients,
      subject,
      message,
      type,
    }).save();
    await this.searchService.saveEmail(email);
    return email;
  };

  createDraftEmail = async (recipients, maybeSubject, message, viewedAt) => {
    const type = "draft";
    const subject = maybeSubject || "<No subject>";
    const email = await new this.EmailModel({
      recipients,
      subject,
      message,
      type,
      viewedAt,
    }).save();
    await this.searchService.saveEmail(email);
    return email;
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
    const promise = this.EmailModel.findById(emailId);
    const promise2 = this.searchService.deleteEmail(emailId);
    const [email] = await Promise.all([promise, promise2]);
    return email.remove();
  };

  getInboxEmails = (offset, limit) => {
    return this.EmailModel.find({ type: "received", isSpam: false }, null, {
      skip: offset,
      limit,
      sort: {
        timestamp: -1,
      },
    });
  };

  getImportantEmails = (offset, limit) => {
    return this.EmailModel.find({ isImportant: true }, null, {
      skip: offset,
      limit,
      sort: {
        timestamp: -1,
      },
    });
  };

  getDraftEmails = (offset, limit) => {
    return this.EmailModel.find({ type: "draft" }, null, {
      skip: offset,
      limit,
      sort: {
        timestamp: -1,
      },
    });
  };

  getSpamEmails = (offset, limit) => {
    return this.EmailModel.find({ isSpam: true }, null, {
      skip: offset,
      limit,
      sort: {
        timestamp: -1,
      },
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
        sort: {
          timestamp: -1,
        },
      }
    );
  };
}

module.exports = EmailService;
