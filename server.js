const express = require("express");
const mongoose = require("mongoose");
const app = express();
const shortUrl = require("./models/shortUrl");

app.use(express.json());
// err = new ServerSelectionError();

mongoose.connect("mongodb://127.0.0.1:27017/urlShortner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/shortUrls", async (req, res) => {
  await shortUrl.create(req.body);
  res.send("Ok");
});

app.get("/:shortUrl", async (req, res) => {
  const a = await shortUrl.findOne({short:req.params.shortUrl });
  if (a == null) return res.sendStatus(404);

  a.clicks++;
  res.redirect(a.full);
});

app.listen(process.env.PORT || 5000);
