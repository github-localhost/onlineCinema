const db = require("../models");
//for future versions..
//const Exceptions = require("../_exceptions");
const Movies = db.movies;
const Op = db.Sequelize.Op;

// Create and Save a new movie
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  };
  
  // Create a movie
  const movie = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save movie in the database
  Movies.create(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the movie."
      });
    });
};

// Retrieve all movies from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Movies.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    });
};

// Find a single movie with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Movies.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving movie with id=" + id
      });
    });
};

// Update a movie by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Movies.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "movie was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update movie with id=${id}. Maybe movie was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating movie with id=" + id
      });
    });
};

// Delete a movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Movies.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "movie was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete movie with id=${id}. Maybe movie was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete movie with id=" + id
      });
    });
};

// Delete all movies from the database.
exports.deleteAll = (req, res) => {
  Movies.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} movies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all movies."
      });
    });
};

// find all published movies
exports.findAllPublished = (req, res) => {
  Movies.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    });
};
