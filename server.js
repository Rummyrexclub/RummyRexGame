const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Rummy Server Running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});
