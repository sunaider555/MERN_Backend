const db = require("../models");
const Client = db.clients;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    console.log("registering account");

    if (!req.body.personal_email) {
        res.status(400).send("0");
        return;
    }
    const client = new Client({
        surname: req.body.surname,
        name: req.body.name,
        phone: req.body.phone,
        personal_email: req.body.personal_email,
        password: req.body.password,
        repassword: req.body.repassword,
        avatar: req.body.avatar,
        policy: req.body.policy
    });
    client
        .save(client)
        .then(data => {
            res.send("1");
        })
        .catch(err => {
            res.status(500).send("1");
        });
};

exports.verify = (req, res) => {
    console.log("body" + req.body.password);
    const email = req.body.email;
    const password = req.body.password;
    var condition = email ? {
        personal_email: {
            $eq: email
        }
    } : {};

    Client.find(condition)
        .then(data => {
            if (!data[0]) res.send("0");
            else if (data[0].password == password) {
                res.send("2");
                console.log("login confirmed");
            } else {
                res.send("1");
                console.log("pwd is invalid");
            }
        })
        .catch(err => {
            res.send("0"); //can't find email
        });
}
// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const title = req.body.title;
//   var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
//   Tutorial.find(condition)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };

exports.findOne = (req, res) => {    
    const id = req.params.id; console.log("Get info   " + id);
    Client.findById(id)
        .then(data => {
            console.log("result: " + data);
            if (!data)
                res.status(404).send({
                    message: "1"
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500).send("2");
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
   const id = req.params.id; console.log("Update info   " + id);

  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send("0");
      } else res.send("2");
    })
    .catch(err => {
      res.status(500).send("1");
    });

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