const express = require("express");
const app = express();

app.get("/books", (req, res) => {
  res.status(200).json({ message: "Hello from Server!", route: "/books" });
});

app.get("/libraries", (req, res) => {
  res.status(200).json({
    message: "Hello from Server!",
    route: "/libraries",
    permission: true,
  });
});

app.get("/authors", (req, res) => {
  res.status(200).json({
    message: "Hello from Server!",
    route: "/authors",
    permission: true,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("App is listening on port " + port);
});
