const EmailModel = require("./emailService/EmailModel");
const EmailService = require("./emailService/EmailService");
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const SearchService = require("./searchService/SearchService");

const searchService = new SearchService(client);
const emailService = new EmailService(EmailModel, searchService);

module.exports = { emailService, searchService };
