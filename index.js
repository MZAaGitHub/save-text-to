const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.json({limit:"1MB"}));


app.get('/', (req, res) => {
    res.sendFile('index.html', path.join(__dirname, 'public'));
})



app.post("/save", (req, res) => {
  const text = req.body.text;
  const filePath = path.join(__dirname, "public", "text.txt");
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving file");
    } else {
      res.status(200).send("File saved successfully");
    }
  });
});

app.get("/read", (req, res) => {
  const filePath = path.join(__dirname, "public", "text.txt");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
    } else {
      res.status(200).send({ text: data });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;