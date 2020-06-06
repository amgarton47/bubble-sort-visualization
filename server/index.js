const path = require("path");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4747;

const morgan = require("morgan");

// logging middleware
app.use(morgan("dev"));

// serve static files
app.use(express.static(path.join(__dirname, "../public")));

// serve index.html to any non-matching requests
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// handle any requests (errors) that got to this point
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// start server
app.listen(PORT, () => {
  console.log(`app is up and running on port ${PORT} 🔥🔥🔥!!!`);
  console.log(`http://localhost:${PORT}`);
});
