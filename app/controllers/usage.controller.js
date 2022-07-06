const db = require("../models");
const Usage = db.usages;

// Create and Save a new usage
exports.create = (req, res) => {

    console.log("registering usage");

    if (!req.body.title || !req.body.content) {
        res.status(400).send("0");
        return;
    }
    const usage = new Usage({
        title: req.body.title,
        content: req.body.content
    });
    usage
        .save(usage)
        .then(data => {
            res.send("2");
        })
        .catch(err => {
            res.status(500).send("1");
        });
};

exports.findAll = (req, res) => {
    const title = req.body.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Usage.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send("0");
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("usage findone ", id);
    Usage.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send("0");
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500).send("1"); //sth error
        });
};

// Update a Usage by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Updateing usage id: " + id);
    if (!req.body.title || !req.body.content) {
        res.send("0"); //Empty field is impossible
        return;
    }
    Usage.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send("0");
            } else res.send("2"); //succeed
        })
        .catch(err => {
            res.status(500).send({
                message: "1" //sth error
            });
        });

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Usage.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "0" //Cannot delete Usage with id=${id}.
                });
            } else {
                res.send({
                    message: "2" //usage was deleted successfully!
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "1" //Could not delete Tutorial with id= + id
            });
        });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};