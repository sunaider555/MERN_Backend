const config = require("../config/config");
const db = require("../models");
const Service = db.services;

// Create and Save a new usage
exports.create = (req, res) => {

    console.log("registering Service");
    // console.log(req.file, req.body);
    if (req.body.type == 0) {
        if (!req.body.title || !req.body.content || !req.body.category_id) {
            res.status(400).send("0");
            return;
        } 
    } else  {
        if (!req.body.title || !req.body.content || ( typeof req.body.company_id ==='undefined') || req.body.company_id === null || ( typeof req.body.category_id ==='undefined') || req.body.category_id === null) {
            res.status(400).send("0");
            return;
        }    
    }
    
    // console.log("direct name : " , req.file.filename);
    // console.log("direct path : " , config.upload_path);
    // const filePath = req.protocol + "://" + __dirname +'/' + req.file.path;
    console.log("fileName : " , req.file.filename);

    const service = new Service({
        type: req.body.type,
        logo_url: req.file.filename,
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
            res.status(500).send(err);
        });
};

exports.getPageNum = (req, res) => {
    const {type} = req.params; console.log("get pagenum in Services, type: ", type);
    // res.send(Company.find().count());
    Service.find().count()
    .then(data => { console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.send("0");
    });
}

exports.findAll = (req, res) => {
    const {type, category_id} = req.params;
   
    console.log("Services ::: type, category", type, category_id);
    var condition = type ? {
        type: {
            $eq: type
        },
        category_id: {
            $eq : category_id
        }
    } : {};
    if (category_id == 0) {console.log("All is detected");
        condition =  {
            type: {
                $eq: type
            }
        }
    } 
    Service.find(condition).
        then(data => {
            if (!data)
                res.status(404).send("0");
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500).send("1"); //sth error
        });
};

exports.findOne = (req, res) => {
    const {id} = req.params;
    console.log("id", id);
    Service.findById(id)
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
    console.log("Updateing Service id: ", id, req.body.title, req.body.content);
    if (!req.body.title || !req.body.content) {
        res.send("0"); //Empty field is impossible
        return;
    }
    req.body.logo_url = req.file.filename;
    Service.findByIdAndUpdate(id, req.body, {
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
    Service.findByIdAndRemove(id)
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