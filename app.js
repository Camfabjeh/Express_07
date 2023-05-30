const express = require("express");
const Joi = require("joi");
const {validateMovie, validateUser} = require("./validators.js");

require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", deleteMovie, movieHandlers.deleteMovie);

const { hashPassword } = require("./auth.js");
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUserById);
app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api.users/:id", deleteUser, movieHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});