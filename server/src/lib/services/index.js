const EmailModel = require("./emailService/EmailModel");
const UserModel = require("./userService/UserModel");
const EmailService = require("./emailService/EmailService");
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const SearchService = require("./searchService/SearchService");
const UserService = require("./userService/UserService");

const searchService = new SearchService(client);
const userService = new UserService(UserModel);
const emailService = new EmailService(EmailModel, searchService);

module.exports = { userService, emailService, searchService };
