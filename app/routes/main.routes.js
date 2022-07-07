const clients = require("../controllers/client.controller.js");
const questions = require("../controllers/question.controller.js");
const usages = require("../controllers/usage.controller.js");
const services = require("../controllers/service.controller.js");
const companys = require("../controllers/company.controller.js");
const categories = require("../controllers/category.controller.js");

const multer  = require('multer');

const config = require("../config/config.js");

module.exports = app => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, config.upload_path)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
        },
        fileextension: function(req, file, cb) {
            cb(null, file.mimetype.split("/")[1])
        }
      })      
    const upload = multer({ storage: storage });

    var router = require("express").Router();

    router.post("/clients", clients.create);
    router.post("/clients/verify", clients.verify);
    router.get("/clients/:id", clients.findOne);
    router.put("/clietns/:id", clients.update);
    
    router.post("/questions", questions.create);

    router.get("/usages", usages.findAll);
    router.get("/usages/:id", usages.findOne);
    router.post("/usages", usages.create);  
    router.put("/usages/:id", usages.update);   
    router.delete("/usages/:id", usages.delete);

    router.get("/company/:type/:pageNum/:perPage", companys.findAll);
    router.get("/company/:type", companys.getPageNum);
    router.post("/company", companys.create);  
    router.put("/company/:id", companys.update);    
    router.delete("/company/:id", companys.delete); 

    router.get("/categories", categories.findAll);
    // router.get("/categories/:id", categories.findOne);
    router.post("/categories", categories.create);  
    router.put("/categories/:id", categories.update);    
    router.delete("/categories/:id", categories.delete);    

    router.get("/services/:type/:category_id", services.findAll);
    router.get("/services/:id", services.findOne);
    router.post("/services", upload.single('logoImg'), services.create);  
    router.put("/services/:id", upload.single('logoImg'),services.update);    
    router.delete("/services/:id", services.delete);   

    router.get("/images/:name", async (req, res) => {
        const imageFilePath = config.upload_path + '\\' + req.params.name;
        res.download(imageFilePath, function(err) {
            if (err) {
                console.log(err);
            }
        });
      });
    app.use('/api', router);
};