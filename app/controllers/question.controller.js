const db = require("../models");
const Question = db.questions;

exports.create = (req, res) => {
    console.log("registering question");

    if (!req.body.email || !req.body.title || !req.body.content) {
        res.status(400).send("0");
        return;
    }
    const question = new Question({
        title: req.body.title,
        email: req.body.email,
        content: req.body.content
    });
    question
        .save(question)
        .then(data => {
            res.send("2");
        })
        .catch(err => {
            res.status(500).send("1");
        });
}