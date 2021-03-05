class EmailService {
  constructor(EmailModel) {
    this.EmailModel = EmailModel;
  };

  createEmail = async (recipients, subject, message) => {
    return new this.EmailModel({ recipients, subject, message })
  };

};

module.exports = EmailService;
