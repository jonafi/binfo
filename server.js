const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));





app.get("/", (req, res) => {
  res.send(index.html);
});



// Listen on port 3000
app.listen(3000, () => {
  console.log("App running on port 3000!");
});
