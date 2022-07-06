const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.clients = require("./client.model.js")(mongoose);
db.questions = require("./question.model.js")(mongoose);
db.usages = require("./usage.model.js")(mongoose);
db.services = require("./service.model.js")(mongoose);
db.companys = require("./company.model.js")(mongoose);
db.categories = require("./category.model.js")(mongoose);

module.exports = db;