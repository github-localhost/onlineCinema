module.exports = app => {
  const movies = require("../controllers/movies.controller.js");

  var router = require("express").Router();

  // Create a new movies
  router.post("/addMovie", movies.create);

  // Retrieve all movies
  router.get("/", movies.findAll);

  // Retrieve all published movies
  router.get("/published", movies.findAllPublished);

  // Retrieve a single movies with id
  router.get("/:id", movies.findOne);

  // Update a movies with id
  router.put("/:id", movies.update);

  // Delete a movies with id
  router.delete("/:id", movies.delete);

  // Delete all movies
  router.delete("/", movies.deleteAll);

  app.use('/api/movies', router);
};
