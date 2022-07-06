const db = require("../models");
const Tutorial = db.tutorials;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  
  // console.log(req.query);

  if (!req.query.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.query.title,
    description: req.query.description,
    published: req.query.published ? req.query.published : false
  });
  console.log(tutorial);
  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {console.log("findone is calling..");
  const id = req.params.id; console.log(id);
  // Tutorial.findById(id)
  //   .then(data => {
  //     if (!data)
  //       res.status(404).send({ message: "Not found Tutorial with id " + id });
  //     else res.send(data);
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .send({ message: "Error retrieving Tutorial with id=" + id });
  //   });
  Tutorial.find({
  	 title: {
  	 	id
  	 }
  })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};