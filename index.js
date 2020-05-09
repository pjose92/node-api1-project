const express = require('express');

const server = express();

// server.get('/', (req, res) => {
//     res.json({message: "hello world!"});
// })

let users = [
  {
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane"
  }
];

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})

server.use(express.json());

// GET 

server.get("/", (req, res) => {
  res.send("Hello world!")
})

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
})

server.get("/api/users", (req, res) => {
  res.status(500).json({ errorMessage: "The users info could not be retrieved" });
})

// POST

server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  userInfo.id = shortid.generate();

  if (userInfo.name === undefined || userInfo.bio === undefined) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    users.push(userInfo)
    res.status(201).json(userInfo)
  }
})

server.post("/api/users", (req, res) => {
  res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
})


// GET

server.get("/api/users/:id", (req, res) => {
  const found = users.find(user => user.id === id);

  if (found) {
      res.status(200).json(found);
  } else {
      res
          .status(404)
          .json({ success: false, message: "The user with the specified ID does not exist." });
  }
});

server.get("/api/users/:id", (req, res) => {
  res.status(500).json({ errorMessage: "The user information could not be retrieved." })
})


// DELETE

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const deleted = users.find(user => user.id === id);

  if (deleted) {
      users = users.filter(user => user.id !== id);

      res.status(200).json(deleted);
  } else {
      res
          .status(404)
          .json({ success: false, message: "The user with the specified ID does not exist." });
  }
});

server.delete("/api/users/:id", (req, res) => {
  res.status(500).json({ errorMessage: "The user could not be removed" })
})


// PUT

server.put("/api/users/:id", (req, res) => {
 
  const { id } = req.params;

  const changes = req.body;

  let index = users.findIndex(user => user.id === id);

  if (index !== -1) {
      users[index] = changes;
      res.status(200).json(users[index]);
  } else if (index === undefined) {
    res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
  } else if (changes.name === undefined || changes.bio === undefined) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    res.status(500).json({ errorMessage: "The user information could not be modified." })
  }
});

// const PORT = 5000;

// server.listen(PORT, () => {
//     console.log(`listening on http://localhost:${PORT}`);
// })

// const express = require('express');
// const shortid = require('shortid');

// const server = express();

