const database = require("./database");

const getMovies = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];

  if(req.query.color != null) {
    sql += " where color = ?";
    sqlValues.push(req.query.color);

    if(req.query.max_duration != null) {
      sql += " where duration <= ?";
      sqlValues.push(req.query.max_duration);
    }
  } else if (req.query.max_duration != null) {
    sql += " where duration <= ?";
    sqlValues.push(req.query.max_duration);
  }
  
  database
  .query("sql, sqlValues")
  .then(([movies]) => {
    res.sendStatus(200).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
  .query("select * from movies where id = ?", [id])
  .then(([movies]) => {
    if (movies[0] != null) {
      res.json(movies[0]);
    } else {
      res.status(404).send("Not Found");
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const getUsers = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  if(req.query.language != null) {
    sql += " where language = ?";
    sqlValues.push(req.query.color);

    if(req.query.city != null) {
      sql += " where city = ?";
      sqlValues.push(req.query.city);
    }
  } else if (req.query.city != null) {
    sql += " where city = ?";
    sqlValues.push(req.query.city);
  }

  database
  .query("select * from users")
  .then(([users]) => {
    res.sendStatus(200).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database
  .query("select * from users where id = ?", [id])
  .then(([users]) => {
    if (users[0] != null) {
      res.json(users[0]);
    } else {
      res.status(404).send("Not Found");
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
  .query("update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?", [title, director, year, color, duration, id])
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found");
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error editing the movie");
  });
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
  .query("update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?", [firstname, lastname, email, city, language, id])
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found");
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error editing the movie");
  });
}

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("delete from movies where id = ?", [id])
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found");
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error deleting the movie");
  });
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("delete from users where id = ?", [id])
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found");
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error editing the movie");
  });
}


module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUserById,
  postMovie,
  postUser,
  updateMovie,
  updateUser,
  deleteMovie,
  deleteUser,
};