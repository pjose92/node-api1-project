const express = require("express");
const data = require("./database");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Hello World! I am the Server!" });
});

server.get("/api/users", (req, res) => {
  const users = data.getUsers();
  console.log(users);

  if (users) {
    res.json(users);
  } else {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});


// GET 
//===============================

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = data.getUserById(userId);

  if (user) {
    res.json(user);
  } else if (!user) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved.",
    });
  }
});

// POST
//===============================

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .join({ errorMessage: "Please provide name and bio for the user." });
  } else if (req.body.name || req.body.bio) {
    const newUser = data.createUser({
      name: req.body.name,
      bio: req.body.bio,
    });

    res.status(201).json(newUser);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

// PUT
//===============================

server.put("/api/users/:id", (req, res) => {
  const user = data.getUserById(req.params.id);
  if (user) {
    const updatedUser = data.updateUser(user.id, {
      name: req.body.name || user.name,
      bio: req.body.bio || user.bio,
    });

    res.json(updatedUser);
  } else if (!user) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

// DELETE
//===============================

server.delete("/api/users/:id", (req, res) => {
  const user = data.getUserById(req.params.id);

  if (user) {
    data.deleteUser(user.id);
    res.status(204).end();
  } else if (!user) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }
});


server.listen(5000, () => {
  console.log("Server initialized on port 5000");
});