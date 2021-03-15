class EmailService {
  constructor(EmailModel) {
    this.EmailModel = EmailModel;
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
      viewedAt: undefined
    });

    const draftEmails = await this.EmailModel.count({ type: "draft" });

    const unreadSpamEmails = await this.EmailModel.count({
      type: "received",
      isSpam: true,
      viewedAt: undefined
    });

    return {
      unreadInboxEmails,
      draftEmails,
      unreadSpamEmails
    };
  };

  createEmail = (recipients, subject, message) => {
    const type = 'outgoing'
    return new this.EmailModel({ recipients, subject, message, type }).save();
  };

  createDraftEmail = (recipients, maybeSubject, message, viewedAt) => {
    const type = 'draft'
    const subject = maybeSubject || '<No subject>';
    return new this.EmailModel({ recipients, subject, message, type, viewedAt }).save();
  };

  updateDraftEmail = async (emailId, recipients, subject, message) => {
    const email = await this.EmailModel.findById(emailId);
    email.recipients = recipients;
    email.subject = subject;
    email.message = message;

    return email.save();
  }

  getEmail = (emailId) => {
    return this.EmailModel.findById(emailId);
  };

  removeEmail = async (emailId) => {
    const email = await this.EmailModel.findById(emailId);
    return email.remove();
  }

  getInboxEmails = () => {
    return this.EmailModel.find({ type: 'received', isSpam: false });
  };
  
  getImportantEmails = () => {
    return this.EmailModel.find({ isImportant: true });
  };

  getDraftEmails = () => {
    return this.EmailModel.find({ type: 'draft' });
  };

  getSpamEmails = () => {
    return this.EmailModel.find({ isSpam: true });
  };

  setEmailAsImportant = async (emailId, isImportant) => {
    const email = await this.EmailModel.findById(emailId);
    email.isImportant = isImportant;
    return email.save();
  };

  getSentEmails = () => {
    return this.EmailModel.find({
      $or: [{ type: 'outgoing' }, { type: 'sent' }]
    });
  };

};

module.exports = EmailService;
