module.exports = app => {
    // const tutorials = require("../controllers/tutorial.controller.js");
    // var router = require("express").Router();
    // // Create a new Tutorial
    // router.post("/", tutorials.create);
    // // Retrieve all Tutorials
    // router.get("/", tutorials.findAll);
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
    // // Retrieve a single Tutorial with id
    // router.get("/id", tutorials.findOne);
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
    // // Create a new Tutorial
    // router.delete("/", tutorials.deleteAll);
    // app.use('/api/tutorials', router);

    const clients = require("../controllers/client.controller.js");
    const questions = require("../controllers/question.controller.js");
    const usages = require("../controllers/usage.controller.js");
    const services = require("../controllers/service.controller.js");
    const companys = require("../controllers/company.controller.js");
    const categories = require("../controllers/category.controller.js");

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

    router.get("/services", services.findAll);
    router.get("/services/:id", services.findOne);
    router.post("/services", services.create);  
    router.put("/services/:id", services.update);    
    router.delete("/services/:id", services.delete);   

    router.get("/categories", categories.findAll);
    // router.get("/categories/:id", categories.findOne);
    router.post("/categories", categories.create);  
    router.put("/categories/:id", categories.update);    
    router.delete("/categories/:id", categories.delete);    

    // router.get("/", clients.findAll);
    // // Retrieve all published Tutorials
    // router.get("/published", clients.findAllPublished);
    // // Retrieve a single Tutorial with id

    // // Update a Tutorial with id
    // router.put("/:id", clients.update);
    // // Delete a Tutorial with id
    // router.delete("/:id", clients.delete);
    // // Create a new Tutorial
    // router.delete("/", clients.deleteAll);
    app.use('/api', router);
};