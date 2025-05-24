const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // generate file path with req object
  let filePath = path.join(
    __dirname,
    "public",
    req.url == "/" ? "index.html" : req.url
  );

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      // If file not found error serve the 404.html page
      if (err.code == "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          "utf-8",
          (err, data) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(data);
          }
        );
      } else {
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

server.listen(8080, () => console.log("Server running on port 8080..."));
