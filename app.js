const express = require("express");
const app = express();
const data = require("./data");

// general middleware for converting to json
app.use(express.json());

// middleware for consoling the request path
const logger = (req, res, next) => {
  console.log("Request Path: " + req.path);
  next();
};
app.use(logger);
// ------------------------------------------

app.get("/books", (req, res) => {
  res.status(200).json({
    message: "Hello from Server!",
    route: "/books",
    books: data.books,
  });
});

// middleware for  GET /libraries and GET /authors
// we have defined after /books so will not work in /books path
const checkPermission = (req, res, next, type) => {
  console.log(`In Check Permission Middleware : ` + req.path);
  console.log(`Valid Person (${type}) --> Access Given`);
  req.body = { permission: true }; // permission added in request.body object
  next();
};
// app.use(checkPermission);

app.get(
  "/libraries",
  (req, res, next) => checkPermission(req, res, next, "Librarian"),
  (req, res) => {
    res.status(200).json({
      message: "Hello from Server!",
      route: "/libraries",
      permission: true,
      Libraries: data.libraries,
    });
  }
);

app.get(
  "/authors",
  (req, res, next) => checkPermission(req, res, next, "Author"),
  (req, res) => {
    res.status(200).json({
      message: "Hello from Server!",
      route: "/authors",
      permission: true,
      Authors: data.authors,
    });
  }
);
// Post Method Middleware
const postMiddleware = (req, res, next) => {
  console.log("Post Middle Ware");
  next();
};
app.post("/libraries", postMiddleware, (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Post Method" });
});
app.post("/authors", postMiddleware, (req, res) => {
  console.log(res);
  res.status(200).json({ message: "Post Method" });
});

const port = 3000;
app.listen(port, () => {
  console.log("App is listening on port " + port);
});
