const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/:address", (req, res) => {
  res.sendFile(path.join(__dirname + `/public/${req.params.address}.html`));
});

// handle file not found error
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(404).sendFile(path.join(__dirname + "/public/404.html"));
});

// Use static files with /filename.type
// app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
