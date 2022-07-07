const db = require("../models");
const Company = db.companys;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    console.log("registering company");
    
    if (!req.body.company_name || !req.body.company_email || !req.body.personal_email) {
        res.status(400).send("0");
        return;
    }
    const company = new Company({
        type: req.body.type,
        company_name: req.body.company_name,
        company_email: req.body.company_email,
        personal_email: req.body.personal_email,
        phone_num: req.body.phone_num
    });
    company
        .save(company)
        .then(data => {
            res.send("2");
        })
        .catch(err => {
            res.status(500).send("1");
        });
};

exports.getPageNum = (req, res) => {
    const {type} = req.params; console.log("get pagenum, type: ", type);
    // res.send(Company.find().count());
    Company.find().count()
    .then(data => { console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.send("0");
    });
}
//Retrieve all companys with type.
exports.findAll = (req, res) => {
    const {type, pageNum, perPage} = req.params;
    let start = 0, end = 0;
    console.log("type, pageNum, perPage", type, pageNum, perPage);

    var condition = type ? {
        type: {
            $eq: type
        },

    } : {};
    if (pageNum == "0") {console.log('0 is detected');
        start = 0; console.log("start worked");
        end = 0;
    } else {
        start = (pageNum-1)*perPage;
        end = perPage;
    }
    console.log("getting company type lists: ", pageNum);
    Company.find(condition).sort({'createdAt': -1}).skip(start).limit(end)
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


// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id; console.log("Update info   " + id);

     Company.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
    Company.findByIdAndRemove(id)
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