const db = require("../models");
const Service = db.services;

// Create and Save a new usage
exports.create = (req, res) => {

    console.log("registering Service");
    if (req.body.type == 0) {
        if (!req.body.title || !req.body.content) {
            res.status(400).send("0");
            return;
        } 
    } else (req.body.type == 1) {
        if (!req.body.title || !req.body.content ||  ( typeof req.body.company_id ==='undefined') || req.body.company_id === null || ( typeof req.body.category_id ==='undefined') || req.body.category_id === null) {
            res.status(400).send("0");
            return;
        }    
    }
    
    const service = new Service({
        type: req.body.type,
        logo_url: req.body.logo_url,
        company_id: req.body.company_id,
        image_url: req.body.image_url,
        title: req.body.title,
        content: req.body.content,
        free_content: req.body.content,
        category_id: req.body.category_id
    });
    service
        .save(service)
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
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

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
                res.status(404).send("1");
            } else res.send("2"); //succeed
        })
        .catch(err => {
            res.status(500).send("1");
        });

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Usage.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send("0");
            } else {
                res.send("2");
            }
        })
        .catch(err => {
            res.status(500).send("1");
        });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};