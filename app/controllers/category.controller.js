const db = require("../models");
const Category = db.categories;

exports.create = (req, res) => {
    console.log("registering category");

    if (!req.body.name) {
        res.status(400).send({
            message: "0"
        });
        return;
    }
    const category = new Category({        
        name: req.body.name
    });
    category
        .save(category)
        .then(data => {
            res.send("2");
        })
        .catch(err => {
            res.status(500).send("1");
        });
}

exports.findAll = (req, res) => {    

    Category.find()
        .then(data => {
            console.log("result: " + data);
            if (!data)
                res.status(404).send("1");
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500).send("2");
        });
};

exports.update = (req, res) => {
    const id = req.params.id; console.log("Update info   " + id);

     Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
    const id = req.params.id;
    Category.findByIdAndRemove(id)
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